const PackageRepository = require("../Package/packageRepository");
const packageValidator = require("./packageValidator");
const moment = require('moment');


exports.createPackage = async (payload) => {
    let ValidationError = await packageValidator.create(payload)
    if (ValidationError) {
        return {
            error,
            statusCode: 422
        }
    }
    try{
        const Package = await PackageRepository.create(payload);
        if(Package.error){
            return {error: Package.error, statusCode: 400}
        }
        return {data: Package, statusCode: 200};
    }catch (e) {
        return {error: e.message, statusCode: 500}
    }
};

exports.findAllPackage = async (payload) => {
    try{
        let page = payload.page || 1;
        let limit = payload.limit || 10;
    
        let data = await PackageRepository.all(payload, { _id: -1 }, page, limit);
        return {data, statusCode: 200};
    }catch (e) {
        return {error: e.message, statusCode: 500}
    }
};

exports.updatePackage = async (payload) => {
    try{
        let Package = await PackageRepository.findOne({package_id: payload.package_id});
        if (!Package) {
            return {error: "Package Not Found", statusCode: 404}
        }
        await PackageRepository.update({_id: Package._id}, payload.body);
        return {data: "Package Updated Successfully", statusCode: 200};
    }catch (e) {
        return {error: e.message, statusCode: 500}
    }
};

exports.findByIdPackage = async (payload) => {
    try{
        const Package = await PackageRepository.findOne({package_id: payload});
        if(!Package){
            return {error: "Package Not found", statusCode: 404}
        }
        return {data: Package, statusCode: 200};
    }catch (e) {
        console.log(e)
        return {error: e.message, statusCode: 500}
    }
};

exports.deletePackage = async (payload) => { 
    try{
        let Package = await PackageRepository.findOne({package_id: payload});
        if (!Package) {
            return {error: "Package Not Found", statusCode: 404}
        }
        await PackageRepository.update({_id: Package._id}, {deletedAt: moment().unix()});
        return {data: "Package Deleted Successfully", statusCode: 200};
    }catch (e) {
        return {error: e.message, statusCode: 500}
    }
};
