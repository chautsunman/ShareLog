import {Component, OnInit} from '@angular/core';

import {Router} from '@angular/router';

declare var google : any;

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
  expenses: any[] = [];

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

  drawExpenseChart(expenses: any[]): void {
    let data = new google.visualization.DataTable();
    data.addColumn('number', 'Log');
    data.addColumn('number', 'Expense');

    let dataRows = [];

    for (let i = 0; i < expenses.length; i++) {
      dataRows.push([i, expenses[i]]);
    }

    data.addRows(dataRows);

    let options = {
      chart: {
        title: 'Expenses'
      }
    };

    let chart = new google.charts.Line(document.getElementById('expense-chart'));

    chart.draw(data, google.charts.Line.convertOptions(options));
  }

  ngOnInit(): void {
    if (firebase.auth().currentUser) {
      let getLogsPromise = this.logService.getLogs(firebase.auth().currentUser.uid);
      let loadChartsLibraryPromise = new Promise((resolve, reject) => {
        google.charts.load('current', {packages: ['corechart', 'line']});
        google.charts.setOnLoadCallback(resolve);
      });

      let promises = Promise.all([getLogsPromise, loadChartsLibraryPromise]);

      promises.then((values) => {
        this.logs = [];
        this.expenses = [];

        let i = 0;
        for (let id in values[0]) {
          let log = values[0][id];
          this.logs.push(new Log(log.title, log.detail, log.type, log.money, log.recommend, log.rate, log.lat, log.lng));
          this.expenses.push(log.money);

          i++;
        }

        console.log('logs', this.logs);

        this.drawExpenseChart(this.expenses);
      }).catch((error) => {
        console.log(error);
      });
    }
  }
}
