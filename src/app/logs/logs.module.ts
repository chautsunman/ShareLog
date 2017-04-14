import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {MaterialModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {LogListComponent} from './log-list/log-list.component';
import {LogCardComponent} from './log-card/log-card.component';

@NgModule({
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  declarations: [
    LogListComponent,
    LogCardComponent
  ],
  exports: [
    LogListComponent,
    LogCardComponent
  ]
})
export class LogsModule {}
