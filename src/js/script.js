// Tailwind config (somente se for usar via CDN, senão configure via tailwind.config.js)
tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            animation: {
                'fade-in': 'fadeIn 1s ease-in-out',
                'slide-up': 'slideUp 0.8s ease-out',
                'pulse-slow': 'pulse 3s infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(30px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
        },
    },
};

// ================================
// Menu mobile
// ================================
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });
}

// ================================
// Scroll suave para links internos
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth',
            });

            if (!mobileMenu.classList.contains("hidden")) {
                mobileMenu.classList.add("hidden");
            }
        }
    });
});

// ================================
// EmailJS - Formulário de contato
// ================================
emailjs.init("ULEkDtUkU0Uy-TrrA");

const btn = document.getElementById("button");
const form = document.getElementById("contact-form");
const feedback = document.getElementById("form-message");

if (form && btn && feedback) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("from_name").value.trim();
        const email = document.getElementById("from_email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            feedback.className = "mt-4 text-center text-red-600 dark:text-red-400";
            feedback.textContent = "Por favor, preencha todos os campos.";
            feedback.classList.remove("hidden");
            return;
        }

        btn.textContent = "Enviando...";

        emailjs.sendForm("service_id1x25w","template_ukx38m3", form)
            .then(() => {
                btn.textContent = "Enviar Mensagem";
                feedback.className = "mt-4 text-center text-green-600 dark:text-green-400";
                feedback.textContent = "Mensagem enviada com sucesso!";
                feedback.classList.remove("hidden");
                form.reset();

                setTimeout(() => {
                    feedback.classList.add("hidden");
                }, 5000);
            }, (err) => {
                btn.textContent = "Enviar Mensagem";
                feedback.className = "mt-4 text-center text-red-600 dark:text-red-400";
                feedback.textContent = "Erro ao enviar. Por favor, tente novamente.";
                feedback.classList.remove("hidden");
                console.error("Erro ao enviar:", err);
            });
    });
}


// ================================
// Ano atual no footer
// ================================
const yearSpan = document.getElementById("current-year");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// ================================
// Scroll para o topo
// ================================
document.addEventListener('DOMContentLoaded', function() {
    const scrollBtn = document.getElementById('scroll-top');
    
    window.onscroll = function() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    };
    
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// ================================
// Dark / Light Mode Toggle
// ================================
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const themeToggleMobile = document.getElementById("theme-toggle-mobile");
const themeIconMobile = document.getElementById("theme-icon-mobile");

const savedTheme = localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'dark' : 'light');

if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
    themeIcon?.classList.replace('fa-moon', 'fa-sun');
    themeIconMobile?.classList.replace('fa-moon', 'fa-sun');
} else {
    document.documentElement.classList.remove('dark');
    themeIcon?.classList.replace('fa-sun', 'fa-moon');
    themeIconMobile?.classList.replace('fa-sun', 'fa-moon');
}

function toggleTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', !isDark);
    localStorage.setItem('theme', isDark ? 'light' : 'dark');

    themeIcon?.classList.replace(isDark ? 'fa-sun' : 'fa-moon', isDark ? 'fa-moon' : 'fa-sun');
    themeIconMobile?.classList.replace(isDark ? 'fa-sun' : 'fa-moon', isDark ? 'fa-moon' : 'fa-sun');
}

themeToggle?.addEventListener('click', toggleTheme);
themeToggleMobile?.addEventListener('click', toggleTheme);

// ================================
// Animações ao rolar
// ================================
function animateOnScroll() {
    const elements = document.querySelectorAll('.slide-up');

    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;

        if (elementPosition < screenPosition) {
            element.classList.add('animate-slide-up');
        }
    });
}

window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);
