/* JavaScript Document

TemplateMo 605 Xmas Countdown

https://templatemo.com/tm-605-xmas-countdown

*/

// Create Particles and Snowflakes
function createParticles() {
   const container = document.getElementById('particles');

   // Floating particles
   for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (15 + Math.random() * 20) + 's';
      particle.style.animationDelay = Math.random() * 15 + 's';
      container.appendChild(particle);
   }

   // Snowflakes - reduced by half, 25% slower
   for (let i = 0; i < 20; i++) {
      const snowflake = document.createElement('div');
      snowflake.className = 'snowflake';
      snowflake.textContent = '❄';
      snowflake.style.left = Math.random() * 100 + '%';
      snowflake.style.animationDuration = (12.5 + Math.random() * 18.75) + 's';
      snowflake.style.animationDelay = Math.random() * 10 + 's';
      snowflake.style.fontSize = (0.5 + Math.random() * 1) + 'rem';
      snowflake.style.opacity = 0.2 + Math.random() * 0.4;
      container.appendChild(snowflake);
   }
}

// Countdown Timer - Target: December 25, 2025 at 6:00 PM



// Header scroll effect
function handleScroll() {
   const header = document.getElementById('header');
   if (window.scrollY > 50) {
      header.classList.add('scrolled');
   } else {
      header.classList.remove('scrolled');
   }
}

// Scroll Spy - Update active nav item based on scroll position
function scrollSpy() {
   const sections = document.querySelectorAll('section[id]');
   const navLinks = document.querySelectorAll('nav a:not(.nav-cta)');

   let currentSection = '';
   const scrollPosition = window.scrollY + 150;

   sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
         currentSection = section.getAttribute('id');
      }
   });

   navLinks.forEach(link => {
      link.classList.remove('nav-active');
      if (link.getAttribute('href') === '#' + currentSection) {
         link.classList.add('nav-active');
      }
   });
}

// Mobile navigation
function setupNavigation() {
   const toggle = document.getElementById('navToggle');
   const nav = document.getElementById('nav');
   const links = nav.querySelectorAll('a');

   toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      nav.classList.toggle('active');
   });

   links.forEach(link => {
      link.addEventListener('click', () => {
         toggle.classList.remove('active');
         nav.classList.remove('active');
      });
   });
}

// Newsletter form
function setupNewsletter() {
   const form = document.getElementById('newsletterForm');
   form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input');
      alert('Thank you for subscribing! You\'ll receive holiday updates at ' + input.value);
      input.value = '';
   });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
   createParticles();
   updateCountdown();
   setInterval(updateCountdown, 1000);
   setupNavigation();
   setupNewsletter();
   scrollSpy();
   window.addEventListener('scroll', () => {
      handleScroll();
      scrollSpy();
   });
});


function getNextBirthday() {
    const now = new Date();

    let birthday = new Date(
        now.getFullYear(),
        7, // August (0 based index)
        2,
        0, 0, 0
    );

    // Agar birthday nikal gaya hai to next year
    if (now > birthday) {
        birthday = new Date(
            now.getFullYear() + 1,
            7,
            2,
            0, 0, 0
        );
    }

    return birthday;
}

function updateCountdown() {
    const now = new Date();
    const targetDate = getNextBirthday();

    const diff = targetDate - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = String(hours).padStart(2, "0");
    document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
    document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

function updateTargetDate() {
    const birthYear = 1995;
    const nextBirthday = getNextBirthday();

    document.querySelector(".target-date").innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        Born on 02 August ${birthYear} | Next Birthday: 02 August ${nextBirthday.getFullYear()}
    `;
}

updateCountdown();
updateTargetDate();

setInterval(updateCountdown, 1000);


