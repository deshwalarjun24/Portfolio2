// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Typing animation for the hero section
const typingText = document.querySelector('.typing-text');
const words = ['Crafting immersive gaming experiences', 'Building virtual worlds', 'Creating memorable gameplay'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(type, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 100 : 200);
    }
}

// Start typing animation when the page loads
window.addEventListener('load', type);

// Navbar scroll effect
const nav = document.querySelector('.game-nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        nav.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
        nav.classList.remove('scroll-up');
        nav.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
        nav.classList.remove('scroll-down');
        nav.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Mobile menu functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

// Toggle menu when clicking hamburger
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when clicking a link
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Close menu when scrolling
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
    lastScrollTop = scrollTop;
});

// Project cards hover effect
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.querySelector('.project-overlay').style.opacity = '1';
    });
    
    card.addEventListener('mouseleave', () => {
        card.querySelector('.project-overlay').style.opacity = '0';
    });
});

// Scroll reveal animation
const scrollReveal = () => {
    const elements = document.querySelectorAll('.section-title, .about-content, .project-card, .skill-category, .contact-content');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('reveal');
        }
    });
};

window.addEventListener('scroll', scrollReveal);
scrollReveal(); // Initial check

// Add reveal class to elements
document.querySelectorAll('.section-title, .about-content, .project-card, .skill-category, .contact-content').forEach(element => {
    element.classList.add('scroll-reveal');
});

// Add scroll reveal animations
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight * 0.75) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
});

// Updated contact form function to redirect to LinkedIn message
function sendToWhatsApp(event) {
    event.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validate inputs
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Create formatted message for LinkedIn
    const formattedMessage = encodeURIComponent(`Hello, I am ${name}\nEmail: ${email}\n\n${message}`);
    
    // LinkedIn messaging URL with pre-filled message
    const linkedInUrl = `https://www.linkedin.com/messaging/compose/?to=rahulwalia01&body=${formattedMessage}`;
    
    // Open LinkedIn message page in new tab
    window.open(linkedInUrl, '_blank');
    
    // Reset form
    document.getElementById('whatsappForm').reset();
}

// Loading Screen
document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    const loadingBar = document.querySelector('.loading-bar');
    const loadingPercentage = document.querySelector('.loading-percentage');
    const mainContent = document.querySelector('.game-container');
    
    // Check if not on index page/root
    const isIndexPage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/') || window.location.pathname === '';
    
    if (!isIndexPage) {
        loadingScreen.style.display = 'none';
        mainContent.style.opacity = '1';
        return;
    }
    
    // Check if coming from an internal page (like projects.html)
    if (document.referrer && document.referrer.includes(window.location.host)) {
        loadingScreen.style.display = 'none';
        mainContent.style.opacity = '1';
        return;
    }
    
    // Show loading screen for direct access or refresh
    mainContent.style.opacity = '0';
    
    let progress = 0;
    const loadingDuration = 3000; // 3 seconds
    const interval = 30; // Update every 30ms
    const steps = loadingDuration / interval;
    const increment = 100 / steps;
    
    const loadingInterval = setInterval(() => {
        progress = Math.min(progress + increment, 100);
        loadingBar.style.width = `${progress}%`;
        loadingPercentage.textContent = `${Math.round(progress)}%`;
        
        if (progress >= 100) {
            clearInterval(loadingInterval);
            loadingScreen.classList.add('fade-out');
            mainContent.style.opacity = '1';
            
            // Remove loading screen from DOM after fade out
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, interval);
});

// Image Slider Functionality
function initImageSlider() {
    const sliders = document.querySelectorAll('.image-slider');
    
    sliders.forEach(slider => {
        const images = slider.querySelectorAll('.slider-image');
        const prevBtn = slider.querySelector('.prev');
        const nextBtn = slider.querySelector('.next');
        const dotsContainer = slider.querySelector('.slider-dots');
        
        let currentIndex = 0;
        
        // Create dots
        images.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        const dots = dotsContainer.querySelectorAll('.slider-dot');
        
        function updateSlider() {
            // Remove active class from all images and dots
            images.forEach((img, idx) => {
                img.classList.remove('active');
                dots[idx].classList.remove('active');
            });
            
            // Add active class to current image and dot
            images[currentIndex].classList.add('active');
            dots[currentIndex].classList.add('active');
        }
        
        function nextSlide() {
            currentIndex = (currentIndex + 1) % images.length;
            updateSlider();
        }
        
        function prevSlide() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateSlider();
        }
        
        function goToSlide(index) {
            currentIndex = index;
            updateSlider();
        }
        
        // Event listeners
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
        
        // Auto slide every 5 seconds
        let slideInterval = setInterval(nextSlide, 5000);
        
        // Pause auto-slide on hover
        slider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        slider.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 5000);
        });
        
        // Initialize first slide
        updateSlider();
    });
}

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', initImageSlider); 