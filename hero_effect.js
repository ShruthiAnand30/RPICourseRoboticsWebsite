// ================================================
// HERO SLIDESHOW & SCROLL FADE
// ================================================

(function () {
    const slides = document.querySelectorAll('.hero-slide');
    let current = 0;

    function nextSlide() {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
    }

    setInterval(nextSlide, 5000);

    const heroBg = document.getElementById('hero-bg');

    function handleScroll() {
        const opacity = Math.max(0, 1 - window.scrollY / 400);
        heroBg.style.opacity = opacity;
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();
})();