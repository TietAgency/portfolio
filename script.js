// ===== NAVIGATION TOGGLE ===== 
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelectorAll('.nav__link');

// Toggle mobile menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show-menu');
        navToggle.classList.toggle('active');
    });
}

// Close menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
        navToggle.classList.remove('active');
    });
});

// ===== HEADER SCROLL EFFECT ===== 
const header = document.getElementById('header');

function scrollHeader() {
    if (this.scrollY >= 50) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
}

window.addEventListener('scroll', scrollHeader);

// ===== ACTIVE LINK HIGHLIGHTING ===== 
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 150;
        const sectionId = current.getAttribute('id');
        const navLink = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active-link');
        } else {
            navLink?.classList.remove('active-link');
        }
    });
}

window.addEventListener('scroll', scrollActive);

// ===== SCROLL REVEAL ANIMATIONS ===== 
function animateOnScroll() {
    const animateElements = document.querySelectorAll('.behance__project, .servico__card, .cliente__item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', animateOnScroll);

// ===== SMOOTH SCROLLING FOR INTERNAL LINKS ===== 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});



// ===== PERFORMANCE OPTIMIZATIONS ===== 

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(scrollHeader, 10));
window.addEventListener('scroll', throttle(scrollActive, 10));

// ===== FORM INTERACTIONS (if needed in future) ===== 
function setupFormInteractions() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

document.addEventListener('DOMContentLoaded', setupFormInteractions);

// ===== PRELOAD CRITICAL RESOURCES ===== 
function preloadCriticalResources() {
    // Preload hero image
    const heroImg = new Image();
    heroImg.src = 'img/turma1.png';
    
    // Preload logo
    const logo = new Image();
    logo.src = 'img/logo.png';
}

document.addEventListener('DOMContentLoaded', preloadCriticalResources);

// ===== ACCESSIBILITY ENHANCEMENTS ===== 
function setupAccessibility() {
    // Add focus management for mobile menu
    const firstNavLink = document.querySelector('.nav__link');
    const lastNavLink = document.querySelector('.nav__link:last-child');
    
    if (navToggle && firstNavLink && lastNavLink) {
        navToggle.addEventListener('click', () => {
            if (navMenu.classList.contains('show-menu')) {
                setTimeout(() => firstNavLink.focus(), 100);
            }
        });
        
        // Trap focus in mobile menu
        lastNavLink.addEventListener('keydown', (e) => {
            if (e.key === 'Tab' && !e.shiftKey && navMenu.classList.contains('show-menu')) {
                e.preventDefault();
                firstNavLink.focus();
            }
        });
        
        firstNavLink.addEventListener('keydown', (e) => {
            if (e.key === 'Tab' && e.shiftKey && navMenu.classList.contains('show-menu')) {
                e.preventDefault();
                lastNavLink.focus();
            }
        });
    }
    
    // Add keyboard support for cards
    const interactiveCards = document.querySelectorAll('.behance__project, .servico__card');
    
    interactiveCards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', setupAccessibility);

// ===== ERROR HANDLING ===== 
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

// ===== MOBILE OPTIMIZATIONS ===== 
function setupMobileOptimizations() {
    // Prevent zoom on input focus (iOS)
    const meta = document.querySelector('meta[name="viewport"]');
    if (meta && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        meta.setAttribute('content', 
            'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
        );
    }
    
    // Optimize touch events
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
}

document.addEventListener('DOMContentLoaded', setupMobileOptimizations);

// ===== LOADING PERFORMANCE ===== 
function setupLoadingOptimizations() {
    // Mark when page is fully loaded
    window.addEventListener('load', () => {
        document.body.classList.add('page-loaded');
        
        // Optional: Remove loading states or show animations
        const loadingElements = document.querySelectorAll('[data-loading]');
        loadingElements.forEach(element => {
            element.removeAttribute('data-loading');
        });
    });
    
    // Service Worker registration (for future PWA features)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            // navigator.serviceWorker.register('/sw.js');
        });
    }
}

document.addEventListener('DOMContentLoaded', setupLoadingOptimizations);

// ===== ANALYTICS AND TRACKING (placeholder) ===== 
function setupAnalytics() {
    // Track section views
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionName = entry.target.id || 'unknown';
                console.log(`Section viewed: ${sectionName}`);
                // Here you would send to your analytics service
                // analytics.track('section_view', { section: sectionName });
            }
        });
    }, {
        threshold: 0.5
    });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Track button clicks
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const buttonText = e.target.textContent.trim();
            console.log(`Button clicked: ${buttonText}`);
            // analytics.track('button_click', { button: buttonText });
        });
    });
}

document.addEventListener('DOMContentLoaded', setupAnalytics);

