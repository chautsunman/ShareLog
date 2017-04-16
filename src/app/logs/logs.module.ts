import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {MaterialModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {LogListComponent} from './log-list/log-list.component';
import {LogCardComponent} from './log-card/log-card.component';
import {LogDetailComponent} from './log-detail/log-detail.component';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  declarations: [
    LogListComponent,
    LogCardComponent,
    LogDetailComponent
  ],
  exports: [
    LogListComponent,
    LogCardComponent,
    LogDetailComponent
  ]
})
export class LogsModule {}
