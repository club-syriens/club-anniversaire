// ─── APP.JS v5 — Point d'entrée ───────────────────────────────────────────────

async function init() {
  UI.updateCD();
  setInterval(UI.updateCD, 60000);
  UI.showLoading(true);

  // Forcer le rechargement des données initiales
  // (ignore ce qu'il y a dans Sheets si c'est incomplet)
  const loaded = await Sync.load();

  // Ne garder les données Sheets QUE si on a bien les 57 tâches
  const hasFullData = window.S.tasks.length >= 57;

  if (!loaded || !hasFullData) {
    seedData();
    await Sync.save();
  }

  UI.showLoading(false);
  Render.all();
  Sync.startAutoRefresh(30000);
}

document.addEventListener('DOMContentLoaded', init);
