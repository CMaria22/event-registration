"use server-only";

import { cookies } from "next/headers";


export async function getCookieInfo():Promise<string|undefined>{
    const cookieStore = await cookies();
    const user_id = cookieStore.get("my_cookie")?.value; 
    return user_id;

}