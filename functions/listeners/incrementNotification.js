const functions = require('firebase-functions');
const db = require('../db');

exports.incrementNotification = functions.database.ref('/notifications/{userId}/{noteId}')
.onCreate(event => {
  let data = event.data.val();
  let { userId, date, prodId, storeName } = event.params;
  db.incrementValue(`notification-count/${userId}`)
    .then(res => console.log(`notification-count/${userId} incremented`))
    .catch(err => console.log('ERR', err));
});
