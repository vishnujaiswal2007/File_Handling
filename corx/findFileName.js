const fs = require('fs');

function getMatchingFiles(folderPath, regexPattern) {
    return new Promise((resolve, reject) => {
        fs.readdir(folderPath, (err, files) => {
            if (err) {
                reject(err);
                return;
            }

            const regex = new RegExp(regexPattern);
            const matchingFiles = files.filter(fileName => regex.test(fileName));
            resolve(matchingFiles);
        });
    });
}

// Example usage

module.exports = async function getSearchFiles(folderPath, regexPattern) {

    try {
        const filesName = await getMatchingFiles(folderPath, regexPattern)

        console.log('Matching files:', filesName);
        return filesName
    } catch (e) {
        console.log("File error: ", e);

    }
}