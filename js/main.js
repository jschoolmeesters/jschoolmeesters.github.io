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


// Prevent scrolling while menu is open
/*
window.preventScrolling = (val) => {
    if (val)
        document.body.style.overflow = "hidden";
    else
        document.body.style.overflow = "auto";
};
*/

// Fade in page after load

window.fadeIn = () => {
    document.body.querySelector("main").classList.add('loaded');
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

window.observeFadeIn = (elementId) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                window.pageFadeIn();
                observer.disconnect(); // Stop observing once faded in
            }
        },
        { threshold: 0.1 } // Adjust threshold as needed
    );

    //element.style.opacity = 0; // Ensure initially hidden
    observer.observe(element);
};

window.pageFadeOut = () => {
    const tl = gsap.timeline();

    tl.to(".index.gsap-animate-transition", {
        autoAlpha: 0,
        duration: durationDefaultFastest,
        ease: "primary-ease",
    }, "<");

    tl.fromTo(".ani-box.gsap-animate-transition", {
        "--before-y-percent": "0%",
        autoAlpha: 0,
    },{
        "--before-y-percent": "-100%",
        autoAlpha: 1,
        duration: durationDefaultFastest,
        ease: "primary-ease",
    }, "<");
}

window.pageFadeIn = () => {
    const tl = gsap.timeline();

    tl.set(".index.gsap-animate-transition", {
        autoAlpha: 0,
    }, "<");

    tl.fromTo(".ani-box.gsap-animate-transition", {
        "--before-y-percent": "0%",
        autoAlpha: 0,
    },{
        "--before-y-percent": "-100%",
        autoAlpha: 1,
        duration: durationDefaultFastest,
        ease: "primary-ease",
    }, "<");

    tl.fromTo(".index.gsap-animate-transition", {
        "--before-y-percent": "100%",
        autoAlpha: 0,
        y: "3vh"
    },{
        "--before-y-percent": "0%",
        autoAlpha: 1,
        y: "0vh",
        duration: durationDefaultFastest,
        ease: "primary-ease",
    }, "<");
};


// Animation - Page Loader Home Part 1
window.pageLoaded = () => { 
    
    gsap.set(".index.gsap-animate-transition", {
        autoAlpha: 0,
    });
    /*
    gsap.fromTo(".posts-header.gsap-animate-transition .gsap-line-inner", {
        autoAlpha: 0,
        yPercent: 100,
        rotate: 0.001
    },{
        autoAlpha: 1,
        yPercent: 0,
        rotate: 0.001,
        ease: "primary-ease",
        duration: durationDefault,
        scrollTrigger: {
            trigger: '.posts-header.gsap-animate-transition',
            toggleActions: 'play none none reverse',
            //pin: true, // pin the trigger element while active
            start: 'top bottom', // when the top of the trigger hits the top of the viewport
            //end: () => `+=${document.querySelector('.links.gsap-animate-transition').offsetHeight / 2}`, // dynamically calculate the end position to the middle of the element
            //scrub: 1
        }
    });
    */

    return new Promise((resolve) => {
        const tl = gsap.timeline({
            onComplete: () => {
                resolve();
            }
        });

        
        //tl.fromTo(".loader-fill.gsap-animate-transition", {
        //    yPercent: 0,
        //}, {
        //    yPercent: -100,
        //    ease: "primary-ease",
        //    duration: 0.75
        //});

        /*
        tl.fromTo(".index.gsap-animate-transition", {
            "--before-y-percent": "100%",
            autoAlpha: 0,
            y: "5vh"
        },{
            "--before-y-percent": "0%",
            autoAlpha: 1,
            y: "0vh",
            duration: durationDefaultFastest,
            ease: "primary-ease",
        });
        */
        
        /*
        tl.fromTo(".about-first.gsap-lines.gsap-animate-transition .gsap-line-inner", {
            autoAlpha: 0,
            yPercent: 100,
            rotate: 0.001
        },{
            autoAlpha: 1,
            yPercent: 0,
            rotate: 0.001,
            ease: "primary-ease",
            duration: durationDefaultFastest,
            stagger: staggerDefault
        }, "+= 2");
        */

        /*
        // move up slightly and fade in : .hero-img
        tl.fromTo(".hero-img.gsap-animate-transition", {
            yPercent: 20,
            autoAlpha: 0,
        },{
            yPercent: 0,
            autoAlpha: 1,
            duration: durationDefault,
            ease: "primary-ease",
        }, "<");
        */

        // border width from 0 to 1 for .border-bottom
        /*
        tl.fromTo(".border-bottom.gsap-animate-transition", {
            scaleX: 0,
            autoAlpha: 0,
            y: 50,
        },{
            scaleX: 1,
            autoAlpha: 1,
            y: 0,
            duration: durationDefault,
            ease: "primary-ease",
        }, "<");
        */

        //tl.to(".about.gsap-animate-transition", {
        //    yPercent: 0,
        //    duration: durationDefaultFastest,
        //    ease: "primary-ease"
        //}, "<");/*"+=0.5");

        // move up ypercent of .ani-box::after by 100


        
        //tl.fromTo(".navbar.gsap-animate-transition", {
        //    yPercent: -100
        //},{
        //    yPercent: 0,
        //    ease: "primary-ease",
        //    duration: durationDefaultFaster
        //}, "< +=0.65");
    
        //tl.fromTo(".scroll.gsap-animate-transition", {
        //    yPercent: 100,
        //    autoAlpha: 0
        //},{
        //    autoAlpha: 1,
        //    yPercent: 0,
        //    ease: "primary-ease",
        //    duration: durationDefaultFaster
        //}, "<");
    });
}