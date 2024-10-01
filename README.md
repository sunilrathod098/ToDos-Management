# Todo Application

A simple Todo application that allows users to register, log in, and manage their tasks. The application leverages JWT for authentication and provides a responsive design for an enhanced user experience.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration and login with JWT authentication.
- Create, read, update, and delete (CRUD) functionalities for todo items.
- Mark todos as completed or pending.
- Responsive design for accessibility on various devices.
- Loading indicators for better user experience.
- Error handling for network requests.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose)
- **Authentication**: JSON Web Tokens (JWT)

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 14 or later)
- [MongoDB](https://www.mongodb.com/) (or use a cloud service like MongoDB Atlas)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sunilrathod098/ToDo-s-Project.git
   cd todo-application

2. Install dependencies:
  ```npm install```

3. Start the server:
  ```npm start```

4. Access the application in your browser at ```http://localhost:5000```.

## Usage
1. *Register*: Go to the registration page, fill out the form, and create an account.
2. *Login*:  Use your credentials to log in to the application.
3. *Manage Todos*: After logging in, you can create, view, update, and delete todos.


## Project Structure

Todo-Application/
├── controllers/
│   ├── auth.controller.js      # Handles user authentication (login, registration)
│   ├── user.controller.js       # Manages user profile operations
│   ├── todo.controller.js       # Manages main task operations (CRUD)
│   └── sub_todo.controller.js   # Manages operations for subtasks (CRUD)
├── models/
│   ├── user.models.js           # Defines the User schema for MongoDB
│   ├── todo.models.js           # Defines the Todo schema for main tasks
│   └── sub_todo.models.js       # Defines the SubTodo schema for managing subtasks
├── routes/
│   ├── user.routes.js           # Contains routes related to user operations
│   ├── todo.routes.js           # Contains routes related to main task operations
│   └── sub_todo.routes.js       # Contains routes for handling subtasks
├── public/
│   ├── script.js                # JavaScript for client-side functionality and AJAX calls
│   ├── register.html            # HTML page for user registration
│   ├── login.html               # HTML page for user login
│   └── todos.html               # HTML page for displaying and managing todos
│   └── styles.css               # CSS for styling the application
│   └── images/                  # Folder containing images used in the HTML files
├── middleware/
│   ├── auth.js                  # Middleware for JWT authentication and securing routes
│   └── jwt_secret_key.js        # Contains the secret key for JWT signing
├── server.js                    # Main server file for setting up Express, middleware, and routes
├── .env                         # Environment variables (database connection, JWT secret)
├── package.json                 # Project metadata and dependencies
├── .gitignore                   # Specifies files and folders to be ignored by Git
└── README.md                    # Documentation for the project, including setup and usage instructions



## API Endpoints
- *POST /api/register*: Register a new user.
- *POST /api/login*: Authenticate a user and return a JWT.
- *GET /api/todos*: Retrieve all todos for the authenticated user.
- *POST /api/todos*: Create a new todo item.
- *PUT /api/todos/*: Update a specific todo item.
- *DELETE /api/todos/*: Delete a specific todo item.

## Contibuting
- Contributions are welcome! If you have suggestions for improvements or want to contribute code, please open an issue or submit a pull request (and here some error make sure change if you want).
- Make sure to follow the project's coding standards and best practices.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

### Instructions for Use:
- Make sure to replace the placeholder values (like `<Your MongoDB connection string>`) with your actual configuration.
- Customize any section according to your project's specific details and features.
- Add or modify API endpoints if there are any changes to the backend.

This README provides a comprehensive overview and should serve as a helpful guide for users and developers interacting with your project.
