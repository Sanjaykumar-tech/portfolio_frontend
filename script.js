/* ====================================================
   ENHANCED PORTFOLIO SCRIPT
==================================================== */

// Mobile Navbar Toggle
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
  menuIcon.classList.toggle('active');
  navbar.classList.toggle('active');
  document.body.classList.toggle('no-scroll');
};

// Close menu when clicking a link
document.querySelectorAll('.navbar a').forEach(link => {
  link.addEventListener('click', () => {
    menuIcon.classList.remove('active');
    navbar.classList.remove('active');
    document.body.classList.remove('no-scroll');
  });
});

// Theme Toggle
const themeSwitcher = document.getElementById('themeSwitcher');

function toggleTheme() {
  document.body.classList.toggle('light-mode');
  localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
}

// Initialize theme
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
  }
}

themeSwitcher.addEventListener('click', toggleTheme);
initTheme();

// Typing Animation
const text = ["Web Developer", "Frontend Developer", "Creative Coder", "Web Designer"];
let index = 0;
let charIndex = 0;
let isDeleting = false;
const typeSpan = document.querySelector(".typewriter-text");

function typeEffect() {
  const currentText = text[index];
  
  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  typeSpan.textContent = currentText.substring(0, charIndex);

  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    setTimeout(typeEffect, 1500);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    index = (index + 1) % text.length;
    setTimeout(typeEffect, 500);
  } else {
    setTimeout(typeEffect, isDeleting ? 60 : 120);
  }
}

// Read More/Less Functionality
document.addEventListener("DOMContentLoaded", () => {
    const readMoreContainers = document.querySelectorAll('[data-readmore]');
    
    readMoreContainers.forEach(container => {
        const btn = container.querySelector('.read-more-btn');
        const content = container.querySelector('.more-text');
        const dots = container.querySelector('#dots');
        
        // Initialize ARIA attributes
        btn.setAttribute('aria-expanded', 'false');
        content.setAttribute('aria-hidden', 'true');
        
        btn.addEventListener('click', () => {
            const isExpanding = !content.classList.contains('show');
            
            if (isExpanding) {
                // Calculate height before expanding
                content.style.display = 'block';
                const height = content.scrollHeight;
                content.style.display = '';
                content.style.setProperty('--dynamic-height', `${height}px`);
            }
            
            // Toggle visibility
            content.classList.toggle('show');
            const isVisible = content.classList.contains('show');
            
            // Update UI
            btn.setAttribute('aria-expanded', isVisible);
            btn.textContent = isVisible ? 'Read Less' : 'Read More';
            if (dots) dots.style.display = isVisible ? 'none' : 'inline';
            
            // Focus management for screen readers
            if (isVisible) {
                content.setAttribute('aria-hidden', 'false');
                content.tabIndex = 0;
            } else {
                content.setAttribute('aria-hidden', 'true');
                content.tabIndex = -1;
            }
        });
    });
});



// Scroll Animation
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.skill-box, .project-card, .about-img, .home-img');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
};

// Enhanced Contact Form
document.getElementById("contactForm")?.addEventListener("submit", async function(e) {
  e.preventDefault();
  
  const submitBtn = this.querySelector('input[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.value = "Sending...";
  
  try {
    const formData = {
      name: this.name.value.trim(),
      email: this.email.value.trim(),
      phone: this.phone.value.trim(),
      subject: this.subject.value.trim(),
      message: this.message.value.trim()
    };

    // Client-side validation
    if (!formData.name || !formData.email || !formData.message) {
      throw new Error("Please fill in all required fields");
    }

    const res = await fetch("https://portfolio-backend-1-72na.onrender.com/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to send message");
    }

    window.location.href = "thank-you.html";
    
  } catch (err) {
    alert(err.message);
    submitBtn.disabled = false;
    submitBtn.value = "Send Message";
  }
});

// Track CV downloads
document.querySelector('a[href="sanjaykumar CV.pdf"]')?.addEventListener('click', () => {
  console.log('CV downloaded');
  // Can be replaced with actual analytics tracking
});

// Initialize everything when DOM loads
document.addEventListener("DOMContentLoaded", () => {
  typeEffect();
  animateOnScroll();
  
  // Close mobile menu when clicking a link
  document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
      menuIcon.classList.remove('bx-x');
      navbar.classList.remove('active');
    });
  });
});