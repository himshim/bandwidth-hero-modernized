document.addEventListener('DOMContentLoaded', () => {
  const proxyUrlInput = document.getElementById('proxyUrl');
  const qualityInput = document.getElementById('quality');
  const saveBtn = document.getElementById('save');
  const status = document.getElementById('status');

  // Load saved settings
  chrome.storage.sync.get(['proxyUrl', 'quality'], ({ proxyUrl = '', quality = 50 }) => {
    proxyUrlInput.value = proxyUrl;
    qualityInput.value = quality;
  });

  // Save settings
  saveBtn.addEventListener('click', () => {
    const proxyUrl = proxyUrlInput.value.trim();
    const quality = parseInt(qualityInput.value);

    // Validate inputs
    if (!proxyUrl) {
      showStatus(chrome.i18n.getMessage('invalidProxyUrl'), 'error');
      return;
    }
    if (isNaN(quality) || quality < 1 || quality > 100) {
      showStatus(chrome.i18n.getMessage('invalidQuality'), 'error');
      return;
    }

    try {
      const url = new URL(proxyUrl);
      if (url.protocol !== 'https:') {
        showStatus(chrome.i18n.getMessage('httpsRequired'), 'error');
        return;
      }

      chrome.storage.sync.set({ proxyUrl, quality }, () => {
        showStatus(chrome.i18n.getMessage('settingsSaved'), 'success');
      });
    } catch (e) {
      showStatus(chrome.i18n.getMessage('invalidProxyUrl'), 'error');
    }
  });

  function showStatus(message, type) {
    status.textContent = message;
    status.className = `show ${type}`;
    setTimeout(() => {
      status.className = '';
      status.textContent = '';
    }, 3000);
  }
});