const Joi = require("joi");

module.exports = {
    create: async (payload) => {
        const schema = Joi.object({
            // package_id: Joi.string().required(),
            // active_delivery_id: Joi.string().allow('', null),
            description: Joi.string().optional(),
            weight: Joi.number().required(),
            width: Joi.number().required(),
            height: Joi.number().required(),
            depth: Joi.number().required(),
            from_name: Joi.string().required(),
            from_address: Joi.string().required(),
            from_location: Joi.object({
                lat: Joi.number(),
                lng: Joi.number()
            }).required(),
            to_name: Joi.string().required(),
            to_address: Joi.string().required(),
            to_location: Joi.object({
                lat: Joi.number(),
                lng: Joi.number()
            }).required()
        });

        const { error } = schema.validate(payload);

        if (error) {
            return {
                error: error.details[0].message.replace(/['"]/g, ""),
                statusCode: 422
            }
        }
    }
}