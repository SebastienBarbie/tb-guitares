import { signIn } from "../actions";
import Link from "next/link";

export default async function AdminLogin({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return <main className="flex min-h-[75vh] items-center justify-center bg-[#eeece6] px-6 py-16">
    <div className="w-full max-w-md bg-[#f8f7f3] p-8 shadow-sm sm:p-12">
      <Link href="/" className="text-xs uppercase tracking-[.2em] text-[#a66b42]">← Retour au site</Link>
      <p className="eyebrow mt-10">Espace privé</p><h1 className="display mt-3 text-5xl">Administration</h1>
      <p className="muted mt-4 text-sm leading-6">Connectez-vous pour gérer le catalogue TB GUITARES.</p>
      {error && <p className="mt-5 bg-red-50 p-3 text-xs text-red-700">{error === "unauthorized" ? "Ce compte n'a pas les droits administrateur." : "Identifiants incorrects. Réessayez."}</p>}
      <form action={signIn} className="mt-8 space-y-5">
        <label className="block text-xs uppercase tracking-widest">E-mail<input required name="email" type="email" autoComplete="username" className="mt-2 w-full border border-[var(--line)] bg-white px-4 py-3 normal-case tracking-normal outline-none focus:border-[#a66b42]"/></label>
        <label className="block text-xs uppercase tracking-widest">Mot de passe<input required name="password" type="password" autoComplete="current-password" className="mt-2 w-full border border-[var(--line)] bg-white px-4 py-3 normal-case tracking-normal outline-none focus:border-[#a66b42]"/></label>
        <button className="button w-full">Se connecter</button>
      </form>
    </div>
  </main>;
}
