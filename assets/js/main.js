/**
 * Main JavaScript functionality for the website
 * Handles mobile menu, portfolio filtering, and other interactive elements
 */

document.addEventListener('DOMContentLoaded', () => {
    // ========== Mobile Menu Toggle ==========
    const mobileMenuToggle = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking anywhere else
    document.addEventListener('click', (e) => {
        if (navList && navList.classList.contains('active') && 
            !e.target.closest('.nav-list') && 
            !e.target.closest('.menu-toggle')) {
            navList.classList.remove('active');
            if (mobileMenuToggle) {
                mobileMenuToggle.classList.remove('active');
            }
        }
    });

    // ========== Portfolio Filtering ==========
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length && projectCards.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Get filter value
                const filterValue = button.getAttribute('data-filter');
                
                // Filter projects
                projectCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // ========== Blog Search Functionality ==========
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    const blogCards = document.querySelectorAll('.blog-card');

    if (searchInput && searchBtn && blogCards.length) {
        // Function to perform search
        const performSearch = () => {
            const searchTerm = searchInput.value.toLowerCase().trim();
            
            // If search term is empty, show all blog cards
            if (searchTerm === '') {
                blogCards.forEach(card => {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 10);
                });
                return;
            }
            
            // Filter blog cards based on search term
            blogCards.forEach(card => {
                const title = card.querySelector('h2').textContent.toLowerCase();
                const content = card.querySelector('p').textContent.toLowerCase();
                const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
                
                // Check if search term is in title, content, or tags
                if (title.includes(searchTerm) || 
                    content.includes(searchTerm) || 
                    tags.some(tag => tag.includes(searchTerm))) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        };
        
        // Search button click event
        searchBtn.addEventListener('click', performSearch);
        
        // Search on Enter key press
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    // ========== Contact Form Validation ==========
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form fields
            const nameInput = contactForm.querySelector('#name');
            const emailInput = contactForm.querySelector('#email');
            const subjectInput = contactForm.querySelector('#subject');
            const messageInput = contactForm.querySelector('#message');
            
            // Simple validation
            let isValid = true;
            
            if (nameInput.value.trim() === '') {
                isValid = false;
                showError(nameInput, 'Name is required');
            } else {
                removeError(nameInput);
            }
            
            if (emailInput.value.trim() === '') {
                isValid = false;
                showError(emailInput, 'Email is required');
            } else if (!isValidEmail(emailInput.value)) {
                isValid = false;
                showError(emailInput, 'Please enter a valid email');
            } else {
                removeError(emailInput);
            }
            
            if (subjectInput.value.trim() === '') {
                isValid = false;
                showError(subjectInput, 'Subject is required');
            } else {
                removeError(subjectInput);
            }
            
            if (messageInput.value.trim() === '') {
                isValid = false;
                showError(messageInput, 'Message is required');
            } else {
                removeError(messageInput);
            }
            
            // If form is valid, submit it (or show success message)
            if (isValid) {
                // In a real application, you would send the form data to a server
                // For this example, just show a success message
                const formContainer = contactForm.parentElement;
                formContainer.innerHTML = `
                    <div class="success-message">
                        <i class="fas fa-check-circle"></i>
                        <h2>Message Sent!</h2>
                        <p>Thank you for your message. I will get back to you as soon as possible.</p>
                    </div>
                `;
            }
        });
        
        // Helper functions for form validation
        function showError(input, message) {
            const formGroup = input.parentElement;
            const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
            
            errorElement.className = 'error-message';
            errorElement.textContent = message;
            
            if (!formGroup.querySelector('.error-message')) {
                formGroup.appendChild(errorElement);
            }
            
            input.classList.add('error');
        }
        
        function removeError(input) {
            const formGroup = input.parentElement;
            const errorElement = formGroup.querySelector('.error-message');
            
            if (errorElement) {
                formGroup.removeChild(errorElement);
            }
            
            input.classList.remove('error');
        }
        
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
    }

    // ========== Typing Effect for Hero Text ==========
    const heroTitle = document.querySelector('.hero h1');
    
    if (heroTitle) {
        const text = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start the typing effect with a delay
        setTimeout(typeWriter, 500);
    }

    // ========== Glitch Effect for Logo ==========
    const logo = document.querySelector('.logo');
    
    if (logo) {
        // Add glitch effect on hover
        logo.addEventListener('mouseover', () => {
            logo.classList.add('glitch');
        });
        
        logo.addEventListener('mouseout', () => {
            logo.classList.remove('glitch');
        });
        
        // Also add random glitch effect every few seconds
        setInterval(() => {
            if (!logo.classList.contains('glitch')) {
                logo.classList.add('glitch');
                setTimeout(() => {
                    logo.classList.remove('glitch');
                }, 200);
            }
        }, 5000);
    }
}); 