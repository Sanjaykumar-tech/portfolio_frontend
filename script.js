/* ====================================================
<<<<<<< HEAD
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
  
=======
   ENHANCED PORTFOLIO SCRIPT (Optimized)
==================================================== */

// DOM Elements
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const themeSwitcher = document.getElementById('themeSwitcher');
const typeSpan = document.querySelector(".typewriter-text");

// Mobile Menu Functionality
function setupMobileMenu() {
  menuIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    const isActive = !menuIcon.classList.contains('active');
    
    menuIcon.classList.toggle('active');
    navbar.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
    
    // ARIA attributes
    menuIcon.setAttribute('aria-expanded', isActive);
    navbar.setAttribute('aria-hidden', !isActive);
  });

  // Close when clicking outside or on links
  document.addEventListener('click', (e) => {
    if (navbar.classList.contains('active') && 
        !e.target.closest('.navbar') && 
        !e.target.closest('#menu-icon')) {
      closeMobileMenu();
    }
  });

  document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
}

function closeMobileMenu() {
  menuIcon.classList.remove('active');
  navbar.classList.remove('active');
  document.body.classList.remove('no-scroll');
  menuIcon.setAttribute('aria-expanded', 'false');
  navbar.setAttribute('aria-hidden', 'true');
}

// Theme Toggle
function setupTheme() {
  function toggleTheme() {
    document.body.classList.toggle('light-mode');
    localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
  }

  function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') document.body.classList.add('light-mode');
  }

  themeSwitcher.addEventListener('click', toggleTheme);
  initTheme();
}

// Typing Animation
function initTypeEffect() {
  const text = ["Web Developer", "Frontend Developer", "Creative Coder", "Web Designer"];
  let index = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentText = text[index];
    charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
    typeSpan.textContent = currentText.substring(0, charIndex);

    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      setTimeout(type, 1500);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      index = (index + 1) % text.length;
      setTimeout(type, 500);
    } else {
      setTimeout(type, isDeleting ? 60 : 120);
    }
  }
  type();
}

// Read More/Less
function setupReadMore() {
  document.querySelectorAll('[data-readmore]').forEach(container => {
    const btn = container.querySelector('.read-more-btn');
    const content = container.querySelector('.more-text');
    const dots = container.querySelector('#dots');

    btn.setAttribute('aria-expanded', 'false');
    content.setAttribute('aria-hidden', 'true');

    btn.addEventListener('click', () => {
      const isExpanding = !content.classList.contains('show');
      
      if (isExpanding) {
        content.style.setProperty('--dynamic-height', 
          `${content.scrollHeight}px`);
      }
      
      content.classList.toggle('show');
      const isVisible = content.classList.contains('show');
      
      btn.setAttribute('aria-expanded', isVisible);
      btn.textContent = isVisible ? 'Read Less' : 'Read More';
      if (dots) dots.style.display = isVisible ? 'none' : 'inline';
      content.setAttribute('aria-hidden', !isVisible);
      content.tabIndex = isVisible ? 0 : -1;
    });
  });
}

// Scroll Animations
function setupScrollAnimations() {
>>>>>>> 0e6c88ff6f3bc68f5ef8cc5683c6ca45559e5740
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

<<<<<<< HEAD
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
=======
  document.querySelectorAll('.skill-box, .project-card, .about-img, .home-img')
    .forEach(el => observer.observe(el));
}

