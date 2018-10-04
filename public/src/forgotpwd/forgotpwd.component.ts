/**
* Forgot password component.
*/

import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'forgotpwd',
  templateUrl: './forgotpwd.html'
})

export class ForgotpwdComponent {

  private email = new FormControl('');
  
  forgotpwdForm: FormGroup = this.builder.group({
    email: this.email,
  });

  constructor(private builder: FormBuilder) {}
}