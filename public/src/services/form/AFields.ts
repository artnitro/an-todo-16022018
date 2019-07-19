/**
 * @description Abstract fields service.
 * @version 1.0
 */

import { FormGroup, FormControl, Validators } from '@angular/forms';

export abstract class AFields {

  constructor() {}

  /**
   * @description First name validator.
   * @returns FormControl validator
   */
  firstName() {
    return new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.max(15)
    ]);
  }

  /**
   * @description Last name validators.
   * @returns FormControl validator
   */
  lastName() {
    return new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.max(30)
    ]);
  }

  /**
   * @description Email validator.
   * @returns FormControl validator
   */
  email(): FormControl {
    return new FormControl ('', [
      Validators.required,
      Validators.minLength(6),
      Validators.max(40),
      Validators.email
    ]);
  }

  /**
   * @description Password validator.
   * @returns FormControl validator
   */
  password(): FormControl {
    return new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]);
  }

  /**
   * @description Required fields validator.
   * @returns FormControl validator
   */
  required(): FormControl {
    return new FormControl ('', [
      Validators.required
    ]);
  }

  /**
   * @description Get the form field names with error.
   * @param form FormGroup
   * @returns Object
   */
  checkFields(form: FormGroup): object {
    return Object.keys(form.controls)
      .filter(value => !!form.controls[value].errors)
      .reduce((o, key) => ({ ...o, [key]: true }), {});
  }
}
