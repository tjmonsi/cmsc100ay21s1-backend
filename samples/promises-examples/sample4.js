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

// async/await for readability
async function start () {

  let data = await processedLater(1, 2);
  console.log(data);

  data = await processedLater(1, 3);
  console.log(data)

  data = await processedLater(1, 4);
  console.log(data)
  
  console.log('end');
}

start();