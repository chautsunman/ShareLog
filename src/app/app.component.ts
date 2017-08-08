import { Component } from '@angular/core';

import {Router} from '@angular/router';

@Component({
  selector: 'sharelog-app',
   template: `
    <nav-drawer></nav-drawer>

    <div style="flex: 1; width: 100%;">
      <app-bar></app-bar>

      <main id="app">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
})
export class AppComponent {
  constructor(
    private router: Router
  ) {
    /*firebase.auth().onAuthStateChanged((user: any) => {
      if (user) {
        // signed in
        router.navigateByUrl('/home');
      } else {
        // signed out
        router.navigateByUrl('/');
      }
    });*/
  }
}
