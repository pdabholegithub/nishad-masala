// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    
    // Dynamic Year in Footer
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Animate hamburger to X
            const bars = mobileMenu.querySelectorAll('.bar');
            if (mobileMenu.classList.contains('active')) {
                bars[0].style.transform = 'translateY(8px) rotate(45deg)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'translateY(-8px) rotate(-45deg)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    }

    // Close Menu on Link Click
    const navLinks = document.querySelectorAll('.nav-links, .nav-btn');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                mobileMenu.click(); // Trigger close animation
            }
        });
    });

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '0.5rem 2rem';
            navbar.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        } else {
            navbar.style.padding = '1rem 2rem';
            navbar.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
        }
        
        // Update active link on scroll
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Form Submission routed to WhatsApp
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            const waText = `Hello Nishad Enterprises!\n\nMy name is ${name}.\nEmail: ${email}\n\nMessage: ${message}`;
            const encodedText = encodeURIComponent(waText);
            const waUrl = `https://wa.me/917020908516?text=${encodedText}`;
            
            window.open(waUrl, '_blank');
            
            const btn = form.querySelector('button');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<i class="fab fa-whatsapp"></i> Redirecting to WhatsApp...';
            btn.style.background = '#25D366'; // WhatsApp Green
            btn.style.border = 'none';
            btn.style.opacity = '1';
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.style.border = '';
                form.reset();
            }, 3000);
        });
    }

    // Testimonial Slider
    const reviewsWrapper = document.getElementById('reviewsWrapper');
    const prevBtn = document.getElementById('prevReview');
    const nextBtn = document.getElementById('nextReview');
    const dotsContainer = document.getElementById('sliderDots');

    if (reviewsWrapper && prevBtn && nextBtn) {
        let scrollAmount = 0;
        let isHovered = false;
        let autoSlideInterval;
        
        const updateScrollAmount = () => {
             const reviewBox = reviewsWrapper.querySelector('.review-box');
             if(reviewBox) {
                scrollAmount = reviewBox.offsetWidth + 32; 
             }
        };

        const generateDots = () => {
            if(!dotsContainer) return;
            dotsContainer.innerHTML = '';
            const totalSlides = reviewsWrapper.querySelectorAll('.review-box').length;
            
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    updateScrollAmount();
                    reviewsWrapper.scrollTo({
                        left: scrollAmount * i,
                        behavior: 'smooth'
                    });
                    resetAutoSlide();
                });
                dotsContainer.appendChild(dot);
            }
        };

        generateDots();

        reviewsWrapper.addEventListener('scroll', () => {
            if(!dotsContainer) return;
            updateScrollAmount();
            if(scrollAmount === 0) return;
            const index = Math.round(reviewsWrapper.scrollLeft / scrollAmount);
            const dots = dotsContainer.querySelectorAll('.dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        });

        const nextSlide = () => {
            updateScrollAmount();
            if (reviewsWrapper.scrollLeft + reviewsWrapper.clientWidth >= reviewsWrapper.scrollWidth - 10) {
                reviewsWrapper.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                reviewsWrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        };

        const prevSlide = () => {
            updateScrollAmount();
            reviewsWrapper.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        };

        const startAutoSlide = () => {
            if(!isHovered) {
                autoSlideInterval = setInterval(nextSlide, 3500); // 3.5s for dynamic flow
            }
        };

        const resetAutoSlide = () => {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        };

        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoSlide();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoSlide();
        });
        
        // Pause auto slide on hover and touch
        reviewsWrapper.addEventListener('mouseenter', () => {
            isHovered = true;
            clearInterval(autoSlideInterval);
        });
        reviewsWrapper.addEventListener('mouseleave', () => {
            isHovered = false;
            startAutoSlide();
        });
        
        reviewsWrapper.addEventListener('touchstart', () => {
            isHovered = true;
            clearInterval(autoSlideInterval);
        });
        reviewsWrapper.addEventListener('touchend', () => {
            isHovered = false;
            startAutoSlide();
        });
        
        window.addEventListener('resize', updateScrollAmount);
        updateScrollAmount();
        startAutoSlide();
    }
});
