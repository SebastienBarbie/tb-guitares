import Link from "next/link";
import { notFound } from "next/navigation";
import GuitarForm from "../form";
import { requireAdmin } from "@/lib/supabase/admin";
export default async function EditGuitar({ params }: { params: Promise<{ id: string }> }) {
  const [{ supabase }, { id }] = await Promise.all([requireAdmin(), params]);
  const { data, error } = await supabase.from("guitars").select("*").eq("id", id).maybeSingle();
  if (error || !data) notFound();
  return <><Link href="/admin" className="text-xs uppercase tracking-widest underline">← Retour au catalogue</Link><p className="eyebrow mt-9">Modifier l'instrument</p><h1 className="display mt-2 text-5xl">{data.brand} {data.name}</h1><GuitarForm guitar={data}/></>;
}
