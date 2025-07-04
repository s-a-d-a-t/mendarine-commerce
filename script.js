// Simple JavaScript for smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Get header height for offset, considering dynamic height
            const headerOffset = document.querySelector('header').offsetHeight; 
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header shadow on scroll and dynamic header height
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled'); // Add class for scrolled state
    } else {
        header.classList.remove('scrolled'); // Remove class
    }
});

// Intersection Observer for fade-in-up animation on scroll
const faders = document.querySelectorAll('.fade-in-up');

const appearOptions = {
    threshold: 0.3, // When 30% of the item is visible
    rootMargin: "0px 0px -50px 0px" // Start animation 50px before it reaches the bottom of the viewport
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('active');
            appearOnScroll.unobserve(entry.target); // Stop observing once animated
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

// Hero Section Typing Animation and Element Entry
document.addEventListener('DOMContentLoaded', () => {
    const subheadingElement = document.getElementById('hero-subheading');
    const textToType = "Your Trusted Source for Quality & Style";
    let i = 0;
    const typingSpeed = 70; // milliseconds per character

    function typeWriter() {
        if (i < textToType.length) {
            subheadingElement.innerHTML += textToType.charAt(i);
            subheadingElement.style.width = 'auto'; // Let width adjust during typing
            i++;
            setTimeout(typeWriter, typingSpeed);
        } else {
            // After typing, reset width to 100% to fill container for smooth animation
            subheadingElement.style.width = '100%'; 
            document.querySelector('.cursor').style.display = 'none'; // Hide cursor after typing
            animateHeroContent();
        }
    }

    function animateHeroContent() {
        const heroH1s = document.querySelectorAll('.hero h1.animate-hero-text');
        const heroP = document.querySelector('.hero p.animate-hero-text');
        const heroBtn = document.querySelector('.hero .btn.animate-hero-btn');

        // Animate first H1
        setTimeout(() => {
            if (heroH1s[0]) {
                heroH1s[0].style.transition = 'opacity 1s ease-out, transform 1s ease-out';
                heroH1s[0].style.opacity = '1';
                heroH1s[0].style.transform = 'translateY(0)';
            }
        }, 500); // Delay after subheading is done

        // Animate second H1
        setTimeout(() => {
            if (heroH1s[1]) {
                heroH1s[1].style.transition = 'opacity 1s ease-out, transform 1s ease-out';
                heroH1s[1].style.opacity = '1';
                heroH1s[1].style.transform = 'translateY(0)';
            }
        }, 1000); // Further delay

        // Animate paragraph
        setTimeout(() => {
            if (heroP) {
                heroP.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
                heroP.style.opacity = '1';
                heroP.style.transform = 'translateY(0)';
            }
        }, 1500); // Further delay

        // Animate button
        setTimeout(() => {
            if (heroBtn) {
                heroBtn.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
                heroBtn.style.opacity = '1';
                heroBtn.style.transform = 'translateY(0)';
            }
        }, 2000); // Further delay
    }

    typeWriter(); // Start the typing animation
});