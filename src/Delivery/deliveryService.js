const DeliveryRepository = require("./deliveryRepository");
const PackageRepository = require("../package/packageRepository");
const deliveryValidator = require("./deliveryValidator");
const moment = require('moment');


module.exports = {
    createDelivery: async (payload) => {
        let ValidationError = await deliveryValidator.create(payload)
        if (ValidationError) {
            return {
                error: ValidationError,
                statusCode: 422
            }
        }
        try {
            const Package = await PackageRepository.findOne({ package_id: payload.package_id });
            if (!Package) {
                return { error: "Package Not Found", statusCode: 404 }
            };

            const Delivery = await DeliveryRepository.create(payload);
            if (Delivery.error) {
                return { error: Delivery.error, statusCode: 400 }
            }
            return { data: Delivery, statusCode: 200 };
        } catch (e) {
            if (e.code === 11000) {
                return { error: "Duplicate key error: Delivery ID already exists", statusCode: 400 };
            }
            return { error: e.message, statusCode: 500 }
        }
    },

    findAllDelivery: async (payload) => {
        try {
            let page = payload.page || 1;
            let limit = payload.limit || 10;

            let data = await DeliveryRepository.all(payload, { _id: -1 }, page, limit);
            return { data, statusCode: 200 };
        } catch (e) {
            return { error: e.message, statusCode: 500 }
        }
    },

    updateDelivery: async (payload) => {
        try {
            let Delivery = await DeliveryRepository.findOne({ delivery_id: payload.Delivery_id });
            if (!Delivery) {
                return { error: "Delivery Not Found", statusCode: 404 }
            }

            await DeliveryRepository.update({ _id: Delivery._id }, payload.body);
            return { data: "Delivery Updated Successfully", statusCode: 200 };
        } catch (e) {
            return { error: e.message, statusCode: 500 }
        }
    },

    findByIdDelivery: async (payload) => {
        try {
            const Delivery = await DeliveryRepository.findOne({ delivery_id: payload });
            if (!Delivery) {
                return { error: "Delivery Not found", statusCode: 404 }
            }
            return { data: Delivery, statusCode: 200 };
        } catch (e) {
            console.log(e)
            return { error: e.message, statusCode: 500 }
        }
    },

    deleteDelivery: async (payload) => {
        try {
            let Delivery = await DeliveryRepository.findOne({ delivery_id: payload });
            if (!Delivery) {
                return { error: "Delivery Not Found", statusCode: 404 }
            }
            await DeliveryRepository.update({ _id: Delivery._id }, { deletedAt: moment().unix() });
            return { data: "Delivery Deleted Successfully", statusCode: 200 };
        } catch (e) {
            return { error: e.message, statusCode: 500 }
        }
    }
}