import { QueryClient, QueryKey, MutationOptions } from "@tanstack/react-query";
import { produce, Draft } from "immer";

export const optimistic = <Data, Variables>(
  client: QueryClient,
  queryKey: QueryKey | ((vars: Variables) => QueryKey),
  update: (old: Draft<Data>, vars: Variables) => void,
): Pick<MutationOptions<any, unknown, Variables>, "onMutate"> => ({
  onMutate: async (vars: Variables) => {
    const qk = typeof queryKey === "function" ? queryKey(vars) : queryKey;
    await client.cancelQueries({ queryKey: qk });
    const oldData = client.getQueryData<Data>(qk);
    client.setQueryData<Data>(qk, (old) => {
      if (old) {
        return produce(old, (draft) => update(draft, vars) as any);
      }
    });

    return { oldData };
  },
});
