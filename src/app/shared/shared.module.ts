import {NgModule} from '@angular/core';

import {MaterialModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppBar} from './app-bar/app-bar';

@NgModule({
  imports: [
    MaterialModule,
    BrowserAnimationsModule,
  ],
  declarations: [
    AppBar
  ],
  exports: [
    AppBar
  ]
})
export class SharedModule {}
