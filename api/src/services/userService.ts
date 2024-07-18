
import { UserModel } from '../models/userModel';
import { Usuario } from '@prisma/client'
const userModel = new UserModel()

export class UserService {
  async createUser(data: any) {
    try {
      return userModel.createUser(data);
    } catch (error: unknown) {
      throw error;
    }
  }

  async getTotalUsers() {
    try {
      return userModel.getTotalUsers();
    } catch (error: unknown) {
      throw error;
    }
  }

  async getUsers() {
    try {
      return userModel.getUsers();
    } catch (error: unknown) {
      throw error;
    }
  }

  async getUserById(id: any) {
    try {
      return userModel.getUserById(id);
    } catch (error: unknown) {
      throw error;
    }
  }

  async getUserByUsername(username: any) {
    try {
      return userModel.getUserByUsername(username);
    } catch (error: unknown) {
      throw error;
    }
  }
  

  async updateUserById(id: any, user: Partial<any>) {
    try {
      return userModel.updateUserById(id, user);
    } catch (error: unknown) {
      throw error;
    }
  }

  async deleteUserById(id: any) {
    try {
      return userModel.deleteUserById(id);
    } catch (error: unknown) {
      throw error;
    }
  }
  async login(data: any) {
    try {
      return userModel.getLogin(data);
    } catch (error: unknown) {
      throw error;
    }
  }
  
}