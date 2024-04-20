const fs = require('fs');
const path = require("path");
const formatDate = require("./dateFormat");
const readAndAddText = require("./readAndUpdateFile")
const removeExtension =  require("./removeExtension");

function findFile(folderPath, targetName) {

  const fileExtensions =[ ".txt", ".RES"]; 

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
        } else if (stats.isFile() && targetName.test(file)) {

          const modifiedDate = formatDate(new Date(stats.mtimeMs));
          console.log(`File name: ${file}  Modified date: ${modifiedDate}`);

          const createNewText = `,"${removeExtension(file,fileExtensions)}","${modifiedDate}"`

          readAndAddText(filePath, createNewText)

          // matchingFiles.push(filePath); // Add matching file path
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

async function findFiles(folderPath, targetName,fileExtension) {

  try {
    const files = await findFile(folderPath, targetName,fileExtension)
    console.log(files)
    return files;

  } catch (e) {

    console.log("File Searching error: ", e)
  }
}

module.exports = findFiles;