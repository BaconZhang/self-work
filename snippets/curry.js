/**
 * 
 * @param {Function} func 
 * @param {Array} arr 
 */
const curry = (func, arr = []) => (...args) => {
  if (arr.concat(...args).length === func.length) {
    return func(...arr.concat(...args));
  }
  return curry(func, arr.concat(...args));
}

const sum3 = (a, b, c) => a + b + c;

console.log(curry(sum3)(1, 2)(3));