'use strict';

const weekdayss = ['mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const hoursOpening = {
    [weekdayss[3]]: {
        open: 12,
        close: 22,
    },
    fri: {
        open: 11,
        close: 23,
    },
    [`day-${2+4}`]: {
        open: 0, // Open 24 hours
        close: 24,
    },
};

const restaurant = {
    name: 'Classico Italiano',
    location: 'Via Angelo Tavanti 23, Firenze, Italy',
    categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],

    hoursOpening: hoursOpening, // !old method

// ! Es6 enhanced object literals

hoursOpening,

    openingHours: {
        thu: {
            open: 12,
            close: 22,
        },
        fri: {
            open: 11,
            close: 23,
        },
        sat: {
            open: 0, // Open 24 hours
            close: 24,
        },
    },

    // order: function(starterIndex, mainIndex){
    //     return [this.starterMenu[starterIndex], this.mainMenu[mainIndex] ]
    // },

    // !New ES6 Enhanced Object Literals

    order (starterIndex, mainIndex){
        return [this.starterMenu[starterIndex], this.mainMenu[mainIndex] ]
    },

    orderDelivery ({starterIndex =1, mainIndex= 0, time = '20:00', address}) {
        console.log(`Order Received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`);
    },

    orderpasta(ing1, ing2, ing3){
        console.log(`Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`);
    },

    orderPizza(mainIngredient, ...otherIngredients) {
        console.log(mainIngredient);
        console.log(otherIngredients);
    }
    


};
restaurant.orderDelivery({
    time: '22:30',
    address: 'Via del Sole, 21',
    mainIndex: 2,
    starterIndex: 2,
})


const {name, openingHours, categories} = restaurant

const {name: restaurantName, openingHours: hours, catgories: tags} = restaurant

// ! Setting a default value to the Object
const {menuu = [], starterMenu: starters = []} = restaurant
console.log(menuu, starters)

// !Mutating Variables
let aaa = 111;
let bb = 999
// console.log(aaa, bb)
const obj = {aaa: 23, bb:7, c:14};
({aaa, bb} = obj)
console.log(obj)

// !Nested Objects
const {fri: {open: o, close: cc},} = openingHours

// !Spread Operator
const arrr = [7, 8, 9];
const badNewArr = [1, 2, arrr[0], arrr[1], arrr[2]];
console.log(badNewArr);

const newArr = [1, 2, ...arrr]
console.log(newArr);
console.log(...newArr);

const newMenu = [...restaurant.mainMenu, 'Gnocci']
console.log(newMenu);

// copy array
const mainMenuCopy = [...restaurant.mainMenu]

// Join 2 or more arrays together
const jmenu = [...restaurant.mainMenu, ...restaurant.starterMenu]
console.log(jmenu);

// ? Itterables: arrays, strings, maps, sets and not Objects
const str = 'Sahil'
const letters = [...str, ' ', 'G.']
console.log(letters);
console.log(...str);
//It will not work, of we want to use for template literals. ex
// console.log(`${...str} Gopani`);

// Real-World Example

// const ingredients = [prompt('Let\'s make Pasta! Ingredient 1?'), prompt('Ingredient 2?'), prompt('Ingredient 3?'),]
// console.log(ingredients);
// restaurant.orderpasta(ingredients[0], ingredients[1], ingredients[2])
// restaurant.orderpasta(...ingredients)

// Objects
const newRestaurant = {...restaurant, founder: 'Guiseppe'}

const restaurantCopy = {...restaurant}
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy.name);
console.log(restaurant.name);

// !Rest operator
// ? 1 Desructuring
//? SPREAD, because on the RIGHT side of =
const arr4 = [1, 2, ...[3, 4]]

//? REST, because on the LEFT side of =
const [a1, b1, ...others] = [1, 2, 3, 4, 5, 6];

const [pizza, , risotto, ...otherFood] = [...restaurant.mainMenu, ...restaurant.starterMenu]
console.log(pizza, risotto, otherFood);

// Objects

const {sat, ...weekdays} = restaurant.openingHours
console.log(weekdays);

// ? 2 Functions 
const add = function(...numbers) {
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) sum += numbers[i];
    console.log(sum);
}

add(2, 3)
add(5, 3, 7, 2)
add(8, 2, 5, 3, 2, 1, 4)

const x1 = [23, 5, 7];
add(...x1);//This is Spread Operator

