const PackageRepository = require("./packageRepository");
const packageValidator = require("./packageValidator");
const moment = require('moment');
const Joi = require("joi");


module.exports = {
    createPackage: async (payload) => {
        const validationError = await packageValidator.create(payload);
        if (validationError) {
            return {
                error: validationError,
                statusCode: 422
            }
        }
        try {
            const packageData = await createPackageInRepository(payload);
            if (packageData.error) {
                return { error: packageData.error, statusCode: 400 }
            }
            return { data: packageData, statusCode: 200 };
        } catch (error) {
            if (e.code === 11000) {
                return { error: "Duplicate key error: Delivery ID already exists", statusCode: 400 };
            }
            return { error: error.message, statusCode: 500 }
        }
    },
    findAllPackage: async (payload) => {
        try {
            let page = payload.page || 1;
            let limit = payload.limit || 10;

            let data = await PackageRepository.all(payload, { _id: -1 }, page, limit);
            return { data, statusCode: 200 };
        } catch (e) {
            return { error: e.message, statusCode: 500 }
        }
    },
    updatePackage: async (payload) => {
        try {
            let Package = await PackageRepository.findOne({ package_id: payload.package_id });
            if (!Package) {
                return { error: "Package Not Found", statusCode: 404 }
            }
            await PackageRepository.update({ _id: Package._id }, payload.body);
            return { data: "Package Updated Successfully", statusCode: 200 };
        } catch (e) {
            return { error: e.message, statusCode: 500 }
        }
    },
    findByIdPackage: async (payload) => {
        try {
            const Package = await PackageRepository.findOne({ package_id: payload });
            if (!Package) {
                return { error: "Package Not found", statusCode: 404 }
            }
            return { data: Package, statusCode: 200 };
        } catch (e) {
            console.log(e)
            return { error: e.message, statusCode: 500 }
        }
    },
    deletePackage: async (payload) => {
        try {
            let Package = await PackageRepository.findOne({ package_id: payload });
            if (!Package) {
                return { error: "Package Not Found", statusCode: 404 }
            }
            await PackageRepository.update({ _id: Package._id }, { deletedAt: moment().unix() });
            return { data: "Package Deleted Successfully", statusCode: 200 };
        } catch (e) {
            return { error: e.message, statusCode: 500 }
        }
    }
}