import { user } from "@prisma/client";
import { ERROR_MESSAGE } from "../constants/erroMessages";
import { STATUS_CODE } from "../constants/statusCode";
import { AppError } from "../errors/AppError";
import { IPayload } from "../types/Interfaces/jwt";
import { loginSchema, TLogin } from "../types/validations/auth/login";
import { registerSchema, Tregister } from "../types/validations/auth/register";
import { comparePassword } from "../utils/hash";
import { genToken } from "../utils/jwt";
import { UserService } from "./UserService";

export class AuthService {
  constructor() {}

  private userService = new UserService();

  async login(data: TLogin) {
    const valideData = loginSchema.parse(data);
    const user = await this.userService.getUserByEmail(valideData.email);

    if (!user || user.deletedAt || !user.isActive) {
      throw new AppError(
        ERROR_MESSAGE.INVALID_EMAIL_OR_PASSWORD,
        STATUS_CODE.UNAUTHORIZED,
      );
    }

    const isValidPassword = await comparePassword(data.password, user.password);

    if (!isValidPassword) {
      throw new AppError(
        ERROR_MESSAGE.INVALID_EMAIL_OR_PASSWORD,
        STATUS_CODE.UNAUTHORIZED,
      );
    }

    const token = this.generateToken(user);

    await this.userService.updateUserLastLoginDate(user.idUser);

    return {
      token,
      user: {
        idUser: user.idUser,
        profileImgUrl: user.profileImgUrl,
        email: user.email,
        username: user.username,
        role: user.role,
        idBrandMaster: user.idBrandMaster || undefined,
        userPhoneNumber: user.userPhoneNumber,
        isActive: user.isActive,
      },
    };
  }

  async register(data: Tregister) {
    const validData = registerSchema.parse(data);

    const userExists = await this.userService.getUserByEmail(validData.email);

    if (userExists) {
      throw new AppError(
        ERROR_MESSAGE.USER_EMAIL_ALREADY_EXISTS,
        STATUS_CODE.BAD_REQUEST,
      );
    }

    const newUser = await this.userService.createUser({
      email: validData.email,
      password: validData.password,
      username: validData.username,
      isActive: true,
    });

    if (!newUser) {
      throw new AppError(ERROR_MESSAGE.SERVER_ERROR, STATUS_CODE.SERVER_ERROR);
    }

    const token = this.generateToken(newUser);

    return {
      token,
      user: {
        idUser: newUser.idUser,
        profileImgUrl: newUser.profileImgUrl,
        email: newUser.email,
        username: newUser.username,
        role: newUser.role,
        idBrandMaster: newUser.idBrandMaster || undefined,
        userPhoneNumber: newUser.userPhoneNumber,
        isActive: newUser.isActive,
      },
    };
  }

  async refreshToken(idUser: string) {
    const user = await this.userService.getUserById(idUser);

    if (!user || user.deletedAt) {
      throw new AppError(ERROR_MESSAGE.UNAUTHORIZED, STATUS_CODE.UNAUTHORIZED);
    }

    return this.generateToken(user);
  }

  private generateToken(user: user) {
    const payload: IPayload = {
      idUser: user.idUser,
      email: user.email,
      username: user.username,
      role: user.role,
      idBrandMaster: user.idBrandMaster || undefined,
    };

    return genToken(payload);
  }
}
