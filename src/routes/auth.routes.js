import { Router } from "express";
import { signup,login,logout, verify, forgotPassword, resetPassword, twoFactorAuth ,verify2FAcode} from "../controller/auth.controller.js";
import { registerSchema , loginSchema,validate,authMiddleware, tfaSchema} from '../middleware/auth.middleware.js';

const route = Router();

route.post("/signup",validate(registerSchema),signup);
route.post("/login",validate(loginSchema),login);
route.post("/logout",authMiddleware,logout);
route.post("/verify",authMiddleware,verify);
route.post("/forgotPassword",forgotPassword);
route.post("/resetPassword/:token",resetPassword);
route.post("/twoFactorAuth",authMiddleware,twoFactorAuth);
route.post("/verify2FAcode",verify2FAcode)

export default route;
