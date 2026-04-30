// topps/app.js — Elo voting logic

const ELO_K = 32;
const DEFAULT_ELO = 1500;
const DB_COLLECTION = 'rankings';
const DB_DOC = 'elo';

const YEAR_COLORS = {
  'Golden Age':  '#c8102e',
  'Silver Age':  '#1a3a6b',
  'Psychedelic': '#8b008b',
  'Transition':  '#2d6a2d',
  'Junk Wax':    '#8b4513',
  'Modern':      '#1a1a2e',
  'Recent':      '#0d4f8b',
};

let eloData = {};
let totalVotes = 0;
let currentA = null;
let currentB = null;
let db, docRef;

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

function loadCardDisplay(card, imgEl, placeholderEl, yearEl, eraEl) {
  const src = `images/${card.year}.jpg`;
  imgEl.style.display = 'none';
  placeholderEl.style.display = 'flex';
  placeholderEl.textContent = card.year;
  placeholderEl.style.background = `linear-gradient(135deg, ${YEAR_COLORS[card.era] || '#333'}22, ${YEAR_COLORS[card.era] || '#333'}44)`;
  placeholderEl.style.color = YEAR_COLORS[card.era] || '#555';

  const testImg = new Image();
  testImg.onload = () => {
    imgEl.src = src;
    imgEl.alt = `${card.year} Topps`;
    imgEl.style.display = 'block';
    placeholderEl.style.display = 'none';
  };
  testImg.onerror = () => {
    imgEl.style.display = 'none';
    placeholderEl.style.display = 'flex';
  };
  testImg.src = src;

  yearEl.textContent = `${card.year} Topps`;
  eraEl.textContent = card.era;
}

function pickMatchup() {
  const cards = window.TOPPS_CARDS;
  let a, b;
  do {
    a = cards[Math.floor(Math.random() * cards.length)];
    b = cards[Math.floor(Math.random() * cards.length)];
  } while (a.year === b.year);

  currentA = a;
  currentB = b;

  loadCardDisplay(a,
    document.getElementById('imgA'),
    document.getElementById('placeholderA'),
    document.getElementById('yearA'),
    document.getElementById('eraA')
  );
  loadCardDisplay(b,
    document.getElementById('imgB'),
    document.getElementById('placeholderB'),
    document.getElementById('yearB'),
    document.getElementById('eraB')
  );
}

async function recordVote(winner) {
  const winnerCard = winner === 'A' ? currentA : currentB;
  const loserCard  = winner === 'A' ? currentB : currentA;

  const rW = eloData[winnerCard.year]?.elo ?? DEFAULT_ELO;
  const rL = eloData[loserCard.year]?.elo  ?? DEFAULT_ELO;
  const { newA: newW, newB: newL } = newRatings(rW, rL, 'A');

  eloData[winnerCard.year] = {
    elo:         newW,
    wins:        (eloData[winnerCard.year]?.wins   ?? 0) + 1,
    losses:      (eloData[winnerCard.year]?.losses ?? 0),
    comparisons: (eloData[winnerCard.year]?.comparisons ?? 0) + 1,
  };
  eloData[loserCard.year] = {
    elo:         newL,
    wins:        (eloData[loserCard.year]?.wins   ?? 0),
    losses:      (eloData[loserCard.year]?.losses ?? 0) + 1,
    comparisons: (eloData[loserCard.year]?.comparisons ?? 0) + 1,
  };

  totalVotes++;
  document.getElementById('stat-votes').textContent = totalVotes.toLocaleString();

  const winCard = document.getElementById('card' + winner);
  winCard.classList.add('voted');
  setTimeout(() => {
    winCard.classList.remove('voted');
    pickMatchup();
  }, 350);

  if (db && docRef) {
    try {
      await window.__runTransaction(db, async (tx) => {
        const snap = await tx.get(docRef);
        const data = snap.exists() ? snap.data() : {};
        const wPrev = data[winnerCard.year] ?? { elo: DEFAULT_ELO, wins: 0, losses: 0, comparisons: 0 };
        const lPrev = data[loserCard.year]  ?? { elo: DEFAULT_ELO, wins: 0, losses: 0, comparisons: 0 };
        const { newA: fw, newB: fl } = newRatings(wPrev.elo, lPrev.elo, 'A');
        tx.set(docRef, {
          ...data,
          [winnerCard.year]: { elo: fw, wins: wPrev.wins + 1, losses: wPrev.losses,     comparisons: wPrev.comparisons + 1 },
          [loserCard.year]:  { elo: fl, wins: lPrev.wins,     losses: lPrev.losses + 1, comparisons: lPrev.comparisons + 1 },
          __totalVotes: (data.__totalVotes ?? 0) + 1,
        });
      });
    } catch (e) {
      console.warn('Firebase write failed:', e);
    }
  }
}

function init() {
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

  window.__onSnapshot(docRef, (snap) => {
    if (snap.exists()) {
      const data = snap.data();
      totalVotes = data.__totalVotes ?? 0;
      document.getElementById('stat-votes').textContent = totalVotes.toLocaleString();
      window.TOPPS_CARDS.forEach(c => {
        if (data[c.year]) eloData[c.year] = data[c.year];
      });
    }
  });

  init();
});

setTimeout(() => {
  if (!currentA) init();
}, 3000);
