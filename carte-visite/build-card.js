/* ============================================================
   Génère la carte de visite (recto + verso) en HTML statique.

   Tout le contenu est dans l'objet INFO ci-dessous : modifiez-le
   puis relancez  node build-card.js  pour régénérer index.html
   et duplex.html.
   ============================================================ */
const fs = require('fs');
const path = require('path');

const OUT = __dirname;

/* ------------------- CONTENU DE LA CARTE ------------------- */
const INFO = {
  firstName: 'Lionel',
  lastName:  'Ewene Monzia',
  mark:      ['L', 'E', 'M'],           // monogramme affiche dans le carre
  eyebrow:   'Full-Stack · UI/UX · Print',
  role:      'D\u00e9veloppeur Web &amp; Designer UI/UX',
  services:  ['Sites web', 'Apps mobiles', 'Graphisme', 'Logiciels'],
  place:     'R\u00e9publique D\u00e9mocratique du Congo',
  urlShort:  'lionelewene7-star.github.io',
  urlPath:   '/Lionel-Ewene-Monzia',
  email:     'lionelewene7@gmail.com',
  github:    'github.com/lionelewene7-star',
  phone:     '+243 85 28 67 852',
  qr: {
    portfolio: { file: 'assets/qr-portfolio.png', url: 'https://lionelewene7-star.github.io/Lionel-Ewene-Monzia/' },
    whatsapp:  { file: 'assets/qr-whatsapp.png',
                 url: 'https://wa.me/243852867852?text=' + encodeURIComponent("Bonjour Lionel, je vous contacte depuis votre carte de visite.") },
  },
};

/* ------------------- ICÔNES ------------------- */
const svg = (body, extra = '') =>
  `<svg class="ic ${extra}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
     stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;

const IC = {
  whatsapp: `<path d="M21 11.5a8.4 8.4 0 0 1-12.6 7.3L3.5 20.5l1.7-4.9A8.5 8.5 0 1 1 21 11.5z"/><path d="M9.2 8.3h1.1l1 2.3-.9.9a6.3 6.3 0 0 0 2.1 2.1l.9-.9 2.3 1v1.1a1 1 0 0 1-1.1 1A8.6 8.6 0 0 1 8.2 9.4a1 1 0 0 1 1-1.1z"/>`,
  mail: `<rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="m3 7 8.2 5.6a1.5 1.5 0 0 0 1.6 0L21 7"/>`,
  github: `<path fill="currentColor" stroke="none" d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.05-.02-2.06-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.82 1.1.82 2.22 0 1.6-.02 2.89-.02 3.28 0 .32.22.7.83.58C20.57 22.29 24 17.79 24 12.5 24 5.87 18.63.5 12 .5z"/>`,
  globe: `<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.5 2.6 3.8 5.7 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3z"/>`,
  pin: `<path d="M20 10.2c0 5.4-8 11.3-8 11.3s-8-5.9-8-11.3a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="2.8"/>`,
};

/* repères HUD aux quatre coins */
const hud = '<i class="hud"><b></b><b></b><b></b><b></b></i>';

/* ------------------- RECTO ------------------- */
function recto() {
  // L.E.M : les points s'affichent en cyan néon
  const [a, b, c] = INFO.mark;
  const monogram = `${a}<i>.</i>${b}<i>.</i>${c}`;

  return `
  <article class="card recto">
    ${hud}
    <p class="tag recto-tag">${INFO.eyebrow}</p>
    <div class="identity">
      <div class="mark"><span>${monogram}</span></div>
      <div class="text">
        <h1 class="name">${INFO.firstName}<span class="last">${INFO.lastName}</span></h1>
        <p class="role">${INFO.role}</p>
      </div>
    </div>
    <div class="recto-foot">
      <div class="bar"></div>
      <p class="services">${INFO.services.join('<span>/</span>')}</p>
    </div>
  </article>`;
}

/* ------------------- VERSO ------------------- */
function verso() {
  const row = (cls, ic, k, v, href, urlCls = '') => `
        <${href ? `a class="row ${cls}" href="${href}"` : `div class="row ${cls}"`}>
          ${svg(IC[ic])}
          <span class="k">${k}</span>
          <span class="v ${urlCls}">${v}</span>
        ${href ? '</a>' : '</div>'}`;

  return `
  <article class="card verso">
    ${hud}
    <div class="verso-band"></div>
    <div class="verso-body">
      <div class="verso-head"><p class="tag">Contact</p></div>
      <div class="contact">
        ${row('wa', 'whatsapp', 'WhatsApp', INFO.phone, 'https://wa.me/243852867852')}
        ${row('mail', 'mail', 'Email', INFO.email, 'mailto:' + INFO.email)}
        ${row('gh', 'github', 'GitHub', INFO.github, 'https://' + INFO.github)}
        ${row('web', 'globe', 'Site', INFO.urlShort + '<wbr>' + INFO.urlPath, INFO.qr.portfolio.url, 'url')}
      </div>
      <div class="verso-foot">
        <div class="place">${svg(IC.pin)}<span>${INFO.place}</span></div>
        <div class="qrset">
          <a class="qritem portfolio" href="${INFO.qr.portfolio.url}">
            <img src="${INFO.qr.portfolio.file}" alt="">
            <span class="cap">Portfolio</span>
          </a>
          <a class="qritem whatsapp" href="${INFO.qr.whatsapp.url}">
            <img src="${INFO.qr.whatsapp.file}" alt="">
            <span class="cap">WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  </article>`;
}

