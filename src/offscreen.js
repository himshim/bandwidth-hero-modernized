chrome.runtime.onMessage.addListener(async (message) => {
  if (message.action === 'compress') {
    try {
      const response = await fetch(message.imageUrl);
      const blob = await response.blob();
      const compressedBlob = await compressImage(blob, message.quality);
      
      chrome.runtime.sendMessage({
        action: 'compressedImage',
        blob: compressedBlob,
        originalUrl: message.imageUrl
      });
    } catch (error) {
      console.error('Compression failed:', error);
    }
  }
});

async function compressImage(blob, quality) {
  return new Promise((resolve) => {
    const canvas = new OffscreenCanvas(1, 1);
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      canvas.convertToBlob({ type: 'image/jpeg', quality: quality / 100 })
        .then(resolve);
    };
    
    img.src = URL.createObjectURL(blob);
  });
}