restaurant.orderPizza('mushrooms', 'onions', 'olives', 'spinach')
restaurant.orderPizza('mushrooms')

//! Short Circuiting (&& and ||)
// ?Use any data type, return ANY Data Type, short-circuiting
console.log(3 || 'Sahil'); 
console.log('' || 'Sahil');
console.log(true || 0)
console.log(undefined || null);
console.log(undefined || 0 || '' || 'Hello' || 23 || null)

restaurant.numGuests = 0;

const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

const guests2 = restaurant.numGuests || 10
console.log(guests2);

console.log('=========AND=========')
console.log(0 && 'Sahil');
console.log(7 && 'Sahil');
console.log('Hello' && '23' && null && 'Sahil');

// Practicle Example
if (restaurant.orderPizza) {
    restaurant.orderPizza('mushrooms', 'Spinach')
}

restaurant.orderPizza && restaurant.orderPizza ('mushrooms', 'Spinach')

//!  OR OPERATOR TO SET THE VALUE AND && OPERATOR TO EXECUTE THE CODE IN THE SECOND OPERANT IF THE FIRST ONE IS TRUE

// ! Nullish coalescing Operator(__)
// ! Nullish: null and undefined (NOT 0 or '')
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);

// ! Logic Assignment Operators

const rest1 = {
    name: 'Capri',
    // numGuests: 20,
    numGuests: 0,
};

const rest2 = {
    name: 'La Piazza',
    owner: 'Sahil Gopani',
};
// ? OR Assignment Operator
// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;

// rest1.numGuests ||= 10;
// rest2.nummGuests ||= 10;
// console.log(rest1, rest2);

// ? Nullish assignment operator (null or undefined)
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;
console.log(rest1, rest2);

rest1.owner &&= 'Anonymous'
rest2.owner &&= 'Anonymous'
console.log(rest1, rest2);

////////////////////////! Destructing Arrays
const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

const [x, y, z] = arr; 
console.log(x, y, z);

let [main, secondary] = restaurant.categories;
console.log(main, secondary);
//! Switching Variables
// if you want to switch this 2 variables
// const temp = main;
// main = secondary
// secondary = temp
// console.log(main, secondary)
[main, secondary] = [secondary, main]

const [starter, mainCourse] = restaurant.order(2,0)
console.log(starter, mainCourse)


const nested = [2, 4, [5, 6]]
// const [i, ,j] = nested;
const [i, , [j, k]] = nested;
console.log(i, j, k);

// ? Default values
const [p = 1, q = 1, r = 1] = [8, 9]
console.log(p, q, r)


// ! For-OF loop
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const item of menu ) console.log(item);

// for (const item of menu.entries()) {
//     console.log(`${item[0] + 1}: ${item[1]}`);

// }

for (const [i, el] of menu.entries()) {
    console.log(`${i + 1}: ${el}`);
}

console.log([...menu.entries()]);

//! Optional Chaining (_.) Before using his problem
// console.log(restaurant.openingHours.mon.open);

if(restaurant.openingHours.mon) console.log(restaurant.openingHours.mon.open);

if(restaurant.openingHours.fri) console.log(restaurant.openingHours.fri.open);

restaurant.openingHours.fri && console.log(restaurant.openingHours.fri.open);

//! Optional chaining as a Solution
console.log(restaurant.openingHours.mon?.open);
console.log(restaurant.openingHours?.mon?.open);

// Example
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

for (const day of days) {
    const open = restaurant.openingHours[day]?.open ?? 'closed';
    const close = restaurant.openingHours[day]?.close;
    console.log(`On ${day}, we open at ${open} and close at ${close}`);
}

//! Methods
console.log(restaurant.order?.(0, 1)?? ' Method Does Not Exist');
console.log(restaurant.orderRisotto?.(0, 1)?? ' Method Does Not Exist');

//! Arrays

const users = [
    {name: 'Sahil',
    email: 'sahil.io',
    }
]

console.log(users[0]?.name ?? 'User Array Empty');

if(users.length > 0) console.log(users[0].name);
else (console.log('user array empty'))``;

// ! 114 Looping Objects_ Object Keys, Values, and Entries

// ? Property Names
const properties = Object.keys(openingHours)
console.log(properties)

let openStr = (`we are open on ${properties.length} days`);
 for (const day of properties){
    openStr += `${day},`
 }
console.log(openStr)

