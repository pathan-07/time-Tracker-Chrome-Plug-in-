function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return [h, m, s].map(v => v < 10 ? '0' + v : v).join(':');
}

function updateTime() {
  chrome.storage.local.get(['timeSpent'], function(result) {
    const timeSpent = result.timeSpent || {};
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      const currentTabId = tabs[0].id;
      const timeOnCurrentTab = Math.floor(timeSpent[currentTabId] || 0);
      document.getElementById('time').textContent = formatTime(timeOnCurrentTab);
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  updateTime();
  setInterval(updateTime, 1000);
});