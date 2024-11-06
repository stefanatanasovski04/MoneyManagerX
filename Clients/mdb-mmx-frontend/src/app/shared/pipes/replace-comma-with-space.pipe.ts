import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'replaceCommaWithSpace'
})
export class ReplaceCommaWithSpacePipe implements PipeTransform {
    transform(value: string): string {
        return value.replace(/,/g, ' ');
    }
}
