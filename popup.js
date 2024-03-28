document.getElementById("startAnalyzingBtn").addEventListener("click", () => {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "scrollToBottom"}, function (response) {
            // console.error("Message Sent")
        });
    });
});


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.message === "followersUpdated") {
        const data = JSON.parse(message?.data);
        document.getElementById("followingCount").innerHTML = data?.total
        document.getElementById("followsBackCount").innerHTML = data?.followsBack
        document.getElementById("doesntFollowBackCount").innerHTML = data?.doesntFollowBack
        // console.error(JSON.parse(message?.data))
        // console.error("Received message from web page:", message.data?.length);
        sendResponse({response: "Hello from extension!"});
    } else if (message.message === "analysisComplete") {
        document.getElementById("message").innerHTML = "Analysis Complete!"
        sendResponse({response: "Hello from extension!"});
    }
    return false; // Indicate the message is not handled synchronously
});
