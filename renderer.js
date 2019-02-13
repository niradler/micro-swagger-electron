const {getStages} = require('./src/data');
const importFiles = require('./src/import');
const log = require('electron-log');
log.transports.file.clear();
module.exports = {
    getStages,
    importFiles
}