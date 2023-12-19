const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav-items");
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    nav.classList.toggle("active");
});

const newsletterBtn = document.querySelectorAll(".newsletter");
const modal = document.querySelector(".modal");
newsletterBtn.forEach(button => {
    button.addEventListener("click", () => {
        modal.classList.add("show");
    });
});

const close = document.querySelector(".close");
close.addEventListener("click", () => {
    modal.classList.remove("show");
});

const accordions = document.querySelectorAll(".accordions .title");
accordions.forEach(accordion => {
    accordion.addEventListener("click", event => {
        event.target.classList.toggle("active");
        event.target.nextElementSibling.classList.toggle("active");
    });
});

function updateCarousel() {
    const slideNum = window.innerWidth < 960 ? 1 : 3;

    const swiper = new Swiper(".mySwiper", {
        slidesPerView: slideNum,
        spaceBetween: 30,
        slidesPerGroup: slideNum,
        loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-next",
            prevEl: ".swiper-prev",
        },
    });
}
updateCarousel();
window.onresize = updateCarousel;