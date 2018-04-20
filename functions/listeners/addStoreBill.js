const functions = require('firebase-functions');
const db = require('../db');

exports.addStoreBill = functions.database.ref('/my-work-ordered/{userId}/{prodId}')
.onWrite(event => {
  let data = event.data.val();
  let prevData = event.data.previous.val();
  let { userId, prodId } = event.params;

  console.log('data', data);

  // on remove item
  if (!data) {
    return db.getValue(`/linked-user/${userId}`)
      .then(users => {
        let opt = [];

        for (let id in users) {
          console.log(`REMOVE /store-billing/${id}/${prevData.store_name}${prevData.key}`);

          opt.push(
            db.setValue(`/store-billing/${id}/${prevData.store_name}${prevData.key}`, null)
          );
        }

        return Promise.all(opt);
      })
      .catch(err => console.log('ERR', err));

  } else {
    console.log(`URL /linked-user/${userId}`);
    return db.getValue(`/linked-user/${userId}`)
      .then(users => {
        let bilObject = {};
        let opt = [];

        bilObject.counter = data.counter;
        bilObject.price = data.price;
        bilObject.name = '' + data.name + ' ' + data.weight;
        bilObject.store_name = data.store_name;
        bilObject.order_by = userId;
        bilObject.order_date = data.count_date;
        bilObject.key = data.key;

        console.log('bilObject', bilObject);

        for (let id in users) {
          console.log(`/store-billing/${id}/${data.store_name}${data.key}`);

          opt.push(
            db.setValue(`/store-billing/${id}/${data.store_name}${data.key}`, bilObject)
          );
        }

        return Promise.all(opt);
      })
      .catch(err => console.log('ERR', err))
  }

});
