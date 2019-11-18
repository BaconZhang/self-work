/**
 * @param {number[]} array 
 * @returns {number[]}
 */
function selectionSort(array) {
  for (let i = 0; i < array.length; i++) {
    let minIndex = -1;
    let minValue = null;
    for (let j = i; j < array.length; j++) {
      if (minValue === null) {
        minValue = array[j];
        minIndex = j;
      }
      if (array[j] < minValue) {
        minValue = array[j];
        minIndex = j;
      }
    }
    if (minIndex > 0) {
      [array[i], array[minIndex]] = [arr[minIndex], array[i]];
    }
  }
  return array;
}

const arr = [3, 4, 6, 5, 2, 1, 9, 12, 10, 12, 11];
console.log(selectionSort(arr));