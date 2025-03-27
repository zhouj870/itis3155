// variables
// let a = 5;
// console.log(a);
// a = 10;
// console.log(a);

// const b = 20;
// console.log(b);
// b = 30;

//string
// let msg = "Hello World";
// console.log(msg.length); //prints out the message length
// console.log(msg.charAt(3)); //prints a char at that index

// console.log(msg.indexOf('o'));
// console.log(msg.lastIndexOf('o'));

console.log('' == '0');
console.log(''== 0);
console.log(0 == '0');
console.log('' === '0');
console.log('' === 0);
console.log(0 === '0');

// //functions
// function name(parameter list){
//     statement;
// }
function sum(a, b){
    return a + b;
}

console.log(sum(2,6));

//function 
/*
const name = function(parameter list){
    statement;
}
*/

const sumExp = function(a,b){
    return a+b;
}

console.log(sumExp(3,6));

//arrow function 
/*
const name = (parameter list)=>{
    statement;
}
*/
const sumArrow = (a, b)=>{
    return a+b;
}
console.log(sumArrow(4,7));

const oneParm = a => a*2;

const add = (a,b) => a+b;
const sub = (a,b) => a-b;
const mul = (a,b) => a*b;

const calculate = (a,b, operate) => operate(a,b);

console.log(calculate(1,2,add));
console.log(calculate(1,2,sub));
console.log(calculate(1,2,mul));

function greaterThan(a){
    return function(b){
        return b>a;
    }
}

const  greaterThan10 = greaterThan(10);
console.log(greaterThan10(5));
console.log(greaterThan10(25));



