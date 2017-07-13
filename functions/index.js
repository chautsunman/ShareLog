'use strict';

var functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.updateDailyExpense = functions.database.ref('/log/{uid}/{logId}')
    .onWrite((event) => {
      let todayTimestamp = new Date().setUTCHours(0, 0, 0, 0);
      let dailyExpenseRef = admin.database().ref('/expense/' + event.params.uid + '/' + todayTimestamp);

      return dailyExpenseRef.once('value')
        .then((snapshot) => {
          if (snapshot.exists()) {
            return snapshot.val();
          } else {
            return 0;
          }
        })
        .then((oldExpense) => {
          if (event.data.previous.exists()) {
            // update the daily expense
            return oldExpense - event.data.previous.val().money + event.data.val().money;
          }

          if (event.data.exists()) {
            // add to the daily expense
            return oldExpense + event.data.val().money;
          } else {
            // remove from the daily expense
            return oldExpense - event.data.previous.val().money;
          }
        })
        .then((newExpense) => {
          dailyExpenseRef.set(newExpense);
        });
    });
