const functions = require('firebase-functions');
const db = require('../db');

exports.updateStatus = functions.database.ref('/linked-user/{userId}')
  .onDelete(event => {
    let { userId } = event.params;
    console.log(`status changed = /users/${userId}/status`);
    return db.setValue(`/users/${userId}/status`, 'user');
});

exports.updateLinkedStatus = functions.database.ref('/linked-user/{userId}')
  .onCreate(event => {
    let { userId } = event.params;
    console.log(`status changed = /users/${userId}/status`);
    return db.setValue(`/users/${userId}/status`, null);
});
