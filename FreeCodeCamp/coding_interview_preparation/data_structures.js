








// 3 Create a Circular Queue

class CircularQueue {
  constructor(size) {

    this.queue = [];
    this.read = 0;
    this.write = 0;
    this.max = size - 1;

    while (size > 0) {
      this.queue.push(null);
      size--;
    }
  }

  print() {
    return this.queue;
  }

  enqueue(item) {
    // Only change code below this line
    if(this.queue[this.write] != null){
      return null
    }
    this.queue[this.write] = item
    this.write++
    if(this.write > this.max) this.write = 0
    return item
    // Only change code above this line
  }

  dequeue() {
    // Only change code below this line
    if(this.queue[this.read] == null){
      return null
    }
    let k = this.queue[this.read]
    this.queue[this.read] = null

    this.read++
    if(this.read > this.max) this.read = 0
    return k
    // Only change code above this line
  }
}






// Create a Set
class Set {
  constructor() {
    // Dictionary will hold the items of our set
    this.dictionary = {};
    this.length = 0;
  }

  // This method will check for the presence of an element and return true or false
  has(element) {
    return this.dictionary[element] !== undefined;
  }

  // This method will return all the values in the set
  values() {
    return Object.values(this.dictionary);
  }

  // Only change code below this line
  add(element){
    if(this.has(element)){
      return false
    }
    this.dictionary[element] = element
    return true


  }
  //
  remove = function(element){
    if(!this.has(element)){
      return false
    }
    delete this.dictionary[element]
    return true
  }

  size(){
    return this.values().length
  }
  // Only change code above this line
}


// Perform a Union on Two Sets

class Set {
  constructor() {
    // This will hold the set
    this.dictionary = {};
    this.length = 0;
  }
  // This method will check for the presence of an element and return true or false
  has(element) {
    return this.dictionary[element] !== undefined;
  }
  // This method will return all the values in the set
  values() {
    return Object.values(this.dictionary);
  }
  // This method will add an element to the set
  add(element) {
    if (!this.has(element)) {
      this.dictionary[element] = element;
      this.length++;
      return true;
    }

    return false;
  }
  // This method will remove an element from a set
  remove(element) {
    if (this.has(element)) {
      delete this.dictionary[element];
      this.length--;
      return true;
    }

    return false;
  }
  // This method will return the size of the set
  size() {
    return this.length;
  }
  // Only change code below this line
  union(other_set){
    
    other_set.values().forEach(v => {
      if(!this.has(v)){
        this.add(v)
      }
    })
    return this
  }
  // Only change code above this line
}











// 3 Create a Circular Queue

class CircularQueue {
  constructor(size) {

    this.queue = [];
    this.read = 0;
    this.write = 0;
    this.max = size - 1;

    while (size > 0) {
      this.queue.push(null);
      size--;
    }
  }

  print() {
    return this.queue;
  }

  enqueue(item) {
    // Only change code below this line
    if(this.queue[this.write] != null){
      return null
    }
    this.queue[this.write] = item
    this.write++
    if(this.write > this.max) this.write = 0
    return item
    // Only change code above this line
  }

  dequeue() {
    // Only change code below this line
    if(this.queue[this.read] == null){
      return null
    }
    let k = this.queue[this.read]
    this.queue[this.read] = null

    this.read++
    if(this.read > this.max) this.read = 0
    return k
    // Only change code above this line
  }
}






// Create a Set
class Set {
  constructor() {
    // Dictionary will hold the items of our set
    this.dictionary = {};
    this.length = 0;
  }

  // This method will check for the presence of an element and return true or false
  has(element) {
    return this.dictionary[element] !== undefined;
  }

  // This method will return all the values in the set
  values() {
    return Object.values(this.dictionary);
  }

  // Only change code below this line
  add(element){
    if(this.has(element)){
      return false
    }
    this.dictionary[element] = element
    return true


  }
  //
  remove = function(element){
    if(!this.has(element)){
      return false
    }
    delete this.dictionary[element]
    return true
  }

  size(){
    return this.values().length
  }
  // Only change code above this line
}


// Perform a Union on Two Sets

