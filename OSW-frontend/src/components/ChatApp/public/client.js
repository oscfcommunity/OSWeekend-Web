
/*========================================/////////**********************************************************************/
const socket = io();
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message__area');
const sendMessageButton = document.querySelector('#sendMessageButton');
sendMessageButton.addEventListener('click', () => {
  sendMessage(textarea.value);
  textarea.value = ''; // Clear the textarea after sending the message
});

// Use socket.on to listen for events from the server
// socket.on('username-received', (data) => {
//   // Log the entire data object to see its structure
//   console.log('Received data:', data);
//   console.log('seen22')
//   // Assuming username is a property of the data object
//   const username = data.username;
//   // Update the HTML element with the received username
//   console.log(`Received username: ${username}`);
//   const usernameElement = document.getElementById('username');
//   usernameElement.textContent = username;
// });

function getUsername() {
  let user = prompt("Please enter your name:");
  while (!user) {
    user = prompt("Please enter your name:");
  }
  return user;
}

socket.on('invalid-user', (errorMessage) => {
  // Display an error message on the screen
  window.location.href = 'invalid-user.html';

});
socket.on('previous-messages', (messages) => {
  messages.forEach((msg) => {
    appendMessage(msg, 'incoming');
  });
  scrollToBottom();
});
// Get the username or prompt the user to enter it
let user = getUsername();

if (user) {
  console.log('seen33')
  // Emit the entered username to the server
  socket.emit('user-joined', user);
} else {
  // Prevent the user from joining and display an error message
  const errorMessage = 'Username is required to join the chat';
  alert(errorMessage);
  // You can also modify the HTML to display the error message on the screen
}


// Listen for the 'valid-usernames' event
socket.on('valid-usernames', (validUsernames) => {
  console.log(validUsernames);
  // Check if the entered username is in the list of valid usernames
  if (validUsernames.includes(user)) {
    // User is valid, emit the 'user-joined' event
    socket.emit('user-joined', user);
  } else {
    // User is not valid, display error and block chat
    displayErrorMessage('User not found in database');
    blockChat();
  }
});

function displayErrorMessage(message) {
  const errorElement = document.createElement('p');
  errorElement.classList.add('error-message');
  errorElement.textContent = message;
  messageArea.appendChild(errorElement);
  scrollToBottom();
}

// Function to block chat
function blockChat() {
  // Disable the textarea and send button to block user from sending messages
  textarea.disabled = true;
  fileInput.disabled = true;
  searchInput.disabled = true;
}

// document.getElementById('context-reply').addEventListener('click', openReplyInterface);
let clickedMessageElement;
// // Add an event listener to the "x" button in the reply interface
document.getElementById('close-reply').addEventListener('click', closeReplyInterface);

messageArea.addEventListener('contextmenu', (e) => {
  e.preventDefault(); // Prevent the default context menu from appearing
  const messageElement = e.target.closest('.message');

  if (messageElement) {
    // Store the clicked message element
    clickedMessageElement = messageElement;

    // Show the context menu
    const contextMenu = document.getElementById('context-menu');
    contextMenu.innerHTML = ''; // Clear the menu before adding options

    // Check if the message is reported
    if (messageElement.classList.contains('reported-message')) {
      // If reported, add only the "Unreport" option
      const unreportOption = document.createElement('li');
      unreportOption.textContent = 'Unreport';
      unreportOption.addEventListener('click', () => {
        unreportChat(messageElement);
      });
      contextMenu.appendChild(unreportOption);
    } else {
      // If not reported, add the "Reply" and "Report" options
      const replyOption = document.createElement('li');
      replyOption.textContent = 'Reply';
      replyOption.addEventListener('click', () => {
        openReplyInterface();
      });

      const reportOption = document.createElement('li');
      reportOption.textContent = 'Report';
      reportOption.addEventListener('click', () => {
        reportChat(messageElement);
      });

      contextMenu.appendChild(replyOption);
      contextMenu.appendChild(reportOption);
    }

    contextMenu.style.display = 'block';
    contextMenu.style.left = `${e.pageX}px`;
    contextMenu.style.top = `${e.pageY}px`;
  }
});

