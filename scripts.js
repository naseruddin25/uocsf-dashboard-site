/**
 * UOCSF - United Online Child Safety Foundation
 * Main JavaScript File
 * Handles navigation, animations, and interactive features
 */

(function() {
    'use strict';

    // ==================== DOM ELEMENTS ====================
    const header = document.querySelector('.site-header');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const allNavLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // ==================== MOBILE MENU ====================
    function initMobileMenu() {
        if (!mobileMenuToggle || !navLinks) return;

        mobileMenuToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active');
            document.body.style.overflow = !isExpanded ? 'hidden' : '';
        });

        // Close menu when clicking a link
        allNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ==================== HEADER SCROLL EFFECT ====================
    function initHeaderScroll() {
        if (!header) return;

        let lastScrollY = window.scrollY;
        let ticking = false;

        function updateHeader() {
            const scrollY = window.scrollY;
            
            if (scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScrollY = scrollY;
            ticking = false;
        }

        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(updateHeader);
                ticking = true;
            }
        });
    }

    // ==================== ACTIVE SECTION HIGHLIGHTING ====================
    function initActiveNavHighlight() {
        if (!sections.length || !allNavLinks.length) return;

        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -80% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    
                    allNavLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // ==================== SMOOTH SCROLL ====================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;

                const target = document.querySelector(href);
                if (!target) return;

                e.preventDefault();

                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            });
        });
    }

    // ==================== FADE IN ANIMATIONS ====================
    function initFadeInAnimations() {
        const fadeElements = document.querySelectorAll('.fade-in-up');
        if (!fadeElements.length) return;

        // Check if reduced motion is preferred
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            fadeElements.forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'none';
            });
            return;
        }

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        fadeElements.forEach(el => {
            el.style.animationPlayState = 'paused';
            observer.observe(el);
        });
    }

    // ==================== CONTACT FORM ====================
    function initContactForm() {
        const form = document.querySelector('.contact-form');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Basic form validation
            const name = form.querySelector('#contact-name');
            const email = form.querySelector('#contact-email');
            const subject = form.querySelector('#contact-subject');
            const message = form.querySelector('#contact-message');

            let isValid = true;

            // Simple validation
            [name, email, subject, message].forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = 'var(--color-error)';
                    isValid = false;
                } else {
                    field.style.borderColor = '';
                }
            });

            // Email validation
            if (email.value && !isValidEmail(email.value)) {
                email.style.borderColor = 'var(--color-error)';
                isValid = false;
            }

            if (isValid) {
                // Show success message (in production, this would submit to a server)
                const submitButton = form.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                
                submitButton.textContent = 'Message Sent!';
                submitButton.style.background = 'var(--color-success)';
                submitButton.disabled = true;

                // Reset form
                setTimeout(() => {
                    form.reset();
                    submitButton.textContent = originalText;
                    submitButton.style.background = '';
                    submitButton.disabled = false;
                }, 3000);
            }
        });

        // Clear error styling on input
        form.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('input', function() {
                this.style.borderColor = '';
            });
        });
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // ==================== COUNTER ANIMATION ====================
    function initCounterAnimation() {
        const statNumbers = document.querySelectorAll('.stat-number[data-count]');
        if (!statNumbers.length) return;

        // Check if reduced motion is preferred
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return; // Numbers are already displayed in HTML
        }

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const observer = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        statNumbers.forEach(number => {
            observer.observe(number);
        });
    }

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const suffix = element.textContent.replace(/[0-9,]/g, '');
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        function update() {
            current += step;
            if (current < target) {
                element.textContent = formatNumber(Math.floor(current)) + suffix;
                requestAnimationFrame(update);
            } else {
                element.textContent = formatNumber(target) + suffix;
            }
        }

        update();
    }

    function formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(0) + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(0) + 'K';
        }
        return num.toLocaleString();
    }

    // ==================== ACCESSIBILITY ENHANCEMENTS ====================
    function initAccessibility() {
        // Add keyboard support for cards and interactive elements
        const interactiveCards = document.querySelectorAll('.threat-card, .program-card, .resource-card, .involvement-card');
        
        interactiveCards.forEach(card => {
            const link = card.querySelector('a');
            if (link) {
                card.style.cursor = 'pointer';
                card.addEventListener('click', function(e) {
                    if (e.target.tagName !== 'A') {
                        link.click();
                    }
                });
            }
        });

        // Ensure focus is visible when using keyboard
        document.body.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-nav');
            }
        });

        document.body.addEventListener('mousedown', function() {
            document.body.classList.remove('keyboard-nav');
        });
    }

    // ==================== SCROLL TO TOP ON LOGO CLICK ====================
    function initLogoScroll() {
        const logos = document.querySelectorAll('.logo, .footer-logo');
        logos.forEach(logo => {
            logo.addEventListener('click', function(e) {
                if (this.getAttribute('href') === '#home') {
                    e.preventDefault();
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ==================== INITIALIZE ALL ====================
    function init() {
        initMobileMenu();
        initHeaderScroll();
        initActiveNavHighlight();
        initSmoothScroll();
        initFadeInAnimations();
        initContactForm();
        initCounterAnimation();
        initAccessibility();
        initLogoScroll();
    }

    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
