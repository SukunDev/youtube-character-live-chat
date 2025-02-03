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
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36",
          "X-Browser-Channel": "stable",
          "X-Browser-Copyright":
            "Copyright 2025 Google LLC. All rights reserved.",
          "X-Browser-Validation": "Ty5481SnuDG2fxASUTOpmh9tIrU=",
          "X-Browser-Year": "2025",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          "Content-Type": "application/json",
          Origin: "https://www.youtube.com",
          Referer: "https://www.youtube.com/",
          "Accept-Language": "en-US,en;q=0.9",
        },
      }
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
