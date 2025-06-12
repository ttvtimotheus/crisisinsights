/**
 * Script to download necessary images for the Crisis Insights application
 * Run with: node src/scripts/download-images.js
 */

const fs = require('fs');
const https = require('https');
const path = require('path');

// Create directories if they don't exist
const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Function to download a file
const downloadFile = (url, filePath) => {
  return new Promise((resolve, reject) => {
    ensureDirectoryExists(path.dirname(filePath));

    if (fs.existsSync(filePath)) {
      console.log(`${filePath} already exists, skipping download.`);
      return resolve();
    }

    const file = fs.createWriteStream(filePath);
    console.log(`Downloading ${url} to ${filePath}...`);

    https.get(url, (response) => {
      response.pipe(file);

      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${filePath}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {});
      reject(err);
    });
  });
};

// Files to download
const filesToDownload = [
  {
    url: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    path: '../../public/leaflet/marker-icon.png'
  },
  {
    url: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    path: '../../public/leaflet/marker-icon-2x.png'
  },
  {
    url: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    path: '../../public/leaflet/marker-shadow.png'
  },
  {
    url: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=1920',
    path: '../../public/crisis-background.jpg'
  }
];

// Download all files
async function downloadAllFiles() {
  try {
    for (const file of filesToDownload) {
      await downloadFile(
        file.url, 
        path.join(__dirname, file.path)
      );
    }
    console.log('All files downloaded successfully!');
  } catch (error) {
    console.error('Error downloading files:', error);
    process.exit(1);
  }
}

downloadAllFiles();
