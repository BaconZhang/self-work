const asyncCompose = (...funcs) => (...a) => ([...funcs].reduce((prev, func) => (...v) => Promise.resolve(func(...v)).then(prev)))(...a);

asyncCompose(
  a => Promise.resolve(3).then(v => v + a),
  a => a * 2,
  a => Promise.resolve(1).then(v => v + a)
)(1).then(v => console.log(v));