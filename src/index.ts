import dotenv from "dotenv";
import express, { Express, NextFunction, Request, Response } from "express";
import { verifyJWT } from "./middleware/auth.middleware";
import AuthRoute from "./routes/auth.route";
import chatRouter from "./routes/chat.route";
import messageRouter from "./routes/message.route";
import UserRoute from "./routes/user.route";
import bodyParser = require("body-parser");
const http = require("http");
const cors = require("cors");
const app: Express = express();
const port = process.env.PORT;
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

const CHAT_JOIN = "chat_join";
const CHAT_LEAVE = "chat_leave";
const CHAT_MESSAGE = "chat_message";
const SETUP = "setup";
const CHAT_CONNECTION = "chat_connection";
const NEW_MESSAGE = "new_message";

io.on("connection", (socket: any) => {
  io.emit(CHAT_CONNECTION, {
    room: socket.room,
  });

  socket.on("disconnecting", () => {
    // console.log("rooms ", socket.rooms); // the Set contains at least the socket ID
  });
  socket.on(CHAT_JOIN, (chat_id: any) => {
    const chat_key = `chat_${chat_id}`;
    socket.join(chat_key);
  });
  socket.on(SETUP, (user_id: number) => {
    const user_key = `user_${user_id}`;
    socket.join(user_key);

    socket.except(user_key).emit("connected", user_id);
  });

  socket.on(NEW_MESSAGE, (data: any) => {
    const chat_key = `chat_${data?.chat_id}`;

    for (let user of data?.users) {
      if (user?.user_id === data?.author_id) continue;
      socket.to(`user_${user.user_id}`).emit(NEW_MESSAGE, data);
    }
  });
});

dotenv.config();

app.use(bodyParser.json());
const white_list = ["http://localhost:3000", process.env.FRONTEND_CORS];
const cor_options = {
  origin: (origin: string, callback: any = () => {}) => {
    if (white_list.includes(origin) || !origin) {
      callback(null, true);
      return;
    } else {
      callback(new Error("Not Allowed by cors"));
      return;
    }
  },
};
app.use(cors(cor_options));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/api/auth", AuthRoute);

app.use(verifyJWT); // only auth required urls add verifyjwt
app.use("/api/users", UserRoute);
app.use("/api/chats", chatRouter);
app.use("/api/messages", messageRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send("Something broke!");
});
server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
