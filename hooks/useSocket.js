import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

function useSocket() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_APP_BACKEND_URL);
    setSocket(socket);

    return () => socket.disconnect();
  }, []);

  return { socket };
}

export default useSocket;
