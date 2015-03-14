var tabStatuses = {};

var toggleComments = function(tabId, tabData) {
  if(tabData.commentBlocks === 0) { // no comments to show or hide
    chrome.pageAction.hide(tabId);
  } else if(tabData.hidingComments) {
    chrome.pageAction.show(tabId);
    chrome.pageAction.setIcon({ tabId: tabId, path: "icon.png" });
  } else {
    chrome.pageAction.show(tabId);
    chrome.pageAction.setIcon({ tabId: tabId, path: "icon_off.png" });
  }
};

var handleTabResponse = function(tabId, data) {
  tabStatuses[tabId] = data;
  toggleComments(tabId, tabStatuses[tabId]);
};

var sendMessageToTab = function(tabId, hideComments) {
  chrome.tabs.sendRequest(
    tabId, 
    { hideComments: hideComments }, 
    function(response) { 
      if(response !== undefined) {
        handleTabResponse(tabId, response);
      }
    }
  );
}

chrome.tabs.onUpdated.addListener(function(tabId, change, tab) {
  if (change.status == "complete") {
    sendMessageToTab(tabId, true);
  }
});

// click the monkey, show or hide comments
chrome.pageAction.onClicked.addListener(function(tab) {
  var data = tabStatuses[tab.id];
  sendMessageToTab(tab.id, !data.hidingComments);
});

chrome.tabs.onRemoved.addListener(function(tabId) {
  delete tabStatuses[tabId];
});
