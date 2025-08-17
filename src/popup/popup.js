document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('toggle');
  const status = document.getElementById('status');
  const optionsBtn = document.getElementById('options');

  // Load saved state
  chrome.storage.sync.get(['enabled'], ({ enabled = false }) => {
    toggle.checked = enabled;
    updateStatus(enabled);
  });

  // Handle toggle changes
  toggle.addEventListener('change', () => {
    const enabled = toggle.checked;
    chrome.storage.sync.set({ enabled }, () => {
      updateStatus(enabled);
    });
  });

  // Open options page
  optionsBtn.addEventListener('click', () => {
    chrome.runtime.openOptionsPage();
  });

  function updateStatus(enabled) {
    status.textContent = chrome.i18n.getMessage(enabled ? 'on' : 'off');
    status.style.backgroundColor = enabled ? '#E8F5E9' : '#FFEBEE';
    status.style.color = enabled ? '#388E3C' : '#D32F2F';
  }
});