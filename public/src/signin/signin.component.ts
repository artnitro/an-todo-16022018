/**
 * Sign in component.
*/

import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

import { COLORS } from '../app.config';
import { AFields } from '../services/form/AFields';
import { Request } from '../services/http/request.service';

@Component({
  selector: 'signin',
  templateUrl: './signin.html',
})

export class SigninComponent extends AFields implements OnInit {
  
  // formData$: Observable<array>;
  
  signinForm: FormGroup;

  hasError: object = {};

  formColor: string;
  formMessage: string; 
  formMessageColor: string;
  
  constructor(private fb: FormBuilder, private rq: Request) {
    super();
    console.info('>>>>> Signin component.');
    
  }

  ngOnInit() {
    this.signinForm = this.fb.group({
      email: this.email(),
      password: this.password()
    });
    this.formMessage = 'Type correctly data.';
  }

  // TODO:
  sendData() {
    console.log('>> Sending data');
    console.log('>>> Form data: ', this.signinForm.value);

    // get.

    // const url = 'http://api.chucknorris.io/jokes/random?category=celebrity';
    // this.rq.get$(url).subscribe(
    //   data => console.log('>>> Datos: ', data),
    //   err => console.error('>>> Error: ', err)
    // );

    // Post

    const url = 'http://api.antodo.local:3000/api/v1/';
    const body = this.signinForm.value;

    this.rq.post$(url, body).subscribe(
      data => console.log('>>> Datos: ', data),
      err => console.log('>>> Error: ', err)
    );

  }

  typingError(colors: string) {
    this.formMessage = 'ERROR. Type correctly data.';
    this.formMessageColor = colors;
    this.formColor = colors;
  }

  typingOk(colors: string) {
    this.formMessage = 'OK. Waiting for server response.';
    this.formMessageColor = colors;
  }

  signin() {
    this.hasError = this.checkFields(this.signinForm);
    (Object.keys(this.hasError).length)
      ? this.typingError(COLORS.red)
      :
        (
          this.typingOk(COLORS.black),
          this.sendData()
        )
  }

}