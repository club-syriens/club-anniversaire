// ─── APP.JS — Point d'entrée principal ────────────────────────────────────────
// Initialisation et démarrage de l'application
// ─────────────────────────────────────────────────────────────────────────────

async function init() {
  // 1. Countdown immédiat + interval
  UI.updateCD();
  setInterval(UI.updateCD, 60000);

  // 2. Afficher l'overlay de chargement
  UI.showLoading(true);

  // 3. Tenter de charger depuis Google Sheets
  const loaded = await Sync.load();

  if (!loaded) {
    // Sheets vide → seeder + pousser les données initiales
    seedData();
    await Sync.save();
  }

  // 4. Masquer l'overlay et afficher l'UI
  UI.showLoading(false);
  Render.all();

  // 5. Démarrer le rafraîchissement automatique (30s)
  // Le verrou isSyncing dans sync.js empêche les conflits
  Sync.startAutoRefresh(30000);
}

// Lancer dès que le DOM est prêt
document.addEventListener('DOMContentLoaded', init);
