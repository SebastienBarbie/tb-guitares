import { guitars as demoGuitars, type Guitar } from "@/lib/guitars";
import { createClient } from "@/lib/supabase/server";

type DbGuitar = { slug:string; brand:string; name:string; type:string; price:number|string; year:string|null; condition:string|null; status:Guitar["status"]; image_url:string|null; image_urls:string[]|null; description:string|null; details:string[]|null };
function mapGuitar(row: DbGuitar): Guitar {
  const amount = Number(row.price);
  return { slug:row.slug, brand:row.brand, name:row.name, type:row.type, price:new Intl.NumberFormat("fr-FR",{style:"currency",currency:"EUR",maximumFractionDigits:0}).format(amount), year:row.year || "—", condition:row.condition || "—", status:row.status, image:row.image_urls?.[0] || row.image_url || "/placeholder-guitar.jpg", description:row.description || "", details:row.details || [] };
}
export async function getGuitars(): Promise<Guitar[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) return demoGuitars;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("guitars").select("slug,brand,name,type,price,year,condition,status,image_url,image_urls,description,details").order("created_at",{ascending:false});
    if (error) return demoGuitars;
    return (data as DbGuitar[]).map(mapGuitar);
  } catch { return demoGuitars; }
}
export async function getGuitarBySlug(slug:string): Promise<Guitar | undefined> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) return demoGuitars.find((g)=>g.slug===slug);
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("guitars").select("slug,brand,name,type,price,year,condition,status,image_url,image_urls,description,details").eq("slug",slug).maybeSingle();
    if (error) return demoGuitars.find((g)=>g.slug===slug);
    return data ? mapGuitar(data as DbGuitar) : undefined;
  } catch { return demoGuitars.find((g)=>g.slug===slug); }
}