// Handle the "Unreport" option in the context menu
function unreportChat(messageElement) {
  if (messageElement) {
    const messageId = messageElement.dataset.messageId;

    // Send the messageId to the server to unreport the message
    socket.emit('unreport-chat', messageId);

    // Remove the "reported" styles from the message
    messageElement.classList.remove('reported-message');

    // Hide the context menu
    const contextMenu = document.getElementById('context-menu');
    contextMenu.style.display = 'none';
  }
}


// socket.on('unreport-message', (messageId) => {
//   // Find the reported message element and remove it
//   const reportedMessageElement = document.querySelector(`[data-message-id="${messageId}"]`);
//   if (reportedMessageElement) {
//     reportedMessageElement.remove();
//   }
// });

document.addEventListener('click', () => {
  const contextMenu = document.getElementById('context-menu');
  contextMenu.style.display = 'none';
});

// Handle "Reply" and "Report" actions
document.getElementById('context-reply').addEventListener('click', () => {
  openReplyInterface();
  // Close the context menu after clicking "Reply"
  document.getElementById('context-menu').style.display = 'none';
});

document.getElementById('context-report').addEventListener('click', () => {
  reportChat(clickedMessageElement);
  // Close the context menu after clicking "Report"
  document.getElementById('context-menu').style.display = 'none';
});


let selectedMessage = null; // To store the selected message for replying

// Function to handle click on the "Reply" button
function handleReplyClick(event) {
  const messageElement = event.target.closest('.message');
  if (messageElement) {
    const messageText = messageElement.querySelector('p').textContent;
    selectedMessage = {
      user: messageElement.querySelector('h4').textContent,
      message: messageText,
    };
    openReplyInterface();
  }
}

// Add a click event listener to the message area to handle replies
messageArea.addEventListener('click', handleReplyClick);
// Function to open the reply interface

function openReplyInterface(messageElement) {
  if (clickedMessageElement) {
    const messageText = clickedMessageElement.querySelector('p').textContent;
    selectedMessage = {
      user: clickedMessageElement.querySelector('h4').textContent,
      message: messageText,
    };
    const replyTextarea = document.getElementById('reply-textarea');
    document.getElementById('replying-to-text').innerHTML = `<div class="replying-to-text">${selectedMessage.user}<div>${selectedMessage.message}`;
    const replyContainer = document.getElementById('reply-container');
    replyContainer.style.display = 'block';

    // Hide the text__area when the reply interface is open
    document.getElementById('textarea').style.display = 'none';

    replyTextarea.focus(); // Focus on the reply textarea
  }
}

function closeReplyInterface() {
  // const replyTextarea = document.getElementById('textarea');
  const replyContainer = document.getElementById('reply-container');
  replyContainer.value = ''; // Clear the reply content
  replyContainer.style.display = 'none';
  selectedMessage = null;

  // Show the text__area when closing the reply interface
  document.getElementById('textarea').style.display = 'block';
}

