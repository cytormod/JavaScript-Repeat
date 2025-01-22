'use strict';

// Selections 
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')
const nav = document.querySelector('.nav')

console.log(section1)

///////////////////////////////////////
// Modal window

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// ! 186 Selecting, Creating and deleting element

console.log(document.documentElement)
console.log(document.head)
console.log(document.body)

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section')
document.getElementById('section--1')
const allButtons = document. getElementsByTagName('button');
// console.log(allButtons)
console.log(document.getElementsByClassName('btn'))

// Creating and Inserting elements
// .insertAdjacentHTML

const message = document.createElement('div')
message.classList.add('cookie-message')
message.textContent = 'We use cookies for impoved functionality and analytics.';
message.innerHTML = 'We use cookies for impoved functionality and analytics. <button class = "btn btn--close-cookie">Got It!</button>';

// header.prepend(message)
// header.appendChild(message)
header.append(message)
// header.appendChild(message,cloneNode(true)) // to duplicate

// header.before(message)
// header.after(message)

// ?Delete elements
document.querySelector('.btn--close-cookie').addEventListener('click', function() {
  // message.remove();
  message.parentElement.removeChild(message);
})

// ! 187 Styles, Attributes and Classes
// Styles
message.style.backgroundColor = '#37383d'
message.style.width = '120%';

console.log(message.style.color); // It will show nothing, the reason is, it is not in-build
console.log(message.style.backgroundColor) // it will show us the result, the reason is we have mentioned it, in the line number 70, as a inbuild style

console.log(getComputedStyle(message))// Now this will give us the CSS, We can see all the properties in console with all of the values

console.log(getComputedStyle(message).color)// Now It will show the result in the console
console.log(getComputedStyle(message).height)

// ? Why parseFloat and number 10 after hright
message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';

document.documentElement.style.setProperty('--color-primaary', 'orangered')

// Attributes
const logo = document.querySelector('.nav__logo')
console.log(logo.alt)
console.log(logo.className)

// change the alt of image
logo.alt = 'Beautiful and minimalistic logo'

// non-standard attributes
console.log(logo.designer) //undefined
console.log(logo.getAttribute('designer')) // you can get access of non-standard attributes with the help og getAttribute

// SetAttribute
logo.setAttribute('company', 'Bankist')


console.log(logo.src)
logo.getAttribute('src');;

const link = document.querySelector('.nav__link--btn')
console.log(link.href)
console.log(link.getAttribute('href'))

// ? Data Attributes

console.log(logo.dataset.versionNumber)

// Classes
// you can write multiple class name just by seprating it with comma

logo.classList.add('a', 'b')
logo.classList.remove('d')
logo.classList.toggle('d')
logo.classList.contains('c'); //it is contains and not includes like JS

// Don't use because it will overwrite, whatever it is already there. Use the normal classList method.
logo.className = 'Jonas'

// ? Buttom Scrolling

// btnScrollTo.addEventListener('click', function () {
//   section1.scrollIntoView({ behavior:'smooth' })
// })

btnScrollTo.addEventListener('click', function (e) {

  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords)
  
  // console.log(e.target.getBoundingClientRect());
  
  // console.log('Current Scroll (X/Y)', window.pageXOffset, window.pageYOffset);  

  // console.log('height/width viewport',
  // document.documentElement.clientHeight,
  // document.documentElement.clientWidth
  // );
  
  // Scrolling
  // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset)
  
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset, 
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // })
  
    section1.scrollIntoView({ behavior:'smooth' })
  
});

// ! 192 Event Delegation_Implementing Page navigation

// document.querySelectorAll('.nav__link').forEach(function(el) {
//   el.addEventListener('click', function(e) {
//     e.preventDefault();
//     const id = this.getAttribute('href')
//     console.log(id);
//     document.querySelector(id).scrollIntoView({
//       behaviour: 'smooth'
//     });
//   })
// })

// ??? Instead of this, we can use event delegation, here in the above function whats happening is, we are using the same function to all of the elements. Instead of that, we can use the function to work on the parentElement ???

// TWO Steps for event Delegation

// 1: We add the event listener to a common parent element of all the elements that we are interested in.
// 2. Determin what element originated the event

document.querySelector('.nav__links').addEventListener('click', function(e) {
  e.preventDefault();
  // Matching Strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href')
    document.querySelector(id).scrollIntoView({
      behavior:'smooth'
    });
  }
})


// ! 189 Types of Events and Event Handlers

// const h1 = document.querySelector('h1');
// h1.addEventListener('mouseenter', function(e) {
//   console.log('addEventListener: Great ! You are Reading the Heading')
// })

