import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

// import {MaterialModule} from '@angular/material';
import {MdCardModule} from '@angular/material';
import {
  MdInputModule,
  MdButtonModule,
  MdCheckboxModule,
  MdSelectModule,
  MdSliderModule,
  MdDatepickerModule,
  MdNativeDateModule,
  MdIconModule
} from '@angular/material';

import {LogListComponent} from './log-list/log-list.component';
import {LogCardComponent} from './log-card/log-card.component';
import {LogDetailComponent} from './log-detail/log-detail.component';

import {LogService} from './log-service/log.service';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    // MaterialModule,
    MdCardModule,
    MdButtonModule,
    MdInputModule,
    MdCheckboxModule,
    MdSelectModule,
    MdSliderModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdIconModule
  ],
  declarations: [
    LogListComponent,
    LogCardComponent,
    LogDetailComponent
  ],
  providers: [
    LogService
  ],
  exports: [
    LogListComponent,
    LogCardComponent,
    LogDetailComponent
  ]
})
export class LogsModule {}
