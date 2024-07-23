const packageService = require('../../src/Package/packageService');
const packageValidator = require('../../src/Package/packageValidator');
const PackageRepository = require('../../src/package/packageRepository');


describe('Package',()=>{  
    beforeEach(() => {
        jest.clearAllMocks();
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
    });

    describe('createPackage', () => {
        const payload = { /* your payload here */ };
        let result;

        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should return validation error if validation fails', async () => {
            packageValidator.create.mockResolvedValue('Validation Error');
            
            result = await packageService.createPackage(payload);
            
            expect(result).toEqual({
                error: 'Validation Error',
                statusCode: 422
            });
        });

        it('should return error if repository creation fails', async () => {
            packageValidator.create.mockResolvedValue(null);
            PackageRepository.create.mockResolvedValue({ error: 'Repository Error' });
            
            result = await packageService.createPackage(payload);
            
            expect(result).toEqual({
                error: 'Repository Error',
                statusCode: 400
            });
        });

        it('should return data if package is created successfully', async () => {
            packageValidator.create.mockResolvedValue(null);
            PackageRepository.create.mockResolvedValue({ id: 1, name: 'Test Package' });
            
            result = await packageService.createPackage(payload);
            
            expect(result).toEqual({
                data: { id: 1, name: 'Test Package' },
                statusCode: 200
            });
        });

        it('should handle duplicate key error', async () => {
            packageValidator.create.mockResolvedValue(null);
            PackageRepository.create.mockImplementation(() => {
                const error = new Error('Duplicate key error');
                error.code = 11000;
                throw error;
            });
            
            result = await packageService.createPackage(payload);
            
            expect(result).toEqual({
                error: 'Duplicate key error: Delivery ID already exists',
                statusCode: 400
            });
        });

        it('should handle general errors', async () => {
            packageValidator.create.mockResolvedValue(null);
            PackageRepository.create.mockImplementation(() => {
                throw new Error('General Error');
            });
            
            result = await packageService.createPackage(payload);
            
            expect(result).toEqual({
                error: 'General Error',
                statusCode: 500
            });
        });
    });
});