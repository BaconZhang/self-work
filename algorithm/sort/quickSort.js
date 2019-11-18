/**
 * @param {number[]} array 
 * @returns {number[]}
 */
function quickSort(array) {
  if (array.length < 2) {
    return array;
  }
  const privotIndex = Math.floor(array.length / 2);
  const privot = array[privotIndex];
  const left = [];
  const right = [];
  for (let i = 0; i < array.length; i++) {
    if (i === privotIndex) {
      continue;
    }
    if (array[i] < privot) {
      left.push(array[i])
    } else {
      right.push(array[i]);
    }
  }
  return [
    ...quickSort(left),
    privot,
    ...quickSort(right)
  ]
}

const arr = [3, 4, 6, 5, 2, 1, 9, 12, 10, 12, 11];
console.log(quickSort(arr));