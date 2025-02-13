'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111, 
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function(movements, sort = false) {

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements

  containerMovements.innerHTML = '';
  // .textContent = 0;
  movs.forEach((mov, i) => {

    const type = mov > 0? 'deposit' : 'withdrawal';

    const html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">${mov}€</div>
        </div>`;
        containerMovements.insertAdjacentHTML('afterbegin', html)
  })
}
// displayMovements(account1.movements)
console.log(containerMovements.innerHTML)

// !Update UI
const updateUI = function(acc) {

  
    //Display Movements 
    displayMovements(acc.movements)

    // Display balance
    calcDisplayBalance(acc )

    // Display summary
    calcDisplaySummary(acc)
}

const createUsernames = function(accs) {
  accs.forEach((acc) => {
    acc.username = acc.owner.toLowerCase().split(' ').map((name) => {
      return name[0];
    }).join('');
  }) 
  // const user = 'Sahil J Gopani' // SJG
}
createUsernames(accounts)
console.log(accounts);

// const jo = {
//   name: 'John Doe',
//   age: 30,
//   city: 'New York'
// }
// jo.us = 30
// console.log(jo)

const calcDisplayBalance = function(acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc += mov, 0);
  // ? const balance = acc.movements.reduce((acc, mov) => acc += mov, 0);
  // ? acc.balance = balance;
  labelBalance.textContent  = `${acc.balance} €`
  // return balance
}

// calcDisplayBalance(account2.movements)
// labelBalance.textContent == balance;

console.log(labelBalance)


 const calcDisplaySummary = function(acc) {
  const incomes = acc.movements.filter(mov => mov>0).reduce((acc, mov) => acc += mov, 0)
  labelSumIn.textContent = `${incomes} €`

  const out = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc += mov, 0)

  labelSumOut.textContent = `${Math.abs(out)} €`
  
  const interest = acc.movements.filter(mov => mov > 0).map(deposit => (deposit * acc.interestRate)/100).filter((int, i, arr) => {
    console.log(arr)
    return int >= 1;
  }).reduce((acc, int) => acc += int, 0)
  labelSumInterest.textContent = `${(interest)} €`
}

//  calcDisplaySummary(account1.movements)

// Event handler

let currentAccount;

btnLogin.addEventListener("click", function(e) {
  // Prevent form from submitting
  e.preventDefault();
  
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value)  
  console.log(currentAccount)
  
  if(currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and Welcome message
    labelWelcome.textContent = `Welcome Back, ${currentAccount.owner.split(' ')[0]}`
    containerApp.style.opacity = 100;
    // Clear Input Fields

    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // //Display Movements 
    // displayMovements(currentAccount.movements)

    // // Display balance
    // calcDisplayBalance(currentAccount )

    // // Display summary
    // calcDisplaySummary(currentAccount)

    updateUI(currentAccount)
  }
})

// ! 159 Implement Transfers

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

// ! Loan Element
// Condition: The loan is only granted, if there is any deposit i.e. >= to 10%of the requested amount of loan 
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});


// ! Find Index (Delete Account)

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});


// ! Sort Button

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
  console.log(currentAccount)
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// !142 Simple Array Methods
// ! Slice Methods
let arr = ['a', 'b', 'c', 'd', 'e', 'f'];

console.log(arr.slice(2));
console.log(arr.slice(2, 4))
console.log(arr.slice(-2))
console.log(arr.slice(-1))
console.log(arr.slice(1, -2))
console.log(arr.slice()) // We can use slice to make a shallow copy of an array as well.
console.log([...arr]); // Even Destructor can make the shallow copy and it is completely depends on you which one to use for the shallow copy

// ? Benefits of using chain is to only when you want to chain multiple methods with one another.

// !!!Splice It will actually change the original array (In simple terms it can mutate the array)

// console.log(arr.splice(2))
arr.splice(-1)
console.log(arr)
arr.splice(1, 2)
console.log(arr)

// !!! Reverse (It mutates the original array)
arr = ['a', 'b', 'c', 'd', 'e', 'f']
const arr2 = ['j', 'i', 'h', 'g', 'f']
console.log(arr2.reverse())
console.log(arr2);

// !!! Concat (It will not mutate the original array)
const letters = arr.concat(arr2)
console.log(letters)
console.log([...arr, ...arr2])

// !!! JOin 
console.log(letters.join(' - '))

// ! 143 The At method (It will not mutate) (at method is also good for chaining different methods)  (AT also works on strings)

const aarr = [23, 11, 64]
console.log(aarr[0])
console.log(aarr.at(0))

// ? getting the last element
console.log(aarr[aarr.length - 1])
console.log(aarr.slice(-1)[0])
console.log(aarr.at(-1))

console.log('Sahil'.at(-1))

// ! 144 Looping Arrays_ forEach

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const [i, movement] of movements.entries()) {
    if(movement > 0) {
        console.log(`Movement ${i+1}: You have deposited ${movement}`)
    }else {
        console.log(`Movement ${i+1}: You have withdrawn ${Math.abs(movement)}`)
    }
}

// ? For Each does not passes only the current element, but also it passes the index, and an entire array that we are looping
movements.forEach((movement, index, array) => {
    // if(movement < 0){
    //     console.log(`${movement} has been withdrawn`);
    // }else {
    //     console.log(`${movement} has been deposited`);
    // }

    movement<0 ? console.log(`Movement ${index+1}: ${movement} has been withdrawn`) : console.log(`Movement ${index+1}: ${movement} has been deposited`)
})

// ? The fundamental difference between forEach and for of is that, we cannot breakout from the forEach loop(Continue and break statement don'e work here), So if you want to break out of the loop you have to use for-of loop

// ! 145 forEach with Maps and Sets

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach ((value, key, map) => {
  console.log(`${key}: ${value}`)
})

// Set It doen't have key value pair
const currenciesUnique = new Set([
  'USD',
  'GBP',
  'USD',
  'EUR',
  'EUR',
]);
currenciesUnique.forEach((value, _, map) => {
  console.log(`${value}: ${value}`)
})

// ! 150 Data Transformations_map, filter, reduce: So Important
// ! 150 The map Method ( It returns new Aray, and does not Mutate)


const eurToUSD = 1.1;
const movementsUSD = movements.map(mov => mov*eurToUSD);

console.log(movements);
console.log(movementsUSD)

const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * eurToUSD);
console.log(movementsUSDfor);

const moventsDescriptions = movements.map((mov, i, arr) => {

  `Movement ${i+1}: You ${mov > 0 ? 'deposited' : 'Withdrew'} ${Math.abs(mov)}`

  // if (mov> 0) {
  //   return `Movement ${i+1}: You Deposited ${mov}`;
  // }else {
  //   return `Movement ${i+1}: You withdrew ${Math.abs(mov)}🍷`
  // }
})

console.log(moventsDescriptions);

// ! 152 The Filter Method
const deposits = movements.filter((mov, i, arr) => {
  return mov > 0;
})
console.log(deposits);

const depositsFor = [];
for (const mov of movements) if (mov > 0 ) depositsFor.push(mov);
console.log(depositsFor)

const withdrawals = movements.filter(mov => mov < 0)
console.log(withdrawals)

// ! 153 The Reduce Method
// ?Accumulator is like a snowball

// const balance = movements.reduce((acc, curr, i, arr) => {
//   console.log(`Iteration ${i}: ${acc}`)
//   return acc + curr
// }, 0);

const balance = movements.reduce((acc, curr) => acc += curr, 0)
console.log(balance);

let balance2 = 0;
for(const mov of movements) balance2 += mov;
console.log(balance2)

// ! Maximum Value
const max = movements.reduce((acc, mov) => {
  if(acc > mov) return acc;
  else 
  return mov;
}, 0)
console.log(max);

// ! 157 Find Method // It will not e=retuen the new array, but it will only return the first element in the array that satisfies this condition. Also it will return the element that satisfies this condition and not the array

const firstWithdrawal = movements.find(mov => mov < 0)
console.log(firstWithdrawal)

console.log(accounts)

const account = accounts.findIndex(acc => acc.owner === 'Jessica Davis')
console.log(account)

// ! 161 Some and evey methods

// ? Here it checks for the equality
console.log(movements.includes(-130))

// ? Here it checks for the Condition

const anyDeposits = movements.some(mov => mov> 0)
console.log(anyDeposits)


// ! Every Method // It will only returns the true if all the elements in the array satisfied the condition that we pass.

console.log(account4.movements.every(mov => mov>0))

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Seprate callback VERY GOOD
// const deposit = mov => mov > 0;
// console.log(movements.some(deposit))//true/false
// console.log(movements.filter(deposit))// value
// console.log(movements.every(deposit))//true/false

// ! 162 Flat and flatMap method

// ? Flat Method, No callback Functions, just like this. Also It goes only one Level deep while flatting the Array

const arrr = [[1, 2, 3], [4, 5, 6], 7, 8]
console.log(arrr.flat()) // We removed the nested arrays and we flaten the arrays, which is why it is known as flat array

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2))// When we write 2 in the bracket, it means that we can go 2 levels deep in the flat method

// const accountMovements = accounts.map(acc => acc.movements)
// console.log(accountMovements)
// const allMovements = accountMovements.flat();
// console.log(allMovements)
// const overalBalance = allMovements.reduce((acc, mov) => acc + mov, 0)

const overalBalance = accounts.map(acc => acc.movements).flat().reduce((acc, map)=> acc + map, 0)
console.log(overalBalance)

// ? flatMap: It has flat and the map together. It always goes ONE LEVEL deep, so if you want to use more deep levels than you have to use flat method.

const overalBalance2 = accounts.flatMap(acc => acc.movements).reduce((acc, map)=> acc + map, 0)
console.log(overalBalance2)


// ! 163 Sorting Arrays : It will mutate the original array

//Strings
const owners = ['Jonas', 'zach', 'Adam', 'Sahil']
console.log(owners.sort())

// Numbers
// console.log(movements.sort())

// ? a = Current Value, b = Next Value
// return < 0, a will be before b (Keep Order)
// return > 0, b will be before a (Switch Order)
// movements.sort((a, b) => {
//   if(a> b ) 
//     return 1;
//   if(b > a) return -1;
// })
movements.sort((a, b) => a - b)
console.log(movements);

//Descending
// movements.sort((a, b) => {
//   if(a> b ) 
//     return -1;
//   if(b > a) return 1;
// })
// console.log(movements);

movements.sort((a, b) => b - a)
console.log(movements);

// !164 More ways of creating and Filling Arrays
// ! Fill Method

console.log(new Array([1, 2, 3, 4, 5]))

// ? Empty Arrays with Fill Method
const x = new Array(7)
console.log(x)

// x.fill(1);
x.fill(1, 3, 5)
console.log(x);

// ! 164 Array.from Method

const y = Array.from({length: 7}, () => 1)
console.log(y)

const z = Array.from({length: 7}, (cur, i) => i + 1)
console.log(z)


labelBalance.addEventListener('click', function() {
  // const movementsUI = Array.from(document.querySelectorAll(".movements__value"))

  // console.log(movementsUI.map(el => Number(el.textContent.replace('€', ''))));
  const movementsUI = Array.from(document.querySelectorAll(".movements__value"), el => Number(el.textContent.replace('€', '')))
  console.log(movementsUI);
  
  const movementsUI2 = [...document.querySelectorAll('.movements__value')]
  console.log(movementsUI2)

})

// ! 166 Array Methods practice

// 1
const bankDepositSum = accounts.flatMap(acc => acc.movements).filter(mov => mov>0).reduce((sum, cur) => sum + cur, 0);
console.log(bankDepositSum);

// 2.
// const numDeposits1000 = accounts.flatMap(acc => acc.movements).filter(mov => mov >= 1000).length;

const numDeposits1000 = accounts.flatMap(acc => acc.movements)
// .reduce((count, cur) => (cur >= 1000 ? count+1: count), 0)
// .reduce((count, cur) => (cur >= 1000 ? count++: count), 0)
.reduce((count, cur) => (cur >= 1000 ? ++count: count), 0)

// !!!!! ++ Gives the old value, it has done it's job, see he example below
// ? Check in the Console
let a = 10;
console.log(a++);
console.log(a);

// !! Prefix ++ operator and here the result should be 11, 

let b = 10;
console.log(b++);
console.log(b);

// 3.

// const sums = accounts.flatMap(acc => acc.movements).reduce((sums, cur) => {
//   cur > 0 ? sums.deposits += cur: sums.withdrawals += cur;
//   return sums;
// }, {deposits : 0, withdrawals: 0})

// console.log(sums)

const {depositss, withdrawalss} = accounts.flatMap(acc => acc.movements).reduce((sums, cur) => {
  // cur > 0 ? sums.depositss += cur: sums.withdrawalss += cur;
  sums[cur > 0 ? sums.depositss : sums.withdrawalss] += cur;
  return sums;
}, {depositss : 0, withdrawalss: 0})

console.log(depositss, withdrawalss)

// 4.
// this is a nice title -> This Is a Nice Title

const convertTitleCase = function(title) {

  const capitalize = str =>  str[0].toUpperCase() + str.slice(1)

  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];
  const titleCase = title.toLowerCase().split(' ').map(word => (exceptions.includes(word)? word: capitalize(word))).join(' ');
  return capitalize(titleCase)
}

console.log(convertTitleCase('this is a nice title'))
console.log(convertTitleCase('this is a LONG title but not too long'))
console.log(convertTitleCase('and here is another title with an EXAMPLE'))


































// ! 148 Coding Challenge #1
///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

const checkDogs = function(dogsJulia, dogsKate) {
  const dogsJuliaCorrected = dogsJulia.slice();
  dogsJuliaCorrected.splice(0, 1);
  dogsJuliaCorrected.splice(-2);
  // dogsJuliaCorrected.slice(1, 3);
  console.log(dogsJuliaCorrected , dogsKate);
  const bothData = [...dogsJuliaCorrected, ...dogsKate]
  console.log(bothData)

  bothData.forEach((dog, index) => {
    const data = dog > 3 ? `"Dog number ${index+1} is an adult, and is ${dog} years old"` :`Dog number ${index+1} is still a puppy and ${dog} years old 🐶`
    console.log(data)
  })

}
// console.log(checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]))
console.log(checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]))

const movementss = [200, 450, -400, 3000, -650, -130, 70, 1300];

movementss.forEach((mov) => {
  return mov
})


const movementsUsd = movements.map((move) =>{
  return move
})

// !?! Self-Understanding between Map and normal function:)
//  ? In normal funtion, you will use Loop to get the individual data, while in map method you can use the function to manipulate the data.

// const a = [11, 12, 13, 14, 15, 16]
// const fn = function(data) {
//   data.forEach((dataa) =>{
//     // return (dataa*2)
//     console.log(dataa)
//   })
// }
// fn(a)
// // console.log(a)

// const fn2 = a.map((a2) =>{
//   // a.forEach((a3) =>{
//   //   console.log(a3)
//   // })
//   console.log(a2)
// })
// // console.log(fn2)

///////////////////////////////////////
//! Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

const calcAverageHumanAge = function (ages) {
  const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));

  const adults = humanAges.filter(age => age >= 18);
  console.log(humanAges);
  console.log(adults);

  // const average = adults.reduce((acc, age) => acc + age, 0) / adults.length;
  const average = adults.reduce(
    (acc, age, i, arr) => acc + age / arr.length,
    0
  );

  // 2 3. (2+3)/2 = 2.5 === 2/2+3/2 = 2.5

  return average;
};
const avge1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avge2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(avge1, avge2);

// // PIPELINE
const totalDepositsUSD = movements.filter(mov => mov > 0).map(mov => mov * eurToUSD).reduce((acc, mov) => acc + mov, 0)
console.log(totalDepositsUSD)

///////////////////////////////////////
// ! Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

const calcAverageHumanAgee = function (ages) {
  const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4)).filter(age => age >= 18).reduce(
    (acc, age, i, arr) => acc + age / arr.length,
    0
  );

  // 2 3. (2+3)/2 = 2.5 === 2/2+3/2 = 2.5

  return humanAges;
};
const avg1 = calcAverageHumanAgee([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAgee([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1, avg2);

// !  167 Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];
*/

// const range = 

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

// 1
dogs.forEach(dog => Math.trunc((dog.recFood = dog.weight ** 0.75 * 28)));
console.log(dogs)

// 2

const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'))
console.log(dogSarah)
console.log(`Sarah's dog is eating ${dogSarah.curFood > dogSarah.recFood ? 'Much' : 'Little'}`);

// 3

const ownersEatTooMuch = dogs.filter(dog => dog.curFood > dog.recFood).flatMap(dog => dog.owners)
// .flat();
console.log(ownersEatTooMuch)

const ownersEatTooLittle = dogs.filter(dog => dog.curFood < dog.recFood).flatMap(dog => dog.owners)
// .flat();
console.log(ownersEatTooLittle)

// 4 4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"

console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`)
console.log(`${ownersEatTooLittle .join(' and ')}'s dogs eat too Little!`)

// 5 Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)

// ! Whenever you see any you will use the some method. It will give the true or false value
console.log(dogs.some(dog => dog.curFood === dog.recFood))

// 6 Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
// current > (recommended * 0.90) && current < (recommended * 1.10)

const checkEatingOkay = dog => dog.curFood > (dog.recFood * 0.90) && dog.curFood < (dog.recFood * 1.10)

console.log(dogs.some(checkEatingOkay)
)

// 7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)

console.log(dogs.filter(checkEatingOkay))

// 8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

const dogsSorted = dogs.slice().sort((a, b) => a.recFood - b.recFood)
console.log(dogsSorted)


















