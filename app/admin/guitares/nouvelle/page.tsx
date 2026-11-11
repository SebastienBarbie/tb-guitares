import Link from "next/link";
import GuitarForm from "../form";
import { requireAdmin } from "@/lib/supabase/admin";
export default async function NewGuitar() { await requireAdmin(); return <><Link href="/admin" className="text-xs uppercase tracking-widest underline">← Retour au catalogue</Link><p className="eyebrow mt-9">Nouvel instrument</p><h1 className="display mt-2 text-5xl">Ajouter une guitare</h1><GuitarForm/></>; }
