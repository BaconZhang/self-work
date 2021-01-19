class Cancel {
  setReject (reject) {
    this.reject = reject
  }

  cancel () {
    this.reject('cancel')
  }
}

let cancelInstance = new Cancel()

const mockFetch = (signal) => {
  const realFetch = () => new Promise((resolve) => {
    setTimeout(() => {
      resolve("finish")
    }, 5000)
  })
  if (signal) {
    return Promise.race([
      new Promise((_, reject) => signal.setReject(reject)),
      realFetch()
    ]).finally(() => console.log('finally'))
  }
  return realFetch().finally(() => console.log('finally'))
}

// mockFetch().then(msg => console.log(msg))

mockFetch(cancelInstance).catch((err) => {
  console.log('err', err)
}).finally(() => {
  console.log('mock finally')
})

setTimeout(() => {
  cancelInstance.cancel()
}, 1000)
