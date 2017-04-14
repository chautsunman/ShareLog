import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';

import {MaterialModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {LogListComponent} from './log-list/log-list.component';
import {LogCardComponent} from './log-card/log-card.component';
import {NewLogComponent} from './new-log/new-log.component';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  declarations: [
    LogListComponent,
    LogCardComponent,
    NewLogComponent
  ],
  exports: [
    LogListComponent,
    LogCardComponent,
    NewLogComponent
  ]
})
export class LogsModule {}
