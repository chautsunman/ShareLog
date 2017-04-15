import {Component} from '@angular/core';

import {NgForm} from '@angular/forms';

import {Router} from '@angular/router';

import * as firebase from 'firebase';

@Component({
  selector: 'new-log',
  templateUrl: './new-log.html',
  styleUrls: ['./new-log.css']
})
export class NewLogComponent {
  constructor(
    private router: Router
  ) {}

  add(f: NgForm): void {
    console.log("add", f.value, f.valid);

    if (f.valid) {
      firebase.database().ref('/log/'+firebase.auth().currentUser.uid)
          .push({
            title: f.value.title,
            detail: f.value.detail,
            money: f.value.money,
            recommend: f.value.recommend,
            rate: f.value.rate
          })
          .then(() => {
            console.log('added new log');

            this.router.navigateByUrl('/home');
          })
          .catch((error) => {
            console.log('add new log error', error);
          });
    } else {
      alert('Invalid input');
      return;
    }
  }
}
