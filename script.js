       // JavaScript for animations and interactivity
       document.addEventListener('DOMContentLoaded', () => {
        // GSAP animations
        gsap.from('.hero h1', { opacity: 0, y: -50, duration: 1, ease: 'power3.out' });
        gsap.from('.hero p', { opacity: 0, y: 50, duration: 1, delay: 0.5, ease: 'power3.out' });
        gsap.from('.countdown', { opacity: 0, y: 50, duration: 1, delay: 1, ease: 'power3.out' });

        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

        // Countdown timer
        const countdownDate = new Date("2023-12-31T00:00:00").getTime();

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById("days").innerText = days.toString().padStart(2, '0');
            document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
            document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
            document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');

            if (distance < 0) {
                clearInterval(countdownTimer);
                document.querySelector(".countdown").innerHTML = "<h2>The party has started!</h2>";
            }
        }

        const countdownTimer = setInterval(updateCountdown, 1000);

        // Blog slider functionality
        const slider = document.querySelector('.slider');
        const slides = document.querySelectorAll('.slide');
        let currentIndex = 0;

        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider();
        }

        function updateSlider() {
            slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        setInterval(nextSlide, 5000); // Change slide every 5 seconds

        // Smooth scrolling for navigation
        document.querySelectorAll('nav a').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                window.scrollTo({
                    top: targetElement.offsetTop - 60,
                    behavior: 'smooth'
                });
            });
        });

        // Hamburger menu functionality
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const closeBtn = document.querySelector('.close-btn');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        closeBtn.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });

        document.querySelectorAll('.nav-menu li a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    });