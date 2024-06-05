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

// Post progress bar
window.initializeProgressBar = () => {
    const progressContainer = document.getElementById("progress-container");
    const sections = document.querySelectorAll("article h2");
    const numSections = sections.length;

    // Create progress segments
    for (let i = 0; i < numSections; i++) {
        const segment = document.createElement("div");
        segment.classList.add("progress-segment");
        progressContainer.appendChild(segment);
    }

    const progressSegments = document.querySelectorAll(".progress-segment");

    function updateProgress() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.body.scrollHeight;

        let highlightedIndex = -1;

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            // Check if we are at the bottom of the page and if cumulative height of sections from bottom is less than the view height
            if (scrollPosition + windowHeight >= documentHeight) {
                let cumulativeHeight = 0;
                for (let i = numSections - 1; i >= 0; i--) {
                    cumulativeHeight += sections[i].clientHeight;
                    if (cumulativeHeight < windowHeight && scrollPosition + windowHeight >= sections[i].offsetTop) {
                        highlightedIndex = i;
                        break;
                    }
                }
            } else if (scrollPosition >= sectionTop - windowHeight + sectionHeight / 2) {
                highlightedIndex = index;
            }
        });

        // Update progress segments
        progressSegments.forEach((seg, idx) => {
            if (idx === highlightedIndex) {
                seg.classList.add("active");
            } else {
                seg.classList.remove("active");
            }
        });
    }

    // Initial update
    updateProgress();

    // Update on scroll
    window.addEventListener("scroll", updateProgress);
};
