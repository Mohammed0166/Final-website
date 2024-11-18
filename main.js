// Navigation active state
document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        if(item.getAttribute('href') === currentPath.split('/').pop()) {
            item.classList.add('active');
        }
    });
});

// Gallery image slider
function initializeGallery() {
    const slides = document.querySelectorAll('.gallery-slide');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.style.display = 'none');
        slides[index].style.display = 'block';
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function previousSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Event listeners for navigation arrows
    const prevButton = document.querySelector('.nav-arrow.left');
    const nextButton = document.querySelector('.nav-arrow.right');
    
    if(prevButton && nextButton) {
        prevButton.addEventListener('click', previousSlide);
        nextButton.addEventListener('click', nextSlide);
    }

    // Auto-advance slides every 5 seconds
    setInterval(nextSlide, 5000);
    
    // Initial display
    showSlide(currentSlide);
}

// Settings page functionality
function initializeSettings() {
    const darkModeToggle = document.querySelector('#darkModeToggle');
    const fontSizeSelect = document.querySelector('#fontSizeSelect');
    
    if(darkModeToggle) {
        darkModeToggle.addEventListener('change', function() {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', darkModeToggle.checked);
        });
    }

    if(fontSizeSelect) {
        fontSizeSelect.addEventListener('change', function() {
            document.body.style.fontSize = this.value;
            localStorage.setItem('fontSize', this.value);
        });
    }

    // Load saved settings
    const savedDarkMode = localStorage.getItem('darkMode');
    const savedFontSize = localStorage.getItem('fontSize');
    
    if(savedDarkMode && darkModeToggle) {
        darkModeToggle.checked = savedDarkMode === 'true';
        document.body.classList.toggle('dark-mode', savedDarkMode === 'true');
    }
    
    if(savedFontSize && fontSizeSelect) {
        fontSizeSelect.value = savedFontSize;
        document.body.style.fontSize = savedFontSize;
    }
}

// Search functionality
function initializeSearch() {
    const searchInput = document.querySelector('#searchInput');
    if(searchInput) {
        searchInput.addEventListener('input', debounce(function() {
            const searchTerm = this.value.toLowerCase();
            const searchableElements = document.querySelectorAll('.searchable');
            
            searchableElements.forEach(element => {
                const text = element.textContent.toLowerCase();
                element.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        }, 300));
    }
}

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeGallery();
    initializeSettings();
    initializeSearch();
});
window.onerror = function(msg, url, line) {
    console.error('Error: ' + msg + '\nURL: ' + url + '\nLine: ' + line);
    // Show user-friendly error message
    alert('Something went wrong. Please try again later.');
    return false;
};
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});