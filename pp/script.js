const themeToggle = document.querySelector('.theme-toggle');
        const navbar = document.querySelector('.navbar');
        const mobileMenuBtn = document.querySelector('.mobile-menu');
        const navLinks = document.querySelector('.nav-links');

        themeToggle.addEventListener('click', () => {
            document.body.dataset.theme = document.body.dataset.theme === 'light' ? 'dark' : 'light';
            themeToggle.innerHTML = document.body.dataset.theme === 'light' 
                ? '<i class="fas fa-moon"></i>' 
                : '<i class="fas fa-sun"></i>';
            
            // Save preference to localStorage
            localStorage.setItem('theme', document.body.dataset.theme);
        });

        // Check for saved theme preference
        if (localStorage.getItem('theme')) {
            document.body.dataset.theme = localStorage.getItem('theme');
            themeToggle.innerHTML = document.body.dataset.theme === 'light' 
                ? '<i class="fas fa-moon"></i>' 
                : '<i class="fas fa-sun"></i>';
        }

        // Mobile Menu Toggle
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Active link highlighting based on scroll position
        const sections = document.querySelectorAll('section');
        const navLinksList = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= (sectionTop - 100)) {
                    current = section.getAttribute('id');
                }
            });

            navLinksList.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        });

        // Form submission handler
        const contactForm = document.getElementById('contactForm');
        const formStatus = document.getElementById('formStatus');

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            
            try {
                formStatus.textContent = 'Sending message...';
                formStatus.style.color = 'var(--primary-color)';
                
                // Replace with your actual API endpoint
                const response = await fetch('https://your-backend-api.com/contact', {
                    method: 'POST',
                    body: JSON.stringify({
                        name: formData.get('name'),
                        email: formData.get('email'),
                        subject: formData.get('subject'),
                        message: formData.get('message')
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    formStatus.textContent = 'Message sent successfully!';
                    formStatus.style.color = 'green';
                    contactForm.reset();
                } else {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                console.error('Error:', error);
                formStatus.textContent = 'Failed to send message. Please try again later.';
                formStatus.style.color = 'red';
            }
            
            // Clear message after 5 seconds
            setTimeout(() => {
                formStatus.textContent = '';
            }, 5000);
        });