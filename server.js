const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const socketIO = require("socket.io");
const { YoutubeLiveChatWrapper } = require("./utills/connectionWrapper");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      if (pathname === "/a") {
        await app.render(req, res, "/a", query);
      } else if (pathname === "/b") {
        await app.render(req, res, "/b", query);
      } else {
        await handle(req, res, parsedUrl);
      }
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  });

  const io = socketIO(server);

  io.on("connection", (socket) => {
    let youtubeLiveChatWrapper;
    console.log(`A user connected ${socket.id}`);

    socket.on("setChannelId", (channelId) => {
      try {
        youtubeLiveChatWrapper = new YoutubeLiveChatWrapper(channelId, true);
        youtubeLiveChatWrapper.connect();
      } catch (err) {
        socket.emit("youtubeDisconnected", err.toString());
        return;
      }
      // Notify client when stream ends
      youtubeLiveChatWrapper.connection.on("end", () =>
        socket.emit("streamEnd")
      );
      youtubeLiveChatWrapper.connection.on("error", () =>
        socket.emit("streamError")
      );

      // Redirect message events
      youtubeLiveChatWrapper.connection.on("chat", (msg) =>
        socket.emit("chat", msg)
      );
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  server.once("error", (err) => {
    console.error(err);
    process.exit(1);
  });

  server.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
