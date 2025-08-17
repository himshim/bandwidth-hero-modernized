chrome.runtime.onMessage.addListener(async (message) => {
  if (message.action !== 'compress') return;

  try {
    const response = await fetch(message.imageUrl, { mode: 'cors' });
    if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);
    
    const blob = await response.blob();
    if (blob.size > 5 * 1024 * 1024) { // Limit to 5MB
      throw new Error('Image too large');
    }

    const compressedBlob = await compressImage(blob, message.quality);
    chrome.runtime.sendMessage({
      action: 'compressedImage',
      blob: compressedBlob,
      originalUrl: message.imageUrl
    });
  } catch (error) {
    console.error('Compression failed:', error);
    chrome.runtime.sendMessage({
      action: 'compressionFailed',
      originalUrl: message.imageUrl,
      error: error.message
    });
  }
});

async function compressImage(blob, quality) {
  const canvas = new OffscreenCanvas(1, 1);
  const ctx = canvas.getContext('2d');
  const img = new Image();
  
  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = () => reject(new Error('Image load failed'));
    img.src = URL.createObjectURL(blob);
  });

  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);
  
  return await canvas.convertToBlob({ type: 'image/webp', quality: quality / 100 });
}