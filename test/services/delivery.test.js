const deliveryService = require("../../src/Delivery/deliveryService");
const DeliveryRepository = require("../../src/Delivery/deliveryRepository");
const PackageRepository = require("../../src/Package/packageRepository");
const moment = require("moment");

jest.mock("../../src/Delivery/deliveryRepository");
jest.mock("../../src/Package/packageRepository");

describe("Delivery", () => {
  // const payload;

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
        lng: 56.78,
      },
    };
  });

  describe("createDelivery", () => {
    const payload = {
      delivery_id: "123",
      package_id: "456",
      pickup_time: new Date(),
      start_time: new Date(),
      end_time: new Date(),
      location: {
        lat: 12.34,
        lng: 56.78,
      },
    };

    it("should return delivery succesfully created", async () => {
      const exp = {
        delivery_id: "123",
        package_id: "456",
        pickup_time: new Date(),
        start_time: new Date(),
        end_time: new Date(),
        location: {
          lat: 12.34,
          lng: 56.78,
        },
      };
      PackageRepository.findOne.mockResolvedValue({
        _id: "123",
        package_id: "456",
      });
      DeliveryRepository.create.mockResolvedValue(exp);

      const result = await deliveryService.createDelivery(payload);

      expect(PackageRepository.findOne).toHaveBeenCalledWith({
        package_id: "456",
      });
      console.log("result", result);
      expect(result).toEqual({
        data: exp,
        statusCode: 201,
      });
    });

    it("should return error if package is not found", async () => {
      PackageRepository.findOne.mockResolvedValue(null);

      const result = await deliveryService.createDelivery(payload);

      expect(result).toEqual({
        error: "Package Not Found",
        statusCode: 404,
      });
    });

    it("should return error if delivery creation fails", async () => {
      PackageRepository.findOne.mockResolvedValue({ package_id: "123" });
      DeliveryRepository.create.mockResolvedValue({ error: "Creation failed" });

      const result = await deliveryService.createDelivery(payload);

      expect(result).toEqual({
        error: "Creation failed",
        statusCode: 400,
      });
    });

    it("should handle duplicate key error", async () => {
      PackageRepository.findOne.mockResolvedValue({ package_id: "123" });
      DeliveryRepository.create.mockRejectedValue({ code: 11000 });

      const result = await deliveryService.createDelivery(payload);

      expect(result).toEqual({
        error: "Duplicate key error: Delivery ID already exists",
        statusCode: 400,
      });
    });
  });

  describe("findAllDelivery", () => {
    it("should return data and statusCode 200 on success", async () => {
      const mockPayload = { page: 1, limit: 10 };
      const mockData = [{ id: 1, name: "Test Delivery" }];

      DeliveryRepository.all.mockResolvedValue(mockData);

      const result = await deliveryService.findAllDelivery(mockPayload);

      expect(result).toEqual({ data: mockData, statusCode: 200 });
    });

    it("should return error and statusCode 500 on failure", async () => {
      const mockPayload = { page: 1, limit: 10 };
      const mockError = new Error("Database error");

      DeliveryRepository.all.mockRejectedValue(mockError);

      const result = await deliveryService.findAllDelivery(mockPayload);

      expect(result).toEqual({ error: mockError.message, statusCode: 500 });
    });
  });

  describe("updateDelivery", () => {
    it("should return 404 if delivery is not found", async () => {
      DeliveryRepository.findOne.mockResolvedValue(null);

      const payload = { Delivery_id: "nonexistent_id", body: {} };
      const result = await deliveryService.updateDelivery(payload);

      expect(result).toEqual({ error: "Delivery Not Found", statusCode: 404 });
    });

    it("should return 200 if delivery is updated successfully", async () => {
      DeliveryRepository.findOne.mockResolvedValue({ _id: "existing_id" });
      DeliveryRepository.update.mockResolvedValue({});

      const payload = {
        Delivery_id: "existing_id",
        body: { status: "delivered" },
      };
      const result = await deliveryService.updateDelivery(payload);

      expect(result).toEqual({
        data: "Delivery Updated Successfully",
        statusCode: 200,
      });
    });

    it("should return 500 if an error occurs", async () => {
      DeliveryRepository.findOne.mockRejectedValue(new Error("Database error"));

      const payload = { Delivery_id: "existing_id", body: {} };
      const result = await deliveryService.updateDelivery(payload);

      expect(result).toEqual({ error: "Database error", statusCode: 500 });
    });
  });

  describe("findByIdDelivery", () => {
    it("should return delivery data when found", async () => {
      const mockDelivery = { delivery_id: "123", name: "Test Delivery" };
      DeliveryRepository.findOne.mockResolvedValue(mockDelivery);

      const result = await deliveryService.findByIdDelivery("123");

      expect(result).toEqual({ data: mockDelivery, statusCode: 200 });
    });

    it("should return 404 when delivery not found", async () => {
      DeliveryRepository.findOne.mockResolvedValue(null);

      const result = await deliveryService.findByIdDelivery("123");

      expect(result).toEqual({ error: "Delivery Not found", statusCode: 404 });
    });

    it("should return 500 on repository error", async () => {
      const errorMessage = "Database error";
      DeliveryRepository.findOne.mockRejectedValue(new Error(errorMessage));

      const result = await deliveryService.findByIdDelivery("123");

      expect(result).toEqual({ error: errorMessage, statusCode: 500 });
    });
  });

  describe("deleteDelivery", () => {
    it("should delete a delivery successfully", async () => {
      const payload = "12345";
      const delivery = { _id: "1", delivery_id: payload };

      DeliveryRepository.findOne.mockResolvedValue(delivery);
      DeliveryRepository.update.mockResolvedValue({});

      const result = await deliveryService.deleteDelivery(payload);

      expect(DeliveryRepository.findOne).toHaveBeenCalledWith({
        delivery_id: payload,
      });
      expect(DeliveryRepository.update).toHaveBeenCalledWith(
        { _id: delivery._id },
        { deletedAt: moment().unix() }
      );
      expect(result).toEqual({
        data: "Delivery Deleted Successfully",
        statusCode: 200,
      });
    });

    it("should return 404 if delivery not found", async () => {
      const payload = "12345";
      DeliveryRepository.findOne.mockResolvedValue(null);

      const result = await deliveryService.deleteDelivery(payload);

      expect(DeliveryRepository.findOne).toHaveBeenCalledWith({
        delivery_id: payload,
      });
      expect(result).toEqual({ error: "Delivery Not Found", statusCode: 404 });
    });

    it("should return 500 on error", async () => {
      const payload = "12345";
      const errorMessage = "Database error";

      DeliveryRepository.findOne.mockRejectedValue(new Error(errorMessage));

      const result = await deliveryService.deleteDelivery(payload);

      expect(result).toEqual({ error: errorMessage, statusCode: 500 });
    });
  });
});
