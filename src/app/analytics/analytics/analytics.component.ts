import {Component, OnInit} from '@angular/core';

import {Router} from '@angular/router';

var Highcharts = require('highcharts');

// TODO: import from LogModule
import {Log} from '../../logs/log';
import {LogService} from '../../logs/log-service/log.service';

@Component({
  selector: 'analytics',
  templateUrl: './analytics.html',
  styleUrls: ['./analytics.css']
})
export class AnalyticsComponent implements OnInit {
  logs: Log[] = [];
  expenses: Array<any> = [];

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
            this.expenses = [];

            for (let id in logs) {
              let log = logs[id];
              this.logs.push(new Log(log.title, log.detail, log.type, log.money, log.recommend, log.rate, log.lat, log.lng));
              this.expenses.push(log.money);
            }

            console.log('logs', this.logs);

            Highcharts.chart('expenses-chart', {
              title: {text: 'Expenses'},
              yAxis: {
                title: {text: 'Expenses'}
              },
              series: [
                {
                  name: 'Expenses',
                  data: this.expenses
                }
              ]
            });
          })
          .catch((error) => {
            console.log('LogList init getLogs error', error);
          });
    }
  }
}
