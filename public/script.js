// API base URL
const API_URL = "http://localhost:5500/api/users"; // For registering and logging in
const API_URL_TODOS = "http://localhost:5500/api/todos"; // For todos

// Helper function to send a request
async function sendRequest(url, method, data = {}) {
  const headers = {
    "Content-Type": "application/json",
    // Include the token in the headers if it's available
    ...(localStorage.getItem("token") ? { Authorization: `Bearer ${localStorage.getItem("token")}` } : {}),
  };

  const options = {
    method,
    headers,
    ...(Object.keys(data).length && { body: JSON.stringify(data) }),
  };

  console.log("Sending Request:", { url, method, headers, data });

  try {
    const response = await fetch(url, options);

    console.log("Response Status:", response.status);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "An error occurred");
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    alert("An error occurred: " + error.message);
    throw error;
  }
}

// Register function
async function register() {
  const username = document.getElementById("register-username").value.trim();
  const email = document.getElementById("register-email").value.trim();
  const password = document.getElementById("register-password").value.trim();

  if (!username || !email || !password) {
    alert("All fields are required.");
    return;
  }

  try {
    const data = await sendRequest(`${API_URL}/register`, "POST", {
      username,
      email,
      password,
    });

    if (data) {
      alert(data.message);
      window.location.href = "login.html"; // Redirect to login page after successful registration
    }
  } catch (error) {
    console.error("Error during registration:", error);
    alert("Fetch error: Unable to register. Please try again.");
  }
}

// Login function
async function login() {
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();
  const errormessage = document.getElementById("login-error-message");
  const loader = document.getElementById("loader");

  errormessage.textContent = ""; // Clear previous errors
  loader.style.display = "block"; // Show loader

  if (!email || !password) {
    errormessage.textContent = "Email and password are required.";
    loader.style.display = "none";
    return;
  }

  try {
    const data = await sendRequest(`${API_URL}/login`, "POST", {
      email,
      password,
    });

    loader.style.display = "none"; // Hide loader

    if (data) {
      alert("Login successful!");
      localStorage.setItem("token", data.token); // Store token
      window.location.href = "todos.html"; // Redirect to todos page
    } else {
      errormessage.textContent = data.message || "Invalid credentials.";
    }
  } catch (error) {
    loader.style.display = "none";
    errormessage.textContent = "Server error occurred. Please try again later.";
    console.error("Login error:", error);
  }
}

// Add Todo function
async function addTodo() {
  const title = document.getElementById("todo-title").value;
  const description = document.getElementById("todo-description").value;

  if (!title || !description) {
    alert("Please enter both todo title and description.");
    return;
  }

  showLoader(); // Show loading indicator

  try {
    const response = await sendRequest(API_URL_TODOS, "POST", {
      title,
      description,
    });

    if (response) {
      loadTodos(); // Reload todos to reflect the newly added item
      // Clear inputs
      document.getElementById("todo-title").value = "";
      document.getElementById("todo-description").value = "";
    }
  } catch (error) {
    console.error("Error adding todo:", error);
    alert("An error occurred: " + error.message);
  } finally {
    hideLoader(); // Hide loading indicator
  }
}

// Load Todos function
async function loadTodos() {
  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = ""; // Clear the current todo list

  try {
    const todos = await sendRequest(API_URL_TODOS, "GET");

    if (todos && todos.length > 0) {
      todos.forEach((todo) => {
        const todoItem = document.createElement("div");
        todoItem.className = "todo-item";
        todoItem.style.marginBottom = "20px";
        todoItem.style.textAlign = "left";
        todoItem.id = `todo-${todo._id}`;
        todoItem.innerHTML = `
                    <div>
                        <strong>Title:</strong> ${todo.title} <br>
                        <strong>Description:</strong> ${todo.description} <br>
                        <strong>Completed:</strong> <input type="checkbox" ${todo.completed ? "checked" : ""} onchange="toggleCompletion('${todo._id}', this.checked)">
                    </div>
                    <div class="todo-actions">
                        <button onclick="updateTodo('${todo._id}')">Update</button>
                        <button onclick="deleteTodo('${todo._id}')">Delete</button>
                    </div>
                `;
        todoList.appendChild(todoItem);
      });
    } else {
      todoList.innerHTML = "<p>No todos found.</p>";
    }
  } catch (error) {
    console.error("Error loading todos:", error);
  }
}

// Toggle Todo completion status
async function toggleCompletion(id, completed) {
  await sendRequest(`${API_URL_TODOS}/${id}`, "PUT", { completed });
  loadTodos(); // Refresh the todo list after toggling
}

// Update Todo function
async function updateTodo(id) {
  const newTitle = prompt("Enter new title for the todo:");
  const newDescription = prompt("Enter new description for the todo:");

  if (!newTitle || !newDescription) {
    alert("Title and description cannot be empty.");
    return;
  }

  try {
    await sendRequest(`${API_URL_TODOS}/${id}`, "PUT", { title: newTitle, description: newDescription });
    alert("Todo updated successfully!");
    loadTodos(); // Refresh todos after update
  } catch (error) {
    console.error("Error updating todo:", error);
    alert("An error occurred while updating the todo. Please try again.");
  }
}

// Delete Todo function
async function deleteTodo(id) {
  if (!confirm("Are you sure you want to delete this todo?")) {
    return;
  }

  try {
    const response = await sendRequest(`${API_URL_TODOS}/${id}`, "DELETE");

    if (response && response.message === "Todo deleted successfully.") {
      document.getElementById(`todo-${id}`).remove();
      alert("Todo deleted successfully!");
    } else {
      alert("Error: Could not delete the todo.");
    }
  } catch (error) {
    console.error("Error deleting todo:", error);
    alert("An error occurred while deleting the todo.");
  }
}

// Load todos when the todos.html page loads
if (document.getElementById("todo-list")) {
  loadTodos(); // Fetch todos initially
}

// Loader functions
function showLoader() {
  document.getElementById("loader").style.display = "block"; // Show loading spinner
}

function hideLoader() {
  document.getElementById("loader").style.display = "none"; // Hide loading spinner
}
