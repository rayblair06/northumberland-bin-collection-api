import * as fs from 'fs';


export const checkFoldersExist = () => {
    if (!fs.existsSync('screenshots')) {
        fs.mkdir('screenshots', () => {});
    }

    if (!fs.existsSync('results')) {
        fs.mkdir('results', () => {});
    }
};

/**
 * Check Scrape File
 * 
 * @param filepath 
 */
export const checkScrapeFile = (filepath) => {
    fs.stat(filepath, (error, stats) => {
        const SEVEN_DAYS_AGO = 7 * 24 * 60 * 60 * 1000;

        if (error) {
            return;
        }

        // Check if file is older than 7 days
        if ((new Date().getTime() - new Date(stats.birthtime).getTime()) > SEVEN_DAYS_AGO) {
            // Delete file
            fs.unlink(filepath, (err) => {
                if (err)  {
                    return console.log(err);
                }
            });
        }
    });
};
