'use strict';

var functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.analytics = require('./analytics');
exports.auth = require('./auth');
