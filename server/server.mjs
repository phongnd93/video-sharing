import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import users from "./routes/user.mjs";
import videos from "./routes/video.mjs";
import session from "express-session";
const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use(session({
  secret: 'video-sharing',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

app.use("/user", users);
app.use('/video', videos);

// start the Express server
app.listen(PORT, () =>
{
  console.log(`Server is running on port: ${PORT}`);
});