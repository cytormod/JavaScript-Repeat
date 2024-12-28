'use strict';

const bookings = [];

const createBooking = function (flightNum, numPassengers = 1, price = 199 * numPassengers) {
    const booking = {
        flightNum,
        numPassengers,
        price,
    };
    console.log(booking);
    bookings.push(booking);
};

createBooking('LH123')
createBooking('LH123', 2)
createBooking('LH123', undefined, 1000)


// !129 How Passing Arguments Works_ Value vs. Reference
const flight = 'LHH 234';
const sahil = {
    name : 'sahil Gopani',
    passport: 234234234
}

const checkIn = function(flightNum, passenger) {

    flightNum = 'LH999'
    passenger.name = 'Mr. ' + passenger.name

    if (passenger.passport === 234234234){
        console.log('Check in')
    } else {
        console.log('Wrong passport')
    }

}
// checkIn(flight, sahil)
// console.log(flight)
// console.log(sahil);

const newPassport = function (person) {
    person.passport = Math.trunc(Math.random() * 1000000000000000);
}

newPassport(sahil)
checkIn(flight, sahil)

// ! 131 Function accepting Callback Functions

const oneWord = function (str) {
    return str.replace(/ /g, '').toLowerCase();
}

const upperFirstWord = function (str) {
    const [first,...others] = str.split(' ');
    return [first.toUpperCase(),...others].join(' ');
}

// Higher-order Function
const transformer = function(str, fn) {
    console.log(`Original String: ${str}`)
    console.log(`Transformed String: ${fn(str)}`)
    console.log(`Transformed by: ${fn.name}`)
    
}

transformer('JavaScript is the best', upperFirstWord)

// JS USes callbacks all the time
const high5 = function() {
    console.log('hi')
}

// ['Jonas', 'Martha', 'Adam'].forEach(high5);

// ! 132 Function returning the Function
const greet = function(greeting) {
    return function(name) {
        console.log(`${greeting} ${name}`)
    }
}

const greeterHey = greet('Hey')
greeterHey('Sahil')

// Arrow Function
 const greetArr = greeting => name => console.log(`${greeting} ${name}`)


// !133 The call and apply Methods

const lufthansa = {
    airline: 'Lufthansa',
    iataCode: 'LH',
    bookings: [],
    // book: function(){ },
    book(flightNum, name) {
        console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`);

        this.bookings.push({flight: `${this.iataCode}${flightNum}`, name})
    }
}
lufthansa.book(23, 'Sahil')

const euroWings = {
    airline : 'EuroWings',
    iataCode: 'EW',
    bookings: [],
}

const book = lufthansa.book

const swiss = {
    airline: 'Swiss Airline',
    iataCode: 'LX',
    bookings: [],
}

// ? does not work
// book(23, 'Sahil')

// Call Method
book.call(euroWings, 23, 'Sahil')
console.log(euroWings )

// Apply Method
const flightData = [234, 'Kiran']
book.apply(swiss, flightData)
console.log(swiss)

// Call can also be used with the help of spread operator, if you don't want to use apply method

book.call(swiss, ...flightData);

// ! THe bind Method

const bookEW = book.bind(euroWings)
const bookLH = book.bind(lufthansa)
const bookLX = book.bind(swiss)

bookEW(23, 'Kiran Gopani')

const bookEW23 = book.bind(euroWings, 23)
bookEW23( 'Kiran Gopani')

// With Event Listeners
lufthansa.planes = 300;
lufthansa.buyplane = function() {
    console.log(this)

    this.planes++
    console.log(this.planes);
}

// lufthansa.buyplane()

document.querySelector('.buy').addEventListener('click', lufthansa.buyplane.bind(lufthansa))

// partial application

const addTax = (rate, value) => {
    return value + value * rate;
}
console.log(addTax(0.1, 200))


const addVAT = addTax.bind(null, 0.23);
// addVAT = value => value + value + 0.23

console.log(addVAT(100))

const addTaxRate = function(rate) {
    return function(value) {
        return value + value * rate;
    }
}

const addVAT2 = addTaxRate(0.23)
console.log(addVAT2(100))

///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/


const poll = {
    question: 'What is your favourite programming language?',
    options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
    // This generates [0, 0, 0, 0]. More in the next section 😃
    answers: new Array(4).fill(0),
    registerNewAnswer() {
        // Get Answer
        const answer = Number (
            // prompt(`${this.question}\n${this.options.join('\n')} \n(Write Option Number)`)
        );
        console.log(answer);

        // Register answer
        typeof answer === 'number' && answer < this.answers.length && this.answers[answer]++;

        this.displayResults()
        this.displayResults('string')
    },
    displayResults(type = 'array') {
        if (type === 'array') {
            console.log(this.answers);
    }else if (type === 'string') {
        // Poll results are 13, 2, 4, 1
        console.log(`Poll results are ${this.answers.join(', ')}`)
    }
    }
}

poll.registerNewAnswer()

document.querySelector('.poll').addEventListener('click', poll.registerNewAnswer.bind(poll));
 
// BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

// BONUS TEST DATA 1: [5, 2, 3]
// BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

poll.displayResults.call({answers: [5, 2, 3]}, 'string')
poll.displayResults.call({answers: [1, 5, 3, 6, 9, 1]})

// ! 136 Immediately INvoke Function Expression (IIFE)
// ? Best Use-Case scenario is in ASYNC/AWAIT

const runOnce = function(){
    console.log(`This will never Run AGAIN`)
};
// runOnce();

// IIFE
(function () {
    console.log('This will never Run AGAIN');
    const isPrivate = 23;
})();
// console.log(isPrivate)

(() => console.log('THis will also never run again '))();

{
    const isPrivate = 23;
    var notPrivate = 66;
}
// console.log(isPrivate)
console.log(notPrivate);

// ! 137 Clousures
// We don't create Closure manually like we create a new Array or a new Function, It just happens automatically, and we just need to recognize the situation

const secureBooking = function() {
    let passengerCount = 0;

    return function() {
        passengerCount++;
        console.log(`${passengerCount} passengers`)
    }
}

// ! Closure has more priority over the Scope Chain
const booker = secureBooking();

booker();
booker();
booker();

console.dir(booker);

// ! 138 More Closure Functions
// Example: 1
let f;
const g = function() {
    const a = 23;
    f = function() {
        console.log(a * 2)
    }
}

const h = function() {
    const b = 777;
    f = function() {
        console.log(b * 2)
    }
}

g();
f();
console.dir(f);

// Re-assigning f function
h();
f();
console.dir(f)

// Example 2
const boardPassengers = function(n, wait) {
    const perGroup = n / 3;

    setTimeout(function() {
        console.log(`We are now boarding all ${n} passengers`)
        console.log(`There are 3 groups, each with ${perGroup} passengers`)
    }, wait * 1000)


    console.log(`Will start boarding in ${wait} seconds`)
}

const perGroup = 1000;
boardPassengers(150, 3 );

 ///////////////////////////////////////
// Coding Challenge #2

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/
(function() {
    const header = document.querySelector('h1');
    header.style.color = 'red';

    document.querySelector('body').addEventListener('click', function() {
        header.style.color = 'blue';
    })
}) ();























