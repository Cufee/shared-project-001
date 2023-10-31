import {
  ApiError,
  ApiResponse,
  RegisterFromInvitePayload,
  RegisterPayload,
} from "../types/Api";
import { User } from "../types/User";
import { apiRequest } from "./request";

interface RegisterResponse {
  token: string;
  user: User;
}

async function register(
  payload: RegisterPayload | RegisterFromInvitePayload,
): Promise<ApiResponse<RegisterResponse>> {
  const endpoint = "invitationToken" in payload
    ? "/auth/invitation-registration"
    : "/auth/register";

  const data = await apiRequest<RegisterResponse | ApiError>(
    "POST",
    endpoint,
    payload,
  );
  if ("error" in data) {
    return { data: null, error: data };
  }
  return { data, error: null };
}

async function login(username: string, password: string) {
  const data = await apiRequest<RegisterResponse | ApiError>(
    "POST",
    "/auth/login",
    { username, password },
  );
  if ("error" in data) {
    return { data: null, error: data };
  }
  return { data, error: null };
}

export { login, register };
