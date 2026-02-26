const hasFullData = window.S.tasks.length >= 57;
if (!loaded || !hasFullData) {
  seedData(); // force le rechargement des 57 tâches
  await Sync.save(); // pousse vers Sheets
}
