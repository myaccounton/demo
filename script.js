// Form submission handler (client-side only, no backend)
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simple validation (HTML5 validation already handles required fields)
    if (name && email && message) {
        // Show success message
        alert('Thank you for your message, ' + name + '! We will get back to you soon.\n\nNote: This is a demo form with no backend. In a real application, this would send your message to our support team.');
        
        // Reset form
        document.getElementById('contactForm').reset();
    }
});

