/* ============================================================
   SCRIPT.JS — N3 BAC Website
   ============================================================ */

/* ---- Navbar: scroll glass effect ---- */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navBackdrop = document.getElementById('navBackdrop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, { passive: true });

/* ---- Hamburger menu ---- */
function closeMenu() {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    if (navBackdrop) navBackdrop.classList.remove('open');
}

hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open');
    if (navBackdrop) navBackdrop.classList.toggle('open', isOpen);
});

// Close menu when backdrop is clicked
if (navBackdrop) {
    navBackdrop.addEventListener('click', closeMenu);
}

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
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

/* ---- Parallax: hero floating images (disabled for new animation) ---- */
// Parallax effect removed for cleaner product switcher animation

/* ---- Floating images 3D tilt effect ---- */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize first product with floating animation
    const firstProduct = document.querySelector('.float-img.hero-product');
    if (firstProduct) {
        firstProduct.classList.add('active');
        setTimeout(() => {
            firstProduct.classList.remove('active');
            firstProduct.classList.add('floating');
        }, 800);
    }

    // 3D tilt effect on hover
    document.addEventListener('mousemove', (e) => {
        const heroProduct = document.querySelector('.float-img.hero-product.floating');
        if (!heroProduct) return;

        const rect = heroProduct.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Check if mouse is over the product
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * 5;
            const rotateY = ((x - centerX) / centerX) * 5;

            heroProduct.style.setProperty('--tilt-x', `${-rotateX}deg`);
            heroProduct.style.setProperty('--tilt-y', `${rotateY}deg`);
        }
    });
});

/* ---- Size pill toggle with smooth product switcher ---- */
const productData = {
    '60': {
        image: 'img/product-60ml.png',
        name: '60 ML',
        desc: 'Ukuran travel & emergency'
    },
    '100': {
        image: 'img/product-100ml.png',
        name: '100 ML',
        desc: 'Ukuran praktis untuk keluarga'
    },
    '300': {
        image: 'img/product-300ml.png',
        name: '300 ML',
        desc: 'Ukuran ekonomis & hemat'
    }
};

let currentSize = '100';
let isAnimating = false;

document.querySelectorAll('.size-pills').forEach(group => {
    group.querySelectorAll('.size-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            const selectedSize = pill.getAttribute('data-size');

            if (!selectedSize || selectedSize === currentSize || isAnimating) {
                return;
            }

            // Update active pill
            group.querySelectorAll('.size-pill').forEach(p => p.classList.remove('size-pill--active'));
            pill.classList.add('size-pill--active');

            // Update currentSize dulu supaya perubahan berikutnya tidak ikut ter-block
            // (mis. kondisi parsing > isAnimating tidak selaras di beberapa device touch)
            const oldSize = currentSize;
            currentSize = selectedSize;

            // Change hero product if in hero section
            const heroImages = document.getElementById('heroImages');
            const mobileHeroImg = document.getElementById('mobileHeroImg');
            if (heroImages) {
                changeHeroProduct(selectedSize, parseInt(selectedSize) > parseInt(oldSize));
            }

            // Update mobile-only image (middle, between size pills and CTA)
            if (mobileHeroImg && productData[selectedSize]) {
                mobileHeroImg.classList.remove('mobile-enter');
                mobileHeroImg.classList.add('mobile-exit');

                setTimeout(() => {
                    mobileHeroImg.src = productData[selectedSize].image;
                    mobileHeroImg.alt = `N3 BAC ${productData[selectedSize].name}`;
                    mobileHeroImg.classList.remove('mobile-exit');
                    mobileHeroImg.classList.add('mobile-enter');
                }, 500);
            }

        });
    });
});

