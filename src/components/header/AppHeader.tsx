import Link from "next/link";
import DesktopNav from "./DesktopNav";
import MobileMenu from "./MobileMenu";
import { getCookieInfo } from "@/lib/getCookieInfo";


export default  async function AppHeader() {
  const user_id = await getCookieInfo();
  let userName="Guest";
  if(user_id){
    userName = user_id==="user-id-1"? "Alice" : "Bob";
  }

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-3 text-xl font-extrabold tracking-tight text-slate-900"
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#4c2fce] text-white md:h-10 md:w-10">
            ✦
          </span>
          Gatherly
        </Link>

        <DesktopNav />

        <div className="flex-1 md:hidden" />

        <div className="hidden items-center gap-3 text-sm md:flex">
          <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700">
            DEMO
          </span>
          <span className="text-slate-500">
            Viewing as <b className="text-slate-900">{userName}</b> ▾
          </span>
        </div>
        {
        user_id&&
        <span className="grid h-10 w-10 place-items-center rounded-full bg-violet-100 font-bold text-violet-700">
          {userName[0]}
        </span>
        } 

        <MobileMenu>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-[#4c2fce]">
              DEMO
            </span>
            <span className="text-slate-500">
              Viewing as <b className="text-slate-900">{userName}</b>
            </span>
          </div>
        </MobileMenu>
      </div>
    </header>
  );
}
