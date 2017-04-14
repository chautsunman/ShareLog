import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MaterialModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';

import {SharedModule} from './shared/shared.module';

import { AppComponent }  from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    MaterialModule.forRoot(),
    BrowserAnimationsModule,
    SharedModule
  ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
