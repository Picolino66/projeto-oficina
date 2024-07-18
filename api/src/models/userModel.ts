import { PrismaClient, Usuario, Prisma } from '@prisma/client';
import UserDto from '../dtos/userDTO';
import prisma from './prismaClient';
import { AuthService } from '../services/authService';

export class UserModel {
  async createUser(userData: UserDto) {
    try {
      const hashedPassword = await AuthService.hashPassword(userData.password);
      return await prisma.usuario.create({
        data: {
          name: userData.name,
          username: userData.username,
          password: hashedPassword,
          nivel: userData.nivel == true ? 1 : 0
        },
      });
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002' && error.meta && typeof error.meta.target === 'string' && error.meta.target.includes('username')) {
          throw new Error('Usuario já existe.');
        }
      }
      throw error;
    }
  }

  async getTotalUsers() {
    return await prisma.usuario.count();
  }

  async getUsers() {
    try {
      return prisma.usuario.findMany();
    } catch (error: unknown) {
      throw error;
    }
  }

  async getUserById(id: string) {
    try {
      return prisma.usuario.findUnique({
        where: {
          id,
        },
      });
    } catch (error: unknown) {
      throw error;
    }
  }

    async getUserByUsername(username: string) {
        try {
        return prisma.usuario.findUnique({
            where: {
            username,
            },
        });
        } catch (error: unknown) {
        throw error;
        }
    }

  async updateUserById(id: string, user: Partial<Usuario>) {
    try {
      if (user.password) {
        user.password = await AuthService.hashPassword(user.password);
      }
      const updatedUser = await prisma.usuario.update({
        where: {
          id,
        },
        data: {
          name: user.name,
          username: user.username,
          password: user.password,
          nivel: user.nivel
        },
      });
      return updatedUser;
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new Error('Usuario não encontrado.');
        }
        else if (error.code === 'P2002' && error.meta && typeof error.meta.target === 'string' && error.meta.target.includes('username')) {
          throw new Error('Usuario já existe.');
        }
      }
      throw error;
    }
  }

  async deleteUserById(id: string) {
    try {
      return prisma.usuario.update({
        where: {
          id,
        },
        data: { visivel: false }
      });
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new Error('Usuario não encontrado.');
        }
      }
      throw error;
    }
  }

  async getLogin(login: any) {
      try {
      return prisma.usuario.findUnique({
          where: {
          username: login.usuario,
          password: login.senhaCrip
          },
      });
      } catch (error: unknown) {
      throw error;
      }
  }
}