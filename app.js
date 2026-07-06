/* ── Ready to Sell — Home Project ── */
'use strict';

const STORAGE_KEY = 'homeProjectData';

/* ── Seed data: all tasks with DIY + Pro estimates ──────────────────────────
   diyCost = materials only (labor is your time)
   proCost = full contractor price (labor + materials)
   diyHours = realistic hours for a capable DIYer
─────────────────────────────────────────────────────────────────────────── */
const SEED_CATEGORIES = [
  { id:'cat-mb', name:'Master Bedroom', icon:'🛏️', tasks:[
    { id:'mb1', name:'Finish trim on bathroom door',     diyHours:2,   diyCost:30,   proCost:150 },
    { id:'mb2', name:'Trim on bathroom closet',          diyHours:2,   diyCost:30,   proCost:150 },
    { id:'mb3', name:'Door for closet',                  diyHours:3,   diyCost:80,   proCost:300 },
    { id:'mb4', name:'Barn door for bathroom',           diyHours:4,   diyCost:200,  proCost:600 },
    { id:'mb5', name:'Caulk and paint',                  diyHours:4,   diyCost:40,   proCost:200 },
    { id:'mb6', name:'Floor transition pieces',          diyHours:1,   diyCost:25,   proCost:100 },
    { id:'mb7', name:'Trim for small wall in bedroom',   diyHours:1,   diyCost:20,   proCost:100 },
    { id:'mb8', name:'Paint the door',                   diyHours:1,   diyCost:15,   proCost:80  },
    { id:'mb9', name:'Reinstall smoke detector',         diyHours:0.5, diyCost:20,   proCost:75  },
  ]},
  { id:'cat-hb', name:'Hall Bathroom', icon:'🚿', tasks:[
    { id:'hb1', name:'Touch up paint job on the ceiling', diyHours:2, diyCost:25, proCost:150 },
  ]},
  { id:'cat-hw', name:'Hallway', icon:'🚪', tasks:[
    { id:'hw1', name:'Caulk and paint door and trim', diyHours:2, diyCost:30, proCost:150 },
  ]},
  { id:'cat-lb', name:'Little Boys Room', icon:'🧒', tasks:[
    { id:'lb1', name:'Trim on closet',    diyHours:2, diyCost:30,  proCost:150 },
    { id:'lb2', name:'Doors on closet',   diyHours:3, diyCost:80,  proCost:300 },
    { id:'lb3', name:'Flooring replaced', diyHours:8, diyCost:300, proCost:800 },
  ]},
  { id:'cat-is', name:"Isabelle's Room", icon:'👧', tasks:[
    { id:'is1', name:'Replace flooring',              diyHours:8, diyCost:300, proCost:800 },
    { id:'is2', name:'Curtain or door for her closet', diyHours:1, diyCost:40,  proCost:150 },
  ]},
  { id:'cat-kit', name:'Kitchen', icon:'🍳', tasks:[
    { id:'kit1', name:'Replace caulk on kitchen counters',  diyHours:1,   diyCost:15,  proCost:100 },
    { id:'kit2', name:'Fix oven',                            diyHours:2,   diyCost:50,  proCost:250 },
    { id:'kit3', name:'Get a bigger propane tank for stove', diyHours:0.5, diyCost:100, proCost:200 },
  ]},
  { id:'cat-dr', name:'Dining Room', icon:'🍽️', tasks:[
    { id:'dr1', name:'Patch missing drywall on the half wall',        diyHours:4, diyCost:30, proCost:200 },
    { id:'dr2', name:'Patch hole where internet cable comes in house', diyHours:1, diyCost:15, proCost:75  },
    { id:'dr3', name:'Paint trim',                                     diyHours:2, diyCost:20, proCost:150 },
  ]},
  { id:'cat-halfb', name:'Half Bath', icon:'🚽', tasks:[
    { id:'halfb1', name:'Caulk and paint trim',                  diyHours:2, diyCost:30, proCost:150 },
    { id:'halfb2', name:'Vent the bathroom from attic to outside', diyHours:4, diyCost:80, proCost:400 },
  ]},
  { id:'cat-lr', name:'Living Room', icon:'🛋️', tasks:[
    { id:'lr1', name:'Paint trim',                   diyHours:3, diyCost:30, proCost:200 },
    { id:'lr2', name:'Patch and touch up paint walls', diyHours:4, diyCost:40, proCost:250 },
    { id:'lr3', name:'Paint door',                   diyHours:1, diyCost:15, proCost:80  },
  ]},
  { id:'cat-sw', name:'Stairwell', icon:'🪜', tasks:[
    { id:'sw1', name:'Patch drywall and paint', diyHours:4, diyCost:40, proCost:250 },
    { id:'sw2', name:'Fix hole in the wall',    diyHours:2, diyCost:25, proCost:150 },
  ]},
  { id:'cat-bf', name:'Basement Family Room', icon:'🎮', tasks:[
    { id:'bf1', name:'Soffit for ductwork',         diyHours:8,  diyCost:150, proCost:600 },
    { id:'bf2', name:'Texture and paint soffit',    diyHours:4,  diyCost:40,  proCost:250 },
    { id:'bf3', name:'Replace window well window',  diyHours:3,  diyCost:100, proCost:300 },
    { id:'bf4', name:'Caulk and paint trim',        diyHours:2,  diyCost:30,  proCost:150 },
  ]},
  { id:'cat-mr', name:'Mud Room', icon:'👢', tasks:[
    { id:'mr1', name:'Drywall',    diyHours:8,  diyCost:200, proCost:800  },
    { id:'mr2', name:'Texture',    diyHours:4,  diyCost:50,  proCost:300  },
    { id:'mr3', name:'Paint',      diyHours:4,  diyCost:50,  proCost:250  },
    { id:'mr4', name:'Tile floor', diyHours:12, diyCost:400, proCost:1200 },
  ]},
  { id:'cat-bh', name:'Basement Hallway', icon:'🏚️', tasks:[
    { id:'bh1', name:'Soffit for ductwork', diyHours:8, diyCost:150, proCost:600 },
    { id:'bh2', name:'Drywall',             diyHours:6, diyCost:150, proCost:600 },
    { id:'bh3', name:'Texture and paint',   diyHours:4, diyCost:50,  proCost:300 },
    { id:'bh4', name:'Flooring',            diyHours:8, diyCost:300, proCost:800 },
  ]},
  { id:'cat-bb', name:'Basement Bathroom', icon:'🛁', tasks:[
    { id:'bb1', name:'Redo tile in tub area',           diyHours:16,  diyCost:400, proCost:1500 },
    { id:'bb2', name:'Replace trim piece behind toilet', diyHours:1,   diyCost:20,  proCost:100  },
    { id:'bb3', name:'New toilet seat',                  diyHours:0.5, diyCost:30,  proCost:100  },
    { id:'bb4', name:'Paint door',                       diyHours:1,   diyCost:15,  proCost:80   },
    { id:'bb5', name:'Caulk and paint trim',             diyHours:2,   diyCost:30,  proCost:150  },
  ]},
  { id:'cat-bigb', name:'Big Boys Room', icon:'👦', tasks:[
    { id:'bigb1', name:'Finish closet',         diyHours:4, diyCost:100, proCost:400 },
    { id:'bigb2', name:'Patch hole in drywall', diyHours:2, diyCost:25,  proCost:150 },
  ]},
  { id:'cat-la', name:"Lance and Aidan's Room", icon:'🛏️', tasks:[
    { id:'la1', name:'Replace window well window x2', diyHours:6, diyCost:200, proCost:600 },
    { id:'la2', name:'Fix damaged drywall',            diyHours:3, diyCost:40,  proCost:250 },
    { id:'la3', name:'Closet door or curtain',         diyHours:1, diyCost:40,  proCost:150 },
  ]},
  { id:'cat-th', name:'Throughout the House', icon:'🏠', tasks:[
    { id:'th1', name:'Repaint trim', diyHours:20, diyCost:150, proCost:1500 },
  ]},
  { id:'cat-out', name:'Outside', icon:'🌿', tasks:[
    { id:'out1',  name:'Roll off dumpster for trash collection',   diyHours:0,  diyCost:400,  proCost:400  },
    { id:'out2',  name:'Deck redone',                              diyHours:40, diyCost:1500, proCost:8000 },
    { id:'out3',  name:'Weed whack and mow everywhere',            diyHours:8,  diyCost:0,    proCost:300  },
    { id:'out4',  name:'Finish painting house',                    diyHours:40, diyCost:500,  proCost:3000 },
    { id:'out5',  name:'Replace trim from dog damage',             diyHours:6,  diyCost:100,  proCost:500  },
    { id:'out6',  name:'Replace weather stripping around doors',   diyHours:3,  diyCost:60,   proCost:200  },
    { id:'out7',  name:'Tile front step — front door',             diyHours:4,  diyCost:100,  proCost:400  },
    { id:'out8',  name:'Build a step into the house side entrance', diyHours:8, diyCost:200,  proCost:600  },
    { id:'out9',  name:'Build a step for entrance from backyard',   diyHours:8, diyCost:200,  proCost:600  },
    { id:'out10', name:'Replace ripped screens in windows',        diyHours:3,  diyCost:80,   proCost:300  },
    { id:'out11', name:'Finish front landscape',                   diyHours:16, diyCost:500,  proCost:2000 },
  ]},
];

