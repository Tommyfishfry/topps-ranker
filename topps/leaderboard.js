// topps/leaderboard.js — reads from cards collection, matches by number ID

const DEFAULT_ELO = 1500;

const YEAR_COLORS = {
  'Golden Age':  '#c8102e',
  'Silver Age':  '#1a3a6b',
  'Psychedelic': '#8b008b',
  'Transition':  '#2d6a2d',
  'Junk Wax':    '#8b4513',
  'Modern':      '#1a1a2e',
  'Recent':      '#0d4f8b',
};

async function render() {
  const db = window.__db;

  try {
    const snapshot = await window.__getDocs(window.__collection(db, 'cards'));
    const firebaseData = {};
    snapshot.forEach(d => {
      firebaseData[d.id] = d.data();
      firebaseData[Number(d.id)] = d.data();
    });

    const statsSnap = await window.__getDoc(window.__doc(db, 'stats', 'global'));
    const totalVotes = statsSnap.exists() ? (statsSnap.data().totalVotes ?? 0) : 0;
    document.getElementById('stat-votes').textContent = totalVotes.toLocaleString();

    const cards = window.TOPPS_CARDS.map(c => {
      const d = firebaseData[c.year] ?? firebaseData[String(c.year)] ?? { elo: DEFAULT_ELO, wins: 0, losses: 0, comparisons: 0 };
      return { ...c, ...d };
    });

    cards.sort((a, b) => b.elo - a.elo);

    const rows = cards.map((card, i) => {
      const rank = i + 1;
      const rankClass = rank <= 3 ? `rank top${rank}` : 'rank';
      const rankEmoji = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : rank;
      const color = YEAR_COLORS[card.era] || '#555';
      const winPct = card.comparisons > 0 ? Math.round((card.wins / card.comparisons) * 100) : '—';
      return `
        <tr>
          <td class="${rankClass}">${rankEmoji}</td>
          <td class="year-cell"><span class="year-swatch" style="background:${color}"></span>${card.year} Topps</td>
          <td class="era-cell">${card.era}</td>
          <td class="elo-cell">${card.elo}</td>
          <td class="record-cell">${card.wins}–${card.losses} (${winPct}%)</td>
        </tr>
      `;
    }).join('');

    document.getElementById('tableContainer').innerHTML = `
      <table class="rankings-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Design Year</th>
            <th>Era</th>
            <th class="right">Elo</th>
            <th class="right">Win–Loss</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    `;

  } catch (e) {
    console.error('Firebase load failed:', e);
    document.getElementById('tableContainer').innerHTML = '<p style="padding:2rem;text-align:center;color:#999">Could not load rankings.</p>';
  }
}

window.addEventListener('firebase-ready', () => { render(); });
setTimeout(() => {
  const container = document.getElementById('tableContainer');
  if (container && container.querySelector('.loading-state')) render();
}, 4000);
