'use strict';

// ! 208 Constructor function and the neW Operator

const Person = function(firstName, birthYear) {
    // Instance Properties
    this.firstName = firstName;
    this.birthYear = birthYear;

    // ! Never do this. Never create a method inside of a constructor function.
    // ? Instead of the use prototypes ans prototype inheratence 
    // this.calcAge = function() {
    //     console.log(2037 - this.birthYear)
    // };
};
const jonas = new Person('Jonas', 1991);
console.log(jonas)

// 1. New {} is created
// 2. function is called, this = {}
// 3. {} linked to Prorotype
// 4. function automatically returns {}

const sahil = new Person('Sahil', 2002)
const jack = new Person('Jack', 2002)

console.log(jonas instanceof Person)
// console.log(jay instanceof Person)

Person.hey = function() {
    console.log('hey there')
    console.log(this)
}
Person.hey();
// jonas.h  ey() // we cannot use this, because the hey function is not in the prototype  of Person Constructor

// ! 209 Prorotype // This way is better than write the function in direct object
console.log(Person.prototype)
Person.prototype.calcAge = function() {
    console.log(2037 - this.birthYear)
}; 

jonas.calcAge()
sahil.calcAge()

console.log(jonas.__proto__)/// It is not prototype property but it is simply prototype
console.log(jonas.__proto__ === Person.prototype);// jonas is the prototype property of the "Person" Constructor function

console.log(Person.prototype.isPrototypeOf(jonas)) //true
console.log(Person.prototype.isPrototypeOf(Person)) //false

Person.prototype.species = 'Homo Sapiens'
console.log(jonas)

console.log(jonas.hasOwnProperty('firstName'))// true 
console.log(jonas.hasOwnProperty('spieces'))// false (Because this property is not inside of the jonas object, It simply has access to it because of it's prototype)

// ! 211 Prototypal Inheritance on Built-in Objects
console.log(jonas.__proto__) 
//Object.prototype
console.log(jonas.__proto__.__proto__)
console.log(jonas.__proto__.__proto__.__proto__)//null

console.log(Person.prototype.constructor);
console.dir(Person.prototype.constructor)

const arr = [3, 4, 5, 6, 7, 4]
console.log(arr.__proto__)
console.log(arr.__proto__ === Array.prototype)
console.log(arr.__proto__.__proto__)

Array.prototype.unique = function () {
    return [...new Set(this)];
}

console.log(arr.unique())

const h1 = document.querySelector('h1')

// ! Coding Challenge #1
//////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

const Car = function(make, speed) {
    this.make = make;
    this.speed = speed;
}

Car.prototype.accelerate = function() {
    this.speed += 10;
    console.log(`${this.make} is accelerating to ${this.speed} km/h`)
}

Car.prototype.brake = function() {
    this.speed -= 5;
    console.log(`${this.make} is braking to ${this.speed} km/h`)
}

// ! 213 ES6 Classes

// Class Expression
//  It is kind of just like the functions but without the arguments
// behind the scene classes are just the functions
// const PersonCl = class {}

// Class declaration

// class PersonCl {
//     // here we will be having the properties that will be stored in the new Object that we want to create
//     constructor(fullName, birthYear){
//         this.fullName = fullName;
//         this.birthYear = birthYear;
//     }

//     // All of this methods which we write outside of the constructor will be on the prototype of the objects and not on the objects itself

//     // ? This are Instance methods
//     // Methods will be added to .prototype property
//     calcAge() {
//         console.log(2037 - this.birthYear)
//     }

//     greet() {
//         console.log(`Hey ${this.firstName}`)
//     }

//     get age() {
//         return 2037 - this.birthYear;
//     }

//     // Set a property that already exists
//     set fullName(name) {
//         // console.log(name)
//         if(name.includes(' ')) this._fullName = name;
//         else console.log(`${name} is not a full name`)
//     }

//     get fullName() {
//         return this._fullName;
//     }

//     static hey() {
//         console.log('hey there')
//         console.log(this)
//     }

// }



// const jessica = new PersonCl('Jessica Davis', 1996)
// console.log(jessica)
// jessica.calcAge();
// console.log(jessica.age)

// console.log((jessica.__proto__ === PersonCl.prototype))

// PersonCl.hey();

// // PersonCl.prototype.greet = function() {
// //     console.log(`Hey ${this.firstName}`)
// // }
// jessica.greet('Sahil Gopani');
// const sahilG = new PersonCl('Sahil Gopani')
// console.log(sahilG)

