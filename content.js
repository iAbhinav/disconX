function helloWorld(){
    console.log("Hello World")
}

helloWorld();

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log("Button clicked in popup!")
});
