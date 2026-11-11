# TB GUITARES

Site vitrine premium pour présenter des guitares électriques et acoustiques haut de gamme. Pas de panier ni de paiement en ligne.

## Démarrage local

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:3000.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS 4
- Supabase Auth + Postgres + Row Level Security
- Déploiement prévu sur Vercel

## Administration

Le back-office est accessible à `/admin`. Il permet de se connecter, lister les instruments, ajouter, modifier et supprimer des guitares, changer leur statut et renseigner leurs photos par URL HTTPS.

Pour activer l'administration et connecter le catalogue public, suivre impérativement le guide [README-admin.md](./README-admin.md) : créer le projet Supabase, exécuter la migration SQL, créer le compte Auth et l'inscrire dans `admin_users`, puis renseigner les deux variables Supabase dans `.env.local`.

## État et limites

- Sans configuration Supabase, le site public affiche les quatre guitares de démonstration.
- Avec Supabase configuré, le catalogue public lit les instruments de la table `guitars`.
- Le back-office est protégé par Supabase Auth et une liste d'administrateurs en base (RLS).
- Les images se renseignent actuellement avec des URLs HTTPS ; l'upload de fichiers depuis le formulaire admin reste à développer.
- Le formulaire de contact prépare actuellement un e-mail via `mailto:`. L'envoi serveur et la gestion des demandes dans l'admin restent à développer.
- Les images Unsplash et les instruments de démonstration sont provisoires : remplace-les par les vraies photos et données avant la mise en ligne.
