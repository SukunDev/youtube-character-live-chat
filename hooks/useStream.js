import { useThemeContext } from "@/components/provider";
import axios from "axios";
import React, { useEffect, useState } from "react";

function useStream({ params }) {
  const [liveId, setLiveId] = useState(null);
  const [apiKey, setApiKey] = useState(null);
  const [clientVersion, setClientVersion] = useState(null);
  const [continuation, setContinuation] = useState(null);
  const { handleUsers } = useThemeContext();

  useEffect(() => {
    const build = async () => {
      const response = await axios.get(
        `/api/channelId?channelId=${params.slug}`
      );
      if (response.data.status) {
        setApiKey(response.data.result.apiKey);
        setClientVersion(response.data.result.clientVersion);
        setLiveId(response.data.result.liveId);
        setContinuation(response.data.result.continuation);
      }
    };
    build();
  }, [params]);

  useEffect(() => {
    const getLiveChat = async () => {
      if (continuation) {
        const response = await axios.get(
          `/api/liveChat?apiKey=${encodeURIComponent(
            apiKey
          )}&clientVersion=${encodeURIComponent(
            clientVersion
          )}&continuation=${encodeURIComponent(continuation)}`
        );
        if (response.data.status) {
          setContinuation(response.data.result.continuation);
          const users = response.data.result.liveChat;
          if (users.length > 0) {
            users.forEach((user) => handleUsers(user));
          }
        }
      }
    };
    const interval = setInterval(getLiveChat, 1000);

    return () => clearInterval(interval);
  }, [continuation, apiKey, clientVersion]);

  return {};
}

export default useStream;
