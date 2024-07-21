"use strict";
const Joi = require("joi");

exports.createSuccessResponse = (res, data, code = 200, isPaginated = false) => {
    if (isPaginated || data?.docs) {
        data.data = data.docs;
        delete data.docs;
        res.response = "Paginated Response";
        data.page = parseInt(data.page);

        return res.status(code).json(data);
    }
    res.response = data;

    return res.status(code).json({ data });
};

exports.paginatedResponse = (res, data, code = 200) => {
    data.data = data.docs;
    delete data.docs;
    res.response = "Paginated Response";
    data.page = parseInt(data.page);

    return res.status(code).json(data);
};

exports.createErrorResponse = (
    res,
    error = "Oops. An Error Occurred",
    code = 500
) => {
    console.log("Error Response", error);
    res.response = error;

    return res.status(code).send({ error: error });
};

exports.validate = (schema, payload) => {
    schema = Joi.object(schema);
    const { error } = schema.validate(payload, {
        allowUnknown: true,
    });

    if (error) return error.details[0].message.replace(/['"]/g, "");

    return null;
};
