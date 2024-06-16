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

// Animation - Page Loader Home Part 1
window.homeLoaded = () => { 
    gsap.to(".scroll.gsap-animate-transition", {
        opacity: 0,
        y: 15, // Move down by 5% of the element's height
        scrollTrigger: {
          start: "top+=0 top", // Start the animation after scrolling 100px from the top of the page
          end: "+=200", // The animation will end after scrolling another 100px
          scrub: true // Smoothly animate the changes as the user scrolls
        }
    });

    gsap.set("aside.gsap-animate-transition", {
        xPercent: 100
    });


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

    gsap.fromTo("footer.gsap-animate-transition", {
        yPercent: 100,
        autoAlpha: 0,
    },{
        yPercent: 0,
        autoAlpha: 1,
        duration: durationDefaultFaster,
        ease: "primary-ease",
        scrollTrigger: {
            trigger: 'footer.gsap-animate-transition',
            toggleActions: 'play none none reverse',
            //pin: true, // pin the trigger element while active
            start: 'top bottom', // when the top of the trigger hits the top of the viewport
            //end: () => `+=${document.querySelector('.links.gsap-animate-transition').offsetHeight / 2}`, // dynamically calculate the end position to the middle of the element
            //scrub: 1
        }
    })

    var tl = gsap.timeline();

    /*
    tl.set(".about.gsap-animate-transition", {
        yPercent: 50
    });
    */

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
    }, "<");/*"+=0.5");*/

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

    // used to be xpercent animation
    tl.fromTo(".fill.gsap-animate-transition", {
        autoAlpha: 1
    },{
        delay: 0.5,
        autoAlpha: 0,
        ease: "primary-ease",
        duration: durationDefault
    }, "<");

    tl.fromTo(".navbar.gsap-animate-transition", {
        yPercent: -100
    },{
        yPercent: 0,
        ease: "primary-ease",
        duration: durationDefaultFaster
    }, "< +=0.65");

    tl.fromTo(".darkmode.gsap-animate-transition", {
        autoAlpha: 0
    },{
        autoAlpha: 1,
        ease: "primary-ease",
        duration: durationDefault
    }, "<");

    tl.fromTo(".scroll.gsap-animate-transition", {
        yPercent: 100,
        autoAlpha: 0
    },{
        autoAlpha: 1,
        yPercent: 0,
        ease: "primary-ease",
        duration: durationDefaultFaster
    }, "<");
}

window.openMenu = () => { 
    tl = gsap.timeline();

    tl.fromTo(".content.gsap-animate-transition", {
        autoAlpha: 1
    },{
        autoAlpha: 0,
        ease: "primary-ease",
        duration: durationDefaultFastest
    });

    tl.fromTo("aside.gsap-animate-transition", {
        xPercent: 100
    },{
        xPercent: 0,
        ease: "primary-ease",
        duration: durationDefaultFastest
    }, "<");

    tl.fromTo(".nav-link-container.gsap-animate-transition", {
        xPercent: 25
    },{
        xPercent: 0,
        duration: durationDefaultFastest,
        ease: "primary-ease",
        stagger: 0.035
    }, "<")

    tl.fromTo(".nav-link.gsap-animate-transition", {
        xPercent: 15,
        autoAlpha: 0,
    },{
        xPercent: 0,
        autoAlpha: 1,
        duration: durationDefaultFaster,
        ease: "primary-ease",
        stagger: 0.035
    }, "< += 1.47")

    tl.fromTo(".nav-bottom.gsap-animate-transition", {
        xPercent: 25,
        autoAlpha: 0,
    },{
        xPercent: 0,
        autoAlpha: 1,
        duration: durationDefaultFaster,
        ease: "primary-ease"
    }, "< += 1.47")
}

window.closeMenu = () => { 
    tl = gsap.timeline();

    tl.fromTo(".content.gsap-animate-transition", {
        autoAlpha: 0
    },{
        autoAlpha: 1,
    });

    tl.fromTo("aside.gsap-animate-transition", {
        xPercent: 0
    },{
        xPercent: 100,
        ease: "primary-ease-out",
        duration: durationDefaultFastest
    }, "<");

    tl.fromTo("nav.gsap-animate-transition", {
        xPercent: 0,
        autoAlpha: 1,
    },{
        xPercent: 25,
        autoAlpha: 0,
        duration: durationDefaultFastest,
        ease: "primary-ease-out"
    }, "<")

    tl.to("nav.gsap-animate-transition", {
        xPercent: 0,
        autoAlpha: 1
    });
}