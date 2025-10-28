// El Pacha Restaurant - Main JavaScript File
// Handles all interactions, animations, and form functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollAnimations();
    initTypewriter();
    initVideoGallery();
    initPhotoGallery();
    initReservationForm();
    initMenuNavigation();
    initContactForm();
    
    // Set minimum date for reservation form
    setMinimumDate();
});

// ==================== NAVIGATION ====================

function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Smooth scrolling for anchor links
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
}

// ==================== SCROLL ANIMATIONS ====================

function initScrollAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('.section, .gallery-section, .contact-section, .reservation-section').forEach(section => {
        observer.observe(section);
    });
    
    // Hero animations
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroDescription = document.querySelector('.hero-description');
        const heroButtons = document.querySelector('.hero-buttons');
        
        if (heroTitle) heroTitle.classList.add('fade-in');
        if (heroSubtitle) heroSubtitle.classList.add('fade-in');
        if (heroDescription) heroDescription.classList.add('fade-in');
        if (heroButtons) heroButtons.classList.add('fade-in');
    }, 500);
}

// ==================== TYPEWRITER EFFECT ====================

function initTypewriter() {
    const typedElement = document.getElementById('typed-text');
    if (typedElement && typeof Typed !== 'undefined') {
        new Typed('#typed-text', {
            strings: ['A Culinary Experience in Sousse'],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: false,
            showCursor: true,
            cursorChar: '|'
        });
    }
}

// ==================== VIDEO GALLERY ====================

function initVideoGallery() {
    const videoItems = document.querySelectorAll('.video-item');
    const modal = document.getElementById('videoModal');
    const modalClose = document.querySelector('.modal-close');
    
    if (!modal) return;
    
    videoItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            openVideoModal(index + 1);
        });
    });
    
    if (modalClose) {
        modalClose.addEventListener('click', closeVideoModal);
    }
    
    // Close modal on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeVideoModal();
        }
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeVideoModal();
        }
    });
}

function openVideoModal(videoNumber) {
    const modal = document.getElementById('videoModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Update modal content based on video number
        const modalContent = modal.querySelector('.modal-video');
        if (modalContent) {
            modalContent.innerHTML = `
                <div class="video-placeholder">
                    <div class="play-button">
                        <i class="fas fa-play"></i>
                    </div>
                    <h3>Video ${videoNumber}</h3>
                    <p>Video content would play here</p>
                    <p class="text-sm mt-2">This is a placeholder for video ${videoNumber}</p>
                </div>
            `;
        }
    }
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// ==================== PHOTO GALLERY ====================

function initPhotoGallery() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    
    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
    
    // Lightbox functionality
    if (lightbox) {
        initLightbox();
    }
}

function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDescription = document.getElementById('lightboxDescription');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    let currentImageIndex = 0;
    let images = [];
    
    // Collect all gallery images
    function updateImagesList() {
        images = Array.from(document.querySelectorAll('.gallery-item:not(.hidden)'));
    }
    
    // Open lightbox
    document.querySelectorAll('.gallery-item').forEach((item, index) => {
        item.addEventListener('click', function() {
            updateImagesList();
            const img = item.querySelector('.gallery-image');
            const title = item.getAttribute('data-title');
            const description = item.getAttribute('data-description');
            
            currentImageIndex = images.indexOf(item);
            showLightboxImage(img.src, title, description);
        });
    });
    
    // Close lightbox
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    // Navigation
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', showPrevImage);
    }
    
    if (lightboxNext) {
        lightboxNext.addEventListener('click', showNextImage);
    }
    
    // Close on background click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display === 'flex') {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    showPrevImage();
                    break;
                case 'ArrowRight':
                    showNextImage();
                    break;
            }
        }
    });
    
    function showLightboxImage(src, title, description) {
        if (lightboxImage) lightboxImage.src = src;
        if (lightboxTitle) lightboxTitle.textContent = title || '';
        if (lightboxDescription) lightboxDescription.textContent = description || '';
        
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        const item = images[currentImageIndex];
        const img = item.querySelector('.gallery-image');
        const title = item.getAttribute('data-title');
        const description = item.getAttribute('data-description');
        
        showLightboxImage(img.src, title, description);
    }
    
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        const item = images[currentImageIndex];
        const img = item.querySelector('.gallery-image');
        const title = item.getAttribute('data-title');
        const description = item.getAttribute('data-description');
        
        showLightboxImage(img.src, title, description);
    }
}

// ==================== RESERVATION FORM ====================

