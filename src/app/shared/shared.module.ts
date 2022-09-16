import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { ErrorInputComponent } from './error-input/error-input.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    RxReactiveFormsModule,
  ],
  declarations: [ErrorInputComponent],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    RxReactiveFormsModule,
    ErrorInputComponent
  ],
})
export class SharedModule {}
