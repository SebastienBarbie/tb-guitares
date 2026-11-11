# Administration TB GUITARES

## Ce qui est ajouté
- Connexion Supabase Auth à l'adresse `/admin/login`.
- Espace protégé `/admin`.
- Ajout, modification et suppression des instruments.
- Statuts Disponible / Réservée / Vendue.
- Champs descriptifs et galerie par URLs d'images.
- Migration SQL avec RLS : lecture publique du catalogue, écritures réservées aux administrateurs.

## Configuration obligatoire
1. Créer un projet sur https://supabase.com.
2. Dans Supabase > SQL Editor, exécuter le fichier `supabase/migrations/202611110001_create_guitars_admin.sql`.
3. Dans Authentication > Users, créer l'utilisateur administrateur (e-mail du père + mot de passe robuste).
4. Copier l'UUID de cet utilisateur et exécuter dans SQL Editor :
   `insert into public.admin_users (user_id) values ('UUID_DE_L_UTILISATEUR');`
5. Dans Supabase > Project Settings > API, récupérer Project URL et anon/public key.
6. Copier `.env.example` vers `.env.local`, puis renseigner :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
7. Redémarrer Next.js : `npm run dev`.

## Important
- Ne jamais mettre la clé `service_role` dans une variable `NEXT_PUBLIC_*` ni dans le navigateur. Elle n'est pas nécessaire pour cette version.
- Le formulaire d'images accepte des URLs HTTPS ; le bucket Supabase est créé par la migration pour préparer l'upload sécurisé.
- Cette version ne gère pas encore les demandes de contact dans le back-office ni l'upload de fichiers depuis l'interface.
- Le catalogue public existant utilise encore ses données de démonstration statiques : le branchement dynamique du catalogue sur Supabase est une étape suivante.
