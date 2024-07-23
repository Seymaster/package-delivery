const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
const DeliveryRepository = require("../delivery/deliveryRepository");

wss.on('connection', (ws) => {
    console.log('WebSocket connected');
    ws.on("message", async function message(data) {
        const { event, delivery_id, body } = JSON.parse(data);
        if (event === "location_changed" || body.location) {
            try {
                let Delivery = await DeliveryRepository.findOne({ delivery_id });
                if (!Delivery) {
                    ws.send(
                        JSON.stringify({ error: "Delivery Not Found", statusCode: 404 })
                    );
                    return;
                }
                const location = body.location;
                await DeliveryRepository.update({ _id: Delivery._id }, { location });
                Delivery = await DeliveryRepository.findOne({ delivery_id });
                wss.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(
                            JSON.stringify({
                                event: 'delivery_updated',
                                delivery: Delivery,
                            })
                        );
                    }
                });
            } catch (e) {
                ws.send(JSON.stringify({ error: e.message, statusCode: 500 }));
            }
        };

        if (event === "status_changed") {
            try {
                const allowedStatuses = ['picked-up', 'in-transit', 'delivered', 'failed'];
                if (!allowedStatuses.includes(body.status)) {
                    ws.send(
                        JSON.stringify({ error: "Status should be one of 'picked-up', 'in-transit', 'delivered', 'failed'", statusCode: 400 })
                    );
                    return;
                }
                let Delivery = await DeliveryRepository.findOne({ delivery_id });
                if (!Delivery) {
                    ws.send(
                        JSON.stringify({ error: "Delivery Not Found", statusCode: 404 })
                    );
                    return;
                }
                if (body.status === "picked-up"){
                    await DeliveryRepository.update({ _id: Delivery._id }, { status: body.status, pickup_time: new Date() });
                    Delivery = await DeliveryRepository.findOne({ delivery_id });
                    wss.clients.forEach((client) => {
                        if (client.readyState === WebSocket.OPEN) {
                            client.send(
                                JSON.stringify({
                                    event: 'delivery_updated',
                                    delivery: Delivery,
                                })
                            );
                        }
                    });
                };
                if (body.status === "in-transit") {           
                    await DeliveryRepository.update({ _id: Delivery._id }, { status: body.status, start_time: new Date() });
                    Delivery = await DeliveryRepository.findOne({ delivery_id });
                    wss.clients.forEach((client) => {
                        if (client.readyState === WebSocket.OPEN) {
                            client.send(
                                JSON.stringify({
                                    event: 'delivery_updated',
                                    delivery: Delivery,
                                })
                            );
                        }
                    });
                };
                if (body.status === "delivered" || body.status === "failed") {    
                    await DeliveryRepository.update({ _id: Delivery._id }, { status: body.status, end_time: new Date() });
                    Delivery = await DeliveryRepository.findOne({ delivery_id });
                    wss.clients.forEach((client) => {
                        if (client.readyState === WebSocket.OPEN) {
                            client.send(
                                JSON.stringify({
                                    event: 'delivery_updated',
                                    delivery: Delivery,
                                })
                            );
                        }
                    });
                };
            } catch (e) {
                ws.send(JSON.stringify({ error: e.message, statusCode: 500 }));
            }
        }
    });
});