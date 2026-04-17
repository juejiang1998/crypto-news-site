export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.b.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer sk-5o8jmyf64u9fxkmgcieg5mo38r47pxt3"
      },
      body: JSON.stringify(req.body)
    });

    const text = await response.text();

    return res.status(200).send(text);

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}
