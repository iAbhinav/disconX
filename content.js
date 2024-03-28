var previousHeight = 0;
var followers = []

function parseUsers() {
    const userDivs = document.querySelectorAll('[aria-label="Timeline: Following"] div[tabindex="0"][role="button"]');
    // console.log("Users length", userDivs?.length)
    for (var i = 0; i < userDivs?.length; i += 2) {
        // console.log("Whole Div", userDivs[i])
        const userDiv = userDivs[i];
        if (userDiv) {
            const name = userDiv.querySelector('a[role=link] div[dir="ltr"] span span')?.innerHTML
            const followsHTML = userDiv.querySelector('div[data-testid="userFollowIndicator"] span')?.innerHTML
            const userHandle = userDiv.querySelector('a[tabindex="-1"] span')?.innerHTML;
            if (!followers[userHandle]) {
                followers[userHandle] = {
                    handle: userHandle,
                    name: name,
                    followsBack: followsHTML == "Follows you"
                }
            }
        }
        // console.log(userDivs[i].querySelector('a[tabindex="-1"] span')?.innerHTML)
        // console.log("Follow Button", userDivs[i+1])
    }
}


function slowScroll(startHeight, targetHeight, duration = 500) {
    const distanceToScroll = targetHeight - startHeight;
    const scrollAmountPerInterval = distanceToScroll / (duration / 10); // Assuming 10ms interval
    let currentHeight = startHeight;

    const scrollInterval = setInterval(() => {
        currentHeight += scrollAmountPerInterval;
        window.scrollBy(0, Math.round(scrollAmountPerInterval)); // Round for smoother effect
        parseUsers();
        if (currentHeight >= targetHeight) {
            clearInterval(scrollInterval);
            window.scrollTo(0, targetHeight); // Ensure final position
        }
    }, 100); // Adjust interval for desired scroll speed (lower for slower)
}

const scrollToBottom = () => {

    if (previousHeight == document.documentElement.scrollHeight) {
        previousHeight = 0;
        const data = {
            total: 0,
            followsBack: 0,
            followBackUsers: [],
            doesntFollowBack: 0,
            doesntFollowBackUsers: []
        }
        Object.keys(followers).forEach(key => {
            const user = followers[key];
            // console.log(user?.name, key, user?.followsBack)
            data.total ++;
            if(user?.followsBack) {
                data.followsBack++;
                data.followBackUsers[user?.handle] = user;
            } else {
                data.doesntFollowBack++;
                data.doesntFollowBackUsers[user?.handle] = user;
            }
        })
        // console.log("Total Following", Object.keys(followers)?.length)
        console.log("🔥 Final Data 🔥")
        console.log("Total Following: ", data.total)
        console.log("Following Back: ", data.followsBack)
        console.log("Not Following Back: ", data.doesntFollowBack)

    } else {
        // console.log("Go More")
        // window.scrollTo(previousHeight, document.documentElement.scrollHeight);
        slowScroll(previousHeight, document.documentElement.scrollHeight);
        previousHeight = document.documentElement.scrollHeight;
        setTimeout(scrollToBottom, 2000)
    }
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request["action"] === "scrollToBottom") {
        scrollToBottom();
    }
});
