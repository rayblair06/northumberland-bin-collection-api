import * as fs from 'fs';

import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { checkFoldersExist, checkScrapeFile } from '../../../services/filesystem';
import { process } from '../../../services/process';
import { scrape } from '../../../services/scrape';


export const index = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const house = request.query.house;
        const postcode = request.query.postcode;
        const filepath = `results/${postcode}.html`;

        checkFoldersExist();
        checkScrapeFile(filepath);

        let data;

        try {
            data = fs.readFileSync(filepath, { encoding: 'utf-8' });
        } catch (error) {
            console.log(error);

            data = await scrape(house, postcode);

            fs.writeFileSync(filepath, data);
        }

        const result = await process(data);

        return response.status(StatusCodes.OK).send(result);
    } catch (error) {
        return next(error);
    }
};
