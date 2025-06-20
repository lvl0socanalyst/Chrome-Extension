(function () {
  const styleId = "dark-mode-extension-style";

  if (document.getElementById(styleId)) {
    document.getElementById(styleId).remove(); // Toggle off
  } else {
    const style = document.createElement("style");
    style.id = styleId;
    style.innerText = `
      html, body {
        background-color: #121212 !important;
        color: #e0e0e0 !important;
      }
      img, video {
        filter: brightness(0.8) !important;
      }
      a {
        color: #bb86fc !important;
      }
      * {
        background-color: transparent !important;
        border-color: #333 !important;
      }
    `;
    document.head.appendChild(style); // Toggle on
  }
})();