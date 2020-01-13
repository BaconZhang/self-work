const compose = funcs => funcs.reduceRight((a, b) => (...args) => a(b(...args)));

class LazyArray {
  constructor(arr = []) {
    this.arr = arr;
    this.funcs = [];
  }

  static of(arr) {
    return new LazyArray(arr);
  }

  map(cb) {
    this.funcs.push({
      type: "map",
      cb
    });
    return this;
  }

  filter(cb) {
    this.funcs.push({
      type: "filter",
      cb
    });
    return this;
  }

  run() {
    const result = [];
    for (let [value, index] of this.arr.entries()) {
      result.push(compose(this.mapFuncs)(value, index));
    }
    return result;
  }

  get() {
    return this.run();
  }
}

console.log(LazyArray.of([1, 2, 3]).map(i => i + 1).map(i => i * 2).get());