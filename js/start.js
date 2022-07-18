let slideIndex = 1;
showSlides(slideIndex);
let slidesIndex=0;
showSlidess();
function plusSlides(n) {
  showSlides(slideIndex += n);
}
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("showslide");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  
}
function showSlidess(n) {
    let i;
    let slidess = document.getElementsByClassName("showslide");
    let dotss = document.getElementsByClassName("dot");
   
    if (n < 1) {slidesIndex = slidess.length}
    for (i = 0; i < slidess.length; i++) {
      slidess[i].style.display = "none";
    }
    slidesIndex++;
    if ( slidesIndex> slidess.length) {slidesIndex = 1}
    for (i = 0; i < dotss.length; i++) {
      dotss[i].className = dotss[i].className.replace(" active", "");
    }
    slidess[slidesIndex-1].style.display = "block";
    dotss[slidesIndex-1].className += " active";
    setTimeout(showSlidess,3000);
  }
  //--------------------------------------------//

  const icontheodoi=document.getElementById('icon_theodoi');
  const iconp1=document.querySelector('p1');
  const iconp=document.querySelector('#iconp');
  const left=document.querySelector('.l');
  const follow=document.querySelector('.follow')
  function trai(){
   /* icontheodoi.style.display="none";
    iconp1.style.display="block";
    iconp.style.display="none";*/
    left.classList.toggle('active');
    iconp.classList.toggle('active')
    iconp1.classList.toggle('active');
    icontheodoi.classList.toggle('active');
    follow.classList.toggle('active');
  }
