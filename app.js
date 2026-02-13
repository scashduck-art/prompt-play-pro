async function generatePrompt() {
  const prompt = document.querySelector("textarea").value;
  const resultBox = document.querySelector(".result");

  resultBox.innerHTML = "⏳ กำลังสร้าง...";

  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();

    if (data.choices) {
      resultBox.innerHTML = data.choices[0].message.content;
    } else {
      resultBox.innerHTML = "❌ Error: " + JSON.stringify(data);
    }
  } catch (err) {
    resultBox.innerHTML = "❌ ระบบผิดพลาด";
  }
}