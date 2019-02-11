// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const util = require('util');
const fs = require('fs');
const readdirPromise = util.promisify(fs.readdir);
const readFilePromise = util.promisify(fs.readFile);

const getFolderFilesList = (path) => readdirPromise(path);

const getFile = (path) => readFilePromise(path, 'utf8');

module.exports = {
    getFolderFilesList,
    getFile
}