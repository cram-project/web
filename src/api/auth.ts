import type {LoginRequest, LoginResponse, RegisterRequest, UserPayload} from "../types/auth.ts";
import api from "./axios.ts";

export const register = async (data: RegisterRequest): Promise<void> => {
    await api.post("auth/register", data);
};

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
    const r = await api.post<LoginResponse>("/auth/login", data);
    return r.data;
};

export const getMe = async (): Promise<UserPayload> => {
    const r = await api.get<UserPayload>("/auth/me");
    return r.data;
};

export const refreshTokens = async (token: string): Promise<LoginResponse> => {
    const r = await api.post<LoginResponse>("/auth/refresh", { refresh_token: token });
    return r.data;
};