/* ── State ── */
let state = {
  categories: [],
  mode: 'diy',
  calYear: new Date().getFullYear(),
  calMonth: new Date().getMonth(),
  calSelectedDay: null,
};

/* ── Helpers ── */
const uid = () => Math.random().toString(36).slice(2, 9);
const fmt$ = n => '$' + Number(n).toLocaleString('en-US');
const fmtHrs = h => h === 1 ? '1 hr' : (h % 1 === 0 ? h + ' hrs' : h + ' hrs');
const pad2 = n => String(n).padStart(2, '0');
const todayIso = () => { const d = new Date(); return `${d.getFullYear()}-${pad2(d.getMonth()+1)}-${pad2(d.getDate())}`; };

function showToast(msg, dur = 2800) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), dur);
}
window.showToast = showToast;

/* ── Save / Load ── */
function normalizeTasks(cats) {
  return cats.map(cat => ({
    id: cat.id || uid(),
    name: cat.name,
    icon: cat.icon || '📋',
    collapsed: cat.collapsed || false,
    tasks: (cat.tasks || []).map(t => ({
      id: t.id || uid(),
      name: t.name,
      completed: !!t.completed,
      dueDate: t.dueDate || null,
      diyHours: t.diyHours ?? 1,
      diyCost: t.diyCost ?? 0,
      proCost: t.proCost ?? 0,
      notes: t.notes || '',
    }))
  }));
}

