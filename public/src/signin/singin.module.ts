/**
* Sign in module.
*/

/*
* Voy a hacerlo mediante la forma ReactiveFormsModule con lo cual en
* el módulo importo este componente. Si utilizase FormsModule 
* importo este, pero por ahora voy a trabajar con este.
* Borrar esto, es mientras aprendo. A lo mejor tengo que importar 
* los dos.
*/

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SigninComponent } from './signin.component';

@NgModule({
  imports: [RouterModule, ReactiveFormsModule],
  declarations: [SigninComponent],
  exports: [SigninComponent]
})

export class SigninModule {}