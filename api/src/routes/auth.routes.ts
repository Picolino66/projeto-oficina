import { Router } from "express";
import { AuthController } from "../controllers/authController"; 
const authController = new AuthController();
const authRoutes = Router();

authRoutes.post("/", authController.login);


export { authRoutes };

