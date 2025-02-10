import { createApi } from "~/lib/api/api";
import { SignIn } from "~/model/types";
import { toJson } from "~/lib/api/helpers";
import { Endpoints } from "~/lib/api/types";

export class FinanceTrackerApi {
  api = createApi<Endpoints>({
    host: "http://localhost:8000",
    headers: {},
  });

  async signIn(data: SignIn) {
    return await this.api.post("/auth/login", toJson(data));
  }
}

export const fta = new FinanceTrackerApi();
