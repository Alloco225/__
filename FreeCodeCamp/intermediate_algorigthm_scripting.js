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



// 



