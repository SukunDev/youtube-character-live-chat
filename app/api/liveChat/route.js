import axios from "axios";
import { parseChatData } from "@/utills/parser";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const apiKey = searchParams.get("apiKey");
  const clientVersion = searchParams.get("clientVersion");
  const continuation = searchParams.get("continuation");
  try {
    const response = await axios.post(
      `https://www.youtube.com/youtubei/v1/live_chat/get_live_chat?key=${decodeURIComponent(
        apiKey
      )}`,
      {
        context: {
          client: {
            clientVersion: decodeURIComponent(clientVersion),
            clientName: "WEB",
          },
        },
        continuation: decodeURIComponent(continuation),
      }
    );
    const result = parseChatData(response.data);
    return Response.json({
      status: true,
      result: { liveChat: result[0], continuation: result[1] },
    });
  } catch (error) {
    return Response.json({
      status: false,
      message: error.toString(),
    });
  }
}