function save() {
  const data = { categories: state.categories, mode: state.mode };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.cloudSync?.save(data);
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const d = JSON.parse(raw);
      state.categories = normalizeTasks(d.categories || SEED_CATEGORIES);
      state.mode = d.mode || 'diy';
    } else {
      state.categories = normalizeTasks(SEED_CATEGORIES);
      save();
    }
  } catch(e) {
    state.categories = normalizeTasks(SEED_CATEGORIES);
  }
}

window.applyCloudData = function(data) {
  if (!data || !data.categories) return;
  state.categories = normalizeTasks(data.categories);
  state.mode = data.mode || 'diy';
  render();
};

/* ── Tab switching ── */
let activeTab = 'tasks';
function switchTab(tab) {
  activeTab = tab;
  document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('pane-' + tab)?.classList.add('active');
  document.querySelector(`[data-tab="${tab}"]`)?.classList.add('active');
  render();
}

/* ── Mode toggle ── */
function setMode(m) {
  state.mode = m;
  document.querySelectorAll('.mode-btn').forEach(b => b.classList.toggle('active', b.dataset.mode === m));
  save();
  render();
}

/* ── Computed totals ── */
function calcTotals(cats) {
  let totalTasks = 0, doneTasks = 0, diyHours = 0, diyCost = 0, proCost = 0;
  cats.forEach(cat => {
    cat.tasks.forEach(t => {
      totalTasks++;
      if (t.completed) doneTasks++;
      else { diyHours += t.diyHours; diyCost += t.diyCost; proCost += t.proCost; }
    });
  });
  return { totalTasks, doneTasks, diyHours, diyCost, proCost };
}

/* ── Main render ── */
function render() {
  if (activeTab === 'tasks') renderTasks();
  else if (activeTab === 'calendar') renderCalendar();
  else if (activeTab === 'summary') renderSummary();
}

