const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

// Initialize Firebase
const serviceAccount = require('./path/to/serviceAccountKey.json'); // Replace with the path to your service account JSON

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'your-project-id.appspot.com' // Replace with your Firebase storage bucket name
});

const bucket = admin.storage().bucket();

// Function to upload a file and get the download URL
async function uploadFile(filePath) {
  try {
    const destination = path.basename(filePath); // The name of the file in the storage bucket
    await bucket.upload(filePath, {
      destination,
      metadata: {
        cacheControl: 'public, max-age=31536000',
      }
    });

    // Get the download URL
    const file = bucket.file(destination);
    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: '03-09-2500', // Set an appropriate expiration date for your use case
    });

    console.log('File uploaded successfully!');
    console.log('Download URL:', url);

  } catch (error) {
    console.error('Error uploading file:', error);
  }
}

// Path to the file to upload
const filePath = './path/to/your/file.ext'; // Replace with your actual file path

// Upload the file
uploadFile(filePath);