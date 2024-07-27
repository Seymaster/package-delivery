const deliveryService = require("./deliveryService");
const {createErrorResponse, createSuccessResponse} = require("../helper");

module.exports = {
    create: async (req, res, next) => {
        const { data, error, statusCode } = await deliveryService.createDelivery(req.body)
        if (error) {
            return createErrorResponse(res, error, statusCode)
        }
        return createSuccessResponse(res, data)
    },

    findAll: async (req, res, next) => {
        const { data, error, statusCode } = await deliveryService.findAllDelivery(req.query)
        if (error) {
            return createErrorResponse(res, error, statusCode)
        }
        return createSuccessResponse(res, data)
    },

    findById:  async (req, res, next) => {
        const { data, error, statusCode } = await deliveryService.findByIdDelivery(req.params.id)
        if (error) {
            return createErrorResponse(res, error, statusCode)
        }
        return createSuccessResponse(res, data)
    },

    update: async (req, res, next) => {
        const payload = {Delivery_id: req.params.id, body: req.body};
        const { data, error, statusCode } = await deliveryService.updateDelivery(payload)
        if (error) {
            return createErrorResponse(res, error, statusCode)
        }
        return createSuccessResponse(res, data)
    },

    delete: async (req, res, next) => {
        const { data, error, statusCode } = await deliveryService.deleteDelivery(req.params.id)
        if (error) {
            return createErrorResponse(res, error, statusCode)
        }
        return createSuccessResponse(res, data)
    }
}