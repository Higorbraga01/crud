import { FormControl } from '@angular/forms';

export class DateValidator {

    static date(c: FormControl): { [key: string]: boolean } {
      let value = new Date(c.value);      
      return isNaN(value.getTime()) || value <= new Date('01/01/1753') ? { 'dateInvalid': true } : undefined;
    }
  
  }