// Palindrome Checker

function palindrome(str) {
  str = str.replace(/[\W_]/g, '').toLowerCase();
  console.log(str)
  if(str.length <= 1){
    return true
  }
  return str[0] == str[str.length-1] && palindrome(str.substr(1, str.length-2))
}

console.log(palindrome("1 eye for of 1 eye."));
console.log(palindrome("never odd or even"));
console.log(palindrome("0_0 (: /-\ :) 0-0"));
console.log(palindrome("race CAR"));
console.log(palindrome("A man, a plan, a canal. Panama"));


// 

// Roman Numeral Converter

function convertToRoman(num) {
  const dict = {
    1: 'I',
    5: 'V',
    10: 'X',
    50: 'L',
    100: 'C',
    500: 'D',
    1000: 'M',
  }
  // subtractors multiples of 10
  const substractors = {
    1: 'I',
    10: 'X',
    100: 'C',
    1000: 'M',
  }

  let val = ''
  let original_num = num
  let multiples = []

  //
  let keys = Object.keys(dict).reverse();
  console.log(keys)


  // subtract method

  let decimal_places = []
  
  let decimal = 1000
  let n = num
  while(decimal >= 1){
    let quot = ~~(n/decimal)
    //decimal_places.push([decimal, quot, n%decimal])
    decimal_places.push(quot +"x"+ decimal +"+"+ n%decimal)
    decimal /=10
  }
  console.log("num: ", num)
  for (var k = 0; k < keys.length; k++) {
    if(n == 0){
      break;
    }
    let digit = keys[k]
    let quot = ~~(n/digit)
    let remainder = n % digit

    //multiples.push(quot +"x"+ digit +"+"+ remainder)
    //console.log("q % 4", quot % 4)
    //console.log("r % 4", remainder % 4)
    if(quot != 0){
      if(quot < 4){
        let remainder_deci = parseInt('1'+'0'.repeat(remainder.toString().length-1));
        console.log('rd:', remainder_deci)
        console.log('rd/4', ~~(remainder / 4))
        if(~~(remainder / 4) > 0){
        //find previous
          let previous = keys[k-1];
          let deci = parseInt('1'+'0'.repeat(n.toString().length-1));
          console.log('r::', previous + "-" + deci + "+"+ remainder)
          val += dict[deci] + dict[previous]
          n -= previous - deci
          //console.log("d4: ", quot +"x"+ digit +"+"+ remainder)
        }else {
          console.log("d: ", quot +"x"+ digit +"+"+ remainder)
          console.log('r', remainder % 4)
          //n -= quot * digit
          val += dict[digit].repeat(quot)
          n = remainder
        }
      }else if(quot == 4){
        //find previous
        let previous = keys[k-1];
        let deci = parseInt('1'+'0'.repeat(n.toString().length-1));
        console.log('d::', previous + "-" + deci + "+"+ remainder)
        val += dict[deci] + dict[previous]
        n -= previous - deci

        //console.log("d4: ", quot +"x"+ digit +"+"+ remainder)
      }



      continue
      if(quot < 4){
        val += dict[digit].repeat(quot)
        n -= quot * digit
        continue
      }
      if(quot == 4){
        let previous = keys[k-1];
        let deci = parseInt('1'+'0'.repeat(n.toString().length-1));
        //val += previous + "-" + deci + "\n"
        val += dict[deci] + dict[previous]
        n -= previous - deci
        continue
      }
      if(quot > 4){
        let previous = keys[k-1];
        let deci = parseInt('1'+'0'.repeat(n.toString().length-1));
        //val += previous + "-" + deci + "\n"
        val += dict[deci] + dict[previous]
        n -= previous - deci
        continue
      }
      
      if(remainder == 0){
        val += dict[digit].repeat(quot)
        n -= quot * digit
        continue
      }
      if(remainder % 4 == 0){
      //console.log("n ", n)
        let previous = keys[k-1];
        let deci = parseInt('1'+'0'.repeat(n.toString().length-1));
        //val += previous + "-" + deci + "\n"
        val += dict[deci] + dict[previous]
        n -= previous - deci
        continue
      }
    }

  
  }

    //console.log(decimal_places)
    console.log(val)
    //console.log(multiples)
    return val;
}

convertToRoman(99);
//convertToRoman(36);









// Cash Register

function checkCashRegister(price, cash, cid) {
  const currency = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.1,
    "QUARTER": 0.25,
    "ONE": 1,
    "FIVE": 5,
    "TEN": 10,
    "TWENTY": 20,
    "ONE HUNDRED": 100
  }
  let status = "INSUFFICIENT_FUNDS";
  let change = [];
  
  let total_cash = cid.reduce((a, c) => {
   // return a += currency[c[0]] * c[1]
    return a += c[1]
  }, 0)
  // Amount of change to give
  let changeAmount = cash - price;
  console.log("$", changeAmount)

  // Cash in drawer is less
  if(changeAmount > total_cash){
    return {
      status,
      change
    }
  }
  // Equal change
  if(changeAmount == total_cash){
    status = "CLOSED"
    change = cid
    return {status, change}
  }

  // Calculate change
  // Find bills numbers
  let bills = cid.map(m => {
    //return [m[0], Math.floor(m[1]/currency[m[0]])]
    return {value: m[0], count: Math.floor(m[1]/currency[m[0]])}
  })
  // 
  let remainingChange = changeAmount
  
  bills.slice().reverse().forEach(b => {
      if(remainingChange > 0){
        if(b.count > 0){
          let amount = currency[b.value]
          let quot = ~~(remainingChange / amount)
          
          if(quot < b.count){
            let remainder = remainingChange % amount
            console.log (remainingChange, " = ", quot, "*", amount,"+", remainder)
            // add change
            change.push([
              b.value, quot * amount
            ])
            // update remaining change
            remainingChange = remainder
          }
        }
      }
   // }
  })

  // If remainingChange > 0
  if(remainingChange > 0){
    status = "INSUFFICIENT_FUNDS"
    change = []
    return {status, change}
  }

  status = "OPEN"

  //console.log(">> bills", bills)
  // Cannot return the exact change
  //console.log(">> price ", price)
  //console.log(">> cash ", cash)
  //console.log(">> total ", total_cash)
  return {status, change};
}

//checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])

checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])

//checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);







