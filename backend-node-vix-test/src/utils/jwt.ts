import { ERROR_MESSAGE } from "../constants/erroMessages";
import { STATUS_CODE } from "../constants/statusCode";
import { AppError } from "../errors/AppError";
import { IPayload } from "../types/Interfaces/jwt";

import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXPIRES;

export const genToken = (payload: IPayload) => {
  return jwt.sign(payload, secret!, {
    expiresIn: parseInt(expiresIn!),
  });
};

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, secret!);

    if (typeof decoded === "string") {
      throw new AppError(ERROR_MESSAGE.INVALID_TOKEN, STATUS_CODE.UNAUTHORIZED);
    }

    return decoded as IPayload;
  } catch (error) {
    throw new AppError(ERROR_MESSAGE.INVALID_TOKEN, STATUS_CODE.UNAUTHORIZED);
  }
};
