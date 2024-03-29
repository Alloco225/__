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



// Wherefore art thou

function whatIsInAName(collection, source) {
  const arr = [];
  // Only change code below this line
  let keys = Object.keys(source);

  collection.forEach(c => {
  
    if(keys.every(k =>  Object.keys(c).includes(k) && c[k] == source[k])){
      arr.push(c)
    }
  
  })
  console.log(arr)
  // Only change code above this line
  return arr;
}

whatIsInAName([{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], { last: "Capulet" });

whatIsInAName([{ "apple": 1, "bat": 2 }, { "bat": 2 }, { "apple": 1, "bat": 2, "cookie": 2 }], { "apple": 1, "bat": 2 });




// Spinal Tap Case

function spinalCase(str) {
  return str.replace(/[A-Z]/g, ' $&').trim().split(/[\W|_]+/g).join('-').toLowerCase()
}

console.log(spinalCase('The_Andy_Griffith_Show'));
console.log(spinalCase('This Is Spinal Tap'));
console.log(spinalCase('ThisIsSpinalTap'));





// Pig Latin

function translatePigLatin(str) {
  const vowels = 'aeiou';
  if(vowels.split('').includes(str[0])){
    return str+"way";
  }
  // voyel starts at
  let i = str.match(new RegExp(`[${vowels}]`))
  console.log(i)
  if(!i){
    return str+"ay";
  }
  i = i.index
  return str.substr(i) + str.substr(0, i)+ "ay";
}

console.log(translatePigLatin("california"));
console.log(translatePigLatin("rhythm"));
console.log(translatePigLatin("consonant"));




// Search and Replace

function myReplace(str, before, after) {
  after = before[0] == before[0].toUpperCase() ? after[0].toUpperCase() + after.substr(1) : after.toLowerCase();

  return str.replace(before, after)
}

console.log(myReplace("A quick brown fox jumped over the lazy dog", "jumped", "leaped"));
console.log(myReplace("Let us go to the store", "store", "mall"));
console.log(myReplace("This has a spellngi error", "spellngi", "spelling"));
console.log(myReplace("He is Sleeping on the couch", "Sleeping", "sitting"));
console.log(myReplace("His name is Tom", "Tom", "john"));





// DNA Pairing

function pairElement(str) {
  const pairs = {
    G: 'C',
    C: 'G',
    A: 'T',
    T: 'A',
  }
  const result = []
  for(var i = 0; i< str.length; i++){
    result.push([str[i], pairs[str[i]]])
  }
  return result
}

console.log(pairElement("GCG"));





// Missing letters

function fearNotLetter(str) {
  let a = str.charCodeAt(0)
  let z = str.charCodeAt(str.length-1)
  let index = 0;
  for(var i = a; i <= z; i++){
    if(str[index] != String.fromCharCode(i)){
      return String.fromCharCode(i);
    }
    index++;
  }
  return ;
}

console.log(fearNotLetter("abce"));
console.log(fearNotLetter("abcdefghjklmno"));
console.log(fearNotLetter("stvwx"));




// Sorted Union

function uniteUnique(...arr) {
  let params = [...arr]
  let res = []
  params.forEach(list => {
    list.forEach(e => {
      if(!res.includes(e)){
        res.push(e)
      }
    })
  })
  return res;
}

console.log(uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1]));
console.log(uniteUnique([1, 2, 3], [5, 2, 1]));




// Convert HTML Entities

function convertHTML(str) {
  const data = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&apos;',
  }
  Object.keys(data).forEach(key =>{
    str = str.replace(new RegExp(key, 'g'), data[key])
  })
  return str;
}

console.log(convertHTML("Dolce & Gabbana"));
console.log(convertHTML("Hamburgers < Pizza < Tacos"));



// Sum All Odd Fibonacci Numbers

function sumFibs(num) {
  // calculate fibs
  let fibs = []
  let n = 0;
  let n1 = 1;
  let n2 = 1;
  fibs.push(n1, n2)
  while(n <= num){
    n = n1 + n2
    n1 = n2
    n2 = n
    fibs.push(n);
  }
  // sum
  let s = fibs.filter(f => f <= num && f%2!=0).reduce((a, c) => a += c, 0);
  return s
}

console.log(sumFibs(1));
console.log(sumFibs(4));
console.log(sumFibs(1000));
console.log(sumFibs(4000000));
console.log(sumFibs(75024));
console.log(sumFibs(75025));



// Sum All Primes

function sumPrimes(num) {
  let sum = 2;
  for(let n = 3; n <= num; n++){
    let isPrime = true
    for(let i = 2; i < n; i++){
      if(n%i == 0){
        isPrime = false;
      }
    }
    if(isPrime){
      sum += n
    }
  }
  return sum;
}

