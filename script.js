const headerNav = document.querySelector('.header__navigation');
headerNav.addEventListener('click',select);

function select(event){
   if(event.target.tagName == "A"){
       let navListLength = headerNav.children[0].children.length;
       let navList = headerNav.children[0].children;

       for(let i=0;i<navListLength; i+=2){
         navList[i].children[0].classList.remove('header__navigation_selected');
       }
       
       event.target.classList.add('header__navigation_selected');
   }
}

const ButtonVertical = document.querySelector('.slide1__home-vertical');
ButtonVertical.addEventListener('click',changeScreen);

const ButtonHorizontal = document.querySelector('.slide1__home-horizontal');
ButtonHorizontal.addEventListener('click',changeScreen);

function changeScreen(event){
  let eventClass = '#' + event.target.classList[0];
  let screenClassList = document.querySelector(eventClass).classList;
  let isOn = true;

  for (let i=0;i<screenClassList.length; i++){
      if(screenClassList[i]=='turn-off-screen') isOn = false;
  }

  if(isOn){
      screenClassList.add('turn-off-screen');
  } else{
      screenClassList.remove('turn-off-screen');
  }
}


const portfolioLinks = document.querySelectorAll('.portfolio__item-link');
portfolioLinks.forEach(link => link.addEventListener('click',replaceImages))
let portfolioSelectedLink = -1;
let portfolioImageList = document.querySelector('.portfolio .layout-4-column');

function replaceImages(event){
  event.preventDefault();
  
  if(portfolioSelectedLink!=-1){
    portfolioLinks[portfolioSelectedLink].classList.remove('portfolio__navigation_selected');
  }

  for(let i=0; i<portfolioLinks.length;i++){
    if(event.target === portfolioLinks[i]){
      portfolioSelectedLink = i; 
      break;
    }
  }
  portfolioLinks[portfolioSelectedLink].classList.add('portfolio__navigation_selected');

  let shiftedImage = portfolioImageList.children[0];
  portfolioImageList.removeChild(shiftedImage);
  portfolioImageList.appendChild(shiftedImage); 
}



let portfolioImages = document.querySelectorAll('.layout-4-column__image');
portfolioImages.forEach(image => image.addEventListener('click',makeImageSelected));
let portfolioSelectedImage = -1;

function makeImageSelected(event){
  if(portfolioSelectedImage!=-1){
    portfolioImages[portfolioSelectedImage].classList.remove('portfolio__image_selected');
  }

  for(let i=0; i<portfolioImages.length;i++){
    if(event.target === portfolioImages[i]){
      portfolioSelectedImage = i; 
      break;
    }
  }
  portfolioImages[portfolioSelectedImage].classList.add('portfolio__image_selected');
}



const formSubmitButton = document.querySelector('.submit-button');
formSubmitButton.addEventListener('click',openModalWindow);

function openModalWindow(event){
  let modalWindow = document.querySelector('.get-a-quote .modal-window');

  let name = document.forms["form-post"].elements["name"].value;
  let email = document.forms["form-post"].elements["email"].value;
  if(! (/^[A-Z]{1}[a-z]+(\s[A-Z]{1}([a-z]+))?$/.test(name))) return;
  if(!(/^[^@]+@([a-z0-9\-]+\.)+[a-z]{2,4}$/.test(email))) return;

  modalWindow.classList.add("modal-window_visibility");

  let topicForm = document.forms["form-post"].elements["subject"].value;
  let descriptionForm = document.forms["form-post"].elements["description"].value;
  
  let topicModal = modalWindow.querySelector(".modal-window__topic");
  if(topicForm == ""){
    topicModal.textContent = "Без темы";
  } else{
    topicModal.textContent = "Тема: " + topicForm;
  } 

  let descriptionModal = modalWindow.querySelector(".modal-window__description");
  if(descriptionForm == ""){
    descriptionModal.textContent = "Без описания";
  } else{
    descriptionModal.textContent = "Описание: " + descriptionForm;
  }
}



const mediaLinks = document.querySelectorAll(".social-link");
mediaLinks.forEach(link => link.addEventListener("click", function(event) {event.preventDefault();}));

const modalSubmitButton = document.querySelector('.get-a-quote .modal-window__close-button');
modalSubmitButton.addEventListener('click',closeModalWindow);

function closeModalWindow(){
  event.preventDefault();

  let modalWindow = document.querySelector('.get-a-quote .modal-window');
  modalWindow.classList.remove("modal-window_visibility");
  document.forms["form-post"].elements["name"].value = "";
  document.forms["form-post"].elements["email"].value = "";
  document.forms["form-post"].elements["description"].value = "";
  document.forms["form-post"].elements["subject"].value = "";
}


document.addEventListener('scroll',onScroll);

function onScroll(){
  const currentPosition = window.scrollY;
  const links = document.querySelectorAll('.header__navigation a');

  let sections = document.querySelectorAll('section');
  sections.forEach((el) =>{
    
     if((el.offsetTop) <= currentPosition && 
        (el.offsetTop + el.offsetHeight) > currentPosition){
          links.forEach((a) => {
            a.classList.remove('header__navigation_selected');

            if(a.getAttribute("href").substring(1) === el.getAttribute("id")) 
              a.classList.add('header__navigation_selected');
          })
        }
  })
}


let slides = document.querySelectorAll('.slide');
let currentSlide = 0;
let isEnabled = true;

document.querySelector(".arrow.arrow-forward").addEventListener('click',function(){
  if(isEnabled) nextSlide(currentSlide);
});

document.querySelector(".arrow.arrow-backward").addEventListener('click',function(){
  if(isEnabled) previousSlide(currentSlide);
});

function nextSlide(n){
  hideSlide('to-right');
  changeCurrentSlide(n+1);
  showSlide('from-left');
}

function previousSlide(n){
  hideSlide('to-left');
  changeCurrentSlide(n-1);
  showSlide('from-right');
} 

function hideSlide(direction){
  isEnabled = false;
  let curSlide = slides[currentSlide];
  curSlide.classList.add(direction);
  curSlide.addEventListener('animationend',function(){
    this.classList.remove('active', direction);
  })
}

function showSlide(direction){
  let curSlide = slides[currentSlide];
  curSlide.classList.add('next',direction);
  curSlide.addEventListener('animationend',function(){
    this.classList.remove('next',direction);
    this.classList.add('active'); 
    isEnabled = true;
  })
}

function changeCurrentSlide(n){
  currentSlide = (n + slides.length) % slides.length;
}


let hamburger = document.querySelector(".header .hamburger");
hamburger.addEventListener('click', openMobileMenu);

function openMobileMenu(event) {
  let modalWindow = document.querySelector(".header .modal-window");
  modalWindow.classList.add('modal-window_visibility');   
}

let rotatedHamburger = document.querySelector(".header .modal-window .hamburger");
rotatedHamburger.addEventListener('click',closeMobileMenu);

function closeMobileMenu(){
  let modalWindow = document.querySelector(".header .modal-window");
  modalWindow.classList.remove('modal-window_visibility');   
}

let mobileNavigation = document.querySelectorAll('.header .modal-window .navigation__item');
mobileNavigation.forEach(item => item.addEventListener('click',closeMobileMenu));
