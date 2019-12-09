function LazyMan(name) {
  console.log(`I am ${name}.`);

  let lazyman = {
    tasks: [],
    index: 0,
    eat: (food) => {
      lazyman.tasks.push((next) => {
        console.log(`I am eating ${food}.`);
        next();
      });
      return lazyman;
    },
    sleep: (duration) => {
      lazyman.tasks.push((next) => {
        console.log(`sleep ${duration}s.`);
        setTimeout(() => next(), duration * 1000);
      });
      return lazyman;
    },
    run: () => {
      const dispatch = (i = 0) => {
        if (i === lazyman.tasks.length) return;
        const next = () => {
          dispatch(i + 1);
        };
        const func = lazyman.tasks[i];
        func(next);
      };
      dispatch(0);
    }
  }

  Promise.resolve().then(() => lazyman.run());
  return lazyman;
}

LazyMan('Tony').sleep(10).eat('lunch');