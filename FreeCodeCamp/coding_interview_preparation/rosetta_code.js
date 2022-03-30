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

