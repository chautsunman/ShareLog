import {Component} from '@angular/core';

import * as firebase from 'firebase';

@Component({
  selector: 'app-bar',
  templateUrl: './app-bar.html'
})
export class AppBar {
  signOut(): void {
    firebase.auth().signOut()
        .then(() => {
          console.log('signed out');
        })
        .catch((error) => {
          alert('Sign out error.');

          console.log('sign out error', error);
        });
  }
}
