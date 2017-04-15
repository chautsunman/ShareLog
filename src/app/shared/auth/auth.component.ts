import {Component} from '@angular/core';

import {Router} from '@angular/router';

import * as firebase from 'firebase';

@Component({
  selector: 'auth',
  templateUrl: './auth.html',
  styleUrls: ['./auth.css']
})
export class AuthComponent {
  constructor(
    private router: Router
  ) {
    firebase.auth().onAuthStateChanged((user: any) => {
      if (user) {
        // signed out
        router.navigateByUrl('/home');
      }
    });
  }

  googleSignIn(): void {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then((result) => {
          let user = result.user;

          firebase.database().ref('/users/'+user.uid).set({
            email: user.email,
            displayName: user.displayName,
            photoUrl: user.photoURL,
            isAnonymous: user.isAnonymous
          });
        })
        .catch((error) => {
          console.log('Google sign in error', error);
        })
  }

  anonymousSignIn(): void {
    firebase.auth().signInAnonymously()
        .then((user) => {
          firebase.database().ref('/users/'+user.uid).set({
            isAnonymous: true
          })
        })
        .catch((error) => {
          console.log('anonymous sign in error', error);
        })
  }
}
