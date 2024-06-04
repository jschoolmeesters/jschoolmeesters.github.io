window.addEventListener("scroll", function() {
    // wait until target exists first
    var elementTarget = document.getElementById("navbar-trigger");
    if (window.scrollY > (elementTarget.offsetTop)) {
        var element = document.getElementById("navbar");
        element.classList.add("navbar-show");
    } else {
        var element = document.getElementById("navbar");
        element.classList.remove("navbar-show");
    }
});

window.preventScrolling = (val) => {
    if (val) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "auto";
    }
};