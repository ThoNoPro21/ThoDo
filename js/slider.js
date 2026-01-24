const slider = document.getElementById('sliderTrack');
const slides = document.querySelectorAll('.slide-card');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let currentIndex = 1;
let isTransitioning = false;
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

firstClone.id = 'first-clone';
lastClone.id = 'last-clone';
slider.insertBefore(lastClone, slider.firstElementChild);
slider.appendChild(firstClone);

const totalSlides = document.querySelectorAll('.slide-card').length;

slider.style.transform = `translateX(-${currentIndex * 100}%)`;

// Hàm chuyển slide
function goToSlide(index) {
    if (isTransitioning) return;
    isTransitioning = true;

    slider.style.transform = `translateX(-${index * 100}%)`;
}

// Next
function nextSlide() {
    currentIndex++;
    goToSlide(currentIndex);
}

// Prev
function prevSlide() {
    currentIndex--;
    goToSlide(currentIndex);
}

// Xử lý khi transition kết thúc → reset vị trí để tạo vòng lặp vô hạn
slider.addEventListener('transitionend', () => {
    if (document.querySelector('#first-clone') && currentIndex >= totalSlides - 1) {
        // Đến slide clone đầu → nhảy về slide 1 thật
        slider.style.transition = 'none';
        currentIndex = 1;
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    if (document.querySelector('#last-clone') && currentIndex <= 0) {
        // Đến slide clone cuối → nhảy về slide cuối thật
        slider.style.transition = 'none';
        currentIndex = totalSlides - 2;
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // Bật lại transition cho lần di chuyển sau
    setTimeout(() => {
        slider.style.transition = 'transform 0.5s ease';
        isTransitioning = false;
    }, 0);
});

// Sự kiện click
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Autoplay (tùy chọn)
let autoplay = setInterval(nextSlide, 3000);

// Dừng khi hover (tùy chọn)
// document.querySelector('.carousel').addEventListener('mouseenter', () => {
// clearInterval(autoplay);
// });
// document.querySelector('.carousel').addEventListener('mouseleave', () => {
// autoplay = setInterval(nextSlide, 2000);
// });