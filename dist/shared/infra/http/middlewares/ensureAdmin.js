"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureAdmin = ensureAdmin;

var _UsersRepository = require("@modules/accounts/infra/typeorm/repositories/UsersRepository");

var _AppErrors = require("@shared/errors/AppErrors");

async function ensureAdmin(request, response, next) {
  const {
    id
  } = request.user;
  const usersRepository = new _UsersRepository.UsersRepository();
  const user = await usersRepository.findById(id);

  if (!user.isAdmin) {
    throw new _AppErrors.AppError("User is not an admin!");
  }

  return next();
}