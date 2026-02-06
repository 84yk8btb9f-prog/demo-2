console.log('Apex Consulting script loaded');

let currentLang = 'en';

document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded, initializing...');
    
    // Initialize language switcher
    const langButtons = document.querySelectorAll('.lang-btn');
    console.log('Found language buttons:', langButtons.length);
    
    // Set English as active by default
    langButtons.forEach(btn => {
        if (btn.getAttribute('data-lang') === 'en') {
            btn.classList.add('active');
        }
    });
    
    // Add click handlers to language buttons
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            console.log('Language button clicked:', lang);
            
            // Update active state
            langButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Switch language
            currentLang = lang;
            applyLanguage(lang);
        });
    });
    
    // Apply default language
    applyLanguage('en');
    
    // Initialize other features
    initMobileMenu();
    initContactForm();
});

function applyLanguage(lang) {
    console.log('Applying language:', lang);
    
    // Find all elements with language data
    const allElements = document.querySelectorAll('[data-en][data-gr]');
    console.log('Found translatable elements:', allElements.length);
    
    allElements.forEach(element => {
        const text = element.getAttribute('data-' + lang);
        
        if (element.tagName === 'INPUT' && element.type === 'text') {
            element.placeholder = text;
        } else if (element.tagName === 'TEXTAREA') {
            element.placeholder = text;
        } else if (element.tagName === 'SELECT') {
            // For select options
            if (element.options) {
                Array.from(element.options).forEach(option => {
                    const optionText = option.getAttribute('data-' + lang);
                    if (optionText) {
                        option.textContent = optionText;
                    }
                });
            }
        } else {
            element.textContent = text;
        }
    });
    
    console.log('Language applied successfully');
}

// Mobile menu
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }
}

// Contact form
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        console.log('Contact form found, adding handler');
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submitted');
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const company = document.getElementById('company') ? document.getElementById('company').value : '';
            const service = document.getElementById('service') ? document.getElementById('service').value : '';
            
            let message;
            if (currentLang === 'en') {
                message = `Thank you ${name}!\n\nYour consultation request has been received.\n\nDetails:\n• Email: ${email}\n• Phone: ${phone}${company ? '\n• Company: ' + company : ''}${service ? '\n• Service: ' + service : ''}\n\nOur team will contact you within 24 hours to schedule your free consultation.`;
            } else {
                message = `Ευχαριστούμε ${name}!\n\nΤο αίτημα συνάντησής σας έχει ληφθεί.\n\nΛεπτομέρειες:\n• Email: ${email}\n• Τηλέφωνο: ${phone}${company ? '\n• Εταιρεία: ' + company : ''}${service ? '\n• Υπηρεσία: ' + service : ''}\n\nΗ ομάδα μας θα επικοινωνήσει μαζί σας εντός 24 ωρών για να προγραμματίσει τη δωρεάν συνάντησή σας.`;
            }
            
            alert(message);
            form.reset();
        });
    }
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
        }
    }
});