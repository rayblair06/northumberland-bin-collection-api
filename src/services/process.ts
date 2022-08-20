import * as jsdom from 'jsdom';


export const process = async (data) => {
    const dom = new jsdom.JSDOM(data);

    const tables = dom
        .window
        .document
        .querySelectorAll('#p_lt_ctl04_pageplaceholder_p_lt_ctl02_WasteCollectionCalendars_panCalendars table');

    const recyclingColor = 'rgb(254, 205, 0)';
    const rubbishColor = 'rgb(128, 0, 104)';
    const gardenColor = 'rgb(255, 113, 113)';

    const results = {};

    for (const month of tables) {
        for (const element of month.getElementsByClassName('calCtrlTitle')) {
            const title = element.textContent.trim();

            for (const item of month.getElementsByClassName('calCtrlDay')) {
                const date = item.textContent.trim();
                const color = item.style.backgroundColor;

                if (color) {
                    let type = 'Unknown';

                    if (color === recyclingColor) {
                        type = 'Recycling';
                    } else if (color === rubbishColor) {
                        type = 'Rubbish';
                    } else if (color === gardenColor) {
                        type = 'Garden';
                    }

                    results[`${date} ${title}`] = type;
                }
            }
        }
    }

    return results;
};
