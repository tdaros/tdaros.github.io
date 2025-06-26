document.addEventListener('DOMContentLoaded', function() {
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    const headerElement = document.querySelector('header');
    const headerOffset = headerElement ? headerElement.offsetHeight : 70;

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

    const sections = document.querySelectorAll('section[id]');

    function updateActiveLinkOnScroll() {
        let index = sections.length;

        while (--index && window.scrollY + headerOffset * 2 < sections[index].offsetTop) {}

        navLinks.forEach((link) => link.classList.remove('active'));
        if (index >= 0 && navLinks[index]) {
            const activeLink = document.querySelector(`nav a[href="#${sections[index].id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        } else if (window.scrollY < sections[0].offsetTop) {
            const firstLink = document.querySelector('nav a[href="#about"]');
            if (firstLink) {
                firstLink.classList.add('active');
            }
        }
    }

    if (window.location.hash) {
        const activeLinkFromHash = document.querySelector(`nav a[href="${window.location.hash}"]`);
        if (activeLinkFromHash) {
            navLinks.forEach(link => link.classList.remove('active'));
            activeLinkFromHash.classList.add('active');
        }
    } else {
        updateActiveLinkOnScroll();
    }

    window.addEventListener('scroll', updateActiveLinkOnScroll);
});
