// Modal functionality
const modal = document.getElementById('myModal');
const openModal = document.getElementById('openModal');
const closeModal = document.getElementById('closeModal');

openModal.addEventListener('click', () => {
    modal.classList.add('show');
});

closeModal.addEventListener('click', () => {
    modal.classList.remove('show');
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
    }
});

// Accordion functionality
const accordionBtns = document.querySelectorAll('.accordion-btn');

accordionBtns.forEach(button => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling;

        // Close all other accordions
        accordionBtns.forEach(btn => {
            const otherContent = btn.nextElementSibling;
            if (btn !== button && otherContent.classList.contains('open')) {
                otherContent.style.maxHeight = null;
                otherContent.classList.remove('open');
            }
        });

        // Toggle current accordion
        if (content.classList.contains('open')) {
            content.style.maxHeight = null;
            content.classList.remove('open');
        } else {
            content.classList.add('open');
            content.style.maxHeight = content.scrollHeight + 'px';
        }
    });
});

// Form Validation 
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        let isValid = true;  // Flag to check if all inputs are valid

        // Loop through all required inputs
        form.querySelectorAll('input[required]').forEach(input => {
            if (!input.value) {
                input.style.borderColor = 'red'; // Highlight the empty input
                isValid = false; // Set validation flag to false
            } else {
                input.style.borderColor = 'green'; // Highlight valid input
            }
        });

        // If form is invalid, prevent submission and show alert
        if (!isValid) {
            e.preventDefault();  // Prevent form submission
            alert("Please fill out all required fields.");
        }
    });
});