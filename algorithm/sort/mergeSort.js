/**
 * @param {number[]} array 
 * @returns {number[]}
 */
function mergeSort(array) {
  if (array.length <= 1) {
    return array;
  }
  const middle = Math.floor(array.length / 2);
  const left = mergeSort(array.slice(0, middle));
  const right = mergeSort(array.slice(middle));
  return merge(left, right);
}

/**
 * @param {number[]} array 
 * @returns {number[]}
 */
function merge(left, right) {
  let i = 0;
  let j = 0;
  const result = [];
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  };
  return result.concat(i < left.length ? left.slice(i) : right.slice(j));
}

const arr = [3, 4, 6, 5, 2, 1, 9, 12, 10, 12, 11];
console.log(mergeSort(arr));