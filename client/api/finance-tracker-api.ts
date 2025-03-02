import { createApi } from "~/lib/api/api";
import {
  Account,
  EditAccount,
  Finance,
  NewAccount,
  NewFinance,
  ResetPassword,
  SignIn,
  SignUp,
} from "~/model/types";
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
    sorted: boolean = true,
  ) {
    return await this.api.get("/accounts", undefined, {
      query: {
        page,
        limit,
        fieldsSearch,
        sorted,
      },
    });
  }

  async createAccount({ name, amount }: NewAccount) {
    return await this.api.post("/accounts", toJson({ name, amount }));
  }

  async deleteAccount(idsArray: Account["_id"][]) {
    return await this.api.delete(`/accounts`, toJson({ ids: idsArray }));
  }

  async editAccount({ _id, name, amount }: EditAccount) {
    return await this.api.put(`/accounts`, toJson({ _id, name, amount }));
  }

  async getFinance(
    page: number = 1,
    limit: number = 10,
    fieldsSearch: string = "",
    sorted: boolean = true,
  ) {
    return await this.api.get("/finance", undefined, {
      query: {
        page,
        limit,
        fieldsSearch,
        sorted,
      },
    });
  }

  async createFinance({ name, amount, category }: NewFinance) {
    return await this.api.post("/finance", toJson({ name, amount, category }));
  }

  async deleteFinance(idsArray: Account["_id"][]) {
    return await this.api.delete(`/finance`, toJson({ ids: idsArray }));
  }

  async editFinance({ _id, name, amount, category, date, notes }: Finance) {
    return await this.api.put(
      `/finance`,
      toJson({ _id, name, amount, category, date, notes }),
    );
  }
}

export const fta = new FinanceTrackerApi();
