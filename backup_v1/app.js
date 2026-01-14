// Dev Lahrani - Enhanced 3D Portfolio

// ============================================
// Canvas Background Animation with Mesh
// ============================================
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let scrollY = 0;

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Enhanced Particle class with physics
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8;
        this.opacity = Math.random() * 0.6 + 0.2;
        this.mass = this.size / 2;
        this.vx = this.speedX;
        this.vy = this.speedY;
    }

    update() {
        // Velocity
        this.x += this.vx;
        this.y += this.vy;

        // Gravity effect towards mouse
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 200) {
            const force = (200 - distance) / 200 * 0.015;
            this.vx += dx * force;
            this.vy += dy * force;
        }

        // Friction
        this.vx *= 0.995;
        this.vy *= 0.995;

        // Wrap around edges
        if (this.x > canvas.width + 50) this.x = -50;
        if (this.x < -50) this.x = canvas.width + 50;
        if (this.y > canvas.height + 50) this.y = -50;
        if (this.y < -50) this.y = canvas.height + 50;
    }

    draw() {
        const pulseOpacity = this.opacity * (0.7 + 0.3 * Math.sin(Date.now() * 0.003 + this.x));
        ctx.fillStyle = `rgba(99, 102, 241, ${pulseOpacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Initialize particles
function initParticles() {
    const particleCount = Math.min(120, Math.floor((canvas.width * canvas.height) / 8000));
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

initParticles();
window.addEventListener('resize', initParticles);

// Mouse tracking with smoothing
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Scroll tracking
window.addEventListener('scroll', () => {
    scrollY = window.pageYOffset;
});

// Animation loop with better rendering
function animate() {
    // Clear with fade
    ctx.fillStyle = 'rgba(2, 6, 23, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw connections with gradient
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                const opacity = (1 - distance / 150) * 0.2;
                ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }

    // Update and draw particles
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animate);
}

animate();

// ============================================
// Scroll Progress Bar with Glow
// ============================================
const scrollProgress = document.querySelector('.scroll-progress');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = progress + '%';
});

// ============================================
// Mobile Navigation with Better UX
// ============================================
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}

// ============================================
// Active Navigation Link
// ============================================
const sections = document.querySelectorAll('.section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
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

// ============================================
// Smooth Scroll
// ============================================
document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
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

// ============================================
// Intersection Observer for Animations
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements with stagger
document.querySelectorAll('.project-card, .skill-category, .stat-item').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
});

// ============================================
// 3D Card Tilt Effect
// ============================================
const cards = document.querySelectorAll('.project-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1200px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ============================================
// Enhanced Typing Effect
// ============================================
const roleElement = document.querySelector('.title-role');
if (roleElement) {
    const roles = [
        'Cybersecurity Specialist',
        'Ethical Hacker',
        'Full Stack Developer',
        'Security Researcher'
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeRole() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }
        
        roleElement.textContent = currentRole.substring(0, charIndex);
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 3000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }
        
        setTimeout(typeRole, typeSpeed);
    }
    
    setTimeout(typeRole, 1000);
}

// ============================================
// Counter Animation with Easing
// ============================================
function easeOutQuad(t) {
    return t * (2 - t);
}

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    let startTime = null;
    
    const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const easeProgress = easeOutQuad(progress);
        const current = start + (target - start) * easeProgress;
        
        element.textContent = Math.ceil(current);
        
        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            element.textContent = target;
        }
    };
    
    requestAnimationFrame(step);
}

// Animate stats when visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const value = entry.target.querySelector('.stat-value');
            const targetText = value.textContent.trim();
            const target = parseFloat(targetText);
            
            if (!isNaN(target)) {
                animateCounter(value, target);
            }
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// ============================================
// Parallax Scroll Effect
// ============================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-card');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.4 + (index * 0.08);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ============================================
// Glow Effect on Scroll
// ============================================
window.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    const hue = (scrollPercent * 3.6) % 360;
    document.documentElement.style.setProperty('--scroll-hue', hue);
});

// ============================================
// Rich Console Message
// ============================================
console.clear();
console.log('%c╔════════════════════════════════════════╗', 'color: #6366f1; font-weight: bold;');
console.log('%c║  Dev Lahrani - Cybersecurity Portfolio  ║', 'color: #6366f1; font-weight: bold;');
console.log('%c╚════════════════════════════════════════╝', 'color: #6366f1; font-weight: bold;');
console.log('%c👋 Welcome!', 'font-size: 16px; font-weight: bold; color: #818cf8;');
console.log('%c🔐 Security First | 💻 Full Stack | 🚀 Always Grinding', 'color: #8b5cf6; font-weight: 600;');
console.log('%c\n\"THE GRIND IS ETERNAL\" 💪', 'font-size: 14px; font-weight: bold; color: #ec4899; letter-spacing: 2px;');

// ============================================
// Page Load Complete
// ============================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ============================================
// Smooth Reveal Animations
// ============================================
const revealElements = document.querySelectorAll('[data-reveal]');
revealElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = `all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s`;
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    revealObserver.observe(el);
});


// ============================================
// Scroll Progress Bar
// ============================================
const scrollProgress = document.querySelector('.scroll-progress');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = progress + '%';
});

// ============================================
// Mobile Navigation
// ============================================
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}

// ============================================
// Active Navigation Link
// ============================================
const sections = document.querySelectorAll('.section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
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

// ============================================
// Smooth Scroll
// ============================================
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

// ============================================
// Intersection Observer for Animations
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.project-card, .skill-category, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ============================================
// 3D Card Tilt Effect
// ============================================
const cards = document.querySelectorAll('.project-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ============================================
// Typing Effect for Hero
// ============================================
const roleElement = document.querySelector('.title-role');
if (roleElement) {
    const roles = [
        'Cybersecurity Enthusiast',
        'Ethical Hacker',
        'Full Stack Developer',
        'Security Researcher'
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeRole() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }
        
        roleElement.textContent = currentRole.substring(0, charIndex);
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }
        
        setTimeout(typeRole, typeSpeed);
    }
    
    // Start typing effect after a short delay
    setTimeout(typeRole, 1000);
}

// ============================================
// Counter Animation for Stats
// ============================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.ceil(start);
        }
    }, 16);
}

// Animate stats when visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const value = entry.target.querySelector('.stat-value');
            const target = parseFloat(value.getAttribute('data-target'));
            animateCounter(value, target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// ============================================
// Parallax Effect
// ============================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-card');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ============================================
// Custom Cursor Effect (Optional)
// ============================================
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

const cursorDot = document.createElement('div');
cursorDot.className = 'cursor-dot';
document.body.appendChild(cursorDot);

let cursorX = 0;
let cursorY = 0;
let dotX = 0;
let dotY = 0;

document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
});

function animateCursor() {
    dotX += (cursorX - dotX) * 0.2;
    dotY += (cursorY - dotY) * 0.2;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    cursorDot.style.left = dotX + 'px';
    cursorDot.style.top = dotY + 'px';
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Add cursor styles dynamically
const cursorStyles = document.createElement('style');
cursorStyles.textContent = `
    .custom-cursor,
    .cursor-dot {
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        border-radius: 50%;
    }
    
    .custom-cursor {
        width: 40px;
        height: 40px;
        border: 2px solid rgba(99, 102, 241, 0.5);
        transform: translate(-50%, -50%);
        transition: width 0.3s, height 0.3s;
    }
    
    .cursor-dot {
        width: 8px;
        height: 8px;
        background: #6366f1;
        transform: translate(-50%, -50%);
    }
    
    a:hover ~ .custom-cursor,
    button:hover ~ .custom-cursor {
        width: 60px;
        height: 60px;
        border-color: #8b5cf6;
    }
    
    @media (max-width: 968px) {
        .custom-cursor,
        .cursor-dot {
            display: none;
        }
    }
`;
document.head.appendChild(cursorStyles);

// ============================================
// Console Message
// ============================================
console.log('%c👋 Hey there!', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cWelcome to Dev Lahrani\'s Portfolio', 'font-size: 14px; color: #8b5cf6;');
console.log('%cTHE GRIND IS ETERNAL 💪', 'font-size: 12px; font-weight: bold; color: #ec4899;');

// ============================================
// Loading Complete
// ============================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    console.log('%c✅ Portfolio loaded successfully!', 'color: #10b981; font-weight: bold;');
});