/* ══════════════════════════════════════════════════════════════
   TASKS TAB
══════════════════════════════════════════════════════════════ */
function renderTasks() {
  if (window.isReadOnly) document.body.classList.add('read-only');
  const pane = document.getElementById('pane-tasks');
  const totals = calcTotals(state.categories);
  const pct = totals.totalTasks > 0 ? Math.round((totals.doneTasks / totals.totalTasks) * 100) : 0;

  const remaining = state.mode === 'diy' ? totals.diyCost : totals.proCost;
  const modeLabel = state.mode === 'diy' ? 'DIY' : 'Pro';

  pane.innerHTML = `
    ${window.isReadOnly ? '' : `
    <div class="mode-toggle-wrap">
      <div class="mode-toggle">
        <button class="mode-btn${state.mode==='diy'?' active':''}" data-mode="diy" onclick="setMode('diy')">🔨 DIY</button>
        <button class="mode-btn${state.mode==='pro'?' active':''}" data-mode="pro" onclick="setMode('pro')">👷 Professional</button>
      </div>
      <span class="mode-label">Showing ${modeLabel} estimates</span>
    </div>`}

    <div class="progress-wrap">
      <div class="progress-header">
        <span class="progress-title">Overall Progress</span>
        <span class="progress-pct">${pct}%</span>
      </div>
      <div class="progress-bar-track">
        <div class="progress-bar-fill" style="width:${pct}%"></div>
      </div>
      <div class="progress-stats">
        <span>✅ ${totals.doneTasks} of ${totals.totalTasks} tasks complete</span>
        <span>⏱ ${fmtHrs(totals.diyHours)} remaining</span>
        <span>💰 ${fmt$(remaining)} remaining cost</span>
      </div>
    </div>

    ${window.isReadOnly ? '' : `
    <div class="add-category-wrap">
      <div class="section-header-row">
        <span></span>
        <button class="btn btn-ghost" onclick="toggleAddCategory()">+ Add Category</button>
      </div>
      <div class="add-category-row" id="addCatRow">
        <input class="add-cat-input" id="newCatName" placeholder="Category name (e.g. Garage)" />
        <select id="newCatIcon" style="border:1px solid var(--border);border-radius:6px;padding:8px;font-size:1rem">
          ${['🏠','🛏️','🚿','🍳','🛋️','🚽','🪜','🎮','🌿','🔧','📋','🏚️','🛁','👢','👦','👧'].map(e=>`<option value="${e}">${e}</option>`).join('')}
        </select>
        <button class="btn btn-primary" onclick="addCategory()">Add</button>
        <button class="btn btn-ghost" onclick="toggleAddCategory()">Cancel</button>
      </div>
    </div>`}

    <div id="categoryList">
      ${state.categories.map(cat => renderCategory(cat)).join('')}
    </div>
  `;
}

function renderCategory(cat) {
  const done = cat.tasks.filter(t => t.completed).length;
  const total = cat.tasks.length;
  const allDone = done === total && total > 0;
  const catCost = cat.tasks.filter(t => !t.completed)
    .reduce((s, t) => s + (state.mode === 'diy' ? t.diyCost : t.proCost), 0);

  return `
  <div class="category-card${cat.collapsed ? ' collapsed' : ''}" id="cat-${cat.id}">
    <div class="category-header" onclick="toggleCategory('${cat.id}')">
      <div class="category-name-wrap">
        <span class="category-icon">${cat.icon}</span>
        <div>
          <div class="category-name">${cat.name}</div>
          <div class="category-meta">${total} tasks · ${fmt$(catCost)} remaining</div>
        </div>
      </div>
      <div class="category-actions">
        <span class="cat-progress-pill${allDone?' done':''}">${done}/${total}</span>
        ${window.isReadOnly ? '' : `<button class="btn-icon-sm" onclick="event.stopPropagation();deleteCategory('${cat.id}')" title="Delete category" style="color:var(--red)">🗑</button>`}
        <span class="chevron">▼</span>
      </div>
    </div>
    <div class="category-body">
      <div class="task-list">
        ${cat.tasks.map(t => renderTask(cat.id, t)).join('')}
      </div>
      ${window.isReadOnly ? '' : `
      <div class="add-task-row">
        <input class="add-task-input" id="newTask-${cat.id}" placeholder="Add a task…" onkeydown="if(event.key==='Enter')addTask('${cat.id}')" />
        <button class="btn-add-task" onclick="addTask('${cat.id}')">Add</button>
      </div>`}
    </div>
  </div>`;
}

