import {Component, OnInit} from '@angular/core';

import {Router} from '@angular/router';

declare var google : any;

import {AnalyticsService} from '../analytics-service/analytics.service';

@Component({
  selector: 'analytics',
  templateUrl: './analytics.html',
  styleUrls: ['./analytics.css']
})
export class AnalyticsComponent implements OnInit {
  expenses: any[] = [];

  constructor(
    private router: Router,
    private analyticsService: AnalyticsService
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
    data.addColumn('string', 'Date');
    data.addColumn('number', 'Expense');

    let dataRows = [];

    for (let i = 0; i < expenses.length; i++) {
      dataRows.push([expenses[i].date, expenses[i].expense]);
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
      let getExpensesPromise = this.analyticsService.getExpenses(firebase.auth().currentUser.uid);
      let loadChartsLibraryPromise = new Promise((resolve, reject) => {
        google.charts.load('current', {packages: ['corechart', 'line']});
        google.charts.setOnLoadCallback(resolve);
      });

      let promises = Promise.all([getExpensesPromise, loadChartsLibraryPromise]);

      promises.then((values) => {
        let expenses = values[0];

        this.expenses = [];

        for (let date in expenses) {
          this.expenses.push({date: new Date(parseInt(date)).toDateString(), expense: expenses[date]});
        }

        console.log('expenses', this.expenses);

        this.drawExpenseChart(this.expenses);
      }).catch((error) => {
        console.log(error);
      });
    }
  }
}
