let slideshows = document.getElementsByClassName("slideshow");
console.log(slideshows)
for (let show of slideshows) {
    let foundSlides = show.getElementsByClassName("slide");
    console.log(`Found slideshow with ${foundSlides.length} slides`);
    //Create the controls
    const controlBox = document.createElement('div');
    controlBox.setAttribute("class", "controlbox")

    let autoscroll = true;
    let currentSelected = 0;
    const slides = [];
    let pauseTimer = null
    const pauseAutoscroll = () => {
        //Disable autoscroll
        autoscroll = false;

        //Clear old timer if it exist
        if (pauseTimer !== null) { 
            clearTimeout(pauseTimer);
        }

        //Create timer to renable autoscroll after 15 seconds
        pauseTimer = setTimeout(() => {
            //Reeanble autoscroll
            autoscroll = true;
            //Clear timer
            pauseTimer = null;
        }, 15000);
    }
  
    const advance = ()=>{
        currentSelected++;
        if (currentSelected >= slides.length) {
            currentSelected = 0;
        }
        slides[currentSelected].set();
    }
    
    const goback = ()=>{
        currentSelected--;
        if (currentSelected < 0) {
            currentSelected = slides.length-1;
        }
        slides[currentSelected].set();
    }

    //Fill the controls with buttons
    for (let i = 0; i < foundSlides.length; i++) {
        const current = i;
        const slide = foundSlides[i];

        const dot = document.createElement('span');
        let selectFn = () => {
            //Hide other slides
            for (let other of slides) {
                other.slide.classList.remove("active");
                other.dot.classList.remove("active");
            }
            //Show this slide
            slide.classList.add("active");
            dot.classList.add("active");
            currentSelected = current;
        };

        dot.setAttribute("class", "dot");
        dot.addEventListener("click", () => { 
            selectFn();
            pauseAutoscroll();
        });
        controlBox.appendChild(dot);

        //Add indexable data to arrays
        slides.push({
            set: selectFn,
            dot: dot,
            slide
        });
    }
    //Set first slide active by default
    slides[currentSelected].set();
    //Add controls to slideshow
    show.appendChild(controlBox);

    //Make left button
    const leftButton = document.createElement('a');
    leftButton.setAttribute("class", "prev");
    leftButton.addEventListener("click", () => { 
        goback();
        pauseAutoscroll();
    });
    leftButton.innerHTML = "&#10094";
    show.appendChild(leftButton);
    
    //Make right button
    const rightButton = document.createElement('a');
    rightButton.setAttribute("class", "next");
    rightButton.addEventListener("click", () => { 
        advance();
        pauseAutoscroll();
    });
    rightButton.innerHTML = "&#10095";
    show.appendChild(rightButton);
    
    //Start autoscroll
    setInterval(() => {
        //Run this every 3 seconds
        if (autoscroll) {
            console.log("Autoscroll");
            advance();
        }
    }, 5000);
}

/*
  <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
  <a class="next" onclick="plusSlides(1)">&#10095;</a>
*/