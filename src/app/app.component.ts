import { Component } from '@angular/core';

import {Router} from '@angular/router';

@Component({
  selector: 'sharelog-app',
  template: `
    <app-bar></app-bar>

    <router-outlet></router-outlet>
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
