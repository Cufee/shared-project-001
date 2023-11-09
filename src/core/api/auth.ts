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
  payload: RegisterPayload | RegisterFromInvitePayload
): Promise<ApiResponse<RegisterResponse>> {
  const endpoint =
    "invitationToken" in payload
      ? "/auth/invitation-registration"
      : "/auth/register";

  return apiRequest<RegisterResponse>(
    "POST",
    endpoint,
    JSON.stringify(payload),
    null,
    {
      contentType: "application/json",
    }
  );
}

function login(username: string, password: string) {
  return apiRequest<RegisterResponse>(
    "POST",
    "/auth/login",
    JSON.stringify({ username, password }),
    null,
    { contentType: "application/json" }
  );
}

export { login, register };
