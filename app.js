/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/

const navList = document.getElementById("navbar__list");
const sections = document.querySelectorAll("section");
const fragment = document.createDocumentFragment()




// build the nav List Items

function createLi(){
    // Loop over sections to build Dynamic nav items
    for (const section of sections){
        const listEle = document.createElement("li");
        const EleLink = document.createElement("a");
        EleLink.className = "menu__link"
        EleLink.innerHTML = section.dataset.nav
        EleLink.href = `#${section.id}`;
        listEle.appendChild(EleLink)
        fragment.appendChild(listEle)
    }
    navList.appendChild(fragment) 
};

createLi()

// Scroll to section on link click

const navLinks = document.querySelectorAll("a.menu__link")

// Loop over links to add click event for each
for(const link of navLinks){
    
    link.addEventListener("click", e => {
        e.preventDefault()
        // Loop over each section to check with link content
        for(const section of sections){
            if (section.dataset.nav === e.target.innerHTML){
                // Scroll to section at link click using scrollIntoView event
                section.scrollIntoView({
                    behavior: "smooth"
                })
            }
        }
    })
}



// Add class 'active' to section when near top of viewport

window.addEventListener("scroll", function(){

    // Hide Fixed nav Bar while not scrolling

    const nav = document.querySelector(".navbar__menu")
    const head = document.querySelector(".main__hero")
    const headBound = head.getBoundingClientRect()
    if (headBound.bottom <= 0){
        nav.style.display = "block"

    }else{
        nav.style.display = "none"

    }


    // Loop over sections to add active class to each in special dimention conditions

    for (const section of sections){

        const sectionTop = section.getBoundingClientRect().top
        const sectionHeight = section.getBoundingClientRect().height

        if (sectionTop <= 0.5*sectionHeight && sectionTop >= -(0.5 * sectionHeight)){

            section.classList.add("your-active-class")
            // Loop over links to add active class to the corresponding link to the current active section
            navLinks.forEach(function(link){
                if(section.dataset.nav === link.innerHTML){
                    link.classList.add("active-link")
                }else{
                    link.classList.remove("active-link")
                }
            })
        }else{
            section.classList.remove("your-active-class")
        }
    }
})


// create Scroll to Top Button

const btn = document.createElement("button");
const main = document.querySelector("main")
btn.id = "scroll-btn"
btn.innerHTML = `Scroll \n Top`
main.appendChild(btn)

window.addEventListener("scroll", function(){

    const header = document.getElementsByClassName("main__hero")[0]

    const headBound = header.getBoundingClientRect();
    if (headBound.bottom <= 0){
        btn.style.display = "block"

    }else{
        btn.style.display = "none"

    }
})

// add click event to button

btn.onclick = function(){
    window.scrollTo ({
        left: 0,
        top: 0,
        behavior: "smooth"
    })
}




// making sections Collapsable 

const sectionsHeading = document.querySelectorAll("section h2")
const sectionsPara = document.querySelectorAll("section p")


for (const heading of sectionsHeading){
    heading.addEventListener("click", function(e){
        sectionsPara.forEach(function(para){
            if(para.parentElement === heading.parentElement){
                para.classList.toggle("hide");
                para.parentElement.parentElement.style.minHeight = "0"
            }
        })

    })

}






