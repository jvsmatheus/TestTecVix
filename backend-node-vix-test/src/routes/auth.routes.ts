import { Router } from "express";
import { authUser } from "../auth/authUser";
import { API_VERSION, ROOT_PATH } from "../constants/basePathRoutes";
import { AuthController } from "../controllers/AuthController";

const BASE_PATH = API_VERSION.V1 + ROOT_PATH.AUTH; // /api/v1/auth

const authRoutes = Router();

export const makeAuthController = () => {
  return new AuthController();
};

const authController = makeAuthController();

authRoutes.post(`${BASE_PATH}/login`, async (req, res) => {
  await authController.login(req, res);
});

authRoutes.get(
  `${BASE_PATH}/refresh-token/:idUser`,
  authUser,
  async (req, res) => {
    await authController.refreshToken(req, res);
  },
);

export default authRoutes;
