console.log("Time Tracker content script loaded");

const floatPanel = document.createElement('div');
floatPanel.id = 'timeTrackerPanel';

// Reset all inherited styles
floatPanel.style.all = 'initial';

// Set consistent styles with !important
floatPanel.style.cssText = `
  position: fixed !important;
  top: 10px !important;
  right: 10px !important;
  z-index: 2147483647 !important;
  background-color: black !important;
  color: white !important;
  padding: 10px !important;
  border: 1px solid #ccc !important;
  border-radius: 5px !important;
  user-select: none !important;
  width: 150px !important;
  height: auto !important;
  font-size: 14px !important;
  font-family: Arial, sans-serif !important;
  box-sizing: content-box !important;
`;

floatPanel.innerHTML = `
  <div id="dragHandle" style="padding-bottom: 5px; cursor: move; font-weight: bold;">Time Tracker</div>
  <div id="time" style="font-size: 16px;">00:00:00</div>
`;

document.body.appendChild(floatPanel);

// Dragging functionality
let isDragging = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

function dragStart(e) {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;

    if (e.target.id === "dragHandle") {
        isDragging = true;
    }
}

function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;

    isDragging = false;
}

function drag(e) {
    if (isDragging) {
        e.preventDefault();
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;

        xOffset = currentX;
        yOffset = currentY;

        setTranslate(currentX, currentY, floatPanel);
    }
}

function setTranslate(xPos, yPos, el) {
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
}

floatPanel.addEventListener("mousedown", dragStart, false);
document.addEventListener("mousemove", drag, false);
document.addEventListener("mouseup", dragEnd, false);

function updateTime() {
    chrome.storage.local.get(['timeSpent', 'activeTabId'], function(result) {
        const timeSpent = result.timeSpent || {};
        const activeTabId = result.activeTabId;
        const timeOnCurrentTab = Math.floor(timeSpent[activeTabId] || 0);
        const timeElement = document.getElementById('time');
        if (timeElement) {
            timeElement.textContent = formatTime(timeOnCurrentTab);
            timeElement.style.cssText = 'font-size: 16px !important; line-height: 1.2 !important;';
        }
    });
}

function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return [h, m, s].map(v => v < 10 ? '0' + v : v).join(':');
}

setInterval(updateTime, 1000);