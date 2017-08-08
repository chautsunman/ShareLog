import {Component, OnInit} from '@angular/core';

import {Router} from '@angular/router';

import {Log} from '../log';
import {LogService} from '../log-service/log.service';

@Component({
  selector: 'log-list',
  templateUrl: './log-list.html',
  styleUrls: ['./log-list.css']
})
export class LogListComponent implements OnInit {
  logs: Log[] = [];

  constructor(
    private router: Router,
    private logService: LogService
  ) {
    firebase.auth().onAuthStateChanged((user: any) => {
      if (!user) {
        // signed out
        router.navigateByUrl('/');
      }

      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    if (firebase.auth().currentUser) {
      this.logService.getLogs(firebase.auth().currentUser.uid)
          .then((logs) => {
            this.logs = [];

            for (let id in logs) {
              const log = logs[id];

              this.logs.push(new Log(log.id, log.title, log.detail, log.type, log.money, log.recommend, log.rate, log.date, log.lat, log.lng));
            }

            console.log('logs', this.logs);
          })
          .catch((error) => {
            console.log('LogList init error', error);
          });
    }
  }
}
