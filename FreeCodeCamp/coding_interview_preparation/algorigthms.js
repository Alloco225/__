














// Inventory Update

function updateInventory(arr1, arr2) {
    arr2.forEach(newArticle => {
        // check if exists
        let currIndex = arr1.findIndex(a => a[1] == newArticle[1])
        if (~currIndex) {
            let data = [arr1[currIndex][0]+ newArticle[0], newArticle[1]]
            arr1.splice(currIndex, 1, data)
        } else {
            arr1.push(newArticle)
        }
    })

    arr1 = arr1.sort((a, b) => {
        let x = a[1][0].toLowerCase();
        let y = b[1][0].toLowerCase();
        if (x < y) { return -1; }
        if (x > y) { return 1; }
        return 0;
    })
    return arr1
}

// Example inventory lists
var curInv = [
    [21, "Bowling Ball"],
    [2, "Dirty Sock"],
    [1, "Hair Pin"],
    [5, "Microphone"]
];

var newInv = [
    [2, "Hair Pin"],
    [3, "Half-Eaten Apple"],
    [67, "Bowling Ball"],
    [7, "Toothpaste"]
];

//console.log(updateInventory(curInv, newInv));
console.log(updateInventory([[21, "Bowling Ball"], [2, "Dirty Sock"], [1, "Hair Pin"], [5, "Microphone"]],
    [[2, "Hair Pin"], [3, "Half-Eaten Apple"], [67, "Bowling Ball"], [7, "Toothpaste"]]));
    
    
    
    
    
    



// Pairwise

function pairwise(arr, arg) {
  let sum = 0
  let indices = []
   arr.forEach((first, firstIndex) => {
    arr.forEach((second, secondIndex) => {
      if(firstIndex != secondIndex){
        if(first + second == arg){
          if(!(indices.includes(firstIndex) || indices.includes(secondIndex))){
            indices.push(firstIndex, secondIndex)
          }
        }
      }
    })
  });
  sum = indices.reduce((sum, curr)=> sum+=curr, 0)
  console.log(sum, indices)
  return sum
}

pairwise([1, 3, 2, 4], 4)
pairwise([1, 1, 2], 3)
pairwise([7, 9, 11, 13, 15], 20)
//pairwise([1,4,2,3,0,5], 7);





    
    
