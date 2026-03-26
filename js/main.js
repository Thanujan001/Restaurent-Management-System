(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });


    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";

    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav : false,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });

})(jQuery);

// ===== BOOKING FORM HANDLER =====
document.addEventListener('DOMContentLoaded', function () {
    const bookingForm = document.getElementById('bookingForm');

    if (bookingForm) {
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
    }
});

// ===== LOGIN FORM HANDLER =====
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');

    if (loginForm) {
        loginForm.addEventListener('submit', async function (event) {
            event.preventDefault(); // Prevent form submission

            // Get input values
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();

            // Clear previous error messages
            if (errorMessage) errorMessage.textContent = '';

            // Validate inputs
            if (!username || !password) {
                if (errorMessage) errorMessage.textContent = 'Please fill in all fields.';
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
                    if (errorMessage) errorMessage.textContent = data.message || 'Invalid email or password.';
                }
            } catch (error) {
                // Handle network or server errors
                if (errorMessage) errorMessage.textContent = 'An error occurred. Please try again later.';
                console.error('Login error:', error);
            }
        });
    }
});

// ===== SIGNUP FORM HANDLER =====
document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('signupForm');
    const errorMessage = document.getElementById('error-message');

    if (signupForm) {
        signupForm.addEventListener('submit', async function (event) {
            event.preventDefault(); // Prevent form submission

            // Get input values
            const username = document.getElementById('username').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            const confirmPassword = document.getElementById('confirmPassword').value.trim();

            // Clear previous error messages
            if (errorMessage) errorMessage.textContent = '';

            // Validate inputs
            if (!username || !email || !password || !confirmPassword) {
                if (errorMessage) errorMessage.textContent = 'Please fill in all fields.';
                return;
            }

            if (password !== confirmPassword) {
                if (errorMessage) errorMessage.textContent = 'Passwords do not match.';
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
                    window.location.href = 'Login.html'; // Redirect to login page
                } else {
                    // Error during signup
                    if (errorMessage) errorMessage.textContent = data.message || 'An error occurred during signup.';
                }
            } catch (error) {
                // Handle network or server errors
                if (errorMessage) errorMessage.textContent = 'An error occurred. Please try again later.';
                console.error('Signup error:', error);
            }
        });
    }
});

