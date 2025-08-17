let enabled = false;
let proxyUrl = '';
let quality = 50;

// Initialize settings
chrome.storage.sync.get(['enabled', 'proxyUrl', 'quality'], (result) => {
  enabled = result.enabled ?? false;
  proxyUrl = result.proxyUrl ?? '';
  quality = result.quality ?? 50;
  updateRules().catch(console.error);
});

// Listen for setting changes
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync') {
    enabled = changes.enabled?.newValue ?? enabled;
    proxyUrl = changes.proxyUrl?.newValue ?? proxyUrl;
    quality = changes.quality?.newValue ?? quality;
    updateRules().catch(console.error);
  }
});

// Update redirect rules
async function updateRules() {
  const rules = enabled && proxyUrl ? [{
    id: 1,
    priority: 1,
    action: {
      type: 'redirect',
      redirect: {
        regexSubstitution: `${proxyUrl}?url=\\0&quality=${quality}`
      }
    },
    condition: {
      regexFilter: '\\.(jpe?g|png|gif|webp|bmp)$',
      resourceTypes: ['image'],
      excludedInitiatorDomains: [new URL(proxyUrl).hostname].filter(Boolean)
    }
  }] : [];

  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [1],
    addRules: rules
  });
}

// Handle compression via offscreen document
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'compressImage') {
    createOffscreenDocument().then(() => {
      chrome.runtime.sendMessage({
        action: 'compress',
        imageUrl: message.imageUrl,
        quality
      });
    }).catch(console.error);
  }
});

// Create offscreen document for image processing
async function createOffscreenDocument() {
  if (await chrome.offscreen.hasDocument?.()) return;
  
  await chrome.offscreen.createDocument({
    url: 'offscreen.html',
    reasons: ['IMAGE_PROCESSING'],
    justification: 'Compress images to save bandwidth'
  });
}

// Handle service worker keep-alive for mobile
chrome.runtime.onStartup.addListener(() => {
  chrome.storage.sync.get(['enabled', 'proxyUrl', 'quality'], (result) => {
    enabled = result.enabled ?? false;
    proxyUrl = result.proxyUrl ?? '';
    quality = result.quality ?? 50;
    updateRules().catch(console.error);
  });
});