class Set {
  constructor() {
    // This will hold the set
    this.dictionary = {};
    this.length = 0;
  }
  // This method will check for the presence of an element and return true or false
  has(element) {
    return this.dictionary[element] !== undefined;
  }
  // This method will return all the values in the set
  values() {
    return Object.values(this.dictionary);
  }
  // This method will add an element to the set
  add(element) {
    if (!this.has(element)) {
      this.dictionary[element] = element;
      this.length++;
      return true;
    }

    return false;
  }
  // This method will remove an element from a set
  remove(element) {
    if (this.has(element)) {
      delete this.dictionary[element];
      this.length--;
      return true;
    }

    return false;
  }
  // This method will return the size of the set
  size() {
    return this.length;
  }
  // Only change code below this line
  union(other_set){
    
    other_set.values().forEach(v => {
      if(!this.has(v)){
        this.add(v)
      }
    })
    return this
  }
  // Only change code above this line
}

// Perform an Intersection on Two Sets of Data

class Set {
  constructor() {
    // This will hold the set
    this.dictionary = {};
    this.length = 0;
  }
  // This method will check for the presence of an element and return true or false
  has(element) {
    return this.dictionary[element] !== undefined;
  }
  // This method will return all the values in the set
  values() {
    return Object.keys(this.dictionary);
  }
  // This method will add an element to the set
  add(element) {
    if (!this.has(element)) {
      this.dictionary[element] = true;
      this.length++;
      return true;
    }

    return false;
  }
  // This method will remove an element from a set
  remove(element) {
    if (this.has(element)) {
      delete this.dictionary[element];
      this.length--;
      return true;
    }

    return false;
  }
  // This method will return the size of the set
  size() {
    return this.length;
  }
  // This is our union method 
  union(set) {
    const newSet = new Set();
    this.values().forEach(value => {
      newSet.add(value);
    })
    set.values().forEach(value => {
      newSet.add(value);
    })

    return newSet;
  }
  // Only change code below this line
  intersection(set){
    const newSet = new Set();
    this.values().forEach(value => {
      if(set.has(value)){
        newSet.add(value)
      }
    })
    return newSet
  }
  // Only change code above this line
}

// Perform a Difference on Two Sets of Data

class Set {
  constructor() {
    // This will hold the set
    this.dictionary = {};
    this.length = 0;
  }
  // This method will check for the presence of an element and return true or false
  has(element) {
    return this.dictionary[element] !== undefined;
  }
  // This method will return all the values in the set
  values() {
    return Object.keys(this.dictionary);
  }
  // This method will add an element to the set
  add(element) {
    if (!this.has(element)) {
      this.dictionary[element] = true;
      this.length++;
      return true;
    }

    return false;
  }
  // This method will remove an element from a set
  remove(element) {
    if (this.has(element)) {
      delete this.dictionary[element];
      this.length--;
      return true;
    }

    return false;
  }
  // This method will return the size of the set
  size() {
    return this.length;
  }
  // This is our union method 
  union(set) {
    const newSet = new Set();
    this.values().forEach(value => {
      newSet.add(value);
    })
    set.values().forEach(value => {
      newSet.add(value);
    })

    return newSet;
  }
  // This is our intersection method
  intersection(set) {
    const newSet = new Set();

    let largeSet;
    let smallSet;
    if (this.dictionary.length > set.length) {
      largeSet = this;
      smallSet = set;
    } else {
      largeSet = set;
      smallSet = this;
    }

    smallSet.values().forEach(value => {
      if (largeSet.dictionary[value]) {
        newSet.add(value);
      }
    })

    return newSet;
  }
  // Only change code below this line
  difference(set){
    const newSet = new Set()
    
    this.values().forEach(value =>{
      if(!set.has(value))
      newSet.add(value)
    })
    return newSet
  }
  // Only change code above this line
}


// Perform a Subset Check on Two Sets of Data

class Set {
  constructor() {
    // This will hold the set
    this.dictionary = {};
    this.length = 0;
  }
  // This method will check for the presence of an element and return true or false
  has(element) {
    return this.dictionary[element] !== undefined;
  }
  // This method will return all the values in the set
  values() {
    return Object.keys(this.dictionary);
  }
  // This method will add an element to the set
  add(element) {
    if (!this.has(element)) {
      this.dictionary[element] = true;
      this.length++;
      return true;
    }

    return false;
  }
  // This method will remove an element from a set
  remove(element) {
    if (this.has(element)) {
      delete this.dictionary[element];
      this.length--;
      return true;
    }

    return false;
  }
  // This method will return the size of the set
  size() {
    return this.length;
  }
  // This is our union method 
  union(set) {
    const newSet = new Set();
    this.values().forEach(value => {
      newSet.add(value);
    })
    set.values().forEach(value => {
      newSet.add(value);
    })

