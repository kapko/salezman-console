const functions = require('firebase-functions');
const db = require('../db');

exports.addPersonalStore = functions.database.ref('/store-names/{storeName}/persons/{uid}')
  .onWrite(event => {
    let data = event.data.val();
    let { uid, storeName } = event.params;
    console.log('data', data);
    console.log('storeName', storeName);

    if (!data) {
      let url = `/personal-store/${uid}/`;
      console.log('DEL url', url + storeName);

      return db.orderByChildName(url, 'key', storeName)
        .then(res => {
          console.log('res', res);
          let key = Object.keys(res);
          console.log('KEY', key);
  
          console.log('url2', url + key);

          return db.setValue(url + key, null);
        });

    } else {
      // on create item
      return db.getValue(`/store-names/${storeName}`)
        .then(store => {
          delete store.persons;
          store['key'] = storeName;
          console.log(store);
          console.log(`URL /personal-store/${uid}/`);
          return db.pushValue(`/personal-store/${uid}/`, store);
        });
    }
});

