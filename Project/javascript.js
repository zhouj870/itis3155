// Modal functionality
const modal = document.getElementById('myModal');
const openModal = document.getElementById('openModal');
const closeModal = document.getElementById('closeModal');

openModal.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
});

// Accordion functionality
const accordionBtns = document.querySelectorAll('.accordion-btn');

accordionBtns.forEach(button => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling;
        
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
});