function sendReply() {
  const replyTextarea = document.getElementById('reply-textarea');
  const replyingto = document.getElementById("reply-message").textContent;
  const replyMessage = replyTextarea.value;
  console.log(replyingto)

  // Check if the reply message is not empty
  if (replyMessage.trim() !== '') {
    // Create an object with reply data
    const repliedToUser = selectedMessage.user;
    const repliedToMessage = selectedMessage.message;
    const messageType = selectedMessage.messageType;
    const replyData = {
      user, // Username of the user sending the reply
      // repliedToUser: selectedMessage.user,
      messageType: messageType,
      message: replyMessage, // The reply message content
      repliedToUser: repliedToUser,
      repliedToMessage: repliedToMessage, // The original message being replied to
    };

    // const replyDisplayMessage = `<strong>${replyMessage}</strong><br><strong>${repliedToUser}</strong>: ${repliedToMessage}`;

    // replyData.message = replyDisplayMessage;
    // Emit the reply data to the server
    socket.emit('reply-message', replyData);

    // Append the replied-to message and the reply message to the message area
    appendMessage(selectedMessage, 'incoming'); // Show the original message
    appendMessage(replyData, 'outgoing'); // Show the reply message

    // Hide the context menu
    replyTextarea.value = '';
    const contextMenu = document.getElementById('context-menu');
    contextMenu.style.display = 'none';
    closeReplyInterface();
    // Clear the reply textarea and close the reply interface
    scrollToBottom();
  }
}
function isMessageInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
messageArea.addEventListener('scroll', handleScroll);
function handleScroll() {
  const messages = document.querySelectorAll('.message');
  messages.forEach((message) => {
    if (isMessageInViewport(message) && !message.dataset.seen) {
      message.dataset.seen = 'true';

      const messageId = message.dataset.messageId;
      // Emit an event to the server to mark the message as seen
      socket.emit('message-seen', messageId, user);
      message.classList.add('message-seen');
      // Update the seenByUsers array for this message
      const seenByUsers = JSON.parse(message.dataset.seenByUsers || '[]'); // Parse the existing array
      seenByUsers.push(user); // Add the current user to the seenByUsers array
      message.dataset.seenByUsers = JSON.stringify(seenByUsers); // Store the updated array

      console.log(`Message ID ${messageId} - Seen By Users:`, seenByUsers);
    }
  });
}
// socket.emit('message-seen', msg.messageId, user);
function reportChat(messageElement) {
  if (messageElement) {
    messageElement.classList.add('blurred-message');
    messageElement.classList.add('reported-message'); // Apply the blurred and "Reported" styles
    messageElement.classList.add('reported');

    // Get the message ID
    const messageId = messageElement.dataset.messageId;

    // Notify the server to report the chat message
    socket.emit('report-chat', { messageId });

    // Hide the context menu
    const contextMenu = document.getElementById('context-menu');
    contextMenu.style.display = 'none';
  }
}
// Handle the reported message notification
socket.on('message-reported', (reportData) => {
  const reportedBy = reportData.reportedBy;

  // Display a notification about the reported message
  const notificationMessage = document.createElement('p');
  notificationMessage.classList.add('reported-notification');
  notificationMessage.textContent = `This chat message was reported by ${reportedBy} and will be removed shortly`;
  messageArea.appendChild(notificationMessage);

  // Scroll to the bottom of the message area
  scrollToBottom();
});



textarea.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault(); // Prevent Enter key from creating a new line
    sendMessage(textarea.value); // Send the message
    textarea.value = ''; // Clear the textarea
  }
  // Check for "@" symbol and start tagging logic
  if (e.key === '@') {
    if (!e.ctrlKey && !e.altKey && !e.metaKey && !e.shiftKey) { // Add this condition
      e.preventDefault();
      startTagging();
    }
  }
});

// Handle click event on the fileButton
const fileButton = document.getElementById('fileButton');
fileButton.addEventListener('click', openFileExplorer);

function openFileExplorer() {
  const fileInput = document.getElementById('fileInput');
  fileInput.click();
}

// Handle file input change event
const fileInput = document.querySelector('#fileInput');
fileInput.addEventListener('change', handleFileUpload);

function handleFileUpload() {
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const dataURL = event.target.result;
      sendMessage(dataURL, 'file', file.name, file.type); // Send the file as a message
    };
    reader.readAsDataURL(file);
  }
}

function startTagging() {
  const cursorPosition = getCaretPosition(textarea);
  const textBeforeCursor = textarea.value.substring(0, cursorPosition);
  const lastWord = textBeforeCursor.split(/\s+/).pop();
  if (lastWord && lastWord.startsWith('@')) {
    // Implement your tagging logic here
  }
}


