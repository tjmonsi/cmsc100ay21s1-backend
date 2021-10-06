function processedLater (x, y) {
  return new Promise(function (resolve, reject) {
    var z = x + y;

    // after sometime
    setTimeout(function () {
      if (z < 0) {
        return reject(new Error('z should be positive'));
      }
    
      return resolve(z);
    }, 1000);
  })
}

// then chaining
processedLater(1, 2)
  .then(function (data) {
    console.log(data);
    return processedLater(1, 3)
  })
  .then(function (data) {
    console.log(data);
    return processedLater(1, 4)
  })
  .then(function (data) {
    console.log(data);
  })

console.log('end')