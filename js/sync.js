// ─── SYNC MODULE ─────────────────────────────────────────────────────────────
// Gère toute la communication avec Google Sheets via Apps Script
// Corrections : verrou isSyncing, mode POST, gestion de file d'attente
// ─────────────────────────────────────────────────────────────────────────────

const Sync = (() => {
  // ── État interne ──────────────────────────────────────────────────────────
  let isSyncing = false;          // Verrou : empêche les sauvegardes simultanées
  let pendingSave = false;        // File d'attente : une sauvegarde est-elle en attente ?
  let autoRefreshInterval = null;

  // ── Utilitaires UI ────────────────────────────────────────────────────────
  function setStatus(msg) {
    const el = document.getElementById('sync-st');
    if (el) el.textContent = msg;
  }
  function setBtn(disabled) {
    const btn = document.querySelector('.sync-btn');
    if (btn) btn.disabled = disabled;
  }

  // ── SAVE → Google Sheets (POST pour éviter la limite d'URL) ───────────────
  async function save() {
    // Si une sauvegarde est déjà en cours, mémoriser et sortir
    if (isSyncing) {
      pendingSave = true;
      return;
    }
    isSyncing = true;
    pendingSave = false;
    setBtn(true);
    setStatus('⏳ Sauvegarde...');

    const state = {
      Taches:       window.S.tasks,
      Budget:       window.S.budget,
      Benevoles:    window.S.volunteers,
      Prestataires: window.S.providers,
      Invites:      window.S.guests,
      Lieux:        window.S.venues,
    };

    let success = false;
    try {
      const res = await fetch(window.API_URL, {
        method: 'POST',
        // Apps Script accepte le body en text/plain (CORS simplifié)
        headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
        body: JSON.stringify({ action: 'writeAll', data: state }),
      });
      if (res.ok) {
        const json = await res.json().catch(() => ({}));
        success = json.success !== false;
      }
    } catch (e) {
      console.warn('[Sync] POST failed, trying GET fallback...', e);
      // Fallback GET (petits payloads uniquement)
      try {
        const url = window.API_URL + '?action=writeAll&data=' + encodeURIComponent(JSON.stringify(state));
        const res2 = await fetch(url);
        success = res2.ok;
      } catch (e2) {
        console.error('[Sync] Both methods failed', e2);
      }
    }

    isSyncing = false;
    setBtn(false);

    if (success) {
      setStatus('✅ ' + new Date().toLocaleTimeString('fr-FR'));
      UI.showToast('✅ Google Sheets synchronisé !', 'ok');
    } else {
      setStatus('❌ Erreur sync');
      UI.showToast('❌ Erreur — vérifie l\'Apps Script', 'err');
    }

    // Si une sauvegarde était en attente, la déclencher maintenant
    if (pendingSave) {
      await save();
    }
  }

  // ── LOAD ← Google Sheets ──────────────────────────────────────────────────
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

      if (tasks.length === 0 && budget.length === 0) {
        setStatus('⚠️ Sheets vide — données initiales');
        return false;
      }

      window.S.tasks      = tasks.map(t => ({ ...t, id: Number(t.id) || t.id }));
      window.S.budget     = budget.map(b => ({ ...b, id: Number(b.id) || b.id, amount: parseFloat(b.amount) || 0 }));
      window.S.volunteers = volunteers.map(v => ({ ...v, id: Number(v.id) || v.id }));
      window.S.providers  = providers.map(p => ({ ...p, id: Number(p.id) || p.id, price: parseFloat(p.price) || 0 }));
      window.S.guests     = guests.map(g => ({ ...g, id: Number(g.id) || g.id }));
      window.S.venues     = venues.map(v => ({ ...v, id: Number(v.id) || v.id, cap: parseInt(v.cap) || 0, price: parseFloat(v.price) || 0 }));

      setStatus('✅ ' + new Date().toLocaleTimeString('fr-FR'));
      return true;
    } catch (e) {
      console.error('[Sync] load failed', e);
      setStatus('❌ Erreur chargement');
      return false;
    }
  }

  // ── Auto-refresh (ne se déclenche PAS si une sauvegarde est en cours) ──────
  function startAutoRefresh(intervalMs = 30000) {
    if (autoRefreshInterval) clearInterval(autoRefreshInterval);
    autoRefreshInterval = setInterval(async () => {
      if (isSyncing) return;             // ← verrou respecté
      const loaded = await load();
      if (loaded) Render.all();
    }, intervalMs);
  }

  function stopAutoRefresh() {
    if (autoRefreshInterval) clearInterval(autoRefreshInterval);
  }

  // ── Export public ─────────────────────────────────────────────────────────
  return { save, load, startAutoRefresh, stopAutoRefresh };
})();

// Alias global pour rétrocompatibilité
window.syncSheets = Sync.save;
