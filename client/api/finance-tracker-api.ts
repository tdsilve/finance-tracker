import { createApi } from "~/lib/api/api";
import { ResetPassword, SignIn, SignUp } from "~/model/types";
import { toJson } from "~/lib/api/helpers";
import { Endpoints } from "~/lib/api/types";

export class FinanceTrackerApi {
  api = createApi<Endpoints>({
    host: process.env.NEXT_PUBLIC_API_URL!,
    headers: {},
  });

  async signIn(data: SignIn) {
    return await this.api.post("/auth/login", toJson(data));
  }

  async sendResetPasswordEmail(data: { email: string }) {
    return await this.api.post("/auth/send-reset-password-email", toJson(data));
  }

  async resetPassword(data: ResetPassword) {
    return await this.api.post("/auth/reset-password", toJson(data));
  }

  async signUp(data: SignUp) {
    return await this.api.post("/auth/register", toJson(data));
  }

  async logout() {
    return await this.api.post("/auth/logout");
  }

  async me() {
    return await this.api.get("/users/me");
  }

  async getAccounts(
    page: number = 1,
    limit: number = 10,
    fieldsSearch: string = "",
  ) {
    return await this.api.get("/accounts", undefined, {
      query: {
        page,
        limit,
        fieldsSearch,
      },
    });
  }

  async createAccount(name: string) {
    return await this.api.post("/accounts", toJson({ name }));
  }
}

export const fta = new FinanceTrackerApi();
