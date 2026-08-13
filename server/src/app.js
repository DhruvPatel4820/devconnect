const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error.middleware");
const authRoutes = require("./routes/auth.routes");
const userRoute = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const likeRoutes = require("./routes/like.routes");
const commentRoutes = require("./routes/comment.routes");
const followRoutes = require("./routes/follow.routes");
const notificationRouter = require("./routes/notification.routes");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/likes", likeRoutes);
app.use("/api/v1/comments", commentRoutes);
app.use("/api/v1/follows", followRoutes);
app.use("/api/v1/notifications", notificationRouter);

app.use(errorHandler);
module.exports = app;
