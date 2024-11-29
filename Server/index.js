const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const http = require('http');
const socket = require('socket.io');
const { createUserTable,createStateTable,createImageTable } = require('./Models/userModel');
const { createProfileTable } = require('./Models/profileModel');
const { createLikedTable } = require('./Models/likedModel');
const { createRoomTable } = require('./Models/roomModel');
const { createProposalTable,createBlockTable } = require('./Models/proposalModel');
const { createLocationTable } = require('./Models/locationModel');
const { createMatchTable } = require('./Models/matchModel');
const { createChatHistoryTable,createChatRequestTable } = require('./Models/chatModel');
const { createLoyaltyTable } = require('./Models/loyaltyModel');
const { createNSFWTable } = require('./Models/NSFW');
const { createLoveGuruTable,createFeedbackTable,createLocationGuruTable } = require('./Models/guruModel');
const userRoutes = require('./Routes/userRoute');
const likeRouter = require('./Routes/likeRoute');
const chatRouter = require('./Routes/chatRoute');
const proposeRouter = require('./Routes/proposeRoute');
const locationRouter = require('./Routes/locationRoute');
const imageRouter = require('./Routes/imageRoute');
const loveGuruRouter = require('./Routes/loveGuruRoute');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());

const server = http.createServer(app);
const io = socket(server);

io.on('connection', (socket) => {
  require('./Modules/socketIO')(socket, io);
});

createUserTable();
createProfileTable();
createLikedTable();
createRoomTable();
createProposalTable();
createBlockTable();
createLocationTable();
createMatchTable();
createChatHistoryTable();
createChatRequestTable();
createStateTable();
createImageTable();
createNSFWTable();
createLoyaltyTable();
createLoveGuruTable();
createFeedbackTable();
//createLocationGuruTable();

app.use('/users', userRoutes);
app.use('/likes', likeRouter);
app.use('/rooms',chatRouter);
app.use('/proposals',proposeRouter);
app.use('/locations',locationRouter);
app.use('/images', imageRouter);
app.use('/loveGuru', loveGuruRouter);

const PORT = process.env.PORT || 5000;
const SOCKET_PORT = process.env.SOCKET_PORT || 4500;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

server.listen(SOCKET_PORT, () => console.log(`Socket.io server running on port ${SOCKET_PORT}`));