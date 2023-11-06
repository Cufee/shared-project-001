import { ApiError } from "../types/Api";

function parseApiErrorMessage(error: ApiError | null): {
  message: string;
  context?: string;
} {
  if (!error) {
    return { message: "Invalid error received" };
  }
  if (Array.isArray(error.message)) {
    return {
      message: error.message[0].message || "Something went wrong",
      context: error.message[0]?.property,
    };
  }
  if (typeof error.message === "object") {
    return {
      message: error.error || "Something went wrong",
      context: error.message.message,
    };
  }
  if (typeof error.message === "string") {
    return { message: error.message };
  }
  return { message: error.error || "Something went wrong" };
}

export { parseApiErrorMessage };
