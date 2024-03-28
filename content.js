var previousHeight = 0;
const scrollToBottom = () => {
    if(previousHeight == document.documentElement.scrollHeight) {
        console.log("End")
        previousHeight = 0;
    } else {
        console.log("Go More")
        window.scrollTo(previousHeight, document.documentElement.scrollHeight);
        previousHeight = document.documentElement.scrollHeight;
        setTimeout(scrollToBottom, 2000)
    }
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request["action"] === "scrollToBottom") {
        scrollToBottom();
    }
});