// Enhanced Contact Form Handler with better error handling and UX
function setupContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  // Create error display element
  const errorDisplay = document.createElement('div');
  errorDisplay.className = 'form-error';
  errorDisplay.style.cssText = `
    display: none;
    color: #ff3333;
    margin: 10px 0;
    padding: 10px;
    border-radius: 4px;
    background-color: #ffeeee;
    border: 1px solid #ffcccc;
  `;
  form.parentNode.insertBefore(errorDisplay, form.nextSibling);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
    const originalBtnText = submitBtn.value || submitBtn.textContent;

    try {
      // Clear previous errors
      errorDisplay.style.display = 'none';
      errorDisplay.textContent = '';
      
      // Disable button during submission
      submitBtn.disabled = true;
      if (submitBtn.value) submitBtn.value = "Sending...";
      if (submitBtn.textContent) submitBtn.textContent = "Sending...";

      // Prepare form data with sanitization
      const formData = {
        name: sanitizeInput(form.name.value.trim()),
        email: sanitizeInput(form.email.value.trim()),
        message: sanitizeInput(form.message.value.trim()),
        phone: form.phone?.value.trim() ? sanitizeInput(form.phone.value.trim()) : '',
        subject: form.subject?.value.trim() ? sanitizeInput(form.subject.value.trim()) : 'General Inquiry'
      };

      // Validation
      const validationErrors = validateFormData(formData);
      if (validationErrors.length > 0) {
        throw new Error(validationErrors.join('\n'));
      }

      // Send data to backend
      const res = await fetch("https://portfolio-backend-wivk.onrender.com/send", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message. Please try again later.");
      }

      // Success - show success message and reset form
      showSuccessMessage(form, "Message sent successfully!");
      form.reset();
      
    } catch (err) {
      // Show error to user
      errorDisplay.textContent = err.message;
      errorDisplay.style.display = 'block';
      
      // Scroll to error for better UX
      errorDisplay.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Log error for debugging
      console.error('Contact form error:', err);
      
    } finally {
      // Re-enable button
      submitBtn.disabled = false;
      if (submitBtn.value) submitBtn.value = originalBtnText;
      if (submitBtn.textContent) submitBtn.textContent = originalBtnText;
    }
  });

  // Helper functions
  function sanitizeInput(input) {
    return input.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function validateFormData(data) {
    const errors = [];
    if (!data.name) errors.push("Name is required");
    if (!data.email) errors.push("Email is required");
    if (!data.message) errors.push("Message is required");
    if (data.name && data.name.length > 100) errors.push("Name is too long (max 100 characters)");
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.push("Please enter a valid email address");
    }
    if (data.message && data.message.length > 1000) {
      errors.push("Message is too long (max 1000 characters)");
    }
    if (data.phone && data.phone.length > 20) {
      errors.push("Phone number is too long (max 20 characters)");
    }
    if (data.subject && data.subject.length > 200) {
      errors.push("Subject is too long (max 200 characters)");
    }
    return errors;
  }

  function showSuccessMessage(formElement, message) {
    const successDisplay = document.createElement('div');
    successDisplay.className = 'form-success';
    successDisplay.style.cssText = `
      display: block;
      color: #00aa00;
      margin: 10px 0;
      padding: 10px;
      border-radius: 4px;
      background-color: #eeffee;
      border: 1px solid #ccffcc;
    `;
    successDisplay.textContent = message;
    formElement.parentNode.insertBefore(successDisplay, formElement.nextSibling);
    
    // Remove after 5 seconds
    setTimeout(() => {
      successDisplay.style.opacity = '0';
      setTimeout(() => successDisplay.remove(), 500);
    }, 5000);
  }
}

