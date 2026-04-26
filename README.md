# Topps Ranker — Setup Guide

A community-powered Elo ranking site for every Topps baseball card design (1952–2024).
Users vote head-to-head, and all votes contribute to a shared global leaderboard.

---

## Tech Stack

- **Frontend**: Plain HTML/CSS/JS — no build step required
- **Database**: Firebase Firestore (free tier, real-time)
- **Hosting**: Vercel (free, deploys from GitHub in 2 clicks)

---

## Step 1 — Set Up Firebase (10 min)

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Click **Add project** → name it `topps-ranker` → Continue
3. Disable Google Analytics if you don't want it → Create project
4. In the left sidebar: **Build → Firestore Database**
5. Click **Create database**
6. Choose **Start in test mode** (you can tighten security later)
7. Pick a region close to you → Enable
8. In the left sidebar: **Project Settings** (gear icon)
9. Under **Your apps** → click the web icon `</>`
10. Register the app, name it `topps-ranker`
11. Copy the `firebaseConfig` object that appears

Now open `firebase-config.js` and paste your config:

```js
const firebaseConfig = {
  apiKey: "your-actual-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123:web:abc"
};
```

---

## Step 2 — Add Card Images

Place one image per year in the `/images/` folder.
Images should be named exactly: `1952.jpg`, `1953.jpg`, `1987.jpg`, etc.

**If an image is missing**, the site automatically shows a styled colored placeholder
with the year displayed — so missing images are not a problem. Add them over time.

### Where to find images (free):
- **TCDB.com** (Trading Card Database) — browse by year, right-click save front image
- **eBay** — search "1987 Topps baseball" to see card fronts
- **Beckett.com** — similar
- Aim for one representative base card per year (not a star player, just a clean example)

Card images should ideally be ~400×560px or larger.

---

## Step 3 — Deploy to Vercel (5 min)

1. Create a free account at [github.com](https://github.com)
2. Create a new repository: `topps-ranker`
3. Upload all files from this folder into the repo
4. Go to [vercel.com](https://vercel.com) → Sign up with GitHub
5. Click **Add New Project** → Import your `topps-ranker` repo
6. Leave all settings as default → **Deploy**
7. Your site is live at `https://topps-ranker.vercel.app` (or similar)

Any time you push to GitHub (e.g., adding new card images), Vercel auto-redeploys.

---

## File Structure

```
topps-ranker/
├── index.html          ← Voting page
├── leaderboard.html    ← Rankings leaderboard
├── style.css           ← All styles
├── app.js              ← Elo logic + Firebase reads/writes
├── cards.js            ← Card metadata (years, descriptions, colors)
├── firebase-config.js  ← YOUR Firebase credentials (don't commit publicly!)
├── images/             ← Drop card images here: 1952.jpg, 1987.jpg, etc.
│   └── .gitkeep
└── README.md
```

---

## How the Elo System Works

- Every card starts at **Elo 1500**
- When you vote, the winner's rating goes up and the loser's goes down
- The size of the change depends on the ratings gap: beating a highly-rated card
  is worth more than beating a low-rated one
- K-factor is set to **32** (standard for chess), giving meaningful movement per vote
- With enough votes, the rankings converge on community consensus

---

## Optional: Tighten Firebase Security

Once you go public, update Firestore Rules to prevent abuse:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /cards/{cardId} {
      allow read: if true;
      allow write: if true; // Consider rate limiting via Cloud Functions later
    }
    match /stats/{docId} {
      allow read, write: if true;
    }
  }
}
```

For a hobby site, test mode is fine. For production, look into Firebase rate limiting.

---

## Customization

- **Add/remove years**: Edit the `CARDS` array in `cards.js` and the matching array in `index.html`
- **Adjust Elo speed**: Change `K` in `app.js` (higher = faster movement)
- **Change colors**: Edit CSS variables in `style.css`
- **Add more stats**: The Firestore `cards` collection stores `elo`, `wins`, `losses`, `comparisons`
