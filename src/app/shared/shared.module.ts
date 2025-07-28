import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { DemoModalComponent } from './demo-modal/demo-modal.component';

@NgModule({
  declarations: [
    NavbarComponent,
    DemoModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    DemoModalComponent
  ]
})
export class SharedModule { }
