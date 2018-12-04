/**
 * @description Abstract fields service.
 * @version 1.0
 */

import { FormGroup, FormControl, Validators } from '@angular/forms';

export abstract class AFields {

  constructor() {}

  /**
   * @description Email validator.
   * @returns FormControl validators
   */
  email(): FormControl {
    return new FormControl ('', [
      Validators.required,
      Validators.minLength(6),
      Validators.email
    ]);
  }

  /**
   * @description Password validator.
   * @returns FormControl validators
   */
  password(): FormControl {
    return new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]);
  }

  /**
   * @description Required fields validator.
   * @returns FormControl validators
   */
  required(): FormControl {
    return new FormControl ('', [
      Validators.required
    ]);
  }

  /**
   * @description Get the form field names with error.
   * @param form: FormGroup type.
   * @returns Object
   */
  checkFields(form: FormGroup): object {
    return Object.keys(form.controls)
      .filter(value => !!form.controls[value].errors)
      .reduce((o, key) => ({ ...o, [key]: true }), {});
  }
}
