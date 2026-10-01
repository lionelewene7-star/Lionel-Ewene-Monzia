# Carte de visite — Lionel Ewene Monzia

Format **85 × 55 mm** (norme française ISO 7810 — 3,5″ × 2″).
Recto et verso. **Sans photo** — un monogramme `L.E.M` fait office d'emblème.

Style **futuriste** : fond nuit, lueurs néon violet/cyan, grille technique,
repères HUD aux quatre coins.

## Fichiers à utiliser

| Fichier | Usage |
|---|---|
| **carte-de-visite.pdf** | 1 feuille A4 avec 4 recto + 4 verso et des traits de coupe. **C'est celui-là qu'il faut imprimer.** |
| **carte-duplex.pdf** | 2 pages au format exact 85 × 55 mm, pour un imprimeur, en impression recto-verso. |
| **carte-recto.png** / **carte-verso.png** | Images 1284 × 828 px à 300 ppp, pour WhatsApp, LinkedIn ou WhatsApp Business. |
| `index.html` | Aperçu à l'écran et version imprimable de la planche A4. |
| `duplex.html` | Version au format exact. |

## Imprimer la planche A4

Ouvrez `index.html` dans Chrome ou Edge, puis :

1. `Ctrl + P`
2. Destination : **Enregistrer au format PDF**
3. Format : **A4**, marges : **Aucune**
4. ⚠️ Cochez **Arrière-plan graphique** — **obligatoire ici**, sans quoi le fond
   sombre disparaît et la carte devient illisible.

Découpez le long des pointillés cyan, puis assemblez un recto et un verso dos à dos.

## Choix du papier

Le fond est presque noir. Sur une imprimante domestique, l'encre est très chargée :

- **350 g/m² noir mat** + **vernis sélectif** sur le monogramme, le nom et le
  filet dégradé → rendu premium, sans couche noire visible.
- À défaut : **350 g/m² blanc** avec le PDF tel quel — le design fonctionne aussi.

Évitez le **vernis brillant** sur toute la carte : il reflète la lumière et rend
la lecture des QR codes plus difficile.

## Les deux QR codes

| QR | Destination |
|---|---|
| **Portfolio** | `https://lionelewene7-star.github.io/Lionel-Ewene-Monzia/` |
| **WhatsApp** | `wa.me/243852867852` avec le message déjà rédigé |

Le QR WhatsApp ouvre la conversation **avec le message pré-rempli** : le client
n'a plus qu'à appuyer sur *Envoyer*.

Les deux codes sont posés sur un **fond blanc** avec une marge : c'est ce qui
permet à un téléphone de les lire même sur une carte sombre. Ils ont été relus
depuis la carte rendue pour confirmer qu'ils scannent toujours.

## Modifier le contenu

Tout est dans l'objet `INFO` en haut de `build-card.js` :

```js
const INFO = {
  firstName: 'Lionel',
  lastName:  'Ewene Monzia',
  mark:      ['L', 'E', 'M'],   // monogramme
  eyebrow:   'Full-Stack · UI/UX · Print',
  role:      'Développeur Web & Designer UI/UX',
  ...
};
```

Puis régénérez :

```bash
node build-card.js
```

Les QR sont des images : si l'adresse du portfolio ou le numéro change,
il faut aussi refaire `assets/qr-portfolio.png` et `assets/qr-whatsapp.png`.

## Palette

| Rôle | Couleur |
|---|---|
| Fond | `#07070f` → `#110f26` |
| Néon violet | `#7c5cff` |
| Néon cyan | `#22d3ee` |
| Texte | `#f2f3fa` |
| Secondaire | `#a2a2c0` |

Polices : **Space Grotesk** (nom), **JetBrains Mono** (micro-libellés), **Inter** (contacts).
