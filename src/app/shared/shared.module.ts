import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {MaterialModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppBar} from './app-bar/app-bar';
import {NavDrawer} from './nav-drawer/nav-drawer';
import {AuthComponent} from './auth/auth.component';

@NgModule({
  imports: [
    RouterModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AppBar,
    NavDrawer,
    AuthComponent
  ],
  exports: [
    AppBar,
    NavDrawer,
    AuthComponent
  ]
})
export class SharedModule {}