// ? Property Values
console.log(restaurant.openingHours);
const values = Object.values(openingHours)
console.log(values);

const entries = Object.entries(openingHours)
console.log(entries)

// for (const x of entries) {
//     console.log(`On ${key} we open at ${open} and close at ${close }`);
// }


for (const [key, {open, close}] of entries) {
    console.log(`On ${key} we open at ${open} and close at ${close}`);
}

// ! Sets
const orderSet = new Set([
    'Pizza', 'Pasta', 'Risotto', 'pasta', 'Pasta', 'Pizza', 'Risotto'
])

console.log(new Set('Sahil'))
console.log(orderSet.size)
console.log(orderSet.has('Pizza') )
console.log(orderSet.has('Bread') )
orderSet.add('Garlic Bread')
orderSet.add('Garlic Bread')
orderSet.delete('Risotto')
console.log(orderSet);
console.log(orderSet[0]); // it is undefined, because in sets there is no indexes
// orderSet.clear()

for (const order  of orderSet) console.log(order);

// Example
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Waiter', 'Chef']
const staffUnique = [...new Set(staff)] // transforminto Array, and we know that spread operator works on all Itterables
console.log(staffUnique);
console.log(new Set(['Waiter', 'Chef', 'Waiter', 'Manager']).size)
console.log(new Set('SahilGopani').size);

// ! 117 Maps_Fundamental // It is to map values to keys

const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy')
console.log(rest.set(2, 'Lison, Portugal'))
rest.set('categories', ['Italian', 'Pizzaria', 'vegetarian', 'Organic']).set('open', 11).set('close',23).set(true, 'We are open').set(false, 'We are closed')
console.log(rest.get('name'));
console.log(rest.get(true));

const time = 21;
console.log(rest.get(time > rest.get('Open') && time < rest.get('close')))

console.log(rest.has('categories'));
rest.delete(2);
rest.set(document.querySelector('h1'), 'Heading'); //Object as a Map keys
// rest.clear()
const arrrr = [1, 2];
console.log(rest.get(arrrr));
// rest.set([1,2 ], 'Test') //It will not work
// console.log(rest.get([1,2]));//it will not work
console.log(rest);
console.log(rest.size);

// !Maps_Iteration
const question = new Map(
    [
        ['question', 'What is the best programming language in the world?'],
        [1, 'C'],
        [2, 'Java'],
        [3, 'JavaScript'],
        [4, 'Python'],
        [5, 'C++'],
        ['correct', 3],
        [true, 'Correct!'],
        [false, 'Wrong, please try again']
    ]
);

console.log(question);

// Convert Object to Map
console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

// Maps are iterratable so, we can use for loop

// Quiz app

console.log(question.get(`question`));
for (const [key, value] of question) {
    if(typeof key=== 'number') console.log(`Answer ${key}: ${value}`);
}
// const answer = Number(prompt('Your Answer'))
const answer = 3;
console.log(question.get(question.get('correct') === answer))

// Convert Map to array
console.log([...question]);
// console.log([...question.entries()]);
console.log([...question.keys()]);
console.log([...question.values()])

// ! Working with Strings

const airline = 'TAP Air Portugal'
const plane = 'A320';
console.log(plane[0])
console.log(plane[1])
console.log(plane[2])
console.log('B737'[0])

console.log(airline.length)
console.log('B737'.length)
console.log(airline.indexOf('r'))
console.log(airline.indexOf('portugal'))

console.log(airline.slice(4));
console.log(airline.slice(4, 7));
console.log(airline.slice(0, airline.indexOf(' ')));
console.log(airline.slice(airline.lastIndexOf(' ') + 1))

console.log(airline.slice(-2))
console.log(airline.slice(1, -1))

const checkMiddleSeat = function(seat) {
    const s = seat.slice(-1);
    if (s === 'B' || s === 'E') {
        console.log('You Got the Middle Seat');
    } else {
        console.log('You Got Lucky');
    }

}

checkMiddleSeat('11B')
checkMiddleSeat('23C')
checkMiddleSeat('3E')

console.log(new String('jonas'));
console.log(typeof new String('Sahil'));
console.log(typeof new String('Sahil').slice(1));

console.log(airline.toLocaleLowerCase()); console.log(airline.toUpperCase())

