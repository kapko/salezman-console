const functions = require('firebase-functions');
const db = require('../db');

exports.onWriteSupply = functions.database.ref('/payments/{storeName}/{prodId}/')
.onWrite(event => {
  let data = event.data.val();
  let prevData = event.data.previous.val();
  let { prodId, storeName } = event.params;
  let uid = (data) ? data.supplied_by : prevData.supplied_by;

  console.log(`URL /my-work-supply/${uid}/${storeName}${prodId}`);
  console.log('data', data);
  console.log('prevData', prevData);
  // on remove item
  if (!data) {
    return db.setValue(`/my-work-supply/${uid}/${storeName}${prodId}`, null);
  } else {
  // on create item
    return db.setValue(`/my-work-supply/${uid}/${storeName}${prodId}`, data);
  }

});