// ? 1Classes are not Hoisted. Which means we can use them before the declaration, but with the classes that doesn't work
// ? 2 Just like functions, classes are also first calss citizens. (Which means, we can pass them into function and also return them from functions)
// ? 3 The Body of the Class is always executed in strict mode

// ! 214 Setters and Getters

const account = {
    owner: 'jonas',
    movements: [200, 530, 120, 300],

    // Getter is kind of property
    get latest() {
        return this.movements.slice(-1).pop();
    },

    // Any setter method should at least have one parameter
    // Setter is kind of property
    set latest(mov) {
        this.movements.push(mov)
    }
}

console.log(account.latest)
account.latest = 50;

// ! 216 Object.create
// There is still theidea of prototypal Inheritance. However there are no prototype properties involved and also no constructor functions and also no new Operator

const PersonProto = {
    calcAge() {
        console.log(2037 - this.birthYear)
    },
    greet() {
        console.log(`Hey ${this.firstName}`)
    },

    init(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    }
}

// Object.creatae creates a new object and prototype of that object will be the object that we passed in.
const steven = Object.create(PersonProto);
console.log(steven);
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();
console.log(steven.__proto__)

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge();

// ! 217 Challenge #3
///////////////////////////////////////
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/

class CarCl {
    constructor(make, speed) {
        this.make = make;
        this.speed = speed;
    }
    accelerate() {
        this.speed += 10;
        console.log(`${this.speed} km/h`)
    }

    brake() {
        this.speed -= 5;
        console.log(`${this.speed} km/h`)
    }

    get speedUS() {
        return this.speed / 1.6;
    }
    
    set speedUS(speed) {
        this.speed = speed * 1.6;
    }

}

const ford = new CarCl('Ford', 120);
console.log(ford.speedUS)
ford.accelerate()
ford.brake()
ford.speedUS = 50;
console.log(ford)

// ! 218 Inheritance Between_ Classes_Constructor Function

const Student = function(firstName, birthYear, course) {
    Person.call(this, firstName, birthYear)
    // this.firstName = firstName;
    // this.birthYear = birthYear;
    this.course = course;
};

// Linking Prototypes
Student.prototype = Object.create(Person.prototype)

Student.prototype.introduce = function() {
    console.log(`My name is ${this.firstName} and I study ${this.course}`)
}

const mike = new Student('Mike', 2020, 'Computer Science')
console.log(mike)
mike.introduce()
mike.calcAge();
console.log(mike.__proto__.__proto__.__proto__)

console.log(mike instanceof Student)
console.log(mike instanceof Person)
console.log(mike instanceof Object)

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor)

// ! 219 Coding Challenge 3
///////////////////////////////////////
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

// const CarC = function(make, speed) {
//     this.make = make;
//     this.speed = speed;
// }

// CarC.prototype.accelerate = function() {
//     this.speed += 10;
//     console.log(`${this.make} is going at ${this.speed} km/h`)
// }

// CarC.prototype.brake = function() {
//     this.speed -= 5;
//     console.log(`${this.make} is going at ${this.speed} km/h`)
// }


// const EV = function(make, speed, charge) {
//     CarC.call(this, make, speed)
//     this.charge = charge;
// }
// EV.prototype = Object.create(CarC.prototype)

// EV.prototype.chargeBattery = function(chargeTo) {
//     this.charge = chargeTo
// }

// EV.prototype.accelerate = function() {
//     this.speed += 20;
//     this.charge--;
//     console.log(`${this.make} is going at ${this.speed}km/h, woth a charge of ${this.charge}`);
// }

// const tesla = new EV('tela', 120, 23)
// tesla.chargeBattery(90)
// console.log(tesla);
// tesla.brake()
// tesla.accelerate()

// ! 220 Inheritance Between_ Classes_ES6 Classes

class PersonCl {
    constructor(fullName, birthYear){
        this.fullName = fullName;
        this.birthYear = birthYear;
    }

    // ? This are Instance methods
    calcAge() {
        console.log(2037 - this.birthYear)
    }

    greet() {
        console.log(`Hey ${this.firstName}`)
    }

    get age() {
        return 2037 - this.birthYear;
    }

    // Set a property that already exists
    set fullName(name) {
        // console.log(name)
        if(name.includes(' ')) this._fullName = name;
        else console.log(`${name} is not a full name`)
    }

    get fullName() {
        return this._fullName;
    }

    static hey() {
        console.log('hey there')
        console.log(this)
    }
}

