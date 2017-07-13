import {Injectable} from '@angular/core';

import * as firebase from 'firebase';

@Injectable()
export class AnalyticsService {
  getExpenses(uid: string) : Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.database().ref('/expense/' + uid)
          .once('value')
          .then((expensesSnapshot) => {
            resolve(expensesSnapshot.val());
          })
          .catch((error) => {
            console.log('AnalyticsService getExpenses error', error);
          });
    });
  }
}