/* ---- Hero product switcher with smooth zoom animation ---- */
function changeHeroProduct(newSize, isNext = true) {
    const container = document.getElementById('heroImages');
    const infoContainer = document.getElementById('productInfo');

    if (!container || isAnimating) return;

    isAnimating = true;
    const currentImg = container.querySelector('.float-img.hero-product.floating');
    const data = productData[newSize];

    if (!currentImg || !data) {
        isAnimating = false;
        return;
    }

    // Stop floating animation and start exit animation
    currentImg.classList.remove('floating');
    currentImg.classList.add('exit');

    // Update info badge with smooth fade
    if (infoContainer) {
        infoContainer.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        infoContainer.style.opacity = '0';
        infoContainer.style.transform = 'translateY(15px) scale(0.95)';

        setTimeout(() => {
            infoContainer.querySelector('.info-badge').textContent = data.name;
            infoContainer.querySelector('.info-desc').textContent = data.desc;
            infoContainer.style.opacity = '1';
            infoContainer.style.transform = 'translateY(0) scale(1)';
        }, 320);
    }

    // Create new image element
    const newImg = document.createElement('img');
    newImg.src = data.image;
    newImg.alt = `N3 BAC ${data.name}`;
    newImg.className = 'float-img hero-product';
    newImg.setAttribute('data-size', newSize);

    // Add to container (hidden initially)
    container.appendChild(newImg);

    // Remove old image after swipe out animation completes
    setTimeout(() => {
        if (currentImg && currentImg.parentNode) {
            currentImg.remove();
        }
    }, 750);

    // Start swipe in animation immediately
    requestAnimationFrame(() => {
        newImg.classList.add('active');

        // Fallback: always reset after max animation duration
        const fallbackTimer = setTimeout(() => {
            newImg.classList.remove('active');
            newImg.classList.add('floating');
            isAnimating = false;
        }, 1000);

        // Prefer animationend event (fires earlier if animation completes)
        const handleAnimationEnd = () => {
            clearTimeout(fallbackTimer);
            newImg.removeEventListener('animationend', handleAnimationEnd);
            newImg.removeEventListener('webkitAnimationEnd', handleAnimationEnd);
            newImg.classList.remove('active');
            newImg.classList.add('floating');
            isAnimating = false;
        };

        newImg.addEventListener('animationend', handleAnimationEnd, { once: true });
        newImg.addEventListener('webkitAnimationEnd', handleAnimationEnd, { once: true });
    });
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

/* ============================================================
   TESTIMONIAL CAROUSEL — Infinite auto-scroll with pause on hover/touch
   ============================================================ */
(function () {
    const wrapper = document.getElementById('testiCarouselWrapper');
    const track = document.getElementById('testiTrack');
    if (!wrapper || !track) return;

    /* 1. Duplicate cards to create seamless infinite loop */
    const originalCards = Array.from(track.children);
    originalCards.forEach(card => {
        const clone = card.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
    });

    /* Re-create lucide icons in clones */
    lucide.createIcons();

    /* 2. Pause and resume animation play state */
    const pause = () => {
        track.style.animationPlayState = 'paused';
    };

    const resume = () => {
        track.style.animationPlayState = 'running';
    };

    // Desktop hover pause
    wrapper.addEventListener('mouseenter', pause);
    wrapper.addEventListener('mouseleave', resume);

    // Mobile touch pause
    wrapper.addEventListener('touchstart', pause, { passive: true });
    wrapper.addEventListener('touchend', resume, { passive: true });
    wrapper.addEventListener('touchcancel', resume, { passive: true });
})();

/* ---- Mobile Hero Image 3D Touch-Tilt ---- */
document.addEventListener('DOMContentLoaded', () => {
    const mobileImg = document.getElementById('mobileHeroImg');
    if (!mobileImg) return;

    mobileImg.addEventListener('touchstart', (e) => {
        mobileImg.style.transition = 'transform 0.15s ease-out, filter 0.15s ease-out';
        mobileImg.classList.add('paused-float');
    }, { passive: true });

    mobileImg.addEventListener('touchmove', (e) => {
        if (e.touches.length === 0) return;
        const touch = e.touches[0];
        const rect = mobileImg.getBoundingClientRect();

        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const maxTilt = 15;
        const rotateX = ((y - centerY) / centerY) * -maxTilt;
        const rotateY = ((x - centerX) / centerX) * maxTilt;

        mobileImg.style.transform = `scale(1.08) perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        mobileImg.style.filter = 'drop-shadow(0 20px 40px rgba(0, 180, 216, 0.6))';
    }, { passive: true });

    mobileImg.addEventListener('touchend', () => {
        mobileImg.style.transition = 'transform 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.45s ease';
        mobileImg.style.transform = 'scale(1) rotateX(0deg) rotateY(0deg)';
        mobileImg.style.filter = '';

        setTimeout(() => {
            mobileImg.classList.remove('paused-float');
            mobileImg.style.transition = '';
        }, 450);
    }, { passive: true });
});
