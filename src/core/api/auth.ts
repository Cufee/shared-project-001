import {
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

function register(
  payload: RegisterPayload | RegisterFromInvitePayload,
): Promise<ApiResponse<RegisterResponse>> {
  const endpoint = "invitationToken" in payload
    ? "/auth/invitation-registration"
    : "/auth/register";

  return apiRequest<RegisterResponse>(
    "POST",
    endpoint,
    payload,
  );
}

function login(username: string, password: string) {
  return apiRequest<RegisterResponse>(
    "POST",
    "/auth/login",
    { username, password },
  );
}

export { login, register };
