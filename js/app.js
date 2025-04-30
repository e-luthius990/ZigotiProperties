
 // Initialize AOS animation
 AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true
});

// Loading animation
window.addEventListener("load", function () {
  const loading = document.getElementById("loading");
  loading.classList.add("opacity-0");
  setTimeout(() => {
    loading.style.display = "none";
  }, 500);
});


// Back to top button
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.remove('opacity-0', 'invisible');
    backToTopButton.classList.add('opacity-100', 'visible');
  } else {
    backToTopButton.classList.remove('opacity-100', 'visible');
    backToTopButton.classList.add('opacity-0', 'invisible');
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const swipers = document.querySelectorAll('.swiper'); // or '.swiper-container' for older versions
  swipers.forEach(swiperEl => {
    new Swiper(swiperEl, {
      loop: true,
      slidesPerView: 1, // Recommended
      navigation: {
        nextEl: swiperEl.querySelector('.swiper-button-next'),
        prevEl: swiperEl.querySelector('.swiper-button-prev'),
      },
    });
  });
});

// Scroll progress indicator
window.addEventListener("scroll", function () {
  const scrollProgress = document.getElementById("scroll-progress");
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const progress = (scrollTop / scrollHeight) * 100;
  scrollProgress.style.width = progress + "%";
});


// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const menuOpenIcon = document.getElementById('menu-open-icon');
const menuCloseIcon = document.getElementById('menu-close-icon');

menuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
  mobileMenu.classList.toggle('opacity-0');
  mobileMenu.classList.toggle('translate-y-1');
  menuOpenIcon.classList.toggle('hidden');
  menuCloseIcon.classList.toggle('hidden');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('#mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden', 'opacity-0', '-translate-y-2');
    menuOpenIcon.classList.remove('hidden');
    menuCloseIcon.classList.add('hidden');
  });
});

// Intersection Observer for scroll animations
const sections = document.querySelectorAll(".section-hidden");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("section-visible");
        entry.target.classList.remove("section-hidden");
      }
    });
  },
  { threshold: 0.1 }
);

sections.forEach((section) => {
  observer.observe(section);
});

 // FAQ toggle functionality
 document.querySelectorAll('.faq-header').forEach(header => {
  header.addEventListener('click', () => {
    const content = header.nextElementSibling;
    const icon = header.querySelector('i');
    
    content.classList.toggle('hidden');
    icon.classList.toggle('transform');
    icon.classList.toggle('rotate-180');
  });
});

  // Sticky Navbar
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // js/contact-form.js
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const formMessage = document.createElement('div');
  formMessage.className = 'hidden mt-4 p-4 rounded-lg text-sm';
  contactForm.appendChild(formMessage);

  // Form validation
  function validateForm(formData) {
      const errors = [];
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Name validation
      if (!formData.get('name')?.trim()) {
          errors.push('Please enter your full name');
      }

      // Email validation
      if (!formData.get('email')?.trim()) {
          errors.push('Email address is required');
      } else if (!emailRegex.test(formData.get('email'))) {
          errors.push('Please enter a valid email address');
      }

      // Subject validation
      if (!formData.get('subject')?.trim() || formData.get('subject') === '') {
          errors.push('Please select a subject');
      }

      // Message validation
      if (!formData.get('message')?.trim()) {
          errors.push('Please enter your message');
      }

      return errors;
  }

  contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // Disable submit button during processing
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
          <span>Sending...</span>
          <svg class="animate-spin -mr-1 ml-2 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
      `;
      
      const formData = new FormData(contactForm);
      const validationErrors = validateForm(formData);
      
      if (validationErrors.length > 0) {
          // Show validation errors
          formMessage.textContent = validationErrors.join(', ');
          formMessage.className = 'mt-4 p-4 rounded-lg bg-red-100 text-red-700';
          formMessage.classList.remove('hidden');
          
          // Re-enable submit button
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Send Message';
          return;
      }
      
      try {
          // Submit to Formspree
          const response = await fetch(contactForm.action, {
              method: 'POST',
              body: formData,
              headers: {
                  'Accept': 'application/json'
              }
          });
          
          if (response.ok) {
              // Success message
              formMessage.textContent = 'Thank you! Your message has been sent successfully. We will respond within 24 hours.';
              formMessage.className = 'mt-4 p-4 rounded-lg bg-green-100 text-green-700';
              formMessage.classList.remove('hidden');
              
              // Reset form
              contactForm.reset();
              
              // Hide message after 8 seconds
              setTimeout(() => {
                  formMessage.classList.add('hidden');
              }, 8000);
          } else {
              const errorData = await response.json();
              throw new Error(errorData.error || 'Failed to send message');
          }
      } catch (error) {
          console.error('Error:', error);
          formMessage.textContent = error.message || 'An error occurred while sending your message. Please try again later.';
          formMessage.className = 'mt-4 p-4 rounded-lg bg-red-100 text-red-700';
          formMessage.classList.remove('hidden');
      } finally {
          // Re-enable submit button
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Send Message';
      }
  });

  // Clear validation messages when user starts typing
  const formInputs = contactForm.querySelectorAll('input, textarea, select');
  formInputs.forEach(input => {
      input.addEventListener('input', () => {
          if (!formMessage.classList.contains('hidden')) {
              formMessage.classList.add('hidden');
          }
      });
  });
});

// Get current page URL and title
const currentUrl = encodeURIComponent(window.location.href);
const currentTitle = encodeURIComponent(document.title);

// Social sharing functions
function shareOnFacebook() {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`, 'facebook-share-dialog', 'width=800,height=600');
}

