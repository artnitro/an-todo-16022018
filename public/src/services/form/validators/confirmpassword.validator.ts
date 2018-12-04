/**
 * Confirm paswword validator.
 */

import { AbstractControl } from '@angular/forms';

export class ConfirmPasswordValidator {

  /**
   * @description Check if password and confirm password are equals.
   * If there is error, setup ConfirmPassword to true.
   * @param ac AbstractControl
   * @returns true | null
   */
  static MatchPassword (ac: AbstractControl) {
    const password = ac.get('password').value;
    const confirmPassword = ac.get('confirmPassword').value;
    (password !== confirmPassword) 
      ? ac.get('confirmPassword').setErrors( {ConfirmPassword: true} )
      : null
  }
}