function initReservationForm() {
    // Only initialize if on reservation page
    if (!document.getElementById('reservationForm')) return;
    
    // Guest counter functionality
    window.increaseGuests = function() {
        const guestCount = document.getElementById('guestCount');
        const guestsInput = document.getElementById('guests');
        let count = parseInt(guestCount.textContent);
        if (count < 20) {
            count++;
            guestCount.textContent = count;
            guestsInput.value = count;
        }
    };
    
    window.decreaseGuests = function() {
        const guestCount = document.getElementById('guestCount');
        const guestsInput = document.getElementById('guests');
        let count = parseInt(guestCount.textContent);
        if (count > 1) {
            count--;
            guestCount.textContent = count;
            guestsInput.value = count;
        }
    };
    
    // Multi-step form navigation
    window.nextStep = function() {
        const currentStep = document.querySelector('.step.active');
        const currentFormStep = document.querySelector('.form-step.active');
        const nextStep = currentStep.nextElementSibling;
        const nextFormStep = currentFormStep.nextElementSibling;
        
        if (nextStep && nextFormStep) {
            // Validate current step
            if (!validateCurrentStep(currentFormStep)) {
                return;
            }
            
            // Update step indicators
            currentStep.classList.remove('active');
            currentStep.classList.add('completed');
            nextStep.classList.add('active');
            
            // Update form content
            currentFormStep.classList.remove('active');
            nextFormStep.classList.add('active');
            
            // Update confirmation details if on step 3
            if (nextFormStep.getAttribute('data-step') === '3') {
                updateConfirmationDetails();
            }
        }
    };
    
    window.prevStep = function() {
        const currentStep = document.querySelector('.step.active');
        const currentFormStep = document.querySelector('.form-step.active');
        const prevStep = currentStep.previousElementSibling;
        const prevFormStep = currentFormStep.previousElementSibling;
        
        if (prevStep && prevFormStep) {
            // Update step indicators
            currentStep.classList.remove('active');
            prevStep.classList.remove('completed');
            prevStep.classList.add('active');
            
            // Update form content
            currentFormStep.classList.remove('active');
            prevFormStep.classList.add('active');
        }
    };
    
    function validateCurrentStep(step) {
        const requiredFields = step.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = '#dc2626';
                isValid = false;
            } else {
                field.style.borderColor = '';
            }
        });
        
        if (!isValid) {
            showNotification('Please fill in all required fields', 'error');
        }
        
        return isValid;
    }
    
    function updateConfirmationDetails() {
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const guests = document.getElementById('guests').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const occasion = document.getElementById('occasion').value;
        const specialRequests = document.getElementById('specialRequests').value;
        
        // Update confirmation display
        document.getElementById('confirmName').textContent = `${firstName} ${lastName}`;
        document.getElementById('confirmEmail').textContent = email;
        document.getElementById('confirmPhone').textContent = phone;
        document.getElementById('confirmGuests').textContent = guests;
        document.getElementById('confirmDate').textContent = formatDate(date);
        document.getElementById('confirmTime').textContent = formatTime(time);
        document.getElementById('confirmOccasion').textContent = occasion || 'Not specified';
        
        const specialRequestsDiv = document.getElementById('confirmSpecialRequests');
        const requestsText = document.getElementById('confirmRequestsText');
        
        if (specialRequests.trim()) {
            requestsText.textContent = specialRequests;
            specialRequestsDiv.style.display = 'block';
        } else {
            specialRequestsDiv.style.display = 'none';
        }
    }
    
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    
    function formatTime(timeString) {
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
    }
    
    // Form submission
    document.getElementById('reservationForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show success message
        showNotification('Reservation submitted successfully! We will contact you shortly to confirm.', 'success');
        
        // Reset form after delay
        setTimeout(() => {
            this.reset();
            resetReservationForm();
        }, 2000);
    });
}

function setMinimumDate() {
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const minDate = tomorrow.toISOString().split('T')[0];
        dateInput.setAttribute('min', minDate);
    }
}

function resetReservationForm() {
    // Reset to first step
    const steps = document.querySelectorAll('.step');
    const formSteps = document.querySelectorAll('.form-step');
    
    steps.forEach(step => {
        step.classList.remove('active', 'completed');
    });
    
    formSteps.forEach(formStep => {
        formStep.classList.remove('active');
    });
    
    // Activate first step
    if (steps[0]) steps[0].classList.add('active');
    if (formSteps[0]) formSteps[0].classList.add('active');
    
    // Reset guest counter
    const guestCount = document.getElementById('guestCount');
    const guestsInput = document.getElementById('guests');
    if (guestCount) guestCount.textContent = '2';
    if (guestsInput) guestsInput.value = '2';
}

// ==================== MENU NAVIGATION ====================

function initMenuNavigation() {
    const menuNavItems = document.querySelectorAll('.menu-nav-item');
    
    menuNavItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Update active nav item
                menuNavItems.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
                
                // Smooth scroll to section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ==================== CONTACT FORM ====================

function initContactForm() {
    const contactForm = document.querySelector('.contact-form form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show success message
        showNotification('Message sent successfully! We will get back to you soon.', 'success');
        
        // Reset form
        this.reset();
    });
}

// ==================== UTILITY FUNCTIONS ====================

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transition-all duration-300 transform translate-x-full`;
    
    // Set notification style based on type
    switch(type) {
        case 'success':
            notification.classList.add('bg-green-500', 'text-white');
            break;
        case 'error':
            notification.classList.add('bg-red-500', 'text-white');
            break;
        default:
            notification.classList.add('bg-blue-500', 'text-white');
    }
    
    notification.innerHTML = `
        <div class="flex items-center">
            <div class="flex-1">
                <p class="text-sm font-medium">${message}</p>
            </div>
            <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// ==================== PERFORMANCE OPTIMIZATIONS ====================

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

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

// ==================== ERROR HANDLING ====================

// Global error handler
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Could send error to analytics service here
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    e.preventDefault();
});

// ==================== ACCESSIBILITY ====================

// Enhance focus visibility
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Add skip link for keyboard users
const skipLink = document.createElement('a');
skipLink.href = '#main-content';
skipLink.textContent = 'Skip to main content';
skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-primary-brown text-white p-2 z-50';
document.body.insertBefore(skipLink, document.body.firstChild);