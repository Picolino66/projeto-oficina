import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService'; // Importe o AuthService ou o local onde ele está definido

declare module 'express' {
    interface Request {
      userId?: string; // Adicione a propriedade userId ao tipo Request
    }
  }

export async function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Token de autenticação não fornecido.' });
  }

  const userId = await AuthService.verifyAuthToken(token);
  if (!userId) {
    return res.status(401).json({ error: 'Token de autenticação inválido.' });
  }

  req.userId = userId;
  next();
}