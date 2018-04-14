const functions = require('firebase-functions');
const db = require('../db');

exports.countStock = functions.database
.ref('users-product/{storeId}/{uid}/{date}')
  .onWrite(event => {
    let data = event.data.val();
    let { storeId, date } = event.params;
    let storeUrl = storeId.toLowerCase();

    console.log('data', data);
    console.log(`URL /count-stock-date/${storeUrl}/${date}`);

    // on remove item
    if (!data) {
      return db.setValue(`/count-stock-date/${storeUrl}`, null);
    } else {
      return db.setValue(`/count-stock-date/${storeUrl}/`, date);
    }

  });

exports.countOrder = functions.database
.ref('users-ordered-product/{storeId}/{uid}/{date}')
  .onWrite(event => {
    let data = event.data.val();
    let { storeId, date } = event.params;
    let storeUrl = storeId.toLowerCase();

    console.log('data', data);
    console.log(`URL /count-order-date/${storeUrl}/${date}`);

    // on remove item
    if (!data) {
      return db.setValue(`/count-order-date/${storeUrl}`, null);
    } else {
      return db.setValue(`/count-order-date/${storeUrl}/`, date);
    }

  });

exports.countSupply = functions.database
.ref('supply/{storeId}/{supply}/supply_date')
  .onWrite(event => {
    let data = event.data.val();
    let { storeId } = event.params;
    let storeUrl = storeId.toLowerCase();

    // on remove item
    if (!data) {
      return db.setValue(`/count-supply-date/${storeUrl}`, null);
    } else {
      let val = data.replace(/\./ig, '-');
      console.log(`URL /count-supply-date/${storeUrl}/${val}`);
      return db.setValue(`/count-supply-date/${storeUrl}/`, val);
    }
  });

exports.countPayment = functions.database
.ref('paid-list/{storeId}/{paymentId}/payment_date')
  .onWrite(event => {
    let data = event.data.val();
    let { storeId } = event.params;
    let storeUrl = storeId.toLowerCase();

    // on remove item
    if (!data) {
      return db.setValue(`/count-payment-date/${storeUrl}`, null);
    } else {
      let val = data.replace(/\./ig, '-');
      console.log(`URL /count-payment-date/${storeUrl}/${val}`);
      return db.setValue(`/count-payment-date/${storeUrl}/`, val);
    }

  });
  