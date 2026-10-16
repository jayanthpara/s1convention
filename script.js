// Runs after all HTML components have been loaded into index.html.
function initializeSite() {
    const policyDialog = document.getElementById('policyDialog');

    if (policyDialog) {
        const policyContents = policyDialog.querySelectorAll('[data-policy-content]');

        document.querySelectorAll('[data-policy-trigger]').forEach(trigger => {
            trigger.addEventListener('click', () => {
                const selectedPolicy = policyDialog.querySelector(
                    `[data-policy-content="${trigger.dataset.policyTrigger}"]`
                );

                if (!selectedPolicy) {
                    console.error(`Could not find policy content for "${trigger.dataset.policyTrigger}".`);
                    return;
                }

                policyContents.forEach(content => {
                    content.hidden = content !== selectedPolicy;
                });
                policyDialog.setAttribute(
                    'aria-labelledby',
                    selectedPolicy.querySelector('h2').id
                );
                policyDialog.showModal();
            });
        });

        policyDialog.addEventListener('click', event => {
            if (event.target === policyDialog) {
                policyDialog.close();
            }
        });

        policyDialog.querySelector('.policy-dialog-close').addEventListener('click', () => {
            policyDialog.close();
        });
    }

    // 1. Mobile Navigation Toggle
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    // 2. Navbar Background Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 10px 30px rgba(48, 41, 35, 0.08)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    // 3. Smooth Active Link Highlighting
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavOnScroll() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 150;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNavOnScroll);

    // 4. Reveal Animations on Scroll
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealElements = document.querySelectorAll('.category-item, .about-layout, .gallery-card, .stat-item, .cta-container');

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));


}




function initHeroSlideshow() {
    const slideshow = document.getElementById('heroSlideshow');
    const dotsContainer = document.getElementById('heroDots');
    const prevButton = document.getElementById('heroPrev');
    const nextButton = document.getElementById('heroNext');
    const pauseButton = document.getElementById('heroPause');

    if (!slideshow || !dotsContainer || !prevButton ||
        !nextButton || !pauseButton) {
        return;
    }

    const slides = Array.from(
        slideshow.querySelectorAll('.hero-slide')
    );

    if (!slides.length) return;

    let currentIndex = 0;
    let timer = null;
    let paused = false;
    const interval = 5000;

    dotsContainer.innerHTML = '';

    const dots = slides.map((slide, index) => {
        const dot = document.createElement('button');

        dot.type = 'button';
        dot.className = 'hero-dot';
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);

        dot.addEventListener('click', () => {
            showSlide(index);
            restartTimer();
        });

        dotsContainer.appendChild(dot);
        return dot;
    });

    function showSlide(index) {
        currentIndex = (index + slides.length) % slides.length;

        slides.forEach((slide, i) => {
            const active = i === currentIndex;
            slide.classList.toggle('active', active);
            slide.setAttribute('aria-hidden', String(!active));
            dots[i].classList.toggle('active', active);
            dots[i].setAttribute('aria-current', active ? 'true' : 'false');
        });
    }

    function stopTimer() {
        if (timer !== null) {
            clearInterval(timer);
            timer = null;
        }
    }

    function startTimer() {
        stopTimer();

        if (!paused) {
            timer = setInterval(() => {
                showSlide(currentIndex + 1);
            }, interval);
        }
    }

    function restartTimer() {
        startTimer();
    }

    prevButton.addEventListener('click', () => {
        showSlide(currentIndex - 1);
        restartTimer();
    });

    nextButton.addEventListener('click', () => {
        showSlide(currentIndex + 1);
        restartTimer();
    });

    pauseButton.addEventListener('click', () => {
        paused = !paused;
        pauseButton.textContent = paused ? '▶' : 'Ⅱ';
        pauseButton.setAttribute('aria-pressed', String(paused));
        pauseButton.setAttribute('aria-label', paused ? 'Play slideshow' : 'Pause slideshow');
        pauseButton.title = paused ? 'Play slideshow' : 'Pause slideshow';

        if (paused) {
            stopTimer();
        } else {
            startTimer();
        }
    });

    showSlide(0);
    startTimer();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroSlideshow);
} else {
    initHeroSlideshow();
}
    