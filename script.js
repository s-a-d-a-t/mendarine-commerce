document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        
        if (body.classList.contains('dark-theme')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });

    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            }
        });
    });
    
    // Header shadow on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.2)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
    
    // Intersection Observer for animations
    const faders = document.querySelectorAll('.fade-in-up');
    const appearOptions = {
        threshold: 0.3,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            appearOnScroll.unobserve(entry.target);
        });
    }, appearOptions);
    
    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
    
    // Hero typing animation
    const subheadingElement = document.getElementById('hero-subheading');
    const textToType = "Your Trusted Source for Quality & Style";
    let i = 0;
    const typingSpeed = 70;
    
    function typeWriter() {
        if (i < textToType.length) {
            subheadingElement.innerHTML += textToType.charAt(i);
            i++;
            setTimeout(typeWriter, typingSpeed);
        } else {
            document.querySelector('.cursor').style.display = 'none';
            animateHeroContent();
        }
    }
    
    function animateHeroContent() {
        const heroElements = document.querySelectorAll('.animate-hero-text, .animate-hero-btn');
        
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 500 + (index * 300));
        });
    }
    
    // Start the typing animation
    typeWriter();
    
    // Set active navigation based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Video play/pause functionality
    const video = document.querySelector('.hero-video');
    const playBtn = document.querySelector('.video-play-btn');

    if (video && playBtn) {
        playBtn.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                video.pause();
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        });

        // Update button icon if video state changes (e.g., by user controls)
        video.addEventListener('play', () => {
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        });

        video.addEventListener('pause', () => {
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        });
    }

    // Product Detail Modal functionality
    const productDetailModal = document.getElementById('productDetailModal');
    const closeProductDetailModalBtn = document.getElementById('closeProductDetailModal');
    const productDetailContent = document.getElementById('productDetailContent');

    function openModal(modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent scrolling background
    }

    function closeModal(modal) {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
    }

    if (closeProductDetailModalBtn) {
        closeProductDetailModalBtn.addEventListener('click', () => closeModal(productDetailModal));
    }

    window.addEventListener('click', (event) => {
        if (event.target === productDetailModal) {
            closeModal(productDetailModal);
        }
    });

    // Function to open product detail modal
    function openProductDetail(product) {
        productDetailContent.innerHTML = `
            <div class="product-detail-header">
                <img src="${product.image}" alt="${product.title}" class="product-detail-image">
                <div class="product-detail-info">
                    <h2 class="product-detail-title">${product.title}</h2>
                    <p class="product-detail-description">${product.description}</p>
                    <a href="#contact" class="btn" style="margin-top: 30px;">Order Now</a>
                </div>
            </div>
        `;
        openModal(productDetailModal);
    }

    // Add click listeners to all product cards
    const productCards = document.querySelectorAll('.perfume-card, .sunglasses-card, .beauty-skincare-card');
    productCards.forEach(card => {
        card.addEventListener('click', () => {
            const product = {
                title: card.dataset.title,
                image: card.dataset.image,
                description: card.dataset.description
            };
            openProductDetail(product);
        });
    });
    
    // Add animation delays based on index
    document.querySelectorAll('.perfume-card, .sunglasses-card, .beauty-skincare-card, .area-badge').forEach((el, index) => {
        el.style.setProperty('--i', index);
    });
});