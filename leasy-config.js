/* ============================================================
   LEASY — configuration de l'IA
   ------------------------------------------------------------
   1) MODE IA (recommandé)
      - Créez une clé gratuite : https://aistudio.google.com/apikey
      - Restreignez-la à votre site dans Google Cloud :
        Identifiants > votre clé > Restrictions > Sites web
        (ajoutez https://lionelewene7-star.github.io)
      - Collez la clé ci-dessous, puis poussez le fichier.
      Modèle conseillé : gemini-2.5-flash

   2) MODE LOCAL (aucune clé)
      - Laissez key vide : Leasy utilise sa base intégrée.

   3) PROXY SÉCURISÉ (clé cachée côté serveur)
      - provider: 'proxy'
      - endpoint: 'https://votre-worker.workers.dev/chat'
      - key: '' (la clé reste dans le Worker Cloudflare)

   La clé est visible dans le code source : la restriction par
   site web est indispensable. Pour une sécurité totale, utilisez
   un proxy (option 3).
   ============================================================ */
window.LEASY_AI = {
  provider: 'gemini',
  key: '',
  model: 'gemini-2.5-flash',
  endpoint: '',
  timeout: 18000,
  maxHistory: 8
};
