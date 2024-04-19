const fs = require('fs');
const dateFormat = require("./corx/dateFormat.js");
const findFileName = require ("./corx/findFileName.js");


const folderPath = './Z'; // Search from folder name
const regexPattern = /COR\d+/; // Matches filenames like cor1, cor2, etc.

const currentDate = dateFormat(new Date());

async function startSystem() {

  const response = await findFileName(folderPath, regexPattern);
  console.log(response);

  if(response){
response.map(file => {
  readAndAddText(`${folderPath}/${file}`, file, currentDate )
})
  }

}
startSystem()


function readAndAddText(filePath, filename, date) {
  // File path and new text to add


  const newText = `,"${filename.replace(".RES","")}_${date}"`;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    // Split the file content into lines, adding the new text to each line
    const lines = data.split('\n').map(line => `${line.replaceAll(/\r/g, "")}${newText}\n`);

    console.log(lines)
    // Write the modified content back to the file
    fs.writeFile(filePath, lines.join(''), 'utf8', (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return;
      }

      console.log('New text appended to each line successfully!');
    });
  });

}
