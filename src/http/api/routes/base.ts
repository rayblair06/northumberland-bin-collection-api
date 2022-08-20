import express from 'express';

import { validateSchema } from '../../../utils';
import { show } from '../../requests/base';
import { baseController } from '../controllers';


export const router = express.Router();

router
    .get('/', validateSchema(show), baseController.index);

export default router;
