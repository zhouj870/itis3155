
'use strict';

const root = document.documentElement;

const accordionBtn = Array.from(document.querySelectorAll(".accordion-label"));
function buttonClick(event)
{
    const btn = event.target;
    const content = btn.nextElementSibling;

    //  toggle open class for when button is clicked
    btn.classList.toggle("open");
    content.classList.toggle("open");

    // set height for css
    root.style.setProperty("--content-height", content.scrollHeight + 'px');

    //close other sections when clicked
    for(let i = 0; i < accordionBtn.length; i++)
    {
        let button = accordionBtn[i];
        let otherContent = button.nextElementSibling;
        if(button !== btn && button.classList.contains("open"))
        {
            button.classList.remove("open");
            otherContent.classList.remove("open");

        }

    }
}

for (let i = 0; i < accordionBtn.length; i++) {
    accordionBtn[i].addEventListener("click", buttonClick);
}


