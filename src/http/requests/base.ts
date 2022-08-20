import * as Joi from 'joi';


const house = Joi.string().required();
const postcode = Joi.string().required();

export const show = Joi.object({
    house,
    postcode
});
