
'use strict';

const accordionBtn = Array.from(document.querySelectorAll(".accordion-label"));
accordionBtn.addEventListener('click',expand);
const accordionSibling = document.querySelectorAll(".accordion-content");


function expand(e){
    const btn = event.target(accordionBtn);
    console.log('button clicked');
    btn.classList.toggle('open');

}

