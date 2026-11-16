"use server";

import { cookies } from "next/headers";

export async function setUserAction(userId: string) {
  if (process.env.NODE_ENV !== "development") {
    throw new Error("Available only in development");
  }
  if (userId !== "user-id-1" && userId !== "user-id-2") {
    throw new Error("Invalid user credentials");
  }
  const cookieStore = await cookies();
  cookieStore.set("my_cookie", userId, {
    path: "/",
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 60 * 60 * 3, // Expires in 3 hours
  });
}


