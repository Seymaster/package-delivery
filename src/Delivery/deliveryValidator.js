const Joi = require("joi");

exports.create = async (payload) => {     
    const schema = Joi.object({
        delivery_id: Joi.string().required(),
        package_id: Joi.string().required(),
        pickup_time: Joi.date().required(),
        start_time: Joi.date().required(),
        end_time: Joi.date().required(),
        location: Joi.object({
            lat: Joi.number().required(),
            lng: Joi.number().required()
        })
    })

    const { error } = schema.validate(payload);

    if ( error ) {
        return {
            error: error.details[0].message.replace(/['"]/g, ""),
            statusCode:422
        }
    }
}
