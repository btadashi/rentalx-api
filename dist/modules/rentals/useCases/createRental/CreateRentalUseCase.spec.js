"use strict";

var _dayjs = _interopRequireDefault(require("dayjs"));

var _RentalsRepositoryInMemory = require("@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory");

var _AppErrors = require("@shared/errors/AppErrors");

var _CreateRentalUseCase = require("./CreateRentalUseCase");

var _DayjsDateProvider = require("@shared/container/providers/DateProvider/implementations/DayjsDateProvider");

var _CarsRepositoryInMemory = require("@modules/cars/repositories/in-memory/CarsRepositoryInMemory");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let createRentalUseCase;
let rentalsRepositoryInMemory;
let carsRepositoryInMemory;
let dayjsDateProvider;
describe("Create rental", () => {
  const dayAdd24Hours = (0, _dayjs.default)().add(1, "day").toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new _RentalsRepositoryInMemory.RentalsRepositoryInMemory();
    dayjsDateProvider = new _DayjsDateProvider.DayjsDateProvider();
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    createRentalUseCase = new _CreateRentalUseCase.CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider, carsRepositoryInMemory);
  });
  it("should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test",
      description: "Car Test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand"
    });
    const rental = await createRentalUseCase.execute({
      user_id: "1234",
      car_id: car.id,
      expected_return_date: dayAdd24Hours
    });
    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });
  it("should not be able to create a new rental if exists an opened rental to the same user", async () => {
    /**Fazemos o cadastro de um aluguel, usando o método create de dentro de rentalsRepositoryInMemory */
    await rentalsRepositoryInMemory.create({
      car_id: "1111",
      expected_return_date: dayAdd24Hours,
      user_id: "test"
    });
    /**Podemos remover essa operação, pois ela é substituída pelo de cima */
    // await createRentalUseCase.execute({
    //   user_id: "test",
    //   car_id: "1234",
    //   expected_return_date: dayAdd24Hours
    // });

    await expect(createRentalUseCase.execute({
      user_id: "test",
      car_id: "4321",
      expected_return_date: dayAdd24Hours
    })).rejects.toEqual(new _AppErrors.AppError("There is already a rental in progress for this user"));
  });
  it("should not be able to create a new rental if exists an opened rental to the same car", async () => {
    /**Fazemos a mesma coisa aqui nesse teste */
    await rentalsRepositoryInMemory.create({
      car_id: "test",
      expected_return_date: dayAdd24Hours,
      user_id: "12345"
    });
    await expect(createRentalUseCase.execute({
      user_id: "4321",
      car_id: "test",
      expected_return_date: dayAdd24Hours
    })).rejects.toEqual(new _AppErrors.AppError("Car is unavailable"));
  });
  it("should not be able to create a new rental with invalid return time", async () => {
    await expect(createRentalUseCase.execute({
      user_id: "1234",
      car_id: "test",
      expected_return_date: (0, _dayjs.default)().toDate()
    })).rejects.toEqual(new _AppErrors.AppError("Invalid return time"));
  });
});