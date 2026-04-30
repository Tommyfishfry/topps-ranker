// app.js — Elo voting logic for candy ranker

const ELO_K = 32;
const DEFAULT_ELO = 1500;
const DB_DOC = 'candy-rankings';
const DB_COLLECTION = 'rankings';

let eloData = {};
let currentA = null;
let currentB = null;
let totalVotes = 0;
let db, docRef;

// ── Elo math ─────────────────────────────────────────────────────────────────
function expectedScore(rA, rB) {
  return 1 / (1 + Math.pow(10, (rB - rA) / 400));
}

function newRatings(rA, rB, winner) {
  const eA = expectedScore(rA, rB);
  const eB = expectedScore(rB, rA);
  const sA = winner === 'A' ? 1 : 0;
  const sB = winner === 'B' ? 1 : 0;
  return {
    newA: Math.round(rA + ELO_K * (sA - eA)),
    newB: Math.round(rB + ELO_K * (sB - eB)),
  };
}

// ── Image loading ─────────────────────────────────────────────────────────────
function loadCandyCard(candy, imgEl, placeholderEl, nameEl, catEl) {
  const src = `images/${candy.id}.jpg`;
  imgEl.style.display = 'none';
  placeholderEl.style.display = 'flex';
  placeholderEl.textContent = candy.name;

  const testImg = new Image();
  testImg.onload = () => {
    imgEl.src = src;
    imgEl.alt = candy.name;
    imgEl.style.display = 'block';
    placeholderEl.style.display = 'none';
  };
  testImg.onerror = () => {
    imgEl.style.display = 'none';
    placeholderEl.style.display = 'flex';
  };
  testImg.src = src;

  nameEl.textContent = candy.name;
  catEl.textContent = candy.category;
}

// ── Pick a random matchup ─────────────────────────────────────────────────────
function pickMatchup() {
  const candies = window.CANDIES;
  let a, b;
  do {
    a = candies[Math.floor(Math.random() * candies.length)];
    b = candies[Math.floor(Math.random() * candies.length)];
  } while (a.id === b.id);

  currentA = a;
  currentB = b;

  loadCandyCard(a,
    document.getElementById('imgA'),
    document.getElementById('placeholderA'),
    document.getElementById('nameA'),
    document.getElementById('catA')
  );
  loadCandyCard(b,
    document.getElementById('imgB'),
    document.getElementById('placeholderB'),
    document.getElementById('nameB'),
    document.getElementById('catB')
  );
}

// ── Record a vote ─────────────────────────────────────────────────────────────
async function recordVote(winner) {
  const loser = winner === 'A' ? 'B' : 'A';
  const winnerCandy = winner === 'A' ? currentA : currentB;
  const loserCandy  = winner === 'A' ? currentB : currentA;

  const rW = eloData[winnerCandy.id]?.elo ?? DEFAULT_ELO;
  const rL = eloData[loserCandy.id]?.elo  ?? DEFAULT_ELO;
  const { newA: newW, newB: newL } = newRatings(rW, rL, 'A');

  // Optimistic local update
  eloData[winnerCandy.id] = {
    elo:         newW,
    wins:        (eloData[winnerCandy.id]?.wins   ?? 0) + 1,
    losses:      (eloData[winnerCandy.id]?.losses ?? 0),
    comparisons: (eloData[winnerCandy.id]?.comparisons ?? 0) + 1,
  };
  eloData[loserCandy.id] = {
    elo:         newL,
    wins:        (eloData[loserCandy.id]?.wins   ?? 0),
    losses:      (eloData[loserCandy.id]?.losses ?? 0) + 1,
    comparisons: (eloData[loserCandy.id]?.comparisons ?? 0) + 1,
  };

  totalVotes++;
  document.getElementById('stat-votes').textContent = totalVotes.toLocaleString();

  // Animate winner card
  const winCard = document.getElementById('card' + winner);
  winCard.classList.add('voted');
  setTimeout(() => {
    winCard.classList.remove('voted');
    pickMatchup();
  }, 350);

  // Write to Firestore
  if (db && docRef) {
    try {
      await window.__runTransaction(db, async (tx) => {
        const snap = await tx.get(docRef);
        const data = snap.exists() ? snap.data() : {};
        const wPrev = data[winnerCandy.id] ?? { elo: DEFAULT_ELO, wins: 0, losses: 0, comparisons: 0 };
        const lPrev = data[loserCandy.id]  ?? { elo: DEFAULT_ELO, wins: 0, losses: 0, comparisons: 0 };
        const { newA: fw, newB: fl } = newRatings(wPrev.elo, lPrev.elo, 'A');
        tx.set(docRef, {
          ...data,
          [winnerCandy.id]: { elo: fw, wins: wPrev.wins + 1, losses: wPrev.losses,     comparisons: wPrev.comparisons + 1 },
          [loserCandy.id]:  { elo: fl, wins: lPrev.wins,     losses: lPrev.losses + 1, comparisons: lPrev.comparisons + 1 },
          __totalVotes: (data.__totalVotes ?? 0) + 1,
        });
      });
    } catch (e) {
      console.warn('Firebase write failed:', e);
    }
  }
}

// ── Bootstrap ─────────────────────────────────────────────────────────────────
function init() {
  // Wire up vote buttons
  document.getElementById('cardA').addEventListener('click', () => recordVote('A'));
  document.getElementById('cardB').addEventListener('click', () => recordVote('B'));
  document.getElementById('cardA').addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') recordVote('A'); });
  document.getElementById('cardB').addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') recordVote('B'); });
  document.getElementById('skipBtn').addEventListener('click', pickMatchup);

  pickMatchup();
}

window.addEventListener('firebase-ready', () => {
  db = window.__db;
  docRef = window.__doc(db, DB_COLLECTION, DB_DOC);

  // Live listener for vote counts + elo sync
  window.__onSnapshot(docRef, (snap) => {
    if (snap.exists()) {
      const data = snap.data();
      totalVotes = data.__totalVotes ?? 0;
      document.getElementById('stat-votes').textContent = totalVotes.toLocaleString();
      // Sync elo data from server
      window.CANDIES.forEach(c => {
        if (data[c.id]) eloData[c.id] = data[c.id];
      });
    }
  });

  init();
});

// Fallback if Firebase fails to load
setTimeout(() => {
  if (!document.getElementById('nameA').textContent || document.getElementById('nameA').textContent === '—') {
    init();
  }
}, 3000);
