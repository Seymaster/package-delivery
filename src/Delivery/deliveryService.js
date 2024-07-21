const deliveryService = require("../Delivery/deliveryService");
const deliverValidator = require("./deliverValidator");
const moment = require('moment');


exports.createDelivery = async (payload) => {
    let ValidationError = await deliverValidator.create(payload)
    if (ValidationError) {
        return {
            error,
            statusCode: 422
        }
    }
    try{
        const Delivery = await deliveryService.create(payload);
        if(Delivery.error){
            return {error: Delivery.error, statusCode: 400}
        }
        return {data: Delivery, statusCode: 200};
    }catch (e) {
        return {error: e.message, statusCode: 500}
    }
};

exports.findAllDelivery = async (payload) => {
    try{
        let page = payload.page || 1;
        let limit = payload.limit || 10;
    
        let data = await deliveryService.all(payload, { _id: -1 }, page, limit);
        return {data, statusCode: 200};
    }catch (e) {
        return {error: e.message, statusCode: 500}
    }
};

exports.updateDelivery = async (payload) => {
    try{
        let Delivery = await deliveryService.findOne({delivery_id: payload.Delivery_id});
        if (!Delivery) {
            return {error: "Delivery Not Found", statusCode: 404}
        }
        await deliveryService.update({_id: Delivery._id}, payload.body);
        return {data: "Delivery Updated Successfully", statusCode: 200};
    }catch (e) {
        return {error: e.message, statusCode: 500}
    }
};

exports.findByIdDelivery = async (payload) => {
    try{
        const Delivery = await deliveryService.findOne({delivery_id: payload});
        if(!Delivery){
            return {error: "Delivery Not found", statusCode: 404}
        }
        return {data: Delivery, statusCode: 200};
    }catch (e) {
        console.log(e)
        return {error: e.message, statusCode: 500}
    }
};

exports.deleteDelivery = async (payload) => { 
    try{
        let Delivery = await deliveryService.findOne({delivery_id: payload});
        if (!Delivery) {
            return {error: "Delivery Not Found", statusCode: 404}
        }
        await deliveryService.update({_id: Delivery._id}, {deletedAt: moment().unix()});
        return {data: "Delivery Deleted Successfully", statusCode: 200};
    }catch (e) {
        return {error: e.message, statusCode: 500}
    }
};
