// ─── APP.JS v4 — Point d'entrée ───────────────────────────────────────────────

async function init() {
  UI.updateCD();
  setInterval(UI.updateCD, 60000);
  UI.showLoading(true);

  const loaded = await Sync.load();

  if (!loaded) {
    // Sheets vide ou inaccessible → charger les données initiales
    seedData();
    // Pousser vers Sheets immédiatement
    await Sync.save();
  }

  UI.showLoading(false);
  Render.all();

  // Auto-refresh toutes les 30s — protégé contre l'écrasement par sync.js
  Sync.startAutoRefresh(30000);
}

document.addEventListener('DOMContentLoaded', init);
