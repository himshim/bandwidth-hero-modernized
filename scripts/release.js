const { execSync } = require('child_process');
const fs = require('fs-extra');
const { version } = require('../package.json');

async function release() {
  // Update package.json version (if provided via command line)
  const newVersion = process.env.npm_config_version || version;
  if (newVersion !== version) {
    execSync(`npm version ${newVersion} --no-git-tag-version`);
  }

  // Run build
  require('./build.js');

  // Create ZIP file
  execSync('npm run zip');

  console.log(`🚀 Release v${newVersion} ready!`);
}

release().catch(err => {
  console.error('❌ Release failed:', err);
  process.exit(1);
});