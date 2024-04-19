const fs = require('fs');
const path = require("path");

function findFile(folderPath, targetName) {
  return new Promise((resolve, reject) => {
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        reject(err);
        return;
      }

      const matchingFiles = [];
      const promises = [];

      files.forEach(file => {
        const filePath = path.join(folderPath, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
          promises.push(findFile(filePath, targetName)); // Recursive call for subdirectories
        } else if (stats.isFile() && file === targetName) {
          matchingFiles.push(filePath); // Add matching file path
        }
      });

      Promise.all(promises) // Wait for all subdirectory searches to finish
        .then(subfolderResults => {
          subfolderResults.forEach(result => matchingFiles.push(...result)); // Add results from subdirectories
          resolve(matchingFiles);
        })
        .catch(err => reject(err));
    });
  });
}

// Example usage
const folderPath = './folder';
const targetName = 'chotu.txt'; // Replace with your target file name

findFile(folderPath, targetName)
  .then(files => {
    console.log('Matching files:', files);
  })
  .catch(err => {
    console.error('Error:', err);
  });
