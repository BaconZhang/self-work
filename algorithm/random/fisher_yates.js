const array = Array.from({ length: 54 }, (_, i) => i + 1);

/**
 * @param {number[]} array 
 */
function fisher_yates(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}

console.log(array);
console.log(fisher_yates(array));