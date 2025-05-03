document.addEventListener('DOMContentLoaded', function() {
    // Password visibility toggle
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    // Form validation
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('#email').value;
            const password = this.querySelector('#password').value;
            
            // Basic validation
            if (!email || !password) {
                showError('Please fill in all fields');
                return;
            }
            
            // Email validation
            if (!isValidEmail(email)) {
                showError('Please enter a valid email address');
                return;
            }
            
            // Password validation
            if (password.length < 8) {
                showError('Password must be at least 8 characters long');
                return;
            }
            
            // Here you would typically make an API call to your backend
            console.log('Login attempt:', { email, password });
            
            // Simulate successful login
            showSuccess('Login successful! Redirecting...');
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const firstName = this.querySelector('#firstName').value;
            const lastName = this.querySelector('#lastName').value;
            const email = this.querySelector('#email').value;
            const phone = this.querySelector('#phone').value;
            const password = this.querySelector('#password').value;
            const confirmPassword = this.querySelector('#confirmPassword').value;
            const terms = this.querySelector('input[name="terms"]').checked;
            
            // Basic validation
            if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
                showError('Please fill in all fields');
                return;
            }
            
            // Email validation
            if (!isValidEmail(email)) {
                showError('Please enter a valid email address');
                return;
            }
            
            // Phone validation
            if (!isValidPhone(phone)) {
                showError('Please enter a valid phone number');
                return;
            }
            
            // Password validation
            if (password.length < 8) {
                showError('Password must be at least 8 characters long');
                return;
            }
            
            if (password !== confirmPassword) {
                showError('Passwords do not match');
                return;
            }
            
            if (!terms) {
                showError('Please agree to the Terms of Service and Privacy Policy');
                return;
            }
            
            // Here you would typically make an API call to your backend
            console.log('Registration attempt:', { firstName, lastName, email, phone, password });
            
            // Simulate successful registration
            showSuccess('Registration successful! Redirecting to login...');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        });
    }

    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('#email').value;
            
            // Basic validation
            if (!email) {
                showError('Please enter your email address');
                return;
            }
            
            // Email validation
            if (!isValidEmail(email)) {
                showError('Please enter a valid email address');
                return;
            }
            
            // Here you would typically make an API call to your backend
            console.log('Password reset requested for:', email);
            
            // Simulate successful password reset request
            showSuccess('Password reset instructions have been sent to your email');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 3000);
        });
    }

    // Social login buttons
    const socialButtons = document.querySelectorAll('.social-btn');
    
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const provider = this.classList.contains('google') ? 'Google' : 'Facebook';
            console.log(`${provider} login clicked`);
            // Here you would implement the actual social login functionality
        });
    });

    // Helper functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPhone(phone) {
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        return phoneRegex.test(phone);
    }

    function showError(message) {
        // Create error message element
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        // Add styles
        errorDiv.style.color = 'red';
        errorDiv.style.padding = '1rem';
        errorDiv.style.marginBottom = '1rem';
        errorDiv.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
        errorDiv.style.borderRadius = '5px';
        errorDiv.style.textAlign = 'center';
        
        // Insert error message
        const form = document.querySelector('.auth-form');
        const firstChild = form.firstElementChild;
        form.insertBefore(errorDiv, firstChild);
        
        // Remove error message after 3 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }

    function showSuccess(message) {
        // Create success message element
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        
        // Add styles
        successDiv.style.color = 'green';
        successDiv.style.padding = '1rem';
        successDiv.style.marginBottom = '1rem';
        successDiv.style.backgroundColor = 'rgba(0, 255, 0, 0.1)';
        successDiv.style.borderRadius = '5px';
        successDiv.style.textAlign = 'center';
        
        // Insert success message
        const form = document.querySelector('.auth-form');
        const firstChild = form.firstElementChild;
        form.insertBefore(successDiv, firstChild);
        
        // Remove success message after 3 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }
}); 