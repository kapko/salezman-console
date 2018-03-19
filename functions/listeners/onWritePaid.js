const functions = require('firebase-functions');
const db = require('../db');

exports.onWritePaid = functions.database.ref('/paid-list/{storeName}/{prodId}/')
.onWrite(event => {
  let data = event.data.val();
  let prevData = event.data.previous.val();
  let { prodId, storeName } = event.params;
  let uid = (data) ? data.collected_by : prevData.collected_by;

  console.log(`URL /my-work-payment/${uid}/${prodId}`);
  console.log('data', data);
  console.log('prevData', prevData);
  // on remove item
  if (!data) {
    return db.setValue(`/my-work-payment/${uid}/${prodId}`, null);
  } else {
    data['_name'] = storeName;
  // on create item
    return db.setValue(`/my-work-payment/${uid}/${prodId}`, data);
  }

});
