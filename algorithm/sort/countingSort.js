/**
 * @param {number[]} array
 * @returns {number[]}
 */
function coutingSort(array) {
  if (array.length < 2) {
    return array;
  }
  const max = Math.max(...array);
  const counts = Array.from({ length: max + 1 }, () => 0);
  for (let num of array) {
    counts[num] += 1;
  }
  let result = [];
  for (let i = 0; i < counts.length; i++) {
    if (counts[i] > 0) {
      result = result.concat(Array.from({ length: counts[i] }, () => i));
    }
  }
  return result;
}


const arr = [3, 4, 6, 5, 2, 1, 9, 12, 10, 12, 11];
console.log(coutingSort(arr));