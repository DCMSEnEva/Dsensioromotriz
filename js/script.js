// script.js
document.addEventListener(’DOMContentLoaded’, function () {
    // Accordion functionality
    const accordionButtons = document.querySelectorAll(’.accordion-button’);

    accordionButtons.forEach(button => {
        button.addEventListener(’click’, () => {
            // Toggle active class for styling
            button.classList.toggle(’active’);

            // Get the content panel
            const content = button.nextElementSibling;

            // Toggle display
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + “px”;
            }

            // Close other accordions in the same group (optional)
            // This part is to ensure only one accordion item is open at a time within its direct parent
            // For nested accordions, this logic might need adjustment or be removed if independent opening is desired.
            if (!button.classList.contains(’sub-accordion-button’)) { // Apply only to top-level accordions
                 accordionButtons.forEach(otherButton => {
                    if (otherButton !== button && !otherButton.classList.contains(’sub-accordion-button’) && otherButton.parentElement === button.parentElement) {
                        otherButton.classList.remove(’active’);
                        otherButton.nextElementSibling.style.maxHeight = null;
                    }
                });
            } else { // For sub-accordions, close others within the same sub-group
                const parentContent = button.closest(’.accordion-content’);
                if (parentContent) {
                    const siblingSubButtons = parentContent.querySelectorAll(’.sub-accordion-button’);
                    siblingSubButtons.forEach(otherSubButton => {
                         if (otherSubButton !== button) {
                            otherSubButton.classList.remove(’active’);
                            otherSubButton.nextElementSibling.style.maxHeight = null;
                        }
                    });
                }
            }
             // Re-calculate maxHeight if it was just opened
            if (button.classList.contains(’active’)) {
                 content.style.maxHeight = content.scrollHeight + “px”;
            }
        });
    });

    // Modal functionality
    const modalTriggers = document.querySelectorAll(’.modal-trigger’);
    const modals = document.querySelectorAll(’.modal’);
    const closeButtons = document.querySelectorAll(’.close-button’);

    modalTriggers.forEach(trigger => {
        trigger.addEventListener(’click’, () => {
            const modalId = trigger.getAttribute(’data-modal-id’);
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = ‘block’;
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener(’click’, () => {
            const modal = button.closest(’.modal’);
            if (modal) {
                modal.style.display = ‘none’;
            }
        });
    });

    // Close modal when clicking outside of it
    window.addEventListener(’click’, (event) => {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = ‘none’;
            }
        });
    });

    // Scroll Spy for navigation
    const navLinks = document.querySelectorAll(’header nav ul li a’);
    const sections = document.querySelectorAll(’main section’);

    function activateNavLink() {
        let currentSectionId = ‘’;
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 70; // Adjusted for sticky header height
            if (pageYOffset >= sectionTop) {
                currentSectionId = section.getAttribute(’id’);
            }
        });

        navLinks.forEach(link => {
            link.classList.remove(’active-link’);
            if (link.getAttribute(’href’) === ‘#’ + currentSectionId) {
                link.classList.add(’active-link’);
            }
        });
    }
    window.addEventListener(’scroll’, activateNavLink);
    activateNavLink(); // Call on load
});

