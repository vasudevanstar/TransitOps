// ==========================================================================
// TransitOps Core Client-Side Logic & State Manager
// Complete Enterprise RBAC System Version
// ==========================================================================

// --- 1. SEED DATABASE SCHEMAS ---

// Complete 14 modules x 6 actions (view, create, update, delete, approve, export) for 6 roles
const DEFAULT_RBAC_MATRIX = {
  "Administrator": {
    dashboard: { view: true, create: true, update: true, delete: true, approve: true, export: true },
    vehicleRegistry: { view: true, create: true, update: true, delete: true, approve: true, export: true },
    driverManagement: { view: true, create: true, update: true, delete: true, approve: true, export: true },
    tripDispatcher: { view: true, create: true, update: true, delete: true, approve: true, export: true },
    maintenance: { view: true, create: true, update: true, delete: true, approve: true, export: true },
    fuelManagement: { view: true, create: true, update: true, delete: true, approve: true, export: true },
    expenseManagement: { view: true, create: true, update: true, delete: true, approve: true, export: true },
    reportsAnalytics: { view: true, create: true, update: true, delete: true, approve: true, export: true },
    notifications: { view: true, create: true, update: true, delete: true, approve: true, export: true },
    userManagement: { view: true, create: true, update: true, delete: true, approve: true, export: true },
    roleManagement: { view: true, create: true, update: true, delete: true, approve: true, export: true },
    auditLogs: { view: true, create: true, update: true, delete: true, approve: true, export: true },
    companySettings: { view: true, create: true, update: true, delete: true, approve: true, export: true },
    profile: { view: true, create: true, update: true, delete: true, approve: true, export: true }
  },
  "Fleet Manager": {
    dashboard: { view: true, create: false, update: false, delete: false, approve: false, export: true },
    vehicleRegistry: { view: true, create: true, update: true, delete: true, approve: false, export: true },
    driverManagement: { view: true, create: false, update: false, delete: false, approve: false, export: false },
    tripDispatcher: { view: true, create: false, update: false, delete: false, approve: false, export: false },
    maintenance: { view: true, create: true, update: true, delete: true, approve: true, export: true },
    fuelManagement: { view: true, create: false, update: false, delete: false, approve: false, export: true },
    expenseManagement: { view: true, create: false, update: false, delete: false, approve: false, export: true },
    reportsAnalytics: { view: true, create: false, update: false, delete: false, approve: false, export: true },
    notifications: { view: true, create: true, update: true, delete: false, approve: false, export: false },
    userManagement: { view: false, create: false, update: false, delete: false, approve: false, export: false },
    roleManagement: { view: false, create: false, update: false, delete: false, approve: false, export: false },
    auditLogs: { view: false, create: false, update: false, delete: false, approve: false, export: false },
    companySettings: { view: false, create: false, update: false, delete: false, approve: false, export: false },
    profile: { view: true, create: false, update: true, delete: false, approve: false, export: false }
  },
  "Dispatcher": {
    dashboard: { view: true, create: false, update: false, delete: false, approve: false, export: true },
    vehicleRegistry: { view: true, create: false, update: false, delete: false, approve: false, export: false },
    driverManagement: { view: true, create: false, update: false, delete: false, approve: false, export: false },
    tripDispatcher: { view: true, create: true, update: true, delete: true, approve: true, export: true },
    maintenance: { view: true, create: false, update: false, delete: false, approve: false, export: false },
    fuelManagement: { view: true, create: false, update: false, delete: false, approve: false, export: false },
    expenseManagement: { view: true, create: false, update: false, delete: false, approve: false, export: false },
    reportsAnalytics: { view: true, create: false, update: false, delete: false, approve: false, export: false },
    notifications: { view: true, create: true, update: true, delete: false, approve: false, export: false },
    userManagement: { view: false, create: false, update: false, delete: false, approve: false, export: false },
    roleManagement: { view: false, create: false, update: false, delete: false, approve: false, export: false },
    auditLogs: { view: false, create: false, update: false, delete: false, approve: false, export: false },
    companySettings: { view: false, create: false, update: false, delete: false, approve: false, export: false },
    profile: { view: true, create: false, update: true, delete: false, approve: false, export: false }
  },
  "Driver": {
    dashboard: { view: true, create: false, update: false, delete: false, approve: false, export: false },
    vehicleRegistry: { view: true, create: false, update: false, delete: false, approve: false, export: false }, // own details
    driverManagement: { view: true, create: false, update: false, delete: false, approve: false, export: false }, // self profile
    tripDispatcher: { view: true, create: false, update: true, delete: false, approve: false, export: false }, // own trips status updates
    maintenance: { view: true, create: true, update: false, delete: false, approve: false, export: false }, // report issues
    fuelManagement: { view: false, create: false, update: false, delete: false, approve: false, export: false },
    expenseManagement: { view: false, create: false, update: false, delete: false, approve: false, export: false },
    reportsAnalytics: { view: false, create: false, update: false, delete: false, approve: false, export: false },
    notifications: { view: true, create: false, update: false, delete: false, approve: false, export: false },
    userManagement: { view: false, create: false, update: false, delete: false, approve: false, export: false },
    roleManagement: { view: false, create: false, update: false, delete: false, approve: false, export: false },
    auditLogs: { view: false, create: false, update: false, delete: false, approve: false, export: false },
    companySettings: { view: false, create: false, update: false, delete: false, approve: false, export: false },
    profile: { view: true, create: false, update: true, delete: false, approve: false, export: false }
  },
  "Safety Officer": {
    dashboard: { view: true, create: false, update: false, delete: false, approve: false, export: true },
    vehicleRegistry: { view: true, create: false, update: false, delete: false, approve: false, export: false },
    driverManagement: { view: true, create: true, update: true, delete: true, approve: true, export: true },
    tripDispatcher: { view: true, create: false, update: false, delete: false, approve: false, export: false },
    maintenance: { view: true, create: false, update: true, delete: false, approve: true, export: true }, // inspections
    fuelManagement: { view: false, create: false, update: false, delete: false, approve: false, export: false },
    expenseManagement: { view: false, create: false, update: false, delete: false, approve: false, export: false },
    reportsAnalytics: { view: true, create: false, update: false, delete: false, approve: false, export: true },
    notifications: { view: true, create: true, update: true, delete: false, approve: false, export: false },
    userManagement: { view: false, create: false, update: false, delete: false, approve: false, export: false },
    roleManagement: { view: false, create: false, update: false, delete: false, approve: false, export: false },
    auditLogs: { view: false, create: false, update: false, delete: false, approve: false, export: false },
    companySettings: { view: false, create: false, update: false, delete: false, approve: false, export: false },
    profile: { view: true, create: false, update: true, delete: false, approve: false, export: false }
  },
  "Financial Analyst": {
    dashboard: { view: true, create: false, update: false, delete: false, approve: false, export: true },
    vehicleRegistry: { view: true, create: false, update: false, delete: false, approve: false, export: false },
    driverManagement: { view: true, create: false, update: false, delete: false, approve: false, export: false },
    tripDispatcher: { view: false, create: false, update: false, delete: false, approve: false, export: false },
    maintenance: { view: true, create: false, update: false, delete: false, approve: false, export: false },
    fuelManagement: { view: true, create: true, update: true, delete: true, approve: true, export: true },
    expenseManagement: { view: true, create: true, update: true, delete: true, approve: true, export: true },
    reportsAnalytics: { view: true, create: true, update: true, delete: false, approve: false, export: true },
    notifications: { view: true, create: false, update: false, delete: false, approve: false, export: false },
    userManagement: { view: false, create: false, update: false, delete: false, approve: false, export: false },
    roleManagement: { view: false, create: false, update: false, delete: false, approve: false, export: false },
    auditLogs: { view: false, create: false, update: false, delete: false, approve: false, export: false },
    companySettings: { view: false, create: false, update: false, delete: false, approve: false, export: false },
    profile: { view: true, create: false, update: true, delete: false, approve: false, export: false }
  }
};

const DEFAULT_USERS = [
  { email: "admin@transitops.in", name: "System Admin", role: "Administrator", active: true },
  { email: "manager@transitops.in", name: "Marcus Vance", role: "Fleet Manager", active: true },
  { email: "dispatcher@transitops.in", name: "Raven K.", role: "Dispatcher", active: true },
  { email: "alex@transitops.in", name: "Alex", role: "Driver", active: true },
  { email: "safety@transitops.in", name: "Sarah Connor", role: "Safety Officer", active: true },
  { email: "analyst@transitops.in", name: "Warren Buffet", role: "Financial Analyst", active: true }
];

const DEFAULT_VEHICLES = [
  { regNo: "GJ01AB4521", model: "VAN-05", type: "Van", capacity: 500, odometer: 74000, acqCost: 620000, status: "Available" },
  { regNo: "GJ01AB9981", model: "TRUCK-11", type: "Truck", capacity: 5000, odometer: 182000, acqCost: 2450000, status: "On Trip" },
  { regNo: "GJ01AB1120", model: "MINI-03", type: "Mini", capacity: 1000, odometer: 66000, acqCost: 410000, status: "In Shop" },
  { regNo: "GJ01AB0087", model: "VAN-09", type: "Van", capacity: 750, odometer: 241900, acqCost: 590000, status: "Retired" }
];

const DEFAULT_DRIVERS = [
  { name: "Alex", licenseNo: "DL-88213", category: "LMV", expiry: "2028-12", contact: "98765xxxxx", tripCompl: 96, safetyScore: 96, status: "Available" },
  { name: "John", licenseNo: "DL-44120", category: "HMV", expiry: "2025-03", contact: "98220xxxxx", tripCompl: 81, safetyScore: 81, status: "Suspended" },
  { name: "Priya", licenseNo: "DL-77031", category: "LMV", expiry: "2027-08", contact: "99110xxxxx", tripCompl: 99, safetyScore: 99, status: "On Trip" },
  { name: "Suresh", licenseNo: "DL-90045", category: "HMV", expiry: "2027-01", contact: "97440xxxxx", tripCompl: 88, safetyScore: 88, status: "Off Duty" }
];

const DEFAULT_TRIPS = [
  { id: "TR001", vehicle: "GJ01AB4521", driver: "Alex", status: "On Trip", source: "Gandhinagar Depot", destination: "Ahmedabad Hub", weight: 450, distance: 38, eta: "45 min" },
  { id: "TR002", vehicle: "GJ01AB9981", driver: "John", status: "Completed", source: "Vatva Industrial Area", destination: "Sanand Warehouse", weight: 4000, distance: 80, eta: "—" },
  { id: "TR003", vehicle: "GJ01AB0087", driver: "Priya", status: "Dispatched", source: "Kalol Depot", destination: "Gandhinagar Depot", weight: 700, distance: 25, eta: "1h 10m" },
  { id: "TR006", vehicle: "—", driver: "—", status: "Draft", source: "Mansa", destination: "Kalol Depot", weight: 700, distance: 15, eta: "Awaiting vehicle" }
];

