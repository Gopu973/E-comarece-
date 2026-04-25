// Get the contact form element
const form = document.getElementById("contactForm");

// Listen for form submission
form.addEventListener("submit", function(e) {
  e.preventDefault(); // Prevent default form submit

  // Get values from input fields and trim whitespace
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const review = document.getElementById("review").value.trim();

  // Basic validation: check if any field is empty
  if(name === "" || phone === "" || email === "" || review === "") {
    alert("Please fill in all fields."); // Show alert if any field is empty
    return; // Stop submission
  }

  // Phone number validation (must be 10 digits)
  const phonePattern = /^\d{10}$/;
  if(!phone.match(phonePattern)) {
    alert("Please enter a valid 10-digit phone number."); // Show alert if phone is invalid
    return; // Stop submission
  }

  // Email validation (simple pattern)
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if(!email.match(emailPattern)) {
    alert("Please enter a valid email address."); // Show alert if email is invalid
    return; // Stop submission
  }

  // Show thank you message on page after successful submission
  const contactSection = document.querySelector('.contact-form'); // Get contact form section
  contactSection.innerHTML = `<h2>Thank You!</h2><p style='text-align:center;font-size:1.2rem;color:#646daf;margin-top:18px;'>Thank you, ${name}! Your review has been submitted successfully.<br>We appreciate your feedback.</p>`;
});
