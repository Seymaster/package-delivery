const deliveryService = require("./deliveryService");
const {createErrorResponse, createSuccessResponse} = require("../helper");

module.exports = {
    create: async (req, res, next) => {
        const { data, error, statusCode } = await deliveryService.createPackage(req.body)
        if (error) {
            return createErrorResponse(res, error, statusCode)
        }
        return createSuccessResponse(res, data)
    },

    findAll: async (req, res, next) => {
        const { data, error, statusCode } = await deliveryService.findAllPackage(req.query)
        if (error) {
            return createErrorResponse(res, error, statusCode)
        }
        return createSuccessResponse(res, data)
    },

    findById:  async (req, res, next) => {
        const { data, error, statusCode } = await deliveryService.findByIdPackage(req.params.id)
        if (error) {
            return createErrorResponse(res, error, statusCode)
        }
        return createSuccessResponse(res, data)
    },

    update: async (req, res, next) => {
        const payload = {package_id: req.params.id, body: req.body};
        const { data, error, statusCode } = await deliveryService.updatePackage(payload)
        if (error) {
            return createErrorResponse(res, error, statusCode)
        }
        return createSuccessResponse(res, data)
    },

    delete: async (req, res, next) => {
        const { data, error, statusCode } = await deliveryService.deletePackage(req.params.id)
        if (error) {
            return createErrorResponse(res, error, statusCode)
        }
        return createSuccessResponse(res, data)
    }
}