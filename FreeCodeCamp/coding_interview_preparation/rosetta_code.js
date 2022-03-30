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






// $$$$$$$$$$$$$$$$$$
// Align columns
function formatText(input, justification) {
  console.log("formatText", justification)
  let result = input.slice().map(a => a.replace(/\$/g, ' '))
  let longest_string_length = result.sort((r, b) => { return b.length - r.length })[0].length

  for (let i = 0; i < result.length; i++) {
    let line = result[i]
    let number_of_spaces = line.match(/ /g).length
    let spaces_to_fill = longest_string_length - line.length
    let number_of_spaces_to_add_per_spot = Math.floor(spaces_to_fill / number_of_spaces);


    let extra_space = spaces_to_fill % number_of_spaces;

    //console.log("line", number_of_spaces, "to fill", spaces_to_fill, "spaces/spot", number_of_spaces_to_add_per_spot, "extra:", extra_space)




    let words = line.split(' ')
    //console.log(">>", words)
    words = words.map((w, i) => {
      let spaces = ' '
      //if (i == 0) {
        //spaces = ' '.repeat(extra_space)
      //}
      if(number_of_spaces_to_add_per_spot > 0){
        spaces = ' '.repeat(number_of_spaces_to_add_per_spot)
      }
      if (i == words.length - 1) {
        spaces = ''
      }
      //console.log("spaces", spaces.length)
      let format = w;
      switch (justification) {
        case "right":
          format = spaces + w
          break;
        case "left":
          format = w + spaces
          break;
        case "center":
          let c = Math.floor(number_of_spaces_to_add_per_spot/2)
          if(c > 0){
            spaces = ' '.repeat()
          }

          format = spaces + w + spaces
          break;
      }
      return format
    })
    //console.log(" wordss", words)
    // Rejoin words
    line = words.join('')
    result[i] = line
    //console.log(">l", line)
  }
  //console.log("\n\nr", result)
  result.forEach(r => {
    console.log(r)
  })

  console.log(" ")

  return result
}

const testText = [
  'Given$a$text$file$of$many$lines',
  'where$fields$within$a$line$',
  'are$delineated$by$a$single$"dollar"$character',
  'write$a$program',
  'that$aligns$each$column$of$fields$',
  'by$ensuring$that$words$in$each$',
  'column$are$separated$by$at$least$one$space.',
  'Further,$allow$for$each$word$in$a$column$to$be$either$left$',
  'justified,$right$justified',
  'or$center$justified$within$its$column.'
];


formatText(testText, 'right')
formatText(testText, 'left')
formatText(testText, 'center')