// Ultra-Reliable Resume Download System with better fallbacks
function setupCVDownload() {
  const cvBtn = document.querySelector('a[href*="Sanjaykumar_CV.pdf"], a[data-cv-download]');
  if (!cvBtn) return;

  // Configuration
  const GOOGLE_DRIVE_ID = '1Whdi90y-_KkYo4TkfP54epXrr6gHkzHo';
  const FALLBACK_URL = cvBtn.href || `https://drive.google.com/uc?export=download&id=${GOOGLE_DRIVE_ID}`;
  const GDRIVE_LINKS = [
    `https://drive.google.com/uc?export=download&id=${GOOGLE_DRIVE_ID}`,
    `https://drive.usercontent.google.com/download?id=${GOOGLE_DRIVE_ID}&export=download&authuser=0`,
    FALLBACK_URL
  ];

  cvBtn.addEventListener('click', async (e) => {
    const originalHTML = cvBtn.innerHTML;
    
    // UI Feedback
    cvBtn.innerHTML = '<span class="spinner"></span> Preparing Download...';
    cvBtn.classList.add('loading');
    e.preventDefault();

    // Try all methods sequentially
    for (let i = 0; i < GDRIVE_LINKS.length; i++) {
      try {
        console.log(`Attempting download method ${i+1}`);
        const success = await attemptDownload(GDRIVE_LINKS[i]);
        if (success) {
          cvBtn.innerHTML = '<span class="tick">✓</span> Download Started';
          setTimeout(() => { cvBtn.innerHTML = originalHTML; cvBtn.classList.remove('loading'); }, 2000);
          return; // Success - exit
        }
      } catch (error) {
        console.warn(`Method ${i+1} failed:`, error);
        if (i === GDRIVE_LINKS.length - 1) {
          // All methods failed - show options
          showDownloadOptions(GOOGLE_DRIVE_ID, FALLBACK_URL);
        }
      }
    }
    
    cvBtn.innerHTML = originalHTML;
    cvBtn.classList.remove('loading');
  });

  // Improved download attempt handler
  function attemptDownload(url) {
    return new Promise((resolve, reject) => {
      // Method 1: Direct download (works in most modern browsers)
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'Sanjaykumar_Resume.pdf';
      anchor.style.display = 'none';
      document.body.appendChild(anchor);
      
      anchor.addEventListener('click', () => {
        setTimeout(() => {
          document.body.removeChild(anchor);
          resolve(true);
        }, 1000);
      });
      
      anchor.addEventListener('error', (err) => {
        document.body.removeChild(anchor);
        reject(err);
      });
      
      // Trigger the download
      anchor.click();

      // Timeout fallback
      setTimeout(() => {
        document.body.removeChild(anchor);
        reject(new Error('Download timeout'));
      }, 5000);
    });
  }

  // Enhanced manual options modal
  function showDownloadOptions(driveId, fallbackUrl) {
    // Check if modal already exists
    if (document.getElementById('downloadOptionsModal')) return;
    
    const modal = document.createElement('div');
    modal.id = 'downloadOptionsModal';
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.9);
      z-index: 9999;
      display: flex;
      justify-content: center;
      align-items: center;
      backdrop-filter: blur(5px);
      animation: fadeIn 0.3s ease-out;
    `;
    
    modal.innerHTML = `
      <div class="download-modal-content" style="
        background: #ffffff;
        padding: 2rem;
        border-radius: 12px;
        max-width: 90%;
        width: 500px;
        text-align: center;
        box-shadow: 0 5px 30px rgba(0,0,0,0.3);
        position: relative;
      ">
        <button class="close-modal" style="
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #666;
        ">×</button>
        
        <h3 style="color: #2c3e50; margin-top: 0;">Download Options</h3>
        <p style="color: #7f8c8d;">Please select a download method:</p>
        
        <div class="download-options" style="
          margin: 1.5rem 0; 
          display: grid; 
          gap: 1rem;
          grid-template-columns: 1fr;
        ">
          <a href="${fallbackUrl}" 
             class="download-btn drive-download"
             target="_blank"
             style="
               padding: 12px;
               background: #27ae60;
               color: white;
               border-radius: 6px;
               text-decoration: none;
               font-weight: bold;
               transition: all 0.2s;
             ">
            <i class="icon-download"></i> Direct Download
          </a>
          
          <button class="copy-link-btn" style="
            padding: 12px;
            background: #3498db;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.2s;
          ">
            <i class="icon-copy"></i> Copy Download Link
          </button>
          
          <a href="mailto:sanjaykumar.techdev@gmail.com?subject=Resume Request&body=Please send me Sanjaykumar's resume PDF" 
             class="email-request-btn"
             style="
               padding: 12px;
               background: #9b59b6;
               color: white;
               border-radius: 6px;
               text-decoration: none;
               font-weight: bold;
               transition: all 0.2s;
             ">
            <i class="icon-email"></i> Request via Email
          </a>
        </div>
      </div>
      <style>
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .download-btn:hover, .copy-link-btn:hover, .email-request-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        .close-modal:hover {
          color: #e74c3c;
        }
      </style>
    `;
    
    // Add event listeners
    modal.querySelector('.close-modal').addEventListener('click', () => {
      modal.style.animation = 'fadeOut 0.3s ease-out';
      setTimeout(() => modal.remove(), 300);
    });
    
    modal.querySelector('.copy-link-btn').addEventListener('click', () => {
      const downloadLink = `https://drive.google.com/file/d/${driveId}/view?usp=sharing`;
      navigator.clipboard.writeText(downloadLink)
        .then(() => {
          const btn = modal.querySelector('.copy-link-btn');
          btn.innerHTML = '<i class="icon-check"></i> Link Copied!';
          btn.style.background = '#2ecc71';
          setTimeout(() => {
            btn.innerHTML = '<i class="icon-copy"></i> Copy Download Link';
            btn.style.background = '#3498db';
          }, 2000);
        })
        .catch(err => {
          console.error('Failed to copy:', err);
          alert('Failed to copy link. Please try again.');
        });
    });
    
    document.body.appendChild(modal);
    
    // Add fadeOut animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
}

