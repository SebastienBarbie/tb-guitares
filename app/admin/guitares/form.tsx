import { saveGuitar } from "../actions";

type Guitar = { id?: string; brand?: string; name?: string; slug?: string; type?: string; price?: number; year?: string; condition?: string; status?: string; description?: string; details?: string[]; image_urls?: string[] };
export default function GuitarForm({ guitar }: { guitar?: Guitar }) {
  return <form action={saveGuitar} className="mt-8 grid gap-6 bg-[#f8f7f3] p-6 sm:grid-cols-2 sm:p-9">
    {guitar?.id && <input type="hidden" name="id" value={guitar.id}/>}
    <label className="text-xs uppercase tracking-widest">Marque *<input required name="brand" defaultValue={guitar?.brand} placeholder="Fender, Gibson, Martin…" className="admin-input"/></label>
    <label className="text-xs uppercase tracking-widest">Nom du modèle *<input required name="name" defaultValue={guitar?.name} placeholder="Stratocaster Custom Shop…" className="admin-input"/></label>
    <label className="text-xs uppercase tracking-widest">Slug URL *<input required name="slug" defaultValue={guitar?.slug} placeholder="fender-stratocaster-1963" className="admin-input"/></label>
    <label className="text-xs uppercase tracking-widest">Type<select name="type" defaultValue={guitar?.type || "Électrique"} className="admin-input"><option>Électrique</option><option>Acoustique</option><option>Classique</option><option>Basse</option><option>Autre</option></select></label>
    <label className="text-xs uppercase tracking-widest">Prix (€) *<input required min="0" step="0.01" type="number" name="price" defaultValue={guitar?.price ?? ""} className="admin-input"/></label>
    <label className="text-xs uppercase tracking-widest">Année<input name="year" defaultValue={guitar?.year} placeholder="2022" className="admin-input"/></label>
    <label className="text-xs uppercase tracking-widest">État<input name="condition" defaultValue={guitar?.condition} placeholder="Excellent état" className="admin-input"/></label>
    <label className="text-xs uppercase tracking-widest">Disponibilité<select name="status" defaultValue={guitar?.status || "Disponible"} className="admin-input"><option>Disponible</option><option>Réservée</option><option>Vendue</option></select></label>
    <label className="text-xs uppercase tracking-widest sm:col-span-2">Description<textarea name="description" rows={4} defaultValue={guitar?.description} className="admin-input"/></label>
    <label className="text-xs uppercase tracking-widest sm:col-span-2">Caractéristiques <span className="normal-case tracking-normal text-[var(--muted)]">(une par ligne)</span><textarea name="details" rows={4} defaultValue={guitar?.details?.join("\n")} placeholder={"Corps acajou\nTable érable\nÉtui rigide inclus"} className="admin-input"/></label>
    <label className="text-xs uppercase tracking-widest sm:col-span-2">Photos — URL des images <span className="normal-case tracking-normal text-[var(--muted)]">(une URL https par ligne, première image = couverture)</span><textarea name="image_urls" rows={4} defaultValue={guitar?.image_urls?.join("\n")} placeholder="https://…" className="admin-input"/></label>
    <div className="sm:col-span-2"><button className="button">Enregistrer l'instrument</button></div>
  </form>;
}
