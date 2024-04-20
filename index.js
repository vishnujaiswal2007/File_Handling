const findFiles = require("./corx/fileInsideFolders");

const folderPath = './'; // Search from folder name
const regexPattern = /cor\d+/i; // Matches filenames like cor1, cor2, etc.

findFiles(folderPath, regexPattern);