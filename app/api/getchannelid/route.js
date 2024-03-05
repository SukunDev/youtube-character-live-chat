import axios from "axios";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  try {
    const response = await axios.get(decodeURIComponent(url));
    const regex = /"externalId":"([A-Za-z0-9_-]+)"/;
    const match = regex.exec(response.data);
    return Response.json({ status: true, channelId: match[1] });
  } catch (error) {
    return Response.json({
      status: false,
      message: "Failed To Get Channel Id ",
    });
  }
}
