const deliveryService = require('../../src/Delivery/deliveryService');
const deliveryValidator = require('../../src/Delivery/deliveryValidator');

describe('Delivery',()=>{
    beforeEach(() => {
    jest.clearAllMocks();
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
    })

    describe('createDelivery', () => {
        it('should return validation error if payload is invalid', async () => {
            deliveryValidator.create.mockResolvedValue('Invalid payload');
            
            const payload = { package_id: '123' };
            const result = await deliveryService.createDelivery(payload);
            
            expect(result).toEqual({
                error: 'Invalid payload',
                statusCode: 422
            });
        });

        it('should return error if package is not found', async () => {
            deliveryValidator.create.mockResolvedValue(null);
            PackageRepository.findOne.mockResolvedValue(null);
            
            const payload = { package_id: '123' };
            const result = await deliveryService.createDelivery(payload);
            
            expect(result).toEqual({
                error: 'Package Not Found',
                statusCode: 404
            });
        });

        it('should return error if delivery creation fails', async () => {
            deliveryValidator.create.mockResolvedValue(null);
            PackageRepository.findOne.mockResolvedValue({ package_id: '123' });
            DeliveryRepository.create.mockResolvedValue({ error: 'Creation failed' });
            
            const payload = { package_id: '123' };
            const result = await deliveryService.createDelivery(payload);
            
            expect(result).toEqual({
                error: 'Creation failed',
                statusCode: 400
            });
        });

        it('should return delivery data if creation is successful', async () => {
            deliveryValidator.create.mockResolvedValue(null);
            PackageRepository.findOne.mockResolvedValue({ package_id: '123' });
            DeliveryRepository.create.mockResolvedValue({ id: '456', package_id: '123' });
            
            const payload = { package_id: '123' };
            const result = await deliveryService.createDelivery(payload);
            
            expect(result).toEqual({
                data: { id: '456', package_id: '123' },
                statusCode: 200
            });
        });

        it('should handle duplicate key error', async () => {
            deliveryValidator.create.mockResolvedValue(null);
            PackageRepository.findOne.mockResolvedValue({ package_id: '123' });
            DeliveryRepository.create.mockRejectedValue({ code: 11000 });
            
            const payload = { package_id: '123' };
            const result = await deliveryService.createDelivery(payload);
            
            expect(result).toEqual({
                error: 'Duplicate key error: Delivery ID already exists',
                statusCode: 400
            });
        });

        it('should handle other errors', async () => {
            deliveryValidator.create.mockResolvedValue(null);
            PackageRepository.findOne.mockResolvedValue({ package_id: '123' });
            DeliveryRepository.create.mockRejectedValue(new Error('Some error'));
            
            const payload = { package_id: '123' };
            const result = await deliveryService.createDelivery(payload);
            
            expect(result).toEqual({
                error: 'Some error',
                statusCode: 500
            });
        });
    });
});