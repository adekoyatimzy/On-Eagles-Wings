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

  var object = {};
  formData.forEach(function(value, key) {
      object[key] = value;
  });
  var json = JSON.stringify(object);

  fetch('https://staticforms.dev', {
    method: 'POST',
    body: json,
    headers: {
        'Content-Type': 'application/json'
    }
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
      status.innerText = 'Something went wrong. Please check your API key and try again.';
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

