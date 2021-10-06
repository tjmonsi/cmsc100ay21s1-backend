// sample on javascript
// promises

function processedLater (x, y, callback) {
  var z = x + y;

  // after sometime
  setTimeout(function () {
    if (z < 0) {
      return callback(new Error('z should be positive'));
    }
  
    return callback(null, z);
  }, 1000);
}


var x = 0;

function callbackFunction (err, data) {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
  processedLater(1, 3, function (err,  data) {
    if (err) {
      console.error(err);
      return;
    }
  
    console.log(data);
    processedLater(1, 4, function (err,  data) {
      if (err) {
        console.error(err);
        return;
      }
      console.log(data);
    })
  })
  console.log('done first processedLater')
}

// callback hell

processedLater(1, 2, callbackFunction);
console.log('end');

// promise to answer the callback
