const functions = require('firebase-functions');
const db = require('../db');

exports.createStore = functions.database.ref('/store-names/{storeId}')
.onWrite(event => {
  let data = event.data.val();
  let prev = event.data.previous.val();
  let { storeId } = event.params;
  let uid = (data) ? data.created_by : prev.created_by;

  console.log('data', data);
  console.log(`URL /personal-store/${uid}/${storeId}`);

  // on remove item
  if (!data) {
    return db.setValue(`/personal-store/${uid}/${storeId}`, null);
  } else {
    return db.setValue(`/personal-store/${uid}/${storeId}`, data);
  }

});
