/**
 * @param {number[]} array
 * @returns {number[]}
 */
function insertSort(array) {
  let result = [array[0]];
  for (let i = 1; i < array.length; i++) {
    for (let j = 0; j < result.length; j++) {
      if (array[i] < result[j]) {
        result = [
          ...result.slice(0, j),
          array[i],
          ...result.slice(j)
        ];
        break;
      }
      if (j === result.length - 1) {
        result.push(array[i]);
        break;
      }
    }
  }
  return result;
}

const arr = [3, 4, 6, 5, 2, 1, 9, 12, 10, 12, 11];
console.log(insertSort(arr));