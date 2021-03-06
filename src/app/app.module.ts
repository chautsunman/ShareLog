import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdSidenavModule} from '@angular/material';
import 'hammerjs';

import * as firebase from 'firebase';
// import {AngularFireModule} from 'angularfire2';

import {LogsModule} from './logs/logs.module';
import {AnalyticsModule} from './analytics/analytics.module';
import {SharedModule} from './shared/shared.module';

import { AppComponent }  from './app.component';
import {AuthComponent} from './shared/auth/auth.component';
import {LogListComponent} from './logs/log-list/log-list.component';
import {LogDetailComponent} from './logs/log-detail/log-detail.component';
import {AnalyticsComponent} from './analytics/analytics/analytics.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent
  },
  {
    path: 'home',
    component: LogListComponent
  },
  {
    path: 'log-detail/:id',
    component: LogDetailComponent
  },
  {
    path: 'new-log',
    component: LogDetailComponent
  },
  {
    path: 'analytics',
    component: AnalyticsComponent
  }
];

export const firebaseConfig = {
  apiKey: "AIzaSyAELXBVivbvZeNMXbh9qnX9T3fxjJSg1VA",
  authDomain: "share-log-c2f07.firebaseapp.com",
  databaseURL: "https://share-log-c2f07.firebaseio.com",
  projectId: "share-log-c2f07",
  storageBucket: "share-log-c2f07.appspot.com",
  messagingSenderId: "161699951866"
};

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    // AngularFireModule.initializeApp(firebaseConfig),
    BrowserAnimationsModule,
    MdSidenavModule,
    LogsModule,
    AnalyticsModule,
    SharedModule
  ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor() {
    firebase.initializeApp(firebaseConfig);
  }
}
