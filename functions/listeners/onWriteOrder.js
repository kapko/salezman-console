const functions = require('firebase-functions');
const db = require('../db');

exports.onWriteUserOrderProduct = functions.database.ref('/users-ordered-product/{storeName}/{userId}/{date}/{prodId}/')
.onWrite(event => {
  let data = event.data.val();
  let { userId, date, prodId, storeName } = event.params;

  console.log(`CHANGED /my-work-ordered/${userId}/${storeName}${prodId}`);
  // on remove item
  if (!data) {
    return db.setValue(`/my-work-ordered/${userId}/${storeName}${prodId}`, null);
  } else {
  // on create item
    data['date'] = date;
    data['store_name'] = storeName;
    return db.setValue(`/my-work-ordered/${userId}/${storeName}${prodId}`, data);
  }
});
