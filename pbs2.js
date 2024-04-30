document.addEventListener('DOMContentLoaded', function() {
    const feedbackForm = document.getElementById('feedback-form');
    
    feedbackForm.addEventListener('submit', function(event) {
        event.preventDefault();
    
        const feedbackInput = document.getElementById('feedback');
        const feedbackValue = feedbackInput.value.trim();
        if (feedbackValue === '') {
            alert('Please enter your feedback.');
            feedbackInput.focus();
            return;
        }
        showThankYouMessage();
    });
    
    function showThankYouMessage() {
        alert('Thank you for using this system and providing your feedback!');
    }
    
    const bookParkingButton = document.getElementById('book-parking-btn');
    
    bookParkingButton.addEventListener('click', function() {
        window.location.href = 'index.html';
    });
});
