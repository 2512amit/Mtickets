import { Router } from "express";
import {
  changePassword,
  forgotPassword,
  loginControllers,
  logoutControllers,
  refreshControllers,
  registerControllers,
} from "../controllers";

export const AuthRouter = Router();

AuthRouter.post("/signup", registerControllers),
AuthRouter.post("/login", loginControllers),
AuthRouter.post("/refresh", refreshControllers),
AuthRouter.post("/logout", logoutControllers);
AuthRouter.put("/forgotPassword", forgotPassword);
AuthRouter.put('/changePassword', changePassword);
