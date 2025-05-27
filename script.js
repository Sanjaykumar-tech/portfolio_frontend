/* ====================================================
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
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.skill-box, .project-card, .about-img, .home-img')
    .forEach(el => observer.observe(el));
}

// Enhanced Contact Form Handler
function setupContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  // Create error display element
  const errorDisplay = document.createElement('div');
  errorDisplay.className = 'form-error';
  errorDisplay.style.display = 'none';
  errorDisplay.style.color = '#ff3333';
  errorDisplay.style.margin = '10px 0';
  form.parentNode.insertBefore(errorDisplay, form.nextSibling);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('input[type="submit"]');
    const originalBtnText = submitBtn.value;

    try {
      // Clear previous errors
      errorDisplay.style.display = 'none';
      errorDisplay.textContent = '';
      
      // Disable button during submission
      submitBtn.disabled = true;
      submitBtn.value = "Sending...";

      // Prepare form data
      const formData = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        message: form.message.value.trim(),
        phone: form.phone?.value.trim() || '',
        subject: form.subject?.value.trim() || 'General Inquiry'
      };

      // Validation
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error("Please fill in all required fields (name, email, message)");
      }

      // Email validation
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        throw new Error("Please enter a valid email address");
      }

      // Message length validation
      if (formData.message.length > 1000) {
        throw new Error("Message is too long (max 1000 characters)");
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

      // Success - redirect or show success message
      window.location.href = "thank-you.html";
      
    } catch (err) {
      // Show error to user
      errorDisplay.textContent = err.message;
      errorDisplay.style.display = 'block';
      
      // Scroll to error for better UX
      errorDisplay.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Re-enable button
      submitBtn.disabled = false;
      submitBtn.value = originalBtnText;
      
      // Log error for debugging
      console.error('Contact form error:', err);
      
    }
  });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', setupContactForm);

// Ultra-Reliable Resume Download System
function setupCVDownload() {
  const cvBtn = document.querySelector('a[href="Sanjaykumar_CV.pdf"]');
  if (!cvBtn) return;

  cvBtn.addEventListener('click', async (e) => {
    // Configuration
    const GOOGLE_DRIVE_ID = '1Whdi90y-_KkYo4TkfP54epXrr6gHkzHo';
    const GDRIVE_LINKS = [
      `https://drive.google.com/uc?export=download&id=${GOOGLE_DRIVE_ID}`,
      `https://drive.usercontent.google.com/download?id=${GOOGLE_DRIVE_ID}&export=download&authuser=0`
    ];
    const originalText = cvBtn.textContent;
    
    // UI Feedback
    cvBtn.textContent = 'Preparing Download...';
    cvBtn.disabled = true;
    e.preventDefault();

    // Try all methods sequentially
    for (let i = 0; i < GDRIVE_LINKS.length; i++) {
      try {
        console.log(`Attempting method ${i+1}`);
        await attemptDownload(GDRIVE_LINKS[i]);
        cvBtn.textContent = '✓ Download Started';
        setTimeout(() => { cvBtn.textContent = originalText; }, 2000);
        return; // Success - exit
      } catch (error) {
        console.warn(`Method ${i+1} failed:`, error);
        if (i === GDRIVE_LINKS.length - 1) {
          // All methods failed - show options
          showDownloadOptions(GOOGLE_DRIVE_ID);
        }
      }
    }
    
    cvBtn.disabled = false;
  });

  // Download attempt handler
  function attemptDownload(url) {
    return new Promise((resolve, reject) => {
      // Method 1: New tab approach
      const tab = window.open(url, '_blank');
      if (tab) {
        tab.focus();
        setTimeout(resolve, 1000);
        return;
      }

      // Method 2: Iframe approach
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = url;
      iframe.onload = () => {
        setTimeout(() => {
          document.body.removeChild(iframe);
          resolve();
        }, 1000);
      };
      iframe.onerror = reject;
      document.body.appendChild(iframe);

      // Timeout fallback
      setTimeout(() => reject(new Error('Download timeout')), 5000);
    });
  }

  // Manual options modal
  function showDownloadOptions(driveId) {
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.8);
      z-index: 9999;
      display: flex;
      justify-content: center;
      align-items: center;
    `;
    
    modal.innerHTML = `
      <div style="
        background: white;
        padding: 2rem;
        border-radius: 8px;
        max-width: 90%;
        width: 500px;
        text-align: center;
        box-shadow: 0 0 20px rgba(0,0,0,0.3);
      ">
        <h3 style="color: #ff4444; margin-top: 0;">Download Options</h3>
        <p>Please select a download method:</p>
        
        <div style="margin: 1.5rem 0; display: grid; gap: 1rem;">
          <a href="https://drive.google.com/uc?export=download&id=${driveId}" 
             target="_blank"
             style="
               padding: 1rem;
               background: #4CAF50;
               color: white;
               border-radius: 4px;
               text-decoration: none;
               font-weight: bold;
             ">
            Download Now (Google Drive)
          </a>
          
          <button onclick="
            navigator.clipboard.writeText('https://drive.google.com/file/d/${driveId}/view');
            alert('Link copied to clipboard!');
          " style="
            padding: 1rem;
            background: #2196F3;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          ">
            Copy Download Link
          </button>
          
          <a href="mailto:?subject=Resume Request&body=Please send me Sanjaykumar's resume PDF" 
             style="
               padding: 1rem;
               background: #9C27B0;
               color: white;
               border-radius: 4px;
               text-decoration: none;
             ">
            Request via Email
          </a>
        </div>
        
        <button onclick="this.parentElement.parentElement.remove()" 
                style="
                  padding: 0.5rem 1rem;
                  background: #ff4444;
                  color: white;
                  border: none;
                  border-radius: 4px;
                  cursor: pointer;
                ">
          Close
        </button>
      </div>
    `;
    
    document.body.appendChild(modal);
  }
}

// Initialize
document.addEventListener("DOMContentLoaded", setupCVDownload);

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
});