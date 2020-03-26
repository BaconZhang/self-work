function co(generator) {
  return new Promise((resolve) => {
    const gen = generator(0);

    function next(ret) {
      if (ret.done) return resolve(ret.value);
      return Promise.resolve(ret.value).then(res => next(gen.next(res)))
    }

    next(gen.next());
  });
}

function* test(num) {
  let i = num;
  yield ++i;
  yield ++i;
  yield ++i;
  return ++i;
}

co(test).then(num => console.log(num));

