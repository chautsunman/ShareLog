import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {MaterialModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';

import {LogsModule} from './logs/logs.module';
import {SharedModule} from './shared/shared.module';

import { AppComponent }  from './app.component';
import {LogListComponent} from './logs/log-list/log-list.component';
import {NewLogComponent} from './logs/new-log/new-log.component';

const routes: Routes = [
  {
    path: 'newlog',
    component: NewLogComponent
  },
  {
    path: '',
    component: LogListComponent
  }
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    MaterialModule.forRoot(),
    BrowserAnimationsModule,
    LogsModule,
    SharedModule
  ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
