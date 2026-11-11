"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

async function adminClient() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  const { data } = await supabase.from("admin_users").select("user_id").eq("user_id", user.id).maybeSingle();
  if (!data) throw new Error("Accès administrateur refusé.");
  return supabase;
}

export async function signIn(formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirect("/admin/login?error=credentials");
  const { data: { user } } = await supabase.auth.getUser();
  const { data: admin } = await supabase.from("admin_users").select("user_id").eq("user_id", user?.id ?? "").maybeSingle();
  if (!admin) {
    await supabase.auth.signOut();
    redirect("/admin/login?error=unauthorized");
  }
  redirect("/admin");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function saveGuitar(formData: FormData) {
  const supabase = await adminClient();
  const id = String(formData.get("id") || "");
  const brand = String(formData.get("brand") || "").trim();
  const name = String(formData.get("name") || "").trim();
  const type = String(formData.get("type") || "Électrique");
  const status = String(formData.get("status") || "Disponible");
  const slug = String(formData.get("slug") || "").trim();
  const price = Number(String(formData.get("price") || "0").replace(",", "."));
  const year = String(formData.get("year") || "").trim();
  const condition = String(formData.get("condition") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const details = String(formData.get("details") || "").split("\n").map((v) => v.trim()).filter(Boolean);
  const imageUrls = String(formData.get("image_urls") || "").split("\n").map((v) => v.trim()).filter((v) => /^https:\/\//i.test(v));
  if (!brand || !name || !slug || !Number.isFinite(price) || price < 0) throw new Error("Vérifiez le nom, la marque, le slug et le prix.");
  const payload = { brand, name, slug, type, status, price, year, condition, description, details, image_urls: imageUrls, image_url: imageUrls[0] || null };
  const result = id
    ? await supabase.from("guitars").update(payload).eq("id", id)
    : await supabase.from("guitars").insert(payload);
  if (result.error) throw new Error(result.error.message);
  revalidatePath("/");
  revalidatePath("/catalogue");
  revalidatePath("/admin");
  redirect("/admin?success=saved");
}

export async function deleteGuitar(formData: FormData) {
  const supabase = await adminClient();
  const id = String(formData.get("id") || "");
  const { error } = await supabase.from("guitars").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/catalogue");
  revalidatePath("/admin");
  redirect("/admin?success=deleted");
}
