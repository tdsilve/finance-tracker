"use server";

import { cookies } from "next/headers";

export async function deleteCookies() {
  const cookieStore = await cookies();
  const hasCookie = cookieStore.has(process.env.SESSION_TOKEN_NAME!);
  if (hasCookie) {
    cookieStore.delete(process.env.SESSION_TOKEN_NAME!);
  }
}
