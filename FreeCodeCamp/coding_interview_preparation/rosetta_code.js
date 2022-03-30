// 100 doors

function getFinalOpenedDoors(numDoors) {
  console.log("finaliOpened", numDoors)
  let doors = new Array(numDoors).fill(false)
  console.log(doors.filter(d => d).length)
  for(let pass = 1; pass <= numDoors; pass++){
    for(let d = 0; d < doors.length; d++){
      if((d+1)%pass == 0){
        doors[d] = !doors[d]
        console.log("pass", pass, "door", d+1, doors.filter(d => d).length)
      }
    }
  }
  let result = []
  doors.forEach((d, i)=>{
    if(d){
      result.push(i+1)
    }
  })
  
  return result
}

console.log(getFinalOpenedDoors(5))




// ***************

// ***************

// ***************

// ***************





// ABC Problem

function canMakeWord(word) {
  const BASE_BLOCKS = [
    ['B', 'O'],
    ['X', 'K'],
    ['D', 'Q'],
    ['C', 'P'],
    ['N', 'A'],
    ['G', 'T'],
    ['R', 'E'],
    ['T', 'G'],
    ['Q', 'D'],
    ['F', 'S'],
    ['J', 'W'],
    ['H', 'U'],
    ['V', 'I'],
    ['A', 'N'],
    ['O', 'B'],
    ['E', 'R'],
    ['F', 'S'],
    ['L', 'Y'],
    ['P', 'C'],
    ['Z', 'M'],
  ]

  let blocks = BASE_BLOCKS.slice();

  let last_letter = 0;
  for(var l = 0; l < word.length; l++){
    let letter = word[l]
    let index = blocks.findIndex(b => b.includes(letter.toUpperCase()))
    if(~index){
      //console.log("block", blocks[index], blocks.length)
      last_letter = l;
      blocks.splice(index, 1)
    }else{
      break
    }
  }

  return last_letter == word.length -1
}


console.log(canMakeWord("bark"))




// Ackermann function
function ack(m, n) {
  if(m == 0) return n +1
  if(n == 0) return ack(m-1, 1)
  return ack(m-1, ack(m, n-1))
}


