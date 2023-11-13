# Learning Management System (LMS) - Backend

This repository contains the backend code for a Learning Management System (LMS). The system provides functionalities for user authentication, course management, and payment processing using RazorPay.

## Features

### User Authentication
1. :bust_in_silhouette: **User Registration:**
   - Users can register for an account, providing necessary details.
   - Implemented JWT (JSON Web Token) for secure authentication.

2. :key: **User Login and Logout:**
   - Users can log in using their registered credentials.
   - JWT token is generated upon successful login and stored in cookies for subsequent authenticated requests.
   - Users can log out, terminating the current session.

3. :closed_lock_with_key: **Password Management:**
   - Forgot Password: Users can request a password reset by providing their registered email.
   - Password Reset: Users receive a unique token via email, which is used along with a new password to reset the password securely.

### Course Management
1. :mag: **Course Viewing:**
   - Only authenticated users can view available courses.
   - Users can see details of each course.

2. :movie_camera: **Lecture Management:**
   - Users can view lectures associated with a course.
   - Admins can create new courses and update existing ones.
   - Admins can add lectures to a course, delete lectures, and manage course content.
   - Lecture content (e.g., video files) is handled using Multer for file uploads and Cloudinary for cloud storage.

### Payment Processing
1. :credit_card: **RazorPay Integration:**
   - Users can create RazorPay API keys for subscription payments.
   - Subscription creation is integrated with RazorPay, and users' subscription status is updated after verification.
   - JWT tokens ensure secure communication during payment processes.

## Tech Stack

- :rocket: **Node.js:** Server-side JavaScript runtime.
- :globe_with_meridians: **Express:** Web application framework.
- :arrows_counterclockwise: **Cors:** Middleware for enabling CORS (Cross-Origin Resource Sharing).
- :camera: **Multer:** Middleware for handling file uploads.
- :cloud: **Cloudinary:** Cloud storage service for handling multimedia files.
- :zap: **MongoDB:** NoSQL database for data storage.
- :money_with_wings: **RazorPay:** Payment gateway integration.
- :email: **Nodemailer:** Module for sending emails.

## Project Structure

- **Middleware:** Contains middleware functions for authentication, error handling, and file uploads.
- **Routes:** Defines routes for user authentication, course management, and payment processing.
- **Controllers:** Implements the logic for handling requests from the routes.
- **Models:** Defines the data models for users, courses, lectures, and payments.
- **Utils:** Houses utility functions, including error handling utilities.
- **Server.js:** Entry point for the application.

## Setup Instructions

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up environment variables, including database connection details, RazorPay API keys, and other necessary configurations.
4. Run the application using `npm start`.

## Frontend (Coming Soon)

The frontend of the Learning Management System is currently under development and will be available in a separate repository. Stay tuned for updates!

## Contributors

- Anand Kumar

Feel free to contribute to the project by submitting issues or pull requests. For major changes, please open an issue first to discuss the proposed changes.

## License

This project is licensed under the [MIT License](LICENSE).

**Happy Learning!**
