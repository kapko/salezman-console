const functions = require('firebase-functions');
const db = require('../db');

exports.myWorkedStock = functions.database.ref('/my-work-stock/{uid}/')
.onWrite(event => {
  let data = event.data.val();
  let prevData = event.data.previous.val();
  let { uid } = event.params;
  let totalValue = {};

  let dataValue = (!data) ? prevData : data;

  console.log('data', data);
  console.log('prevData', prevData);
  
  for (let key in dataValue) {
    console.log('data key', dataValue[key]);
    let val = dataValue[key],
      price = val.Price,
      counter = val.counter,
      store = val.store_name;

    if (totalValue[store]) {
      totalValue[store] += price * counter;
    } else {
      totalValue[store] = price * counter;
    }

  }
  console.log('totalValue', totalValue);
  return db.updateValue(`/activity-stock/${uid}/`, totalValue);

});
