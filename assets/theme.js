// Shpify1 - Lazada-Style Theme JavaScript

document.addEventListener('DOMContentLoaded', function() {

  // ==========================================
  // Mobile Menu
  // ==========================================

  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
  const mobileMenuClose = document.getElementById('mobileMenuClose');

  function openMobileMenu() {
    mobileMenu.classList.add('active');
    mobileMenuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', openMobileMenu);
  }

  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMobileMenu);
  }

  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', closeMobileMenu);
  }

  // ==========================================
  // Image Gallery (Product Page)
  // ==========================================

  const thumbnails = document.querySelectorAll('.thumbnail');
  const mainImage = document.getElementById('mainImage');

  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', function() {
      // Remove active class from all thumbnails
      thumbnails.forEach(t => t.classList.remove('active'));

      // Add active class to clicked thumbnail
      this.classList.add('active');

      // Update main image
      const newImageSrc = this.getAttribute('data-image');
      if (mainImage && newImageSrc) {
        mainImage.src = newImageSrc;
      }
    });
  });

  // ==========================================
  // Quantity Controls
  // ==========================================

  const qtyInput = document.getElementById('productQuantity');
  const qtyPlus = document.querySelector('.qty-plus');
  const qtyMinus = document.querySelector('.qty-minus');

  if (qtyPlus && qtyInput) {
    qtyPlus.addEventListener('click', function() {
      let currentValue = parseInt(qtyInput.value) || 1;
      let maxValue = parseInt(qtyInput.max) || 999;
      if (currentValue < maxValue) {
        qtyInput.value = currentValue + 1;
      }
    });
  }

  if (qtyMinus && qtyInput) {
    qtyMinus.addEventListener('click', function() {
      let currentValue = parseInt(qtyInput.value) || 1;
      let minValue = parseInt(qtyInput.min) || 1;
      if (currentValue > minValue) {
        qtyInput.value = currentValue - 1;
      }
    });
  }

  // ==========================================
  // Variant Selection
  // ==========================================

  const variantButtons = document.querySelectorAll('.variant-btn');

  variantButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Get parent variant buttons container
      const container = this.closest('.variant-buttons');

      // Remove active class from all buttons in this container
      container.querySelectorAll('.variant-btn').forEach(btn => {
        btn.classList.remove('active');
      });

      // Add active class to clicked button
      this.classList.add('active');
    });
  });

  // ==========================================
  // Cash on Delivery Modal
  // ==========================================

  const codModal = document.getElementById('codModal');
  const buyNowBtn = document.getElementById('buyNowBtn');
  const closeModal = document.getElementById('closeModal');
  const cancelOrder = document.getElementById('cancelOrder');
  const codForm = document.getElementById('codForm');
  const orderSuccess = document.getElementById('orderSuccess');

  // Open modal when Buy Now button is clicked
  const buyNowButtons = document.querySelectorAll('#orderNowBtn, #buyNowBtn');

  buyNowButtons.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', function() {
        const productId = this.getAttribute('data-product-id');
        const productTitle = this.getAttribute('data-product-title');
        const productPrice = this.getAttribute('data-product-price');
        const productImage = this.getAttribute('data-product-image');

        // Get quantity
        const qtyInputHero = document.getElementById('productQty');
        const qtyInputStandard = document.getElementById('productQuantity');
        const quantity = qtyInputHero ? parseInt(qtyInputHero.value) : (qtyInputStandard ? parseInt(qtyInputStandard.value) : 1);

        // Get selected variants if exists
        const selectedVariants = [];
        document.querySelectorAll('.option-btn.active, .variant-btn.active').forEach(btn => {
          selectedVariants.push(btn.getAttribute('data-value'));
        });

        // Calculate total
        const priceNum = parseFloat(productPrice) / 100; // Shopify stores prices in cents
        const total = priceNum * quantity;

        // Update modal content
        document.getElementById('orderProductName').textContent = productTitle;
        document.getElementById('orderQuantity').textContent = quantity;
        document.getElementById('orderPrice').textContent = formatMoney(productPrice);

        // Update product image in modal
        const orderProductImage = document.getElementById('orderProductImage');
        if (orderProductImage && productImage) {
          orderProductImage.src = productImage;
          orderProductImage.alt = productTitle;
        }

        document.getElementById('productId').value = productId;

        // Show modal
        if (codModal) {
          codModal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    }
  });

  // Close modal functions
  function closeModalFunc() {
    codModal.classList.remove('active');
    document.body.style.overflow = '';

    // Reset form
    if (codForm) {
      codForm.reset();
    }

    // Hide success message
    if (orderSuccess) {
      orderSuccess.style.display = 'none';
    }

    // Show form again
    if (codForm) {
      codForm.style.display = 'block';
    }
  }

  if (closeModal) {
    closeModal.addEventListener('click', closeModalFunc);
  }

  if (cancelOrder) {
    cancelOrder.addEventListener('click', closeModalFunc);
  }

  // Close modal when clicking outside
  if (codModal) {
    codModal.addEventListener('click', function(e) {
      if (e.target === codModal) {
        closeModalFunc();
      }
    });
  }

  // Handle form submission
  if (codForm) {
    codForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(codForm);
      const orderData = {
        product_id: formData.get('product_id'),
        variant_id: formData.get('variant_id'),
        full_name: formData.get('full_name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        address: formData.get('address'),
        city: formData.get('city'),
        postal_code: formData.get('postal_code'),
        region: formData.get('region'),
        notes: formData.get('notes'),
        payment_method: 'Cash on Delivery',
        order_date: new Date().toISOString()
      };

      // Generate order number
      const orderNumber = 'COD' + Date.now();

      // Store order in localStorage (in a real app, this would go to a server)
      try {
        let orders = JSON.parse(localStorage.getItem('cod_orders')) || [];
        orders.push({
          order_number: orderNumber,
          ...orderData
        });
        localStorage.setItem('cod_orders', JSON.stringify(orders));

        // Send to Shopify (you can also use a webhook or email service)
        sendOrderNotification(orderNumber, orderData);

      } catch (error) {
        console.error('Error saving order:', error);
      }

      // Hide form and show success message
      codForm.style.display = 'none';
      orderSuccess.style.display = 'block';
      document.getElementById('orderNumber').textContent = orderNumber;

      // Scroll to top of modal
      const modalBody = document.querySelector('.cod-modal-body');
      if (modalBody) {
        modalBody.scrollTop = 0;
      }
    });
  }

  // ==========================================
  // Helper Functions
  // ==========================================

  function formatMoney(cents) {
    // Basic money formatting - adjust for your currency
    const amount = cents / 100;
    return '$' + amount.toFixed(2);
  }

  function sendOrderNotification(orderNumber, orderData) {
    // In a real implementation, this would send data to your server
    // For Shopify, you could use a webhook, app proxy, or metafield

    console.log('Order placed:', orderNumber, orderData);

    // You could send to a custom endpoint or use Shopify's customer note field
    // Example: Send email notification using a service like Formspree, EmailJS, etc.

    // For now, we'll just log it
    // In production, integrate with your backend or use Shopify Flow
  }

  // ==========================================
  // Flash Sale Timer
  // ==========================================

  const flashTimer = document.getElementById('flashTimer');

  if (flashTimer) {
    // Set end time (example: 2 hours from now)
    const endTime = new Date().getTime() + (2 * 60 * 60 * 1000);

    function updateTimer() {
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance < 0) {
        flashTimer.innerHTML = '<span class="timer-label">Sale Ended</span>';
        return;
      }

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      const hoursEl = flashTimer.querySelector('.timer-hours');
      const minutesEl = flashTimer.querySelector('.timer-minutes');
      const secondsEl = flashTimer.querySelector('.timer-seconds');

      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
      if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateTimer();
    setInterval(updateTimer, 1000);
  }

  // ==========================================
  // Form Validation
  // ==========================================

  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    const inputs = form.querySelectorAll('input[required], textarea[required]');

    inputs.forEach(input => {
      input.addEventListener('blur', function() {
        if (!this.value.trim()) {
          this.style.borderColor = '#f44336';
        } else {
          this.style.borderColor = '#e0e0e0';
        }
      });

      input.addEventListener('input', function() {
        if (this.value.trim()) {
          this.style.borderColor = '#e0e0e0';
        }
      });
    });
  });

  // Phone number formatting
  const phoneInput = document.getElementById('phoneNumber');

  if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
      // Remove non-numeric characters
      let value = this.value.replace(/\D/g, '');

      // Limit to reasonable phone number length
      if (value.length > 15) {
        value = value.slice(0, 15);
      }

      this.value = value;
    });
  }

  // ==========================================
  // Smooth Scroll
  // ==========================================

  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');

      if (targetId === '#') return;

      const target = document.querySelector(targetId);

      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ==========================================
  // Lazy Loading for Images
  // ==========================================

  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        }
      });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
  }

  // ==========================================
  // Product Page - Image Gallery
  // ==========================================

  const productThumbs = document.querySelectorAll('.product-thumb');
  const mainProductImage = document.getElementById('mainProductImage');

  productThumbs.forEach(thumb => {
    thumb.addEventListener('click', function() {
      // Remove active class from all thumbnails
      productThumbs.forEach(t => t.classList.remove('active'));

      // Add active class to clicked thumbnail
      this.classList.add('active');

      // Update main image
      const newImageSrc = this.getAttribute('data-image');
      if (mainProductImage && newImageSrc) {
        mainProductImage.src = newImageSrc;
      }
    });
  });

  // ==========================================
  // Product Page - Quantity Controls (Hero)
  // ==========================================

  const qtyPlusHero = document.querySelector('.qty-plus-hero');
  const qtyMinusHero = document.querySelector('.qty-minus-hero');
  const qtyInputHero = document.getElementById('productQty');

  if (qtyPlusHero && qtyInputHero) {
    qtyPlusHero.addEventListener('click', function() {
      let currentValue = parseInt(qtyInputHero.value) || 1;
      let maxValue = parseInt(qtyInputHero.max) || 99;
      if (currentValue < maxValue) {
        qtyInputHero.value = currentValue + 1;
      }
    });
  }

  if (qtyMinusHero && qtyInputHero) {
    qtyMinusHero.addEventListener('click', function() {
      let currentValue = parseInt(qtyInputHero.value) || 1;
      let minValue = parseInt(qtyInputHero.min) || 1;
      if (currentValue > minValue) {
        qtyInputHero.value = currentValue - 1;
      }
    });
  }

  // ==========================================
  // Product Page - Option Buttons
  // ==========================================

  const optionButtons = document.querySelectorAll('.option-btn');

  optionButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Get parent option values container
      const container = this.closest('.option-values');

      // Remove active class from all buttons in this container
      container.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('active');
      });

      // Add active class to clicked button
      this.classList.add('active');
    });
  });

  // ==========================================
  // Product Page - Urgency Timer
  // ==========================================

  const productTimer = document.getElementById('productTimer');

  if (productTimer) {
    // Set timer to 24 hours from now
    const endTime = new Date().getTime() + (24 * 60 * 60 * 1000);

    function updateProductTimer() {
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance < 0) {
        productTimer.textContent = '00:00:00';
        return;
      }

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      productTimer.textContent =
        String(hours).padStart(2, '0') + ':' +
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0');
    }

    updateProductTimer();
    setInterval(updateProductTimer, 1000);
  }

  // ==========================================
  // Product Page - Sticky Mobile CTA
  // ==========================================

  const stickyBtn = document.getElementById('stickyBtn');

  if (stickyBtn) {
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // Show sticky button when scrolling down past 300px
      if (scrollTop > 300) {
        stickyBtn.classList.add('visible');
      } else {
        stickyBtn.classList.remove('visible');
      }

      lastScrollTop = scrollTop;
    });
  }

  // ==========================================
  // Product Page - FAQ Accordion
  // ==========================================

  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    if (question) {
      question.addEventListener('click', function() {
        // Toggle active class
        item.classList.toggle('active');

        // Close other FAQs (optional - for accordion behavior)
        // faqItems.forEach(otherItem => {
        //   if (otherItem !== item) {
        //     otherItem.classList.remove('active');
        //   }
        // });
      });
    }
  });

});
