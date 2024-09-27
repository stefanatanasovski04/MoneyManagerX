import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { IconSize } from 'src/app/shared/models/enums';


const INTERNAL_SERVER_ERROR_STATUS_CODE = 500;
const FALLBACK_ERROR_MESSAGE = 'An error happened. Please try again later or contact support.'

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html'
})
export class ErrorComponent {
  @Input() error: HttpErrorResponse | null = null;
  @Input() errorMessage: string | null = null;
  @Input() defaultErrorMessage = FALLBACK_ERROR_MESSAGE;
  @Input() iconSize: IconSize = IconSize.x5;
  @Input() displayHeader = true;

  public errorStatusText = 'Error';

  private statusCodeDictionary = new Map<number, string>();

  constructor(){
      this.statusCodeDictionary.set(400, 'Error_General_BadRequest');
      this.statusCodeDictionary.set(401, 'Error_General_Unauthorized');
      this.statusCodeDictionary.set(403, 'Error_General_Forbidden');
      this.statusCodeDictionary.set(404, 'Error_General_NotFound');
      this.statusCodeDictionary.set(409, 'Error_General_Conflict');
      this.statusCodeDictionary.set(410, 'Error_General_Gone');
      this.statusCodeDictionary.set(500, 'Error_General_InternalServerError');
      this.statusCodeDictionary.set(502, 'Error_General_BadGateway');
  }

  ngOnInit(): void {
      if(this.error) {
          this.errorStatusText = this.statusCodeDictionary.get(this.error.status) ?? this.errorStatusText;
      }
  }

  public getErrorMessage(): string {
      if (this.error && this.error.error && this.error.status >= 400 && this.error.status < 500) {
          return this.error.error.Error;
      }

      if (this.errorMessage) {
          return this.errorMessage;
      }

      if (!this.error || !this.error.error || !this.error.error.Error) {
          return this.defaultErrorMessage;
      }

      return this.error.status === INTERNAL_SERVER_ERROR_STATUS_CODE ? this.defaultErrorMessage : this.error.error.Error;
  }
}
