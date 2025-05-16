# Time Tracker Chrome Extension

A simple Chrome extension that tracks the time you spend on different websites with a movable timer interface.

## Features

- **Time Tracking**: Automatically tracks time spent on each website
- **Real-time Display**: Shows elapsed time in hours:minutes:seconds format
- **Movable Timer**: Drag and position the timer anywhere on the webpage
- **Popup Interface**: Quick view of current tab's time through extension popup
- **Persistent Storage**: Remembers time spent across browser sessions

## Installation

### From Source Code

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" by toggling the switch in the top right corner
4. Click "Load unpacked" and select the directory containing the extension files
5. The extension should now be installed and visible in your extensions list

## Usage

- **Timer Popup**: Click the extension icon in the toolbar to see the time spent on the current tab
- **Movable Timer**: A floating timer will appear on every webpage
  - Use the "Time Tracker" drag handle to reposition it anywhere on the page
  - The timer updates in real-time to show your time spent on the current tab

## File Structure

- `manifest.json`: Extension configuration
- `background.js`: Background script for tracking time spent on tabs
- `content.js`: Content script for displaying the movable timer on web pages
- `popup.html`: HTML layout for the extension popup
- `popup.js`: JavaScript for the extension popup
- `images.png`: Extension icon

## Permissions

This extension requires the following permissions:
- `activeTab`: To access the current tab's information
- `storage`: To store time data persistently
- `tabs`: To track and identify different tabs

## Future Enhancements

- Website statistics dashboard
- Daily/weekly usage reports
- Time limits and alerts
- Category-based website grouping
- Data export functionality

## License

MIT License

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
