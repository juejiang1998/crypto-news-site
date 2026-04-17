export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const response = await fetch("https://api.b.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer sk-5o8jmyf64u9fxkmgcieg5mo38r47pxt3"
      },
      body: JSON.stringify(body)
    });

    const text = await response.text();

    if (!text) {
      return res.status(500).json({
        error: "b.ai 返回为空",
        status: response.status
      });
    }

    return res
      .status(response.status)
      .setHeader("Content-Type", "application/json")
      .send(text);

  } catch (error) {
    return res.status(500).json({
      error: error.message || "server error"
    });
  }
}
