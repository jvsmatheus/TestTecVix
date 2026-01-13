import { ERROR_MESSAGE } from "../constants/erroMessages";
import { STATUS_CODE } from "../constants/statusCode";
import { AppError } from "../errors/AppError";
import { UserModel } from "../models/UserModel";
import {
  TUserCreated,
  userCreatedSchema,
} from "../types/validations/User/createUser";
import {
  TUserUpdated,
  userUpdatedSchema,
} from "../types/validations/User/updateUser";
import { hashPassword } from "../utils/hash";

export class UserService {
  constructor() {}

  private userModel = new UserModel();

  async getUserById(idUser: string) {
    return this.userModel.getUserById(idUser);
  }

  async getUserByEmail(email: string) {
    return this.userModel.getUserByEmail(email);
  }

  async createUser(data: TUserCreated) {
    const validateData = userCreatedSchema.parse(data);

    validateData.password = await hashPassword(validateData.password);

    const createdUser = await this.userModel.createUser({
      ...validateData,
    });

    return createdUser;
  }

  async updateUser(idUser: string, data: TUserUpdated) {
    const validateDataSchema = userUpdatedSchema.parse(data);
    const oldUser = await this.getUserById(idUser);

    if (!oldUser) {
      throw new AppError(ERROR_MESSAGE.NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    const updatedUser = await this.userModel.updateUser(
      idUser,
      validateDataSchema,
    );
    return updatedUser;
  }

  async deleteUser(idUser: string) {
    const oldUser = await this.getUserById(idUser);
    if (!oldUser) {
      throw new AppError(ERROR_MESSAGE.NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }
    const deletedUser = await this.userModel.deleteUser(idUser);
    return deletedUser;
  }

  async updateUserLastLoginDate(idUser: string) {
    return await this.userModel.updateUserLastLoginDate(idUser);
  }
}
