import axios from "axios";

export async function GET() {
  try {
    const { data } = await axios.get("https://zenquotes.io/api/random");
    const quote = data[0].q;
    return new Response(JSON.stringify({ quote }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ quote: "Error fetching quote" }), { status: 500 });
  }
}