socket.on('user-joined', (message) => {
  let msg = {
    user: message.user,
    messageType: message.messageType,
    message: message.message,
  };
  console.log('User Joined:', msg);
  appendMessage(msg, 'incoming');
  scrollToBottom();
});


// Receive messages
socket.on('message', (msg) => {
  appendMessage(msg, 'incoming');
  socket.emit('message-seen', msg._id);
  scrollToBottom();
});

function sendMessage(message, messageType, fileName, fileType, repliedToUser, repliedToMessage) {
  let msg = {
    user: user,
    message: message.trim(),
    messageType: messageType,
    fileName: fileName,
    fileType: fileType,
    isReply: false,
  };
  if (repliedToUser && repliedToMessage) {
    // Create a reply message
    msg.isReply = true;
    msg.repliedToUser = repliedToUser;
    msg.repliedToMessage = repliedToMessage;
  }
  const taggedUsernames = Array.from(message.matchAll(/@\w+/g)).map(match => match[0].slice(1));

  //   // Replace tagged usernames with properly formatted mentions
  taggedUsernames.forEach(username => {
    const mention = `<span class="tagged-user">@${username}</span>`;
    msg.message = msg.message.replace(`@${username}`, mention);
    console.log("msg", msg, "username", username);
    if (username !== user) {
      socket.emit('tag-notification', username);
    }
  });
  if (taggedUsernames.includes(user)) {
    alert(`You have been tagged by ${msg.user} in the chat.`);
  }
  console.log(`this is ${msg}`)
  appendMessage(msg, 'outgoing');
  textarea.value = '';
  scrollToBottom();

  // Send to server
  socket.emit('message', msg);
}
socket.on('tag-notification', (taggedByUsername) => {
  // Show an alert to the user who was tagged
  alert(`You have been tagged by ${taggedByUsername} in the chat.`);
});

