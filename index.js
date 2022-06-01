require('dotenv').config()
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = express();
const cors = require("cors")

const httpServer = createServer(app);
app.use(express.json())
app.use(cors())
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const {QRCODE} = require("./controlleur/QRCODE")(io);

const connection = (socket) => {
  socket.on("QRCODE", QRCODE);
}

io.on("connection", connection);
app.use("/auth",require('./routes/auth'))


const PORT = process.env.PORT || 3000
httpServer.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});