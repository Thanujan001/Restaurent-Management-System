document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');
  const errorMessage = document.getElementById('error-message');

  loginForm.addEventListener('submit', async function (event) {
      event.preventDefault(); // Prevent form submission

      // Get input values
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value.trim();

      // Clear previous error messages
      errorMessage.textContent = '';

      // Validate inputs
      if (!username || !password) {
          errorMessage.textContent = 'Please fill in all fields.';
          return;
      }

      // Send login request to the backend
      try {
          const response = await fetch('http://localhost:5000/api/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ username, password }), // Send username and password
          });

          const data = await response.json();

          if (data.success) {
              // Successful login
              alert('Login successful! Redirecting to the booking...');
              window.location.href = 'booking.html'; // Redirect to dashboard
          } else {
              // Error during login
              errorMessage.textContent = data.message || 'Invalid email or password.';
          }
      } catch (error) {
          // Handle network or server errors
          errorMessage.textContent = 'An error occurred. Please try again later.';
          console.error('Login error:', error);
      }
  });
});