const functions = require('firebase-functions');
const db = require('../db');

exports.onWritePaid = functions.database.ref('/paid-list/{storeName}/{prodId}/')
.onWrite(event => {
  let data = event.data.val();
  let prevData = event.data.previous.val();
  let { prodId } = event.params;
  let uid = (data) ? data.collected_by : prevData.collected_by;

  console.log(`URL /my-work-paid/${uid}/${prodId}`);
  console.log('data', data);
  console.log('prevData', prevData);
  // on remove item
  if (!data) {
    return db.setValue(`/my-work-paid/${uid}/${prodId}`, null);
  } else {
  // on create item
    return db.setValue(`/my-work-paid/${uid}/${prodId}`, data);
  }

});
