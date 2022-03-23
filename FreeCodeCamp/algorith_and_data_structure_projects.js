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


