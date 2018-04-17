const functions = require('firebase-functions');
const db = require('../db');

exports.countStock = functions.database
.ref('users-product/{storeId}/{uid}/{date}')
  .onWrite(event => {
    let data = event.data.val();
    let { storeId, date, uid } = event.params;
    let storeUrl = storeId.toLowerCase();

    console.log('data', data);
    console.log(`URL /count-stock-date/${uid}/${storeUrl}/${date}`);

    // on remove item
    if (!data) {
      return db.setValue(`/count-stock-date/${uid}/${storeUrl}`, null);
    } else {
      return db.setValue(`/count-stock-date/${uid}/${storeUrl}/`, date);
    }

  });

exports.countOrder = functions.database
.ref('users-ordered-product/{storeId}/{uid}/{date}')
  .onWrite(event => {
    let data = event.data.val();
    let { storeId, date, uid } = event.params;
    let storeUrl = storeId.toLowerCase();

    console.log('data', data);
    console.log(`URL /count-order-date/${uid}/${storeUrl}/${date}`);

    // on remove item
    if (!data) {
      return db.setValue(`/count-order-date/${uid}/${storeUrl}`, null);
    } else {
      return db.setValue(`/count-order-date/${uid}/${storeUrl}/`, date);
    }

  });

exports.countSupply = functions.database
.ref('/my-work-supply/{uid}/{supplyId}')
  .onWrite(event => {
    let data = (event.data.val()) ? event.data.val() : event.data.previous.val();
    let { uid } = event.params;
    // NOTICE => store name is a store_key
    let storeUrl = data.store_name;

    // on remove item
    if (!event.data.val()) {
      return db.setValue(`/count-supply-date/${uid}/${storeUrl}`, null);
    } else {
      let val = data.supply_date.replace(/\./ig, '-');
      console.log(`URL /count-supply-date/${uid}/${storeUrl}/${val}`);
      return db.setValue(`/count-supply-date/${uid}/${storeUrl}/`, val);
    }
  });

exports.countPayment = functions.database
.ref('my-work-payment/{uid}/{paymentId}')
  .onWrite(event => {
    let data = (event.data.val()) ? event.data.val() : event.data.previous.val();
    let { uid } = event.params;
    // NOTICE => store name is a store_key
    let storeUrl = data.store_name;

    // on remove item
    if (!event.data.val()) {
      return db.setValue(`/count-payment-date/${uid}/${storeUrl}`, null);
    } else {
      let val = data.payment_date.replace(/\./ig, '-');
      console.log(`URL /count-payment-date/${uid}/${storeUrl}/${val}`);
      return db.setValue(`/count-payment-date/${uid}/${storeUrl}/`, val);
    }

  });
  