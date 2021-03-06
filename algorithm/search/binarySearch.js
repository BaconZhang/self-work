/**
 * @param {number[]} array
 * @param {number} target
 * @return {boolean}
 */
function binarySearch1(array, target) {
  array = quickSort(array);
  let low = 0;
  let high = array.length - 1;
  while (high > low) {
    const mid = Math.floor((low + high) / 2);
    const elm = array[mid];
    if (elm < target) {
      low = mid + 1;
    } else if (elm > target) {
      high = mid - 1;
    } else {
      return true;
    }
  }
  return false;
}

/**
 * @param {number[]} array
 * @param {number} target
 * @return {boolean}
 */
function binarySearch2(array, target) {
  array = mergeSort(array);
  const search = (arr) => {
    if (arr.length < 2) {
      return arr[0] === target;
    }
    const mid = Math.floor(arr.length / 2);
    if (target < arr[mid]) {
      return search(arr.slice(0, mid));
    } else if (target > arr[mid]) {
      return search(arr.slice(mid + 1));
    } else {
      return true;
    }
  }
  return search(array);
}

/**
 * @param {number[]} array
 * @return {number[]}
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
    if (i === privotIndex) continue;
    if (array[i] < privot) {
      left.push(array[i]);
    } else {
      right.push(array[i]);
    }
  }
  return [
    ...quickSort(left),
    privot,
    ...quickSort(right)
  ];
}

/**
 * @param {number[]} array
 * @return {number[]}
 */
function mergeSort(array) {
  if (array.length < 2) {
    return array;
  }
  const mid = Math.floor(array.length / 2);
  const left = array.slice(0, mid);
  const right = array.slice(mid);
  return merge(
    mergeSort(left),
    mergeSort(right)
  );
}

/**
 * @param {number[]} left
 * * @param {number[]} right
 * @return {number[]}
 */
function merge(left, right) {
  let i = 0;
  let j = 0;
  let result = [];
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }
  if (i < left.length) {
    result = result.concat(left.slice(i));
  } else {
    result = result.concat(right.slice(j));
  }
  return result;
}

const arr = [3, 4, 6, 5, 2, 1, 9, 12, 10, 12, 11];
console.log(binarySearch2(arr, 1));
console.log(binarySearch2(arr, 15));