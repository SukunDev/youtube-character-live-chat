const { EventEmitter } = require("events");
const { LiveChat } = require("youtube-chat");

let globalConnectionCount = 0;

/**
 * TikTok LIVE connection wrapper with advanced reconnect functionality and error handling
 */
class YoutubeLiveChatWrapper extends EventEmitter {
  constructor(channelId, enableLog) {
    super();

    this.channelId = channelId;
    this.enableLog = enableLog;

    // Connection State
    this.clientDisconnected = false;
    this.reconnectEnabled = true;
    this.reconnectCount = 0;
    this.reconnectWaitMs = 1000;
    this.maxReconnectAttempts = 5;
    this.connection = new LiveChat({ channelId: channelId });

    this.connection.on("end", () => {
      globalConnectionCount -= 1;
      this.log(`streamEnd event received, giving up connection`);
      this.reconnectEnabled = false;
    });

    this.connection.on("error", (err) => {
      this.log(err.toString());
    });
  }

  connect(isReconnect) {
    this.connection
      .start()
      .then((state) => {
        if (state) {
          this.log(`Sream has ${isReconnect ? "Reconnected" : "Connected"}`);

          globalConnectionCount += 1;

          // Reset reconnect vars
          this.reconnectCount = 0;
          this.reconnectWaitMs = 1000;

          // Client disconnected while establishing connection => drop connection
          if (this.clientDisconnected) {
            this.connection.stop();
            return;
          }

          // Notify client
          if (!isReconnect) {
            this.emit("connected", "connected");
          }
        }
      })
      .catch((err) => {
        this.log(
          `Stream ${isReconnect ? "Reconnect" : "Connection"} failed, ${err}`
        );

        if (isReconnect) {
          // Schedule the next reconnect attempt
          this.scheduleReconnect(err);
        } else {
          // Notify client
          this.emit("disconnected", err.toString());
        }
      });
  }

  scheduleReconnect(reason) {
    if (!this.reconnectEnabled) {
      return;
    }

    if (this.reconnectCount >= this.maxReconnectAttempts) {
      this.log(`Give up connection, max reconnect attempts exceeded`);
      this.emit("disconnected", `Connection lost. ${reason}`);
      return;
    }

    this.log(`Try reconnect in ${this.reconnectWaitMs}ms`);

    setTimeout(() => {
      if (
        !this.reconnectEnabled ||
        this.reconnectCount >= this.maxReconnectAttempts
      ) {
        return;
      }

      this.reconnectCount += 1;
      this.reconnectWaitMs *= 2;
      this.connect(true);
    }, this.reconnectWaitMs);
  }

  disconnect() {
    this.log(`Client connection disconnected`);

    this.clientDisconnected = true;
    this.reconnectEnabled = false;

    if (this.connection.getState().isConnected) {
      this.connection.disconnect();
    }
  }

  log(logString) {
    if (this.enableLog) {
      console.log(`WRAPPER @${this.channelId}: ${logString}`);
    }
  }
}

module.exports = {
  YoutubeLiveChatWrapper,
  getGlobalConnectionCount: () => {
    return globalConnectionCount;
  },
};
