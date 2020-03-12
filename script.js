const headerNav = document.querySelector('.header__navigation');

headerNav.addEventListener('mousedown',select)


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