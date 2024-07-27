const { create } = require('../../src/Delivery/deliveryValidator');

test('valid payload', async () => {
    const payload = {
        delivery_id: "123",
        package_id: "456",
        pickup_time: new Date(),
        start_time: new Date(),
        end_time: new Date(),
        location: {
            lat: 12.34,
            lng: 56.78
        }
    };
    const result = await create(payload);
    expect(result).toBeUndefined();
});

test('invalid payload', async () => {
    const payload = {
        delivery_id: "123",
        package_id: "456",
        pickup_time: new Date(),
        start_time: new Date(),
        end_time: new Date(),
        location: {
            lat: "invalid",
            lng: 56.78
        }
    };
    const result = await create(payload);
    expect(result).toEqual({
        error: "location.lat must be a number",
        statusCode: 422
    });
});