const { Storage } = require('@google-cloud/storage');
const fs = require('fs');
const BUCKET_NAME = "cdn.formsey.com";

const storage = new Storage({ keyFilename: "../formsey-designer/floreysoftformsey-a5866f5cad76.json" });

async function uploadFile(source, target) {
  await storage.bucket(BUCKET_NAME).upload(source, {
    destination: target,
    gzip: true,
    metadata: {
      cacheControl: 'public, max-age=31536000',
    },
  });
  console.log("Uploaded file="+source+" with name="+target)
}

async function makePublic(filename) {
  await storage.bucket(BUCKET_NAME).file(filename).makePublic();
  console.log(`gs://${BUCKET_NAME}/${filename} is now public.`);
}

fs.readFile('lerna.json', (err, data) => {
  let lerna = JSON.parse(data);
  fs.readdir("umd", (err, files) => {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    files.forEach(function (file) {
      uploadFile("umd/"+file, file+"."+lerna.version+".min.js")
    });
  });
  console.log(lerna.version);
});
