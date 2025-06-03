function setupContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  // Create notification container
  const notificationContainer = document.createElement('div');
  notificationContainer.className = 'notification-container';
  document.body.appendChild(notificationContainer);

  // Add styles
  const style = document.createElement('style');
  style.textContent = `
    .notification-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 300px;
      z-index: 1000;
    }
    .notification {
      padding: 15px;
      margin-bottom: 10px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      animation: slideIn 0.3s ease-out;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .notification.success {
      background-color: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
    }
    .notification.error {
      background-color: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
    }
    .notification .icon {
      margin-right: 10px;
      font-weight: bold;
    }
    .spinner {
      display: inline-block;
      width: 14px;
      height: 14px;
      border: 2px solid rgba(255,255,255,0.3);
      border-radius: 50%;
      border-top-color: #fff;
      animation: spin 1s linear infinite;
      margin-right: 8px;
    }
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalContent = submitBtn.innerHTML;

    // Clear previous notifications
    notificationContainer.innerHTML = '';

    // Set loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span class="spinner"></span> SENDING...`;

    try {
      const formData = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        message: form.message.value.trim(),
        phone: form.phone?.value.trim() || '',
        subject: form.subject?.value.trim() || 'General Inquiry'
      };

      // Validate
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error("Please fill all required fields");
      }

      const response = await fetch("https://portfolio-backend-imw6.onrender.com/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      showNotification("Message sent successfully!", "success");
      form.reset();
    } catch (error) {
      showNotification(error.message, "error");
    } finally {
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalContent;
      }, 2000);
    }
  });

  function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <span class="icon">${type === 'success' ? '✓' : '✗'}</span>
      <span>${message}</span>
    `;
    
    notificationContainer.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  }
}

// Initialize
document.addEventListener("DOMContentLoaded", setupContactForm);