class StudentCl extends PersonCl {
    constructor(fullName, birthYear, course) {
        // Always needs to happen first. Because this call to the "super" function is responsible for creating the this keyword in this sub-class
        super(fullName, birthYear)
        this.course = course;
    }

    introduce() {
        console.log(`My name is ${this.fullName} and I study ${this.course}`)
    }

    calcAge() {
        console.log(`I am ${2037 - this.birthYear} years old, but as a Student I feel more like ${2037 - this.birthYear + 10}`)
    }
}

// const martha = new StudentCl('martha', 2012)
const martha = new StudentCl('martha jones', 2012, 'Computer Science')
martha.introduce()
martha.calcAge()

// ! 221 Inheritance Between_Classes_Object.Create

const personProto = {
    calcAge() {
        console.log(2037 - this.birthYear)
    },

    init(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    }
}

const stevn = Object.create(PersonProto)

// The PersonProto Object is in turn the Prototype of the StudentProto and so therefore the PersonProto is the PARENT PROTOTYPE of Jay(StufentProto)
const StudentProto = Object.create(PersonProto)

StudentProto.init = function(firstName, birthYear, course) {
    PersonProto.init.call(this, firstName, birthYear)
    this.course = course;
}

StudentProto.introduce = function() {
    console.log(`My name is ${this.firstName} and I study ${this.course}`)
}

// Now the student Proto Oject is now the prototype of the jay Object
const jay = Object.create(StudentProto)
jay.init('Jay', 2010, 'Computer Science')

// ! 222 Another Class Example

// ! 223 Encapsulation: Protected Properties and Methods

// ! 224 Encapsulation_ Private class Fields and Methods

// Public Fields
// Private fields
// Public methods
// private methods
// (There is also thhe Static version)

// ? We can think of a field as a property that will be on all instances. That's why it is a;so known as Public Instance Field

class Account {
    // 1) Public Fields (instances)
    local = navigator.language;
    
    // 2) Private Fields = #is just to make private
    #movements = [];
    #pin;
    constructor(owner, currency, pin) {
        this.owner = owner;
        this.currency = currency;
        this.#pin = pin;
        // this.balance = 0;
        // ? We can create even more properties on any instance and properties that are not based on any inputs

        // It's not Private, Its Protected
        // this._movements = []
        // this.locale = navigator.language;

        console.log(`Thanks for Opening an Account ${owner}`)
    }

    // Public Interface of our Object
    // Public Methods

    getMovements() {
        return this.#movements
    }
    deposit(val) {
        this.#movements.push(val)
        return this;// we did this, because, this is the current Object
    }
    withdraw(val) {
        this.deposit(-val);
        return this// Also, returning this, will essentially make the method chanable
    }

    // _approveLoan(val) {
    //     return true;
    // }

    requestLoan(val) {
        if(this._approveLoan(val)) {
            this.deposit(val);
            console.log(`Loan Approvrd`)
            return this;
        }
    }

    // Private Methods. Helps to hide the implementation details from the outside

    _approveLoan(val) {
        return true;
    }

    // Static methods will not be available on all the instances but only on the class itself
    static helper() {
        console.log('Helper');
    }
}

const acc1 = new Account('Sahil', 'EUR', 2010)
console.log(acc1)

// Rather than that, you can create method
// acc1._movements.push(250)
// acc1._movements.push(-140)

acc1.deposit(250)
acc1.withdraw(140)
acc1.requestLoan(1000)
// acc1.#approveLoan(1000)
console.log(acc1.getMovements())

console.log(acc1)
// console.log(acc1.#pin)

Account.helper();

// ! 225 Chaining Methods
acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000)
console.log(acc1.getMovements())

// ! 227 Cooding Challenge #4

///////////////////////////////////////
/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

const CarC = function(make, speed) {
    this.make = make;
    this.speed = speed;
}

CarC.prototype.accelerate = function() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`)
}

CarC.prototype.brake = function() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`)
}


const EV = function(make, speed, charge) {
    CarC.call(this, make, speed)
    this.charge = charge;
}
EV.prototype = Object.create(CarC.prototype)

EV.prototype.chargeBattery = function(chargeTo) {
    this.charge = chargeTo
}

EV.prototype.accelerate = function() {
    this.speed += 20;
    this.charge--;
    console.log(`${this.make} is going at ${this.speed}km/h, woth a charge of ${this.charge}`);
}

const tesla = new EV('tela', 120, 23)
tesla.chargeBattery(90)
console.log(tesla);
tesla.brake()
tesla.accelerate()



































