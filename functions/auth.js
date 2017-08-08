'use strict';

var functions = require('firebase-functions');

const admin = require('firebase-admin');

exports.addUser = functions.auth.user().onCreate((event) => {
  const user = event.data;

  const uid = user.uid;
  const displayName = user.displayName;
  const email = user.email;
  const photoUrl = user.photoURL;

  return admin.database().ref('/users/' + uid)
      .set({
        uid: uid,
        displayName, displayName,
        email: email,
        photoUrl: photoUrl
      });
});
