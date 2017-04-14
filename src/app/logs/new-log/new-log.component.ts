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
      firebase.database().ref('/log')
          .push({
            title: f.value.title,
            detail: f.value.detail
          })
          .then(() => {
            console.log('added new log');

            this.router.navigateByUrl('/');
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
