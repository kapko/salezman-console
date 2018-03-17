const functions = require('firebase-functions');
const db = require('../db');
// const admin = require('firebase-admin');
// admin.initializeApp(functions.config().firebase);

exports.onWriteUserSupplyProduct = functions.database.ref('/users-product/{storeName}/{userId}/{date}/{prodId}/')
.onWrite(event => {
  let data = event.data.val();
  let { userId, date, prodId } = event.params;

  console.log(`CHANGED /my-work-supply/${userId}/${prodId}`);
  // on remove item
  if (!data) {
    return db.setValue(`/my-work-supply/${userId}/${prodId}`, null);
  } else {
  // on create item
    data['date'] = date;
    return db.setValue(`/my-work-supply/${userId}/${prodId}`, data);
  }
});
