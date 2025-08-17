function saveOptions() {
  const proxyUrl = document.getElementById('proxyUrl').value;
  const quality = document.getElementById('quality').value;
  
  // Validate proxy URL
  try {
    new URL(proxyUrl);
    chrome.storage.sync.set({ proxyUrl, quality: parseInt(quality) }, () => {
      showStatus('Settings saved!');
    });
  } catch (e) {
    showStatus('Invalid proxy URL!', 'error');
  }
}

function showStatus(message, type = 'success') {
  const status = document.getElementById('status');
  status.textContent = message;
  status.className = type;
  setTimeout(() => status.textContent = '', 3000);
}

// Load saved settings
document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get(['proxyUrl', 'quality'], (result) => {
    document.getElementById('proxyUrl').value = result.proxyUrl || '';
    document.getElementById('quality').value = result.quality || 50;
  });
  
  document.getElementById('save').addEventListener('click', saveOptions);
});