function shareOnTwitter() {
    window.open(`https://twitter.com/intent/tweet?url=${currentUrl}&text=${currentTitle}`, 'twitter-share-dialog', 'width=800,height=600');
}

function shareOnLinkedIn() {
    window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}&title=${currentTitle}`, 'linkedin-share-dialog', 'width=800,height=600');
}

function shareOnWhatsApp() {
    window.open(`https://wa.me/?text=${currentTitle}%20${currentUrl}`, 'whatsapp-share', 'width=800,height=600');
}

function shareViaEmail() {
    window.location.href = `mailto:?subject=${currentTitle}&body=Check out this article: ${currentUrl}`;
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      if (!mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden', 'opacity-0', '-translate-y-2');
        menuOpenIcon.classList.remove('hidden');
        menuCloseIcon.classList.add('hidden');
      }
    }
  });
});

// Form submission handler with Formspree
document.querySelector('.newsletter-form')?.addEventListener('submit', async function(e) {
  e.preventDefault();
  const form = this;
  const thankYouMessage = document.querySelector('.thank-you-message');
  
  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (response.ok) {
      form.reset();
      thankYouMessage.classList.remove('hidden');
      setTimeout(() => thankYouMessage.classList.add('hidden'), 5000);
    }
  } catch (error) {
    console.error('Error:', error);
  }
});

// Auto-update copyright year
document.getElementById('current-year').textContent = new Date().getFullYear();

tailwind.config = {
  theme: {
    extend: {
      animation: {
        'spin': 'spin 1s linear infinite',
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const whatsappFloat = document.querySelector('.whatsapp-float');
  
  // Add animation on scroll
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      whatsappFloat.style.transform = 'translateY(0)';
      whatsappFloat.style.opacity = '1';
    } else {
      whatsappFloat.style.transform = 'translateY(100px)';
      whatsappFloat.style.opacity = '0';
    }
  });
  
  // Initialize position
  whatsappFloat.style.transform = 'translateY(100px)';
  whatsappFloat.style.opacity = '0';
  setTimeout(() => {
    whatsappFloat.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
    whatsappFloat.style.transform = 'translateY(0)';
    whatsappFloat.style.opacity = '1';
  }, 1000);
});

// Gallery image switcher
function changeMainImage(src, element) {
  document.getElementById("main-image").src = src;

  // Remove active class from all thumbnails
  document.querySelectorAll(".gallery-thumbnail").forEach((thumb) => {
    thumb.classList.remove("active");
  });

  // Add active class to clicked thumbnail
  element.classList.add("active");
}