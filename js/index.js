document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in class to elements for scroll animation
    // const sections = document.querySelectorAll('section');
    // sections.forEach(section => {
    //     section.classList.add('fade-in');
    // });

    // Hero section typing effect
    const heroText = document.querySelector('.hero-content h1');
    if (heroText) {
        const originalText = heroText.textContent;
        heroText.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < originalText.length) {
                heroText.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        typeWriter();
    }

    // Service cards hover effect
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Remove smooth scroll and preventDefault for nav links
    // Navigation links now use default browser navigation
}); 