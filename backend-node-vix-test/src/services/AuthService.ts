import { ERROR_MESSAGE } from "../constants/erroMessages";
import { STATUS_CODE } from "../constants/statusCode";
import { AppError } from "../errors/AppError";
import { UserModel } from "../models/UserModel";
import { IPayload } from "../types/Interfaces/jwt";
import { loginSchema, TLogin } from "../types/validations/auth/login";
import { comparePassword } from "../utils/hash";
import { genToken } from "../utils/jwt";

export class AuthService {
  constructor() {}

  private userModel = new UserModel();

  async login(data: TLogin) {
    const valideData = loginSchema.parse(data);
    const user = await this.userModel.getUserByEmail(valideData.email);

    if (!user || user.deletedAt || !user.isActive) {
      throw new AppError(
        ERROR_MESSAGE.INVALID_EMAIL_OR_PASSWORD,
        STATUS_CODE.UNAUTHORIZED,
      );
    }

    const isValidPassword = comparePassword(data.password, user.password);

    if (!isValidPassword) {
      throw new AppError(
        ERROR_MESSAGE.INVALID_EMAIL_OR_PASSWORD,
        STATUS_CODE.UNAUTHORIZED,
      );
    }

    const payload: IPayload = {
      idUser: user.idUser,
      email: user.email,
      username: user.username,
      role: user.role,
      idBrandMaster: user.idBrandMaster || undefined,
    };

    const token = genToken(payload);

    await this.userModel.updateUserLastLoginDate(user.idUser);

    return {
      token,
      user: payload,
    };
  }
}
