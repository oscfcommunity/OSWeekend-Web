const socket = io();
const checkUserForm = document.getElementById('checkUserForm');
const usernameInput = document.getElementById('username');
const resultMessage = document.getElementById('result');
validateUserAndNavigate(user);
function navigateToChat(username) {
  // Redirect the user to the chat app URL with the username as a query parameter
  window.location.href = `/chat?username=${username}`;
}
function validateUserAndNavigate(username) {
  // Assuming you have a method to validate the user on the server
  // Make a fetch request or use any preferred method to validate user existence
  // Once validated, navigate to chat page
  // Example:
  if (userExistsInDatabase(username)) {
    navigateToChat(username);
  } else {
    alert('User not found. Please enter a valid username.');
  }
}
checkUserForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const username = usernameInput.value.trim();
  
  if (username) {
    // Emit an event to the server to validate the username
    socket.emit('validate-user', username);
  }
});

socket.on('user-validation-result', (isValid) => {
  const username = usernameInput.value.trim();
  
  if (isValid) {
    navigateToChat(username); // Navigate to the chat app if the username is valid
  } else {
    // Handle invalid username here (e.g., show an error message)
    resultMessage.textContent = 'Invalid username. Please enter a valid username.';
  }
});