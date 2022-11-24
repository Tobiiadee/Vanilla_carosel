//getboundingclientrect
const track = document.querySelector('.carousel_track');
const slides = Array.from(track.children);

//  console.log(track);

//btn for clicking left and right
const nextButton = document.querySelector('.btn-right');
const previousButton = document.querySelector('.btn-left');

//nav-indicator btns
const dotNav = document.querySelector('.carousel_nav');
const dots = Array.from(dotNav.children);




//Size of the track
const slideSize = slides[0].getBoundingClientRect();

const slideWidth = slideSize.width;

//Arrange the slides next to each other
// slides[0].style.left = 0;
// slides[1].style.left = slideWidth + 'px';
// slides[2].style.left = slideWidth * 2 + 'px';

//Better way using a loop
// slides.forEach((slide, index) => {
//     slide.style.left = slideWidth * index + 'px';
// });

//Using a function for arranging slides next to each other
const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px'; 
}

slides.forEach(setSlidePosition);

const updateDot = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
}
const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left +' )';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide'); 
}

const hideShowArrows = (slides, previousButton, nextButton, targetIndex) => {
    if (targetIndex === 0) {
        previousButton.classList.add('hidden');
        nextButton.classList.remove('hidden');
    } else if (targetIndex === slides.length - 1) {
        console.log('working');
        previousButton.classList.remove('hidden');
        nextButton.classList.add('hidden');
    } else {
        previousButton.classList.remove('hidden');
        nextButton.classList.remove('hidden');
    }
}
//btn for clicking right
nextButton.addEventListener('click', e => {
    const currentSlide =  track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;

    const currentDot = dotNav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex((slide) => slide === nextSlide);
    moveToSlide(track, currentSlide, nextSlide);
    updateDot(currentDot, nextDot);
     
    hideShowArrows(slides, previousButton, nextButton, nextIndex);
});

//btn for clicking left
previousButton. addEventListener('click', (e) => {
    const currentSlide = track.querySelector('.current-slide');
    const previousSlide = currentSlide.previousElementSibling;

    const currentDot = dotNav.querySelector('.current-slide');
    const previousDot = currentDot.previousElementSibling;
    const previousIndex = slides.findIndex((slide) => slide === previousSlide);

    moveToSlide(track, currentSlide, previousSlide);
    updateDot(currentDot, previousDot);

    hideShowArrows(slides, previousButton, nextButton, previousIndex);
});

//navigation for the dots
dotNav.addEventListener('click', (e) => {
    //what indicator was clicked on
    const targetDot = e.target.closest('button');

    if (!targetDot) return;

    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotNav.querySelector('.current-slide');
    const targetIndex = dots.findIndex((dot) => dot === targetDot);

    const targetSlide = slides[targetIndex];
    console.log(targetIndex);

    moveToSlide(track, currentSlide, targetSlide);
    updateDot(currentDot, targetDot);

    hideShowArrows(slides, previousButton, nextButton, targetIndex);
});

// console.log(slides.length);
