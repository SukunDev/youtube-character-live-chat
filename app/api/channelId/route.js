import { getOptionsFromLivePage } from "@/utills/parser";
import axios from "axios";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const channelId = searchParams.get("channelId");
  try {
    const response = await axios.get(
      `https://www.youtube.com/channel/${channelId}/live`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
        },
      }
    );

    const result = getOptionsFromLivePage(response.data);

    return Response.json({
      text: response.data.toString(),
      status: true,
      result,
    });
  } catch (error) {
    return Response.json({
      status: false,
      message: error.toString(),
      text: response.data.toString(),
    });
  }
}
