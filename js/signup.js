document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('signupForm');
    const errorMessage = document.getElementById('error-message');

    signupForm.addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent form submission

        // Get input values
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const confirmPassword = document.getElementById('confirmPassword').value.trim();

        // Clear previous error messages
        errorMessage.textContent = '';

        // Validate inputs
        if (!username || !email || !password || !confirmPassword) {
            errorMessage.textContent = 'Please fill in all fields.';
            return;
        }

        if (password !== confirmPassword) {
            errorMessage.textContent = 'Passwords do not match.';
            return;
        }

        // Send signup request to the backend
        try {
            const response = await fetch('http://localhost:5000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if (data.success) {
                // Successful signup
                alert('Signup successful! Redirecting to the login page...');
                window.location.href = 'login.html'; // Redirect to login page
            } else {
                // Error during signup
                errorMessage.textContent = data.message || 'An error occurred during signup.';
            }
        } catch (error) {
            // Handle network or server errors
            errorMessage.textContent = 'An error occurred. Please try again later.';
            console.error('Signup error:', error);
        }
    });
});