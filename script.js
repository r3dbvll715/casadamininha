// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
  // Handle navigation link clicks
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remove active class from all links
      navLinks.forEach(l => l.classList.remove('active'));
      
      // Add active class to clicked link
      this.classList.add('active');
      
      // Get target section
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        // Calculate offset for fixed header
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;
        
        // Smooth scroll to target
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Update active navigation link on scroll
  window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const headerHeight = document.querySelector('.header').offsetHeight;
    const scrollPosition = window.scrollY + headerHeight + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        if (correspondingLink) {
          correspondingLink.classList.add('active');
        }
      }
    });
  });
  
  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinksContainer = document.querySelector('.nav-links');
  
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
      navLinksContainer.classList.toggle('mobile-menu-open');
      this.classList.toggle('active');
    });
  }
  
  // Form submission
  const inquiryForm = document.querySelector('.inquiry-form');
  
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      
      // Simple validation
      if (!data.name || !data.email) {
        alert('Please fill in all required fields.');
        return;
      }
      
      // Simulate form submission
      const submitButton = this.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;
      
      // Simulate API call
      setTimeout(() => {
        alert('Thank you for your inquiry! We will get back to you soon.');
        this.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }, 2000);
    });
  }
  
  // Image lazy loading and animation
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe elements for animation
  const animatedElements = document.querySelectorAll('.amenity-card, .grid-image, .feature');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
  
  // Header background on scroll
  const header = document.querySelector('.header');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
      header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
  });
  
  // Set minimum date for check-in to today
  const checkinInput = document.querySelector('#checkin');
  const checkoutInput = document.querySelector('#checkout');
  
  if (checkinInput && checkoutInput) {
    const today = new Date().toISOString().split('T')[0];
    checkinInput.setAttribute('min', today);
    
    checkinInput.addEventListener('change', function() {
      const checkinDate = new Date(this.value);
      const nextDay = new Date(checkinDate);
      nextDay.setDate(nextDay.getDate() + 1);
      checkoutInput.setAttribute('min', nextDay.toISOString().split('T')[0]);
    });
  }
});

// Add mobile menu styles dynamically
const style = document.createElement('style');
style.textContent = `
  @media (max-width: 768px) {
    .nav-links {
      position: fixed;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      flex-direction: column;
      padding: 2rem;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
      transform: translateY(-100%);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    }
    
    .nav-links.mobile-menu-open {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }
    
    .mobile-menu-toggle.active span:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
      opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
      transform: rotate(-45deg) translate(7px, -6px);
    }
  }
`;
document.head.appendChild(style);