/**
 * Sign in component.
*/

import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'signin',
  templateUrl: './signin.html'
})

export class SigninComponent {
  
  private email = new FormControl('');

  signinForm: FormGroup = this.builder.group({
    email: this.email,
  });

  constructor(private builder: FormBuilder) {}

}