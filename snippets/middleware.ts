type MiddleWareFunc = (next: () => Promise<any>) => Promise<any>;

class MiddleWare {
  private funcs: MiddleWareFunc[];
  private index: number;
  constructor() {
    this.funcs = [];
    this.index = -1;
  }

  use(func: MiddleWareFunc) {
    this.funcs.push(func);
  }

  dispatch(i: number): Promise<any> {
    if (i >= this.funcs.length) {
      return Promise.resolve();
    }
    if (i <= this.index) {
      throw new Error("next called more than one time");
    }
    this.index = i;
    const func = this.funcs[i];
    const next = () => {
      return this.dispatch(i + 1);
    };
    try {
      return Promise.resolve(func(next));
    } catch (err) {
      return Promise.reject(err);
    }
  }

  run() {
    this.index = -1;
    return this.dispatch(0);
  }
}

const middleware = new MiddleWare();

const a = (next) => {
  console.log("1 start")
  return next().then(() => console.log("1 end"));
};
const c = (next) => {
  console.log("3 start")
  return next().then(() => console.log("3 end"));
};
const b = (next) => {
  console.log("2 start");
  return next().then(() => console.log("2 end"));
};

middleware.use(a);
middleware.use(b);
middleware.use(c);

middleware.run();