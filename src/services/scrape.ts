import * as puppeteer from 'puppeteer';

import { RequestFailed } from './../exceptions';


export const scrape = async (house, postcode) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        await page.goto('https://www.northumberland.gov.uk/Waste/Bins/Bin-Calendars.aspx', { waitUntil: 'networkidle0' });

        // Click Cookies
        const element : any = await page.waitForSelector('#ccc-notify-accept', { visible: true });
        await element.click();

        await page.waitForSelector('#p_lt_ctl04_pageplaceholder_p_lt_ctl02_WasteCollectionCalendars_NCCAddressLookup_txtHouse', { visible: true });
        await page.type('#p_lt_ctl04_pageplaceholder_p_lt_ctl02_WasteCollectionCalendars_NCCAddressLookup_txtHouse', house);

        await page.waitForSelector('#p_lt_ctl04_pageplaceholder_p_lt_ctl02_WasteCollectionCalendars_NCCAddressLookup_txtPostcode', { visible: true });
        await page.type('#p_lt_ctl04_pageplaceholder_p_lt_ctl02_WasteCollectionCalendars_NCCAddressLookup_txtPostcode', postcode);

        await page.screenshot({ path: `screenshots/${postcode}-1.png`, fullPage: true });

        await page.click('#p_lt_ctl04_pageplaceholder_p_lt_ctl02_WasteCollectionCalendars_NCCAddressLookup_butLookup'),

        await page.waitForNavigation({
            waitUntil: 'networkidle0'
        });

        const data = await page.content();

        await page.screenshot({ path: `screenshots/${postcode}-final.png`, fullPage: true });

        await browser.close();

        return data;
    } catch (error) {
        await page.screenshot({ path: `screenshots/${postcode}-error.png`, fullPage: true });
        console.log(error);

        throw new RequestFailed(error);
    }
};
