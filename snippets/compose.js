const compose = (...funcs) => (...a) => ([...funcs].reduce((prev, func) => (...v) => prev(func(...v))))(...a);

const result = compose(
  a => a + 1,
  b => b * 2,
  c => c + 3
)(1);

console.log(result);