// Initialize both systems when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  setupContactForm();
  setupCVDownload();
});

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  setupMobileMenu();
  setupTheme();
  initTypeEffect();
  setupReadMore();
  setupScrollAnimations();
  setupContactForm();
});

// footer interaction and animations
const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add('visible');
  } else {
    backToTopButton.classList.remove('visible');
  }
});

document.addEventListener('DOMContentLoaded', function() {
    const footer = document.querySelector('footer');
    if (!footer) return;

    // Add interactive class to footer
    footer.classList.add('footer-interactive');
    
    // Create bubble container
    const bubbleContainer = document.createElement('div');
    bubbleContainer.className = 'footer-cursor-bubbles';
    footer.prepend(bubbleContainer);

    // Device-adaptive settings
    const isMobile = window.innerWidth < 768;
    const bubbleSettings = {
        active: {
            size: isMobile ? [40, 70] : [20, 50], // min-max size range
            scale: isMobile ? 1.3 : 1.2,
            opacity: isMobile ? 0.9 : 0.8
        },
        background: {
            count: isMobile ? 5 : 8,
            size: isMobile ? [30, 70] : [20, 80],
            opacity: isMobile ? 0.2 : 0.15
        }
    };

    // Handle both mouse and touch events
    const handleInteraction = (x, y) => {
        const bubble = document.createElement('div');
        bubble.className = 'footer-bubble active';
        
        const posX = x - footer.getBoundingClientRect().left;
        const posY = y - footer.getBoundingClientRect().top;
        const [minSize, maxSize] = bubbleSettings.active.size;
        const size = Math.random() * (maxSize - minSize) + minSize;
        
        bubble.style.left = posX + 'px';
        bubble.style.top = posY + 'px';
        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        bubble.style.opacity = bubbleSettings.active.opacity;
        
        bubbleContainer.appendChild(bubble);
        
        setTimeout(() => {
            bubble.style.transform = `translate(-50%, -50%) scale(${bubbleSettings.active.scale})`;
            bubble.style.opacity = '0';
        }, 50);
        
        setTimeout(() => bubble.remove(), 1000);
    };

    // Event listeners
    footer.addEventListener('mousemove', (e) => handleInteraction(e.clientX, e.clientY));
    footer.addEventListener('touchmove', (e) => {
        e.preventDefault();
        handleInteraction(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: false });

    // Create background bubbles
    for (let i = 0; i < bubbleSettings.background.count; i++) {
        const bgBubble = document.createElement('div');
        bgBubble.className = 'footer-bubble';
        
        const [minSize, maxSize] = bubbleSettings.background.size;
        const size = Math.random() * (maxSize - minSize) + minSize;
        
        bgBubble.style.left = Math.random() * 100 + '%';
        bgBubble.style.top = (Math.random() * 80 + 20) + '%';
        bgBubble.style.width = size + 'px';
        bgBubble.style.height = size + 'px';
        bgBubble.style.opacity = bubbleSettings.background.opacity;
        
        bubbleContainer.appendChild(bgBubble);
        animateBgBubble(bgBubble);
    }

    function animateBgBubble(bubble) {
        const duration = Math.random() * 15 + 15;
        const initialOpacity = parseFloat(bubble.style.opacity);
        
        bubble.animate([
            { transform: 'translate(-50%, -50%) scale(1)', opacity: initialOpacity },
            { transform: 'translate(-50%, -50%) scale(1.15)', opacity: initialOpacity * 1.5 },
            { transform: 'translate(-50%, -50%) scale(1)', opacity: initialOpacity }
        ], {
            duration: duration * 1000,
            iterations: Infinity
        });
    }
>>>>>>> 0e6c88ff6f3bc68f5ef8cc5683c6ca45559e5740
});