const functions = require('firebase-functions');
const db = require('../db');

exports.personalDayStore = functions.database.ref('/personal-store/{userId}/{storeId}/personal_day')
.onWrite(event => {
  let data = event.data.val();
  let prevData = event.data.previous.val();
  let { userId, storeId } = event.params;
  let opt = [];

  // on remove item
  if (!data) {
    let dayName = prevData.toLowerCase();
    console.log(`REMOVED /personal-store-day/${userId}/${dayName}/${storeId}`);
    opt.push(
      db.setValue(`/personal-store-day/${userId}/${dayName}/${storeId}`, null),
      db.setValue(`/personal-store-day/${userId}/all/${storeId}`, null)
    );
    return Promise.all(opt);

  } else {
    let dayName = data.toLowerCase();
    console.log(`URL /personal-store-day/${userId}/${dayName}/${storeId}`);

    return db.getValue(`/personal-store/${userId}/${storeId}/`)
      .then(storeData => {
        if (prevData) {
          let prevDay = prevData.toLowerCase();
          console.log('prevDay', prevDay);
          opt.push(
            db.setValue(`/personal-store-day/${userId}/${prevDay}/${storeId}`, null)
          );
        }

        opt.push(
          db.setValue(`/personal-store-day/${userId}/${dayName}/${storeId}`, storeData),
          db.setValue(`/personal-store-day/${userId}/all/${storeId}`, storeData)
        );

        return Promise.all(opt);
      })
      .catch(err => console.log('ERR', err))
  }

});