/* ------------------- GABARIT COMMUN ------------------- */
const head = extra => `<!doctype html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>Carte de visite \u2014 Lionel Ewene Monzia</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="card.css">
<style>
${extra}
</style>
</head>
<body>`;

/* ============================================================
   1. index.html  —  planche A4 à imprimer et à découper
   ============================================================ */
const sheetCss = `
@page { size: A4 portrait; margin: 10mm; }
body { padding: 10mm; background: #dfe1ea; }
.sheet { width: 190mm; margin: 0 auto; }
.band-label {
  font-family: 'JetBrains Mono', monospace; font-size: 7pt; font-weight: 700;
  letter-spacing: .2em; text-transform: uppercase; color: #55556e;
  margin: 0 0 2.2mm;
}
.band-label + .grid { margin-bottom: 7mm; }
.grid { display: grid; grid-template-columns: repeat(2, 85mm); gap: 3mm; }
.slot { position: relative; outline: .2mm dashed rgba(108,92,231,.6); }
.slot .tag {
  position: absolute; top: -1mm; left: 0; transform: translateY(-100%);
  font-family: 'JetBrains Mono', monospace; font-size: 5.6pt; font-weight: 700;
  letter-spacing: .12em; text-transform: uppercase; color: #66667f;
}
.hint {
  margin-top: 4mm; padding: 3mm 4mm;
  background: #fff; border-radius: 2mm;
  border-left: .8mm solid #6c5ce7;
  font-size: 8.5pt; line-height: 1.5; color: #3a3a4a;
}
.hint b { color: #14141f; }
`;

const slot = (mark, card) =>
  `<div class="slot" style="position:relative"><span class="tag">${mark}</span>${card}</div>`;

const indexHtml = head(sheetCss) + `
<main class="sheet">
  <p class="band-label">Recto \u2014 face avant (4 exemplaires)</p>
  <div class="grid">
    ${slot('Recto 1', recto())}
    ${slot('Recto 2', recto())}
  </div>
  <div class="grid">
    ${slot('Recto 3', recto())}
    ${slot('Recto 4', recto())}
  </div>
  <p class="band-label">Verso \u2014 face arri\u00e8re (4 exemplaires)</p>
  <div class="grid">
    ${slot('Verso 1', verso())}
    ${slot('Verso 2', verso())}
  </div>
  <div class="grid">
    ${slot('Verso 3', verso())}
    ${slot('Verso 4', verso())}
  </div>
  <div class="hint">
    <b>Imprimer :</b> <b>Ctrl + P</b> \u2192 <b>Enregistrer au format PDF</b> \u2192 A4 \u2192 marges
    <b>Aucune</b> \u2192 cochez <b>Arri\u00e8re-plan graphique</b>.<br>
    D\u00e9coupez le long des pointill\u00e9s violets, puis assemblez recto + verso dos \u00e0 dos.
  </div>
</main>
</body>
</html>
`;

/* ============================================================
   2. duplex.html  —  2 pages au format exact 85 x 55 mm
   ============================================================ */
const duplexCss = `
@page { size: 85mm 55mm; margin: 0; }
body { background: #dfe1ea; display: block; }
.card { box-shadow: 0 2mm 6mm rgba(20,20,31,.16); break-after: page; page-break-after: always; }
.card:last-child { break-after: auto; page-break-after: auto; }
@media screen { body { display: flex; flex-wrap: wrap; gap: 10mm; padding: 10mm; justify-content: center; } }
`;

const duplexHtml = head(duplexCss) + recto() + verso() + `
</body>
</html>
`;

fs.writeFileSync(path.join(OUT, 'index.html'), indexHtml, 'utf8');
fs.writeFileSync(path.join(OUT, 'duplex.html'), duplexHtml, 'utf8');

console.log('index.html   ' + Buffer.byteLength(indexHtml) + ' octets');
console.log('duplex.html  ' + Buffer.byteLength(duplexHtml) + ' octets');
console.log('OK');
