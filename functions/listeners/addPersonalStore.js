const functions = require('firebase-functions');
const db = require('../db');

exports.addPersonalStore = functions.database.ref('/store-names/{storeName}/persons/{uid}')
  .onWrite(event => {
    let data = event.data.val();
    let { uid, storeName } = event.params;

    if (!data) {
      return db.setValue(`/personal-store/${uid}/${storeName}`, null);
    } else {
      // on create item
      return db.getValue(`/store-names/${storeName}`)
        .then(store => {
          delete store.persons;
          console.log(`URL /personal-store/${uid}/${storeName}`);
          return db.setValue(`/personal-store/${uid}/${storeName}`, store);
        });
    }
});

