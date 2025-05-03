document.addEventListener('DOMContentLoaded', function() {
    // Animate stats on scroll
    const statCards = document.querySelectorAll('.stat-card');
    const teamMembers = document.querySelectorAll('.team-member');
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Function to animate stats
    function animateStats() {
        statCards.forEach(card => {
            const number = card.querySelector('h3');
            const originalText = number.textContent;
            // Only animate if the text is a pure number (no symbols, no letters)
            if (/^\d+$/.test(originalText)) {
                const target = parseInt(originalText);
                let current = 0;
                const increment = target / 50;
                const duration = 2000;
                const interval = duration / 50;

                const counter = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        number.textContent = target;
                        clearInterval(counter);
                    } else {
                        number.textContent = Math.floor(current);
                    }
                }, interval);
            } else {
                // Leave non-numeric values as-is
                number.textContent = originalText;
            }
            // Remove event listener after animation
            window.removeEventListener('scroll', animateStats);
        });
    }

    // Function to animate team members
    function animateTeamMembers() {
        teamMembers.forEach((member, index) => {
            if (isInViewport(member)) {
                setTimeout(() => {
                    member.style.opacity = '1';
                    member.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }

    // Initial styles for team members
    teamMembers.forEach(member => {
        member.style.opacity = '0';
        member.style.transform = 'translateY(20px)';
        member.style.transition = 'all 0.5s ease-out';
    });

    // Add scroll event listeners
    window.addEventListener('scroll', animateStats);
    window.addEventListener('scroll', animateTeamMembers);

    // Trigger animations on initial load if elements are in viewport
    animateStats();
    animateTeamMembers();

    // Add hover effect to social links
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
        });
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}); 