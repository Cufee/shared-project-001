export type ApiResponse<T> =
  | {
      error: null;
      data: T;
    }
  | {
      error: ParsedApiError;
      data: null;
    };

export interface ApiError {
  statusCode: number;
  message: string | ApiErrorMessage | ApiErrorMessage[];
  error: string;
}

export interface ParsedApiError {
  message: string;
  context?: string;
}

interface ApiErrorMessage {
  property: string;
  message: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  password: string;
  passwordResetToken: string;
  name: string;
  surname: string;
  companyName: string;
}

export interface RegisterFromInvitePayload {
  username: string;
  password: string;
  passwordResetToken: string;
  name: string;
  surname: string;
  invitationToken: string;
}

export interface PasswordResetPayload {
  username: string;
  password: string;
  passwordResetToken: string;
}
