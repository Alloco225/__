// Restrict Possible Usernames

let username = "JackOfAllTrades";
//let userCheck = /[[a-z]{2}|^[a-z][^0-9]*[0-9]+$]/i; // Change this line
//let userCheck = /[[a-z]{2}|^[a-z][^0-9]*[0-9]+$]/i; // Change this line
let userCheck = /^[a-z]{2,}[0-9]*$|^[a-z][0-9]{2,}$/i; // Change this line
let result = userCheck.test(username);
