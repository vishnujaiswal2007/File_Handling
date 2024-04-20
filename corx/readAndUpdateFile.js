const fs = require('fs');

module.exports = function (filePath, addText) {
    // File path and new text to add
  
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return;
      }
  
      // Split the file content into lines, adding the new text to each line
      const lines = data.split('\n').map(line => `${line.replaceAll(/\r/g, "")}${addText}\n`);
  
      // Write the modified content back to the file
      fs.writeFile(filePath, lines.join(''), 'utf8', (err) => {
        if (err) {
          console.error('Error writing file:', err);
          return;
        }
  
        console.log('File 1 successfully!');
      });
    });
  
  }
  