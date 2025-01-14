// Wait for dynamically generated elements to load
// TODO: replace with MutationObserver (https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)

function waitForElements(selector, count, interval = 100) {
    return new Promise((resolve) => {
        const checkElements = () => {
            const elements = document.querySelectorAll(selector);
            if (elements.length >= count) {
                clearInterval(timer);
                resolve(true);
            }
        };

        const timer = setInterval(checkElements, interval);
    });
}

window.waitForPosts = async function (count) {
    return await waitForElements('.post.gsap-animate-transition', count);
};

// Lenis smooth scroll

const lenis = new Lenis({
    wheelMultiplier: 1.25,
    touchMultiplier: 1,
})

/*
lenis.on('scroll', (e) => {
  console.log(e)
})
*/

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
   document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// GSAP animations

document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger, CustomEase);
    initCheckWindowHeight();
});

let scroll;
let transitionOffset = 1100;
let staggerDefault = 0.07;
let durationDefault = 1.47;
let durationDefaultFaster = 1.2;
let durationDefaultFastest = 0.9;
let durationDefaultUltraFast = 0.6;
let durationDefaultCrazyFast = 0.3;


CustomEase.create("primary-ease", "0.62, 0.05, 0.01, 0.99");
CustomEase.create("primary-ease-out", ".34, 1.56, 0.64, 1");

/*
window.beginTransitionBox = (x, y) => {

    return new Promise((resolve) => {
        const tl = gsap.timeline({
            onComplete: () => {
                resolve();
            }
        });

        tl.set(".transition-box.gsap-animate-transition", {
            x: x,
            y: y,
            autoAlpha: 1,
        });
    
        tl.fromTo(".transition-box.gsap-animate-transition", {
            scaleX: 0,
            scaleY: 0,
        }, {
            scaleX: 200,
            scaleY: 200,
            duration: durationDefault,
            ease: "primary-ease",
        });
    });
}

window.endTransitionBox = () => {
    return new Promise((resolve) => {
        const tl = gsap.timeline({
            onComplete: () => {
                resolve();
            }
        });

        tl.to(".transition-box.gsap-animate-transition", {
            autoAlpha: 0,
            duration: durationDefaultUltraFast,
            ease: "primary-ease",
        })

    });
}

window.animatePosts = () => {
    gsap.fromTo(".post-border.gsap-animate-transition", {
        xPercent: 100,
        //autoAlpha: 0,
    },{
        xPercent: 0,
        //autoAlpha: 1,
        duration: durationDefault,
        ease: "primary-ease",
        stagger: staggerDefault,
        scrollTrigger: {
            trigger: '.post.gsap-animate-transition',
            toggleActions: 'play none none reverse',
           // pin: true, // pin the trigger element while active
            start: 'bottom bottom', // when the top of the trigger hits the top of the viewport
            //end: '+=500', // end after scrolling 500px beyond the start
            //scrub: 1
        }
    })

    gsap.fromTo(".post.gsap-animate-transition", {
        xPercent: 25,
        autoAlpha: 0,
    },{
        xPercent: 0,
        autoAlpha: 1,
        duration: durationDefaultFaster,
        ease: "primary-ease",
        stagger: 0.035,
        scrollTrigger: {
            trigger: '.post.gsap-animate-transition',
            toggleActions: 'play none none reverse',
           // pin: true, // pin the trigger element while active
            start: 'bottom bottom', // when the top of the trigger hits the top of the viewport
            //end: '+=500', // end after scrolling 500px beyond the start
            //scrub: 1
        }
    })
}
*/

// Expand accordion-child-content from height: 0 to height: auto using to
window.expandAccordion = (id) => {   
    const accordion = document.querySelector(`.accordion-child-content#${id}`);
    const height = accordion.scrollHeight;

    const tl = gsap.timeline();

    tl.to("#" + id, {
        height: height,
        autoAlpha: 1,
        duration: durationDefaultUltraFast,
        ease: "primary-ease",
    });
}

// Collapse accordion-child-content
window.collapseAccordion = (id) => {
    const tl = gsap.timeline();

    tl.to("#" + id, {
        height: 0,
        autoAlpha: 0,
        duration: durationDefaultUltraFast,
        ease: "primary-ease",
    });
}

// Fade out posts
window.fadeOutPosts = () => {
    return new Promise((resolve) => {
        const tl = gsap.timeline({
            onComplete: () => {
                resolve(); // Resolves the promise when the timeline is complete
            }
        });

        tl.fromTo(".posts.gsap-animate-transition", {
            autoAlpha: 0,
            ease: "primary-ease",
        }, {
            autoAlpha: 1,
            duration: durationDefault,
            ease: "primary-ease"
        });
    });
}

// Fade in posts
window.fadeInPosts = () => {
    const tl = gsap.timeline();

    tl.to(".posts.gsap-animate-transition", {
        autoAlpha: 1,
        duration: durationDefault,
        ease: "primary-ease",
    });
}

window.pageFadeOut = () => {
    return new Promise((resolve) => {
        const tl = gsap.timeline({
            onComplete: () => {
                resolve(); // Resolves the promise when the timeline is complete
            }
        });
    
        tl.to(".content.gsap-animate-transition", {
            autoAlpha: 0,
            y: "1vh",
            duration: durationDefaultUltraFast,
            ease: "primary-ease",
        });
    });
}

window.pageFadeIn = () => {
    const tl = gsap.timeline();

    tl.set(".content.gsap-animate-transition", {
        autoAlpha: 0,
    });

    tl.fromTo(".content.gsap-animate-transition", {
        autoAlpha: 0,
        y: "1vh"
    },{
        autoAlpha: 1,
        y: "0vh",
        duration: durationDefaultUltraFast,
        ease: "primary-ease",
    }, ">");
};

// Animation - Page Loader Home Part 1
window.animateNavbar = () => { 
    const tl = gsap.timeline();

    tl.fromTo(".ani-box.gsap-animate-transition", {
        "--before-y-percent": "0%",
        autoAlpha: 0,
    },{
        "--before-y-percent": "-100%",
        autoAlpha: 1,
        duration: durationDefault,
        ease: "primary-ease",
    });
}


// Animation - Page Loader Home Part 1
window.pageLoaded = () => { 
    const tl = gsap.timeline();

    tl.set(".content.gsap-animate-transition", {
        autoAlpha: 0,
    });
}