// Post progress bar
window.initializeProgressBar = () => {
    let progressContainer = document.getElementById("progress-container");
    progressContainer.innerHTML = "";

    let sections = document.querySelectorAll("article h2");
    let numSections = sections.length;
    const windowHeight = window.innerHeight;

    // Create progress segments
    for (let i = 0; i < numSections; i++) {
        const segment = document.createElement("div");
        segment.classList.add("progress-segment");
        progressContainer.appendChild(segment);
    }

    const progressSegments = document.querySelectorAll(".progress-segment");

    function rec(index, cumulativeHeight, scrollPosition, matches) {
        if (index < 0) {
            if (matches.includes(0)) {
                if (scrollPosition === 0)
                    return 0;
                else
                    return Math.max(...matches);
            } else if (matches.length > 0) {
                return Math.max(...matches); // Spread operator to handle the array correctly
            } else {
                return 0;
            }
        } else {
            const section = sections[index];
            if (!section) {
                console.warn(`Section at index ${index} is undefined.`);
                return rec(index - 1, cumulativeHeight, scrollPosition, matches);
            }
            
            const sectionTop = section.offsetTop;
            if (isNaN(sectionTop)) {
                console.warn(`sectionTop is NaN for index ${index}`);
            }
    
            let sectionHeight = 0;
    
            if (index < numSections - 1) {
                sectionHeight = sections[index + 1].offsetTop - sectionTop;
            } else {
                sectionHeight = document.body.clientHeight - sectionTop;
            }
    
            let newCumulativeHeight = cumulativeHeight + sectionHeight;
    
            if (newCumulativeHeight <= windowHeight) {
                if (index === sections.length - 1 && scrollPosition + windowHeight >= sectionTop) {
                    matches.push(index);
                } else if (scrollPosition + windowHeight <= sectionTop + sectionHeight && scrollPosition + windowHeight >= sectionTop) {
                    matches.push(index);
                }
                return rec(index - 1, newCumulativeHeight, scrollPosition, matches);
            } else {
                if (scrollPosition <= sectionTop + sectionHeight && (scrollPosition >= sectionTop || index === 0)) {
                    matches.push(index);
                }
                return rec(index - 1, newCumulativeHeight, scrollPosition, matches);
            }
        }
    }
    

    function updateProgress() {
        const scrollPosition = window.scrollY;

        let highlightedIndex = -1;
       
       sections = document.querySelectorAll("article h2");
       numSections = sections.length;
        highlightedIndex = rec(numSections - 1, 0, scrollPosition, []);

        // Update progress segments
        progressSegments.forEach((seg, idx) => {
            if (idx === highlightedIndex) {
                seg.classList.add("active");
            } else {
                seg.classList.remove("active");
            }
            if (idx <= highlightedIndex) {
                seg.classList.add("fill");
            } else {
                seg.classList.remove("fill");
            }
        });
    }

    // Initial update
    updateProgress();

    // Update on scroll
    window.addEventListener("scroll", updateProgress);
};