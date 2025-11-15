// Shpify1 Theme JavaScript

document.addEventListener('DOMContentLoaded', function() {

  // Cart functionality
  const cartLinks = document.querySelectorAll('.cart-link');

  // Mobile menu toggle (if needed in future)
  const menuToggle = document.querySelector('.menu-toggle');

  // Product variant selection
  const variantSelects = document.querySelectorAll('select[name="id"]');

  variantSelects.forEach(select => {
    select.addEventListener('change', function() {
      const selectedOption = this.options[this.selectedIndex];
      const price = selectedOption.getAttribute('data-price');

      if (price) {
        const priceElement = document.querySelector('.product-price');
        if (priceElement) {
          priceElement.textContent = price;
        }
      }
    });
  });

  // Form validation
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      const requiredFields = form.querySelectorAll('[required]');
      let isValid = true;

      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');
        } else {
          field.classList.remove('error');
        }
      });

      if (!isValid) {
        e.preventDefault();
      }
    });
  });

  // Smooth scroll for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));

      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

});
