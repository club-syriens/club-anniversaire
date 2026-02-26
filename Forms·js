// ─── FORMS MODULE ─────────────────────────────────────────────────────────────
// Gestion de tous les formulaires (création + édition)
// ─────────────────────────────────────────────────────────────────────────────

const Forms = (() => {

  // ── TÂCHE ─────────────────────────────────────────────────────────────────
  function saveTask() {
    const fr = document.getElementById('ti-title').value.trim();
    if (!fr) { UI.showToast('Titre requis', 'err'); return; }
    const eid = parseInt(document.getElementById('te-id').value) || 0;
    const item = {
      id:     eid || Date.now(),
      fr,
      ar:     document.getElementById('ti-ar').value,
      dept:   document.getElementById('ti-dept').value,
      owner:  document.getElementById('ti-owner').value,
      vols:   document.getElementById('ti-vols').value,
      date:   document.getElementById('ti-date').value,
      status: document.getElementById('ti-status').value,
      notes:  document.getElementById('ti-notes').value,
    };
    if (eid) window.S.tasks = window.S.tasks.map(t => t.id === eid ? item : t);
    else window.S.tasks.push(item);
    Sync.save(); UI.closeMo('mo-task'); Render.all();
    UI.showToast('Tâche sauvegardée ✅', 'ok');
  }

  function editTask(id) {
    const t = window.S.tasks.find(x => x.id === id);
    if (!t) return;
    document.getElementById('mo-task-t').textContent       = 'Modifier';
    document.getElementById('te-id').value                 = id;
    document.getElementById('ti-title').value              = t.fr;
    document.getElementById('ti-ar').value                 = t.ar || '';
    document.getElementById('ti-dept').value               = t.dept;
    document.getElementById('ti-owner').value              = t.owner || '';
    document.getElementById('ti-vols').value               = t.vols || '';
    document.getElementById('ti-date').value               = t.date || '';
    document.getElementById('ti-status').value             = t.status;
    document.getElementById('ti-notes').value              = t.notes || '';
    UI.openMo('task');
  }

  // ── BUDGET ────────────────────────────────────────────────────────────────
  function saveBudget() {
    const desc = document.getElementById('bi-desc').value.trim();
    if (!desc) { UI.showToast('Description requise', 'err'); return; }
    const eid = parseInt(document.getElementById('be-id').value) || 0;
    const item = {
      id:     eid || Date.now(),
      desc,
      cat:    document.getElementById('bi-cat').value,
      type:   document.getElementById('bi-type').value,
      amount: parseFloat(document.getElementById('bi-amt').value) || 0,
      status: document.getElementById('bi-status').value,
    };
    if (eid) window.S.budget = window.S.budget.map(b => b.id === eid ? item : b);
    else window.S.budget.push(item);
    Sync.save(); UI.closeMo('mo-budget'); Render.all();
    UI.showToast('Budget mis à jour ✅', 'ok');
  }

  function editBudget(id) {
    const b = window.S.budget.find(x => x.id === id);
    if (!b) return;
    document.getElementById('be-id').value      = id;
    document.getElementById('bi-desc').value    = b.desc;
    document.getElementById('bi-cat').value     = b.cat;
    document.getElementById('bi-type').value    = b.type;
    document.getElementById('bi-amt').value     = b.amount;
    document.getElementById('bi-status').value  = b.status;
    UI.openMo('budget');
  }

  // ── LIEU ──────────────────────────────────────────────────────────────────
  function saveVenue() {
    const name = document.getElementById('vi-name').value.trim();
    if (!name) { UI.showToast('Nom requis', 'err'); return; }
    const eid = parseInt(document.getElementById('ve-id').value) || 0;
    const item = {
      id:     eid || Date.now(),
      name,
      addr:   document.getElementById('vi-addr').value,
      cap:    parseInt(document.getElementById('vi-cap').value) || 0,
      price:  parseFloat(document.getElementById('vi-price').value) || 0,
      status: document.getElementById('vi-status').value,
      notes:  document.getElementById('vi-notes').value,
    };
    if (eid) window.S.venues = window.S.venues.map(v => v.id === eid ? item : v);
    else window.S.venues.push(item);
    Sync.save(); UI.closeMo('mo-venue'); Render.all();
    UI.showToast('Lieu enregistré ✅', 'ok');
  }

  function editVenue(id) {
    const v = window.S.venues.find(x => x.id === id);
    if (!v) return;
    document.getElementById('ve-id').value       = id;
    document.getElementById('vi-name').value     = v.name;
    document.getElementById('vi-addr').value     = v.addr || '';
    document.getElementById('vi-cap').value      = v.cap || '';
    document.getElementById('vi-price').value    = v.price || '';
    document.getElementById('vi-status').value   = v.status;
    document.getElementById('vi-notes').value    = v.notes || '';
    UI.openMo('venue');
  }

  // ── BÉNÉVOLE ──────────────────────────────────────────────────────────────
  function saveVol() {
    const name = document.getElementById('voi-name').value.trim();
    if (!name) { UI.showToast('Nom requis', 'err'); return; }
    const eid = parseInt(document.getElementById('voe-id').value) || 0;
    const item = {
      id:    eid || Date.now(),
      name,
      role:  document.getElementById('voi-role').value,
      email: document.getElementById('voi-email').value,
      phone: document.getElementById('voi-phone').value,
      avail: document.getElementById('voi-avail').value,
    };
    if (eid) window.S.volunteers = window.S.volunteers.map(v => v.id === eid ? item : v);
    else window.S.volunteers.push(item);
    Sync.save(); UI.closeMo('mo-vol'); Render.all();
    UI.showToast('Bénévole ajouté ✅', 'ok');
  }

  function editVol(id) {
    const v = window.S.volunteers.find(x => x.id === id);
    if (!v) return;
    document.getElementById('voe-id').value      = id;
    document.getElementById('voi-name').value    = v.name;
    document.getElementById('voi-role').value    = v.role || '';
    document.getElementById('voi-email').value   = v.email || '';
    document.getElementById('voi-phone').value   = v.phone || '';
    document.getElementById('voi-avail').value   = v.avail;
    UI.openMo('vol');
  }

  // ── PRESTATAIRE ───────────────────────────────────────────────────────────
  function saveProv() {
    const name = document.getElementById('pri-name').value.trim();
    if (!name) { UI.showToast('Nom requis', 'err'); return; }
    const eid = parseInt(document.getElementById('pre-id').value) || 0;
    const item = {
      id:      eid || Date.now(),
      name,
      cat:     document.getElementById('pri-cat').value,
      contact: document.getElementById('pri-contact').value,
      price:   parseFloat(document.getElementById('pri-price').value) || 0,
      status:  document.getElementById('pri-status').value,
      notes:   document.getElementById('pri-notes').value,
    };
    if (eid) window.S.providers = window.S.providers.map(p => p.id === eid ? item : p);
    else window.S.providers.push(item);
    Sync.save(); UI.closeMo('mo-prov'); Render.all();
    UI.showToast('Prestataire ajouté ✅', 'ok');
  }

  function editProv(id) {
    const p = window.S.providers.find(x => x.id === id);
    if (!p) return;
    document.getElementById('pre-id').value        = id;
    document.getElementById('pri-name').value      = p.name;
    document.getElementById('pri-cat').value       = p.cat;
    document.getElementById('pri-contact').value   = p.contact || '';
    document.getElementById('pri-price').value     = p.price || '';
    document.getElementById('pri-status').value    = p.status;
    document.getElementById('pri-notes').value     = p.notes || '';
    UI.openMo('prov');
  }

  // ── INVITÉ ────────────────────────────────────────────────────────────────
  function saveGuest() {
    const name = document.getElementById('gi-name').value.trim();
    if (!name) { UI.showToast('Nom requis', 'err'); return; }
    const eid = parseInt(document.getElementById('ge-id').value) || 0;
    const item = {
      id:     eid || Date.now(),
      name,
      email:  document.getElementById('gi-email').value,
      phone:  document.getElementById('gi-phone').value,
      status: document.getElementById('gi-status').value,
      ticket: document.getElementById('gi-ticket').value,
      notes:  document.getElementById('gi-notes').value,
    };
    if (eid) window.S.guests = window.S.guests.map(g => g.id === eid ? item : g);
    else window.S.guests.push(item);
    Sync.save(); UI.closeMo('mo-guest'); Render.all();
    UI.showToast('Invité ajouté ✅', 'ok');
  }

  function editGuest(id) {
    const g = window.S.guests.find(x => x.id === id);
    if (!g) return;
    document.getElementById('ge-id').value       = id;
    document.getElementById('gi-name').value     = g.name;
    document.getElementById('gi-email').value    = g.email || '';
    document.getElementById('gi-phone').value    = g.phone || '';
    document.getElementById('gi-status').value   = g.status;
    document.getElementById('gi-ticket').value   = g.ticket;
    document.getElementById('gi-notes').value    = g.notes || '';
    UI.openMo('guest');
  }

  return {
    saveTask, editTask,
    saveBudget, editBudget,
    saveVenue, editVenue,
    saveVol, editVol,
    saveProv, editProv,
    saveGuest, editGuest,
  };
})();
