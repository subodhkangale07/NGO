// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const element = document.querySelector(this.getAttribute('href'));
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Handle contact form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Here you would typically send this data to a server
    console.log('Form submitted:', { name, email, message });

    // Show success message
    alert('Thank you for your message! We will get back to you soon.');
    
    // Reset form
    this.reset();
});

// Animate stats when in viewport
const stats = document.querySelectorAll('.stat-number');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'countUp 2s ease-out forwards';
        }
    });
});

stats.forEach(stat => observer.observe(stat));

// Donation amount selection
const donationAmounts = document.querySelectorAll('.donation-amount');
const customAmount = document.getElementById('customAmount');

donationAmounts.forEach(amount => {
    amount.addEventListener('click', function() {
        donationAmounts.forEach(a => a.classList.remove('selected'));
        this.classList.add('selected');
        customAmount.value = '';
    });
});

// Custom amount handling
customAmount.addEventListener('input', function() {
    // Remove selection from preset amounts when custom amount is entered
    if (this.value) {
        donationAmounts.forEach(amount => amount.classList.remove('selected'));
    }
});

// Donation form submission
document.getElementById('donationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const selectedAmount = document.querySelector('.donation-amount.selected');
    const amount = selectedAmount ? selectedAmount.dataset.amount : customAmount.value;
    const name = document.getElementById('donorName').value;
    const email = document.getElementById('donorEmail').value;
    const phone = document.getElementById('donorPhone').value;

    if (!amount || amount <= 0) {
        alert('Please select or enter a valid donation amount');
        return;
    }

    // Here you would typically integrate with a payment gateway
    console.log('Processing donation:', { amount, name, email, phone });
    
    // Clear all form fields
    this.reset();
    // Remove selected class from donation amounts
    donationAmounts.forEach(a => a.classList.remove('selected'));
    // Clear custom amount
    customAmount.value = '';
    
    alert('Thank you for your donation! You will be redirected to the payment gateway.');
});

// Event registration modal handling
function showEventModal(eventName) {
    const modal = document.getElementById('eventModal');
    document.getElementById('eventName').value = eventName;
    modal.style.display = 'flex';
    
    // Prevent background scrolling when modal is open
    document.body.style.overflow = 'hidden';
}

// Close modal button
document.querySelector('.close-modal').addEventListener('click', function() {
    closeEventModal();
});

// Close modal function
function closeEventModal() {
    const modal = document.getElementById('eventModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    // Clear the form
    document.getElementById('eventRegistrationForm').reset();
}

// Event registration form submission
document.getElementById('eventRegistrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const eventName = document.getElementById('eventName').value;
    const name = document.getElementById('registrantName').value;
    const email = document.getElementById('registrantEmail').value;

    // Basic email validation
    if (!email.includes('@')) {
        alert('Please enter a valid email address');
        return;
    }

    // Here you would typically send this data to your server
    console.log('Event registration:', { eventName, name, email });
    
    alert('Thank you for registering! You will receive a confirmation email shortly.');
    closeEventModal();
    this.reset();
});

// Newsletter subscription
document.getElementById('newsletterForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const emailInput = this.querySelector('input[type="email"]');
    const email = emailInput.value;
    
    // Basic email validation
    if (!email.includes('@')) {
        alert('Please enter a valid email address');
        return;
    }

    // Here you would typically send this to your server
    console.log('Newsletter subscription:', email);
    
    // Clear the form
    this.reset();
    
    alert('Thank you for subscribing to our newsletter!');
});

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    const modal = document.getElementById('eventModal');
    if (e.target === modal) {
        closeEventModal();
    }
});

// Gallery image click handling (if you want to add lightbox functionality)
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        const imgSrc = this.querySelector('img').src;
        console.log('Gallery image clicked:', imgSrc);
        // Here you could implement a lightbox or modal for the gallery
    });
});

// Progress bar animation on scroll
const progressBars = document.querySelectorAll('.progress-fill');
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.width = entry.target.getAttribute('data-width') || '75%';
        }
    });
});

progressBars.forEach(bar => progressObserver.observe(bar));

// Form validation helper
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Add loading state to buttons during form submission
function setLoadingState(button, isLoading) {
    if (isLoading) {
        button.disabled = true;
        button.originalText = button.textContent;
        button.textContent = 'Processing...';
    } else {
        button.disabled = false;
        button.textContent = button.originalText;
    }
}

// Handle mobile menu toggle (if you have a hamburger menu)
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Handle scroll to top button
window.addEventListener('scroll', function() {
    const scrollToTop = document.querySelector('.scroll-to-top');
    if (scrollToTop) {
        if (window.scrollY > 500) {
            scrollToTop.style.display = 'block';
        } else {
            scrollToTop.style.display = 'none';
        }
    }
});