document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Smooth scrolling and active link highlighting for navigation
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    const headerElement = document.querySelector('header');
    const headerOffset = headerElement ? headerElement.offsetHeight : 70; // Fallback offset

    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');

                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Optional: Update active nav link on scroll
    const sections = document.querySelectorAll('section[id]');

    function updateActiveLinkOnScroll() {
        let index = sections.length;

        while (--index && window.scrollY + headerOffset * 2 < sections[index].offsetTop) {} // Check a bit below header

        navLinks.forEach((link) => link.classList.remove('active'));
        // Ensure the link corresponding to the current section (if any) gets the active class
        if (index >= 0 && navLinks[index]) { // Check if sections[index] and corresponding navLink exist
            const activeLink = document.querySelector(`nav a[href="#${sections[index].id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        } else if (window.scrollY < sections[0].offsetTop) { // If above the first section, make first link active
            const firstLink = document.querySelector('nav a[href="#about"]'); // Assuming 'about' is first
            if (firstLink) {
                firstLink.classList.add('active');
            }
        }
    }

    // Initial call to set active link based on hash or scroll position
    if (window.location.hash) {
        const activeLinkFromHash = document.querySelector(`nav a[href="${window.location.hash}"]`);
        if (activeLinkFromHash) {
            navLinks.forEach(link => link.classList.remove('active'));
            activeLinkFromHash.classList.add('active');
        }
    } else {
        updateActiveLinkOnScroll(); // Set initial active link if no hash
    }

    window.addEventListener('scroll', updateActiveLinkOnScroll);
});