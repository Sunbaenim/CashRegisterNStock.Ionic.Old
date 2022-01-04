import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PressDirective } from './directives/press.directive';



@NgModule({
  declarations: [
    PressDirective
  ],
  imports: [
  CommonModule
  ],
  exports: [
    PressDirective
  ]
})
export class SharedModule { }
