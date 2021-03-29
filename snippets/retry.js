Promise.retry = function(fn, n = 0) {
  return new Promise((resolve, reject) => {
    fn(n)
      .then(res => resolve(res))
      .catch(e => {
        while(n) {
          n -= 1
          console.log('retry: ', n)
          fn(n)
        }
        reject(e)
      })
  })
}

const test = (n) => {
  if (n >= 1) return Promise.reject('fail')
  return Promise.resolve('success')
}

Promise.retry(test, 3).then(res => console.log(res)).catch(e => console.log(e))