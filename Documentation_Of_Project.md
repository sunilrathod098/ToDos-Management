# Todo Management Documentation


## Overview of the Todo Application
- The Todo application serves as a task management tool that allows users to register, log in, and efficiently manage their todo items. It leverages asynchronous JavaScript and the Fetch API for seamless API interactions, ensuring secure handling of user authentication and data management. The application is structured to provide a user-friendly experience while maintaining high security standards.

## Project Structure
The project is organized into several main directories and files, each serving a specific purpose:

### 1. Controllers
*auth.controller.js:* Manages user authentication tasks such as login and registration.
*user.controller.js*: Handles operations related to user profiles, including creating, retrieving, updating, and deleting user information.
*todo.controller.js*: Manages main task operations, including creating, retrieving, updating, and deleting tasks.
*sub_todo.controller.js*: Handles operations related to subtasks, including adding, updating, and deleting subtasks.

### 2. Models
*user.models.js*: Defines the User schema for storing user information in the database.
*todo.models.js:* Defines the Todo schema for main tasks.
*sub_todo.models.js:* Defines the SubTodo schema for managing subtasks associated with main tasks.

### 3. Routes
*user.routes.js:* Contains routing logic for user-related endpoints.
*todo.routes.js:* Manages routes for todo-related actions.
*sub_todo.routes.js:* Contains routes for handling subtodo operations.

### 4. Frontend
*public/:* This folder contains HTML files and scripts for the user interface.
*script.js: *JavaScript code for client-side interactions and AJAX calls.
*register.html:* The registration page for new users.
*login.html:* The login page for existing users.
*todos.html:* The main interface for displaying username and managing tasks.
*Images:* Contains associated images used within the HTML files.

### 5. Middleware
*auth.js:* Middleware for authentication to secure routes.
*jwt_secret_key.js:* Contains the secret key for JSON Web Token (JWT) authentication.

### 6. Server and Configuration
*server.js*: The main server file where the Express application is initialized, middleware is set up, and routes are defined.
*.env:* Contains environment variables, such as database connection strings and JWT secret keys.
*package.json:* Lists project dependencies and scripts.
*.gitignore:* Specifies files and folders that should not be tracked by Git.
*README.md:* Provides project details, setup instructions, and usage guidelines.

## Functionality
- The Todo application supports various features to enhance user experience and manage tasks effectively:

### User Management
*Registration:* Users can register by providing a username, email, and password, with basic validation to ensure all fields are filled. Email normalization ensures consistent handling.

*Login:* Users can log in with their credentials, with feedback provided on login success or failure.
Profile Management: Users can view, update, and delete their profiles.

### Task Management
*Create Todo:* Users can create new tasks by specifying a title and description.
*Update Todo:* Users can modify existing tasks as needed.
*Delete Todo:* Users can remove tasks they no longer require.
*View Todos:* Users can view all their tasks in a structured format, with the UI dynamically updating to reflect changes.

### Subtask Management
*Add Subtask:* Users can add subtasks to their main tasks.
*Update Subtask:* Users can modify existing subtasks.
*Delete Subtask:* Users can remove subtasks as needed.
*View Subtasks:* Subtasks can be listed under their parent tasks.

### API Interaction
- The application defines helper functions for sending HTTP requests to the backend API, supporting actions like registering users and managing todos.
- Error handling is implemented to inform users of issues during network requests, promoting robust application behavior.

### Loader Indication
- The application features a loading indicator that informs users when background processes are ongoing, enhancing the overall user interface and experience.

### Responsive Design
- The HTML structure is designed to be responsive, ensuring accessibility on various devices through flexible layouts and styles for input forms and buttons.

## Security
- The application employs JWT for secure user authentication. 
- Passwords should be hashed before being stored in the database to ensure security and protect user data.
- The code verifies JSON Web Tokens (JWT), differentiating between expired and invalid tokens to maintain application security.


# Project Structure


- **Todo-Management/**
  - **controllers/**
    - `auth.controller.js`  # Handles user authentication (login, registration)
    - `user.controller.js`   # Manages user profile operations
    - `todo.controller.js`   # Manages main task operations (CRUD)

  - **models/**
    - `user.models.js`       # Defines the User schema for MongoDB
    - `todo.models.js`       # Defines the Todo schema for main tasks

  - **routes/**
    - `user.routes.js`       # Contains routes related to user operations
    - `todo.routes.js`       # Contains routes related to main task operations

  - **public/**
    - `script.js`            # JavaScript for client-side functionality and AJAX calls
    - `register.html`        # HTML page for user registration
    - `login.html`           # HTML page for user login
    - `todos.html`           # HTML page for displaying username and managing todos
    - `styles.css`           # CSS for styling the application

    - **images/**            # Folder containing images used in the HTML files
    
  - **middleware/**
    - `auth.js`              # Middleware for JWT authentication and securing routes
    - `jwt_secret_key.js`    # Contains the secret key for JWT signing

  - `server.js`              # Main server file for setting up Express, middleware, and routes
  - `.env`                   # Environment variables (database connection, JWT secret)
  - `package.json`           # Project metadata and dependencies
  - `.gitignore`             # Specifies files and folders to be ignored by Git
  - `README.md`              # Documentation for the project, including setup and usage instructions
  - `Documentation.md`       # Here a documentaion of overview of project and setup and how to use what are we want all instructons in this doc.

## Conclusion
- Overall, this Todo application is designed with user experience, security, and functionality in mind. 
- The integration of JWT for authentication ensures that user data is protected, while the responsive design and dynamic content management enhance usability. 
- The modular structure of the codebase facilitates easy maintenance and future enhancements, making it a solid foundation for a practical web application.







