// Add a context menu item for images
chrome.contextMenus.create({
  id: "viewImageWithGrid",
  title: "Open Image with Grid",
  contexts: ["image"],
  icons: {
    "16": "icons/grid-icon-16.png", // Path to your 16x16 icon
    "32": "icons/grid-icon-32.png"  // Path to your 32x32 icon
  }
});

// Listen for clicks on the context menu
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "viewImageWithGrid") {
    const imageUrl = info.srcUrl;
    console.log(imageUrl);
    chrome.windows.create({
      url: `grid4drawing.html?img=${encodeURIComponent(imageUrl)}`,
      type: "popup",
      width: 800,
      height: 800
    });
  }
});