// h1.onmouseenter = function(e) {
//   console.log('addEventListener: Great ! You are Reading the Heading')
// }
// h1.addEventListener('mouseenter', function(e) {
//   console.log('Proeve')f
// })
// h1.onmouseenter = function(e) {
//   console.log('Prove2')
// };

// const h1 = document.querySelector('h1');
// const alerth1 = function(e) {
//   console.log('addEventListener: Great !')
// }

// h1.addEventListener('mouseenter', alerth1)
// setTimeout(() => h1.removeEventListener('mouseEnter', alerth1)
//   , 3000);


  // ! ----------------------------------------------------------------------------------------- VERY IMPORTANT LECTURE-----------------------------------------------------------------------------------------------------------------------------
  // ! 191 VERY IMPORTANT Event Propagation: Bubbling and Capturing

// rgb(255, 255, 255)
// const randomInt = (min, max) => Math.floor(Math.random() * (max-min + 1) + min)
// const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`
// console.log(randomColor(0, 255))

// document.querySelector('.nav__link').addEventListener('click', function(e) {
// this.style.backgroundColor = randomColor()
// console.log('LINK', e.target, e.currentTarget)
// console.log(e.currentTarget === this)

// // Stop Propagation: It is not the good idea, it helps to fix the problems with many handlers for the same event

// // e.stopPropagation();
// })

// document.querySelector('.nav__links').addEventListener('click', function(e) {
//   this.style.backgroundColor = randomColor()
//   console.log('CONTAINER', e.target, e.currentTarget)
// // console.log(e.currentTarget === this)
// })

// document.querySelector('.nav').addEventListener('click', function(e) {
//   this.style.backgroundColor = randomColor()
//   console.log('NAV', e.target, e.currentTarget)
// // console.log(e.currentTarget === this)
// }, true)

// ! 193 DOM Travewrsing

// const h1 = document.querySelector('h1')
// console.log(h1)

// // Going downwards: Child
// console.log(h1.querySelectorAll('.highlight'))
// console.log(h1.childNodes)
// console.log(h1.children)

// h1.firstElementChild.style.color = 'white'
// h1.lastElementChild.style.color = 'orangered'

// // Going upwards:
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// h1.closest('.header').style.background = 'var(--gradient-secondary)'

// h1.closest('h1').style.background = 'var(--gradient-primary)';

// // Going sideways: Siblings 
// console.log(h1.previousElementSibling)
// console.log(h1.nextElementSibling)

// console.log(h1.previousSibling)
// console.log(h1.nextSibling)

// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el) {
//   if(el != h1) el.style.transform = 'scale(0.5)'
// });

// ! 194 Building a Tabbed Component

const tabs = document.querySelectorAll('.operations__tab')
const tabsContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content')

// tabs.forEach(t=> t.addEventListener('click'), () => console.log('TAB'))

tabsContainer.addEventListener('click', function(e) {
  const clicked = e.target.closest('.operations__tab')
  console.log(clicked);

  // ? Guard Clause
  if(!clicked) return;

  // if (clicked) {
  //   clicked.classList.add('operations__tab--active')
    
  // }

  // Remove the ACtive Classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'))
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  clicked.classList.add('operations__tab--active')

  // Activate content area

  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
})

// ! 195 Menu Fade animation

// const handleHover = function(e, opacity) {
//   // console.log(this, e.currentTarget)
//   if(e.target.classList.contains('nav__link')){
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link')
//     // console.log(siblings)
//     const logo = link.closest('.nav').querySelector('img');

//     siblings.forEach(el => {
//       if (el!== link) el.style.opacity = opacity;
//     });
//     logo.style.opacity = opacity
//   }
// }

const handleHover = function(e) {
  // console.log(this, e.currentTarget)
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link')
    // console.log(siblings)
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el!== link) el.style.opacity = this;
    });
    logo.style.opacity = this
  }
}

// Passing "Argument" into handler

// nav.addEventListener('mouseover', function(e){
//   handHover(e, 0.5)
// })
// nav.addEventListener('mouseout', function(e){
//   handHover(e, 1)
// })

// REMEMBER BIND RETURNS A NEW FUNCTION
nav.addEventListener('mouseover', handleHover.bind(0.5))  
nav.addEventListener('mouseout', handleHover.bind(1))  

// ! 196 Sticky Navigation

// const initialCoords = section1.getBoundingClientRect()
// console.log(initialCoords);

