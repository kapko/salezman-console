const functions = require('firebase-functions');
const db = require('../db');

exports.myWorkedStock = functions.database.ref('/my-work-stock/{uid}/')
.onWrite(event => {
  let data = event.data.val();
  let prevData = event.data.previous.val();
  let { uid } = event.params;

  let dataValue = (!data) ? prevData : data;

  console.log('data', data);
  console.log('prevData', prevData);
  
  return db.updateValue(`/activities/stock/${uid}/`, getTotalValue(dataValue));
});

exports.myWorkedOrdered = functions.database.ref('/my-work-ordered/{uid}/')
.onWrite(event => {
  let data = event.data.val();
  let prevData = event.data.previous.val();
  let { uid } = event.params;

  let dataValue = (!data) ? prevData : data;

  console.log('myWorkedOrdered data', data);
  console.log('myWorkedOrdered prevData', prevData);

  return db.updateValue(`/activities/order/${uid}/`, getTotalValue(dataValue));
});

exports.myWorkedSupply = functions.database.ref('/my-work-supply/{uid}/')
.onWrite(event => {
  let data = event.data.val();
  let prevData = event.data.previous.val();
  let { uid } = event.params;

  let dataValue = (!data) ? prevData : data;

  console.log('suply data', data);
  console.log('suply prevData', prevData);
  
  return db.updateValue(`/activities/supply/${uid}/`, getAmount(dataValue));
});

exports.myWorkedPayment = functions.database.ref('/my-work-payment/{uid}/')
.onWrite(event => {
  let data = event.data.val();
  let prevData = event.data.previous.val();
  let { uid } = event.params;

  let dataValue = (!data) ? prevData : data;

  console.log('suply data', data);
  console.log('suply prevData', prevData);
  
  return db.updateValue(`/activities/payment/${uid}/`, getAmount(dataValue));
});


// get val of counter and price
function getTotalValue(dataValue) {
  let totalValue = {};
  
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