console.log(sumPrimes(10));
console.log(sumPrimes(977));



// draft // TODO
// Smallest Common Multiple

function smallestCommons(arr) {
  let num;
  // Setup total range [min..max]
  let min = Math.min(...arr)
  let max = Math.max(...arr)
  let whole_range = []
  for(let i = min; i<= max; i++){
    whole_range.unshift(i)
  }
  // divide by biggest numbers
  let count = 2;
  let divisible_by_erryone = false;
  let range = []
  // 
  
 
  while(!divisible_by_erryone && count < whole_range.length){
    range = whole_range.slice(0, count)
    num = range.reduce((a, c) => a*c, 1)
    divisible_by_erryone = whole_range.every(n => num % n == 0)
    count++
  }
  if(num == whole_range.reduce((a, c) => a*c, 1)){
    return num
  }
  // curate num with unselected range
  let other_range = whole_range.slice(count);
  //let other_range = whole_range.slice().reverse();
  if(other_range.length > 0){
    for(let t= 0; t < other_range.length; t++){
      if(num % other_range[t] == 0){
        let new_num = num / other_range[t]
        let divisible = whole_range.every(n => new_num % n == 0)
        if(new_num < num && divisible){
          num = new_num
          //console.log("currated", num)
        }
      }
    }
  }
  return num
}

console.log(72681840/6056820);
console.log(18*19*20*21*22*23);
console.log(smallestCommons([23,18]));
//
console.log(smallestCommons([1,3]));
console.log(smallestCommons([1,4]));
console.log(smallestCommons([1,5]));
console.log(smallestCommons([2,10]));
console.log(smallestCommons([1,13]));
















// Drop it

function dropElements(arr, func) {
  let index = arr.findIndex(func)
  if(~index){
   return arr.splice(index)
  }
  return []
  
}

console.log(dropElements([1, 2, 3], function(n) {return n < 3;}));
console.log(dropElements([1, 2, 3, 4], function(n) {return n > 33;}));
console.log(dropElements([0, 1, 0, 1], function(n) {return n === 1;}));


// Steamroller
function steamrollArray(arr) {

  let c = 0;
  let flatten = false
  while(!flatten && c < 10000){
    flatten = arr.every(a => !(a instanceof Array))
    console.log(flatten)
    arr.forEach((a,i) => {
      console.log(">> a ", a)
      if(a instanceof Array){
        arr.splice(i, 1, ...a)
      }
    })
    c++
  }
  return arr;
}

steamrollArray([1, [2]]);
steamrollArray([1, [2], [3, [[4]]]]);



// Everything Be True

function truthCheck(collection, pre) {
  return collection.every(c => c[pre]);
}

truthCheck([{name: "Quincy", role: "Founder", isBot: false}, {name: "Naomi", role: "", isBot: false}, {name: "Camperbot", role: "Bot", isBot: true}], "isBot");





// Arguments Optional

function addTogether(a, b = null) {
  console.log(typeof a, typeof b)
  if (typeof a != "number") return;
  if (b && typeof b != "number") return;
  return b ? a + b : (b_) => {
  if (typeof b_ != "number") return;
    return a + b_
  };
}

console.log(addTogether(2, "3"));




// Make a Person

const Person = function(firstAndLast) {
  // Only change code below this line
  // Complete the method below and implement the others similarly
  Person.prototype.firstAndLast = firstAndLast
  
  this.getFullName = function() {
    return Person.prototype.firstAndLast;
  };
  this.getFirstName = function() {
    return this.getFullName().split(" ")[0];
  };
  this.getLastName = function() {
    return this.getFullName().split(" ")[1];
  };
  this.setFirstName = function(n) {
    Person.prototype.firstAndLast = Person.prototype.firstAndLast.replace(/\w+\s/, n+" ")
    
  };
  this.setLastName = function(n) {
    Person.prototype.firstAndLast = Person.prototype.firstAndLast.replace(/\s\w+/, " "+n)
  };
  this.setFullName = function(n) {
    Person.prototype.firstAndLast = n
  };

  return firstAndLast;
};

const bob = new Person('Bob Ross');
bob.setFirstName("Jake")
console.log(bob.getFullName());



// Map the Debris

function orbitalPeriod(arr) {
  const GM = 398600.4418;
  const earthRadius = 6367.4447;
  return arr.slice().map(elem => {
    return {
      name: elem.name, orbitalPeriod: Math.round(2*Math.PI * Math.sqrt(Math.pow((elem.avgAlt+earthRadius), 3)/GM))
      }
  });
}

console.log(orbitalPeriod([{name : "sputnik", avgAlt : 35873.5553}]));



//



