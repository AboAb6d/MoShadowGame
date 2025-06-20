document.addEventListener('DOMContentLoaded', () => {
    console.log("JavaScript for Abo Abed Blog initialized and DOM fully loaded.");

    // --- Theme Toggle (Dark/Light Mode) ---
    const themeToggleButton = document.getElementById('theme-toggle');
    const bodyElement = document.body;
    const currentTheme = localStorage.getItem('theme');

    // Apply saved theme on load
    if (currentTheme) {
        bodyElement.classList.add(currentTheme); // Assumes 'dark-mode' is the class for dark theme
        if (currentTheme === 'dark-mode') {
            if (themeToggleButton) themeToggleButton.textContent = 'وضع الإضاءة';
        } else {
            if (themeToggleButton) themeToggleButton.textContent = 'الوضع الداكن';
        }
    } else {
        // Default to light mode if no theme is saved
        if (themeToggleButton) themeToggleButton.textContent = 'الوضع الداكن';
    }

    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            bodyElement.classList.toggle('dark-mode');
            let themeToSave = 'light-mode'; // Default to light
            if (bodyElement.classList.contains('dark-mode')) {
                themeToggleButton.textContent = 'وضع الإضاءة';
                themeToSave = 'dark-mode';
            } else {
                themeToggleButton.textContent = 'الوضع الداكن';
                // localStorage.removeItem('theme'); // Or explicitly set to light-mode
            }
            localStorage.setItem('theme', themeToSave);
        });
    } else {
        console.warn("Theme toggle button #theme-toggle not found.");
    }

    // --- Back to Top Button ---
    const backToTopButton = document.getElementById('back-to-top');

    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 200) { // Show button after scrolling 200px
                backToTopButton.classList.add('show-back-to-top');
            } else {
                backToTopButton.classList.remove('show-back-to-top');
            }
        });

        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent any default anchor behavior
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    } else {
        console.warn("Back to top button #back-to-top not found. Ensure it's added to HTML.");
    }

    // --- Contact Form Submission (Placeholder) ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent actual submission for now

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            const formStatus = document.getElementById('form-status');

            if (!name || !email || !subject || !message) {
                formStatus.textContent = 'يرجى ملء جميع الحقول المطلوبة.';
                formStatus.className = 'form-status-message error';
                return;
            }

            // Simulate form submission
            console.log('Form submitted (simulated):', { name, email, subject, message });
            formStatus.textContent = 'تم إرسال رسالتك بنجاح (تجريبي)!';
            formStatus.className = 'form-status-message success';

            // Clear the form (optional)
            // contactForm.reset();

            // Hide the message after a few seconds
            setTimeout(() => {
                formStatus.textContent = '';
                formStatus.className = 'form-status-message';
            }, 5000);
        });
    }

    // --- Tools Page Tabs/Filters (Placeholder for functionality) ---
    const tabButtons = document.querySelectorAll('.tabs .tab-button');
    const toolCards = document.querySelectorAll('.extensive-tools-grid .tool-card');

    if (tabButtons.length > 0 && toolCards.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Deactivate all buttons
                tabButtons.forEach(btn => btn.classList.remove('active'));
                // Activate clicked button
                button.classList.add('active');

                const filter = button.getAttribute('data-filter');

                toolCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = ''; // Show card
                    } else {
                        card.style.display = 'none'; // Hide card
                    }
                });
            });
        });
    }

    // --- Search Tools (Placeholder for functionality) ---
    const toolsPageSearchInput = document.querySelector('.search-tools'); // Specifically for tools page
    if (toolsPageSearchInput && toolCards.length > 0) {
        toolsPageSearchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            toolCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // --- Hidden Admin Login Access from Blog Search Bar ---
    const blogSearchForm = document.getElementById('blog-search-form');
    const blogSearchInput = document.getElementById('blog-search-input');

    if (blogSearchForm && blogSearchInput) {
        blogSearchForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent actual search submission
            const searchTerm = blogSearchInput.value.trim();
            if (searchTerm === 'launch-access-mas-secret-login') {
                // Determine the correct path to admin_login.html
                // Assuming main.js is in abo_abed_blog/js/ and admin_login.html is in abo_abed_blog/pages/
                let adminLoginPath = 'pages/admin_login.html';

                // If main.js is loaded from a file within the 'pages' directory (which it isn't for index.html)
                // this logic would need to be smarter or the path made absolute.
                // For index.html, 'pages/admin_login.html' is correct.
                // For pages within 'pages/', it would be 'admin_login.html'.
                // However, this search bar is only on index.html for now.

                window.location.href = adminLoginPath;
            } else {
                // Implement actual search functionality or display "No results"
                console.log("Performing blog search for:", searchTerm);
                alert(`البحث عن: ${searchTerm} (وظيفة البحث لم تنفذ بعد)`);
                blogSearchInput.value = ''; // Clear input after "search"
            }
        });
    } else {
        console.warn("Blog search form #blog-search-form or input #blog-search-input not found in this page.");
    }
});
