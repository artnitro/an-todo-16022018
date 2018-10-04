/**
 * Sign up component.
 */

import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms'

@Component({
  selector: 'signup',
  templateUrl: './signup.html'
})

export class SignupComponent {

  private email = new FormControl('');

  signupForm: FormGroup = this.builder.group({
    // email: this.email,
  })

  constructor(private builder: FormBuilder) {}
}