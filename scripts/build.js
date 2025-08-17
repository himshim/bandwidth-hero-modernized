const fs = require('fs-extra');
const path = require('path');
const replace = require('replace-in-file');
const { version } = require('../package.json');

async function build() {
  // Clean dist directory
  await fs.remove('dist');
  await fs.ensureDir('dist');

  // Copy source files to dist (excluding _locales)
  const items = await fs.readdir('src', { withFileTypes: true });
  for (const item of items) {
    if (item.name !== '_locales') {
      const srcPath = path.join('src', item.name);
      const destPath = path.join('dist', item.name);
      if (item.isDirectory()) {
        await fs.copy(srcPath, destPath);
      } else {
        await fs.copy(srcPath, destPath);
      }
    }
  }

  // Update version in manifest
  await replace({
    files: 'dist/manifest.json',
    from: /"version": ".*"/,
    to: `"version": "${version}"`
  });

  console.log(`✅ Extension built for v${version}`);
}

build().catch(err => {
  console.error('❌ Build failed:', err);
  process.exit(1);
});