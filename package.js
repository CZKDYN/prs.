document.addEventListener('DOMContentLoaded', function() {
  const feedbackButton = document.getElementById('feedback-btn');

  if (feedbackButton) {
      feedbackButton.addEventListener('click', function() {
          window.location.href = 'pbs2.html'; 
      });
  }

  const unavailableSlots = [2, 5, 7];
  const slotButtons = document.querySelectorAll('.slot-btn');
  let slotSelected = false; // Flag to track whether a slot button has been selected

  function handleSlotClick(button) {
    const slotNumber = parseInt(button.innerText);
    const slotBooked = unavailableSlots.includes(slotNumber);

    if (!slotSelected && !slotBooked) { // Check if no slot has been selected and the slot is available
      slotSelected = true; // Set the flag to true
      button.style.backgroundColor = 'red'; // Highlight the selected button

      const slotInput = document.querySelector('#selected-slot');
      slotInput.value = slotNumber;

      slotButtons.forEach((button) => {
        if (button !== this) {
          button.removeEventListener('click', handleSlotClick); // Remove click event listeners from all other slots
          button.disabled = true; // Disable all other slots
        }
      });

      button.classList.add('selected');
    }
  }

  slotButtons.forEach((button) => {
    button.addEventListener('click', () => handleSlotClick(button));
  });

  const bookingForm = document.getElementById('booking-form');

  bookingForm.addEventListener('submit', function(event) {
      event.preventDefault();

      const formData = new FormData(bookingForm);
      const phone = formData.get('contact');

      if (!isValidPhoneNumber(phone)) {
          alert('Please enter a valid Philippine phone number with 11 digits.');
          return;
      }

      const slotNumber = formData.get('selected-slot');

      if (unavailableSlots.includes(parseInt(slotNumber))) {
          alert(`Slot ${slotNumber} is unavailable! Please select another slot.`);
      } else {
          alert(`Booking successful! Slot ${slotNumber} has been reserved for you.`);

          // Reset the form
          bookingForm.reset();

          // Reset slot selection flag and enable all slot buttons
          slotSelected = false;
          slotButtons.forEach((button) => {
            button.addEventListener('click', () => handleSlotClick(button)); // Add click event listeners back to all slot buttons
            button.disabled = false; // Enable all slot buttons
          });

          // Open other slot buttons
          slotButtons.forEach((button) => {
            button.style.display = 'block';
          });

          // Open remaining slot buttons
          openRemainingSlotButtons(slotNumber);

          // Check if all slots are booked and refresh the page if needed
          if (areAllSlotsBooked()) {
            alert('There are no remaining slots available.');
          }
      }
  });

  function areAllSlotsBooked() {
    return Array.from(slotButtons).every(button => unavailableSlots.includes(parseInt(button.innerText)));
  }

  function openRemainingSlotButtons(selectedSlotNumber) {
    slotButtons.forEach((button) => {
      const slotNumber = parseInt(button.innerText);
      if (slotNumber !== selectedSlotNumber && !unavailableSlots.includes(slotNumber)) {
        button.style.display = 'block';
        button.disabled = false;
      }
    });
  }

  function isValidPhoneNumber(phone) {
    // Validate Philippine phone number format (11 digits)
    const phoneRegex = /^09\d{9}$/;
    return phoneRegex.test(phone);
  }
});
