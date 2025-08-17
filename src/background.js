let enabled = false;
let proxyUrl = '';
let quality = 50;

// Initialize settings
chrome.storage.sync.get(['enabled', 'proxyUrl', 'quality'], (result) => {
  enabled = result.enabled || false;
  proxyUrl = result.proxyUrl || '';
  quality = result.quality || 50;
  updateRules();
});

// Listen for setting changes
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync') {
    if (changes.enabled) enabled = changes.enabled.newValue;
    if (changes.proxyUrl) proxyUrl = changes.proxyUrl.newValue;
    if (changes.quality) quality = changes.quality.newValue;
    updateRules();
  }
});

// Update redirect rules
function updateRules() {
  const rules = [];
  
  if (enabled && proxyUrl) {
    rules.push({
      id: 1,
      priority: 1,
      action: {
        type: 'redirect',
        redirect: {
          regexSubstitution: `${proxyUrl}?url=\\0&quality=${quality}`
        }
      },
      condition: {
        regexFilter: '.*',
        resourceTypes: ['image'],
        excludedDomains: [new URL(proxyUrl).hostname]
      }
    });
  }

  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [1],
    addRules: rules
  });
}

// Handle compression via offscreen document
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'compressImage') {
    createOffscreenDocument();
    chrome.runtime.sendMessage({
      action: 'compress',
      imageUrl: message.imageUrl,
      quality: quality
    });
  }
});

// Create offscreen document for image processing
async function createOffscreenDocument() {
  if (await chrome.offscreen.hasDocument()) return;
  
  await chrome.offscreen.createDocument({
    url: 'offscreen.html',
    reasons: ['IMAGE_PROCESSING'],
    justification: 'Compress images to save bandwidth'
  });
}