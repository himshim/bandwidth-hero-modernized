const fs = require('fs-extra');
const { version } = require('../package.json');

async function build() {
  try {
    await fs.remove('dist');
    await fs.ensureDir('dist');
    await fs.copy('src', 'dist');
    
    const manifestPath = 'dist/manifest.json';
    const manifest = await fs.readJson(manifestPath);
    manifest.version = version;
    await fs.writeJson(manifestPath, manifest, { spaces: 2 });

    console.log(`✅ Chrome extension built for v${version}`);
  } catch (err) {
    console.error('❌ Build failed:', err);
    process.exit(1);
  }
}

build();