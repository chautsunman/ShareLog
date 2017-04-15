import {Component} from '@angular/core';

import {Router} from '@angular/router';

import * as firebase from 'firebase';
// import {AngularFire, FirebaseListObservable} from 'angularfire2';

import {Log} from '../log';

@Component({
  selector: 'log-list',
  templateUrl: './log-list.html',
  styleUrls: ['./log-list.css']
})
export class LogListComponent {
  logs: any[] = [];

  constructor(
    private router: Router
  ) {
    firebase.auth().onAuthStateChanged((user: any) => {
      if (!user) {
        // signed out
        router.navigateByUrl('/');
      }

      firebase.database().ref('/log/'+firebase.auth().currentUser.uid).once('value')
          .then((snapshot) => {
            console.log(snapshot.val());

            for (let i in snapshot.val()) {
              this.logs.push({log: snapshot.val()[i], size: {cols: 1, rows: 1}});
            }

            console.log(this.logs);
          })
          .catch((error) => {
            console.log(error);
          });
    });
  }
}
