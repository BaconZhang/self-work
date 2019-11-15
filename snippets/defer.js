function defer(fn) {
  Promise.resolve().then(fn);
}

function test() {
  const list = [];
  defer(() => console.log(list.reduce((a, b) => a + b)));
  for (let i = 1; i <= 100; i++) {
    list.push(i);
  }
  return list.length;
}

console.log(test());