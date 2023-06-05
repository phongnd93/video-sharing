import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import users from "./routes/user.mjs";
import videos from "./routes/video.mjs";
import session from "express-session";

import { createServer } from "http";
import { Server } from "socket.io";

const PORT = process.env.PORT || 8088;
const SOCKET_PORT = process.env.SOCKET_PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json());
const server = createServer(app);

const io = new Server(server, { cors: '*' });
// Create connection
io.on("connection", function (socket)
{
    socket.on("disconnect", function ()
    {
    });
    //Listen data from client
    socket.on("Client-sent-data", function (data)
    {
        socket.emit("Server-sent-data", data);
    });
});

// Make io accessible to our router
app.use(function(req,res,next){
    req.io = io;
    next();
});

app.use(session({
    secret: 'video-sharing',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.use("/user", users);
app.use('/video', videos);

// start the Express server
// app.listen(3000);
server.listen(SOCKET_PORT, () =>
{
    console.log(`Socket is running on port: ${SOCKET_PORT}`);
});


app.listen(PORT, () =>
{
    console.log(`Server is running on port: ${PORT}`);
});