require('dotenv').config()
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
app.use(express.json())


const {onConnection} = require("./controlleur/onConnection")(io);
const {onScan} = require("./controlleur/onScan")(io);

const connection = (socket) => {
  socket.on("onConnection",onConnection);
  socket.on("onScan", onScan);
}

io.on("connection", connection);
app.use("/auth",require('./routes/auth'))
app.use("/search",require('./routes/search'))


const PORT = process.env.PORT || 3000
httpServer.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});