# Bandwidth Hero Modernized

[![Release](https://img.shields.io/github/v/release/himshim/bandwidth-hero-modernized)](https://github.com/himshim/bandwidth-hero-modernized/releases)
[![License](https://img.shields.io/github/license/himshim/bandwidth-hero-modernized)](LICENSE)
[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-blue)](https://chrome.google.com/webstore/detail/)

A modernized version of the [Bandwidth Hero](https://github.com/ayastreb/bandwidth-hero) extension for Manifest V3, originally created by **[ayastreb](https://github.com/ayastreb)**.

## 🌟 About This Project

Bandwidth Hero helps you save data by compressing images on web pages through a proxy server. This version has been completely modernized to work with Chrome's latest Manifest V3 requirements.

> **This is my personal hobby project.**  
> I've updated it to keep it functional in modern browsers, but to keep this extension alive and improving, **I need your help!**

This project is part of my personal journey to modernize the Bandwidth Hero ecosystem. I previously created [bandwidth-hero-proxy2](https://github.com/himshim/bandwidth-hero-proxy2) as a hobby project to update the proxy functionality, and now I'm continuing that work with this extension modernization.

## 🤝 Help Keep This Extension Alive

This project exists thanks to the original work of **[ayastreb](https://github.com/ayastreb)** and my personal efforts as a hobbyist developer. To ensure it continues to work and improve:

1. **⭐ Star this repository** - More stars = more visibility
2. **🐛 Report issues** - Help me identify and fix problems
3. **💻 Contribute code** - See [Contributing](#contributing) below
4. **📢 Spread the word** - Tell others about Bandwidth Hero
5. **☕ Support the original** - Consider supporting [ayastreb's work](https://github.com/ayastreb)

## 🚀 Installation

### From Chrome Web Store (Recommended)
[Install from Chrome Web Store](https://chrome.google.com/webstore/detail/) *(Coming soon)*

### Manual Installation
1. Download the latest release from the [Releases](https://github.com/himshim/bandwidth-hero-modernized/releases) page
2. Extract the ZIP file
3. Open Chrome and go to `chrome://extensions`
4. Enable "Developer mode" (top right)
5. Click "Load unpacked"
6. Select the extracted folder

## ⚙️ Setup

1. Click the extension icon in your browser toolbar
2. Enable the extension with the toggle switch
3. Click "Options" to configure your proxy server
4. Enter your proxy URL and desired image quality (1-100)

## 🛠️ Proxy Setup

You can use a public proxy or host your own:

### Public Proxies
- `https://bandwidth-hero-proxy.herokuapp.com/` (Free, public service)
- `https://your-proxy.com/` (Replace with your preferred service)

### Self-Hosted Proxy
1. Set up your own proxy using [bandwidth-hero-proxy](https://github.com/ayastreb/bandwidth-hero-proxy)
2. Or try my modernized version: [bandwidth-hero-proxy2](https://github.com/himshim/bandwidth-hero-proxy2)
3. Configure the extension to use your proxy URL

## 🧪 Building from Source

```bash
# Clone the repository
git clone https://github.com/himshim/bandwidth-hero-modernized.git
cd bandwidth-hero-modernized

# Install dependencies
npm install

# Build the extension
npm run build

# The built extension will be in the dist/ directory