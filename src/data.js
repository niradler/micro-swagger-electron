const utils = require('./utils');
const importFiles = require('./import');
const log = require('electron-log');
const {getDocumentsFolder} = require('platform-folders');
const fs = require('fs');
const documentsFolderPath = getDocumentsFolder();
const stagesPath = documentsFolderPath + '/micro-swagger/stages';

const getStages = async () => {
    try {
        if (!fs.existsSync(documentsFolderPath + '/micro-swagger')){
            fs.mkdirSync(documentsFolderPath + '/micro-swagger');
        }
        if (!fs.existsSync(stagesPath)){
            fs.mkdirSync(stagesPath);
        }
        const stages = {};
        stages.types = await utils.getFolderFilesList(stagesPath);
        if(stages.types.length == 0) {
            await importFiles();  
            stages.types = await utils.getFolderFilesList(stagesPath); 
        }
        for (let stage of stages.types) {
            const files = await utils.getFolderFilesList(`${stagesPath}/${stage}`);
            stages[stage] = {
                files: files.map(f => `/${stage}/${f}`),
                names: []
            }
            for (let pathToFile of stages[stage].files) {
                const json = await utils.getFile(stagesPath + pathToFile);                
                const obj = JSON.parse(json);
                stages[stage]
                    .names
                    .push(obj.info.title)
            }
        }
        return stages;
    } catch (error) {
        log.error(error.message);
        throw error;
    }
}

module.exports = {
    getStages
}