// function isMessageSeen(message) {
//   return message.seenByUsers.includes(user);
// }
function appendMessage(msg, type) {
  let mainDiv = document.createElement('div');
  let className = type;
  mainDiv.classList.add(className, 'message');
  if (msg.messageType === 'user-joined') {
    mainDiv.textContent = msg.message;
  }
  if (msg.isReply) {
    mainDiv.classList.add('reply-message');
    const repliedToUser = msg.repliedToUser;
    const repliedToMessage = msg.repliedToMessage;
    const messageContent = msg.message;

    const markup = `
      <h4>${msg.user} (Replying to ${repliedToUser})</h4>
      <p>${messageContent}</p>
      <p>Replied To ${repliedToUser}: ${repliedToMessage}</p>
    `;

    mainDiv.innerHTML = markup;
    mainDiv.dataset.messageId = msg._id; // Assuming _id is the unique identifier for each message
    mainDiv.dataset.seenByUsers = JSON.stringify(msg.seenByUsers);

  }
  else {
    let messageContent
    mainDiv.dataset.messageId = msg._id; // Assuming _id is the unique identifier for each message
    mainDiv.dataset.seenByUsers = JSON.stringify(msg.seenByUsers);
    if (msg.messageType === 'image') {
      mainDiv.classList.add('image-message');
      let image = document.createElement('img');
      image.src = msg.message;
      image.classList.add('file-preview');

      image.onload = () => {
        let containerWidth = image.width + 10; // Add 5px on each side
        let containerHeight = image.height + 10; // Add 5px on each side

        mainDiv.style.maxWidth = '100%'; // Ensure the content doesn't exceed the message area width
        mainDiv.style.maxHeight = 'calc(100vh - 100px)'; // Adjust the maximum height as needed
        mainDiv.style.width = `${containerWidth}px`;
        mainDiv.style.height = `${containerHeight}px`;
      };
      messageContent = `<img src="${msg.message}" alt="Image Preview" class="file-preview">`;
      mainDiv.appendChild(image);
    } else if (msg.messageType === 'file') {
      mainDiv.classList.add('file-message');
      let filePreview;
      messageContent = `<i class="fa-solid fa-file fa-2x"></i>`;
      if (msg.fileType.startsWith('image/')) {
        filePreview = `<img src="${msg.message}" alt="File Preview" class="file-preview">`;
      } else if (msg.fileType === 'application/pdf') {
        // Embed PDFs using <iframe>
        filePreview = `<iframe src="${msg.message}" width="300" height="200" scrolling="no"></iframe>`;
      } else {
        filePreview = `<i class="fa-solid fa-file fa-2x"></i>`;
      }
      if (msg.messageType === 'image' || msg.messageType === 'file') {
        // Add a mouseover event handler to show the fileName
        mainDiv.setAttribute('title', msg.fileName);

      }
      // mainDiv.style.width = '310px'; // Add 10px to the default width
      // mainDiv.style.height = '210px';
      // let downloadLink = document.createElement('a');
      // downloadLink.href = msg.message;
      // downloadLink.download = msg.fileName;
      // downloadLink.textContent = `Download ${msg.fileName}`;
      let downloadButton = document.createElement('button');
      downloadButton.innerHTML = `<i class="fa-solid fa-download"></i>`;
      downloadButton.addEventListener('click', () => {
        // Create an anchor element to trigger the download
        let downloadLink = document.createElement('a');
        downloadLink.href = msg.message; // Set the file URL
        downloadLink.download = msg.fileName; // Set the desired file name
        downloadLink.style.display = 'none'; // Hide the link
        document.body.appendChild(downloadLink);
        downloadLink.click(); // Simulate a click on the link to trigger the download
        document.body.removeChild(downloadLink); // Remove the link element
      });
      let markup = `
        <h4>${msg.user}</h4>
        <p>${filePreview}</p>
      `;
      mainDiv.innerHTML = markup;
      mainDiv.appendChild(downloadButton);
    } else {
      mainDiv.classList.add('text-message');
      messageContent = msg.message;
      let markup = `
        <h4>${msg.user}</h4>
        <p>${messageContent}</p>
      `;
      mainDiv.innerHTML = markup;
    }
  }
  const messageArea = document.querySelector('.message__area');
  messageArea.appendChild(mainDiv);

  if (msg.messageType !== 'image' && msg.messageType !== 'file') {
    mainDiv.querySelector('h4').textContent = msg.user;
  }
  if (!msg.isReply && (msg.messageType !== 'image' && msg.messageType !== 'file')) {
    mainDiv.querySelector('h4').textContent = msg.user;
  }
  scrollToBottom();
}




function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}

// Search input element
const searchInput = document.getElementById('searchInput');

// Search function to filter chat messages
function searchChat() {
  const searchTerm = searchInput.value.toLowerCase();
  const messages = document.querySelectorAll('.message');
  messages.forEach((message) => {
    const messageText = message.textContent.toLowerCase();
    if (messageText.includes(searchTerm)) {
      message.style.display = 'block'; // Show the message if it contains the search term
    } else {
      message.style.display = 'none'; // Hide the message if it doesn't contain the search term
    }
  });
}
function startTagging() {
  const cursorPosition = getCaretPosition(textarea);
  const textBeforeCursor = textarea.value.substring(0, cursorPosition);
  const lastWord = textBeforeCursor.split(/\s+/).pop();
  if (lastWord && lastWord.startsWith('@')) {
    const usernameToTag = lastWord.slice(1); // Remove the "@" symbol
    const taggedUsername = `<span class="tagged-user">@${usernameToTag}</span> `;

    // Replace the tagged username in the textarea
    textarea.value = textBeforeCursor.replace(/@\w+$/, taggedUsername) + textarea.value.substring(cursorPosition);
  }
}
// Listen for input in the search bar
searchInput.addEventListener('input', searchChat);