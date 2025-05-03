document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('consultation-form');
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Thank you for your inquiry! We will contact you shortly.';
    form.parentNode.insertBefore(successMessage, form);

    // Form validation
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset previous error states
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.remove());
        
        const inputs = form.querySelectorAll('input, select, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            input.classList.remove('error');
            
            if (input.hasAttribute('required') && !input.value.trim()) {
                isValid = false;
                input.classList.add('error');
                const errorMsg = document.createElement('div');
                errorMsg.className = 'error-message visible';
                errorMsg.textContent = 'This field is required';
                input.parentNode.appendChild(errorMsg);
            }
            
            if (input.type === 'email' && input.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    isValid = false;
                    input.classList.add('error');
                    const errorMsg = document.createElement('div');
                    errorMsg.className = 'error-message visible';
                    errorMsg.textContent = 'Please enter a valid email address';
                    input.parentNode.appendChild(errorMsg);
                }
            }
            
            if (input.type === 'tel' && input.value.trim()) {
                const phoneRegex = /^[\d\s-+()]+$/;
                if (!phoneRegex.test(input.value)) {
                    isValid = false;
                    input.classList.add('error');
                    const errorMsg = document.createElement('div');
                    errorMsg.className = 'error-message visible';
                    errorMsg.textContent = 'Please enter a valid phone number';
                    input.parentNode.appendChild(errorMsg);
                }
            }
        });
        
        if (isValid) {
            // Simulate form submission
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // In a real application, you would send this data to your server
            console.log('Form data:', data);
            
            // Show success message
            successMessage.classList.add('visible');
            form.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.classList.remove('visible');
            }, 5000);
        }
    });

    // Date input validation
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date();
        const minDate = new Date(today);
        minDate.setDate(today.getDate() + 1); // Minimum date is tomorrow
        
        dateInput.min = minDate.toISOString().split('T')[0];
        
        dateInput.addEventListener('input', function() {
            const selectedDate = new Date(this.value);
            if (selectedDate < minDate) {
                this.value = minDate.toISOString().split('T')[0];
            }
        });
    }
}); 