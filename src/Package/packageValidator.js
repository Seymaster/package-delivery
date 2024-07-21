const Joi = require("joi");

exports.create = async (req, res, next) => {
    const {error} = Joi.object({
        // package_id: Joi.string().required(),  
        // active_delivery_id: Joi.string().required(),
        description: Joi.string().optional(),
        weight: Joi.number().required(), 
        width: Joi.number().required(),
        height: Joi.number().required(),
        depth: Joi.number().required(),
        to_name: Joi.string().required(),
        to_address: Joi.string().required(),
        to_location: Joi.object({
            lat: Joi.number().required(),
            lng: Joi.number().required()
        }),
        from_name: Joi.string().required(),
        from_address: Joi.string().required(),
        from_location: Joi.object({
            lat: Joi.number().required(),
            lng: Joi.number().required()
        })

    })
        .unknown()
        .validate(req.body);
  
    if (error) {
        return createErrorResponse(
            res,
            error.details[0].message.replace(/['"]/g, ""),
            400
        );
    }
  
    return next;
};