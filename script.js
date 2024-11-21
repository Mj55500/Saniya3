document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    document.getElementById('successMessage').classList.remove('hidden');
    this.reset(); 
});