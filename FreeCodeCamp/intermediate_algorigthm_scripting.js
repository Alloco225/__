//Sum All Numbers in a Range

function sumAll(arr) {
  let min = Math.min(arr[0],arr[1]);
  let max = Math.max(arr[0],arr[1]);
  let s = 0
  for(var x = min; x <= max; x++){
    s+= x
  }
  return s
}

console.log(sumAll([1, 4]));



// Diff Two Arrays

function diffArray(arr1, arr2) {
  const newArr = [];
  arr2.forEach(i => {
    if(arr1.every(a => a != i)){
      newArr.push(i)
    }
  })
  arr1.forEach(i => {
    if(arr2.every(a => a != i)){
      newArr.push(i)
    }
  })
  return newArr;
}


console.log(diffArray([1, 2, 3, 5], [1, 2, 3, 4, 5]));
console.log(diffArray(["diorite", "andesite", "grass", "dirt", "pink wool", "dead shrub"], ["diorite", "andesite", "grass", "dirt", "dead shrub"]));



// Seek and Destroy

function destroyer(arr, ...args) {
  [...args].forEach(a => {
    let elems = arr.filter(v => v == a)
    elems.forEach(e => arr.splice(arr.indexOf(e), 1))
  })
  return arr;
}

console.log(destroyer([1, 2, 3, 1, 2, 3], 2, 3));
console.log(destroyer([1, 2, 3, 5, 1, 2, 3], 2, 3));
console.log(destroyer([3, 5, 1, 2, 2], 2, 3, 5));




