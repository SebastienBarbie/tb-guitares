import Link from "next/link";
import { requireAdmin } from "@/lib/supabase/admin";
import { deleteGuitar } from "./actions";

type GuitarRow = { id: string; brand: string; name: string; price: number; status: string; type: string; slug: string };
export default async function AdminDashboard({ searchParams }: { searchParams: Promise<{ success?: string }> }) {
  const [{ supabase }, params] = await Promise.all([requireAdmin(), searchParams]);
  const { data, error } = await supabase.from("guitars").select("id,brand,name,price,status,type,slug").order("created_at", { ascending: false });
  const guitars = (data || []) as GuitarRow[];
  return <div>
    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="eyebrow">Espace privé</p><h1 className="display mt-2 text-5xl">Le catalogue</h1><p className="muted mt-3 text-sm">Gérez les instruments présentés sur le site.</p></div><Link href="/admin/guitares/nouvelle" className="button">＋ Ajouter une guitare</Link></div>
    {params.success && <p className="mt-6 bg-green-50 p-3 text-sm text-green-800">{params.success === "deleted" ? "Instrument supprimé." : "Modifications enregistrées."}</p>}
    {error && <p className="mt-6 bg-red-50 p-4 text-sm text-red-700">Erreur de lecture : {error.message}. Vérifiez que la migration SQL a été exécutée dans Supabase.</p>}
    <div className="mt-9 overflow-x-auto border border-black/10 bg-[#f8f7f3]">
      <table className="w-full min-w-[650px] text-left text-sm"><thead className="border-b border-black/10 text-[10px] uppercase tracking-widest text-[var(--muted)]"><tr><th className="px-5 py-4">Instrument</th><th className="px-5 py-4">Type</th><th className="px-5 py-4">Prix</th><th className="px-5 py-4">Statut</th><th className="px-5 py-4 text-right">Actions</th></tr></thead>
      <tbody>{guitars.map((g)=><tr key={g.id} className="border-b border-black/5 last:border-0"><td className="px-5 py-4"><span className="block text-xs text-[var(--muted)]">{g.brand}</span><strong className="font-medium">{g.name}</strong></td><td className="px-5 py-4">{g.type}</td><td className="px-5 py-4">{new Intl.NumberFormat("fr-FR",{style:"currency",currency:"EUR",maximumFractionDigits:0}).format(g.price)}</td><td className="px-5 py-4">{g.status}</td><td className="px-5 py-4"><div className="flex justify-end gap-4"><Link className="underline underline-offset-4" href={`/admin/guitares/${g.id}`}>Modifier</Link><form action={deleteGuitar}><input type="hidden" name="id" value={g.id}/><button className="text-red-700 underline underline-offset-4">Supprimer</button></form></div></td></tr>)}</tbody></table>
      {guitars.length === 0 && !error && <p className="p-10 text-center text-sm text-[var(--muted)]">Aucun instrument pour le moment. Ajoutez votre première guitare.</p>}
    </div>
    <p className="muted mt-4 text-xs">Les instruments enregistrés dans Supabase seront ensuite affichés dans le catalogue public.</p>
  </div>;
}
