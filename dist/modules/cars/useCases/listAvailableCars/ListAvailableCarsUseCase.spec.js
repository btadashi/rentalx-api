"use strict";

var _CarsRepositoryInMemory = require("@modules/cars/repositories/in-memory/CarsRepositoryInMemory");

var _ListAvailableCarsUseCase = require("./ListAvailableCarsUseCase");

let listAvailableCarsUseCase;
let carsRepositoryInMemory;
describe("List cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    listAvailableCarsUseCase = new _ListAvailableCarsUseCase.ListAvailableCarsUseCase(carsRepositoryInMemory);
  });
  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      "name": "Car1",
      "description": "Car description",
      "daily_rate": 110.00,
      "license_plate": "DEF-5678",
      "fine_amount": 40.00,
      "brand": "Car_brand",
      "category_id": "category_id"
    });
    const cars = await listAvailableCarsUseCase.execute({});
    expect(cars).toEqual([car]);
  });
  it("should be able to list all available car by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      "name": "Car2",
      "description": "Car description",
      "daily_rate": 110.00,
      "license_plate": "DEF-5678",
      "fine_amount": 40.00,
      "brand": "Car_brand_test",
      "category_id": "category_id"
    });
    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car_brand_test"
    });
    expect(cars).toEqual([car]);
  });
  it("should be able to list all available car by name", async () => {
    const car = await carsRepositoryInMemory.create({
      "name": "Car3",
      "description": "Car description",
      "daily_rate": 110.00,
      "license_plate": "DEF-8910",
      "fine_amount": 40.00,
      "brand": "Car_brand_test",
      "category_id": "category_id"
    });
    const cars = await listAvailableCarsUseCase.execute({
      name: "Car3"
    });
    expect(cars).toEqual([car]);
  });
  it("should be able to list all available car by category", async () => {
    const car = await carsRepositoryInMemory.create({
      "name": "Car3",
      "description": "Car description",
      "daily_rate": 110.00,
      "license_plate": "DEF-1234",
      "fine_amount": 40.00,
      "brand": "Car_brand_test",
      "category_id": "123456"
    });
    const cars = await listAvailableCarsUseCase.execute({
      category_id: "1233456"
    });
    expect(cars).toEqual([car]);
  });
});