    return newSet;
  }
  // This is our intersection method
  intersection(set) {
    const newSet = new Set();

    let largeSet;
    let smallSet;
    if (this.dictionary.length > set.length) {
      largeSet = this;
      smallSet = set;
    } else {
      largeSet = set;
      smallSet = this;
    }

    smallSet.values().forEach(value => {
      if (largeSet.dictionary[value]) {
        newSet.add(value);
      }
    })

    return newSet;
  }

  difference(set) {
    const newSet = new Set();

    this.values().forEach(value => {
      if (!set.dictionary[value]) {
        newSet.add(value);
      }
    })

    return newSet;
  }
  // Only change code below this line
  isSubsetOf(set){
    return this.values().every(value => set.has(value))
  }
  // Only change code above this line
}




// Create and Add to Sets in ES6

function checkSet() {
  var set = new Set([1, 2, 3, 3, 2, 1, 2, 3, 1]);
  // Only change code below this line
  ['Taco', 'Cat', 'Awesome'].forEach(v => set.add(v))
  // Only change code above this line
  console.log(Array.from(set));
  return set;
}

checkSet();


// Remove items from a set in ES6

function checkSet(){
  // Only change code below this line
  var set = new Set([1, 2, 3, 4, 5])
  //[2, 5].forEach(v => set.delete(v))
  set.delete(2)
  set.delete(5)
  console.log("set",[...set], set)
  // Only change code above this line
  return set;   
}




// Use .has and .size on an ES6 Set

function checkSet(arrToBeSet, checkValue){

   // Only change code below this line
   var set = new Set(arrToBeSet)
   return [set.has(checkValue), set.size]
   // Only change code above this line

}

// Use Spread and Notes for ES5 Set() Integration

function checkSet(set){
   // Only change code below this line
   return [...set]
   // Only change code above this line
}


// Create a Map Data Structure

var Map = function() {
  this.collection = {};
  // Only change code below this line
  this.add = function(key, value){
    this.collection[key] = value
  }
  this.remove = function(key){
    if(this.has(key))
      delete this.collection[key]
  }
  this.get = function(key){
    return this.collection[key]
  }
  this.has = function(key){
    return this.collection[key] !== undefined
  }
  this.values = function(){
    return Object.values(this.collection)
  }
  this.size = function(){
    return this.values().length
  }

  this.clear = function(){
    this.collection = {}
  }

  // Only change code above this line
};


// Create an ES6 JavaScript Map

let myMap = new Map()

myMap.set('freeCodeCamp', "Awesome!")



// Create a Hash Table
var called = 0;
var hash = string => {
  called++;
  var hashed = 0;
  for (var i = 0; i < string.length; i++) {
    hashed += string.charCodeAt(i);
  }
  return hashed;
};
var HashTable = function() {
  this.collection = {};
  // Only change code below this line
  this.called = 0;
  this.add = function(key, value){
      let new_key = hash(key) + key
      this.collection[new_key] = value
      this.called ++
  }
  this.remove = function(key){
    let hashed_key = hash(key) +key
    //this.called ++
    console.log("> remove", key, hashed_key, called, this.called)
    if(this.collection[hashed_key])
    delete this.collection[hashed_key]
  }
  this.lookup = function(key) {
    let hashed_key = hash(key) +key

    if(!this.collection[hashed_key])
      return null
      return this.collection[hashed_key]
  }
  // Only change code above this line
};


// Work with Nodes in a Linked List

var Node = function(element) {
  this.element = element;
  this.next = null;
};
var Kitten = new Node('Kitten');
var Puppy = new Node('Puppy');

Kitten.next = Puppy;
// Only change code below this line
var Cat = new Node('Cat')
var Dog = new Node('Dog')
Puppy.next = Cat
Cat.next = Dog


// Create a Linked List Class

function LinkedList() {
  var length = 0;
  var head = null;

  var Node = function (element) {
    this.element = element;
    this.next = null;
  };

  this.head = function () {
    return head;
  };

  this.size = function () {
    return length;
  };

  this.add = function (element) {
    // Only change code below this line
    console.log("add", element, length, head)
    var node = new Node(element)
    if (length == 0) { 
      head = node 
    }
    else {
      let n = head
      while(n.next != null){
        n = n.next
      }
      n.next = node
    }
    length ++
    console.log("added", element, length, head)

    
    // Only change code above this line
  };
}




