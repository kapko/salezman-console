const admin = require('firebase-admin');

exports.getValue = (path) => {
  return new Promise((resolve, reject) => {
    admin.database().ref(path).once('value',
      snapshot => resolve(snapshot.val()),
      error => reject(error)
    );
  });
};

exports.setValue = (path, value) => {
  return admin.database().ref(path).set(value);
};

exports.updateValue = (path, value) => {
  return admin.database().ref(path).update(value);
};

exports.removeValue = (path) => {
  return admin.database().ref(path).set(null);
};

exports.pushValue = (path, value) => {
  return admin.database().ref(path).push(value);
};
