import React, { useEffect } from "react";
import useSocket from "./useSocket";
import { useThemeContext } from "@/components/provider";

function useLive(channelId) {
  const { socket } = useSocket();
  const { handleUsers } = useThemeContext();

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on("connect", () => {
      console.log("connected to socket");
      if (channelId) {
        socket.emit("setChannelId", channelId);
      }
    });

    socket.on("youtubeConnected", (data) => console.log(data));
    socket.on("youtubeDisconected", (data) => console.log(data));

    socket.on("chat", (data) => {
      handleUsers(data);
    });
  }, [socket, channelId, handleUsers]);

  const setChannelId = () => {
    socket.emit("setChannelId", channelId);
  };
  return { setChannelId };
}

export default useLive;
