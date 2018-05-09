const admin = require('firebase-admin');

exports.getValue = (path) => {
  return new Promise((resolve, reject) => {
    admin.database().ref(path).once('value',
      snapshot => resolve(snapshot.val()),
      error => reject(error)
    );
  });
};

exports.orderByChildName = (path, key, val) => {
  return new Promise((res, rej) => {
    admin.database()
      .ref(path)
      .orderByChild(key)
      .equalTo(val)
      .once('value', 
        data => res(data.val()),
        err => rej(err)
      );
  });
}

exports.incrementValue = (path, increment) => {
  let ref = admin.database().ref(path);
  return ref.transaction(value => (value || 0) + (increment || 1));
};

exports.decrementValue = (path, decrement) => {
  let ref = admin.database().ref(path);
  return ref.transaction(value => (value || 0) - (decrement || 1));
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
