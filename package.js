document.addEventListener('DOMContentLoaded', function() {
  const feedbackButton = document.getElementById('feedback-btn');

  if (feedbackButton) {
      feedbackButton.addEventListener('click', function() {
          window.location.href = 'pbs2.html'; 
      });
  }

  const unavailableSlots = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const slotButtons = document.querySelectorAll('.slot-btn');
  let slotSelected = false;

  function handleSlotClick(button) {
    const slotNumber = parseInt(button.innerText);
    const slotBooked = unavailableSlots.includes(slotNumber);

    if (!slotSelected && !slotBooked) {
      slotSelected = true; 
      button.style.backgroundColor = 'red'; 

      const slotInput = document.querySelector('#selected-slot');
      slotInput.value = slotNumber;

      slotButtons.forEach((button) => {
        if (button !== this) {
          button.removeEventListener('click', handleSlotClick);
          button.disabled = true; 
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

        
          bookingForm.reset();

       
          slotSelected = false;
          slotButtons.forEach((button) => {
            button.addEventListener('click', () => handleSlotClick(button)); 
            button.disabled = false; 
          });

         
          slotButtons.forEach((button) => {
            button.style.display = 'block';
          });

      
          openRemainingSlotButtons(slotNumber);

        
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
    const phoneRegex = /^09\d{9}$/;
    return phoneRegex.test(phone);
  }
});
