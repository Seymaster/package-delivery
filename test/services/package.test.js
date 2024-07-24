const packageService = require("../../src/Package/packageService");
const PackageRepository = require("../../src/Package/packageRepository");
const moment = require("moment");

jest.mock("../../src/Package/packageRepository");

describe("Package", () => {
  describe("createPackage", () => {
    const payload = {
      description: "Test package",
      weight: 10,
      width: 5,
      height: 5,
      depth: 5,
      from_name: "Sender",
      from_address: "123 Sender St",
      from_location: { lat: 40.7128, lng: -74.006 },
      to_name: "Receiver",
      to_address: "456 Receiver St",
      to_location: { lat: 34.0522, lng: -118.2437 },
    };

    it("should return error if repository creation fails", async () => {
      PackageRepository.create.mockResolvedValue({ error: "Repository Error" });

      result = await packageService.createPackage(payload);

      expect(result).toEqual({
        error: "Repository Error",
        statusCode: 400,
      });
    });

    it("should return data if package is created successfully", async () => {
      const exp = {
        id: 1,
        name: "Test Package",
        description: "Test package",
        weight: 10,
        width: 5,
        height: 5,
        depth: 5,
        from_name: "Sender",
        from_address: "123 Sender St",
        from_location: { lat: 40.7128, lng: -74.006 },
        to_name: "Receiver",
        to_address: "456 Receiver St",
        to_location: { lat: 34.0522, lng: -118.2437 },
      };
      PackageRepository.create.mockResolvedValue(exp);

      result = await packageService.createPackage(payload);

      expect(result).toEqual({
        data: exp,
        statusCode: 201,
      });
    });

    it("should handle duplicate key error", async () => {
      PackageRepository.create.mockImplementation(() => {
        const error = new Error("Duplicate key error");
        error.code = 11000;
        throw error;
      });

      result = await packageService.createPackage(payload);

      expect(result).toEqual({
        error: "Duplicate key error: Package ID already exists",
        statusCode: 400,
      });
    });

    it("should handle general errors", async () => {
      PackageRepository.create.mockImplementation(() => {
        throw new Error("General Error");
      });

      result = await packageService.createPackage(payload);

      expect(result).toEqual({
        error: "General Error",
        statusCode: 500,
      });
    });
  });

  describe("findAllPackage", () => {
    it("should return data and statusCode 200 on success", async () => {
      const mockPayload = { page: 1, limit: 10 };
      const mockData = [{ id: 1, name: "Test Package" }];

      PackageRepository.all.mockResolvedValue(mockData);

      const result = await packageService.findAllPackage(mockPayload);

      expect(result).toEqual({ data: mockData, statusCode: 200 });
    });

    it("should return error and statusCode 500 on failure", async () => {
      const mockPayload = { page: 1, limit: 10 };
      const mockError = new Error("Database error");

      PackageRepository.all.mockRejectedValue(mockError);

      const result = await packageService.findAllPackage(mockPayload);

      expect(result).toEqual({ error: mockError.message, statusCode: 500 });
    });
  });

  describe("updatePackage", () => {
    it("should return 404 if Package is not found", async () => {
      PackageRepository.findOne.mockResolvedValue(null);

      const payload = { package_id: "nonexistent_id", body: {} };
      const result = await packageService.updatePackage(payload);

      expect(result).toEqual({ error: "Package Not Found", statusCode: 404 });
    });

    it("should return 200 if Package is updated successfully", async () => {
      PackageRepository.findOne.mockResolvedValue({ _id: "existing_id" });
      PackageRepository.update.mockResolvedValue({});

      const payload = {
        package_id: "existing_id",
        body: { status: "delivered" },
      };
      const result = await packageService.updatePackage(payload);

      expect(result).toEqual({
        data: "Package Updated Successfully",
        statusCode: 200,
      });
    });

    it("should return 500 if an error occurs", async () => {
      PackageRepository.findOne.mockRejectedValue(new Error("Database error"));

      const payload = { package_id: "existing_id", body: {} };
      const result = await packageService.updatePackage(payload);

      expect(result).toEqual({ error: "Database error", statusCode: 500 });
    });
  });

  describe("findByIdPackage", () => {
    it("should return Package data when found", async () => {
      const mockPackage = { package_id: "123", name: "Test Package" };
      PackageRepository.findOne.mockResolvedValue(mockPackage);

      const result = await packageService.findByIdPackage("123");

      expect(result).toEqual({ data: mockPackage, statusCode: 200 });
    });

    it("should return 404 when Package not found", async () => {
      PackageRepository.findOne.mockResolvedValue(null);

      const result = await packageService.findByIdPackage("123");

      expect(result).toEqual({ error: "Package Not found", statusCode: 404 });
    });

    it("should return 500 on repository error", async () => {
      const errorMessage = "Database error";
      PackageRepository.findOne.mockRejectedValue(new Error(errorMessage));

      const result = await packageService.findByIdPackage("123");

      expect(result).toEqual({ error: errorMessage, statusCode: 500 });
    });
  });

  describe("deletePackage", () => {
    it("should delete a Package successfully", async () => {
      const payload = "12345";
      const Package = { _id: "1", package_id: payload };

      PackageRepository.findOne.mockResolvedValue(Package);
      PackageRepository.update.mockResolvedValue({});

      const result = await packageService.deletePackage(payload);

      expect(PackageRepository.findOne).toHaveBeenCalledWith({
        package_id: payload,
      });
      expect(PackageRepository.update).toHaveBeenCalledWith(
        { _id: Package._id },
        { deletedAt: moment().unix() }
      );
      expect(result).toEqual({
        data: "Package Deleted Successfully",
        statusCode: 200,
      });
    });

    it("should return 404 if Package not found", async () => {
      const payload = "12345";
      PackageRepository.findOne.mockResolvedValue(null);

      const result = await packageService.deletePackage(payload);

      expect(PackageRepository.findOne).toHaveBeenCalledWith({
        package_id: payload,
      });
      expect(result).toEqual({ error: "Package Not Found", statusCode: 404 });
    });

    it("should return 500 on error", async () => {
      const payload = "12345";
      const errorMessage = "Database error";

      PackageRepository.findOne.mockRejectedValue(new Error(errorMessage));

      const result = await packageService.deletePackage(payload);

      expect(result).toEqual({ error: errorMessage, statusCode: 500 });
    });
  });
});
