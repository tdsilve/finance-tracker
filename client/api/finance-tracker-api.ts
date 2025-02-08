import { createApi } from "~/lib/api/api";
import { SignIn } from "~/model/types";
import { toJson } from "~/lib/api/helpers";

export class FinanceTrackerApi {
  api = createApi({
    host: process.env.host!,
    headers: {
      Accept: "application/json",
    },
  });

  async signIn(data: SignIn) {
    return await this.api.post("/auth/login", toJson(data));
  }
}

export const fta = new FinanceTrackerApi();
