"use strict";

var _UsersRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersRepositoryInMemory");

var _UsersTokensRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory");

var _DayjsDateProvider = require("@shared/container/providers/DateProvider/implementations/DayjsDateProvider");

var _MailProviderInMemory = require("@shared/container/providers/MailProvider/in-memory/MailProviderInMemory");

var _AppErrors = require("@shared/errors/AppErrors");

var _SendForgotPasswordMailUseCase = require("./SendForgotPasswordMailUseCase");

let sendForgotPasswordMailUseCase;
let usersRepositoryInMemory;
let dateProvider;
let usersTokensRepositoryInMemory;
let mailProviderInMemory;
describe("Send forgot email", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    usersTokensRepositoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    mailProviderInMemory = new _MailProviderInMemory.MailProviderInMemory();
    sendForgotPasswordMailUseCase = new _SendForgotPasswordMailUseCase.SendForgotPasswordMailUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider, mailProviderInMemory);
  });
  it("should be able to send a forgot password email to the user", async () => {
    const sendMail = jest.spyOn(mailProviderInMemory, "sendMail");
    await usersRepositoryInMemory.create({
      driver_license: "123456",
      email: "johndoe@example.com",
      name: "John Doe",
      password: "1234"
    });
    await sendForgotPasswordMailUseCase.execute("johndoe@example.com");
    expect(sendMail).toHaveBeenCalled();
  });
  it("should not be able to send email if user does not exists", async () => {
    await expect(sendForgotPasswordMailUseCase.execute("example@example.com")).rejects.toEqual(new _AppErrors.AppError("User does not exists!"));
  });
  it("should be able to create a users token", async () => {
    const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create");
    await usersRepositoryInMemory.create({
      driver_license: "123456",
      email: "johndoe@example.com",
      name: "John Doe",
      password: "1234"
    });
    await sendForgotPasswordMailUseCase.execute("johndoe@example.com");
    expect(generateTokenMail).toHaveBeenCalled();
  });
});