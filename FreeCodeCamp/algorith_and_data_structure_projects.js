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
