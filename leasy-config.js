/* ============================================================
   LEASY — configuration de l'IA
   ------------------------------------------------------------
   Leasy passe par la Cloudflare Pages Function de Leasy Advanced :
     https://leasy-advanced.pages.dev/api/chat
   La clé Gemini reste côté serveur (secret Cloudflare).
   Le site public ne contient aucune clé.

   Pour changer de moteur :
   - provider: 'proxy'  + endpoint: 'https://.../api/chat'
   - provider: 'gemini' + key: '...' (clé visible : à éviter)
   - provider: 'none'   → mode local uniquement

   En cas de panne du service, Leasy répond automatiquement
   avec sa base locale (services, tarifs, contact, délais).
   ============================================================ */
window.LEASY_AI = {
  provider: 'proxy',
  key: '',
  model: 'leasy',
  endpoint: 'https://leasy-advanced.pages.dev/api/chat',
  timeout: 30000,
  maxHistory: 8
};
