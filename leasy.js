/* ============================================================
   LEASY — assistant du studio ONYX
   - Réponses bilingues FR / EN (selon <html lang>)
   - Voix : reconnaissance vocale + synthèse vocale
   - Aucune dépendance, aucun serveur, aucune donnée envoyée
   ============================================================ */
(function () {
  'use strict';

  if (window.__leasyLoaded) return;
  window.__leasyLoaded = true;

  var LANG = (document.documentElement.lang || 'fr').toLowerCase().indexOf('en') === 0 ? 'en' : 'fr';
  var PHONE = '243852867852';
  var EMAIL = 'lionelewene7@gmail.com';

  /* ---------- Textes d'interface ---------- */
  var UI = {
    fr: {
      open: 'Parler à Leasy',
      title: 'Leasy',
      subtitle: 'Assistant ONYX · en ligne',
      placeholder: 'Écrivez ou parlez…',
      send: 'Envoyer',
      mic: 'Parler à Leasy',
      voiceOn: 'Couper la voix',
      voiceOff: 'Activer la voix',
      close: 'Fermer',
      listening: 'Je vous écoute… parlez maintenant.',
      note: 'Leasy est l\'assistant automatique d\'ONYX. Pour un devis précis, Lionel vous répond sur WhatsApp.',
      chips: ['Services', 'Tarifs', 'Portfolio', 'WhatsApp'],
      welcome: 'Bonjour 👋 Je suis Leasy, l\'assistant du studio ONYX.\nJe peux vous renseigner sur les services, les délais, les tarifs ou le portfolio — et vous mettre en contact avec Lionel.',
      hint: 'Astuce : appuyez sur le micro pour me parler 🎙️',
      micDenied: 'L\'accès au micro est bloqué. Autorisez le microphone dans votre navigateur, ou écrivez simplement votre message.',
      micError: 'Je n\'ai pas pu démarrer le micro. Réessayez, ou écrivez votre message.',
      waBtn: 'WhatsApp',
      emailBtn: 'Email',
      portfolioBtn: 'Voir le portfolio',
      projectsBtn: 'Voir les projets',
      servicesBtn: 'Voir les services',
      contactBtn: 'Aller au contact',
      quote: 'Demander un devis'
    },
    en: {
      open: 'Talk to Leasy',
      title: 'Leasy',
      subtitle: 'ONYX assistant · online',
      placeholder: 'Type or speak…',
      send: 'Send',
      mic: 'Talk to Leasy',
      voiceOn: 'Mute voice',
      voiceOff: 'Enable voice',
      close: 'Close',
      listening: 'I\'m listening… speak now.',
      note: 'Leasy is ONYX\'s automatic assistant. For an exact quote, Lionel replies on WhatsApp.',
      chips: ['Services', 'Pricing', 'Portfolio', 'WhatsApp'],
      welcome: 'Hi 👋 I\'m Leasy, the ONYX studio assistant.\nI can tell you about services, timelines, pricing or the portfolio — and connect you with Lionel.',
      hint: 'Tip: tap the mic to talk to me 🎙️',
      micDenied: 'Microphone access is blocked. Allow the microphone in your browser, or just type your message.',
      micError: 'I couldn\'t start the microphone. Try again, or type your message.',
      waBtn: 'WhatsApp',
      emailBtn: 'Email',
      portfolioBtn: 'View portfolio',
      projectsBtn: 'See projects',
      servicesBtn: 'See services',
      contactBtn: 'Go to contact',
      quote: 'Request a quote'
    }
  }[LANG];

  /* ---------- Base de connaissances ---------- */
  var KB = [
    {
      id: 'human',
      kw: ['parler a lionel', 'parler a un humain', 'vrai personne', 'une personne', 'humain', 'un agent', 'quelqu un', 'human', 'real person', 'speak to lionel', 'talk to lionel', 'someone real', 'an agent'],
      fr: { text: 'Bien sûr. Le plus rapide : WhatsApp au +243 85 28 67 852 — c\'est Lionel qui répond directement.\nVous pouvez aussi m\'écrire votre demande ici : je la lui transmets.', actions: ['wa', 'email'] },
      en: { text: 'Of course. Fastest is WhatsApp on +243 85 28 67 852 — Lionel answers personally.\nYou can also tell me your request here and I\'ll pass it on.', actions: ['wa', 'email'] }
    },
    {
      id: 'identity',
      kw: ['qui es tu', 'tu es qui', 'ton nom', 'tu es une ia', 'une ia', 'ia', 'bot', 'assistant', 'intelligence artificielle', 'robot', 'chatbot', 'who are you', 'what are you', 'your name', 'are you human', 'are you a bot', 'are you ai'],
      fr: { text: 'Je suis Leasy, l\'assistant virtuel du studio ONYX. Je réponds instantanément aux questions courantes et je peux vous mettre en relation avec Lionel pour un devis.\nJe ne suis pas une personne — mais je connais bien le studio 🙂', actions: ['wa'] },
      en: { text: 'I\'m Leasy, the ONYX studio\'s virtual assistant. I answer common questions instantly and can connect you with Lionel for a quote.\nI\'m not a person — but I know the studio well 🙂', actions: ['wa'] }
    },
    {
      id: 'price',
      kw: ['prix', 'tarif', 'tarifs', 'combien', 'coute', 'cout', 'budget', 'devis', 'price', 'pricing', 'cost', 'how much', 'quote', 'rates'],
      boost: { words: ['combien', 'coute', 'cout', 'prix', 'tarif', 'devis', 'budget', 'price', 'pricing', 'cost', 'how much'], add: 2 },
      fr: { text: 'Chaque projet est chiffré sur mesure : tout dépend du nombre de pages, des fonctionnalités et du niveau de design.\nEnvoyez-moi 2 ou 3 lignes sur votre projet : vous recevrez un devis gratuit, sans engagement, sous 24 h.', actions: ['wa', 'email'] },
      en: { text: 'Every project is quoted individually: it depends on the number of pages, features and design depth.\nSend me 2–3 lines about your project and you\'ll get a free, no-commitment quote within 24 hours.', actions: ['wa', 'email'] }
    },
    {
      id: 'delay',
      kw: ['delai', 'delais', 'duree', 'combien de temps', 'quand', 'rapide', 'deadline', 'how long', 'timeframe', 'when can', 'delay'],
      boost: { words: ['combien de temps', 'how long', 'delai', 'deadline', 'duree'], add: 3 },
      fr: { text: 'Les délais dépendent du périmètre. En général, un site vitrine se compte en semaines ; une application ou un logiciel en quelques semaines à quelques mois.\nAprès le brief, Lionel vous donne un planning précis, avec des étapes claires.', actions: ['wa'] },
      en: { text: 'Timelines depend on scope. As a rule, a showcase site is a matter of weeks; an app or custom software takes a few weeks to a few months.\nAfter the brief, Lionel gives you a precise schedule with clear milestones.', actions: ['wa'] }
    },
    {
      id: 'process',
      kw: ['methode', 'process', 'etapes', 'comment ca se passe', 'comment cela se passe', 'deroulement', 'comment travaillez', 'how do you work', 'steps', 'how does it work', 'workflow'],
      fr: { text: 'La méthode ONYX tient en 4 temps :\n1. Découverte — on écoute, on cadre, on clarifie.\n2. Direction — structure, wireframes et parti pris visuel.\n3. Création — design, développement, itérations.\n4. Livraison — mise en ligne, documentation et suivi.', actions: ['wa'] },
      en: { text: 'The ONYX method has 4 steps:\n1. Discovery — we listen, frame and clarify.\n2. Direction — structure, wireframes and visual direction.\n3. Creation — design, development, iterations.\n4. Delivery — launch, documentation and follow-up.', actions: ['wa'] }
    },
    {
      id: 'portfolio',
      kw: ['portfolio', 'projet', 'projets', 'realisation', 'realisations', 'exemple', 'exemples', 'travaux', 'reference', 'references', 'work', 'projects', 'examples', 'case study'],
      fr: { text: 'Trois projets récents : une plateforme e-commerce (React/Node), une application de livraison avec suivi en temps réel (React Native/Firebase) et une campagne visuelle (affiches et invitations).\nLa page portfolio détaille chaque projet.', actions: ['portfolio', 'wa'] },
      en: { text: 'Three recent projects: an e-commerce platform (React/Node), a delivery app with real-time tracking (React Native/Firebase) and a visual campaign (posters and invitations).\nThe portfolio page covers each one.', actions: ['portfolio', 'wa'] }
    },
    {
      id: 'web',
      kw: ['site', 'site web', 'site internet', 'vitrine', 'ecommerce', 'e-commerce', 'boutique', 'wordpress', 'website', 'web site', 'online store', 'shop', 'landing page'],
      fr: { text: 'Sites vitrines, e-commerce et plateformes sur mesure : rapides, responsives et optimisés pour Google.\nOn part de votre besoin, puis Lionel propose une structure et un design avant de développer. Vous voulez voir des exemples ?', actions: ['portfolio', 'wa'] },
      en: { text: 'Showcase sites, e-commerce and custom platforms: fast, responsive and SEO-ready.\nWe start from your needs, then Lionel proposes a structure and a design before building. Want to see examples?', actions: ['portfolio', 'wa'] }
    },
    {
      id: 'app',
      kw: ['application', 'appli', 'mobile', 'android', 'ios', 'iphone', 'react native', 'mobile app', 'app'],
      fr: { text: 'Applications iOS et Android, natives ou cross-platform (React Native), avec une expérience soignée : comptes, paiement, notifications, suivi en temps réel…\nDécrivez votre idée : je vous dis comment on peut la cadrer.', actions: ['wa'] },
      en: { text: 'iOS and Android apps, native or cross-platform (React Native), with a polished experience: accounts, payments, notifications, real-time tracking…\nDescribe your idea and I\'ll tell you how we can frame it.', actions: ['wa'] }
    },
    {
      id: 'software',
      kw: ['logiciel', 'logiciels', 'desktop', 'metier', 'erp', 'crm', 'gestion', 'software', 'custom software', 'business tool', 'dashboard'],
      fr: { text: 'Logiciels desktop et outils métier sur mesure : gestion de stock, facturation, CRM, tableaux de bord…\nOn adapte l\'outil à vos processus, pas l\'inverse.', actions: ['wa'] },
      en: { text: 'Desktop software and custom business tools: inventory, invoicing, CRM, dashboards…\nWe adapt the tool to your process, not the other way around.', actions: ['wa'] }
    },
    {
      id: 'design',
      kw: ['design', 'ui', 'ux', 'maquette', 'figma', 'interface', 'prototype', 'ui ux', 'web design', 'mockup', 'adobe xd'],
      fr: { text: 'Design UI/UX : interfaces intuitives, parcours utilisateurs fluides et prototypes interactifs (Figma).\nLe but : que vos clients trouvent ce qu\'ils cherchent en un geste.', actions: ['portfolio'] },
      en: { text: 'UI/UX design: intuitive interfaces, smooth user journeys and interactive prototypes (Figma).\nThe goal: your customers find what they need in one gesture.', actions: ['portfolio'] }
    },
    {
      id: 'branding',
      kw: ['logo', 'logos', 'identite', 'identite visuelle', 'branding', 'charte', 'marque', 'brand', 'identity', 'visual identity', 'chart'],
      fr: { text: 'Identité visuelle : logo, charte graphique, couleurs, typographies et déclinaisons.\nUne marque cohérente et mémorable, du premier regard au dernier support.', actions: ['portfolio', 'wa'] },
      en: { text: 'Visual identity: logo, brand guidelines, colours, typography and variations.\nA coherent, memorable brand — from first glance to the last touchpoint.', actions: ['portfolio', 'wa'] }
    },
    {
      id: 'print',
      kw: ['affiche', 'affiches', 'invitation', 'invitations', 'flyer', 'flyers', 'carte', 'cartes', 'print', 'impression', 'poster', 'posters', 'printing', 'banner'],
      fr: { text: 'Affiches, invitations, flyers et supports imprimés : conception soignée et fichiers prêts pour l\'impression.\nMariages, événements, entreprises — dites-moi le format et le message.', actions: ['portfolio', 'wa'] },
      en: { text: 'Posters, invitations, flyers and print materials: careful design and print-ready files.\nWeddings, events, companies — tell me the format and the message.', actions: ['portfolio', 'wa'] }
    },
    {
      id: 'services',
      kw: ['service', 'services', 'prestation', 'prestations', 'offre', 'offres', 'que faites', 'que fais tu', 'quoi', 'propose', 'proposez', 'what do you do', 'offer', 'what can you do'],
      fr: { text: 'ONYX propose 6 services :\n• Sites web (vitrine, e-commerce)\n• Applications mobiles (iOS / Android)\n• Logiciels sur mesure\n• Design UI/UX\n• Identité visuelle (logo, charte)\n• Print (affiches, invitations)\nDites-moi lequel vous intéresse, je vous détaille tout.', actions: ['services', 'wa'] },
      en: { text: 'ONYX offers 6 services:\n• Websites (showcase, e-commerce)\n• Mobile apps (iOS / Android)\n• Custom software\n• UI/UX design\n• Visual identity (logo, guidelines)\n• Print (posters, invitations)\nTell me which one interests you and I\'ll explain.', actions: ['services', 'wa'] }
    },
    {
      id: 'contact',
      kw: ['contact', 'whatsapp', 'numero', 'telephone', 'tel', 'email', 'mail', 'joindre', 'appeler', 'ecrire', 'contact you', 'phone', 'reach you', 'get in touch'],
      fr: { text: 'Le plus direct : WhatsApp au +243 85 28 67 852 — réponse généralement en moins de 24 h.\nSinon : lionelewene7@gmail.com. Vous pouvez aussi m\'écrire ici, je transmets.', actions: ['wa', 'email'] },
      en: { text: 'Fastest: WhatsApp on +243 85 28 67 852 — usually a reply within 24 hours.\nOr email: lionelewene7@gmail.com. You can also write here and I\'ll pass it on.', actions: ['wa', 'email'] }
    },
    {
      id: 'location',
      kw: ['ou etes', 'ou est', 'localisation', 'pays', 'kinshasa', 'congo', 'rdc', 'distance', 'a distance', 'travaillez a distance', 'etranger', 'remote', 'remotely', 'work remotely', 'where are you', 'location', 'country', 'abroad', 'based'],
      fr: { text: 'Le studio est basé en République Démocratique du Congo et travaille à distance avec des clients partout dans le monde.\nTout se fait en ligne : brief, maquettes, validations, livraison.', actions: ['wa'] },
      en: { text: 'The studio is based in the Democratic Republic of the Congo and works remotely with clients worldwide.\nEverything happens online: brief, mockups, approvals, delivery.', actions: ['wa'] }
    },
    {
      id: 'about',
      kw: ['qui est lionel', 'fondateur', 'onyx', 'studio', 'histoire', 'experience', 'depuis quand', 'qui etes', 'about', 'founder', 'history', 'who is lionel'],
      fr: { text: 'ONYX est un studio créatif digital fondé en 2022 par Lionel Ewene Monzia, développeur web & designer UI/UX.\nUn interlocuteur unique, de la première esquisse à la mise en ligne.', actions: ['portfolio'] },
      en: { text: 'ONYX is a digital creative studio founded in 2022 by Lionel Ewene Monzia, web developer & UI/UX designer.\nOne single contact, from the first sketch to launch.', actions: ['portfolio'] }
    },
    {
      id: 'skills',
      kw: ['competence', 'competences', 'techno', 'technologies', 'stack', 'react', 'node', 'python', 'outils', 'skills', 'tools', 'javascript', 'figma'],
      fr: { text: 'Côté technique : HTML/CSS, JavaScript/TypeScript, React & React Native, Node.js, Python.\nCôté design : Figma, Adobe XD, Photoshop, Illustrator — avec une spécialité print (affiches, invitations).', actions: ['portfolio'] },
      en: { text: 'Technical: HTML/CSS, JavaScript/TypeScript, React & React Native, Node.js, Python.\nDesign: Figma, Adobe XD, Photoshop, Illustrator — with a print speciality (posters, invitations).', actions: ['portfolio'] }
    },
    {
      id: 'payment',
      kw: ['paiement', 'payer', 'mobile money', 'mpesa', 'orange money', 'virement', 'acompte', 'cash', 'payment', 'pay', 'deposit', 'transfer', 'installment'],
      fr: { text: 'Les modalités sont convenues au démarrage, généralement un acompte puis le solde à la livraison.\nDemandez les options disponibles (mobile money, virement…) sur WhatsApp.', actions: ['wa'] },
      en: { text: 'Terms are agreed at kick-off, usually a deposit then the balance on delivery.\nAsk about available options (mobile money, bank transfer…) on WhatsApp.', actions: ['wa'] }
    },
    {
      id: 'maintenance',
      kw: ['maintenance', 'suivi', 'apres', 'hebergement', 'domaine', 'mise a jour', 'bug', 'support', 'hosting', 'domain', 'update'],
      fr: { text: 'Après la livraison, un suivi est prévu. On peut aussi prendre en charge l\'hébergement, le nom de domaine et les mises à jour.\nDites-moi ce dont vous avez besoin.', actions: ['wa'] },
      en: { text: 'After delivery, follow-up is included. We can also handle hosting, domain name and updates.\nTell me what you need.', actions: ['wa'] }
    },
    {
      id: 'availability',
      kw: ['disponible', 'dispo', 'libre', 'commencer', 'demarrer', 'quand peut', 'availability', 'available', 'start', 'free', 'book'],
      fr: { text: 'Oui, le studio est disponible pour de nouveaux projets en 2026.\nLe plus simple : expliquez-moi votre idée en deux lignes, et Lionel revient vers vous rapidement.', actions: ['wa'] },
      en: { text: 'Yes, the studio is available for new projects in 2026.\nSimplest: tell me your idea in two lines and Lionel will get back to you quickly.', actions: ['wa'] }
    },
    {
      id: 'thanks',
      kw: ['merci', 'thanks', 'thank you', 'super', 'top', 'parfait', 'nickel', 'great', 'awesome'],
      fr: { text: 'Avec plaisir 🙌\nSi vous voulez avancer, je peux vous mettre en contact direct avec Lionel sur WhatsApp.', actions: ['wa'] },
      en: { text: 'You\'re welcome 🙌\nIf you\'d like to move forward, I can connect you directly with Lionel on WhatsApp.', actions: ['wa'] }
    },
    {
      id: 'bye',
      kw: ['au revoir', 'bye', 'a plus', 'bonne journee', 'bonne soiree', 'goodbye', 'see you', 'good night'],
      fr: { text: 'À bientôt ! Je reste disponible ici si vous avez une question. 👋', actions: [] },
      en: { text: 'See you soon! I\'ll be here if you have any questions. 👋', actions: [] }
    },
    {
      id: 'lang',
      kw: ['english', 'anglais', 'francais', 'french', 'langue', 'language', 'parlez vous', 'do you speak'],
      fr: { text: 'Je parle français et anglais.\nVous pouvez continuer en français, ou passer à la version anglaise du site via le menu.', actions: [] },
      en: { text: 'I speak French and English.\nYou can keep chatting in English, or switch to the French version via the menu.', actions: [] }
    },
    {
      id: 'greet',
      kw: ['bonjour', 'salut', 'bonsoir', 'coucou', 'hello', 'hi', 'hey', 'yo', 'bonne journée'],
      fr: { text: 'Bonjour 👋 Ravi de vous accueillir chez ONYX.\nVous cherchez un site, une application, un logo, ou juste des informations ?', actions: [] },
      en: { text: 'Hello 👋 Welcome to ONYX.\nAre you looking for a website, an app, a logo — or just some information?', actions: [] }
    }
  ];

  var FALLBACK = {
    fr: { text: 'Je n\'ai pas tout compris, mais je peux vous aider sur : les services, les délais, les tarifs, le portfolio ou le contact.\nReformulez votre question, ou passez directement sur WhatsApp — Lionel répond en moins de 24 h.', actions: ['wa', 'contact'] },
    en: { text: 'I didn\'t quite catch that, but I can help with: services, timelines, pricing, portfolio or contact.\nRephrase your question, or reach out on WhatsApp — Lionel replies within 24 hours.', actions: ['wa', 'contact'] }
  };

  /* ---------- Normalisation + score ---------- */
  function norm(s) {
    return (s || '').toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ').trim();
  }

  function brain(raw) {
    var text = norm(raw);
    if (!text) return FALLBACK[LANG];
    var best = null, bestScore = 0;
    for (var i = 0; i < KB.length; i++) {
      var intent = KB[i], score = 0;
      for (var j = 0; j < intent.kw.length; j++) {
        var k = intent.kw[j];
        if (k.indexOf(' ') >= 0) {
          if (text.indexOf(k) >= 0) score += 3;
        } else {
          var toks = text.split(' ');
          var hit = false;
          for (var t = 0; t < toks.length; t++) {
            if (k.length >= 4 ? toks[t].indexOf(k) === 0 : toks[t] === k) { hit = true; break; }
          }
          if (hit) score += 2;
        }
      }
      if (intent.boost) {
        for (var b = 0; b < intent.boost.words.length; b++) {
          if (text.indexOf(intent.boost.words[b]) >= 0) { score += intent.boost.add; break; }
        }
      }
      if (score > bestScore) { bestScore = score; best = intent; }
    }
    if (!best || bestScore < 2) return FALLBACK[LANG];
    return best[LANG] || FALLBACK[LANG];
  }

  /* ---------- Liens ---------- */
  function lastUserMessage() {
    for (var i = history.length - 1; i >= 0; i--) {
      if (history[i].role === 'user') return history[i].text;
    }
    return '';
  }

  function waLink() {
    var ctx = lastUserMessage();
    var base = LANG === 'en'
      ? 'Hello Lionel, I\'m contacting you from your website (via Leasy).'
      : 'Bonjour Lionel, je vous contacte depuis votre site (via Leasy).';
    var tail = ctx
      ? '\n\n' + (LANG === 'en' ? 'My request: ' : 'Ma demande : ') + '"' + ctx.slice(0, 240) + '"'
      : '';
    return 'https://wa.me/' + PHONE + '?text=' + encodeURIComponent(base + tail);
  }

  /* ---------- Icônes ---------- */
  var I = {
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.5 8.9 8.9 0 0 1-3.8-.9L3 21l1.9-5.7A8.5 8.5 0 1 1 21 11.5z"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>',
    send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7z"/></svg>',
    mic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10v1a7 7 0 0 0 14 0v-1M12 18v4M8 22h8"/></svg>',
    volume: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/></svg>',
    mute: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4z"/><path d="m16 9 5 6M21 9l-5 6"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.4 2.1L8.1 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.6 2z"/></svg>'
  };

  /* ---------- Construction de l'interface ---------- */
  var root = document.createElement('div');
  root.className = 'leasy';
  root.setAttribute('data-lang', LANG);
  root.innerHTML =
    '<button class="leasy-launcher" type="button" aria-label="' + UI.open + '" aria-expanded="false" aria-controls="leasy-panel">' +
      '<span class="leasy-launcher-label">' + UI.open + '</span>' +
      '<span class="leasy-ia" aria-hidden="true">' + (LANG === 'en' ? 'AI' : 'IA') + '</span>' +
      '<span class="leasy-dot" aria-hidden="true"></span>' +
    '</button>' +
    '<section id="leasy-panel" class="leasy-panel" role="dialog" aria-modal="false" aria-label="Leasy — ' + UI.subtitle + '" aria-hidden="true">' +
      '<header class="leasy-head">' +
        '<span class="leasy-avatar" aria-hidden="true">L</span>' +
        '<div class="leasy-id"><strong>' + UI.title + '</strong><span class="leasy-status"><i></i>' + UI.subtitle + '</span></div>' +
        '<button class="leasy-voice" type="button" aria-pressed="false" aria-label="' + UI.voiceOff + '" title="' + UI.voiceOff + '">' + I.mute + '</button>' +
        '<button class="leasy-close" type="button" aria-label="' + UI.close + '" title="' + UI.close + '">' + I.close + '</button>' +
      '</header>' +
      '<div class="leasy-log" role="log" aria-live="polite" aria-relevant="additions"></div>' +
      '<div class="leasy-listening-hint" aria-hidden="true">' + UI.listening + '</div>' +
      '<div class="leasy-chips"></div>' +
      '<form class="leasy-form" autocomplete="off">' +
        '<button class="leasy-mic" type="button" aria-label="' + UI.mic + '" title="' + UI.mic + '">' + I.mic + '</button>' +
        '<input class="leasy-input" type="text" inputmode="text" enterkeyhint="send" placeholder="' + UI.placeholder + '" aria-label="' + UI.placeholder + '" maxlength="500">' +
        '<button class="leasy-send" type="submit" aria-label="' + UI.send + '" title="' + UI.send + '">' + I.send + '</button>' +
      '</form>' +
      '<p class="leasy-note">' + UI.note + '</p>' +
    '</section>';
  document.body.appendChild(root);

  var launcher = root.querySelector('.leasy-launcher');
  var panel = root.querySelector('.leasy-panel');
  var log = root.querySelector('.leasy-log');
  var form = root.querySelector('.leasy-form');
  var input = root.querySelector('.leasy-input');
  var sendBtn = root.querySelector('.leasy-send');
  var micBtn = root.querySelector('.leasy-mic');
  var voiceBtn = root.querySelector('.leasy-voice');
  var closeBtn = root.querySelector('.leasy-close');
  var chipsBox = root.querySelector('.leasy-chips');

  /* ---------- Historique ---------- */
  var history = [];
  var greeted = false;
  var pending = 0;

  function scrollLog() {
    log.scrollTop = log.scrollHeight;
  }

  function addMsg(role, text, actions) {
    history.push({ role: role, text: text });
    if (history.length > 30) history.shift();

    var wrap = document.createElement('div');
    wrap.className = 'leasy-msg ' + role;

    var bubble = document.createElement('div');
    bubble.className = 'leasy-bubble';
    bubble.textContent = text;
    wrap.appendChild(bubble);

    if (actions && actions.length) {
      var row = document.createElement('div');
      row.className = 'leasy-actions';
      actions.forEach(function (id) {
        var a = buildAction(id);
        if (a) row.appendChild(a);
      });
      if (row.children.length) wrap.appendChild(row);
    }

    log.appendChild(wrap);
    scrollLog();
    return wrap;
  }

  function buildAction(id) {
    var label, href = null, target = null, scroll = null, icon = I.arrow;

    if (id === 'wa') { label = UI.waBtn; href = waLink(); target = '_blank'; icon = I.phone; }
    else if (id === 'email') { label = UI.emailBtn; href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(LANG === 'en' ? 'Project enquiry from the website' : 'Demande de projet depuis le site'); }
    else if (id === 'portfolio') { label = UI.portfolioBtn; href = 'portfolio.html'; }
    else if (id === 'services') { label = UI.servicesBtn; scroll = '#services'; }
    else if (id === 'projects') { label = UI.projectsBtn; scroll = '#projects'; }
    else if (id === 'contact') { label = UI.contactBtn; scroll = '#contact'; }
    else if (id === 'quote') { label = UI.quote; href = waLink(); target = '_blank'; icon = I.phone; }
    else return null;

    var el;
    if (scroll) {
      el = document.createElement('button');
      el.type = 'button';
      el.addEventListener('click', function () { goTo(scroll); });
    } else {
      el = document.createElement('a');
      el.href = href;
      if (target) { el.target = target; el.rel = 'noopener'; }
    }
    el.className = 'leasy-action';
    el.innerHTML = icon + '<span>' + label + '</span>';
    return el;
  }

  function goTo(sel) {
    var target = document.querySelector(sel);
    if (!target && sel === '#projects') target = document.querySelector('#portfolio');
    if (target) {
      var top = target.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
      if (window.innerWidth <= 600) closePanel();
    } else {
      window.location.href = 'portfolio.html' + (sel === '#projects' ? '#projects' : '');
    }
  }

  function showTyping() {
    var wrap = document.createElement('div');
    wrap.className = 'leasy-msg bot';
    wrap.setAttribute('data-typing', '1');
    wrap.innerHTML = '<div class="leasy-typing" aria-hidden="true"><i></i><i></i><i></i></div>';
    log.appendChild(wrap);
    scrollLog();
    return wrap;
  }

  function removeTyping(el) {
    if (el && el.parentNode) el.parentNode.removeChild(el);
  }

  function reply(text) {
    pending++;
    var typing = showTyping();
    var delay = 380 + Math.min(700, text.length * 5);
    window.setTimeout(function () {
      pending--;
      if (pending === 0) removeTyping(typing);
      var res = brain(text);
      addMsg('bot', res.text, res.actions);
      if (voiceOn) speak(res.text);
    }, delay);
  }

  function send(text) {
    text = (text || '').replace(/\s+/g, ' ').trim();
    if (!text) return;
    addMsg('user', text);
    input.value = '';
    updateSend();
    reply(text);
  }

  function updateSend() {
    sendBtn.disabled = input.value.trim().length === 0;
  }

  /* ---------- Suggestions ---------- */
  function renderChips() {
    chipsBox.innerHTML = '';
    UI.chips.forEach(function (label) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'leasy-chip';
      b.textContent = label;
      b.addEventListener('click', function () { send(label); });
      chipsBox.appendChild(b);
    });
  }

  /* ---------- Voix ---------- */
  var voiceOn = false;
  try { voiceOn = localStorage.getItem('leasy_voice') === '1'; } catch (e) {}

  var synth = window.speechSynthesis || null;
  var voices = [];

  function loadVoices() {
    if (!synth) return;
    voices = synth.getVoices() || [];
  }
  if (synth) {
    loadVoices();
    if (typeof synth.addEventListener === 'function') synth.addEventListener('voiceschanged', loadVoices);
  }

  function pickVoice() {
    if (!voices.length) loadVoices();
    var prefs = LANG === 'en' ? ['en-GB', 'en-US', 'en'] : ['fr-FR', 'fr-CA', 'fr-BE', 'fr'];
    var i, v;
    for (i = 0; i < prefs.length; i++) {
      v = voices.filter(function (x) { return x.lang && x.lang.replace('_', '-').indexOf(prefs[i]) === 0 && /google|natural|premium|amelie|audrey|thomas/i.test(x.name); })[0];
      if (v) return v;
    }
    for (i = 0; i < prefs.length; i++) {
      v = voices.filter(function (x) { return x.lang && x.lang.replace('_', '-').indexOf(prefs[i]) === 0; })[0];
      if (v) return v;
    }
    return null;
  }

  function cleanForSpeech(text) {
    return (text || '')
      .replace(/[\uD800-\uDFFF\u2600-\u27BF]/g, ' ')
      .replace(/[•·]/g, ', ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function speak(text) {
    if (!synth) return;
    try {
      synth.cancel();
      var u = new SpeechSynthesisUtterance(cleanForSpeech(text));
      var v = pickVoice();
      if (v) u.voice = v;
      u.lang = LANG === 'en' ? 'en-US' : 'fr-FR';
      u.rate = 1.02;
      u.pitch = 1;
      u.volume = 1;
      synth.speak(u);
    } catch (e) {}
  }

  function setVoice(on, silent) {
    voiceOn = !!on;
    try { localStorage.setItem('leasy_voice', voiceOn ? '1' : '0'); } catch (e) {}
    voiceBtn.setAttribute('aria-pressed', voiceOn ? 'true' : 'false');
    voiceBtn.innerHTML = voiceOn ? I.volume : I.mute;
    var label = voiceOn ? UI.voiceOn : UI.voiceOff;
    voiceBtn.setAttribute('aria-label', label);
    voiceBtn.title = label;
    if (!voiceOn && synth) synth.cancel();
    if (!silent && voiceOn) {
      speak(LANG === 'en' ? 'Voice is on. I\'m listening.' : 'La voix est activée. Je vous écoute.');
    }
  }

  /* ---------- Reconnaissance vocale ---------- */
  var SR = window.SpeechRecognition || window.webkitSpeechRecognition || null;
  var recog = null;
  var listening = false;
  var micDeniedShown = false;

  if (!SR) {
    micBtn.hidden = true;
  } else {
    recog = new SR();
    recog.lang = LANG === 'en' ? 'en-US' : 'fr-FR';
    recog.interimResults = true;
    recog.continuous = false;
    recog.maxAlternatives = 1;

    recog.onstart = function () {
      listening = true;
      root.classList.add('leasy-listening');
      micBtn.classList.add('listening');
      micBtn.setAttribute('aria-label', LANG === 'en' ? 'Stop listening' : 'Arrêter l\'écoute');
      if (synth) synth.cancel();
    };

    recog.onresult = function (e) {
      var interim = '', final = '';
      for (var i = e.resultIndex; i < e.results.length; i++) {
        var t = e.results[i][0].transcript;
        if (e.results[i].isFinal) final += t;
        else interim += t;
      }
      if (interim) input.value = interim;
      if (final) {
        input.value = final;
        updateSend();
        setVoice(true, true);
        send(final);
      }
    };

    recog.onerror = function (e) {
      if (e.error === 'not-allowed' || e.error === 'service-not-allowed') {
        if (!micDeniedShown) {
          micDeniedShown = true;
          addMsg('bot', UI.micDenied);
        }
      } else if (e.error !== 'aborted' && e.error !== 'no-speech') {
        addMsg('bot', UI.micError);
      }
    };

    recog.onend = function () {
      listening = false;
      root.classList.remove('leasy-listening');
      micBtn.classList.remove('listening');
      micBtn.setAttribute('aria-label', UI.mic);
      if (!input.value.trim()) input.value = '';
      updateSend();
    };
  }

  micBtn.addEventListener('click', function () {
    if (!recog) return;
    if (listening) { try { recog.stop(); } catch (e) {} return; }
    setVoice(true, true);
    try { recog.start(); } catch (e) {}
  });

  /* ---------- Ouverture / fermeture ---------- */
  function greet() {
    if (greeted) return;
    greeted = true;
    addMsg('bot', UI.welcome);
    if (voiceOn) speak(UI.welcome);
    if (SR) {
      window.setTimeout(function () {
        addMsg('bot', UI.hint);
      }, 700);
    }
  }

  function openPanel() {
    root.classList.add('open');
    launcher.setAttribute('aria-expanded', 'true');
    panel.setAttribute('aria-hidden', 'false');
    document.body.classList.add('leasy-open');
    greet();
    renderChips();
    window.setTimeout(function () {
      if (window.innerWidth > 600) input.focus({ preventScroll: true });
      scrollLog();
    }, 240);
  }

  function closePanel() {
    root.classList.remove('open');
    launcher.setAttribute('aria-expanded', 'false');
    panel.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('leasy-open');
    if (synth) synth.cancel();
    if (listening) { try { recog.stop(); } catch (e) {} }
  }

  launcher.addEventListener('click', function () {
    if (root.classList.contains('open')) closePanel();
    else openPanel();
  });

  closeBtn.addEventListener('click', closePanel);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && root.classList.contains('open')) closePanel();
  });

  document.addEventListener('click', function (e) {
    if (!root.classList.contains('open')) return;
    if (root.contains(e.target)) return;
    closePanel();
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    send(input.value);
  });

  input.addEventListener('input', updateSend);
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send(input.value);
    }
  });

  voiceBtn.addEventListener('click', function () { setVoice(!voiceOn); });

  updateSend();
  setVoice(voiceOn, true);

  /* ---------- S'effacer quand le menu mobile du site est ouvert ---------- */
  var siteMenu = document.getElementById('mobile-menu');
  if (siteMenu) {
    var syncMenu = function () {
      var open = siteMenu.classList.contains('open');
      root.classList.toggle('leasy-away', open);
      if (open && root.classList.contains('open')) closePanel();
    };
    if (window.MutationObserver) {
      new MutationObserver(syncMenu).observe(siteMenu, { attributes: true, attributeFilter: ['class'] });
    }
    syncMenu();
  }

  /* ---------- API minimale (debug / intégrations) ---------- */
  window.Leasy = {
    open: openPanel,
    close: closePanel,
    ask: function (q) { openPanel(); send(q); },
    lang: LANG
  };
})();