// // ? Scroll Event is not efficient, so we need to keep avoiding it, but now we are using scroll event just to kno whow it works and the working of it.
// window.addEventListener('scroll', function() {
//   console.log(window.scrollY);

//   if(window.scrollY > initialCoords.top) nav.classList.add('sticky')
//   else nav.classList.remove('sticky')
// })

// ! 197 Better_Way to the sticky Nav Better_way The Intersection Observer API
// const obsCallback = function(entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry)
//   })
// }

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2]
// }

// const observer = new IntersectionObserver(obsCallback, obsOptions)
// observer.observe(section1)

const headeer = document.querySelector('.header')
const navHeight = nav.getBoundingClientRect().height;


const stickyNav = function(entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) 
    nav.classList.add('sticky');
  else nav.classList.remove('sticky');

}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  // rootMargin: '-90px',
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header)

// ! 198 Revealing Elements on Scroll

const allSectionss = document.querySelectorAll('.section')

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden')
  observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(revealSection,{
  root: null, 
  threshold: 0.15
})

allSectionss.forEach(function(section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden')
})

// ! 199 Lazy Loading Images

const imgTargets = document.querySelectorAll('img[data-src]')
console.log(imgTargets);

const loadImg = function (entries, observer) {
  const [entry] = entries;
  console.log(entry)

  if(!entry.isIntersecting) return;

  // Replace src with data.src

  entry.target.src = entry.target.dataset.src;
  // entry.target.classList.remove('lazy-img');
  entry.target.addEventListener('load', function() {
    entry.target.classList.remove('lazy-img');
  })
  
  observer.unobserve(entry.target)
}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px'
})
imgTargets.forEach(img => imgObserver.observe(img))

// ! 200 Byukding a slider (part - 1)

// Slider
const slider = function () {

const slides = document.querySelectorAll('.slide')
const btnLeft = document.querySelector('.slider__btn--left')
const btnRight = document.querySelector('.slider__btn--right')
const dotContainer = document.querySelector('.dots')

let curSlide = 0;
const maxSlide = slides.length
console.log(maxSlide)

// const slider = document.querySelector('.slider')
// // console.log(slider)
// slider.style.transform = 'scale(0.5)'
// slider.style.overflow = 'visible'

// slides.forEach((s, i) => s.style.transform = `translateX(${100 * i}%)`)
// 0%, 100%, 200%, 300%

// Functions
const createDots = function() {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`)
  })
}

const activateDot = function(slide) {
  document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'))
  
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active')
}

const goToSlide = function(slide) {
  slides.forEach((s, i) => s.style.transform = `translateX(${100 * (i -slide)}%)`)
}


// ? Next slide

const nextSlide = function() {
  if(curSlide === maxSlide -1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  
  goToSlide(curSlide)
  activateDot(curSlide)
}

const init = function() {
  goToSlide(0);
  createDots();
  activateDot(0);
}
init()

// Event handlers
btnRight.addEventListener('click', nextSlide
// function() {
  // 0%, 100%, 200%, 300%
  
  // if(curSlide === maxSlide -1) {
  //   curSlide = 0;
  // } else {
  //   curSlide++;
  // }
  
  // goToSlide(curSlide)

  // slides.forEach((s, i) => s.style.transform = `translateX(${100 * (i -curSlide)}%)`)
// }
)

const prevSlide = function() {
  
  if(curSlide === 0) {
    curSlide = maxSlide -1;
  } else {
    curSlide--;
  }
  // curSlide--;
  goToSlide(curSlide)
  activateDot(curSlide)
}

btnLeft.addEventListener('click', prevSlide)

// ! 201 Building a slider Component

document.addEventListener('keydown',function(e) {
  if(e.key === 'ArrowRight') nextSlide()
  else if(e.key === 'ArrowLeft') prevSlide()
  // e.key === 'ArrowRight' && nextSlide();
})

dotContainer.addEventListener('click', function(e) {
  if(e.target.classList.contains('dots__dot')) {
    // const slide = e.target.dataset.slide;
    const {slide} = e.target.dataset;
    goToSlide(slide);
    activateDot(slide)
  }
})
};
slider();

// ! 202 Lifecycle Dom Event

document.addEventListener('DOMContentLoaded', function(e){
  console.log('HTML parsed and DOM tree built', e);
})

window.addEventListener('load', function(e){
console.log('Page Fully Loaded', e);
})

// window.addEventListener('beforeunload', function(e) {
//   e.preventDefault()
//   console.log(e);
//   e.returnValue = ''
// })

// !203 Efficient Script Loading_ defer and async


























































































