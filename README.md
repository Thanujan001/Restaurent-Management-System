# Restaurant Management System (FOE UOR)

A full-stack restaurant website with table booking, user authentication, and contact form functionality.

## Features

- **Home Page** — Hero section, about, menu highlights
- **About** — Restaurant info and story
- **Service** — Services offered
- **Menu** — Full menu display
- **Booking** — Online table reservation with date/time picker
- **Team** — Staff profiles
- **Testimonial** — Customer reviews
- **Contact** — Contact form with map
- **Login/Signup** — User authentication

## Tech Stack

- **Frontend:** HTML5, Bootstrap 5, jQuery, Owl Carousel, WOW.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose ODM

## Project Structure

```
├── index.html              # Home page
├── about.html              # About page
├── booking.html            # Table reservation
├── contact.html            # Contact form
├── menu.html               # Menu page
├── service.html            # Services page
├── team.html               # Team page
├── testimonial.html        # Testimonials
├── Login.html              # Login page
├── Signup.html             # Signup page
├── package.json            # Node.js dependencies
├── css/
│   ├── bootstrap.min.css   # Bootstrap
│   └── style.css           # Custom theme styles
├── js/
│   ├── main.js             # jQuery UI behaviors
│   ├── booking.js          # Booking form handler
│   ├── login.js            # Login form handler
│   └── signup.js           # Signup form handler
├── img/                    # Image assets
├── lib/                    # Third-party libraries
│   ├── animate/
│   ├── owlcarousel/
│   ├── easing/
│   ├── waypoints/
│   ├── counterup/
│   ├── tempusdominus/
│   └── wow/
└── src/
    └── server.js           # Express API server
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/signup` | User registration |
| POST | `/api/login` | User login |
| POST | `/api/booking` | Table reservation |
| POST | `/api/contact` | Contact form submission |

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start MongoDB:**
   ```bash
   mongod
   ```

3. **Run the server:**
   ```bash
   npm start
   ```

4. Open `http://localhost:5000` in your browser.

## Author

Monishan Sangaralingam
