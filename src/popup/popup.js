document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('toggle');
  const status = document.getElementById('status');
  
  // Load saved state
  chrome.storage.sync.get(['enabled'], (result) => {
    toggle.checked = result.enabled || false;
    updateStatus(toggle.checked);
  });
  
  // Handle toggle changes
  toggle.addEventListener('change', () => {
    const enabled = toggle.checked;
    chrome.storage.sync.set({ enabled });
    updateStatus(enabled);
  });
  
  function updateStatus(enabled) {
    status.textContent = enabled ? 'ON' : 'OFF';
    status.style.color = enabled ? '#4CAF50' : '#F44336';
  }
});