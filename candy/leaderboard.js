// leaderboard.js

const DB_DOC = 'candy-rankings';
const DB_COLLECTION = 'rankings';
const DEFAULT_ELO = 1500;

// Category colors for swatches
const CATEGORY_COLORS = {
  'Chocolate':   '#7b3f00',
  'Fruity':      '#e63946',
  'Gummy':       '#2a9d8f',
  'Chewy':       '#e9c46a',
  'Hard Candy':  '#457b9d',
  'Candy':       '#a8dadc',
  'Divisive':    '#6d6875',
};

function render(data) {
  const candies = window.CANDIES.map(c => {
    const d = data[c.id] ?? { elo: DEFAULT_ELO, wins: 0, losses: 0, comparisons: 0 };
    return { ...c, ...d };
  });

  candies.sort((a, b) => b.elo - a.elo);

  const totalVotes = data.__totalVotes ?? 0;
  document.getElementById('stat-votes').textContent = totalVotes.toLocaleString();

  const rows = candies.map((candy, i) => {
    const rank = i + 1;
    const rankClass = rank <= 3 ? `rank top${rank}` : 'rank';
    const rankEmoji = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : rank;
    const color = CATEGORY_COLORS[candy.category] || '#555';
    const winPct = candy.comparisons > 0
      ? Math.round((candy.wins / candy.comparisons) * 100)
      : '—';

    return `
      <tr>
        <td class="${rankClass}">${rankEmoji}</td>
        <td class="candy-cell">
          <span class="cat-swatch" style="background:${color}"></span>
          ${candy.name}
        </td>
        <td class="cat-cell">${candy.category}</td>
        <td class="elo-cell">${candy.elo}</td>
        <td class="record-cell">${candy.wins}–${candy.losses} (${winPct}%)</td>
      </tr>
    `;
  }).join('');

  document.getElementById('tableContainer').innerHTML = `
    <table class="rankings-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Candy</th>
          <th>Type</th>
          <th class="right">Elo</th>
          <th class="right">Win–Loss</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

window.addEventListener('firebase-ready', () => {
  const db = window.__db;
  const docRef = window.__doc(db, DB_COLLECTION, DB_DOC);

  window.__onSnapshot(docRef, (snap) => {
    const data = snap.exists() ? snap.data() : {};
    render(data);
  });
});

// Fallback: render with defaults if Firebase never fires
setTimeout(() => {
  const container = document.getElementById('tableContainer');
  if (container.querySelector('.loading-state')) {
    render({});
  }
}, 4000);