const DEFAULT_MAINTENANCE = [
  { vehicle: "GJ01AB4521", service: "Oil Change", cost: 2500, date: "2026-07-05", status: "In Shop" },
  { vehicle: "GJ01AB9981", service: "Engine Repair", cost: 18000, date: "2026-07-06", status: "Completed" },
  { vehicle: "GJ01AB1120", service: "Tyre Replace", cost: 6200, date: "2026-07-07", status: "In Shop" }
];

const DEFAULT_FUEL = [
  { vehicle: "GJ01AB4521", date: "2026-07-05", liters: 42, cost: 3150 },
  { vehicle: "GJ01AB9981", date: "2026-07-06", liters: 110, cost: 8400 },
  { vehicle: "GJ01AB0087", date: "2026-07-06", liters: 28, cost: 2050 }
];

const DEFAULT_EXPENSES = [
  { trip: "TR001", vehicle: "GJ01AB4521", toll: 120, other: 0, maint: 0, total: 120 },
  { trip: "TR002", vehicle: "GJ01AB9981", toll: 340, other: 150, maint: 18000, total: 18490 }
];

const DEFAULT_AUDIT_LOGS = [
  { timestamp: "2026-07-12 09:00:00", user: "admin@transitops.in", role: "Administrator", action: "INITIALIZE", details: "TransitOps Enterprise Database initialized successfully." },
  { timestamp: "2026-07-12 09:15:30", user: "manager@transitops.in", role: "Fleet Manager", action: "ASSET_CREATE", details: "Added Vehicle GJ01AB4521 (VAN-05)" },
  { timestamp: "2026-07-12 09:30:12", user: "dispatcher@transitops.in", role: "Dispatcher", action: "TRIP_DISPATCH", details: "Dispatched Trip TR001 to Driver Alex" }
];

const DEFAULT_SETTINGS = {
  depot: "Gandhinagar Depot GJ4",
  currency: "INR",
  distanceUnit: "Kilometers"
};

// --- 2. GLOBAL STATE ---
let state = {
  rbac: {},
  users: [],
  vehicles: [],
  drivers: [],
  trips: [],
  maintenance: [],
  fuel: [],
  expenses: [],
  auditLogs: [],
  settings: {},
  currentUser: null,
  activeView: "dashboard",
  failedAttempts: 0,
  locked: false
};

// --- 3. INIT APPLICATION ---
document.addEventListener("DOMContentLoaded", () => {
  loadStateFromStorage();
  initEventListeners();
  checkAuthSession();
});

function loadStateFromStorage() {
  state.rbac = JSON.parse(localStorage.getItem("to_rbac")) || DEFAULT_RBAC_MATRIX;
  state.users = JSON.parse(localStorage.getItem("to_users")) || DEFAULT_USERS;
  state.vehicles = JSON.parse(localStorage.getItem("to_vehicles")) || DEFAULT_VEHICLES;
  state.drivers = JSON.parse(localStorage.getItem("to_drivers")) || DEFAULT_DRIVERS;
  state.trips = JSON.parse(localStorage.getItem("to_trips")) || DEFAULT_TRIPS;
  state.maintenance = JSON.parse(localStorage.getItem("to_maintenance")) || DEFAULT_MAINTENANCE;
  state.fuel = JSON.parse(localStorage.getItem("to_fuel")) || DEFAULT_FUEL;
  state.expenses = JSON.parse(localStorage.getItem("to_expenses")) || DEFAULT_EXPENSES;
  state.auditLogs = JSON.parse(localStorage.getItem("to_audit_logs")) || DEFAULT_AUDIT_LOGS;
  state.settings = JSON.parse(localStorage.getItem("to_settings")) || DEFAULT_SETTINGS;
  state.currentUser = JSON.parse(sessionStorage.getItem("to_current_user")) || null;
}

function saveStateToStorage() {
  localStorage.setItem("to_rbac", JSON.stringify(state.rbac));
  localStorage.setItem("to_users", JSON.stringify(state.users));
  localStorage.setItem("to_vehicles", JSON.stringify(state.vehicles));
  localStorage.setItem("to_drivers", JSON.stringify(state.drivers));
  localStorage.setItem("to_trips", JSON.stringify(state.trips));
  localStorage.setItem("to_maintenance", JSON.stringify(state.maintenance));
  localStorage.setItem("to_fuel", JSON.stringify(state.fuel));
  localStorage.setItem("to_expenses", JSON.stringify(state.expenses));
  localStorage.setItem("to_audit_logs", JSON.stringify(state.auditLogs));
  localStorage.setItem("to_settings", JSON.stringify(state.settings));
}

// --- 4. DECLARATIVE PERMISSION GUARD ---
// Checks if current user has permission for a module and action
function canDo(moduleName, action = "view") {
  if (!state.currentUser) return false;
  const role = state.currentUser.role;
  const modulePerms = state.rbac[role]?.[moduleName];
  if (!modulePerms) return false;
  return !!modulePerms[action];
}

// Log actions into audit log
function logAudit(action, details) {
  if (!state.currentUser) return;
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
  state.auditLogs.unshift({
    timestamp,
    user: state.currentUser.email,
    role: state.currentUser.role,
    action,
    details
  });
  saveStateToStorage();
}

// --- 5. AUTHENTICATION CONTROLLER ---
function checkAuthSession() {
  const authScreen = document.getElementById("auth-screen");
  const appScreen = document.getElementById("app-screen");
  
  if (state.currentUser) {
    authScreen.classList.add("hidden");
    appScreen.classList.remove("hidden");
    
    // Set Header user info
    document.getElementById("header-user-name").textContent = state.currentUser.name;
    document.getElementById("header-role-badge").textContent = state.currentUser.role;
    
    const initials = state.currentUser.name.split(" ").map(n => n[0]).join("").toUpperCase();
    document.getElementById("header-avatar").textContent = initials;
    
    // Sync Demo switcher in sidebar
    document.getElementById("quick-role-select").value = state.currentUser.role;
    
    applyRBACNavigation();
    
    // Force Driver into specialized Driver Portal view
    if (state.currentUser.role === "Driver") {
      switchView("driver-portal");
    } else {
      // Default non-driver view
      if (state.activeView === "driver-portal") {
        switchView("dashboard");
      } else {
        switchView(state.activeView);
      }
    }
  } else {
    authScreen.classList.remove("hidden");
    appScreen.classList.add("hidden");
  }
}

function quickLogin(email) {
  const matchedUser = state.users.find(u => u.email === email);
  if (matchedUser) {
    document.getElementById("login-email").value = matchedUser.email;
    document.getElementById("login-password").value = "transitops";
    document.getElementById("login-role").value = matchedUser.role;
  }
}

function handleLogin(e) {
  e.preventDefault();
  
  if (state.locked) {
    showAuthError("❌ Account locked after 5 failed attempts.");
    return;
  }
  
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  const role = document.getElementById("login-role").value;
  
  // Rule check: correct password is "transitops"
  if (password !== "transitops") {
    state.failedAttempts++;
    if (state.failedAttempts >= 5) {
      state.locked = true;
      showAuthError("❌ Account locked after 5 failed attempts.");
    } else {
      showAuthError(`❌ Invalid credentials. (Attempt ${state.failedAttempts}/5)`);
    }
    return;
  }
  
  const matchedUser = state.users.find(u => u.email === email && u.role === role);
  if (!matchedUser || !matchedUser.active) {
    showAuthError("❌ User profile not found, mismatch with selected role, or account deactivated.");
    return;
  }
  
  state.failedAttempts = 0;
  state.currentUser = matchedUser;
  sessionStorage.setItem("to_current_user", JSON.stringify(state.currentUser));
  
  logAudit("LOGIN", `User successfully logged in as ${role}.`);
  checkAuthSession();
}

function handleLogout() {
  logAudit("LOGOUT", "User logged out.");
  state.currentUser = null;
  sessionStorage.removeItem("to_current_user");
  checkAuthSession();
}

function showAuthError(msg) {
  const errorBanner = document.getElementById("auth-error");
  const errorText = document.getElementById("error-message");
  errorText.textContent = msg;
  errorBanner.classList.remove("hidden");
}

// --- 6. RBAC NAV CONTROLLER ---
function applyRBACNavigation() {
  const navItems = document.querySelectorAll(".sidebar-nav .nav-item");
  
  navItems.forEach(item => {
    const view = item.getAttribute("data-view");
    const moduleMap = {
      dashboard: "dashboard",
      fleet: "vehicleRegistry",
      drivers: "driverManagement",
      trips: "tripDispatcher",
      maintenance: "maintenance",
      fuel: "fuelManagement",
      analytics: "reportsAnalytics",
      settings: "companySettings",
      users: "userManagement",
      audit: "auditLogs"
    };
    
    const reqModule = moduleMap[view];
    const canView = canDo(reqModule, "view");
    
    if (canView) {
      item.classList.remove("hidden");
      item.style.opacity = "1";
    } else {
      // Hide completely or grey out depending on dashboard/admin layouts
      item.classList.add("hidden");
    }
  });
}

function switchView(viewId) {
  const moduleMap = {
    dashboard: "dashboard",
    fleet: "vehicleRegistry",
    drivers: "driverManagement",
    trips: "tripDispatcher",
    maintenance: "maintenance",
    fuel: "fuelManagement",
    analytics: "reportsAnalytics",
    settings: "companySettings",
    users: "userManagement",
    audit: "auditLogs",
    "driver-portal": "tripDispatcher" // maps to trip status update
  };
  
  const reqModule = moduleMap[viewId];
  const allowed = canDo(reqModule, "view");
  
  // Lockout overlay reset
  document.getElementById("lockout-overlay").classList.add("hidden");
  
  if (!allowed) {
    document.getElementById("lockout-overlay").classList.remove("hidden");
    document.getElementById("lockout-current-role").textContent = state.currentUser.role;
    
    // Find who is allowed
    let reqRoles = [];
    for (const [r, perms] of Object.entries(state.rbac)) {
      if (perms[reqModule]?.view) reqRoles.push(r);
    }
    document.getElementById("lockout-required-roles").textContent = reqRoles.length > 0 ? reqRoles.join(" / ") : "Administrator";
    
    updateNavSelection(viewId);
    return;
  }
  
  state.activeView = viewId;
  updateNavSelection(viewId);
  
  // Hide all panels
  document.querySelectorAll(".app-view").forEach(v => v.classList.add("hidden"));
  
  // Show active panel
  const currentViewEl = document.getElementById(`view-${viewId}`);
  if (currentViewEl) {
    currentViewEl.classList.remove("hidden");
    renderActiveView();
  }
}

