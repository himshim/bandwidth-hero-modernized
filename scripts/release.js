const { execSync } = require('child_process');
const { version } = require('../package.json');

async function release() {
  try {
    // Update package.json version if provided
    const newVersion = process.env.npm_config_version || version;
    if (newVersion !== version) {
      execSync(`npm version ${newVersion} --no-git-tag-version`, { stdio: 'inherit' });
    }

    // Run build
    require('./build.js');

    // Create ZIP file
    execSync('npm run zip', { stdio: 'inherit' });

    console.log(`🚀 Chrome extension release v${newVersion} ready!`);
  } catch (err) {
    console.error('❌ Release failed:', err);
    process.exit(1);
  }
}

release();