// Fix Capitalization in name
const passenger = 'sAhIL'
const passengerLower = passenger.toLowerCase()
const firstLetter = passengerLower.slice(0, 1).toUpperCase()
console.log(firstLetter+passengerLower.slice(1));

// Comparing Email addresses
const email = 'hello@example.com'
const loginEmail = '       Hello@example.com \n';
const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);
console.log(email === normalizedEmail)

// replacing
const priceGB = '288,97€'
const priceUS = priceGB.replace('€', '$').replace(',', '.');
console.log(priceUS)

const announcement = 'All passengers come to boarding door 23. Boarding door 23!';

console.log(announcement.replace('door', 'gate'));
console.log(announcement.replaceAll('door', 'gate'));
console.log(announcement.replace(/door/g, 'gate'))

// Booleans
const planee = 'A320neo';
console.log(planee.includes('A320'))
console.log(planee.includes('Boeing'))
console.log(planee.includes('Airb'))

if(plane.startsWith('Airbus') && plane.endsWith('neo')){
    console.log('Part of the NEW ARirbus family')
}

// Practice exercise
const checkBaggae = function (items) {
    const baggage = items.toLowerCase();
    if (baggage.includes('knife') || baggage.includes('gun')){
        console.log('You are not allowed to board the plane');
    }else {
        console.log('You are allowed to board the plane');
    }
}

checkBaggae('I have a Laptop, some Food and a pocket Knife');
checkBaggae('Socks and camera');
checkBaggae('Got some snacks and a gun for Protection');


// ! 123. Split and Join
console.log('a+very+nice+string'.split('+'));

const [firstName, lastName] = 'Sahil Gopani'.split(' ')
console.log(firstName, lastName);

const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ')
console.log(newName);

// const capitalizeName = function (name) {
//     const names = name.split(' ')
//     let namearr = '';
//     for (const name of names) {
//         const startCap = (name.slice(0,1).toUpperCase() + name.slice(1));
//         namearr += ' ' + startCap
//         console.log(startCap);
//     }
//     console.log(namearr.trim());
// }

const capitalizeName = function (name) {
    const names = name.split(' ');
    const namesUpper = [];
    for (const n of names) {
        // namesUpper.push(n[0].toUpperCase() + name.slice(1))
        namesUpper.push(n.replace(n[0], n[0].toUpperCase()))
    }
    console.log(namesUpper.join(' '))
}

capitalizeName('sahil gopani')
const passengerr = 'jessica and smith davis'
capitalizeName(passengerr)

// padding

const message = 'Go to gate 23!';

console.log(message.padStart(20, '+').padEnd(30, '+'));

const maskCreditCard = function (number) {
    const str = number + '';
    const last = str.slice(-4);
    return last.padStart(str.length, '*')
}

console.log(maskCreditCard(9823982398239823));
console.log(maskCreditCard('9823982398239823'));

// Repeat
const message2 = 'Bad Weather... All Departures Delayed... '
console.log(message2.repeat(5))

const planesInLine = function(n) {
    console.log(`There are ${n} planes in line ${'p'.repeat(n)}`)
}
planesInLine(5)
planesInLine(3)
planesInLine(12)










// // -------------------
// console.log('-------------------------Challenge--------------------');
// //!Challenge
// // Coding Challenge #1

// /* 
// We're building a football betting app (soccer for my American friends 😅)!

// Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

// 1. Create one player array for each team (variables 'players1' and 'players2')
// 2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
// 3. Create an array 'allPlayers' containing all players of both teams (22 players)
// 4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
// 5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
// 6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
// 7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

// TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

// GOOD LUCK 😀
// */
 
// const game = {
//     team1: 'Bayern Munich',
//     team2: 'Borrussia Dortmund',
//     players: [
//       [
//         'Neuer',
//         'Pavard',
//         'Martinez',
//         'Alaba',
//         'Davies',
//         'Kimmich',
//         'Goretzka',
//         'Coman',
//         'Muller',
//         'Gnarby',
//         'Lewandowski',
//       ],
//       [
//         'Burki',
//         'Schulz',
//         'Hummels',
//         'Akanji',
//         'Hakimi',
//         'Weigl',
//         'Witsel',
//         'Hazard',
//         'Brandt',
//         'Sancho',
//         'Gotze',
//       ],
//     ],
//     score: '4:0',
//     scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
//     date: 'Nov 9th, 2037',
//     odds: {
//       team1: 1.33,
//       x: 3.25,
//       team2: 6.5,
//     },
//   };

