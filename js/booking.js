document.addEventListener('DOMContentLoaded', function () {
    const bookingForm = document.getElementById('bookingForm');

    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const date = document.getElementById('date').value.trim(); 
        const time = document.getElementById('time').value.trim(); 
        const people = document.getElementById('select1').value.trim();
        const message = document.getElementById('message').value.trim();

        // Basic validation
        if (!name || !email || !phone || !date || !time || !people) {
            alert('Please fill out all required fields.');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Validate phone format (example: numbers only, 10 digits)
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) {
            alert('Please enter a valid 10-digit phone number.');
            return;
        }

        // Prepare form data
        const formData = {
            name,
            email,
            phone,
            date, 
            time, 
            people: parseInt(people, 10), // Convert people to a number
            message
        };

        console.log('Form Data:', formData); // Log form data for debugging

        try {
            // Send booking request to the backend
            const response = await fetch('http://localhost:5000/api/booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            console.log('Response Status:', response.status); // Log response status

            // Check if the response is JSON
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new TypeError('Response is not JSON');
            }

            const result = await response.json();
            console.log('Backend Response:', result); // Log backend response

            // Handle backend response
            if (result.success) {
                alert('Booking successful!');
                bookingForm.reset(); // Clear the form
            } else {
                alert('Booking failed: ' + (result.message || 'Unknown error'));
            }
        } catch (error) {
            console.error('Error:', error); // Log the error
            alert('An error occurred during booking. Please try again.');
        }
    });
});