let timeSpent = {};
let currentTabId = null;
let startTime = null;

function updateTabTime() {
  if (currentTabId !== null && startTime !== null) {
    const endTime = Date.now();
    const timeSpentOnTab = Math.round((endTime - startTime) / 1000);
    if (!timeSpent[currentTabId]) {
      timeSpent[currentTabId] = 0;
    }
    timeSpent[currentTabId] += timeSpentOnTab;
    chrome.storage.local.set({ timeSpent, activeTabId: currentTabId });
    startTime = endTime;
  }
}

function setCurrentTab(tabId) {
  if (currentTabId !== tabId) {
    updateTabTime();
    currentTabId = tabId;
    startTime = Date.now();
    chrome.storage.local.set({ activeTabId: currentTabId });
  }
}

chrome.tabs.onActivated.addListener(activeInfo => {
  setCurrentTab(activeInfo.tabId);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.active && changeInfo.status === 'complete') {
    setCurrentTab(tabId);
  }
});

chrome.tabs.onRemoved.addListener(tabId => {
  updateTabTime();
  if (tabId === currentTabId) {
    currentTabId = null;
    startTime = null;
  }
});

// Start tracking time as soon as the extension is loaded
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  if (tabs[0]) {
    setCurrentTab(tabs[0].id);
  }
});

// Update time every second
setInterval(updateTabTime, 1000);