const { create } = require('../../src/Package/packageValidator');
const Joi = require('joi');

describe('packageValidator.create', () => {
    it('should return an error for missing required fields', async () => {
        const payload = {
            description: "Test package",
            weight: 10,
            width: 5,
            height: 5,
            depth: 5,
            from_name: "Sender",
            from_address: "123 Sender St",
            from_location: { lat: 40.7128, lng: -74.0060 },
            to_name: "Receiver",
            to_address: "456 Receiver St",
            // to_location is missing
        };

        const result = await create(payload);

        expect(result).toEqual({
            error: "to_location is required",
            statusCode: 422
        });
    });

    it('should validate successfully with all required fields', async () => {
        const payload = {
            description: "Test package",
            weight: 10,
            width: 5,
            height: 5,
            depth: 5,
            from_name: "Sender",
            from_address: "123 Sender St",
            from_location: { lat: 40.7128, lng: -74.0060 },
            to_name: "Receiver",
            to_address: "456 Receiver St",
            to_location: { lat: 34.0522, lng: -118.2437 }
        };

        const result = await create(payload);

        expect(result).toBeUndefined();
    });
});