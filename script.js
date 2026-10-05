// Part 1: Smooth-scroll navigation.
const navLinks = document.querySelectorAll('.nav-link');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

function closeMenu() {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
}

navLinks.forEach(link => {
    link.addEventListener('click', event => {
        const targetSection = document.querySelector(link.getAttribute('href'));
        if (targetSection) {
            event.preventDefault();
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            closeMenu();
        }
    });
});

// Part 2: Show only projects matching the selected category.
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

function filterProjects(category) {
    projectCards.forEach(card => {
        const matches = category === 'all' || card.dataset.category === category;
        card.style.display = matches ? '' : 'none';
    });
}

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(filterButton => {
            filterButton.classList.remove('active');
            filterButton.setAttribute('aria-pressed', 'false');
        });
        button.classList.add('active');
        button.setAttribute('aria-pressed', 'true');
        filterProjects(button.dataset.filter);
    });
    button.setAttribute('aria-pressed', String(button.classList.contains('active')));
});

// Part 3: Open/close the mobile menu and keep its button state in sync.
navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('active');
    navToggle.classList.toggle('active', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
});

document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMenu();
        navToggle.focus();
    }
});
