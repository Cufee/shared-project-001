import { ApiError } from "../types/Api";

function parseApiErrorMessage(
  error: ApiError | null,
): { message: string; context?: string } {
  if (!error) {
    return { message: "Something went wrong" };
  }
  if (Array.isArray(error.message)) {
    return {
      message: error.error || "Something went wrong",
      context: error.message[0]?.message,
    };
  }
  if (typeof error.message === "object") {
    return {
      message: error.error || "Something went wrong",
      context: error.message.message,
    };
  }
  return { message: error.error || "Something went wrong" };
}

export { parseApiErrorMessage };
