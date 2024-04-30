const firebaseConfig = {
  apiKey: "AIzaSyC66oIPdf9E3S7Acky-6bWtfOLpKxUHQZU",
  authDomain: "srpp-92b75.firebaseapp.com",
  databaseURL: "https://srpp-92b75-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "srpp-92b75",
  storageBucket: "srpp-92b75.appspot.com",
  messagingSenderId: "657851773818",
  appId: "1:657851773818:web:80ea22f26aca184d631cc3",
  measurementId: "G-K8Y6H38TB9"
};

firebase.initializeApp(firebaseConfig);

var bookingFormDB = firebase.database().ref("booking-Form");

document.getElementById("booking-form").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  var name = getElementVal("name");
  var email = getElementVal("email");
  var contact = getElementVal("contact");
  var date = getElementVal("date");
  var startTime = getElementVal("start-time");
  var hours = getElementVal("hours");

  saveBooking(name, email, contact, date, startTime, hours);

  if (hours > 12) {
    alert("Maximum booking duration is 12 hours.");
    return;
}
  setTimeout(() => {
    document.querySelector(".alert").style.display = "none";
  }, 3000);
  
  document.getElementById("bookingform").reset();
}

const saveBooking = (name, email, contact, date, startTime, hours) => {
  var newBooking = bookingFormDB.push();

  newBooking.set({
    name: name,
    email: email,
    contact: contact,
    date: date,
    startTime: startTime,
    hours: hours
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};

