const functions = require('firebase-functions');
const admin = require('firebase-admin');
const db = require('./db');
const path = require('path');
const listenersDir = path.join(__dirname, 'listeners');
// fiebase
admin.initializeApp(functions.config().firebase);

require('fs').readdirSync(listenersDir).forEach(file => {
  Object.assign(exports, require(path.join(listenersDir, file)));
});