function renderTask(catId, t) {
  const cost = state.mode === 'diy' ? t.diyCost : t.proCost;
  const isOverdue = t.dueDate && !t.completed && t.dueDate < todayIso();
  return `
  <div class="task-row${t.completed ? ' completed' : ''}" id="task-${t.id}">
    <input type="checkbox" class="task-checkbox" ${t.completed ? 'checked' : ''}
      onchange="toggleTask('${catId}','${t.id}',this.checked)" />
    <div class="task-main">
      <div class="task-name">${t.name}</div>
      <div class="task-detail-row">
        <input type="date" class="task-date-input" value="${t.dueDate || ''}"
          style="${isOverdue ? 'border-color:var(--red);color:var(--red)' : ''}"
          onchange="setDueDate('${catId}','${t.id}',this.value)" title="Due date" />
        <span class="task-pill pill-hours">⏱ ${fmtHrs(t.diyHours)}</span>
        <span class="task-pill pill-cost${state.mode==='pro'?' pro':''}">
          ${state.mode==='diy' ? '🔨' : '👷'} ${fmt$(cost)}
        </span>
        ${!window.isReadOnly ? `<button class="task-notes-toggle" onclick="toggleNotes('${t.id}')">notes</button>` : ''}
      </div>
      <div class="task-notes-wrap" id="notes-${t.id}">
        <textarea class="task-notes" placeholder="Add notes…"
          onchange="saveNotes('${catId}','${t.id}',this.value)">${t.notes || ''}</textarea>
      </div>
    </div>
    ${window.isReadOnly ? '' : `
    <div class="task-actions">
      <button class="btn-icon-sm" onclick="deleteTask('${catId}','${t.id}')" title="Delete">🗑</button>
    </div>`}
  </div>`;
}

/* ── Task actions ── */
function toggleCategory(catId) {
  const cat = state.categories.find(c => c.id === catId);
  if (cat) { cat.collapsed = !cat.collapsed; save(); render(); }
}

function toggleTask(catId, taskId, checked) {
  const cat = state.categories.find(c => c.id === catId);
  const task = cat?.tasks.find(t => t.id === taskId);
  if (task) { task.completed = checked; save(); render(); }
}

function setDueDate(catId, taskId, val) {
  const cat = state.categories.find(c => c.id === catId);
  const task = cat?.tasks.find(t => t.id === taskId);
  if (task) { task.dueDate = val || null; save(); }
}

function saveNotes(catId, taskId, val) {
  const cat = state.categories.find(c => c.id === catId);
  const task = cat?.tasks.find(t => t.id === taskId);
  if (task) { task.notes = val; save(); }
}

function toggleNotes(taskId) {
  const el = document.getElementById('notes-' + taskId);
  if (el) el.classList.toggle('open');
}

function addTask(catId) {
  const input = document.getElementById('newTask-' + catId);
  const name = input?.value.trim();
  if (!name) return;
  const cat = state.categories.find(c => c.id === catId);
  if (!cat) return;
  cat.tasks.push({ id: uid(), name, completed: false, dueDate: null, diyHours: 2, diyCost: 50, proCost: 200, notes: '' });
  input.value = '';
  save(); render();
}

function deleteTask(catId, taskId) {
  if (!confirm('Delete this task?')) return;
  const cat = state.categories.find(c => c.id === catId);
  if (!cat) return;
  cat.tasks = cat.tasks.filter(t => t.id !== taskId);
  save(); render();
}

function toggleAddCategory() {
  const row = document.getElementById('addCatRow');
  if (row) row.classList.toggle('open');
}

function addCategory() {
  const name = document.getElementById('newCatName')?.value.trim();
  const icon = document.getElementById('newCatIcon')?.value || '📋';
  if (!name) return;
  state.categories.push({ id: uid(), name, icon, collapsed: false, tasks: [] });
  save(); render();
}

function deleteCategory(catId) {
  const cat = state.categories.find(c => c.id === catId);
  if (!confirm(`Delete "${cat?.name}" and all its tasks?`)) return;
  state.categories = state.categories.filter(c => c.id !== catId);
  save(); render();
}

