document.getElementById("startDisconnectBtn").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: "scrollToBottom" }, function (response) {
      // console.error("Message Sent")
    });
  });
});
