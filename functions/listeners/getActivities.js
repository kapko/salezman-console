const functions = require('firebase-functions');
const db = require('../db');

exports.myWorkedStock = functions.database.ref('/my-work-stock/{uid}/')
.onWrite(event => {
  let data = event.data.val();
  let { uid } = event.params;

  console.log('data', data);

  return db.setValue(`/activities/stock/${uid}/`, (data) ? getTotalValue(data) : null);
});

exports.myWorkedOrdered = functions.database.ref('/my-work-ordered/{uid}/')
.onWrite(event => {
  let data = event.data.val();
  let { uid } = event.params;

  console.log('data', data);

  return db.setValue(`/activities/order/${uid}/`, (data) ? getTotalValue(data) : null);
});

exports.myWorkedSupply = functions.database.ref('/my-work-supply/{uid}/')
.onWrite(event => {
  let data = event.data.val();
  let { uid } = event.params;

  console.log('data', data);
  db.setValue(`/activities/supply/${uid}/`, (data) ? getAmount(data) : null);
});

exports.myWorkedPayment = functions.database.ref('/my-work-payment/{uid}/')
.onWrite(event => {
  let data = event.data.val();
  let { uid } = event.params;

  console.log('data', data);
  
  return db.setValue(`/activities/payment/${uid}/`, (data) ? getAmount(data) : null);
});


// get val of counter and price
function getTotalValue(dataValue) {
  let totalValue = {};
  
  for (let key in dataValue) {
    console.log('data key', dataValue[key]);
    let val = dataValue[key],
      price = val.price,
      counter = val.counter,
      store = val.store_name;

    if (totalValue[store]) {
      totalValue[store] += price * counter;
    } else {
      totalValue[store] = price * counter;
    }
  }

  console.log('totalValue1', totalValue);
  return totalValue;
}

// get object of amount
function getAmount(data) {
  let totalVal = {};

  for (let key in data) {
    let val = data[key],
      amount = +val.amount;
      store = val.store_name;

    if (totalVal[store]) {
      totalVal[store] += amount;
    } else {
      totalVal[store] = amount;
    }
  }

  console.log('totalVal', totalVal);
  return totalVal;
}
