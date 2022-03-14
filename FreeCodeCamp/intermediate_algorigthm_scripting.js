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

