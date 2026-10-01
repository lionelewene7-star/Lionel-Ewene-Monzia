# Carte de visite — Lionel Ewene Monzia

Format **85 × 55 mm** (norme française ISO 7810 — 3,5″ × 2″).
Recto et verso, aux couleurs du portfolio.

## Fichiers à utiliser

| Fichier | Usage |
|---|---|
| **carte-de-visite.pdf** | 1 feuille A4 avec 4 recto + 4 verso et des traits de coupe. **C'est celui-là qu'il faut imprimer chez soi.** |
| **carte-duplex.pdf** | 2 pages au format exact 85 × 55 mm, pour un imprimeur, en impression recto-verso. |
| **carte-recto.png** / **carte-verso.png** | Images 1284 × 828 px à 300 ppp, pour envoyer sur WhatsApp, LinkedIn ou WhatsApp Business. |
| `index.html` | Aperçu à l'écran et version imprimable de la planche A4. |
| `duplex.html` | Version au format exact. |

## Imprimer la planche A4

Ouvrez `index.html` dans Chrome ou Edge, puis :

1. `Ctrl + P`
2. Destination : **Enregistrer au format PDF**
3. Format : **A4**, marges : **Aucune**
4. Cochez **Arrière-plan graphique** (sinon les aplats de couleur disparaissent)

Découpez le long des pointillés violets, puis assemblez un recto et un verso dos à dos.

> **Papier :** 350 g/m² mat, ou 300 g/m² si vous n'avez pas de 350.
> Pour un vrai effet pro, demandez un **vernis sélectif** sur le nom et le filet dégradé.

## Les deux QR codes

| QR | Destination |
|---|---|
| **Portfolio** | `https://lionelewene7-star.github.io/Lionel-Ewene-Monzia/` |
| **WhatsApp** | `wa.me/243852867852` avec le message déjà rédigé |

Le QR WhatsApp ouvre la conversation **avec le message pré-rempli** : le client n'a plus qu'à appuyer sur *Envoyer*.

Les deux codes ont été relus depuis la carte imprimée et décodés : ils pointent bien vers ces adresses.

## Modifier le contenu

Tout est dans l'objet `INFO` en haut de `build-card.js` :

```js
const INFO = {
  firstName: 'Lionel',
  lastName:  'Ewene Monzia',
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