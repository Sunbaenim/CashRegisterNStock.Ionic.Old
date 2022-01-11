import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PressDirective } from './directives/press.directive';
import { AutoresizeDirective } from './directives/autoresize.directive';



@NgModule({
  declarations: [
    PressDirective,
    AutoresizeDirective
  ],
  imports: [
  CommonModule
  ],
  exports: [
    PressDirective,
    AutoresizeDirective
  ]
})
export class SharedModule { }
