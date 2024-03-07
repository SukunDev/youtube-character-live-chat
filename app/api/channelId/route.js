import { getOptionsFromLivePage } from "@/utills/parser";
import axios from "axios";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const channelId = searchParams.get("channelId");
  try {
    const response = await axios.get(
      `https://www.youtube.com/channel/${channelId}/live`
    );
    const result = getOptionsFromLivePage(response.data);

    return Response.json({
      status: true,
      result,
    });
  } catch (error) {
    return Response.json({
      status: false,
      message: error.toString(),
    });
  }
}
