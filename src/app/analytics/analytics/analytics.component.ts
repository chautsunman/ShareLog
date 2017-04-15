import {Component} from '@angular/core';

import {Router} from '@angular/router';

@Component({
  selector: 'analytics',
  templateUrl: './analytics.html',
  styleUrls: ['./analytics.css']
})
export class AnalyticsComponent {
  constructor(
    private router: Router
  ) {
    firebase.auth().onAuthStateChanged((user: any) => {
      if (!user) {
        // signed out
        router.navigateByUrl('/');
      }
    });
  }
}
