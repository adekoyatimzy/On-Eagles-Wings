document.getElementById('contactform').addEventListener('submit', function(e) {
  e.preventDefault();
  var form = this;
  var btn = document.getElementById('submitBtn');
  var status = document.getElementById('formStatus');

  btn.disabled = true;
  btn.innerText = 'Sending...';
  status.style.display = 'block';
  status.style.color = '#0A2540'; 
  status.innerText = 'Sending your message...';

  var formData = new FormData(form);

  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    body: formData
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    if (data.success) {
      status.style.color = 'green';
      status.innerText = 'Thank you! Your message has been sent successfully.';
      form.reset();
    } else {
      status.style.color = 'red';
      status.innerText = 'Something went wrong. Please try again.';
    }
  })
  .catch(function() {
    status.style.color = 'red';
    status.innerText = 'Error sending message. Please try again.';
  })
  .finally(function() {
    btn.disabled = false;
    btn.innerText = 'Send Message';
  });
});
