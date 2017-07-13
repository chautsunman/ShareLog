import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';

import {MaterialModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AnalyticsComponent} from './analytics/analytics.component';

import {AnalyticsService} from './analytics-service/analytics.service';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AnalyticsComponent
  ],
  providers: [
    AnalyticsService
  ]
})
export class AnalyticsModule {}
