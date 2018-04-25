const functions = require('firebase-functions');
const request = require('request');

exports.elasticAdd = functions.database.ref('/store-names/{postId}')
.onWrite(event => {
  let body = event.data.val();
  let { postId } = event.params;
  const baseUrl = functions.config().elastic.url;
  const url = `${baseUrl}stores/store/${postId}`;

  console.log('postId', postId);
  console.log('body', body);

  if (body) {
    return request.post({method: "POST", url, body, json: true});
  } else {
    // on remove item
    return request.delete({method: "DELETE", url});
  }
});
