var tabStatuses = {};

var toggleComments = function(tabData) {
  if(tabData.commentBlocks === 0) { // no comments to show or hide
    chrome.pageAction.hide(tabData.tabId);
  } else if(tabData.hidingComments) {
    chrome.pageAction.show(tabData.tabId);
    chrome.pageAction.setIcon({ tabId: tabData.tabId, path: "icon.png" });
  } else {
    chrome.pageAction.show(tabData.tabId);
    chrome.pageAction.setIcon({ tabId: tabData.tabId, path: "icon_off.png" });
  }
};

var sendMessageToTab = function(tabId, hideComments) {
  chrome.tabs.sendMessage(
    tabId, 
    { tabId: tabId, hideComments: hideComments }
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

chrome.runtime.onMessage.addListener(function(data) {
  tabStatuses[data.tabId] = data;
  toggleComments(data);
});