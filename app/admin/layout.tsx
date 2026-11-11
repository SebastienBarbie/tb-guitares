import Link from "next/link";
import { requireAdmin } from "@/lib/supabase/admin";
import { signOut } from "./actions";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = await requireAdmin();
  return <div className="min-h-[75vh] bg-[#eeece6]">
    <div className="border-b border-black/10 bg-[#171715] text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5">
        <Link href="/admin" className="text-sm font-semibold tracking-[.2em]">TB <span className="font-normal text-[#d7b79d]">GUITARES</span><span className="ml-3 text-[10px] font-normal tracking-[.15em] text-white/50">ADMINISTRATION</span></Link>
        <div className="flex items-center gap-5 text-xs"><span className="hidden text-white/60 sm:inline">{user.email}</span><Link href="/" className="text-white/75 hover:text-white">Voir le site</Link><form action={signOut}><button className="border border-white/25 px-3 py-2 hover:bg-white hover:text-black">Déconnexion</button></form></div>
      </div>
    </div>
    <div className="mx-auto max-w-6xl px-6 py-10">{children}</div>
  </div>;
}
