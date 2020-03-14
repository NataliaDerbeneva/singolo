const headerNav = document.querySelector('.header__navigation');

headerNav.addEventListener('click',select)


function select(event){
   // 
   if(event.target.tagName == "A"){
       let navListLength = headerNav.children[0].children.length;
       let navList = headerNav.children[0].children;

       for(let i=0;i<navListLength; i+=2){
         navList[i].children[0].classList.remove('header__navigation_selected');
       }
       
       event.target.classList.add('header__navigation_selected');
   }
}

const arrows = document.querySelectorAll('.arrow-link');
arrows.forEach(arrow => arrow.addEventListener('click', slideList));
const slides = arrows[0].parentElement.querySelectorAll('.slide');
let slideOrder = 0;

function slideList (event){

  event.preventDefault();
  if(slideOrder == 0){
    slideOrder = 1;
    slides[0].classList.add('slide-list');
    document.querySelector('.slider').classList.add('slide2_background');
    document.querySelector('.slider__bottom-line').classList.add('slider__bottom-line_visibility');
  } else {
    slideOrder = 0;
    slides[0].classList.remove('slide-list'); 
    document.querySelector('.slider').classList.remove('slide2_background');
    document.querySelector('.slider__bottom-line').classList.remove('slider__bottom-line_visibility');
  }
}

