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

// Food Nutrition API
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('foodSearchForm').addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Form submitted');

        const query = document.getElementById('foodQuery').value;
        const resultsContainer = document.getElementById('foodResults');
        resultsContainer.innerText = 'Searching...';

        const apiKey = '7TwoV6oQytIfLd7zd5KFhgGG1MI5wxATID1r1HSH'; // Your API Key

        fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${apiKey}&query=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(data => {
                if (data.foods && data.foods.length > 0) {
                    const food = data.foods[0]; // Show first result
                    const fdcId = food.fdcId;

                    return fetch(`https://api.nal.usda.gov/fdc/v1/food/${fdcId}?api_key=${apiKey}`);
                } else {
                    throw new Error('No results found.');
                }
            })
            .then(response => response.json())
            .then(details => {
                const nutrientsList = details.foodNutrients.map(n => `
                    <li>${n.nutrientName}: ${n.value} ${n.unitName}</li>
                `).join('');

                resultsContainer.innerHTML = `
                    <h3>${details.description}</h3>
                    <ul>${nutrientsList}</ul>
                `; 
            })
            .catch(error => {
                console.error(error);
                resultsContainer.innerText = 'No nutrition info found or there was an error.';
            });
    });
});