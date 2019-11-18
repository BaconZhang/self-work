/**
 * @param {number[]} array
 * @returns {number[]}
 */
function bubbleSort(array) {
  const { length } = array;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - 1 - i; j++) {
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }
  return array;
}

const arr = [3, 4, 6, 5, 2, 1];
console.log(bubbleSort(arr));