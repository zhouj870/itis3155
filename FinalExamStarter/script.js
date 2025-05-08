// JavaScript code to handle the review submission and display
const btn = document.querySelector('button');
const form = document.querySelector('form');
const stats = document.getElementById('stats');
const reviewsContainer = document.querySelector('.feedback'); 

btn.addEventListener('click', (event) => {
    event.preventDefault(); 
    // Get form values
    const ratingInput = form.querySelector('input[id="rating"]');
    const feedbackInput = form.querySelector('textarea[id="feedback"]');
    const rating = parseInt(ratingInput.value);
    const feedback = feedbackInput.value.trim();

    // Validate form fields
    if (isNaN(rating) || rating < 1 || rating > 5 || feedback === '') {
        alert('Please provide a valid rating (1-5) and feedback.');
        return;
    }

    // Create a new review element
    const review = document.createElement('div'); 

    // Add stars to the review
    const starContainer = document.createElement('div');
    starContainer.classList.add('star-container');
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('i');
        if (i <= rating) {
            star.classList.add('fa-solid', 'fa-star'); // Solid star
        } else {
            star.classList.add('fa-regular', 'fa-star'); // Outline star
        }
        starContainer.appendChild(star);
    }

    // Add feedback text
    const feedbackText = document.createElement('p');
    feedbackText.textContent = feedback;

    // Append stars and feedback to the review
    review.appendChild(starContainer);
    review.appendChild(feedbackText);

    // Append the review to the reviews container
    reviewsContainer.appendChild(review);

    // Update stats
    const totalReviewsElement = stats.querySelector('#total'); // Assuming this element has an ID of 'total'
    const averageRatingElement = stats.querySelector('#average'); // Assuming this element has an ID of 'average'

    const currentTotal = parseInt(totalReviewsElement.textContent);
    const currentAverage = parseFloat(averageRatingElement.textContent);

    const newTotal = currentTotal + 1;
    const newAverage = ((currentAverage * currentTotal) + rating) / newTotal;

    totalReviewsElement.textContent = newTotal;
    averageRatingElement.textContent = newAverage.toFixed(1);

    // Clear form inputs
    ratingInput.value = '';
    feedbackInput.value = '';
});