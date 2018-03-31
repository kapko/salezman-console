// const functions = require('firebase-functions');
// const db = require('../db');
// // mail
// const sgMail = require('@sendgrid/mail');
// const SENDGRID_API_KEY = functions.config().mail.key;
// sgMail.setApiKey(SENDGRID_API_KEY);

// exports.onCreateDistributor = functions.database.ref('/distributors-users/{disId}/{userId}')
// .onCreate(event => {
//   let data = event.data.val();
//   let { userId, disId } = event.params;

//   return db.getValue('/users/' + disId)
//     .then(distributor => {

//       console.log('data', data);
//       console.log('usserId = ', userId);
//       console.log('distributor = ', disId);

//       const msg = {
//         to: data.email,
//         from: distributor.email,
//         subject: 'Email verifacation for new user',
//         text: `Email from SaleZman`,
//         html: `<h1>Please notice</h1>
//         <p>${distributor.email} make you salezman on SaleZman Application</p>
//         <p>For login please use</p>
//         <p><b>Your email: ${data.email}</b></p>
//         <p><b>Your password by default: </b> 123456789</p>
//         <i>You can change your password on prodile settings on Application</i>
//         `
//       };
//       console.log('MSG', msg);
//       return sgMail.send(msg).then(res => {
//         console.log('SENT', res);
//         return res;
//       })
//       .catch(err => {
//         console.log('ERRR', err);
//       })
//   });
// });
