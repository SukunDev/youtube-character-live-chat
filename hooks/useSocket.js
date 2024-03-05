import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

function useSocket() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:3000");
    setSocket(socket);

    return () => socket.disconnect();
  }, []);

  return { socket };
}

export default useSocket;
