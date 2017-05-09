import {Component} from '@angular/core';

import {Router} from '@angular/router';

import * as firebase from 'firebase';
var Highcharts = require('highcharts');

import {Log} from '../../logs/log';

@Component({
  selector: 'analytics',
  templateUrl: './analytics.html',
  styleUrls: ['./analytics.css']
})
export class AnalyticsComponent {
  logs: Log[] = [];
  expenses: Array<any> = [];

  constructor(
    private router: Router
  ) {
    firebase.auth().onAuthStateChanged((user: any) => {
      if (!user) {
        // signed out
        router.navigateByUrl('/');
      }

      firebase.database().ref('/log/'+firebase.auth().currentUser.uid).once('value')
          .then((logsSnapshot) => {
            let logsVal = logsSnapshot.val();

            console.log('logs snapshot', logsVal);

            for (let id in logsVal) {
              let log = logsVal[id];
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
            console.log(error);
          });
    });
  }
}
