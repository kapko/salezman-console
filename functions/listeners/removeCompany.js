const db = require('../db');
const functions = require('firebase-functions');

exports.removeCompany = functions.database.ref('/companies/{uid}/{companyId}')
  .onDelete(event => {
    let { companyId, uid } = event.params;

    console.log('companyId == ', companyId);
    console.log('uid === ', uid);

    return db.getValue(`/products/${uid}`)
      .then(products => {
        let opt = [];

        for (let key in products) {
          if (products[key].company === companyId) {
            console.log(`URL /products/${uid}/${key}`);
            opt.push(db.setValue(`/products/${uid}/${key}`, null));
          }
        }

        return Promise.all(opt);
      })
      .catch(err => err);
  });
