/* ============================================================
   SCRIPT.JS — N3 BAC Website
   ============================================================ */

/* ---- Navbar: scroll glass effect ---- */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, { passive: true });

/* ---- Hamburger menu ---- */
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
    });
});

/* ---- Smooth Scroll ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

/* ---- Scroll-triggered animations (AOS-like) ---- */
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('[data-aos]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = el.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    el.classList.add('aos-visible');
                }, parseInt(delay, 10));
                observer.unobserve(el);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -48px 0px'
    });

    elements.forEach(el => observer.observe(el));
});

/* ---- Ripple effect on buttons ---- */
function addRipple(btn, e) {
    const ripple = document.createElement('span');
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px; height: ${size}px;
        left: ${e.clientX - rect.left - size / 2}px;
        top:  ${e.clientY - rect.top - size / 2}px;
        border-radius: 50%;
        background: rgba(255,255,255,0.4);
        transform: scale(0);
        animation: ripple .55s ease-out forwards;
        pointer-events: none;
    `;
    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 560);
}

/* Inject ripple keyframes */
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `@keyframes ripple { to { transform: scale(4); opacity: 0; } }`;
document.head.appendChild(rippleStyle);

document.querySelectorAll('.btn-primary, .btn-large, .btn-outline, .btn-white, .nav-cta').forEach(btn => {
    btn.addEventListener('click', function (e) { addRipple(this, e); });
});

/* ---- Parallax: hero floating images ---- */
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const floatImages = document.querySelectorAll('.float-img');
    const threshold = window.innerHeight;

    if (scrolled < threshold && floatImages.length > 0) {
        floatImages.forEach((img, index) => {
            const speed = 0.05 + (index * 0.02);
            img.style.transform += ` translateY(${scrolled * speed}px)`;
        });
    }
}, { passive: true });

/* ---- Floating images 3D tilt effect ---- */
document.querySelectorAll('.float-img').forEach(img => {
    img.addEventListener('mouseenter', function() {
        this.style.animationPlayState = 'paused';
    });
    
    img.addEventListener('mouseleave', function() {
        this.style.animationPlayState = 'running';
        this.style.transform = '';
    });
    
    // Smooth zoom effect on mouse move
    img.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (x - centerX) / 10;
        
        const isSingleLarge = this.classList.contains('single-large');
        const baseScale = isSingleLarge ? 1.6 : 1.18;
        const translateY = isSingleLarge ? -32 : -22;
        
        this.style.transform = `
            translateY(${translateY}px) 
            scale(${baseScale}) 
            rotateX(${-rotateX}deg) 
            rotateY(${rotateY}deg)
        `;
    });
});

/* ---- Size pill toggle (visual only) ---- */
document.querySelectorAll('.size-pills').forEach(group => {
    group.querySelectorAll('.size-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            const selectedSize = pill.getAttribute('data-size');
            const currentActive = group.querySelector('.size-pill--active');
            const currentSize = currentActive ? currentActive.getAttribute('data-size') : null;
            
            // Update active pill
            group.querySelectorAll('.size-pill').forEach(p => p.classList.remove('size-pill--active'));
            pill.classList.add('size-pill--active');
            
            // Change hero images if this is hero section
            const heroImages = document.getElementById('heroImages');
            if (heroImages && selectedSize && currentSize !== selectedSize) {
                changeHeroImages(selectedSize, parseInt(currentSize) < parseInt(selectedSize));
            }
        });
    });
});

/* ---- Hero image switcher with swipe animation ---- */
function changeHeroImages(size, isNext = true) {
    const heroImages = document.getElementById('heroImages');
    if (!heroImages) return;
    
    const images = heroImages.querySelectorAll('.float-img');
    const swipeOutClass = isNext ? 'swipe-out-left' : 'swipe-out-right';
    const swipeInClass = isNext ? 'swipe-in-right' : 'swipe-in-left';
    
    // Image sources based on size
    const imageSources = {
        '60': [
            'img/product-60ml.png'
        ],
        '100': [
            'img/product1.png',
            'img/product-100ml.png',
            'img/product2.png'
        ],
        '300': [
            'img/product-300ml.png'
        ]
    };
    
    // Animate out
    images.forEach(img => {
        img.classList.add(swipeOutClass);
    });
    
    // Wait for animation, then swap images and animate in
    setTimeout(() => {
        const sources = imageSources[size];
        
        if (size === '300' || size === '60') {
            // For 300ml and 60ml: show only 1 large image
            images.forEach((img, index) => {
                if (index === 0) {
                    img.src = sources[0];
                    img.setAttribute('data-size', size);
                    img.classList.remove(swipeOutClass);
                    img.classList.add(swipeInClass, 'single-large');
                    img.style.display = 'block';
                } else {
                    img.style.display = 'none';
                    img.classList.remove(swipeOutClass);
                }
            });
        } else {
            // For 100ml: show all 3 images
            images.forEach((img, index) => {
                img.style.display = 'block';
                img.src = sources[index];
                img.setAttribute('data-size', size);
                img.classList.remove(swipeOutClass, 'single-large');
                img.classList.add(swipeInClass);
            });
        }
        
        // Remove animation classes after animation completes
        setTimeout(() => {
            images.forEach(img => {
                img.classList.remove(swipeInClass);
            });
        }, 500);
    }, 500);
}

/* ---- Feature card active hover (for touch devices) ---- */
document.querySelectorAll('.feature-card, .bundle-card, .benefit-item').forEach(card => {
    card.addEventListener('touchstart', function () {
        this.style.transition = 'none';
    }, { passive: true });
    card.addEventListener('touchend', function () {
        this.style.transition = '';
    }, { passive: true });
});

/* ---- Page load fade-in ---- */
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    requestAnimationFrame(() => {
        document.body.style.transition = 'opacity .5s ease';
        document.body.style.opacity = '1';
    });
});
