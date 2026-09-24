import { setToken } from "../lib/auth";
import api from "../lib/axios";
import { LoginCredentials, LoginResponse } from "../types/auth";

export const login = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>(
    "/auth/login",
    credentials
  );

  const data = response.data;

  setToken(data.accessToken);

  return data;
};