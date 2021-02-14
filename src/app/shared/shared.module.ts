import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './components/login/login.component';

import { ReactiveFormsModule } from '@angular/forms';
import { ToolsBarComponent } from './components/tools-bar/tools-bar.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [LoginComponent, ToolsBarComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports:[
    ToolsBarComponent
  ]
})
export class SharedModule { }
