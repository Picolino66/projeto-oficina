import { Request, Response } from "express";
import { AuthService } from '../services/authService';
import { UserService } from "../services/userService";
const userService = new UserService();

export class AuthController {


async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      // Verificar se o usuário com o nome de usuário fornecido existe no banco de dados
      // removendo o prisma cliente e usando o service já criado anteriormente, promovendo a reutilização de código
      const user = await userService.getUserByUsername(username);
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      // Verificar se a senha fornecida é válida
      const isPasswordValid = await AuthService.comparePassword(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Senha inválida" });
      }
      // Gerar token de autenticação
      const token = await AuthService.generateAuthToken(user.id);
      const nivel = user.nivel;
      // Retornar token de autenticação
      return res.status(200).json({ token, nivel, message: "Login realizado com sucesso" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}