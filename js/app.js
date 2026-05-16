document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navDotsContainer = document.querySelector('.nav-indicator');

    // Create nav dots
    sections.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('nav-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            sections[index].scrollIntoView({ behavior: 'smooth' });
        });
        navDotsContainer.appendChild(dot);
    });

    const navDots = document.querySelectorAll('.nav-dot');

    // Intersection Observer for active state and reveal animations
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Update dots
                const index = Array.from(sections).indexOf(entry.target);
                navDots.forEach(dot => dot.classList.remove('active'));
                navDots[index].classList.add('active');

                // Trigger animations
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
        const activeSection = document.querySelector('section:hover') || sections[0]; // fallback
        // Simple logic for next/prev based on scroll position
        const currentScroll = document.querySelector('.presentation-container').scrollTop;
        const windowHeight = window.innerHeight;
        const currentIndex = Math.round(currentScroll / windowHeight);

        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            if (currentIndex < sections.length - 1) {
                sections[currentIndex + 1].scrollIntoView({ behavior: 'smooth' });
            }
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            if (currentIndex > 0) {
                sections[currentIndex - 1].scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});