// ===== WHATSAPP FLOATING BUTTON ===== 
function setupWhatsAppButton() {
    const whatsappFloat = document.getElementById('whatsapp-float');
    const whatsappBtn = whatsappFloat?.querySelector('.whatsapp-btn');
    
    if (!whatsappFloat || !whatsappBtn) return;
    
    // Show/hide based on scroll position
    function toggleWhatsAppVisibility() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 300) {
            whatsappFloat.style.opacity = '1';
            whatsappFloat.style.visibility = 'visible';
        } else {
            whatsappFloat.style.opacity = '0';
            whatsappFloat.style.visibility = 'hidden';
        }
    }
    
    // Initial state
    whatsappFloat.style.opacity = '0';
    whatsappFloat.style.visibility = 'hidden';
    whatsappFloat.style.transition = 'all 0.3s ease';
    
    // Add scroll listener
    window.addEventListener('scroll', throttle(toggleWhatsAppVisibility, 100));
    
    // Track clicks
    whatsappBtn.addEventListener('click', () => {
        console.log('WhatsApp button clicked');
        // analytics.track('whatsapp_click', { source: 'floating_button' });
    });
    
    // Add hover effect enhancement
    whatsappBtn.addEventListener('mouseenter', () => {
        whatsappBtn.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    whatsappBtn.addEventListener('mouseleave', () => {
        whatsappBtn.style.transform = '';
    });
}

document.addEventListener('DOMContentLoaded', setupWhatsAppButton);

// ===== CTA TRACKING ===== 
function setupCTATracking() {
    const ctaButtons = document.querySelectorAll('.section__cta .btn');
    
    ctaButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const sectionName = button.closest('section')?.id || 'unknown';
            console.log(`CTA clicked in section: ${sectionName}`);
            // analytics.track('cta_click', { 
            //     section: sectionName, 
            //     button_text: button.textContent.trim() 
            // });
        });
    });
    
    // Track footer contact clicks
    const contactLinks = document.querySelectorAll('.contact__link');
    contactLinks.forEach(link => {
        link.addEventListener('click', () => {
            const contactType = link.href.includes('mailto:') ? 'email' : 'whatsapp';
            console.log(`Contact clicked: ${contactType}`);
            // analytics.track('contact_click', { type: contactType });
        });
    });
}

document.addEventListener('DOMContentLoaded', setupCTATracking);

// ===== MENTORIA CAROUSEL ===== 
function setupMentoriaCarousel() {
    const carousel = document.getElementById('mentoria-carousel');
    const slides = document.querySelectorAll('.mentoria__slide');
    const dots = document.querySelectorAll('.carousel__dot');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    
    if (!carousel || slides.length === 0) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoSlideInterval;
    let isPaused = false;
    
    function updateSlide(newIndex) {
        // Remove active class from current slide and dot
        slides[currentSlide].classList.remove('active');
        dots[currentSlide]?.classList.remove('active');
        
        // Update current slide index
        currentSlide = newIndex;
        
        // Add active class to new slide and dot
        slides[currentSlide].classList.add('active');
        dots[currentSlide]?.classList.add('active');
        
        // Track slide view
        console.log(`Mentoria slide ${currentSlide + 1} viewed`);
    }
    
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % totalSlides;
        updateSlide(nextIndex);
    }
    
    function prevSlide() {
        const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlide(prevIndex);
    }
    
    function startAutoSlide() {
        if (!isPaused) {
            autoSlideInterval = setInterval(nextSlide, 6000); // 6 seconds
        }
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    function pauseAutoSlide() {
        isPaused = true;
        stopAutoSlide();
    }
    
    function resumeAutoSlide() {
        isPaused = false;
        startAutoSlide();
    }
    
    // Event listeners
    nextBtn?.addEventListener('click', () => {
        nextSlide();
        pauseAutoSlide();
        setTimeout(resumeAutoSlide, 12000); // Resume after 12 seconds
    });
    
    prevBtn?.addEventListener('click', () => {
        prevSlide();
        pauseAutoSlide();
        setTimeout(resumeAutoSlide, 12000); // Resume after 12 seconds
    });
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            updateSlide(index);
            pauseAutoSlide();
            setTimeout(resumeAutoSlide, 12000); // Resume after 12 seconds
        });
    });
    
    // Pause on hover
    carousel.addEventListener('mouseenter', pauseAutoSlide);
    carousel.addEventListener('mouseleave', resumeAutoSlide);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            pauseAutoSlide();
            setTimeout(resumeAutoSlide, 12000);
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            pauseAutoSlide();
            setTimeout(resumeAutoSlide, 12000);
        }
    });
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide(); // Swipe left, go to next
            } else {
                prevSlide(); // Swipe right, go to previous
            }
            pauseAutoSlide();
            setTimeout(resumeAutoSlide, 12000);
        }
    }
    
    // Initialize auto-slide
    startAutoSlide();
    
    // Pause when page is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            pauseAutoSlide();
        } else {
            resumeAutoSlide();
        }
    });
}

document.addEventListener('DOMContentLoaded', setupMentoriaCarousel);

// ===== PRELOAD CAROUSEL IMAGES ===== 
function preloadCarouselImages() {
    const slideImages = document.querySelectorAll('.mentoria__image');
    
    slideImages.forEach((img, index) => {
        if (index > 0) { // Skip first image as it's already loading
            const preloadImg = new Image();
            preloadImg.src = img.src;
        }
    });
}

document.addEventListener('DOMContentLoaded', preloadCarouselImages); 