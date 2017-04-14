import {Component} from '@angular/core';

import {Log} from '../log';

@Component({
  selector: 'log-list',
  templateUrl: './log-list.html',
  styleUrls: ['./log-list.css']
})
export class LogListComponent {
  logs: any[];

  constructor() {
    this.logs = [
      {log: new Log('Log 1', 'Log detail 1'), size: {cols: 1, rows: 1}},
      {log: new Log('Log 2', 'Log detail 2'), size: {cols: 1, rows: 1}},
      {log: new Log('Log 3', 'Log detail 3'), size: {cols: 1, rows: 1}},
      {log: new Log('Log 4', 'Log detail 4'), size: {cols: 1, rows: 1}},
      {log: new Log('Log 5', 'Log detail 5'), size: {cols: 1, rows: 1}},
      {log: new Log('Log 6', 'Log detail 6'), size: {cols: 1, rows: 1}},
      {log: new Log('Log 7', 'Log detail 7'), size: {cols: 1, rows: 1}},
      {log: new Log('Log 8', 'Log detail 8'), size: {cols: 1, rows: 1}},
      {log: new Log('Log 9', 'Log detail 9'), size: {cols: 1, rows: 1}},
      {log: new Log('Log 10', 'Log detail 10'), size: {cols: 1, rows: 1}},
      {log: new Log('Log 11', 'Log detail 11'), size: {cols: 1, rows: 1}},
      {log: new Log('Log 12', 'Log detail 12'), size: {cols: 1, rows: 1}},
      {log: new Log('Log 13', 'Log detail 13'), size: {cols: 1, rows: 1}},
      {log: new Log('Log 14', 'Log detail 14'), size: {cols: 1, rows: 1}},
      {log: new Log('Log 15', 'Log detail 15'), size: {cols: 1, rows: 1}}
    ];
  }
}
