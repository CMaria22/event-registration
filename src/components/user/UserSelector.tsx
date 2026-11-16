"use client";
import { setUserAction } from "@/actions/setUserAction";

export function UserSelector(){
    const btn =
      "rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700";
    const settingUser = async (id:string)=>{
        try{
        await setUserAction(id);
        } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Unknown error";
      alert(message);
    }
    }
    return (
      <div className="flex gap-2">
        <button className={btn} onClick={() => settingUser("user-id-1")}>
          Alice
        </button>
        <button className={btn} onClick={() => settingUser("user-id-2")}>
          Bob
        </button>
      </div>
    );
}