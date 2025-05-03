document.addEventListener('DOMContentLoaded', function() {
    // Animate service cards on scroll
    const serviceCards = document.querySelectorAll('.service-card');
    const serviceItems = document.querySelectorAll('.service-item');
    const processSteps = document.querySelectorAll('.process-step');
    
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

    // Function to animate elements
    function animateElements(elements, animationClass) {
        elements.forEach((element) => {
            if (isInViewport(element)) {
                element.classList.add('fade-in', 'visible');
            }
        });
    }

    // Add initial styles for animations
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease-out';
    });

    serviceItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.5s ease-out';
    });

    processSteps.forEach(step => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(20px)';
        step.style.transition = 'all 0.5s ease-out';
    });

    // Add scroll event listeners
    window.addEventListener('scroll', function() {
        animateElements(serviceCards, 'fade-in');
        animateElements(serviceItems, 'fade-in');
        animateElements(processSteps, 'fade-in');
    });

    // Trigger animations on initial load if elements are in viewport
    animateElements(serviceCards, 'fade-in');
    animateElements(serviceItems, 'fade-in');
    animateElements(processSteps, 'fade-in');

    // Add hover effect to service cards
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add hover effect to service items
    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    document.querySelectorAll('.service-card, .service-item, .process-step').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        el.classList.add('fade-in', 'visible');
    });
}); 