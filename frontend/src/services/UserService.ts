import api from "./api";
import type { User, LoginResponse, RegisterRequest, UpdateUserRequest } from "../interfaces/UserInterface";

class UserService {
  static async login(email: string, password: string): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>("/auth/login", { email, password });
    return response.data;
  }

  static async register(userData: RegisterRequest): Promise<User> {
    const response = await api.post<User>("/admin/register", userData);
    return response.data;
  }

  static async getAllUsers(): Promise<User[]> {
    const response = await api.get<User[]>("/admin/users");
    return response.data;
  }

  static async getYourProfile(): Promise<User> {
    const response = await api.get<User>("/adminuser/profile");
    return response.data;
  }

  static async getUserById(userId: number): Promise<User> {
    const response = await api.get<User>(`/adminusers/${userId}`);
    return response.data;
  }

  static async deleteUser(userId: number): Promise<string> {
    const response = await api.delete(`/admin/users/${userId}`);
    return response.data;
  }

  static async updateUser(userId: number, userData: UpdateUserRequest): Promise<User> {
    const response = await api.put<User>(`/admin/users/${userId}`, userData);
    return response.data;
  }

  /** AUTHENTICATION HELPERS */
  static logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }

  static isAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    return !!token;
  }

  static isAdmin(): boolean {
    const role = localStorage.getItem("role");
    return role === "ADMIN";
  }

  static isUser(): boolean {
    const role = localStorage.getItem("role");
    return role === "USER";
  }

  static adminOnly(): boolean {
    return this.isAuthenticated() && this.isAdmin();
  }
}

export default UserService;
