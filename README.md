# Learning Management System (LMS) - Backend

j

This repository contains the backend code for a Learning Management System (LMS). The system provides functionalities for user authentication, course management, and payment processing using RazorPay.

## Tech Stack

- :rocket: **Node.js:** Server-side JavaScript runtime.
- :globe_with_meridians: **Express:** Web application framework.
- :arrows_counterclockwise: **Cors:** Middleware for enabling CORS (Cross-Origin Resource Sharing).
- :camera: **Multer:** Middleware for handling file uploads.
- :cloud: **Cloudinary:** Cloud storage service for handling multimedia files.
- :zap: **MongoDB:** NoSQL database for data storage.
- :money_with_wings: **RazorPay:** Payment gateway integration.
- :email: **Nodemailer:** Module for sending emails.
- :lock: **Crypto:** Library for cryptographic functionality.

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
1. :mag: **Get All Courses:**
   - Retrieve a list of all courses, excluding lecture details.

2. :movie_camera: **Get Lectures by Course ID:**
   - Retrieve lectures for a specific course by providing the course ID.

3. :heavy_plus_sign: **Create Course:**
   - Create a new course with title, description, category, and creator information.
   - Upload a course thumbnail to Cloudinary.

4. :pencil2: **Update Course:**
   - Update course details by providing the course ID and new information.

5. :x: **Remove Course:**
   - Delete a course by providing the course ID.

6. :heavy_plus_sign: **Add Lecture to Course by ID:**
   - Add a new lecture to a course by providing the course ID, lecture title, and description.
   - Upload a lecture thumbnail to Cloudinary.

### Payment Processing
1. :moneybag: **RazorPay Integration:**
   - Retrieve RazorPay API key for client-side integration.
   - Enable users to purchase subscriptions using RazorPay.
   - Verify and process subscription payments securely.
   - Allow users to cancel their subscriptions.

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

- [Anand Kumar]
- [h20220277@pilani.bits-pilani.ac.in]

Feel free to contribute to the project by submitting issues or pull requests. For major changes, please open an issue first to discuss the proposed changes.

## License

This project is licensed under the [MIT License](LICENSE).

**Happy Learning!**
