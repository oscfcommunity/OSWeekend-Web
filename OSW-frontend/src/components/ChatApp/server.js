
// /*---------------------------------------------------*/
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const { ObjectId } = require('mongodb');
const bodyParser = require('body-parser');
const objectId = new ObjectId();
const http = require('http').createServer(app);
const ChatMessage = require('./models/ChatMessage');
const io = require('socket.io')(http);
require('dotenv').config();

const User = require('./models/User');
const PORT = process.env.PORT || 9000;
app.use(cors());

// import {LocalStorage} from 'node-localstorage'
async function getAllUsernames() {
  try {
    const users = await User.find({}, 'user_name'); // Query only the 'username' field
    return users.map(user => user.user_name);
  } catch (error) {
    console.error('Error getting usernames:', error);
    return [];
  }
}

mongoose.connect(process.env.DBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });
http.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

// app.post('/receive-username', (req, res) => {
//   const { username } = req.body;
//   const usernameString = String(username)
//   io.emit('username-received', username);

//   // localStorage.setItem('username',{username});
//   console.log(`Received usernamewfguig: ${username}`);
//   // console.log(`Received username: ${username}`);
//   res.sendStatus(200);
// });
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
const connectedUsers = {};
const unreportedMessages = new Set();
let username = '';
const reportedMessages = new Set();
io.on('connection', (socket) => {
  // console.log('Connected...');
  // socket.emit('username-received', { username }); 
  socket.on('message', async (msg) => {
    const chatMessage = new ChatMessage({
      user: msg.user,
      message: msg.message,
      messageType: msg.messageType,
      fileName: msg.fileName,
      fileType: msg.fileType,
      seenByUsers: [],
    });

    try {
      await chatMessage.save();
      console.log('Chat message saved:', chatMessage);
    } catch (error) {
      console.error('Error saving chat message:', error);
    }
    const taggedUsernames = Array.from(msg.message.matchAll(/@\w+/g)).map(match => match[0].slice(1));


    for (const socketId in connectedUsers) {
      if (taggedUsernames.includes(connectedUsers[socketId])) {
        io.to(socketId).emit('tag-notification', msg.user);
      }
    }
    socket.broadcast.emit('message', msg);
    chatMessage.seenByUsers.push(msg.user);
    // await chatMessage.save();
  });
  socket.on('message-seen', async (messageId, user) => {
    try {
      // Find the message in your MongoDB collection by its _id
      const message = await ChatMessage.findById(messageId);

      if (message) {
        // Update the "seenByUsers" array with the current user's username
        if (!message.seenByUsers.includes(user)) {
          message.seenByUsers.push(user);
          await message.save();
        }
      }
    } catch (error) {
      console.error('Error updating seen status:', error);
    }
  });
  // Socket.io event to report a chat message
  const deleteChatMessageById = async (messageId) => {
    try {
      await ChatMessage.findByIdAndDelete(messageId);
      console.log(`Chat message with ID ${messageId} has been deleted.`);
    } catch (error) {
      console.error('Error deleting chat message:', error);
    }
  };

  socket.on('report-chat', async ({ messageId }) => {
    try {
      // Check if the message has already been reported
      if (!reportedMessages.has(messageId)) {
        // Mark the message as reported
        reportedMessages.add(messageId);

        // Get the reported message and its owner
        const reportedMessage = await ChatMessage.findById(messageId);
        const reporterUsername = connectedUsers[socket.id];
        const ownerUsername = reportedMessage.user; // Get the owner's username from the message

        // Check if the reporter is different from the owner of the message
        if (reporterUsername !== ownerUsername) {
          // Emit a message event with the reported message and owner information
          io.emit('message', {
            user: '',
            message: `${reporterUsername} Reported Chat and was sent by ${ownerUsername}:`,
            messageType: 'text',
          });

          // Delete the message from the database after 10 seconds
          // setTimeout(() => {
          //   deleteChatMessageById(messageId);
          //   reportedMessages.delete(messageId);
          //   console.log(`Chat message with ID ${messageId} has been deleted after being reported.`);
          // }, 10000); // 10 seconds

          console.log(`Chat message with ID ${messageId} has been reported.`);
        } else {
          // User attempted to report their own message, you can handle this case as needed
          console.log(`User ${reporterUsername} attempted to report their own message.`);
        }
      }
    } catch (error) {
      console.error('Error reporting chat message:', error);
    }
  });
  socket.on('unreport-chat', async (messageId) => {
    try {
      // Remove the message from the reported messages Set
      reportedMessages.delete(messageId);
      // You can also remove the 'reported-message' class from the message element if needed
      // Notify all clients that a message has been unreported (you can use socket.broadcast.emit)
      io.emit('unreport-message', messageId);
      console.log(`Chat message with ID ${messageId} has been unreported.`);
    } catch (error) {
      console.error('Error unreporting chat message:', error);
    }
  });

  socket.on('user-joined', async (username) => {
    connectedUsers[socket.id] = username;
    console.log(`${username} connected`);
    const allUsernames = await getAllUsernames();
    console.log('All Usernames:', allUsernames);
    

    if (allUsernames.includes(username)) {
      // User is valid, fetch previous chat messages from the database
      try {
        const previousMessages = await ChatMessage.find({}).sort({ createdAt: 1 }).exec();

        // Emit the previous chat messages to the newly joined user
        const message = `${username} joined the chat`;
        socket.emit('previous-messages', previousMessages);
        console.log(`User ${username} joined the chat`);
        // This line sends the "joined the chat" message to all clients, including the new user.
        socket.emit('user-joined', { user:username, messageType: 'user-joined', message: `${username} joined the chat` });

      } catch (error) {
        console.error('Error fetching previous messages:', error);
      }
    } else {
      const errorMessage = `${username} is not a valid user`;
      socket.emit('invalid-user', errorMessage);
    }
    socket.emit('username-received', { username });
  });
  socket.on('report-message', (reportedMessageId) => {
    // Add the reported message ID to the set
    reportedMessages.add(reportedMessageId);

    // Broadcast the reported message to all clients
    io.emit('reported-message', reportedMessageId);
  });
  socket.on('reply-message', async (replyData) => {
    // const { user, message, repliedToUser, repliedToMessage, } = replyData;

    // Create a new ChatMessage document for the reply
    const chatMessage = new ChatMessage({
      user: replyData.user,
      message: replyData.message,
      messageType: replyData.messageType, // Customize as needed
      isReply: true,       // Set to true for reply messages
      repliedToUser: replyData.repliedToUser,
      repliedToMessage: replyData.repliedToMessage,
    });

    try {
      // Save the reply message to the database
      await chatMessage.save();
      console.log('Reply message saved:', chatMessage);
    } catch (error) {
      console.error('Error saving reply message:', error);
    }

    // Broadcast the reply message to other clients
    socket.broadcast.emit('message', chatMessage);
  });
});
