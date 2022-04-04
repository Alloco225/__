








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
