//classe responsável por criar o hash da senha do usuário
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
const JWT_SECRET = 'meu_segredo_secreto_ inviolavel_que_em_uma_variavel_de_ambiente_deve_estar_e_totalmente_aleatória_deve_ser_estou_colocando_assim_para_não_perguntar_porra_de_onde_tu_arrumou_esse_token';

export class AuthService {
    static async hashPassword(password: string) {
        return await bcrypt.hash(password, 10);
    }
    
    static async comparePassword(password: string, hash: string) {
        return await bcrypt.compare(password, hash);
    }

    static async generateAuthToken(userId: string): Promise<string> {
        const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '10h' }); // Expira em 1 hora
        return token;
      }

    
    static async verifyAuthToken(token: string): Promise<string | null> {
        try {
            const payload = jwt.verify(token, JWT_SECRET) as { userId: string };
            if( typeof payload === 'object' && 'userId' in payload){
                return payload.userId;
            }
            return null;
        } catch {
            return null;
        }
    }
}