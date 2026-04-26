// app.js — Elo voting logic + Firebase integration

import { db } from './firebase-config.js';
import {
  doc, getDoc, setDoc, updateDoc, collection,
  getDocs, increment, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ─── Elo Math ───────────────────────────────────────────────────────────────

const K = 32; // Elo K-factor — higher = faster movement

function expectedScore(ratingA, ratingB) {
  return 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
}

function newRatings(winnerRating, loserRating) {
  const expectedWinner = expectedScore(winnerRating, loserRating);
  const expectedLoser = expectedScore(loserRating, winnerRating);
  return {
    winner: Math.round(winnerRating + K * (1 - expectedWinner)),
    loser: Math.round(loserRating + K * (0 - expectedLoser)),
  };
}

// ─── Firebase Helpers ────────────────────────────────────────────────────────

const CARDS_COLLECTION = 'cards';
const STATS_DOC = 'stats/global';

async function getCardData(year) {
  const ref = doc(db, CARDS_COLLECTION, String(year));
  const snap = await getDoc(ref);
  if (snap.exists()) return snap.data();
  // First time we've seen this card — initialize it
  const initial = { year, elo: 1500, wins: 0, losses: 0, comparisons: 0 };
  await setDoc(ref, initial);
  return initial;
}

async function recordVote(winnerYear, loserYear) {
  const [winnerData, loserData] = await Promise.all([
    getCardData(winnerYear),
    getCardData(loserYear),
  ]);

  const { winner: newWinnerElo, loser: newLoserElo } = newRatings(
    winnerData.elo,
    loserData.elo
  );

  await Promise.all([
    updateDoc(doc(db, CARDS_COLLECTION, String(winnerYear)), {
      elo: newWinnerElo,
      wins: increment(1),
      comparisons: increment(1),
    }),
    updateDoc(doc(db, CARDS_COLLECTION, String(loserYear)), {
      elo: newLoserElo,
      losses: increment(1),
      comparisons: increment(1),
    }),
    updateDoc(doc(db, STATS_DOC), {
      totalVotes: increment(1),
      lastVote: serverTimestamp(),
    }).catch(() =>
      setDoc(doc(db, STATS_DOC), { totalVotes: 1, lastVote: serverTimestamp() })
    ),
  ]);

  return { newWinnerElo, newLoserElo };
}

async function getAllRankings() {
  const snap = await getDocs(collection(db, CARDS_COLLECTION));
  const cards = [];
  snap.forEach(d => cards.push(d.data()));
  return cards.sort((a, b) => b.elo - a.elo);
}

async function getTotalVotes() {
  try {
    const snap = await getDoc(doc(db, STATS_DOC));
    return snap.exists() ? snap.data().totalVotes : 0;
  } catch {
    return 0;
  }
}

export { getCardData, recordVote, getAllRankings, getTotalVotes };
