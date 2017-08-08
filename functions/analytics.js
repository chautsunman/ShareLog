'use strict';

var functions = require('firebase-functions');

const admin = require('firebase-admin');

exports.updateDailyExpense = functions.database.ref('/log/{uid}/{logId}')
    .onWrite((event) => {
      let oldLogDate = event.data.previous.exists() ? new Date(event.data.previous.val().date) : null;
      let oldLogDateTimestamp = oldLogDate ? oldLogDate.setUTCHours(0, 0, 0, 0) : null;
      let newLogDate = event.data.exists() ? new Date(event.data.val().date) : null;
      let newLogDateTimestamp = newLogDate ? newLogDate.setUTCHours(0, 0, 0, 0) : null;

      let oldExpenseRef = oldLogDateTimestamp ? admin.database().ref('/expense/' + event.params.uid + '/' + oldLogDateTimestamp) : null;
      let newExpenseRef = newLogDateTimestamp ? admin.database().ref('/expense/' + event.params.uid + '/' + newLogDateTimestamp) : null;

      if (event.data.previous.exists() && event.data.exists()) {
        // log update
        let p = Promise.all([
          new Promise((resolve, reject) => {
            oldExpenseRef.once('value').then(resolve).catch(reject);
          }),
          new Promise((resolve, reject) => {
            newExpenseRef.once('value').then(resolve).catch(reject);
          })
        ]);

        return p
            .then((expensesSnapshots) => {
              let expenses = [];

              expenses.push(expensesSnapshots[0].exists() ? expensesSnapshots[0].val() : 0);
              expenses.push(expensesSnapshots[1].exists() ? expensesSnapshots[1].val() : 0);

              return expenses;
            })
            .then((expenses) => {
              if (newLogDateTimestamp === oldLogDateTimestamp) {
                oldExpenseRef.set(expenses[0] - event.data.previous.val().money + event.data.val().money);
              } else {
                oldExpenseRef.set(expenses[0] - event.data.previous.val().money);
                newExpenseRef.set(expenses[1] + event.data.val().money);
              }
            });
      } else if (event.data.exists() && !event.data.previous.exists()) {
        // create a new log
        return newExpenseRef.once('value')
            .then((expenseSnapshot) => {
              return expenseSnapshot.exists() ? expenseSnapshot.val() : 0;
            })
            .then((expense) => {
              newExpenseRef.set(expense + event.data.val().money);
            });
      } else if (!event.data.exists() && event.data.previous.exists()) {
        // delete a log
      }
    });
