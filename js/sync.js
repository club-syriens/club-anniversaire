// ─── SYNC MODULE v4 ───────────────────────────────────────────────────────────
// Fix CORS : GET no-cors par onglet + verrou isSyncing + protection load()
// ─────────────────────────────────────────────────────────────────────────────

const Sync = (() => {
  let isSyncing = false;
  let pendingSave = false;
  let autoRefreshInterval = null;

  function setStatus(msg) {
    const el = document.getElementById('sync-st');
    if (el) el.textContent = msg;
  }
  function setBtn(disabled) {
    const btn = document.querySelector('.sync-btn');
    if (btn) btn.disabled = disabled;
  }

  // ── Sauvegarde un seul onglet via GET (contourne CORS sur POST) ────────────
  async function saveOneSheet(sheetName, data) {
    const encoded = encodeURIComponent(JSON.stringify(data));
    const url = window.API_URL + '?action=write&sheet=' + sheetName + '&data=' + encoded;
    try {
      // no-cors : fire-and-forget, pas de réponse lisible mais ça passe
      await fetch(url, { method: 'GET', mode: 'no-cors' });
      return true;
    } catch(e) {
      try {
        // Fallback XHR
        await new Promise(resolve => {
          const xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.onload = xhr.onerror = () => resolve();
          xhr.send();
        });
        return true;
      } catch(e2) {
        console.error('[Sync] saveOneSheet failed: ' + sheetName, e2);
        return false;
      }
    }
  }

  // ── SAVE → envoie chaque onglet séparément ────────────────────────────────
  async function save() {
    if (isSyncing) { pendingSave = true; return; }
    isSyncing = true;
    pendingSave = false;
    setBtn(true);
    setStatus('⏳ Sauvegarde...');

    const sheets = {
      Taches:       window.S.tasks,
      Budget:       window.S.budget,
      Benevoles:    window.S.volunteers,
      Prestataires: window.S.providers,
      Invites:      window.S.guests,
      Lieux:        window.S.venues,
    };

    // Envoie séquentiellement (plus fiable que Promise.all pour Apps Script)
    for (const [name, data] of Object.entries(sheets)) {
      await saveOneSheet(name, data);
    }

    isSyncing = false;
    setBtn(false);
    setStatus('✅ ' + new Date().toLocaleTimeString('fr-FR'));
    UI.showToast('✅ Synchronisé !', 'ok');

    if (pendingSave) await save();
  }

  // ── LOAD ← Google Sheets ──────────────────────────────────────────────────
  // RÈGLE CRITIQUE : on ne charge QUE si Sheets contient réellement des données
  // Pour éviter d'écraser l'état local avec un Sheets vide ou en cours d'écriture
  async function load() {
    setStatus('⏳ Chargement...');
    try {
      const res = await fetch(window.API_URL + '?action=readAll');
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const json = await res.json();

      const tasks      = json.Taches       || [];
      const budget     = json.Budget       || [];
      const volunteers = json.Benevoles    || [];
      const providers  = json.Prestataires || [];
      const guests     = json.Invites      || [];
      const venues     = json.Lieux        || [];

      // ⚠️ Garde-fou : si Sheets retourne moins de tâches qu'on en a en mémoire,
      // c'est que la sync n'est pas terminée ou a échoué → NE PAS écraser
      const currentTaskCount = window.S.tasks.length;
      if (tasks.length < currentTaskCount && currentTaskCount > 0) {
        console.warn('[Sync] load() aborted: Sheets has ' + tasks.length + ' tasks but memory has ' + currentTaskCount + '. Skipping to avoid data loss.');
        setStatus('⚠️ Sync protégée (' + currentTaskCount + ' tâches)');
        return false;
      }

      // Sheets complètement vide → pas encore initialisé
      if (tasks.length === 0 && budget.length === 0 && volunteers.length === 0
          && providers.length === 0 && guests.length === 0 && venues.length === 0) {
        setStatus('⚠️ Sheets vide');
        return false;
      }

      // OK → charger les données
      window.S.tasks      = tasks.map(t => ({ ...t, id: Number(t.id) || t.id }));
      window.S.budget     = budget.map(b => ({ ...b, id: Number(b.id) || b.id, amount: parseFloat(b.amount) || 0 }));
      window.S.volunteers = volunteers.map(v => ({ ...v, id: Number(v.id) || v.id }));
      window.S.providers  = providers.map(p => ({ ...p, id: Number(p.id) || p.id, price: parseFloat(p.price) || 0 }));
      window.S.guests     = guests.map(g => ({ ...g, id: Number(g.id) || g.id }));
      window.S.venues     = venues.map(v => ({ ...v, id: Number(v.id) || v.id, cap: parseInt(v.cap) || 0, price: parseFloat(v.price) || 0 }));

      setStatus('✅ ' + new Date().toLocaleTimeString('fr-FR'));
      return true;
    } catch(e) {
      console.error('[Sync] load failed', e);
      setStatus('❌ Erreur chargement');
      return false;
    }
  }

  // ── Auto-refresh (ne s'exécute pas pendant une sauvegarde) ────────────────
  function startAutoRefresh(intervalMs = 30000) {
    if (autoRefreshInterval) clearInterval(autoRefreshInterval);
    autoRefreshInterval = setInterval(async () => {
      if (isSyncing) return; // verrou respecté
      const loaded = await load();
      if (loaded) Render.all();
    }, intervalMs);
  }

  function stopAutoRefresh() {
    if (autoRefreshInterval) clearInterval(autoRefreshInterval);
  }

  return { save, load, startAutoRefresh, stopAutoRefresh };
})();

window.syncSheets = Sync.save;
