export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    city: string;
}

export interface LoginResponse {
    token: string;
    role: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    role: string;
    city?: string;
}

export interface UpdateUserRequest {
    name?: string;
    email?: string;
    password?: string;
    role?: string;
    city?: string;
}