//   //? 1)
//   const [players1, players2] = game.players;
//   console.log(players1, players2);

// //? 2
// const [gk, ...fieldPlayers] = players1;
// console.log(gk, fieldPlayers);

// // ? 3
// const allPlayers = [...players1, ...players2]
// console.log(allPlayers)

// // ? 4
// const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic']
// console.log(players1Final)

// // ? 5
// // const {} = game.odds;
// const {odds: {team1, x: draw, team2}} = game;
// console.log(team1, draw, team2);

// // ? 6

// const printGoals = function(...players) {
//     console.log(`${players.length} goals were scored`);
//     console.log(...players)
// }

// printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich')
// printGoals('Davies', 'Lewandowski', 'Kimmich')
// printGoals(...game.scored)

// // ?7

// team1 < team2 && console.log('Team 1 is more likely to win');
// team1 > team2 && console.log('Team 2 is more likely to win');

// // ! Challenge #2
// /* 
// Let's continue with our football betting app!

// 1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
// 2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
// 3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
//       Odd of victory Bayern Munich: 1.33
//       Odd of draw: 3.25
//       Odd of victory Borrussia Dortmund: 6.5
// Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉
// BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
//       {
//         Gnarby: 1,
//         Hummels: 1,
//         Lewandowski: 2
//       }

// GOOD LUCK 😀
// */

// // ! 1
// // const openScore =  (Object.entries(game.scored));

// for (const [goalNo, name] of game.scored.entries()){
//     console.log(`Goal ${goalNo + 1}: ${name}`);
// }

// // ! 2

// const odds = Object.values(game.odds);
// console.log(odds);

// let averageScore = 0;
// for (const average of odds){
//     averageScore += average
//     }
// averageScore /= odds.length
// console.log(averageScore)

// // ! 3

// for (const [team, odd] of Object.entries(game.odds)) {
//     const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`
//     console.log(`Odd of ${teamStr} ${odd}`);
//     console.log(game[team]);
//     }
    
//  //!  Coding Challenge #3

// /* 
// Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

// 1. Create an array 'events' of the different game events that happened (no duplicates)
// 2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
// 3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
// 4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
//       [FIRST HALF] 17: ⚽️ GOAL

// GOOD LUCK 😀
// */

// const gameEvents = new Map([
//     [17, '⚽️ GOAL'],
//     [36, '🔁 Substitution'],
//     [47, '⚽️ GOAL'],
//     [61, '🔁 Substitution'],
//     [64, '🔶 Yellow card'],
//     [69, '🔴 Red card'],
//     [70, '🔁 Substitution'],
//     [72, '🔁 Substitution'],
//     [76, '⚽️ GOAL'],
//     [80, '⚽️ GOAL'],
//     [92, '🔶 Yellow card'],
//   ]);

// // ? 1
// const events = new Set(gameEvents.values())
// console.log(events)

// // ? 2
// gameEvents.delete(64)

// // ? 3
// const timee = [...gameEvents.keys()].pop()
// console.log(timee)
// console.log(`An event happened, on average, every ${time / gameEvents.size} minutes`);

// for (const [min, event] of gameEvents){
//     console.log(min < 45 ? `[FIRST HALF] ${min}: ${event}` :  `[SECOND HALF] ${min}: ${event}`)
// }

///////////////////////////////////////
//! Coding Challenge #4

/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));
const text = document.querySelector('textarea').value;

document.querySelector('button').addEventListener('click', function () {
    const text  = document.querySelector('textarea').value;
    const rows = text.split('\n')
    
    for(const [i, row] of rows.entries()) {
        const [first, second] = row.toLowerCase().trim().split('_');
        const output = `${first}${second.replace(second[0], second[0].toUpperCase())}`
        console.log(`${output.padEnd(20, ' ')}${'🦾'.repeat(i+1)}`);
    } 

})

///////////////////////////////////////
// String Methods Practice


// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)
const flights =
  '_Delayed_Depart   ure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

  const getCode  =str => str.slice(0, 3).toUpperCase()

for (const flight of flights.split('+')) {
    const [type, from, to, time] = flight.split(';')
    const output = `${type.startsWith('_Delayed') ? '❌' : ''}${type.replaceAll('_'), ' '} ${getCode(from)} ${getCode(to)} ${time.replace(':', 'h')}`
    console.log(output)
}