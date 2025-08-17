const fs = require('fs-extra');
const path = require('path');
const replace = require('replace-in-file');
const { version } = require('../package.json');

async function build() {
  // Clean dist directory
  await fs.remove('dist');
  await fs.ensureDir('dist');

  // Copy source files to dist
  await fs.copy('src', 'dist');

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