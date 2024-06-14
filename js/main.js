// Hide navbar on scroll down, show on scroll up (broken)
/*
window.addEventListener("scroll", function() {
    const elementTarget = document.getElementById("navbar-trigger");
    let element = document.getElementById("navbar");
    if (elementTarget == null || window.scrollY > (elementTarget?.offsetTop))  
        element.classList.add("navbar-show");
    else
        element.classList.remove("navbar-show");
});
*/

// Prevent scrolling while menu is open

window.preventScrolling = (val) => {
    if (val)
        document.body.style.overflow = "hidden";
    else
        document.body.style.overflow = "auto";
};

// Fade in page after load

window.fadeIn = () => {
    document.body.querySelector("main").classList.add('loaded');
};

// Lenis smooth scroll

const lenis = new Lenis({
    wheelMultiplier: 1.25,
    touchMultiplier: 1,
})

lenis.on('scroll', (e) => {
  console.log(e)
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

/**
 * vh fix for mobile
 */
function initCheckWindowHeight() {
   // https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
   let vh = window.innerHeight * 0.01;
   document.documentElement.style.setProperty('--vh-in-px', `${vh}px`);
}

// GSAP animations
document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(/*ScrollTrigger, */CustomEase);
});

let scroll;
let transitionOffset = 1100;
let staggerDefault = 0.07;
let durationDefault = 1.47;
let durationDefaultFaster = 1.2;
let durationDefaultFastest = 0.9;

CustomEase.create("primary-ease", "0.62, 0.05, 0.01, 0.99");
CustomEase.create("primary-ease-out", ".34, 1.56, 0.64, 1");

// Animation - Page Loader Home Part 1
window.initLoadHomePart1 = () => { 
    var tl = gsap.timeline();

    tl.set(".about.gsap-animate-transition", {
        yPercent: 50
    });

    tl.fromTo(".about-first.gsap-lines.gsap-animate-transition .gsap-line-inner", {
        autoAlpha: 0,
        yPercent: 100,
        rotate: 0.001
    },{
        autoAlpha: 1,
        yPercent: 0,
        rotate: 0.001,
        ease: "primary-ease",
        duration: durationDefault,
        stagger: staggerDefault
    }, "<");

    tl.to(".about.gsap-animate-transition", {
        yPercent: 0,
        duration: durationDefaultFastest,
        ease: "primary-ease"
    }, "+=0.5");

    tl.fromTo(".about-rest.gsap-lines.gsap-animate-transition .gsap-line-inner", {
        autoAlpha: 0,
        yPercent: 100,
        rotate: 0.001
    },{
        //delay: 0.3,
        autoAlpha: 1,
        yPercent: 0,
        rotate: 0.001,
        ease: "primary-ease",
        duration: durationDefault,
        stagger: staggerDefault
    }, "<");

    tl.fromTo(".navbar.gsap-animate-transition", {
        yPercent: -100
    },{
        yPercent: 0,
        ease: "primary-ease",
        duration: durationDefaultFaster
    }, "<");

    tl.fromTo(".darkmode.gsap-animate-transition", {
        autoAlpha: 0
    },{
        autoAlpha: 1,
        ease: "primary-ease",
        duration: durationDefault
    }, "<");

    tl.fromTo(".fill.gsap-animate-transition", {
        xPrecent: 0
    },{
        delay: 0.5,
        xPercent: 100,
        ease: "primary-ease",
        duration: 3.5
    }, "<");

}