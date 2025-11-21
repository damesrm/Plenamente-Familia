// ===================================
// MENU MOBILE TOGGLE
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        
        // Fechar menu ao clicar em um link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
        
        // Fechar menu ao clicar fora
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }
});

// ===================================
// SMOOTH SCROLL PARA LINKS INTERNOS
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Ignorar links vazios
        if (href === '#' || href === '') {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 80; // Altura da navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (navbar) {
        // Adicionar sombra quando scrollar
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
            navbar.style.background = 'rgba(255, 255, 255, 0.85)';
        }
    }
    
    lastScroll = currentScroll;
});

// ===================================
// SCROLL ANIMATIONS
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            // Opcional: parar de observar após animar
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Adicionar classe de animação aos elementos que devem animar ao scrollar
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll(`
        .content-wrapper,
        .terapeutas-content,
        .servico-card,
        .objetivo-content,
        .videos-grid,
        .footer-section
    `);
    
    animateElements.forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });
});

// ===================================
// PARALLAX EFFECT NO HERO
// ===================================
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroBackground = document.querySelector('.hero-background');
    
    if (hero && heroBackground && scrolled < window.innerHeight) {
        const parallaxSpeed = 0.5;
        heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
});

// ===================================
// ACTIVE NAV LINK ON SCROLL
// ===================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

function activateNavLink() {
    const scrollPosition = window.pageYOffset + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', activateNavLink);
window.addEventListener('load', activateNavLink);

// Adicionar estilos para link ativo
const style = document.createElement('style');
style.textContent = `
    .nav-menu a.active {
        color: var(--color-text-dark) !important;
        font-weight: 500;
    }
    .nav-menu a.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// ===================================
// LAZY LOADING DE IMAGENS (FUTURO)
// ===================================
// Se você adicionar imagens reais no futuro, pode usar:
/*
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

document.querySelectorAll('img.lazy').forEach(img => {
    imageObserver.observe(img);
});
*/

// ===================================
// FORM VALIDATION (SE ADICIONAR FORMULÁRIO NO FUTURO)
// ===================================
// Exemplo de validação para formulários de contato
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// ===================================
// PERFORMANCE: DEBOUNCE PARA SCROLL
// ===================================
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

// Aplicar debounce em funções de scroll pesadas
const optimizedScrollHandler = debounce(function() {
    activateNavLink();
    // Outras funções de scroll aqui
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// ===================================
// WHATSAPP BUTTON HOVER EFFECT
// ===================================
const whatsappFloat = document.querySelector('.whatsapp-float');
if (whatsappFloat) {
    whatsappFloat.addEventListener('mouseenter', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = 'pulse 2s infinite';
        }, 10);
    });
}

// ===================================
// CONSOLE WELCOME MESSAGE
// ===================================
console.log('%cPlenamente Família', 'color: #D4AF6A; font-size: 20px; font-weight: bold;');
console.log('%cExistimos para proporcionar qualidade de vida familiar.', 'color: #5A5A5A; font-size: 12px;');

// ===================================
// PREVENT DEFAULT PARA LINKS VAZIOS
// ===================================
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
    });
});

// ===================================
// AOS (ANIMATE ON SCROLL) ALTERNATIVO
// ===================================
// Função simples de animação ao scrollar
function animateOnScroll() {
    const elements = document.querySelectorAll('.scroll-animate');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animated');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