/* ══════════════════════════════════════════════════════════════
   CALENDAR TAB
══════════════════════════════════════════════════════════════ */
function renderCalendar() {
  const pane = document.getElementById('pane-calendar');
  const { calYear: y, calMonth: m, calSelectedDay: sel } = state;

  // Build task index by date
  const byDate = {};
  state.categories.forEach(cat => {
    cat.tasks.forEach(t => {
      if (t.dueDate) {
        if (!byDate[t.dueDate]) byDate[t.dueDate] = [];
        byDate[t.dueDate].push({ ...t, catName: cat.name });
      }
    });
  });

  const monthName = new Date(y, m, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const firstDay = new Date(y, m, 1).getDay();
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const daysInPrev = new Date(y, m, 0).getDate();
  const today = todayIso();

  let cells = '';
  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;

  for (let i = 0; i < totalCells; i++) {
    let day, dateStr, isOther = false;
    if (i < firstDay) {
      day = daysInPrev - firstDay + i + 1;
      const pm = m === 0 ? 12 : m;
      const py = m === 0 ? y - 1 : y;
      dateStr = `${py}-${pad2(pm)}-${pad2(day)}`;
      isOther = true;
    } else if (i >= firstDay + daysInMonth) {
      day = i - firstDay - daysInMonth + 1;
      const nm = m === 11 ? 1 : m + 2;
      const ny = m === 11 ? y + 1 : y;
      dateStr = `${ny}-${pad2(nm)}-${pad2(day)}`;
      isOther = true;
    } else {
      day = i - firstDay + 1;
      dateStr = `${y}-${pad2(m + 1)}-${pad2(day)}`;
    }
    const isToday = dateStr === today;
    const tasks = byDate[dateStr] || [];
    const dotLimit = 3;
    const dots = tasks.slice(0, dotLimit).map(t => {
      const cls = t.completed ? 'done' : (dateStr < today ? 'overdue' : '');
      return `<div class="cal-task-dot ${cls}" title="${t.name}">${t.name}</div>`;
    }).join('');
    const more = tasks.length > dotLimit ? `<div class="cal-task-dot" style="background:#e5e7eb;color:#6b7280">+${tasks.length - dotLimit} more</div>` : '';

    cells += `<div class="cal-cell${isOther?' other-month':''}${isToday?' today':''}" onclick="selectCalDay('${dateStr}')">
      <div class="cal-day-num">${day}</div>
      ${dots}${more}
    </div>`;
  }

  let panelHtml = '';
  if (sel && byDate[sel]) {
    const selDate = new Date(sel + 'T00:00:00').toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric' });
    const tasks = byDate[sel];
    panelHtml = `<div class="cal-panel">
      <div class="cal-panel-title">📅 ${selDate}</div>
      ${tasks.map(t => `
        <div class="cal-panel-task">
          <span style="margin-right:6px">${t.completed ? '✅' : '⬜'}</span>
          <strong>${t.name}</strong>
          <div class="task-cat">${t.catName} · ${fmt$(state.mode==='diy' ? t.diyCost : t.proCost)} ${state.mode} · ${fmtHrs(t.diyHours)}</div>
        </div>`).join('')}
    </div>`;
  }

  pane.innerHTML = `
    <div class="calendar-wrap">
      <div class="calendar-header">
        <button class="cal-nav-btn" onclick="calNav(-1)">◀</button>
        <div class="cal-title">${monthName}</div>
        <button class="cal-nav-btn" onclick="calNav(1)">▶</button>
      </div>
      <div class="cal-grid">
        ${['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d=>`<div class="cal-day-header">${d}</div>`).join('')}
        ${cells}
      </div>
    </div>
    ${panelHtml}
  `;
}

function calNav(dir) {
  state.calMonth += dir;
  if (state.calMonth < 0) { state.calMonth = 11; state.calYear--; }
  if (state.calMonth > 11) { state.calMonth = 0; state.calYear++; }
  render();
}

function selectCalDay(dateStr) {
  state.calSelectedDay = state.calSelectedDay === dateStr ? null : dateStr;
  render();
}

/* ══════════════════════════════════════════════════════════════
   SUMMARY TAB
══════════════════════════════════════════════════════════════ */
function renderSummary() {
  const pane = document.getElementById('pane-summary');
  const totals = calcTotals(state.categories);
  const pct = totals.totalTasks > 0 ? Math.round((totals.doneTasks / totals.totalTasks) * 100) : 0;
  const currentCost = state.mode === 'diy' ? totals.diyCost : totals.proCost;
  const otherCost   = state.mode === 'diy' ? totals.proCost : totals.diyCost;
  const otherLabel  = state.mode === 'diy' ? 'Pro' : 'DIY';
  const savings     = totals.proCost - totals.diyCost;

  const rows = state.categories.map(cat => {
    const done = cat.tasks.filter(t => t.completed).length;
    const total = cat.tasks.length;
    const catPct = total > 0 ? Math.round((done / total) * 100) : 0;
    const catDiy  = cat.tasks.filter(t=>!t.completed).reduce((s,t)=>s+t.diyCost,0);
    const catPro  = cat.tasks.filter(t=>!t.completed).reduce((s,t)=>s+t.proCost,0);
    const catHrs  = cat.tasks.filter(t=>!t.completed).reduce((s,t)=>s+t.diyHours,0);
    const shown   = state.mode === 'diy' ? catDiy : catPro;
    return `<tr>
      <td>${cat.icon} ${cat.name}</td>
      <td><div style="display:flex;align-items:center;gap:8px">
        <div class="cat-progress-bar-wrap"><div class="cat-progress-bar-fill" style="width:${catPct}%"></div></div>
        <span style="font-size:0.78rem;color:var(--muted)">${done}/${total}</span>
      </div></td>
      <td>${fmtHrs(catHrs)}</td>
      <td class="${state.mode==='diy'?'cost-green':'cost-amber'}">${fmt$(shown)}</td>
      <td style="color:var(--muted);font-size:0.82rem">${fmt$(state.mode==='diy'?catPro:catDiy)}</td>
    </tr>`;
  }).join('');

  pane.innerHTML = `
    <div class="mode-toggle-wrap">
      <div class="mode-toggle">
        <button class="mode-btn${state.mode==='diy'?' active':''}" data-mode="diy" onclick="setMode('diy')">🔨 DIY</button>
        <button class="mode-btn${state.mode==='pro'?' active':''}" data-mode="pro" onclick="setMode('pro')">👷 Professional</button>
      </div>
      <span class="mode-label">Showing ${state.mode === 'diy' ? 'DIY' : 'Professional'} estimates</span>
    </div>

    <div class="summary-grid">
      <div class="stat-card">
        <div class="stat-label">Tasks Complete</div>
        <div class="stat-value">${pct}%</div>
        <div class="stat-sub">${totals.doneTasks} of ${totals.totalTasks} tasks</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Hours Remaining</div>
        <div class="stat-value">${totals.diyHours}</div>
        <div class="stat-sub">DIY hours left</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">${state.mode === 'diy' ? 'DIY' : 'Pro'} Cost Left</div>
        <div class="stat-value" style="font-size:1.4rem">${fmt$(currentCost)}</div>
        <div class="stat-sub">${otherLabel}: ${fmt$(otherCost)}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">DIY Savings vs Pro</div>
        <div class="stat-value" style="color:var(--amber);font-size:1.4rem">${fmt$(savings)}</div>
        <div class="stat-sub">going DIY saves this</div>
      </div>
    </div>

    <div class="summary-table-wrap">
      <table class="summary-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Progress</th>
            <th>DIY Hours</th>
            <th>${state.mode === 'diy' ? '🔨 DIY Cost' : '👷 Pro Cost'}</th>
            <th>${state.mode === 'diy' ? 'Pro alt.' : 'DIY alt.'}</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>

    <div class="total-bar">
      <div>
        <div class="total-bar-label">Total Remaining Cost (${state.mode === 'diy' ? 'DIY' : 'Professional'})</div>
        <div class="total-bar-compare">vs ${otherLabel}: ${fmt$(otherCost)}</div>
      </div>
      <div style="text-align:right">
        <div class="total-bar-amount">${fmt$(currentCost)}</div>
        <div class="total-bar-hours">${fmtHrs(totals.diyHours)} of work remaining</div>
      </div>
    </div>
  `;
}

/* ── Boot ── */
document.addEventListener('DOMContentLoaded', () => {
  if (!window.isReadOnly) {
    load();
  }
  render();
});
