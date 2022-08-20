import * as fs from 'fs';


export const checkFoldersExist = () => {
    if (!fs.existsSync('screenshots')) {
        fs.mkdir('screenshots', () => {});
    }

    if (!fs.existsSync('results')) {
        fs.mkdir('results', () => {});
    }
};