function updateNavSelection(viewId) {
  document.querySelectorAll(".sidebar-nav .nav-item").forEach(item => {
    if (item.getAttribute("data-view") === viewId) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

// --- 7. RENDER ENGINE ---
function renderActiveView() {
  switch (state.activeView) {
    case "dashboard":
      renderPersonalizedDashboard();
      break;
    case "fleet":
      renderFleet();
      break;
    case "drivers":
      renderDrivers();
      break;
    case "trips":
      renderTrips();
      break;
    case "maintenance":
      renderMaintenance();
      break;
    case "fuel":
      renderFuelAndExpenses();
      break;
    case "analytics":
      renderAnalytics();
      break;
    case "settings":
      renderSettings();
      break;
    case "users":
      renderUserManagement();
      break;
    case "audit":
      renderAuditLogs();
      break;
    case "driver-portal":
      renderDriverPortal();
      break;
  }
}

// --- Personalized Dashboard Panel ---
function renderPersonalizedDashboard() {
  const role = state.currentUser.role;
  const metricsGrid = document.getElementById("dashboard-metrics-grid");
  const widgetsGrid = document.getElementById("dashboard-widgets-grid");
  
  metricsGrid.innerHTML = "";
  widgetsGrid.innerHTML = "";
  
  // Setup KPI Cards & Widgets per Role
  if (role === "Administrator") {
    // Admin Dashboard KPIs
    metricsGrid.innerHTML = `
      <div class="stat-card">
        <div class="stat-header"><span class="stat-label">ACTIVE USERS</span><span class="stat-icon icon-cyan">👥</span></div>
        <div class="stat-value">${padNum(state.users.filter(u => u.active).length)}</div>
        <div class="stat-trend trend-positive">Fully provisioned</div>
      </div>
      <div class="stat-card">
        <div class="stat-header"><span class="stat-label">TOTAL LOGISTICS ASSETS</span><span class="stat-icon icon-green">🚚</span></div>
        <div class="stat-value">${padNum(state.vehicles.length)}</div>
        <div class="stat-trend trend-neutral">In registry</div>
      </div>
      <div class="stat-card">
        <div class="stat-header"><span class="stat-label">SYSTEM AUDIT LOGS</span><span class="stat-icon icon-amber">📝</span></div>
        <div class="stat-value">${padNum(state.auditLogs.length)}</div>
        <div class="stat-trend trend-info">Secured logs</div>
      </div>
      <div class="stat-card">
        <div class="stat-header"><span class="stat-label">SYSTEM STATUS</span><span class="stat-icon icon-teal">⚡</span></div>
        <div class="stat-value">OK</div>
        <div class="stat-trend trend-positive">All nodes online</div>
      </div>
    `;
    
    // Admin Widgets
    widgetsGrid.innerHTML = `
      <div class="card glass-card">
        <div class="card-header"><h3>Recent System Audits</h3><span class="card-action-link" onclick="switchView('audit')">View Audits &rarr;</span></div>
        <div class="table-responsive">
          <table class="data-table small-table">
            <thead><tr><th>TIMESTAMP</th><th>USER</th><th>ACTION</th><th>DETAILS</th></tr></thead>
            <tbody>
              ${state.auditLogs.slice(0, 5).map(l => `
                <tr>
                  <td class="text-muted" style="font-family: monospace;">${l.timestamp}</td>
                  <td>${l.user}</td>
                  <td><span class="badge ${l.action === 'INITIALIZE' || l.action === 'LOGIN' ? 'badge-completed' : 'badge-dispatched'}">${l.action}</span></td>
                  <td>${l.details}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
      <div class="card glass-card">
        <div class="card-header"><h3>Active System Roster</h3><span class="card-action-link" onclick="switchView('users')">Manage Users &rarr;</span></div>
        <div class="table-responsive">
          <table class="data-table small-table">
            <thead><tr><th>NAME</th><th>ROLE</th><th>STATUS</th></tr></thead>
            <tbody>
              ${state.users.slice(0, 5).map(u => `
                <tr>
                  <td><strong>${u.name}</strong></td>
                  <td><span class="badge badge-draft">${u.role}</span></td>
                  <td><span class="badge ${u.active ? 'badge-available' : 'badge-retired'}">${u.active ? 'Active' : 'Disabled'}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
  else if (role === "Fleet Manager") {
    // Fleet Manager KPIs
    const availCount = state.vehicles.filter(v => v.status === "Available").length;
    const maintCount = state.vehicles.filter(v => v.status === "In Shop").length;
    const activeCount = state.vehicles.filter(v => v.status === "On Trip").length;
    const util = Math.round((activeCount / (state.vehicles.length || 1)) * 100);

    metricsGrid.innerHTML = `
      <div class="stat-card">
        <div class="stat-header"><span class="stat-label">FLEET SIZE</span><span class="stat-icon icon-cyan">🚚</span></div>
        <div class="stat-value">${padNum(state.vehicles.length)}</div>
        <div class="stat-trend trend-neutral">Registered units</div>
      </div>
      <div class="stat-card">
        <div class="stat-header"><span class="stat-label">AVAILABLE UNITS</span><span class="stat-icon icon-green">✓</span></div>
        <div class="stat-value">${padNum(availCount)}</div>
        <div class="stat-trend trend-positive">Ready to deploy</div>
      </div>
      <div class="stat-card">
        <div class="stat-header"><span class="stat-label">ACTIVE MAINTENANCE</span><span class="stat-icon icon-amber">🔧</span></div>
        <div class="stat-value">${padNum(maintCount)}</div>
        <div class="stat-trend trend-warning">In service depot</div>
      </div>
      <div class="stat-card">
        <div class="stat-header"><span class="stat-label">FLEET UTILIZATION</span><span class="stat-icon icon-teal">📊</span></div>
        <div class="stat-value">${util}%</div>
        <div class="stat-trend trend-positive">Optimal efficiency</div>
      </div>
    `;

    // Widgets
    widgetsGrid.innerHTML = `
      <div class="card glass-card">
        <div class="card-header"><h3>Active Vehicle Statuses</h3><span class="card-action-link" onclick="switchView('fleet')">Go to Fleet &rarr;</span></div>
        <div class="table-responsive">
          <table class="data-table">
            <thead><tr><th>REG. NO.</th><th>MODEL</th><th>TYPE</th><th>STATUS</th></tr></thead>
            <tbody>
              ${state.vehicles.map(v => `
                <tr>
                  <td><strong>${v.regNo}</strong></td>
                  <td>${v.model}</td>
                  <td>${v.type}</td>
                  <td><span class="badge badge-${v.status.toLowerCase().replace(" ", "")}">${v.status}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
      <div class="card glass-card">
        <div class="card-header"><h3>Depot Maintenance Alerts</h3><span class="card-action-link" onclick="switchView('maintenance')">Log Service &rarr;</span></div>
        <div class="table-responsive">
          <table class="data-table">
            <thead><tr><th>VEHICLE</th><th>SERVICE</th><th>COST</th><th>STATUS</th></tr></thead>
            <tbody>
              ${state.maintenance.slice(0, 3).map(m => `
                <tr>
                  <td><strong>${m.vehicle}</strong></td>
                  <td>${m.service}</td>
                  <td>₹ ${formatNumber(m.cost)}</td>
                  <td><span class="badge ${m.status === 'In Shop' ? 'badge-inshop' : 'badge-completed'}">${m.status}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
  else if (role === "Dispatcher") {
    // Dispatcher KPIs
    const activeTrips = state.trips.filter(t => t.status === "On Trip" || t.status === "Dispatched").length;
    const availVehicles = state.vehicles.filter(v => v.status === "Available").length;
    const availDrivers = state.drivers.filter(d => d.status === "Available" && !checkDriverLicenseExpired(d)).length;
    const draftCount = state.trips.filter(t => t.status === "Draft").length;

    metricsGrid.innerHTML = `
      <div class="stat-card">
        <div class="stat-header"><span class="stat-label">ACTIVE TRIPS</span><span class="stat-icon icon-cyan">🛣️</span></div>
        <div class="stat-value">${padNum(activeTrips)}</div>
        <div class="stat-trend trend-neutral">In-transit tracking</div>
      </div>
      <div class="stat-card">
        <div class="stat-header"><span class="stat-label">AVAILABLE ASSETS</span><span class="stat-icon icon-green">🚚</span></div>
        <div class="stat-value">${padNum(availVehicles)}</div>
        <div class="stat-trend trend-positive">Ready in yard</div>
      </div>
      <div class="stat-card">
        <div class="stat-header"><span class="stat-label">AVAILABLE DRIVERS</span><span class="stat-icon icon-teal">👤</span></div>
        <div class="stat-value">${padNum(availDrivers)}</div>
        <div class="stat-trend trend-positive">On standby</div>
      </div>
      <div class="stat-card">
        <div class="stat-header"><span class="stat-label">PENDING DISPATCH QUEUE</span><span class="stat-icon icon-amber">📋</span></div>
        <div class="stat-value">${padNum(draftCount)}</div>
        <div class="stat-trend trend-warning">Awaiting dispatch</div>
      </div>
    `;

    // Widgets
    widgetsGrid.innerHTML = `
      <div class="card glass-card">
        <div class="card-header"><h3>Active Operation Board</h3><span class="card-action-link" onclick="switchView('trips')">Open Dispatcher &rarr;</span></div>
        <div class="table-responsive">
          <table class="data-table">
            <thead><tr><th>TRIP</th><th>ROUTE</th><th>DRIVER</th><th>STATUS</th></tr></thead>
            <tbody>
              ${state.trips.slice(0, 4).map(t => `
                <tr>
                  <td><strong>${t.id}</strong></td>
                  <td>${t.source} &rarr; ${t.destination}</td>
                  <td>${t.driver}</td>
                  <td><span class="badge badge-${t.status.toLowerCase().replace(" ", "")}">${t.status}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
  else if (role === "Safety Officer") {
    // Safety Officer KPIs
    const totalDrivers = state.drivers.length;
    const expiredLicense = state.drivers.filter(d => checkDriverLicenseExpired(d)).length;
    const avgSafety = Math.round(state.drivers.reduce((sum, d) => sum + d.safetyScore, 0) / totalDrivers);

    metricsGrid.innerHTML = `
      <div class="stat-card">
        <div class="stat-header"><span class="stat-label">ROSTER SIZE</span><span class="stat-icon icon-cyan">👥</span></div>
        <div class="stat-value">${padNum(totalDrivers)}</div>
        <div class="stat-trend trend-neutral">Registered drivers</div>
      </div>
      <div class="stat-card">
        <div class="stat-header"><span class="stat-label">EXPIRED LICENSES</span><span class="stat-icon icon-rose">⚠️</span></div>
        <div class="stat-value text-rose">${padNum(expiredLicense)}</div>
        <div class="stat-trend trend-danger">Assignment blocked</div>
      </div>
      <div class="stat-card">
        <div class="stat-header"><span class="stat-label">AVG SAFETY SCORE</span><span class="stat-icon icon-green">🛡️</span></div>
        <div class="stat-value">${avgSafety}%</div>
        <div class="stat-trend trend-positive">Excellent rating</div>
      </div>
      <div class="stat-card">
        <div class="stat-header"><span class="stat-label">PENDING INSPECTIONS</span><span class="stat-icon icon-amber">📋</span></div>
        <div class="stat-value">02</div>
        <div class="stat-trend trend-warning">Inspection scheduled</div>
      </div>
    `;

    // Widgets
    widgetsGrid.innerHTML = `
      <div class="card glass-card">
        <div class="card-header"><h3>Compliance Roster Alerts</h3><span class="card-action-link" onclick="switchView('drivers')">Go to Drivers &rarr;</span></div>
        <div class="table-responsive">
          <table class="data-table">
            <thead><tr><th>DRIVER</th><th>LICENSE NO.</th><th>EXPIRY</th><th>STATUS</th></tr></thead>
            <tbody>
              ${state.drivers.map(d => `
                <tr class="${checkDriverLicenseExpired(d) ? 'bg-rose-glow' : ''}">
                  <td><strong>${d.name}</strong></td>
                  <td>${d.licenseNo}</td>
                  <td class="${checkDriverLicenseExpired(d) ? 'text-rose font-bold' : ''}">${d.expiry} ${checkDriverLicenseExpired(d) ? 'EXPIRED' : ''}</td>
                  <td><span class="badge badge-${d.status.toLowerCase().replace(" ", "")}">${d.status}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
  else if (role === "Financial Analyst") {
    // Financial Analyst KPIs
    const fuelCost = state.fuel.reduce((sum, f) => sum + f.cost, 0);
    const maintCost = state.maintenance.reduce((sum, m) => sum + m.cost, 0);
    const tollCost = state.expenses.reduce((sum, e) => sum + e.toll, 0);
    const otherCost = state.expenses.reduce((sum, e) => sum + e.other, 0);
    const totalExp = fuelCost + maintCost + tollCost + otherCost;

    metricsGrid.innerHTML = `
      <div class="stat-card">
        <div class="stat-header"><span class="stat-label">FUEL COST</span><span class="stat-icon icon-cyan">⛽</span></div>
        <div class="stat-value">₹ ${formatNumber(fuelCost)}</div>
        <div class="stat-trend trend-neutral">Total fuel spend</div>
      </div>
      <div class="stat-card">
        <div class="stat-header"><span class="stat-label">MAINTENANCE COST</span><span class="stat-icon icon-amber">⚙️</span></div>
        <div class="stat-value">₹ ${formatNumber(maintCost)}</div>
        <div class="stat-trend trend-warning">Linked workshop bill</div>
      </div>
      <div class="stat-card">
        <div class="stat-header"><span class="stat-label">TOLLS &amp; MISC</span><span class="stat-icon icon-indigo">🛣️</span></div>
        <div class="stat-value">₹ ${formatNumber(tollCost + otherCost)}</div>
        <div class="stat-trend trend-neutral">In-route expenses</div>
      </div>
      <div class="stat-card">
        <div class="stat-header"><span class="stat-label">TOTAL EXPENSE</span><span class="stat-icon icon-rose">💰</span></div>
        <div class="stat-value text-rose">₹ ${formatNumber(totalExp)}</div>
        <div class="stat-trend trend-neutral">Cumulative cost</div>
      </div>
    `;

    // Widgets
    widgetsGrid.innerHTML = `
      <div class="card glass-card">
        <div class="card-header"><h3>Recent Expenses Tracker</h3><span class="card-action-link" onclick="switchView('fuel')">Go to Fuel &rarr;</span></div>
        <div class="table-responsive">
          <table class="data-table">
            <thead><tr><th>TRIP</th><th>TOLL</th><th>OTHER</th><th>MAINTENANCE</th><th>TOTAL</th></tr></thead>
            <tbody>
              ${state.expenses.slice(0, 3).map(e => `
                <tr>
                  <td><strong>${e.trip}</strong></td>
                  <td>₹ ${formatNumber(e.toll)}</td>
                  <td>₹ ${formatNumber(e.other)}</td>
                  <td>₹ ${formatNumber(e.maint)}</td>
                  <td><strong>₹ ${formatNumber(e.total)}</strong></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
}

// --- Fleet Panel ---
function renderFleet() {
  const tbody = document.getElementById("fleet-tbody");
  tbody.innerHTML = "";
  
  const canCreate = canDo("vehicleRegistry", "create");
  const canUpdate = canDo("vehicleRegistry", "update");
  const canDelete = canDo("vehicleRegistry", "delete");
  
  // Hide/Show registry create button
  const addBtn = document.querySelector("#view-fleet .btn-primary");
  if (canCreate) addBtn.classList.remove("hidden");
  else addBtn.classList.add("hidden");

  state.vehicles.forEach(veh => {
    let badgeClass = `badge-${veh.status.toLowerCase().replace(" ", "")}`;
    tbody.innerHTML += `
      <tr>
        <td><strong>${veh.regNo}</strong></td>
        <td>${veh.model}</td>
        <td>${veh.type}</td>
        <td>${veh.capacity} kg</td>
        <td>${formatNumber(veh.odometer)}</td>
        <td>₹ ${formatNumber(veh.acqCost)}</td>
        <td><span class="badge ${badgeClass}">${veh.status}</span></td>
        <td>
          ${canUpdate ? `<button class="action-icon-btn" title="Log Service" onclick="logServiceDirect('${veh.regNo}')">🔧</button>` : ''}
          ${canDelete ? `<button class="action-icon-btn text-rose" title="Delete Asset" onclick="deleteVehicle('${veh.regNo}')">🗑️</button>` : ''}
          ${(!canUpdate && !canDelete) ? `<span class="text-muted">None</span>` : ''}
        </td>
      </tr>
    `;
  });
}

function applyVehicleFilters() {
  const typeFilter = document.getElementById("filter-vehicle-type").value;
  const statusFilter = document.getElementById("filter-vehicle-status").value;
  const searchVal = document.getElementById("search-vehicle").value.toLowerCase();
  
  const tbody = document.getElementById("fleet-tbody");
  tbody.innerHTML = "";
  
  const canUpdate = canDo("vehicleRegistry", "update");
  const canDelete = canDo("vehicleRegistry", "delete");
  
  state.vehicles.forEach(veh => {
    const matchesType = typeFilter === "All" || veh.type === typeFilter;
    const matchesStatus = statusFilter === "All" || veh.status === statusFilter;
    const matchesSearch = veh.regNo.toLowerCase().includes(searchVal) || veh.model.toLowerCase().includes(searchVal);
    
    if (matchesType && matchesStatus && matchesSearch) {
      let badgeClass = `badge-${veh.status.toLowerCase().replace(" ", "")}`;
      tbody.innerHTML += `
        <tr>
          <td><strong>${veh.regNo}</strong></td>
          <td>${veh.model}</td>
          <td>${veh.type}</td>
          <td>${veh.capacity} kg</td>
          <td>${formatNumber(veh.odometer)}</td>
          <td>₹ ${formatNumber(veh.acqCost)}</td>
          <td><span class="badge ${badgeClass}">${veh.status}</span></td>
          <td>
            ${canUpdate ? `<button class="action-icon-btn" title="Log Service" onclick="logServiceDirect('${veh.regNo}')">🔧</button>` : ''}
            ${canDelete ? `<button class="action-icon-btn text-rose" title="Delete Asset" onclick="deleteVehicle('${veh.regNo}')">🗑️</button>` : ''}
            ${(!canUpdate && !canDelete) ? `<span class="text-muted">None</span>` : ''}
          </td>
        </tr>
      `;
    }
  });
}

// --- Drivers Panel ---
function renderDrivers() {
  const tbody = document.getElementById("drivers-tbody");
  tbody.innerHTML = "";
  
  const canCreate = canDo("driverManagement", "create");
  const canUpdate = canDo("driverManagement", "update");
  
  const addBtn = document.querySelector("#view-drivers .btn-primary");
  if (canCreate) addBtn.classList.remove("hidden");
  else addBtn.classList.add("hidden");

  state.drivers.forEach(dr => {
    const isExpired = checkDriverLicenseExpired(dr);
    const expStr = isExpired ? `${dr.expiry} EXPIRED` : dr.expiry;
    
    let badgeClass = `badge-${dr.status.toLowerCase().replace(" ", "")}`;
    let safetyClass = dr.safetyScore >= 90 ? "text-green" : dr.safetyScore >= 80 ? "text-amber" : "text-rose";
    
    tbody.innerHTML += `
      <tr>
        <td><strong>${dr.name}</strong></td>
        <td>${dr.licenseNo}</td>
        <td>${dr.category}</td>
        <td class="${isExpired ? 'text-rose font-bold' : ''}">${expStr}</td>
        <td>${dr.contact}</td>
        <td>${dr.tripCompl}%</td>
        <td class="${safetyClass}"><strong>${dr.safetyScore}%</strong></td>
        <td><span class="badge ${badgeClass}">${dr.status}</span></td>
        <td>
          ${canUpdate ? `
            <div class="roster-toggle-cell">
              <button class="toggle-btn-sm ${dr.status === 'Available' ? 'active' : ''}" data-status="Available" onclick="setDriverStatus('${dr.name}', 'Available')">Avail</button>
              <button class="toggle-btn-sm ${dr.status === 'On Trip' ? 'active' : ''}" data-status="On Trip" onclick="setDriverStatus('${dr.name}', 'On Trip')">Trip</button>
              <button class="toggle-btn-sm ${dr.status === 'Off Duty' ? 'active' : ''}" data-status="Off Duty" onclick="setDriverStatus('${dr.name}', 'Off Duty')">Off</button>
              <button class="toggle-btn-sm ${dr.status === 'Suspended' ? 'active' : ''}" data-status="Suspended" onclick="setDriverStatus('${dr.name}', 'Suspended')">Susp</button>
            </div>
          ` : `<span class="text-muted">No Edit access</span>`}
        </td>
      </tr>
    `;
  });
}

// --- Trip Dispatcher Panel ---
function renderTrips() {
  const canCreate = canDo("tripDispatcher", "create");
  const canUpdate = canDo("tripDispatcher", "update");
  
  // Hide form if user lacks create capabilities
  const formCard = document.querySelector("#view-trips .standard-form").parentElement;
  if (canCreate) {
    formCard.classList.remove("hidden");
    
    // Populate dropdown pools
    const vehicleSelect = document.getElementById("trip-vehicle");
    vehicleSelect.innerHTML = `<option value="">-- Select Available Vehicle --</option>`;
    state.vehicles.forEach(veh => {
      if (veh.status === "Available") {
        vehicleSelect.innerHTML += `<option value="${veh.regNo}">${veh.model} (${veh.regNo}) - Cap: ${veh.capacity} kg</option>`;
      }
    });

    const driverSelect = document.getElementById("trip-driver");
    driverSelect.innerHTML = `<option value="">-- Select Available Driver --</option>`;
    state.drivers.forEach(dr => {
      const expired = checkDriverLicenseExpired(dr);
      const suspended = dr.status === "Suspended";
      if (dr.status === "Available" && !expired && !suspended) {
        driverSelect.innerHTML += `<option value="${dr.name}">${dr.name} - Score: ${dr.safetyScore}%</option>`;
      }
    });
  } else {
    formCard.classList.add("hidden");
  }

  // Render board columns
  const containers = {
    Draft: document.getElementById("container-draft"),
    Dispatched: document.getElementById("container-dispatched"),
    "On Trip": document.getElementById("container-ontrip"),
    Completed: document.getElementById("container-completed"),
    Cancelled: document.getElementById("container-cancelled")
  };
  
  for (const status in containers) {
    containers[status].innerHTML = "";
    document.getElementById(`count-${status.toLowerCase().replace(" ", "")}`).textContent = "0";
  }

  const counts = { Draft: 0, Dispatched: 0, "On Trip": 0, Completed: 0, Cancelled: 0 };

  state.trips.forEach(trip => {
    counts[trip.status] = (counts[trip.status] || 0) + 1;
    const container = containers[trip.status];
    if (!container) return;

    let actionsHtml = "";
    if (canUpdate) {
      if (trip.status === "Draft") {
        actionsHtml = `<button class="card-action-btn" onclick="advanceTripStage('${trip.id}', 'Dispatched')">Dispatch</button>`;
      } else if (trip.status === "Dispatched") {
        actionsHtml = `<button class="card-action-btn" onclick="advanceTripStage('${trip.id}', 'On Trip')">Start</button>`;
      } else if (trip.status === "On Trip") {
        actionsHtml = `
          <button class="card-action-btn" onclick="triggerTripCompleteModal('${trip.id}')">Complete</button>
          <button class="card-action-btn text-rose" onclick="advanceTripStage('${trip.id}', 'Cancelled')">Cancel</button>
        `;
      }
    }

    const vehName = getVehicleByReg(trip.vehicle)?.model || "Unassigned";

    container.innerHTML += `
      <div class="dispatch-card" id="card-${trip.id}">
        <div class="trip-id">
          <span>${trip.id}</span>
          <span style="font-size: 9px; opacity: 0.6;">${trip.eta || ""}</span>
        </div>
        <div class="route-text">${trip.source} &rarr; ${trip.destination}</div>
        <div class="meta-text">
          🚚 ${vehName} (${trip.vehicle || "—"})<br>
          👤 ${trip.driver || "—"}<br>
          📦 ${trip.weight} kg | 📍 ${trip.distance} km
        </div>
        ${actionsHtml ? `<div class="dispatch-card-actions">${actionsHtml}</div>` : ""}
      </div>
    `;
  });

  for (const status in counts) {
    const el = document.getElementById(`count-${status.toLowerCase().replace(" ", "")}`);
    if (el) el.textContent = padNum(counts[status]);
  }
}

// --- Maintenance Panel ---
function renderMaintenance() {
  const tbody = document.getElementById("maintenance-tbody");
  tbody.innerHTML = "";
  
  const canCreate = canDo("maintenance", "create");
  const canUpdate = canDo("maintenance", "update");
  
  const addBtn = document.querySelector("#view-maintenance .btn-primary");
  if (canCreate) addBtn.classList.remove("hidden");
  else addBtn.classList.add("hidden");

  state.maintenance.forEach((m, idx) => {
    const vehModel = getVehicleByReg(m.vehicle)?.model || m.vehicle;
    let badgeClass = m.status === "In Shop" ? "badge-inshop" : "badge-completed";
    
    tbody.innerHTML += `
      <tr>
        <td><strong>${vehModel} (${m.vehicle})</strong></td>
        <td>${m.service}</td>
        <td>₹ ${formatNumber(m.cost)}</td>
        <td>${m.date}</td>
        <td><span class="badge ${badgeClass}">${m.status}</span></td>
        <td>
          ${canUpdate && m.status === "In Shop" ? `
            <button class="btn btn-secondary btn-sm" onclick="completeServiceDirect(${idx})">Complete Service</button>
          ` : `<span class="text-muted">—</span>`}
        </td>
      </tr>
    `;
  });

  // Populate vehicle list for service logging
  const serviceVehSelect = document.getElementById("service-vehicle");
  serviceVehSelect.innerHTML = "";
  state.vehicles.forEach(v => {
    serviceVehSelect.innerHTML += `<option value="${v.regNo}">${v.model} (${v.regNo})</option>`;
  });
}

// --- Fuel & Expense Panel ---
function renderFuelAndExpenses() {
  const canCreate = canDo("fuelManagement", "create");
  
  const btnGroup = document.querySelector("#view-fuel .btn-group");
  if (canCreate) btnGroup.classList.remove("hidden");
  else btnGroup.classList.add("hidden");

  // Fuel Table
  const fuelTbody = document.getElementById("fuel-logs-tbody");
  fuelTbody.innerHTML = "";
  state.fuel.forEach(f => {
    const vehModel = getVehicleByReg(f.vehicle)?.model || f.vehicle;
    fuelTbody.innerHTML += `
      <tr>
        <td><strong>${vehModel} (${f.vehicle})</strong></td>
        <td>${f.date}</td>
        <td>${f.liters} L</td>
        <td>₹ ${formatNumber(f.cost)}</td>
      </tr>
    `;
  });

  // Expenses Table
  const expTbody = document.getElementById("other-expenses-tbody");
  expTbody.innerHTML = "";
  state.expenses.forEach(e => {
    const vehModel = getVehicleByReg(e.vehicle)?.model || e.vehicle;
    expTbody.innerHTML += `
      <tr>
        <td><strong>${e.trip}</strong></td>
        <td>${vehModel} (${e.vehicle})</td>
        <td>₹ ${formatNumber(e.toll)}</td>
        <td>₹ ${formatNumber(e.other)}</td>
        <td>₹ ${formatNumber(e.maint)}</td>
        <td><strong>₹ ${formatNumber(e.total)}</strong></td>
      </tr>
    `;
  });

  // Dropdown populations
  const fuelVehSelect = document.getElementById("fuel-vehicle");
  fuelVehSelect.innerHTML = "";
  state.vehicles.forEach(v => {
    fuelVehSelect.innerHTML += `<option value="${v.regNo}">${v.model} (${v.regNo})</option>`;
  });

  const expTripSelect = document.getElementById("expense-trip");
  expTripSelect.innerHTML = "";
  state.trips.forEach(t => {
    if (t.status === "Completed") {
      expTripSelect.innerHTML += `<option value="${t.id}">${t.id} (Veh: ${t.vehicle})</option>`;
    }
  });

  calculateTotalOperationalCost();
}

function calculateTotalOperationalCost() {
  const fuelSum = state.fuel.reduce((sum, f) => sum + f.cost, 0);
  const maintenanceSum = state.maintenance.reduce((sum, m) => sum + m.cost, 0);
  const tollSum = state.expenses.reduce((sum, e) => sum + e.toll, 0);
  const otherSum = state.expenses.reduce((sum, e) => sum + e.other, 0);
  
  const total = fuelSum + maintenanceSum + tollSum + otherSum;
  document.getElementById("total-operational-cost").textContent = `₹ ${formatNumber(total)}`;
  return total;
}

// --- Analytics & Reports Panel ---
function renderAnalytics() {
  const totalCost = calculateTotalOperationalCost();
  document.getElementById("val-operational-cost").textContent = `₹ ${formatNumber(totalCost)}`;
  
  // Fuel Efficiency (Average km/l)
  const totalDistance = state.trips.filter(t => t.status === "Completed").reduce((sum, t) => sum + t.distance, 0);
  const totalLiters = state.fuel.reduce((sum, f) => sum + f.liters, 0);
  const efficiency = totalLiters > 0 ? (totalDistance / totalLiters).toFixed(1) : "8.4";
  document.getElementById("val-fuel-efficiency").textContent = `${efficiency} km/l`;

  // Utilization
  const activeCount = state.vehicles.filter(v => v.status === "On Trip").length;
  const util = Math.round((activeCount / (state.vehicles.length || 1)) * 100);
  document.getElementById("val-fleet-utilization").textContent = `${util}%`;

  // Vehicle ROI = (Revenue - (Maintenance + Fuel)) / Acquisition Cost
  const ratePerKm = 150;
  const mockRevenue = totalDistance * ratePerKm;
  const totalMaint = state.maintenance.reduce((sum, m) => sum + m.cost, 0);
  const totalFuel = state.fuel.reduce((sum, f) => sum + f.cost, 0);
  const totalAcqCost = state.vehicles.reduce((sum, v) => sum + v.acqCost, 0);
  
  const roi = totalAcqCost > 0 ? (((mockRevenue - (totalMaint + totalFuel)) / totalAcqCost) * 100).toFixed(1) : "14.2";
  document.getElementById("val-vehicle-roi").textContent = `${roi}%`;

  drawMonthlyRevenueChart();
  drawCostlyVehiclesChart();
}

function drawMonthlyRevenueChart() {
  const svg = document.getElementById("svg-monthly-revenue");
  svg.innerHTML = "";
  
  const points = [
    { label: "Jan", val: 12000 },
    { label: "Feb", val: 15000 },
    { label: "Mar", val: 18000 },
    { label: "Apr", val: 14000 },
    { label: "May", val: 22000 },
    { label: "Jun", val: 25000 },
    { label: "Jul", val: 34070 }
  ];
  
  const width = 500;
  const height = 250;
  const padding = 40;
  
  const maxVal = Math.max(...points.map(p => p.val)) * 1.1;
  const chartHeight = height - 2 * padding;
  const chartWidth = width - 2 * padding;
  
  let defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  defs.innerHTML = `
    <linearGradient id="area-gradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="var(--color-indigo)" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="var(--color-indigo)" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="bar-gradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="var(--color-cyan)"/>
      <stop offset="100%" stop-color="var(--color-indigo)"/>
    </linearGradient>
  `;
  svg.appendChild(defs);
  
  // Y-axis
  let yAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
  setAttrs(yAxis, { x1: padding, y1: padding, x2: padding, y2: height - padding, class: "chart-axis-line" });
  svg.appendChild(yAxis);
  
  // X-axis
  let xAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
  setAttrs(xAxis, { x1: padding, y1: height - padding, x2: width - padding, y2: height - padding, class: "chart-axis-line" });
  svg.appendChild(xAxis);
  
  let polyPoints = [];
  let areaPoints = [`${padding},${height - padding}`];
  
  points.forEach((p, idx) => {
    const x = padding + (idx * (chartWidth / (points.length - 1)));
    const y = height - padding - ((p.val / maxVal) * chartHeight);
    
    polyPoints.push(`${x},${y}`);
    areaPoints.push(`${x},${y}`);
    
    // Grid
    let grid = document.createElementNS("http://www.w3.org/2000/svg", "line");
    setAttrs(grid, { x1: x, y1: padding, x2: x, y2: height - padding, class: "chart-grid-line" });
    svg.appendChild(grid);
    
    // Label x
    let lbl = document.createElementNS("http://www.w3.org/2000/svg", "text");
    setAttrs(lbl, { x: x, y: height - padding + 18, class: "chart-text", "text-anchor": "middle" });
    lbl.textContent = p.label;
    svg.appendChild(lbl);
  });
  
  areaPoints.push(`${width - padding},${height - padding}`);
  
  let area = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  setAttrs(area, { points: areaPoints.join(" "), class: "chart-line-area" });
  svg.appendChild(area);
  
  let line = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
  setAttrs(line, { points: polyPoints.join(" "), class: "chart-line" });
  svg.appendChild(line);
  
  points.forEach((p, idx) => {
    const coords = polyPoints[idx].split(",");
    const x = parseFloat(coords[0]);
    const y = parseFloat(coords[1]);
    
    let dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    setAttrs(dot, { cx: x, cy: y, r: 4, class: "chart-dot" });
    
    let title = document.createElementNS("http://www.w3.org/2000/svg", "title");
    title.textContent = `Revenue: ₹ ${formatNumber(p.val)}`;
    dot.appendChild(title);
    svg.appendChild(dot);
  });
  
  const steps = 4;
  for (let i = 0; i <= steps; i++) {
    const yVal = (maxVal / steps) * i;
    const y = height - padding - ((yVal / maxVal) * chartHeight);
    
    let lbl = document.createElementNS("http://www.w3.org/2000/svg", "text");
    setAttrs(lbl, { x: padding - 8, y: y + 4, class: "chart-text", "text-anchor": "end" });
    lbl.textContent = Math.round(yVal / 1000) + "k";
    svg.appendChild(lbl);
  }
}

function drawCostlyVehiclesChart() {
  const svg = document.getElementById("svg-costly-vehicles");
  svg.innerHTML = "";
  
  let vehCosts = {};
  state.vehicles.forEach(v => {
    vehCosts[v.regNo] = 0;
  });
  state.maintenance.forEach(m => {
    if (vehCosts[m.vehicle] !== undefined) vehCosts[m.vehicle] += m.cost;
  });
  state.fuel.forEach(f => {
    if (vehCosts[f.vehicle] !== undefined) vehCosts[f.vehicle] += f.cost;
  });
  
  const dataset = Object.entries(vehCosts).map(([reg, cost]) => {
    const model = getVehicleByReg(reg)?.model || reg;
    return { label: model, val: cost };
  }).sort((a,b) => b.val - a.val).slice(0, 4);
  
  const width = 500;
  const height = 250;
  const padding = 40;
  
  const maxVal = Math.max(...dataset.map(d => d.val), 5000) * 1.1;
  const chartHeight = height - 2 * padding;
  const chartWidth = width - 2 * padding;
  const barWidth = (chartWidth / dataset.length) * 0.6;
  const barSpacing = (chartWidth / dataset.length);
  
  let yAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
  setAttrs(yAxis, { x1: padding, y1: padding, x2: padding, y2: height - padding, class: "chart-axis-line" });
  svg.appendChild(yAxis);
  
  let xAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
  setAttrs(xAxis, { x1: padding, y1: height - padding, x2: width - padding, y2: height - padding, class: "chart-axis-line" });
  svg.appendChild(xAxis);
  
  dataset.forEach((item, idx) => {
    const x = padding + (idx * barSpacing) + (barSpacing - barWidth) / 2;
    const barHeight = (item.val / maxVal) * chartHeight;
    const y = height - padding - barHeight;
    
    let bar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    setAttrs(bar, { x: x, y: y, width: barWidth, height: barHeight, class: "chart-bar", rx: 4 });
    
    let title = document.createElementNS("http://www.w3.org/2000/svg", "title");
    title.textContent = `${item.label}: ₹ ${formatNumber(item.val)}`;
    bar.appendChild(title);
    svg.appendChild(bar);
    
    let lbl = document.createElementNS("http://www.w3.org/2000/svg", "text");
    setAttrs(lbl, { x: x + barWidth/2, y: height - padding + 18, class: "chart-text", "text-anchor": "middle" });
    lbl.textContent = item.label;
    svg.appendChild(lbl);
    
    let valLbl = document.createElementNS("http://www.w3.org/2000/svg", "text");
    setAttrs(valLbl, { x: x + barWidth/2, y: y - 6, class: "chart-text", "text-anchor": "middle", fill: "var(--text-primary)" });
    valLbl.textContent = Math.round(item.val / 1000) + "k";
    svg.appendChild(valLbl);
  });
  
  const steps = 4;
  for (let i = 0; i <= steps; i++) {
    const yVal = (maxVal / steps) * i;
    const y = height - padding - ((yVal / maxVal) * chartHeight);
    
    let lbl = document.createElementNS("http://www.w3.org/2000/svg", "text");
    setAttrs(lbl, { x: padding - 8, y: y + 4, class: "chart-text", "text-anchor": "end" });
    lbl.textContent = Math.round(yVal / 1000) + "k";
    svg.appendChild(lbl);
  }
}

function setAttrs(el, attrs) {
  for (const key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

// --- Settings Panel ---
function renderSettings() {
  document.getElementById("settings-depot").value = state.settings.depot;
  document.getElementById("settings-currency").value = state.settings.currency;
  document.getElementById("settings-distance").value = state.settings.distanceUnit;
  
  // Render interactive RBAC settings Matrix
  const matrixTbody = document.getElementById("rbac-settings-tbody");
  matrixTbody.innerHTML = "";
  
  const canUpdateRbac = canDo("roleManagement", "update");

  for (const [role, perms] of Object.entries(state.rbac)) {
    matrixTbody.innerHTML += `
      <tr>
        <td><strong>${role}</strong></td>
        <td>${renderMatrixCheck(role, "vehicleRegistry", perms.vehicleRegistry?.view, canUpdateRbac)}</td>
        <td>${renderMatrixCheck(role, "driverManagement", perms.driverManagement?.view, canUpdateRbac)}</td>
        <td>${renderMatrixCheck(role, "tripDispatcher", perms.tripDispatcher?.view, canUpdateRbac)}</td>
        <td>${renderMatrixCheck(role, "fuelManagement", perms.fuelManagement?.view, canUpdateRbac)}</td>
        <td>${renderMatrixCheck(role, "reportsAnalytics", perms.reportsAnalytics?.view, canUpdateRbac)}</td>
      </tr>
    `;
  }
}

function renderMatrixCheck(role, permissionKey, isAllowed, editable) {
  return `
    <label class="matrix-checkbox ${!editable ? 'disabled' : ''}">
      <input type="checkbox" ${isAllowed ? 'checked' : ''} ${!editable ? 'disabled' : ''} onchange="toggleRbacMatrixPermission('${role}', '${permissionKey}', this.checked)">
      <span class="matrix-mark"></span>
    </label>
  `;
}

function toggleRbacMatrixPermission(role, permissionKey, isChecked) {
  // Directly set actions view/create/update/delete for check roles
  state.rbac[role][permissionKey] = isChecked ? { view: true, create: true, update: true, delete: true, approve: true, export: true } : { view: false, create: false, update: false, delete: false, approve: false, export: false };
  saveStateToStorage();
  applyRBACNavigation();
  logAudit("RBAC_UPDATE", `Modified RBAC permissions on role ${role} for ${permissionKey}.`);
}

function saveSettings(e) {
  e.preventDefault();
  state.settings.depot = document.getElementById("settings-depot").value;
  state.settings.currency = document.getElementById("settings-currency").value;
  state.settings.distanceUnit = document.getElementById("settings-distance").value;
  saveStateToStorage();
  
  logAudit("SETTINGS_UPDATE", "Updated global depot and preferences settings.");
  alert("Settings updated successfully!");
  renderActiveView();
}

// --- 8. NEW PANEL: USER MANAGEMENT ---
function renderUserManagement() {
  const tbody = document.getElementById("users-tbody");
  tbody.innerHTML = "";
  
  const canCreate = canDo("userManagement", "create");
  const canUpdate = canDo("userManagement", "update");
  const canDelete = canDo("userManagement", "delete");
  
  const addBtn = document.querySelector("#view-users .btn-primary");
  if (addBtn) {
    if (canCreate) addBtn.classList.remove("hidden");
    else addBtn.classList.add("hidden");
  }

  state.users.forEach(u => {
    tbody.innerHTML += `
      <tr>
        <td><strong>${u.name}</strong></td>
        <td>${u.email}</td>
        <td><span class="badge badge-draft">${u.role}</span></td>
        <td><span class="badge ${u.active ? 'badge-available' : 'badge-retired'}">${u.active ? 'Active' : 'Deactivated'}</span></td>
        <td>
          ${canUpdate ? `
            <button class="btn btn-secondary btn-sm" onclick="toggleUserActiveState('${u.email}')">${u.active ? 'Deactivate' : 'Activate'}</button>
          ` : ''}
          ${canDelete ? `
            <button class="action-icon-btn text-rose" onclick="deleteSystemUser('${u.email}')">🗑️</button>
          ` : ''}
          ${(!canUpdate && !canDelete) ? `<span class="text-muted">—</span>` : ''}
        </td>
      </tr>
    `;
  });
}

function saveNewUser(e) {
  e.preventDefault();
  const name = document.getElementById("user-name").value;
  const email = document.getElementById("user-email").value;
  const role = document.getElementById("user-role").value;
  
  const exists = state.users.some(u => u.email === email);
  if (exists) {
    alert("User email already exists!");
    return;
  }
  
  state.users.push({ name, email, role, active: true });
  saveStateToStorage();
  
  logAudit("USER_CREATE", `Registered new user: ${email} as ${role}.`);
  closeModal("modal-add-user");
  document.getElementById("add-user-form").reset();
  renderUserManagement();
}

function toggleUserActiveState(email) {
  const u = state.users.find(usr => usr.email === email);
  if (u) {
    // Admin safety check: can't deactivate self
    if (email === state.currentUser.email) {
      alert("Deactivating your own administrator profile is blocked!");
      return;
    }
    u.active = !u.active;
    saveStateToStorage();
    logAudit("USER_UPDATE", `Toggled user status of ${email} to ${u.active ? 'Active' : 'Deactivated'}.`);
    renderUserManagement();
  }
}

function deleteSystemUser(email) {
  if (email === state.currentUser.email) {
    alert("You cannot delete your own admin account.");
    return;
  }
  if (confirm(`Remove user account ${email} completely?`)) {
    state.users = state.users.filter(u => u.email !== email);
    saveStateToStorage();
    logAudit("USER_DELETE", `Deleted user account: ${email}`);
    renderUserManagement();
  }
}

// --- 9. NEW PANEL: AUDIT LOGS ---
function renderAuditLogs() {
  const tbody = document.getElementById("audit-tbody");
  tbody.innerHTML = "";
  
  state.auditLogs.forEach(l => {
    tbody.innerHTML += `
      <tr>
        <td class="text-muted" style="font-family: monospace;">${l.timestamp}</td>
        <td><strong>${l.user}</strong></td>
        <td><span class="badge badge-draft">${l.role}</span></td>
        <td><span class="badge badge-dispatched">${l.action}</span></td>
        <td>${l.details}</td>
      </tr>
    `;
  });
}

function clearAuditLogsDirect() {
  if (confirm("Reset and purge all system audit logs?")) {
    state.auditLogs = [
      { timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19), user: state.currentUser.email, role: state.currentUser.role, action: "PURGE", details: "All operational history cleared." }
    ];
    saveStateToStorage();
    renderAuditLogs();
  }
}

// --- 10. NEW PANEL: DRIVER PORTAL ---
function renderDriverPortal() {
  const driverName = state.currentUser.name;
  
  // Update Driver view vehicle status panel
  const assignedTripsContainer = document.getElementById("driver-trips-container");
  assignedTripsContainer.innerHTML = "";
  
  // Find driver's active trips
  const driverTrips = state.trips.filter(t => t.driver === driverName);
  
  if (driverTrips.length === 0) {
    assignedTripsContainer.innerHTML = `
      <div class="no-trips-banner">
        <span>No trips currently assigned to your roster.</span>
      </div>
    `;
    return;
  }
  
  driverTrips.forEach(t => {
    let actionButtons = "";
    if (t.status === "Dispatched") {
      actionButtons = `<button class="btn btn-primary btn-sm" onclick="advanceTripStage('${t.id}', 'On Trip')">Accept &amp; Start Trip</button>`;
    } else if (t.status === "On Trip") {
      actionButtons = `
        <button class="btn btn-primary btn-sm" onclick="triggerTripCompleteModal('${t.id}')">Complete Journey</button>
        <button class="btn btn-secondary btn-sm btn-rose-border" onclick="openDriverReportIssue('${t.id}')">Report Breakdown</button>
      `;
    } else if (t.status === "Completed") {
      actionButtons = `<span class="badge badge-completed">Journey Finished</span>`;
    } else {
      actionButtons = `<span class="badge badge-draft">${t.status}</span>`;
    }
    
    const vehObj = getVehicleByReg(t.vehicle);
    
    assignedTripsContainer.innerHTML += `
      <div class="driver-trip-card">
        <div class="trip-card-header">
          <h3>TRIP ID: ${t.id}</h3>
          <span class="badge badge-${t.status.toLowerCase().replace(" ", "")}">${t.status}</span>
        </div>
        <div class="trip-card-body">
          <div class="route-display">
            <strong>${t.source}</strong> &rarr; <strong>${t.destination}</strong>
          </div>
          <div class="trip-details-grid">
            <div><span>Vehicle:</span> <strong>${vehObj ? vehObj.model : '—'} (${t.vehicle})</strong></div>
            <div><span>Weight:</span> <strong>${t.weight} kg</strong></div>
            <div><span>Distance:</span> <strong>${t.distance} km</strong></div>
            <div><span>ETA:</span> <strong>${t.eta || '—'}</strong></div>
          </div>
        </div>
        <div class="trip-card-actions">
          ${actionButtons}
        </div>
      </div>
    `;
  });
}

function openDriverReportIssue(tripId) {
  const trip = state.trips.find(t => t.id === tripId);
  if (!trip) return;
  
  document.getElementById("issue-trip-id").value = tripId;
  document.getElementById("issue-vehicle-reg").value = trip.vehicle;
  openModal("modal-driver-issue");
}

function saveDriverReportIssue(e) {
  e.preventDefault();
  const tripId = document.getElementById("issue-trip-id").value;
  const vehicle = document.getElementById("issue-vehicle-reg").value;
  const desc = document.getElementById("issue-desc").value;
  
  // Set vehicle status in shop
  setVehicleStatus(vehicle, "In Shop");
  
  // Set trip to Cancelled
  const trip = state.trips.find(t => t.id === tripId);
  if (trip) {
    trip.status = "Cancelled";
    trip.eta = "—";
  }
  
  // Add maintenance record for repair
  state.maintenance.unshift({
    vehicle,
    service: "Emergency Repair: " + desc,
    cost: 5000, // standard estimate
    date: getTodayDateString(),
    status: "In Shop"
  });
  
  saveStateToStorage();
  logAudit("BREAKDOWN_REPORT", `Driver reported breakdown for ${vehicle} on trip ${tripId}. Service log created.`);
  closeModal("modal-driver-issue");
  document.getElementById("driver-issue-form").reset();
  
  alert("Breakdown reported. Vehicle is routed to workshop. Trip has been cancelled.");
  renderDriverPortal();
}

// --- 11. TRIP LIFECYCLE WORKFLOWS ---
function validateTripCapacity() {
  const vehReg = document.getElementById("trip-vehicle").value;
  const weightInput = document.getElementById("trip-weight").value;
  const errContainer = document.getElementById("capacity-error-container");
  const submitBtn = document.getElementById("trip-submit-btn");
  const capInfo = document.getElementById("trip-vehicle-cap-info");
  
  if (!vehReg) {
    errContainer.classList.add("hidden");
    submitBtn.disabled = false;
    capInfo.textContent = "Select a vehicle to inspect capacity";
    return;
  }
  
  const vehicle = getVehicleByReg(vehReg);
  if (!vehicle) return;
  
  capInfo.textContent = `Capacity: ${vehicle.capacity} kg | Odometer: ${formatNumber(vehicle.odometer)} km`;
  
  if (!weightInput) {
    errContainer.classList.add("hidden");
    submitBtn.disabled = false;
    return;
  }
  
  const cargoWeight = parseFloat(weightInput);
  if (cargoWeight > vehicle.capacity) {
    const diff = cargoWeight - vehicle.capacity;
    document.getElementById("capacity-error-text").innerHTML = `
      Vehicle Capacity: <strong>${vehicle.capacity} kg</strong> | Cargo Weight: <strong>${cargoWeight} kg</strong>.<br>
      ❌ Capacity exceeded by <strong>${diff} kg</strong> — dispatch blocked
    `;
    errContainer.classList.remove("hidden");
    submitBtn.disabled = true;
  } else {
    errContainer.classList.add("hidden");
    submitBtn.disabled = false;
  }
}

function advanceTripStage(tripId, nextStage) {
  const trip = state.trips.find(t => t.id === tripId);
  if (!trip) return;
  
  if (nextStage === "On Trip") {
    setVehicleStatus(trip.vehicle, "On Trip");
    setDriverStatus(trip.driver, "On Trip");
  } else if (nextStage === "Cancelled") {
    setVehicleStatus(trip.vehicle, "Available");
    setDriverStatus(trip.driver, "Available");
  }
  
  trip.status = nextStage;
  trip.eta = nextStage === "On Trip" ? "45 min" : nextStage === "Dispatched" ? "1h 10m" : "—";
  
  saveStateToStorage();
  logAudit("TRIP_STAGE", `Trip ${tripId} status updated to ${nextStage}.`);
  renderActiveView();
}

function triggerTripCompleteModal(tripId) {
  const trip = state.trips.find(t => t.id === tripId);
  if (!trip) return;
  
  const vehicle = getVehicleByReg(trip.vehicle);
  if (!vehicle) return;

  document.getElementById("complete-trip-id").textContent = trip.id;
  document.getElementById("complete-trip-hidden-id").value = trip.id;
  document.getElementById("complete-trip-vehicle").textContent = vehicle.model;
  document.getElementById("complete-trip-driver").textContent = trip.driver;
  
  const completeOdo = document.getElementById("complete-odometer");
  completeOdo.min = vehicle.odometer + 1;
  completeOdo.value = vehicle.odometer + trip.distance;
  document.getElementById("complete-odometer-current").textContent = `Current odometer: ${formatNumber(vehicle.odometer)} km`;
  
  document.getElementById("complete-fuel-liters").value = Math.round(trip.distance / 8);
  document.getElementById("complete-fuel-cost").value = Math.round((trip.distance / 8) * 85);
  document.getElementById("complete-toll").value = 120;
  document.getElementById("complete-other").value = 0;
  
  openModal("modal-complete-trip");
}

function saveCompletedTrip(e) {
  e.preventDefault();
  
  const id = document.getElementById("complete-trip-hidden-id").value;
  const trip = state.trips.find(t => t.id === id);
  if (!trip) return;
  
  const vehicle = getVehicleByReg(trip.vehicle);
  if (!vehicle) return;

  const odo = parseInt(document.getElementById("complete-odometer").value);
  const liters = parseFloat(document.getElementById("complete-fuel-liters").value);
  const fuelCost = parseInt(document.getElementById("complete-fuel-cost").value);
  const toll = parseInt(document.getElementById("complete-toll").value);
  const other = parseInt(document.getElementById("complete-other").value);
  
  if (odo <= vehicle.odometer) {
    alert("Odometer reading must exceed current reading!");
    return;
  }
  
  trip.status = "Completed";
  trip.eta = "—";
  
  vehicle.odometer = odo;
  vehicle.status = "Available";
  setDriverStatus(trip.driver, "Available");
  
  state.fuel.push({
    vehicle: trip.vehicle,
    date: getTodayDateString(),
    liters: liters,
    cost: fuelCost
  });
  
  const totalExpense = toll + other;
  state.expenses.push({
    trip: trip.id,
    vehicle: trip.vehicle,
    toll: toll,
    other: other,
    maint: 0,
    total: totalExpense
  });
  
  saveStateToStorage();
  logAudit("TRIP_COMPLETE", `Trip ${trip.id} completed. Added fuel & expense records. Vehicle and Driver released.`);
  closeModal("modal-complete-trip");
  renderActiveView();
}

function resetTripForm() {
  document.getElementById("create-trip-form").reset();
  validateTripCapacity();
}

// --- 12. CRUD ACTIONS CONTROLLERS ---
function saveNewVehicle(e) {
  e.preventDefault();
  const regNo = document.getElementById("vehicle-reg").value.toUpperCase().replace(/\s/g, '');
  const model = document.getElementById("vehicle-model").value;
  const type = document.getElementById("vehicle-type").value;
  const capacity = parseInt(document.getElementById("vehicle-capacity").value);
  const odometer = parseInt(document.getElementById("vehicle-odometer").value);
  const acqCost = parseInt(document.getElementById("vehicle-cost").value);
  
  const exists = state.vehicles.some(v => v.regNo === regNo);
  if (exists) {
    document.getElementById("vehicle-reg-error").classList.remove("hidden");
    return;
  }
  
  document.getElementById("vehicle-reg-error").classList.add("hidden");
  
  state.vehicles.push({ regNo, model, type, capacity, odometer, acqCost, status: "Available" });
  saveStateToStorage();
  logAudit("ASSET_CREATE", `Registered vehicle ${regNo} (${model}).`);
  closeModal("modal-add-vehicle");
  document.getElementById("add-vehicle-form").reset();
  renderActiveView();
}

function deleteVehicle(regNo) {
  if (confirm(`Remove vehicle ${regNo} from system registries?`)) {
    state.vehicles = state.vehicles.filter(v => v.regNo !== regNo);
    saveStateToStorage();
    logAudit("ASSET_DELETE", `Removed vehicle ${regNo}.`);
    renderActiveView();
  }
}

function saveNewDriver(e) {
  e.preventDefault();
  const name = document.getElementById("driver-name").value;
  const licenseNo = document.getElementById("driver-license").value;
  const category = document.getElementById("driver-category").value;
  const rawExpiry = document.getElementById("driver-expiry").value; 
  const contact = document.getElementById("driver-contact").value;
  const safetyScore = parseInt(document.getElementById("driver-safety").value);
  
  state.drivers.push({ name, licenseNo, category, expiry: rawExpiry, contact, tripCompl: 0, safetyScore, status: "Available" });
  saveStateToStorage();
  logAudit("DRIVER_CREATE", `Added driver ${name} (Lic: ${licenseNo}).`);
  closeModal("modal-add-driver");
  document.getElementById("add-driver-form").reset();
  renderActiveView();
}

function setDriverStatus(name, nextStatus) {
  const driver = state.drivers.find(d => d.name === name);
  if (driver) {
    driver.status = nextStatus;
    saveStateToStorage();
    logAudit("DRIVER_STATUS", `Set driver status of ${name} to ${nextStatus}.`);
    renderActiveView();
  }
}

function saveServiceRecord(e) {
  e.preventDefault();
  const vehicle = document.getElementById("service-vehicle").value;
  const service = document.getElementById("service-type").value;
  const cost = parseInt(document.getElementById("service-cost").value);
  const date = document.getElementById("service-date").value;
  const status = document.getElementById("service-status").value;
  
  state.maintenance.push({ vehicle, service, cost, date, status });
  
  if (status === "In Shop") {
    setVehicleStatus(vehicle, "In Shop");
  } else {
    setVehicleStatus(vehicle, "Available");
  }
  
  state.expenses.push({ trip: "MAINTENANCE", vehicle: vehicle, toll: 0, other: 0, maint: cost, total: cost });
  saveStateToStorage();
  logAudit("SERVICE_LOG", `Added service record for ${vehicle}: ${service}. Cost ₹${cost}. Status: ${status}.`);
  closeModal("modal-add-service");
  document.getElementById("add-service-form").reset();
  renderActiveView();
}

function completeServiceDirect(index) {
  const maint = state.maintenance[index];
  if (maint) {
    maint.status = "Completed";
    setVehicleStatus(maint.vehicle, "Available");
    saveStateToStorage();
    logAudit("SERVICE_COMPLETE", `Completed service session for ${maint.vehicle}. Asset returned to pool.`);
    renderActiveView();
  }
}

function logServiceDirect(regNo) {
  switchView("maintenance");
  openModal("modal-add-service");
  document.getElementById("service-vehicle").value = regNo;
}

function saveFuelLog(e) {
  e.preventDefault();
  const vehicle = document.getElementById("fuel-vehicle").value;
  const liters = parseFloat(document.getElementById("fuel-liters").value);
  const cost = parseInt(document.getElementById("fuel-cost").value);
  const date = document.getElementById("fuel-date").value;
  
  state.fuel.push({ vehicle, date, liters, cost });
  saveStateToStorage();
  logAudit("FUEL_LOG", `Logged fuel fill-up for ${vehicle}: ${liters} liters, cost ₹${cost}.`);
  closeModal("modal-log-fuel");
  document.getElementById("log-fuel-form").reset();
  renderActiveView();
}

function saveExpenseLog(e) {
  e.preventDefault();
  const tripId = document.getElementById("expense-trip").value;
  const toll = parseInt(document.getElementById("expense-toll").value);
  const other = parseInt(document.getElementById("expense-other").value);
  
  const trip = state.trips.find(t => t.id === tripId);
  if (!trip) return;
  
  state.expenses.push({ trip: tripId, vehicle: trip.vehicle, toll, other, maint: 0, total: toll + other });
  saveStateToStorage();
  logAudit("EXPENSE_LOG", `Logged expenses for trip ${tripId}: Toll ₹${toll}, Other ₹${other}.`);
  closeModal("modal-add-expense");
  document.getElementById("add-expense-form").reset();
  renderActiveView();
}

// --- 13. VIEW TAB CONTROLLERS & EXPORT ---
function switchExpenseTab(tabId) {
  document.querySelectorAll(".tabs-header .tab-btn").forEach(btn => btn.classList.remove("active"));
  document.querySelectorAll(".tabs-content .tab-pane").forEach(pane => pane.classList.remove("active"));
  event.target.classList.add("active");
  document.getElementById(`tab-${tabId}`).classList.add("active");
}

function exportDataToCSV() {
  let csvContent = "data:text/csv;charset=utf-8,";
  
  csvContent += "--- VEHICLE REGISTRY ---\n";
  csvContent += "Registration No,Model,Type,Capacity (kg),Odometer (km),Acq Cost (INR),Status\n";
  state.vehicles.forEach(v => {
    csvContent += `${v.regNo},${v.model},${v.type},${v.capacity},${v.odometer},${v.acqCost},${v.status}\n`;
  });
  
  csvContent += "\n--- ACTIVE DRIVERS ---\n";
  csvContent += "Name,License No,Category,License Expiry,Contact,Safety Score,Status\n";
  state.drivers.forEach(d => {
    csvContent += `${d.name},${d.licenseNo},${d.category},${d.expiry},${d.contact},${d.safetyScore}%,${d.status}\n`;
  });

  csvContent += "\n--- DISPATCHED TRIPS ---\n";
  csvContent += "Trip ID,Vehicle,Driver,Status,Source,Destination,Cargo Weight,Distance\n";
  state.trips.forEach(t => {
    csvContent += `${t.id},${t.vehicle},${t.driver},${t.status},${t.source},${t.destination},${t.weight},${t.distance}\n`;
  });

  csvContent += "\n--- FUEL FILL LOG ---\n";
  csvContent += "Vehicle,Date,Liters,Fuel Cost\n";
  state.fuel.forEach(f => {
    csvContent += `${f.vehicle},${f.date},${f.liters},${f.cost}\n`;
  });

  csvContent += "\n--- GENERAL EXPENSE SUMMARY ---\n";
  csvContent += "Trip ID,Vehicle,Toll (INR),Other (INR),Maintenance (INR),Total Cost\n";
  state.expenses.forEach(e => {
    csvContent += `${e.trip},${e.vehicle},${e.toll},${e.other},${e.maint},${e.total}\n`;
  });

  logAudit("REPORT_EXPORT", "Exported system operational records to CSV.");
  
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `transitops_complete_report_${getTodayDateString()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// --- 14. GENERAL HELPERS & MODALS ---
function openModal(modalId) {
  document.getElementById(modalId).classList.remove("hidden");
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.add("hidden");
}

function getVehicleByReg(reg) {
  return state.vehicles.find(v => v.regNo === reg);
}

function setVehicleStatus(reg, status) {
  const v = getVehicleByReg(reg);
  if (v) v.status = status;
}

function checkDriverLicenseExpired(driver) {
  let expYear = 2026;
  let expMonth = 7;
  const raw = driver.expiry;
  if (raw.includes("/")) {
    const parts = raw.split("/");
    expMonth = parseInt(parts[0]);
    expYear = parseInt(parts[1]);
  } else if (raw.includes("-")) {
    const parts = raw.split("-");
    expYear = parseInt(parts[0]);
    expMonth = parseInt(parts[1]);
  }
  const currentYear = 2026;
  const currentMonth = 7;
  if (expYear < currentYear) return true;
  if (expYear === currentYear && expMonth < currentMonth) return true;
  return false;
}

function getTodayDateString() {
  const d = new Date();
  return d.toISOString().split('T')[0];
}

function formatNumber(n) {
  return n.toLocaleString("en-IN");
}

function formatCurrency(n) {
  const symbol = state.settings.currency === "USD" ? "$" : state.settings.currency === "EUR" ? "€" : "₹";
  return `${symbol} ${formatNumber(n)}`;
}

function padNum(n) {
  return n < 10 ? `0${n}` : `${n}`;
}

// --- 15. DOM LISTENERS BINDING ---
function initEventListeners() {
  document.getElementById("login-form").addEventListener("submit", handleLogin);
  document.getElementById("logout-btn").addEventListener("click", handleLogout);
  
  // Sync Role Dropdown switcher
  document.getElementById("quick-role-select").addEventListener("change", (e) => {
    const nextRole = e.target.value;
    
    // Find first user with this role to simulate login session
    const u = state.users.find(usr => usr.role === nextRole && usr.active);
    if (u) {
      state.currentUser = u;
      sessionStorage.setItem("to_current_user", JSON.stringify(state.currentUser));
      document.getElementById("header-user-name").textContent = u.name;
      document.getElementById("header-role-badge").textContent = u.role;
      
      const initials = u.name.split(" ").map(n => n[0]).join("").toUpperCase();
      document.getElementById("header-avatar").textContent = initials;
      
      applyRBACNavigation();
      
      if (u.role === "Driver") {
        switchView("driver-portal");
      } else {
        if (state.activeView === "driver-portal") {
          switchView("dashboard");
        } else {
          switchView(state.activeView);
        }
      }
      logAudit("ROLE_SWITCH", `Demo dashboard role switched to ${nextRole}.`);
    }
  });

  // Navigations
  document.querySelectorAll(".sidebar-nav .nav-item").forEach(item => {
    item.addEventListener("click", () => {
      const view = item.getAttribute("data-view");
      switchView(view);
    });
  });

  // Forms
  document.getElementById("add-vehicle-form").addEventListener("submit", saveNewVehicle);
  document.getElementById("add-driver-form").addEventListener("submit", saveNewDriver);
  document.getElementById("add-service-form").addEventListener("submit", saveServiceRecord);
  document.getElementById("log-fuel-form").addEventListener("submit", saveFuelLog);
  document.getElementById("add-expense-form").addEventListener("submit", saveExpenseLog);
  document.getElementById("settings-form").addEventListener("submit", saveSettings);
  
  // Custom forms
  document.getElementById("add-user-form").addEventListener("submit", saveNewUser);
  document.getElementById("driver-issue-form").addEventListener("submit", saveDriverReportIssue);

  // Dispatch Trip
  document.getElementById("create-trip-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const source = document.getElementById("trip-source").value;
    const dest = document.getElementById("trip-destination").value;
    const vehReg = document.getElementById("trip-vehicle").value;
    const driver = document.getElementById("trip-driver").value;
    const weight = parseInt(document.getElementById("trip-weight").value);
    const distance = parseInt(document.getElementById("trip-distance").value);
    
    const newId = `TR${padNum(state.trips.length + 1)}`;
    state.trips.push({
      id: newId,
      vehicle: vehReg,
      driver: driver,
      status: "Draft",
      source: source,
      destination: dest,
      weight: weight,
      distance: distance,
      eta: "Awaiting vehicle"
    });
    
    saveStateToStorage();
    logAudit("TRIP_CREATE", `Created new trip draft ${newId}. Route: ${source} -> ${dest}.`);
    resetTripForm();
    renderActiveView();
  });
  
  document.getElementById("complete-trip-form").addEventListener("submit", saveCompletedTrip);

  document.getElementById("global-search").addEventListener("input", (e) => {
    const val = e.target.value.toLowerCase();
    if (state.activeView === "fleet") {
      document.getElementById("search-vehicle").value = val;
      applyVehicleFilters();
    }
  });
}
