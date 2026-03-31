const form = document.getElementById('waitlist');
const message = document.getElementById('formMessage');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value.trim();

  if (!email.includes('@') || email.length < 5) {
    message.textContent = 'Please enter a valid email address.';
    return;
  }

  message.textContent = `Thanks! ${email} has been added to the BloomDesk waitlist.`;
  form.reset();
});
