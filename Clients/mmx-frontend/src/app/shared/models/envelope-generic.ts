import { HttpErrorResponse } from "@angular/common/http";

export interface EnvelopeGeneric{
    result: any,
    error: HttpErrorResponse,
    isError: boolean
}