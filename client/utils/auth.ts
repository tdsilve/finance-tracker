import { deleteCookies } from "~/api/server-actions/delete-cookies";
import { HTTPError } from "~/lib/error";
export const handleDeleteCookiesAndRedirect = async (
  redirectUrl: string = "/sign-in",
) => {
  try {
    await deleteCookies();
    if (typeof window !== "undefined") {
      window.location.href = redirectUrl;
    }
  } catch (error: any) {
    throw new HTTPError("Error in handleDeleteCookiesAndRedirect", 400, {
      message: error.message, // Add any relevant error details here
      stack: error.stack, // Optional: Include the stack trace
    });
  }
};
