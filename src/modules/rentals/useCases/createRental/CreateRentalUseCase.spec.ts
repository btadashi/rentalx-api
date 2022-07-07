import dayjs from 'dayjs';

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppErrors";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider, carsRepositoryInMemory);
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
    })
    ).rejects.toEqual(new AppError("There is already a rental in progress for this user"));
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
    })
    ).rejects.toEqual(new AppError("Car is unavailable"));
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    await expect(createRentalUseCase.execute({
      user_id: "1234",
      car_id: "test",
      expected_return_date: dayjs().toDate()
    })
    ).rejects.toEqual(new AppError("Invalid return time"));
  });
});
