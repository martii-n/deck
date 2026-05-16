document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navMenu = document.querySelector('.nav-menu');
    const container = document.querySelector('.presentation-content');

    // Create nav items (Formal Index Style)
    sections.forEach((section, index) => {
        const title = section.getAttribute('data-title') || `Slide ${index + 1}`;
        const navItem = document.createElement('div');
        navItem.classList.add('nav-item');
        if (index === 0) navItem.classList.add('active', 'completed');
        
        navItem.innerHTML = `
            <span class="nav-number">${(index + 1).toString().padStart(2, '0')}</span>
            <span class="nav-text">${title}</span>
        `;
        
        navItem.addEventListener('click', () => {
            section.scrollIntoView({ behavior: 'smooth' });
        });
        
        navMenu.appendChild(navItem);
    });

    const navItems = document.querySelectorAll('.nav-item');

    // Scroll synchronization
    container.addEventListener('scroll', () => {
        // Update active nav item and LED indicators
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            // If the section is in view
            if (rect.top >= -window.innerHeight / 2 && rect.top <= window.innerHeight / 2) {
                navItems.forEach((item, i) => {
                    item.classList.remove('active');
                    // LED Logic: light up all dots up to the current one
                    if (i <= index) {
                        item.classList.add('completed');
                    } else {
                        item.classList.remove('completed');
                    }
                });
                navItems[index].classList.add('active');
            }
        });
    });

    // Intersection Observer for reveal animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => observer.observe(section));

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
        const currentScroll = container.scrollTop;
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
