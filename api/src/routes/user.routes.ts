import { Router } from "express";
import { UserController } from "../controllers/userController";
const userController = new UserController();
const userRoutes = Router();

userRoutes.post("/", userController.createUser);
userRoutes.get("/", userController.getUsers);
userRoutes.get("/:id", userController.getUserById);
userRoutes.get("/username/:username", userController.getUserByUsername);
userRoutes.put("/atualizar/:id", userController.updateUserById);
userRoutes.delete("/deletar/:id", userController.deleteUserById);

export { userRoutes };

