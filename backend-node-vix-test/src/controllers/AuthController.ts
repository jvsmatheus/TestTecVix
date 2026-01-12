import { Response } from "express";
import { STATUS_CODE } from "../constants/statusCode";
import { AuthService } from "../services/AuthService";
import { CustomRequest } from "../types/custom";

export class AuthController {
  constructor() {}
  private authService = new AuthService();

  async login(req: CustomRequest<unknown>, res: Response) {
    const result = await this.authService.login(req.body);
    return res.status(STATUS_CODE.OK).json(result);
  }

  async refreshToken(req: CustomRequest<unknown>, res: Response) {
    const { idUser } = req.params;
    const token = await this.authService.refreshToken(idUser);
    return res.status(STATUS_CODE.OK).json(token);
  }
}
