const categories = ["T1", "T2", "T3", "T4+", "Maison", "Autre"];
const slotsPerCategory = 20;
const supabaseUrl = "https://ivwvrtnbzvsxrsmqkrff.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2d3ZydG5ienZzeHJzbXFrcmZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMyMjM3MjUsImV4cCI6MjA5ODc5OTcyNX0.-vxDlYB1L6t-NZnjEdrJXbpbQn1n-s3XCA--CEqcK-w";
const supabaseClient = globalThis.supabase?.createClient(supabaseUrl, supabaseAnonKey);
const registryStorageKey = "cles-location-active-registry-v1";
const sharedContactsStorageKey = "cles-location-intervenants-v1";
const appActivityLogStorageKey = "cles-global-activity-v1";
const deviceNameStorageKey = "cles-device-name-v1";
const tileViewStorageKey = "cles-tile-view-mode-v1";
const photoMaxSize = 650;
const photoJpegQuality = 0.45;
const photoOptimizationStorageKey = "cles-photo-optimization-650-v1";
const registryConfig = {
  location: {
    title: "CENTURY 21 LES MINIMES\nCL\u00c9S LOCATION",
    toggleLabel: "BASCULER VERS\nTABLEAU CL\u00c9S TRANSACTION",
    keysStorageKey: "cles-immobilieres-v1",
    archivesStorageKey: "cles-location-archives-v1",
    archiveActionLabel: "Loué",
    rentedArchiveTitle: "Biens loués",
    rentedArchiveEmpty: "Aucun bien loué.",
    rentedArchiveText: "Loué",
  },
  transaction: {
    title: "CENTURY 21 LES MINIMES\nCL\u00c9S TRANSACTION",
    toggleLabel: "BASCULER VERS\nTABLEAU CL\u00c9S LOCATION",
    keysStorageKey: "cles-transaction-v1",
    archivesStorageKey: "cles-transaction-archives-v1",
    archiveActionLabel: "Compromis",
    rentedArchiveTitle: "Biens compromis",
    rentedArchiveEmpty: "Aucun bien en compromis.",
    rentedArchiveText: "Compromis",
  },
};

const keySetOptions = [
  { id: "main", label: "Jeu 1" },
  { id: "double", label: "Jeu 2" },
  { id: "triple", label: "Jeu 3" },
  { id: "quad", label: "Jeu 4" },
];

const appTitle = document.querySelector("#appTitle");
const appTitleText = document.querySelector(".app-title-text");
const registryToggleBtn = document.querySelector("#registryToggleBtn");
const grid = document.querySelector("#keyGrid");
const detailPanel = document.querySelector("#detailPanel");
const form = document.querySelector("#keyForm");
const selectedTitle = document.querySelector("#selectedTitle");
const statusPill = document.querySelector("#statusPill");
const keySetCountSelect = document.querySelector("#keySetCountSelect");
const propertyInput = document.querySelector("#propertyInput");
const postalCodeInput = document.querySelector("#postalCodeInput");
const cityInput = document.querySelector("#cityInput");
const ownerInput = document.querySelector("#ownerInput");
const notesInput = document.querySelector("#notesInput");
const keySetPhotoList = document.querySelector("#keySetPhotoList");
const keySetSelect = document.querySelector("#keySetSelect");
const contactSelect = document.querySelector("#contactSelect");
const movementPersonInput = document.querySelector("#movementPersonInput");
const movementCompanyInput = document.querySelector("#movementCompanyInput");
const movementPhoneInput = document.querySelector("#movementPhoneInput");
const movementNoteInput = document.querySelector("#movementNoteInput");
const checkoutBtn = document.querySelector("#checkoutBtn");
const checkinBtn = document.querySelector("#checkinBtn");
const rentedBtn = document.querySelector("#rentedBtn");
const removedBtn = document.querySelector("#removedBtn");
const reservedBtn = document.querySelector("#reservedBtn");
const exportKeyCsvBtn = document.querySelector("#exportKeyCsvBtn");
const deleteSelectedKeyBtn = document.querySelector("#deleteSelectedKeyBtn");
const signatureCanvas = document.querySelector("#signatureCanvas");
const clearSignatureBtn = document.querySelector("#clearSignatureBtn");
const historyList = document.querySelector("#historyList");
const searchInput = document.querySelector("#searchInput");
const textViewBtn = document.querySelector("#textViewBtn");
const photoViewBtn = document.querySelector("#photoViewBtn");
const statusFilter = document.querySelector("#statusFilter");
const closePanelBtn = document.querySelector("#closePanelBtn");
const saleCelebration = document.querySelector("#saleCelebration");
const celebrationSky = saleCelebration?.querySelector(".celebration-sky");
const compromisesTabBtn = document.querySelector("#compromisesTabBtn");
const compromisesPanel = document.querySelector("#compromisesPanel");
const closeCompromisesBtn = document.querySelector("#closeCompromisesBtn");
const compromisesList = document.querySelector("#compromisesList");
const archivesTabBtn = document.querySelector("#archivesTabBtn");
const archivesPanel = document.querySelector("#archivesPanel");
const closeArchivesBtn = document.querySelector("#closeArchivesBtn");
const rentedArchiveSection = document.querySelector("#rentedArchiveSection");
const authenticatedArchiveSection = document.querySelector("#authenticatedArchiveSection");
const rentedArchiveTitle = document.querySelector("#rentedArchiveTitle");
const rentedList = document.querySelector("#rentedList");
const removedList = document.querySelector("#removedList");
const authenticatedList = document.querySelector("#authenticatedList");
const contactsTabBtn = document.querySelector("#contactsTabBtn");
const contactsPanel = document.querySelector("#contactsPanel");
const closeContactsBtn = document.querySelector("#closeContactsBtn");
const contactForm = document.querySelector("#contactForm");
const contactFirstNameLabel = document.querySelector("#contactFirstNameLabel");
const contactFirstNameInput = document.querySelector("#contactFirstNameInput");
const contactNameLabel = document.querySelector("#contactNameLabel");
const contactNameInput = document.querySelector("#contactNameInput");
const contactCompanyLabel = document.querySelector("#contactCompanyLabel");
const contactCompanyInput = document.querySelector("#contactCompanyInput");
const contactPhoneInput = document.querySelector("#contactPhoneInput");
const addContactBtn = document.querySelector("#addContactBtn");
const contactsList = document.querySelector("#contactsList");
const contactTabs = [...document.querySelectorAll(".contact-tab")];
const undoBtn = document.querySelector("#undoBtn");
const historyDataBtn = document.querySelector("#historyDataBtn");
const globalHistoryPanel = document.querySelector("#globalHistoryPanel");
const closeGlobalHistoryBtn = document.querySelector("#closeGlobalHistoryBtn");
const globalHistoryList = document.querySelector("#globalHistoryList");
const exportFilledDataBtn = document.querySelector("#exportFilledDataBtn");
const backupDataBtn = document.querySelector("#backupDataBtn");
const importDataBtn = document.querySelector("#importDataBtn");
const backupFileInput = document.querySelector("#backupFileInput");

let activeRegistry = loadActiveRegistry();
let keys = loadKeys();
let archives = loadArchives();
let contacts = loadContacts();
let selectedId = null;
let selectedSetId = "main";
let selectedArchiveRecord = null;
let draggedKeyId = null;
let activeContactType = "internal";
let isSigning = false;
let hasSignature = false;
let contactsCloseTimer = null;
let archivesCloseTimer = null;
let detailCloseTimer = null;
let draggedContactId = null;
let touchContactDrag = null;
let editingContactId = null;
let hoveredKeyId = null;
let isDetailPanelHovered = false;
let isPhotoImporting = false;
let photoImportResetTimer = null;
let undoSnapshot = null;
let tileViewMode = loadTileViewMode();
let saleCelebrationTimer = null;
const celebrationAudioFiles = ["Ados.mp3", "Adultes.mp3", "Langue.mp3"];
let celebrationAudioPlayers = [];
let lastCloudSnapshot = "";
let photoViewer = null;
let lastLocalEditAt = 0;
let isApplyingCloudState = false;

function markLocalEdit() {
  if (!isApplyingCloudState) lastLocalEditAt = Date.now();
}

function loadTileViewMode() {
  return localStorage.getItem(tileViewStorageKey) === "photo" ? "photo" : "text";
}

function setTileViewMode(mode) {
  tileViewMode = mode === "photo" ? "photo" : "text";
  localStorage.setItem(tileViewStorageKey, tileViewMode);
  updateTileViewToggle();
  renderGrid();
}

function updateTileViewToggle() {
  textViewBtn.classList.toggle("is-active", tileViewMode === "text");
  photoViewBtn.classList.toggle("is-active", tileViewMode === "photo");
  textViewBtn.setAttribute("aria-pressed", String(tileViewMode === "text"));
  photoViewBtn.setAttribute("aria-pressed", String(tileViewMode === "photo"));
  grid.dataset.viewMode = tileViewMode;
}

function getDeviceName() {
  const userAgent = navigator.userAgent || "";
  const platform = navigator.platform || "";
  const deviceType = /Mobi|Android|iPhone/i.test(userAgent) ? "Téléphone" : /iPad|Tablet/i.test(userAgent) ? "Tablette" : "PC";
  const browser = userAgent.includes("Firefox")
    ? "Firefox"
    : userAgent.includes("Edg")
      ? "Edge"
      : userAgent.includes("Chrome")
        ? "Chrome"
        : userAgent.includes("Safari")
          ? "Safari"
          : "Navigateur";
  return [deviceType, platform, browser].filter(Boolean).join(" - ");
}

function getDetectedDeviceName() {
  const userAgent = navigator.userAgent || "";
  const platform = navigator.platform || "";
  const isIpad = /iPad/i.test(userAgent) || (platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const isIphone = /iPhone/i.test(userAgent);
  const isAndroid = /Android/i.test(userAgent);
  const isMac = /Mac/i.test(platform);
  const isWindows = /Win/i.test(platform);

  if (isIphone) return "iPhone";
  if (isIpad) return "iPad";
  if (isAndroid) return "Téléphone Android";
  if (isMac) return "Mac";
  if (isWindows) return "PC Windows";
  return "Appareil";
}

function ensureDeviceName() {
  const savedName = localStorage.getItem(deviceNameStorageKey)?.trim();
  if (savedName) return savedName;

  const detectedName = getDetectedDeviceName();
  const customName = prompt("Nom de cet appareil pour l'historique :", detectedName);
  const deviceName = customName?.trim() || detectedName;
  localStorage.setItem(deviceNameStorageKey, deviceName);
  return deviceName;
}

function getDeviceName() {
  return localStorage.getItem(deviceNameStorageKey)?.trim() || ensureDeviceName();
}

function loadActivityLog() {
  return parseStoredArray(appActivityLogStorageKey, []);
}

function saveActivityLog(entries) {
  markLocalEdit();
  localStorage.setItem(appActivityLogStorageKey, JSON.stringify(entries.slice(0, 600)));
  syncStorageKeyToCloud(appActivityLogStorageKey);
}

function logActivity(action, title, details = "") {
  const entries = loadActivityLog();
  entries.unshift({
    id: `activity-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    date: new Date().toISOString(),
    action,
    title,
    details,
    device: getDeviceName(),
    registry: activeRegistry,
  });
  saveActivityLog(entries);
}

function makeKeySet(id) {
  const option = keySetOptions.find((set) => set.id === id) || keySetOptions[0];
  return {
    id: option.id,
    label: option.label,
    photo: "",
    holder: "",
    holderCompany: "",
    holderPhone: "",
    status: "available",
    history: [],
  };
}

function loadActiveRegistry() {
  const saved = localStorage.getItem(registryStorageKey);
  return saved === "transaction" ? "transaction" : "location";
}

function saveActiveRegistry() {
  markLocalEdit();
  localStorage.setItem(registryStorageKey, activeRegistry);
  syncStorageKeyToCloud(registryStorageKey);
}

function getBackupStorageKeys() {
  return [
    registryStorageKey,
    sharedContactsStorageKey,
    appActivityLogStorageKey,
    registryConfig.location.keysStorageKey,
    registryConfig.location.archivesStorageKey,
    registryConfig.transaction.keysStorageKey,
    registryConfig.transaction.archivesStorageKey,
  ];
}

function parseStorageValue(value) {
  if (typeof value !== "string") return null;

  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function stringifyCloudValue(value) {
  return typeof value === "string" ? value : JSON.stringify(value);
}

function saveStorageValue(storageKey, value) {
  if (typeof value === "string") {
    localStorage.setItem(storageKey, value);
  } else {
    localStorage.removeItem(storageKey);
  }
}

function syncStorageKeyToCloud(storageKey) {
  if (!supabaseClient) return Promise.resolve();

  const value = localStorage.getItem(storageKey);
  const request =
    value === null
      ? supabaseClient.from("app_state").delete().eq("key", storageKey)
      : supabaseClient.from("app_state").upsert({
          key: storageKey,
          value: parseStorageValue(value),
          updated_at: new Date().toISOString(),
        });

  return request.then(({ error }) => {
    if (error) console.warn("Supabase sync failed", storageKey, error.message);
  });
}

function syncAllStorageToCloud() {
  return Promise.all(getBackupStorageKeys().map(syncStorageKeyToCloud));
}

function syncCurrentRegistryToCloud() {
  return Promise.all([
    syncStorageKeyToCloud(getRegistryConfig().keysStorageKey),
    syncStorageKeyToCloud(getRegistryConfig().archivesStorageKey),
    syncStorageKeyToCloud(appActivityLogStorageKey),
  ]);
}

function getCloudSnapshot(rows) {
  return JSON.stringify(
    [...rows]
      .map((row) => ({ key: row.key, value: row.value }))
      .sort((first, second) => first.key.localeCompare(second.key)),
  );
}

async function loadStorageFromCloud() {
  if (!supabaseClient) return;
  if (isPhotoImporting) return;

  const { data, error } = await supabaseClient.from("app_state").select("key,value");
  if (error) {
    console.warn("Supabase load failed", error.message);
    return;
  }

  if (!Array.isArray(data) || !data.length) {
    localStorage.setItem(registryStorageKey, activeRegistry);
    localStorage.setItem(getRegistryConfig().keysStorageKey, JSON.stringify(keys));
    localStorage.setItem(getRegistryConfig().archivesStorageKey, JSON.stringify(archives));
    localStorage.setItem(sharedContactsStorageKey, JSON.stringify(contacts));
    await syncAllStorageToCloud();
    return;
  }

  const cloudSnapshot = getCloudSnapshot(data);
  if (cloudSnapshot === lastCloudSnapshot) return;
  if (isKeyFormBeingEdited()) return;
  if (Date.now() - lastLocalEditAt < 5000) return;
  lastCloudSnapshot = cloudSnapshot;

  const cloudRows = new Map(data.map((row) => [row.key, row.value]));
  isApplyingCloudState = true;
  getBackupStorageKeys().forEach((storageKey) => {
    if (cloudRows.has(storageKey)) {
      saveStorageValue(storageKey, stringifyCloudValue(cloudRows.get(storageKey)));
    } else {
      localStorage.removeItem(storageKey);
    }
  });
  isApplyingCloudState = false;

  refreshDataFromStorage({ keepSelection: true });
}

function updateUndoButton() {
  undoBtn.disabled = !undoSnapshot;
}

function createUndoSnapshot() {
  const storage = {};
  getBackupStorageKeys().forEach((key) => {
    storage[key] = localStorage.getItem(key);
  });

  return {
    storage,
    selectedId,
    selectedSetId,
    activeContactType,
  };
}

function rememberUndoStep() {
  undoSnapshot = createUndoSnapshot();
  updateUndoButton();
}

function restoreStorageSnapshot(snapshot) {
  getBackupStorageKeys().forEach((key) => {
    const value = snapshot.storage[key];
    saveStorageValue(key, value);
  });
  syncAllStorageToCloud();
}

function undoPreviousStep() {
  if (!undoSnapshot) return;

  const snapshot = undoSnapshot;
  undoSnapshot = null;
  restoreStorageSnapshot(snapshot);
  activeRegistry = loadActiveRegistry();
  keys = loadKeys();
  archives = loadArchives();
  contacts = loadContacts();
  selectedId = snapshot.selectedId;
  selectedSetId = snapshot.selectedSetId || "main";
  activeContactType = snapshot.activeContactType || "internal";
  hoveredKeyId = null;
  isDetailPanelHovered = false;
  clearSignature();
  updateRegistryHeader();
  render();
  updateUndoButton();
}

function getRegistryConfig() {
  return registryConfig[activeRegistry] || registryConfig.location;
}

function updateRegistryHeader() {
  const config = getRegistryConfig();
  appTitleText.textContent = config.title;
  document.title = config.title.replace(/\n/g, " - ");
  registryToggleBtn.textContent = config.toggleLabel;
  rentedBtn.textContent = config.archiveActionLabel;
  rentedArchiveTitle.textContent = config.rentedArchiveTitle;
  compromisesTabBtn.hidden = activeRegistry !== "transaction";
  rentedArchiveSection.hidden = activeRegistry === "transaction";
  authenticatedArchiveSection.hidden = activeRegistry !== "transaction";
  if (activeRegistry !== "transaction") compromisesPanel.hidden = true;
  registryToggleBtn.title =
    activeRegistry === "location" ? "Basculer vers le registre Transaction" : "Basculer vers le registre Location";
}

function switchRegistry() {
  activeRegistry = activeRegistry === "location" ? "transaction" : "location";
  saveActiveRegistry();
  keys = loadKeys();
  archives = loadArchives();
  contacts = loadContacts();
  selectedId = null;
  selectedArchiveRecord = null;
  selectedSetId = "main";
  hoveredKeyId = null;
  isDetailPanelHovered = false;
  contactsPanel.hidden = true;
  compromisesPanel.hidden = true;
  archivesPanel.hidden = true;
  globalHistoryPanel.hidden = true;
  clearTimeout(detailCloseTimer);
  clearTimeout(contactsCloseTimer);
  clearTimeout(archivesCloseTimer);
  clearSignature();
  migrateArchivedSlots();
  updateRegistryHeader();
  render();
}

function makeInitialKeys() {
  return categories.flatMap((category) =>
    Array.from({ length: slotsPerCategory }, (_, index) => ({
      id: `${category}-${index + 1}`,
      category,
      number: index + 1,
      property: "",
      postalCode: "",
      city: "",
      owner: "",
      notes: "",
      photo: "",
      archived: false,
      sets: [makeKeySet("main")],
    })),
  );
}

function makeEmptyKey(key) {
  return {
    id: key.id,
    category: key.category,
    number: key.number,
    property: "",
    postalCode: "",
    city: "",
    owner: "",
    notes: "",
    photo: "",
    archived: false,
    sets: [makeKeySet("main")],
  };
}

function normalizeSet(set, index = 0) {
  const fallback = keySetOptions[index] || keySetOptions[0];
  const id = keySetOptions.some((option) => option.id === set.id) ? set.id : fallback.id;
  const option = keySetOptions.find((savedOption) => savedOption.id === id) || fallback;
  const status = ["available", "out", "reserved"].includes(set.status) ? set.status : "available";

  return {
    id: option.id,
    label: option.label,
    photo: set.photo || "",
    holder: set.holder || "",
    holderCompany: set.holderCompany || "",
    holderPhone: set.holderPhone || "",
    status,
    history: Array.isArray(set.history) ? set.history : [],
  };
}

function normalizeKey(key) {
  let sets =
    Array.isArray(key.sets) && key.sets.length
      ? key.sets.slice(0, 4).map(normalizeSet)
      : [
          {
            ...makeKeySet("main"),
            photo: key.photo || "",
            holder: key.holder || "",
            status: ["available", "out", "reserved"].includes(key.status) ? key.status : "available",
            history: Array.isArray(key.history) ? key.history : [],
          },
        ];

  if (key.photo && !sets.some((set) => set.photo)) {
    sets = sets.map((set, index) => (index === 0 ? { ...set, photo: key.photo } : set));
  }

  return {
    id: key.id,
    category: key.category,
    number: key.number,
    property: key.property || "",
    postalCode: key.postalCode || "",
    city: key.city || "",
    owner: key.owner || "",
    notes: key.notes || "",
    photo: "",
    archived: Boolean(key.archived),
    sets,
  };
}

function loadKeys() {
  const saved = localStorage.getItem(getRegistryConfig().keysStorageKey);
  if (!saved) return makeInitialKeys();

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed.map(normalizeKey) : makeInitialKeys();
  } catch {
    return makeInitialKeys();
  }
}

function saveKeys() {
  try {
    markLocalEdit();
    localStorage.setItem(getRegistryConfig().keysStorageKey, JSON.stringify(keys));
    syncStorageKeyToCloud(getRegistryConfig().keysStorageKey);
  } catch (error) {
    alert("La sauvegarde a échoué. Une photo est probablement trop lourde : essayez une image plus légère.");
    throw error;
  }
}

function normalizeArchive(record) {
  return {
    id: record.id || `archive-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    reason: record.reason || record.archiveReason || "rented",
    archivedAt: record.archivedAt || new Date().toISOString(),
    compromiseSignedAt: record.compromiseSignedAt || "",
    key: normalizeKey(record.key || record),
  };
}

function loadArchives() {
  const saved = localStorage.getItem(getRegistryConfig().archivesStorageKey);
  if (!saved) return [];

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed.map(normalizeArchive) : [];
  } catch {
    return [];
  }
}

function saveArchives() {
  markLocalEdit();
  localStorage.setItem(getRegistryConfig().archivesStorageKey, JSON.stringify(archives));
  syncStorageKeyToCloud(getRegistryConfig().archivesStorageKey);
}

function migrateArchivedSlots() {
  const archivedKeys = keys.filter((key) => key.archived);
  if (!archivedKeys.length) return;

  const existingArchiveIds = new Set(archives.map((record) => record.id));
  const migratedArchives = archivedKeys
    .map((key) => ({
      id: `${key.id}-${key.archivedAt || Date.now()}`,
      reason: key.archiveReason || "rented",
      archivedAt: key.archivedAt || new Date().toISOString(),
      key: { ...key, archived: false },
    }))
    .filter((record) => !existingArchiveIds.has(record.id));

  archives = [...archives, ...migratedArchives];
  keys = keys.map((key) => (key.archived ? makeEmptyKey(key) : key));
  saveArchives();
  saveKeys();
}

function createContactId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `contact-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function formatPhoneNumber(value) {
  const digits = String(value || "").replace(/\D/g, "");
  if (!digits) return "";
  return digits.match(/.{1,2}/g).join(" ");
}

function formatCity(value) {
  return String(value || "").replace(/(^|[\s-])(\p{L})/gu, (match, separator, letter) => {
    return `${separator}${letter.toLocaleUpperCase("fr-FR")}`;
  });
}

function formatLastName(value) {
  return String(value || "").trim().toLocaleUpperCase("fr-FR");
}

function getContactDisplayName(contact) {
  if (contact.type === "external") {
    return [contact.firstName, formatLastName(contact.name), contact.companyName].filter(Boolean).join(" ");
  }

  return [contact.firstName, formatLastName(contact.name)].filter(Boolean).join(" ");
}

function contactTypeText(type) {
  return type === "external" ? "Intervenant externe" : "Intervenant interne";
}

function getContactSelectName(contact) {
  if (contact.type === "external") {
    return [contact.companyName || contact.name, contact.firstName].filter(Boolean).join(" - ");
  }

  return contact.firstName || contact.name;
}

function getMovementContactName(contact) {
  if (contact.type === "external") {
    return [contact.companyName || contact.name, contact.firstName].filter(Boolean).join(" - ");
  }

  return getContactDisplayName(contact);
}

function getHistoryPersonName(entry) {
  let person = entry.person || "Intervenant non pr\u00e9cis\u00e9";
  const company = String(entry.company || "").trim();
  if (company && person.startsWith(`${company} - `)) {
    person = person.slice(company.length + 3).trim();
  }

  return [person, entry.phone ? formatPhoneNumber(entry.phone) : ""].filter(Boolean).join(" - ");
}

function normalizeContact(contact) {
  const type = contact.type === "external" ? "external" : "internal";

  return {
    id: contact.id || createContactId(),
    firstName: (contact.firstName || "").trim(),
    name: type === "external" && !contact.companyName ? "" : formatLastName(contact.name),
    companyName: type === "external" ? (contact.companyName || contact.name || "").trim() : "",
    phone: formatPhoneNumber(contact.phone),
    type,
  };
}

function loadContacts() {
  const saved = localStorage.getItem(sharedContactsStorageKey);
  if (!saved) return [];

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed)
      ? parsed.map(normalizeContact).filter((contact) => contact.name || contact.companyName)
      : [];
  } catch {
    return [];
  }
}

function saveContacts() {
  markLocalEdit();
  localStorage.setItem(sharedContactsStorageKey, JSON.stringify(contacts));
  syncStorageKeyToCloud(sharedContactsStorageKey);
}

function getSelectedKey() {
  if (selectedArchiveRecord) {
    return {
      ...normalizeKey(selectedArchiveRecord.key),
      archived: true,
    };
  }
  return keys.find((key) => key.id === selectedId);
}

function getSelectedSet(key = getSelectedKey()) {
  if (!key) return null;
  return key.sets.find((set) => set.id === selectedSetId) || key.sets[0];
}

function keyLabel(key) {
  return `${key.category} #${key.number}`;
}

function tilePrefix(key) {
  if (key.category === "Maison") return "M";
  if (key.category === "Autre") return "A";
  return key.category;
}

function tileLabel(key) {
  return `${tilePrefix(key)} #${key.number}`;
}

function isValidPhoto(photo) {
  return typeof photo === "string" && photo.startsWith("data:image/") && photo.length >= 200;
}

function getDisplayPhoto(key) {
  return key.sets?.find((set) => isValidPhoto(set.photo))?.photo || "";
}

function formatOwner(owner) {
  return (owner || "").trim().toLocaleUpperCase("fr-FR");
}

function getStatus(key) {
  if (key.archived) return "archived";
  if (key.sets.some((set) => set.status === "out")) return "out";
  return key.sets.some((set) => set.status === "reserved") ? "reserved" : "available";
}

function isKeyFilled(key) {
  return Boolean(
    key.property?.trim() ||
      key.postalCode?.trim() ||
      key.city?.trim() ||
      key.owner?.trim() ||
      key.notes?.trim() ||
      key.sets?.some((set) => set.photo || set.holder?.trim() || set.history?.length),
  );
}

function getTileStatus(key) {
  if (key.archived) return "archived";
  if (key.sets.some((set) => set.status === "out")) return "out";
  if (key.sets.some((set) => set.status === "reserved")) return "reserved";
  return isKeyFilled(key) ? "available" : "empty";
}

function getCompromiseMovementStatus(record) {
  const sets = record?.key?.sets || [];
  if (sets.some((set) => set.status === "out")) return "out";
  if (sets.some((set) => set.status === "reserved")) return "reserved";
  return "";
}

function statusText(key) {
  if (key.archived) return "Archivée";
  const outCount = key.sets.filter((set) => set.status === "out").length;
  const reservedCount = key.sets.filter((set) => set.status === "reserved").length;
  if (outCount) return key.sets.length === 1 ? "Sortie" : `${outCount} jeu${outCount > 1 ? "x" : ""} sorti${outCount > 1 ? "s" : ""}`;
  if (reservedCount) return key.sets.length === 1 ? "Réservé" : `${reservedCount} jeu${reservedCount > 1 ? "x" : ""} réservé${reservedCount > 1 ? "s" : ""}`;
  return "Disponible";
}

function cloneKeyContent(key) {
  return {
    property: key.property || "",
    postalCode: key.postalCode || "",
    city: key.city || "",
    owner: key.owner || "",
    notes: key.notes || "",
    photo: key.photo || "",
    archived: false,
    sets: JSON.parse(JSON.stringify(key.sets || [makeKeySet("main")])),
  };
}

function applyKeyContent(slot, content) {
  return {
    ...slot,
    property: content.property || "",
    postalCode: content.postalCode || "",
    city: content.city || "",
    owner: content.owner || "",
    notes: content.notes || "",
    photo: content.photo || "",
    archived: false,
    sets: JSON.parse(JSON.stringify(content.sets || [makeKeySet("main")])),
  };
}

function moveKeyToSlot(sourceId, targetId, options = {}) {
  if (!sourceId || !targetId || sourceId === targetId) return;

  const sourceKey = keys.find((key) => key.id === sourceId);
  const targetKey = keys.find((key) => key.id === targetId);
  if (!sourceKey || !targetKey || !isKeyFilled(sourceKey)) return;

  const shouldCopy = Boolean(options.copy);
  const sourceContent = cloneKeyContent(sourceKey);
  const targetContent = cloneKeyContent(targetKey);
  const targetIsFilled = isKeyFilled(targetKey);
  const message = shouldCopy
    ? targetIsFilled
      ? `Copier ${keyLabel(sourceKey)} vers ${keyLabel(targetKey)} ?\n\nLa case de destination est déjà renseignée : elle sera remplacée.`
      : `Copier ${keyLabel(sourceKey)} vers ${keyLabel(targetKey)} ?`
    : targetIsFilled
      ? `Déplacer ${keyLabel(sourceKey)} vers ${keyLabel(targetKey)} ?\n\nLa case de destination est déjà renseignée : les deux fiches seront échangées.`
      : `Déplacer ${keyLabel(sourceKey)} vers ${keyLabel(targetKey)} ?`;

  if (!confirm(message)) return;
  rememberUndoStep();

  keys = keys.map((key) => {
    if (key.id === targetId) return applyKeyContent(key, sourceContent);
    if (shouldCopy) return key;
    if (key.id === sourceId) return targetIsFilled ? applyKeyContent(key, targetContent) : makeEmptyKey(key);
    return key;
  });

  selectedId = targetId;
  selectedSetId = sourceContent.sets[0]?.id || "main";
  saveKeys();
  render();
}

function deleteKeyWithoutArchive(keyId) {
  const key = keys.find((savedKey) => savedKey.id === keyId);
  if (!key || !isKeyFilled(key)) return;

  const confirmed = confirm(`Supprimer définitivement la fiche ${keyLabel(key)} sans l'archiver ?`);
  if (!confirmed) return;
  rememberUndoStep();

  keys = keys.map((savedKey) => (savedKey.id === keyId ? makeEmptyKey(savedKey) : savedKey));
  if (selectedId === keyId) {
    selectedId = null;
    selectedArchiveRecord = null;
    selectedSetId = "main";
    clearSignature();
  }
  logActivity("Suppression", keyLabel(key), [key.owner, key.property].filter(Boolean).join(" - "));
  saveKeys();
  render();
}

function render() {
  renderGrid();
  renderPanel();
  renderContactSelect();
  renderArchivesPanel();
  renderCompromisesPanel();
}

function isDetailPanelBusy() {
  return isPhotoImporting || Boolean(document.querySelector(".date-dialog[open]")) || form.contains(document.activeElement);
}

function isKeyFormBeingEdited() {
  const activeElement = document.activeElement;
  return Boolean(
    selectedId &&
      activeElement &&
      form.contains(activeElement) &&
      ["INPUT", "TEXTAREA", "SELECT"].includes(activeElement.tagName),
  );
}

function isTouchLayout() {
  return window.matchMedia("(max-width: 1040px), (pointer: coarse)").matches;
}

function isTouchDevice() {
  return window.matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 0;
}

function isLandscapeLayout() {
  return window.innerWidth > window.innerHeight || window.matchMedia("(orientation: landscape)").matches;
}

function beginPhotoImport(event) {
  if (event?.currentTarget instanceof HTMLInputElement) {
    event.currentTarget.value = "";
  }
  isPhotoImporting = true;
  markLocalEdit();
  clearTimeout(detailCloseTimer);
  clearTimeout(photoImportResetTimer);
  photoImportResetTimer = setTimeout(() => {
    isPhotoImporting = false;
  }, 120000);
}

function finishPhotoImport() {
  clearTimeout(photoImportResetTimer);
  isPhotoImporting = false;
  scheduleDetailPanelClose();
}

function scheduleDetailPanelClose() {
  clearTimeout(detailCloseTimer);
  if (isTouchLayout()) return;
  if (!selectedId) return;

  detailCloseTimer = setTimeout(() => {
    if (hoveredKeyId === selectedId || isDetailPanelHovered || isDetailPanelBusy()) {
      scheduleDetailPanelClose();
      return;
    }

    selectedId = null;
    selectedArchiveRecord = null;
    clearSignature();
    render();
  }, 1000);
}

function renderContactSelect() {
  const currentValue = contactSelect.value;
  contactSelect.innerHTML = '<option value="">Choisir dans la liste</option>';

  [
    ["internal", "Intervenants internes"],
    ["external", "Intervenants externes"],
  ].forEach(([type, label]) => {
    const groupedContacts = contacts.filter((contact) => contact.type === type);

    if (!groupedContacts.length) return;

    const group = document.createElement("optgroup");
    group.label = label;
    groupedContacts.forEach((contact) => {
      const option = document.createElement("option");
      option.value = contact.id;
      option.textContent = getContactSelectName(contact);
      group.append(option);
    });
    contactSelect.append(group);
  });

  contactSelect.value = contacts.some((contact) => contact.id === currentValue) ? currentValue : "";
}

function renderContactsPanel() {
  contactTabs.forEach((tab) => {
    const isActive = tab.dataset.contactType === activeContactType;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });
  updateContactFormMode();

  contactsList.innerHTML = "";
  const visibleContacts = contacts.filter((contact) => contact.type === activeContactType);

  if (!visibleContacts.length) {
    const item = document.createElement("li");
    item.textContent =
      activeContactType === "internal"
        ? "Aucun intervenant interne enregistré."
        : "Aucun intervenant externe enregistré.";
    contactsList.append(item);
    return;
  }

  visibleContacts.forEach((contact) => {
      const item = document.createElement("li");
      const details = document.createElement("span");
      const name = document.createElement("span");
      const phone = document.createElement("span");
      const actions = document.createElement("span");
      const editButton = document.createElement("button");
      const deleteButton = document.createElement("button");

      item.draggable = true;
      item.dataset.contactId = contact.id;
      name.className = "contact-name";
      phone.className = "contact-phone";
      actions.className = "contact-actions";
      editButton.className = "contact-edit";
      editButton.type = "button";
      deleteButton.className = "contact-delete";
      deleteButton.type = "button";

      if (contact.type === "external") {
        const company = document.createElement("span");
        const person = document.createElement("span");
        company.className = "contact-company";
        person.className = "contact-person";
        company.textContent = contact.companyName || "Soci\u00e9t\u00e9 non renseign\u00e9e";
        person.textContent = [contact.firstName, formatLastName(contact.name)].filter(Boolean).join(" ");
        name.append(company, person);
      } else {
        name.textContent = getContactDisplayName(contact);
      }
      phone.textContent = contact.phone || "Téléphone non renseigné";
      editButton.textContent = "Modifier";
      editButton.addEventListener("click", () => {
        editingContactId = contact.id;
        activeContactType = contact.type;
        contactFirstNameInput.value = contact.firstName || "";
        contactNameInput.value = contact.name;
        contactCompanyInput.value = contact.companyName || "";
        contactPhoneInput.value = contact.phone;
        updateContactFormMode();
        renderContactsPanel();
        (contactFirstNameLabel.hidden ? contactNameInput : contactFirstNameInput).focus();
      });
      deleteButton.textContent = "Supprimer";
      deleteButton.addEventListener("click", () => {
        const confirmed = confirm(`Supprimer l'intervenant ${getContactDisplayName(contact)} ?`);
        if (!confirmed) return;

        rememberUndoStep();
        contacts = contacts.filter((savedContact) => savedContact.id !== contact.id);
        saveContacts();
        logActivity(
          "Suppression intervenant",
          getContactDisplayName(contact),
          [contactTypeText(contact.type), contact.phone].filter(Boolean).join(" | "),
        );
        renderContactSelect();
        renderContactsPanel();
      });

      details.append(name, phone);
      actions.append(editButton, deleteButton);
      item.append(details, actions);
      contactsList.append(item);
    });
}

function updateLegacyContactFormMode() {
  const isExternal = activeContactType === "external";
  contactFirstNameLabel.hidden = !isExternal;
  contactNameLabel.firstChild.textContent = isExternal ? "Nom de la société\n            " : "Nom\n            ";
  contactNameInput.placeholder = isExternal ? "Nom de la société" : "Nom de l'intervenant";
  contactFirstNameLabel.hidden = false;
  contactFirstNameLabel.firstChild.textContent = "Pr\u00e9nom de l'intervenant\n            ";
  contactNameLabel.firstChild.textContent = isExternal ? "Nom de famille / Nom de la soci\u00e9t\u00e9\n            " : "Nom de l'intervenant\n            ";
  contactFirstNameInput.placeholder = "Pr\u00e9nom de l'intervenant";
  contactNameInput.placeholder = isExternal ? "Nom de famille / Nom de la soci\u00e9t\u00e9" : "Nom de l'intervenant";
  addContactBtn.textContent = editingContactId ? "Enregistrer" : "Ajouter";
}

function updatePreviousContactFormMode() {
  const isExternal = activeContactType === "external";
  contactFirstNameLabel.hidden = false;
  contactFirstNameLabel.firstChild.textContent = "Prénom de l'intervenant\n            ";
  contactNameLabel.firstChild.textContent = isExternal ? "Nom de la société\n            " : "NOM de l'intervenant\n            ";
  contactFirstNameInput.placeholder = "Prénom de l'intervenant";
  contactNameInput.placeholder = isExternal ? "Nom de la société" : "NOM de l'intervenant";
  addContactBtn.textContent = editingContactId ? "Enregistrer" : "Ajouter";
}

function updateContactFormMode() {
  const isExternal = activeContactType === "external";
  contactFirstNameLabel.hidden = false;
  contactFirstNameLabel.firstChild.textContent = "Pr\u00e9nom de l'intervenant\n            ";
  contactNameLabel.firstChild.textContent = isExternal ? "Nom de famille\n            " : "Nom de l'intervenant\n            ";
  contactCompanyLabel.hidden = !isExternal;
  contactFirstNameInput.placeholder = "Pr\u00e9nom de l'intervenant";
  contactNameInput.placeholder = isExternal ? "Nom de famille" : "Nom de l'intervenant";
  contactCompanyInput.placeholder = "Nom de soci\u00e9t\u00e9";
  addContactBtn.textContent = editingContactId ? "Enregistrer" : "Ajouter";
}

function saveContactOrderFromList() {
  const orderedIds = [...contactsList.querySelectorAll("[data-contact-id]")].map((item) => item.dataset.contactId);
  if (!orderedIds.length) return;
  const previousIds = contacts.filter((contact) => contact.type === activeContactType).map((contact) => contact.id);
  if (orderedIds.join("|") === previousIds.join("|")) return;

  const orderedContacts = orderedIds
    .map((id) => contacts.find((contact) => contact.id === id))
    .filter(Boolean);
  if (!orderedContacts.length) return;

  rememberUndoStep();
  let orderedIndex = 0;
  contacts = contacts.map((contact) =>
    contact.type === activeContactType ? orderedContacts[orderedIndex++] || contact : contact,
  );
  saveContacts();
  renderContactSelect();
  renderContactsPanel();
}

function moveDraggedContactToPoint(clientY) {
  const draggedItem = contactsList.querySelector(".dragging");
  if (!draggedItem) return;

  const target = [...contactsList.querySelectorAll("[data-contact-id]:not(.dragging)")].find((item) => {
    const rect = item.getBoundingClientRect();
    return clientY < rect.top + rect.height / 2;
  });
  contactsList.insertBefore(draggedItem, target || null);
}

function startTouchContactDrag(item, pointerId, clientY) {
  touchContactDrag = { item, pointerId };
  draggedContactId = item.dataset.contactId;
  contactsList.classList.add("is-touch-dragging");
  item.classList.add("dragging");
  item.setPointerCapture?.(pointerId);
  moveDraggedContactToPoint(clientY);
}

function stopTouchContactDrag() {
  if (!touchContactDrag) return;

  saveContactOrderFromList();
  touchContactDrag.item.releasePointerCapture?.(touchContactDrag.pointerId);
  touchContactDrag.item.classList.remove("dragging");
  contactsList.classList.remove("is-touch-dragging");
  draggedContactId = null;
  touchContactDrag = null;
}

function formatArchiveDate(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatDateOnly(value) {
  if (!value) return "";
  const date = String(value).includes("T") ? new Date(value) : new Date(`${value}T00:00:00`);
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function archiveReasonText(reason) {
  if (reason === "rented") return getRegistryConfig().rentedArchiveText;
  if (reason === "removed") return "Retiré";
  if (reason === "authenticated") return "Acte authentique";
  return "";
}

function csvEscape(value) {
  const text = String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
}

function keyToCsvRows(key, archive = null) {
  const rows = [];
  const base = {
    emplacement: keyLabel(key),
    adresse: key.property || "",
    codePostal: key.postalCode || "",
    ville: key.city || "",
    proprietaire: key.owner || "",
    notes: key.notes || "",
    archive: archive ? archiveReasonText(archive.reason) : "",
    dateArchive: archive ? formatArchiveDate(archive.archivedAt) : "",
  };

  key.sets.forEach((set) => {
    if (!set.history.length) {
      rows.push({
        ...base,
        jeu: set.label,
        statutJeu: set.status === "out" ? "Sortie" : set.status === "reserved" ? "Réservé" : "Disponible",
        mouvement: "",
        intervenant: set.holder || "",
        telephone: "",
        commentaire: "",
        dateMouvement: "",
        signature: "",
      });
      return;
    }

    set.history.forEach((entry) => {
      rows.push({
        ...base,
        jeu: set.label,
        statutJeu: set.status === "out" ? "Sortie" : set.status === "reserved" ? "Réservé" : "Disponible",
        mouvement: entry.type === "out" ? "Sortie" : entry.type === "reserved" ? "Réservé" : "Entrée",
        intervenant: entry.person || "",
        telephone: entry.phone || "",
        commentaire: entry.note || "",
        dateMouvement: entry.date || "",
        signature: entry.signature ? "Oui" : "Non",
      });
    });
  });

  return rows;
}

function exportKeyCsv(key, archive = null) {
  const headers = [
    "Emplacement",
    "Adresse",
    "Code postal",
    "Ville",
    "Propriétaire",
    "Notes",
    "Archive",
    "Date archive",
    "Jeu",
    "Statut du jeu",
    "Mouvement",
    "Intervenant",
    "Téléphone",
    "Commentaire",
    "Date mouvement",
    "Signature",
  ];
  const rows = keyToCsvRows(key, archive).map((row) => [
    row.emplacement,
    row.adresse,
    row.codePostal,
    row.ville,
    row.proprietaire,
    row.notes,
    row.archive,
    row.dateArchive,
    row.jeu,
    row.statutJeu,
    row.mouvement,
    row.intervenant,
    row.telephone,
    row.commentaire,
    row.dateMouvement,
    row.signature,
  ]);
  const csv = [headers, ...rows].map((row) => row.map(csvEscape).join(";")).join("\n");
  const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const archiveSuffix = archive ? `-${archive.reason}` : "";
  link.href = url;
  link.download = `${key.id}${archiveSuffix}-export.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

function exportFilledDataCsv() {
  const filledKeys = keys.filter((key) => isKeyFilled(key));
  if (!filledKeys.length) {
    alert("Aucune donnée renseignée à exporter dans ce registre.");
    return;
  }

  const headers = [
    "Registre",
    "Emplacement",
    "Catégorie",
    "Numéro",
    "Propriétaire",
    "Adresse",
    "Code postal",
    "Ville",
    "Notes",
    "Nombre de jeux",
    "Statut général",
    "Jeux sortis",
    "Détenteurs actuels",
    "Photos",
  ];
  const registryLabel = activeRegistry === "location" ? "Location" : "Transaction";
  const rows = filledKeys.map((key) => {
    const outSets = key.sets.filter((set) => set.status === "out");
    const holders = key.sets
      .filter((set) => set.holder)
      .map((set) => `${set.label} : ${set.holder}`)
      .join(" | ");
    const photos = key.sets
      .map((set) => `${set.label} : ${set.photo ? "Oui" : "Non"}`)
      .join(" | ");

    return [
      registryLabel,
      keyLabel(key),
      key.category,
      key.number,
      key.owner || "",
      key.property || "",
      key.postalCode || "",
      key.city || "",
      key.notes || "",
      key.sets.length,
      statusText(key),
      outSets.map((set) => set.label).join(" | "),
      holders,
      photos,
    ];
  });
  const csv = [headers, ...rows].map((row) => row.map(csvEscape).join(";")).join("\n");
  const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const stamp = new Date().toISOString().slice(0, 10);
  link.href = url;
  link.download = `donnees-renseignees-${activeRegistry}-${stamp}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

function exportAllDataBackup() {
  const data = {};
  getBackupStorageKeys().forEach((key) => {
    data[key] = localStorage.getItem(key);
  });

  const payload = {
    app: "century21-les-minimes-cles",
    version: 1,
    exportedAt: new Date().toISOString(),
    data,
  };
  const stamp = new Date().toISOString().slice(0, 10);
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `sauvegarde-cles-${stamp}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function refreshDataFromStorage({ keepSelection = false } = {}) {
  const previousSelectedId = selectedId;
  const previousSelectedSetId = selectedSetId;
  activeRegistry = loadActiveRegistry();
  keys = loadKeys();
  archives = loadArchives();
  contacts = loadContacts();
  selectedId = keepSelection && keys.some((key) => key.id === previousSelectedId) ? previousSelectedId : null;
  selectedSetId = keepSelection ? previousSelectedSetId || "main" : "main";
  hoveredKeyId = null;
  isDetailPanelHovered = false;
  if (!keepSelection) {
    contactsPanel.hidden = true;
    archivesPanel.hidden = true;
    clearSignature();
  }
  updateRegistryHeader();
  render();
}

function parseStoredArray(storageKey, fallback = []) {
  const saved = localStorage.getItem(storageKey);
  if (!saved) return fallback;

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function parseHistoryTimestamp(value) {
  if (!value) return 0;

  const match = String(value).match(/(\d{1,2})\/(\d{1,2})\/(\d{2,4})(?:[,\s]+(\d{1,2}):(\d{2}))?/);
  if (match) {
    const [, day, month, year, hour = "0", minute = "0"] = match;
    const fullYear = year.length === 2 ? `20${year}` : year;
    return new Date(Number(fullYear), Number(month) - 1, Number(day), Number(hour), Number(minute)).getTime();
  }

  const isoTime = Date.parse(value);
  return Number.isNaN(isoTime) ? 0 : isoTime;
}

function getRegistryHistoryEntries(registry) {
  const config = registryConfig[registry];
  const registryLabel = registry === "transaction" ? "Transaction" : "Location";
  const registryKeys = parseStoredArray(config.keysStorageKey, makeInitialKeys()).map(normalizeKey);
  const registryArchives = parseStoredArray(config.archivesStorageKey, []).map(normalizeArchive);
  const entries = [];

  registryKeys.forEach((key) => {
    key.sets.forEach((set) => {
      set.history.forEach((movement) => {
        entries.push({
          timestamp: parseHistoryTimestamp(movement.date),
          date: movement.date || "Date non renseignée",
          title: `${registryLabel} - ${keyLabel(key)} - ${set.label}`,
          action: movement.type === "out" ? "Sortie" : movement.type === "reserved" ? "Réservé" : "Entrée",
          actor: movement.person || "Intervenant non renseigné",
          details: [key.owner ? `Propriétaire : ${formatOwner(key.owner)}` : "", movement.phone ? `Téléphone : ${movement.phone}` : "", movement.note || ""]
            .filter(Boolean)
            .join(" | "),
          device: "",
        });
      });
    });
  });

  registryArchives.forEach((record) => {
    const key = record.key;
    const action =
      record.reason === "authenticated"
        ? "Acte authentique"
        : record.reason === "removed"
          ? "Retiré"
          : registry === "transaction"
            ? "Compromis"
            : "Loué";
    entries.push({
      timestamp: parseHistoryTimestamp(record.archivedAt),
      date: formatArchiveDate(record.archivedAt),
      title: `${registryLabel} - ${keyLabel(key)}`,
      action,
      actor: key.owner ? formatOwner(key.owner) : "Fiche clé",
      details: [key.property || "", [key.postalCode, key.city].filter(Boolean).join(" ")].filter(Boolean).join(" - "),
      device: "",
    });
  });

  return entries;
}

function getActionClass(action) {
  const normalized = String(action || "").toLowerCase();
  if (normalized.includes("entrée") || normalized.includes("création") || normalized.includes("restauration")) return "in";
  if (normalized.includes("sortie")) return "out";
  if (normalized.includes("rÃ©serv") || normalized.includes("réserv")) return "reserved";
  if (normalized.includes("compromis") || normalized.includes("loué") || normalized.includes("acte authentique")) return "signed";
  if (normalized.includes("retiré") || normalized.includes("suppression")) return "removed";
  return "neutral";
}

function renderGlobalHistoryItems(targetList = globalHistoryList) {
  const activityEntries = loadActivityLog().map((entry) => ({
    timestamp: parseHistoryTimestamp(entry.date),
    date: formatArchiveDate(entry.date),
    title: `${entry.registry === "transaction" ? "Transaction" : "Location"} - ${entry.title}`,
    action: entry.action,
    actor: "Action enregistrée",
    details: entry.details || "",
    device: entry.device || "Appareil non renseigné",
  }));
  const entries = [...activityEntries, ...["location", "transaction"].flatMap(getRegistryHistoryEntries)]
    .map((entry, index) => ({ ...entry, orderIndex: index }))
    .sort((first, second) => second.timestamp - first.timestamp || first.orderIndex - second.orderIndex);

  targetList.innerHTML = "";
  if (!entries.length) {
    const item = document.createElement("li");
    item.textContent = "Aucun historique enregistré.";
    targetList.append(item);
    return;
  }

  entries.forEach((entry) => {
    const item = document.createElement("li");
    const title = document.createElement("strong");
    const meta = document.createElement("small");
    const details = document.createElement("span");
    const deviceButton = document.createElement("button");
    const device = document.createElement("em");
    item.dataset.historyAction = getActionClass(entry.action);
    title.textContent = `${entry.action} - ${entry.title}`;
    meta.textContent = `${entry.date} - ${entry.actor}`;
    details.textContent = entry.details;
    deviceButton.className = "history-device-button";
    deviceButton.type = "button";
    deviceButton.textContent = "...";
    device.hidden = true;
    device.textContent = entry.device || "Ancienne action sans appareil enregistré";
    deviceButton.addEventListener("click", () => {
      device.hidden = !device.hidden;
    });
    item.append(title, meta, deviceButton);
    if (entry.details) item.append(details);
    item.append(device);
    targetList.append(item);
  });
}

function renderGlobalHistoryPanel() {
  renderGlobalHistoryItems(globalHistoryList);
}

function openGlobalHistoryPanel() {
  clearTimeout(contactsCloseTimer);
  clearTimeout(archivesCloseTimer);
  contactsPanel.hidden = true;
  archivesPanel.hidden = true;
  compromisesPanel.hidden = true;
  globalHistoryPanel.hidden = false;
  renderGlobalHistoryPanel();
}

function updateImportButtonAvailability(event = {}) {
  const isUnlocked = Boolean(event.ctrlKey && event.shiftKey);
  importDataBtn.classList.toggle("is-unlocked", isUnlocked);
  importDataBtn.setAttribute("aria-disabled", String(!isUnlocked));
}

function importAllDataBackup(file) {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    let parsed;
    try {
      parsed = JSON.parse(reader.result);
    } catch {
      alert("Le fichier de sauvegarde n'est pas lisible.");
      return;
    }

    if (parsed?.app !== "century21-les-minimes-cles" || !parsed.data || typeof parsed.data !== "object") {
      alert("Ce fichier ne correspond pas à une sauvegarde du registre de clés.");
      return;
    }

    const confirmed = confirm("Importer cette sauvegarde remplacera les données actuelles. Continuer ?");
    if (!confirmed) return;

    rememberUndoStep();
    getBackupStorageKeys().forEach((key) => {
      const value = parsed.data[key];
      saveStorageValue(key, value);
    });
    syncAllStorageToCloud();
    logActivity("Import sauvegarde", "Données globales", file.name || "Fichier JSON");

    refreshDataFromStorage();
    alert("Sauvegarde importée.");
  });
  reader.readAsText(file);
}

function buildCelebrationPieces() {
  if (!celebrationSky) return;

  const colors = ["#ffd94f", "#ff5c7a", "#46d37d", "#4eb6ff", "#ff8a2a", "#c8b98d", "#ffffff", "#9b7cff"];
  celebrationSky.innerHTML = "";

  const fragment = document.createDocumentFragment();
  const balloonCount = 140;
  const confettiCount = window.innerWidth > 1200 ? 1400 : 900;

  Array.from({ length: balloonCount }, (_, index) => {
    const balloon = document.createElement("span");
    const size = 34 + Math.round(Math.random() * 54);
    balloon.className = "balloon";
    balloon.style.left = `${Math.random() * 100}%`;
    balloon.style.width = `${size}px`;
    balloon.style.height = `${Math.round(size * 1.28)}px`;
    balloon.style.background = colors[index % colors.length];
    balloon.style.animationDelay = `${Math.random() * 2.2}s`;
    balloon.style.animationDuration = `${6.2 + Math.random() * 2.4}s`;
    balloon.style.opacity = `${0.72 + Math.random() * 0.28}`;
    fragment.append(balloon);
  });

  Array.from({ length: confettiCount }, (_, index) => {
    const confetti = document.createElement("span");
    const size = 4 + Math.round(Math.random() * 10);
    confetti.className = "confetti";
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.width = `${size}px`;
    confetti.style.height = `${Math.round(size * (1.2 + Math.random()))}px`;
    confetti.style.background = colors[index % colors.length];
    confetti.style.animationDelay = `${Math.random() * 2.4}s`;
    confetti.style.animationDuration = `${4.8 + Math.random() * 3.4}s`;
    confetti.style.borderRadius = Math.random() > 0.55 ? "999px" : "3px";
    fragment.append(confetti);
  });

  celebrationSky.append(fragment);
}

function playCelebrationSound() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;

  const audioContext = new AudioContextClass();
  const masterGain = audioContext.createGain();
  masterGain.gain.setValueAtTime(0.0001, audioContext.currentTime);
  masterGain.gain.exponentialRampToValueAtTime(0.42, audioContext.currentTime + 0.03);
  masterGain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 6.8);
  masterGain.connect(audioContext.destination);

  [0, 0.1, 0.2, 0.32, 0.46, 0.62, 0.8, 1, 1.24, 1.5, 1.82, 2.18].forEach((offset, index) => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const start = audioContext.currentTime + offset;
    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(820 + index * 55, start);
    oscillator.frequency.exponentialRampToValueAtTime(1680 + index * 90, start + 0.14);
    oscillator.frequency.exponentialRampToValueAtTime(690 + index * 45, start + 0.34);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.28, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.44);
    oscillator.connect(gain);
    gain.connect(masterGain);
    oscillator.start(start);
    oscillator.stop(start + 0.46);
  });

  const applauseDuration = 6.4;
  const sampleRate = audioContext.sampleRate;
  const noiseBuffer = audioContext.createBuffer(1, sampleRate * applauseDuration, sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let index = 0; index < output.length; index += 1) {
    output[index] = Math.random() * 2 - 1;
  }

  Array.from({ length: 180 }, () => {
    const start = audioContext.currentTime + 0.08 + Math.random() * 5.2;
    const source = audioContext.createBufferSource();
    const filter = audioContext.createBiquadFilter();
    const gain = audioContext.createGain();
    source.buffer = noiseBuffer;
    filter.type = "bandpass";
    filter.frequency.value = 900 + Math.random() * 1800;
    filter.Q.value = 0.9 + Math.random() * 1.2;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.2 + Math.random() * 0.12, start + 0.018);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.12 + Math.random() * 0.12);
    source.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);
    source.start(start, Math.random() * (applauseDuration - 0.3));
    source.stop(start + 0.3);
  });

  window.setTimeout(() => audioContext.close(), 7200);
}

function playCelebrationAudioFiles() {
  celebrationAudioPlayers.forEach((player) => {
    player.pause();
    player.currentTime = 0;
  });

  celebrationAudioPlayers = celebrationAudioFiles.map((fileName) => {
    const player = new Audio(fileName);
    player.volume = 1;
    player.currentTime = 0;
    player.play().catch(() => {});
    return player;
  });
}

function showSaleCelebration() {
  if (!saleCelebration) return;

  clearTimeout(saleCelebrationTimer);
  buildCelebrationPieces();
  saleCelebration.hidden = true;
  saleCelebration.getBoundingClientRect();
  saleCelebration.hidden = false;
  playCelebrationSound();
  playCelebrationAudioFiles();

  saleCelebrationTimer = window.setTimeout(() => {
    saleCelebration.hidden = true;
    if (celebrationSky) celebrationSky.innerHTML = "";
    celebrationAudioPlayers.forEach((player) => {
      player.pause();
      player.currentTime = 0;
    });
  }, 9200);
}

function markCompromiseAsAuthenticated(recordId) {
  const record = archives.find((archive) => archive.id === recordId && archive.reason === "rented");
  if (!record) return;

  const confirmed = confirm(`Passer ${keyLabel(record.key)} en acte authentique et l'envoyer dans Archives ?`);
  if (!confirmed) return;

  rememberUndoStep();
  archives = archives.map((archive) =>
    archive.id === recordId
      ? {
          ...archive,
          reason: "authenticated",
          archivedAt: new Date().toISOString(),
        }
      : archive,
  );
  logActivity("Acte authentique", keyLabel(record.key), [record.key.owner, record.key.property].filter(Boolean).join(" - "));
  saveArchives();
  render();
  showSaleCelebration();
}

async function editCompromiseDate(recordId) {
  const record = archives.find((archive) => archive.id === recordId && archive.reason === "rented");
  if (!record) return;

  const nextDate = await promptCompromiseDate(record.compromiseSignedAt || new Date().toISOString().slice(0, 10));
  if (!nextDate) return;

  rememberUndoStep();
  archives = archives.map((archive) =>
    archive.id === recordId
      ? {
          ...archive,
          compromiseSignedAt: nextDate,
        }
      : archive,
  );
  logActivity("Modification compromis", keyLabel(record.key), `Date : ${formatDateOnly(nextDate)}`);
  saveArchives();
  renderCompromisesPanel();
}

function openArchivedKeyRecord(record) {
  selectedArchiveRecord = record;
  selectedId = `archive-${record.id}`;
  selectedSetId = record.key.sets?.[0]?.id || "main";
  clearTimeout(detailCloseTimer);
  compromisesPanel.hidden = true;
  render();
}

function renderArchiveList(list, reason, emptyText, options = {}) {
  const archivedRecords = archives
    .filter((record) => record.reason === reason)
    .sort((first, second) => {
      if (!options.sortByCompromiseDate) return 0;
      return String(first.compromiseSignedAt || first.archivedAt).localeCompare(
        String(second.compromiseSignedAt || second.archivedAt),
      );
    });
  list.innerHTML = "";

  if (!archivedRecords.length) {
    const item = document.createElement("li");
    item.textContent = emptyText;
    list.append(item);
    return;
  }

  archivedRecords.forEach((record) => {
    const key = record.key;
    const item = document.createElement("li");
    const details = document.createElement("span");
    const title = document.createElement("strong");
    const meta = document.createElement("small");
    const actions = document.createElement("span");
    const exportButton = document.createElement("button");
    const restoreButton = document.createElement("button");
    const archiveCity = [key.postalCode, key.city].filter(Boolean).join(" ");
    const address = [key.property, archiveCity].filter(Boolean).join(" - ");
    const compromiseAddress = `${key.property || "Adresse non renseignée"}, ${[
      key.postalCode || "Code postal non renseigné",
      key.city ? key.city.toUpperCase() : "VILLE NON RENSEIGNÉE",
    ].join(" ")}`;
    const archiveAction = options.showCompromiseDetails
      ? "Compromis"
      : record.reason === "removed"
        ? "Retiré"
        : record.reason === "authenticated"
          ? "Acte authentique"
          : getRegistryConfig().rentedArchiveText;
    item.dataset.historyAction = getActionClass(archiveAction);
    if (options.showCompromiseDetails) {
      const movementStatus = getCompromiseMovementStatus(record);
      if (movementStatus) item.dataset.movementStatus = movementStatus;
    }

    title.textContent = `${keyLabel(key)}${key.owner ? ` - ${formatOwner(key.owner)}` : ""}`;
    if (options.showCompromiseDetails) {
      const compromiseDate = formatDateOnly(record.compromiseSignedAt || record.archivedAt);
      [
        compromiseAddress,
        compromiseDate ? `Compromis signé le : ${compromiseDate}` : "Date de signature non renseignée",
      ]
        .forEach((line) => {
          const lineElement = document.createElement("span");
          lineElement.textContent = line;
          meta.append(lineElement);
        });
    } else {
      meta.textContent = [address || "Adresse non renseignée", formatArchiveDate(record.archivedAt)].filter(Boolean).join(" | ");
    }
    actions.className = "archive-item-actions";
    exportButton.type = "button";
    exportButton.textContent = "Exporter";
    exportButton.title = "Exporter cette archive en CSV";
    exportButton.addEventListener("click", (event) => {
      event.stopPropagation();
      exportKeyCsv(key, record);
    });
    restoreButton.type = "button";
    restoreButton.textContent = "Restaurer";
    restoreButton.addEventListener("click", (event) => {
      event.stopPropagation();
      const confirmed = confirm(`Restaurer ${keyLabel(key)} dans le tableau ?`);
      if (!confirmed) return;

      restoreArchive(record.id);
      renderArchivesPanel();
    });

    details.append(title, meta);
    if (!options.hideExport) actions.append(exportButton);
    actions.append(restoreButton);
    item.append(details, actions);
    if (options.showCompromiseDetails) {
      item.classList.add("is-clickable");
      item.title = "Cliquer pour consulter la fiche. Ctrl + clic pour modifier la date du compromis";
      item.addEventListener("click", (event) => {
        event.preventDefault();
        if (event.ctrlKey) {
          editCompromiseDate(record.id);
          return;
        }
        openArchivedKeyRecord(record);
      });
    }

    if (options.showAuthenticatedAction) {
      const authenticatedButton = document.createElement("button");
      item.classList.add("has-full-action");
      authenticatedButton.className = "authenticated-button";
      authenticatedButton.type = "button";
      authenticatedButton.textContent = "R\u00c9IT\u00c9RATION PAR ACTE AUTHENTIQUE";
      authenticatedButton.addEventListener("click", (event) => {
        event.stopPropagation();
        markCompromiseAsAuthenticated(record.id);
      });
      item.append(authenticatedButton);
    }

    list.append(item);
  });
}

function renderArchivesPanel() {
  renderArchiveList(rentedList, "rented", getRegistryConfig().rentedArchiveEmpty);
  renderArchiveList(removedList, "removed", "Aucun bien retiré.");
  renderArchiveList(authenticatedList, "authenticated", "Aucun acte authentique archivé.");
}

function renderCompromisesPanel() {
  renderArchiveList(compromisesList, "rented", "Aucun bien en compromis.", {
    showAuthenticatedAction: true,
    showCompromiseDetails: true,
    sortByCompromiseDate: true,
    hideExport: true,
  });
  const compromisedRecords = archives.filter((record) => record.reason === "rented");
  const tabStatus = compromisedRecords.some((record) => getCompromiseMovementStatus(record) === "out")
    ? "out"
    : compromisedRecords.some((record) => getCompromiseMovementStatus(record) === "reserved")
      ? "reserved"
      : "";
  compromisesTabBtn.dataset.movementStatus = tabStatus;
}

function findRestoreSlot(archivedKey) {
  const originalSlot = keys.find((key) => key.id === archivedKey.id);
  if (originalSlot && !isKeyFilled(originalSlot)) return originalSlot;

  return keys
    .filter((key) => key.category === archivedKey.category)
    .sort((first, second) => first.number - second.number)
    .find((key) => !isKeyFilled(key));
}

function restoreArchive(recordId) {
  const record = archives.find((archive) => archive.id === recordId);
  if (!record) return;

  const targetKey = findRestoreSlot(record.key);
  if (!targetKey) {
    alert("Aucune case libre n'est disponible sur cette ligne pour restaurer ce bien.");
    return;
  }

  const restoredKey = {
    ...normalizeKey(record.key),
    id: targetKey.id,
    category: targetKey.category,
    number: targetKey.number,
  };

  rememberUndoStep();
  keys = keys.map((key) => (key.id === targetKey.id ? restoredKey : key));
  archives = archives.filter((archive) => archive.id !== recordId);
  selectedId = targetKey.id;
  selectedSetId = record.key.sets?.[0]?.id || "main";
  logActivity("Restauration", keyLabel(restoredKey), [restoredKey.owner, restoredKey.property].filter(Boolean).join(" - "));
  saveKeys();
  saveArchives();
  render();
}

function matchesFilter(key) {
  const query = searchInput.value.trim().toLowerCase();
  const status = statusFilter?.value || "active";
  const haystack = [
    keyLabel(key),
    key.property,
    key.postalCode,
    key.city,
    key.owner,
    key.notes,
    ...key.sets.flatMap((set) => [
      set.label,
      set.holder,
      ...set.history.flatMap((entry) => [entry.person, entry.phone, entry.note]),
    ]),
  ]
    .join(" ")
    .toLowerCase();

  const statusMatches =
    status === "all" ||
    (status === "active" && !key.archived) ||
    (status === "archived" && key.archived) ||
    (status === "available" && !key.archived && key.sets.some((set) => set.status === "available")) ||
    (status === "out" && !key.archived && key.sets.some((set) => set.status === "out"));

  return statusMatches && (!query || haystack.includes(query));
}

function renderGrid() {
  grid.innerHTML = "";

  categories.forEach((category) => {
    const row = document.createElement("section");
    row.className = "category-row";

    const title = document.createElement("div");
    title.className = "category-title";
    title.textContent = category;

    const keyRow = document.createElement("div");
    keyRow.className = "key-row";

    const visibleKeys = keys
      .filter((key) => key.category === category)
      .filter(matchesFilter);

    visibleKeys.forEach((key) => {
      const tileShell = document.createElement("span");
      const button = document.createElement("button");
      const ownerName = formatOwner(key.owner);
      const hasTileDetails = Boolean(ownerName && key.property?.trim());
      const shouldShowSetStrip = isKeyFilled(key);
      const displayPhoto = getDisplayPhoto(key);
      const shouldShowPhotoTile = tileViewMode === "photo" && shouldShowSetStrip;
      tileShell.className = `key-tile-shell${shouldShowPhotoTile ? " photo-view-shell" : ""}`;
      button.type = "button";
      button.draggable = shouldShowSetStrip;
      button.className = `key-tile ${getTileStatus(key)}${hasTileDetails ? " has-details" : ""}${
        shouldShowSetStrip ? " has-set-strip" : ""
      }${shouldShowPhotoTile ? " photo-view" : ""}${key.id === selectedId ? " is-selected" : ""}`;
      button.title = `${keyLabel(key)} - ${statusText(key)}`;

      if (shouldShowPhotoTile) {
        const photoContent = document.createElement("span");
        photoContent.className = `key-photo-content${displayPhoto ? "" : " is-empty"}`;
        if (displayPhoto) {
          const photoImage = document.createElement("img");
          photoImage.src = displayPhoto;
          photoImage.alt = `Photo de ${keyLabel(key)}`;
          photoContent.append(photoImage);
        } else {
          photoContent.textContent = "Aucune photo";
        }
        button.append(photoContent);
      } else if (hasTileDetails) {
        const details = document.createElement("span");
        const heading = document.createElement("span");
        const number = document.createElement("span");
        const owner = document.createElement("span");
        const address = document.createElement("span");
        const city = document.createElement("span");
        details.className = "key-details";
        heading.className = "key-heading";
        number.className = "key-number";
        owner.className = "key-owner";
        address.className = "key-address";
        city.className = "key-city";
        number.textContent = `${tileLabel(key)} :`;
        owner.textContent = ownerName;
        address.textContent = key.property.trim();
        city.textContent = [key.postalCode, key.city].filter(Boolean).join(" ");
        heading.append(number, owner);
        details.append(heading, address);
        if (city.textContent) details.append(city);
        button.append(details);
      } else {
        const number = document.createElement("span");
        number.className = "key-number";
        number.textContent = tileLabel(key);
        button.append(number);
      }

        const previewSet = key.sets.find((set) => set.photo);
        if (previewSet?.photo && !shouldShowPhotoTile) {
          const preview = document.createElement("span");
          const previewImage = document.createElement("img");
          button.classList.add("has-photo");
          preview.className = "photo-hover";
          previewImage.src = previewSet.photo;
          previewImage.alt = `Photo ${previewSet.label} de ${keyLabel(key)}`;
          preview.append(previewImage);
          button.append(preview);
        }

        if (shouldShowSetStrip) {
          const strip = document.createElement("span");
          strip.className = "key-set-strip";
          key.sets.forEach((set) => {
            const segment = document.createElement("span");
            segment.className = `key-set-segment ${set.status}`;
            segment.title = `${set.label} - ${set.status === "out" ? "Sortie" : set.status === "reserved" ? "R\u00e9serv\u00e9" : "Disponible"}`;
            strip.append(segment);
          });
          button.append(strip);
        }

        button.addEventListener("click", () => {
          selectedArchiveRecord = null;
          selectedId = key.id;
          selectedSetId = key.sets[0]?.id || "main";
          render();
          if (!isTouchLayout()) scheduleDetailPanelClose();
        });
        button.addEventListener("mouseenter", () => {
          hoveredKeyId = key.id;
          if (selectedId === key.id) clearTimeout(detailCloseTimer);
        });
        button.addEventListener("mouseleave", () => {
          if (hoveredKeyId === key.id) hoveredKeyId = null;
          if (selectedId === key.id) scheduleDetailPanelClose();
        });
        button.addEventListener("dragstart", (event) => {
          if (!isKeyFilled(key)) {
            event.preventDefault();
            return;
          }

          draggedKeyId = key.id;
          document.body.classList.add("is-moving-key");
          button.classList.add("is-dragging");
          event.dataTransfer.effectAllowed = "copyMove";
          event.dataTransfer.setData("text/plain", key.id);

          const dragImage = document.createElement("span");
          dragImage.style.position = "fixed";
          dragImage.style.left = "-9999px";
          dragImage.style.top = "-9999px";
          dragImage.style.width = "1px";
          dragImage.style.height = "1px";
          document.body.append(dragImage);
          event.dataTransfer.setDragImage(dragImage, 0, 0);
          setTimeout(() => dragImage.remove(), 0);
        });
        button.addEventListener("dragend", () => {
          draggedKeyId = null;
          document.body.classList.remove("is-moving-key");
          button.classList.remove("is-dragging");
          document.querySelectorAll(".key-tile.is-drop-target").forEach((tile) => {
            tile.classList.remove("is-drop-target");
          });
        });
        button.addEventListener("dragover", (event) => {
          if (!draggedKeyId || draggedKeyId === key.id) return;
          event.preventDefault();
          event.dataTransfer.dropEffect = event.ctrlKey ? "copy" : "move";
          button.classList.add("is-drop-target");
        });
        button.addEventListener("dragleave", () => {
          button.classList.remove("is-drop-target");
        });
        button.addEventListener("drop", (event) => {
          event.preventDefault();
          button.classList.remove("is-drop-target");
          moveKeyToSlot(event.dataTransfer.getData("text/plain") || draggedKeyId, key.id, {
            copy: event.ctrlKey,
          });
        });

        tileShell.append(button);
        if (shouldShowSetStrip) {
          const deleteButton = document.createElement("button");
          deleteButton.className = "key-delete-button";
          deleteButton.type = "button";
          deleteButton.textContent = "\u00d7";
          deleteButton.title = `Supprimer ${keyLabel(key)} sans archiver`;
          deleteButton.setAttribute("aria-label", `Supprimer ${keyLabel(key)} sans archiver`);
          deleteButton.addEventListener("click", (event) => {
            event.stopPropagation();
            deleteKeyWithoutArchive(key.id);
          });
          tileShell.append(deleteButton);
        }

        keyRow.append(tileShell);
      });

    row.append(title, keyRow);
    grid.append(row);
  });
}

function renderKeySetSelect(key) {
  const selectedSet = getSelectedSet(key);
  keySetSelect.innerHTML = "";

  key.sets.forEach((set) => {
    const option = document.createElement("option");
    option.value = set.id;
    option.textContent = set.label;
    keySetSelect.append(option);
  });

  selectedSetId = selectedSet?.id || key.sets[0].id;
  keySetSelect.value = selectedSetId;
}

function compressPhotoFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("error", () => reject(new Error("Photo illisible.")));
    reader.addEventListener("load", () => {
      const image = new Image();
      image.addEventListener("error", () => reject(new Error("Photo illisible.")));
      image.addEventListener("load", () => {
        const scale = Math.min(1, photoMaxSize / Math.max(image.width, image.height));
        const width = Math.max(1, Math.round(image.width * scale));
        const height = Math.max(1, Math.round(image.height * scale));
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = width;
        canvas.height = height;
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, width, height);
        context.drawImage(image, 0, 0, width, height);
        const photo = canvas.toDataURL("image/jpeg", photoJpegQuality);
        if (!photo.startsWith("data:image/") || photo.length < 200) {
          reject(new Error("Photo compressée invalide."));
          return;
        }
        resolve(photo);
      });
      image.src = reader.result;
    });
    reader.readAsDataURL(file);
  });
}

function compressPhotoDataUrl(photo) {
  return new Promise((resolve) => {
    if (!photo || !photo.startsWith("data:image/")) {
      resolve(photo || "");
      return;
    }

    const image = new Image();
    image.addEventListener("error", () => resolve(photo));
    image.addEventListener("load", () => {
      const scale = Math.min(1, photoMaxSize / Math.max(image.width, image.height));
      const width = Math.max(1, Math.round(image.width * scale));
      const height = Math.max(1, Math.round(image.height * scale));
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = width;
      canvas.height = height;
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, width, height);
      context.drawImage(image, 0, 0, width, height);
      const nextPhoto = canvas.toDataURL("image/jpeg", photoJpegQuality);
      resolve(nextPhoto.startsWith("data:image/") && nextPhoto.length >= 200 ? nextPhoto : photo);
    });
    image.src = photo;
  });
}

async function compressKeyPhotos(key) {
  let changed = false;
  const sets = [];

  for (const set of key.sets || []) {
    const nextPhoto = await compressPhotoDataUrl(set.photo);
    changed = changed || nextPhoto !== set.photo;
    sets.push({ ...set, photo: nextPhoto });
  }

  return [{ ...key, sets }, changed];
}

async function optimizeStoredPhotos() {
  if (localStorage.getItem(photoOptimizationStorageKey) === "done") return;

  markLocalEdit();
  const registries = ["location", "transaction"];
  for (const registry of registries) {
    const config = registryConfig[registry];
    const storedKeys = parseStoredArray(config.keysStorageKey, makeInitialKeys()).map(normalizeKey);
    const storedArchives = parseStoredArray(config.archivesStorageKey, []).map(normalizeArchive);
    let changed = false;
    const nextKeys = [];
    const nextArchives = [];

    for (const key of storedKeys) {
      const [nextKey, keyChanged] = await compressKeyPhotos(key);
      changed = changed || keyChanged;
      nextKeys.push(nextKey);
    }

    for (const record of storedArchives) {
      const [nextKey, keyChanged] = await compressKeyPhotos(record.key);
      changed = changed || keyChanged;
      nextArchives.push({ ...record, key: nextKey });
    }

    if (changed) {
      localStorage.setItem(config.keysStorageKey, JSON.stringify(nextKeys));
      localStorage.setItem(config.archivesStorageKey, JSON.stringify(nextArchives));
      syncStorageKeyToCloud(config.keysStorageKey);
      syncStorageKeyToCloud(config.archivesStorageKey);
    }
  }

  localStorage.setItem(photoOptimizationStorageKey, "done");
  keys = loadKeys();
  archives = loadArchives();
  render();
}

function renderKeySetPhotos(key) {
  keySetPhotoList.innerHTML = "";
  const isArchiveView = Boolean(selectedArchiveRecord);

  key.sets.forEach((set) => {
    const item = document.createElement("article");
    const title = document.createElement("strong");
    const preview = document.createElement("div");
    const actions = document.createElement("div");
    const cameraButton = document.createElement("label");
    const cameraButtonText = document.createElement("span");
    const cameraInput = document.createElement("input");
    const importButton = document.createElement("label");
    const importButtonText = document.createElement("span");
    const importInput = document.createElement("input");

    item.className = `key-set-photo-card${set.id === selectedSetId ? " is-selected" : ""}`;
    title.textContent = set.label;
    preview.className = "photo-preview";
    preview.innerHTML = set.photo
      ? `<img src="${set.photo}" alt="Photo du jeu ${set.label} de ${keyLabel(key)}" />`
      : `<span>Aucune photo</span>`;
    if (set.photo && !isArchiveView) {
      preview.tabIndex = 0;
      preview.setAttribute("role", "button");
      preview.setAttribute("aria-label", `Afficher la photo du ${set.label}`);
      preview.addEventListener("click", () => openPhotoViewer(set.photo, `${set.label} - ${keyLabel(key)}`));
      preview.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        openPhotoViewer(set.photo, `${set.label} - ${keyLabel(key)}`);
      });
    }
    actions.className = "photo-actions";
    cameraButton.className = "photo-button";
    cameraButtonText.textContent = set.photo ? "Reprendre une photo" : "Prendre une photo";
    cameraInput.type = "file";
    cameraInput.accept = "image/*";
    cameraInput.setAttribute("capture", "environment");
    cameraInput.dataset.setId = set.id;
    cameraButton.style.display = isArchiveView ? "none" : "";
    cameraInput.addEventListener("click", beginPhotoImport);
    cameraInput.addEventListener("cancel", finishPhotoImport);

    importButton.className = "photo-button photo-import-button";
    importButtonText.textContent = "Importer une photo";
    importInput.type = "file";
    importInput.accept = "image/*";
    importInput.dataset.setId = set.id;
    importButton.style.display = isArchiveView ? "none" : "";
    importInput.addEventListener("click", beginPhotoImport);
    importInput.addEventListener("cancel", finishPhotoImport);
    importButton.append(importButtonText, importInput);

    cameraButton.append(cameraButtonText, cameraInput);
    actions.append(cameraButton, importButton);

    if (set.photo && !isArchiveView) {
      const deleteButton = document.createElement("button");
      deleteButton.className = "photo-delete-button";
      deleteButton.type = "button";
      deleteButton.textContent = "Supprimer la photo";
      deleteButton.addEventListener("click", () => {
        const confirmed = confirm(`Supprimer la photo du ${set.label} ?`);
        if (!confirmed) return;

        const currentKey = getSelectedKey();
        if (!currentKey) return;

        const sets = currentKey.sets.map((savedSet) =>
          savedSet.id === set.id ? { ...savedSet, photo: "" } : savedSet,
        );
        updateSelectedKey({ sets });
      });
      actions.append(deleteButton);
    }

    item.append(title, preview, actions);
    keySetPhotoList.append(item);
  });
}

function closePhotoViewer() {
  if (!photoViewer) return;
  photoViewer.hidden = true;
}

function openPhotoViewer(src, label) {
  if (!photoViewer) {
    photoViewer = document.createElement("div");
    photoViewer.className = "photo-viewer";
    photoViewer.hidden = true;
    photoViewer.innerHTML = `
      <div class="photo-viewer-content" role="dialog" aria-modal="true">
        <button class="photo-viewer-close" type="button" aria-label="Fermer la photo"></button>
        <img alt="" />
      </div>
    `;
    photoViewer.querySelector(".photo-viewer-close").addEventListener("click", closePhotoViewer);
    photoViewer.addEventListener("click", (event) => {
      if (event.target === photoViewer) closePhotoViewer();
    });
    document.body.append(photoViewer);
  }

  const image = photoViewer.querySelector("img");
  image.src = src;
  image.alt = label;
  photoViewer.hidden = false;
}

function renderPanel() {
  const key = getSelectedKey();
  if (!key) {
    detailPanel.hidden = true;
    form.hidden = true;
    return;
  }

  const selectedSet = getSelectedSet(key);
  const isArchiveView = Boolean(selectedArchiveRecord);
  const isCompromiseView = selectedArchiveRecord?.reason === "rented";
  selectedSetId = selectedSet.id;
  detailPanel.hidden = false;
  form.hidden = false;
  form.classList.toggle("is-archive-view", isArchiveView);
  form.classList.toggle("is-compromise-view", isCompromiseView);
  selectedTitle.textContent = keyLabel(key);
  statusPill.className = "status-pill status-summary";
  statusPill.innerHTML = "";
  key.sets.forEach((set, index) => {
    const item = document.createElement("span");
    item.className = `set-status ${set.status}`;
    item.textContent = `${index + 1} : ${set.status === "out" ? "indisponible" : set.status === "reserved" ? "r\u00e9serv\u00e9" : "disponible"}`;
    statusPill.append(item);
  });
  keySetCountSelect.value = String(key.sets.length);
  renderKeySetSelect(key);
  renderKeySetPhotos(key);
  propertyInput.value = key.property;
  postalCodeInput.value = key.postalCode || "";
  cityInput.value = key.city || "";
  ownerInput.value = formatOwner(key.owner);
  notesInput.value = key.notes;
  const canMoveSelectedKey = !key.archived || Boolean(selectedArchiveRecord);
  const isSelectedSetReserved = selectedSet.status === "reserved";
  const isSelectedSetOut = selectedSet.status === "out";
  checkinBtn.textContent = selectedSet.status === "out" || selectedSet.status === "reserved" ? "Rentr\u00e9e" : "Entr\u00e9e";
  reservedBtn.textContent = selectedSet.status === "reserved" ? "Annulation" : "R\u00e9serv\u00e9";
  checkoutBtn.disabled = !canMoveSelectedKey || isSelectedSetOut;
  checkinBtn.disabled = !canMoveSelectedKey || isSelectedSetReserved || (isCompromiseView && !isSelectedSetOut);
  reservedBtn.disabled = !canMoveSelectedKey || isSelectedSetOut;
  rentedBtn.disabled = key.archived || isSelectedSetReserved || isSelectedSetOut;
  removedBtn.disabled = key.archived || isSelectedSetReserved || isSelectedSetOut;
  deleteSelectedKeyBtn.disabled = key.archived;
  keySetCountSelect.disabled = isArchiveView;
  propertyInput.disabled = isArchiveView;
  postalCodeInput.disabled = isArchiveView;
  cityInput.disabled = isArchiveView;
  ownerInput.disabled = isArchiveView;
  notesInput.disabled = isArchiveView;

  historyList.innerHTML = "";
  if (!selectedSet.history.length) {
    const item = document.createElement("li");
    item.textContent = "Aucun mouvement enregistré pour ce jeu.";
    historyList.append(item);
    return;
  }

  [...selectedSet.history]
    .sort((first, second) => parseHistoryTimestamp(second.date) - parseHistoryTimestamp(first.date))
    .forEach((entry) => {
    const item = document.createElement("li");
    const title = document.createElement("strong");
    const date = document.createElement("small");
    item.dataset.historyAction =
      entry.type === "out"
        ? "out"
        : entry.type === "reserved" || entry.type === "cancel-reservation"
          ? "reserved"
          : "in";
    title.textContent = `${entry.type === "out" ? "Sortie" : entry.type === "reserved" ? "R\u00e9serv\u00e9" : entry.type === "cancel-reservation" ? "Annulation" : "Entr\u00e9e"} : ${getHistoryPersonName(entry)}`;
    date.textContent =
      entry.type === "reserved"
        ? `R\u00e9serv\u00e9 le ${entry.createdAt || entry.date} pour le ${entry.reservationDate || entry.date}`
        : entry.type === "cancel-reservation" && entry.note
          ? `${entry.date} - ${entry.note}`
        : entry.date;
    item.append(title);
    if (entry.company) {
      const company = document.createElement("p");
      company.textContent = `Soci\u00e9t\u00e9 : ${entry.company}`;
      item.append(company);
    }
    if (entry.note && entry.type !== "cancel-reservation") {
      const note = document.createElement("p");
      note.textContent = entry.note;
      item.append(note);
    }
    if (entry.signature) {
      const signature = document.createElement("img");
      signature.className = "history-signature";
      signature.src = entry.signature;
      signature.alt = `Signature ${entry.type === "out" ? "Sortie" : "Entrée"}`;
      item.append(signature);
    }
    item.append(date);
    historyList.append(item);
  });
}

function updateSelectedKey(changes) {
  if (selectedArchiveRecord) return;
  const previousKey = getSelectedKey();
  const wasFilled = previousKey ? isKeyFilled(previousKey) : false;
  rememberUndoStep();
  keys = keys.map((key) => (key.id === selectedId ? { ...key, ...changes } : key));
  const nextKey = getSelectedKey();
  if (nextKey && !wasFilled && isKeyFilled(nextKey)) {
    logActivity("Création fiche", keyLabel(nextKey), [nextKey.owner, nextKey.property].filter(Boolean).join(" - "));
  }
  saveKeys();
  render();
}

function updateSelectedSet(changes) {
  const key = getSelectedKey();
  if (!key) return;

  const sets = key.sets.map((set) => (set.id === selectedSetId ? { ...set, ...changes } : set));
  if (selectedArchiveRecord) {
    const nextArchiveRecord = {
      ...selectedArchiveRecord,
      key: {
        ...selectedArchiveRecord.key,
        sets,
      },
    };
    selectedArchiveRecord = nextArchiveRecord;
    archives = archives.map((archive) => (archive.id === nextArchiveRecord.id ? nextArchiveRecord : archive));
    saveArchives();
    render();
    return;
  }
  updateSelectedKey({ sets });
}

function setKeySetCount(count) {
  const key = getSelectedKey();
  if (!key) return;

  const nextCount = Math.max(1, Math.min(4, count));
  const previousCount = key.sets.length;
  const nextIds = keySetOptions.slice(0, nextCount).map((option) => option.id);
  const removedSets = key.sets.filter((set) => !nextIds.includes(set.id));
  const removedHasData = removedSets.some((set) => set.status === "out" || set.holder || set.history.length);

  if (removedHasData) {
    const confirmed = confirm("Réduire le nombre de jeux supprimera l'historique des jeux retirés. Continuer ?");
    if (!confirmed) {
      keySetCountSelect.value = String(key.sets.length);
      return;
    }
  }

  const nextSets = nextIds.map((id) => key.sets.find((set) => set.id === id) || makeKeySet(id));
  selectedSetId = nextSets.some((set) => set.id === selectedSetId) ? selectedSetId : nextSets[0].id;
  if (nextCount > previousCount) {
    logActivity("Création jeu", keyLabel(key), `${nextCount} jeux au total`);
  } else if (nextCount < previousCount) {
    logActivity("Suppression jeu", keyLabel(key), `${removedSets.map((set) => set.label).join(", ")} supprimé(s)`);
  }
  updateSelectedKey({ sets: nextSets });
}

function addMovement(type) {
  const key = getSelectedKey();
  const selectedSet = getSelectedSet(key);
  if (!key || !selectedSet || (key.archived && !selectedArchiveRecord)) return;
  const forcedPerson =
    (type === "out" && selectedSet.status === "reserved") || (type === "in" && selectedSet.status === "out")
      ? selectedSet.holder
      : "";
  const forcedPhone =
    (type === "out" && selectedSet.status === "reserved") || (type === "in" && selectedSet.status === "out")
      ? selectedSet.holderPhone
      : "";
  const forcedCompany =
    (type === "out" && selectedSet.status === "reserved") || (type === "in" && selectedSet.status === "out")
      ? selectedSet.holderCompany
      : "";

  const entry = {
    type,
    person: forcedPerson || movementPersonInput.value.trim(),
    company: forcedCompany || movementCompanyInput.value.trim(),
    phone: formatPhoneNumber(forcedPhone || movementPhoneInput.value),
    note: movementNoteInput.value.trim(),
    signature: hasSignature ? signatureCanvas.toDataURL("image/png") : "",
    date: new Intl.DateTimeFormat("fr-FR", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date()),
  };

  updateSelectedSet({
    status: type === "out" ? "out" : "available",
    holder: type === "out" ? entry.person || selectedSet.holder : "",
    holderCompany: type === "out" ? entry.company || selectedSet.holderCompany : "",
    holderPhone: type === "out" ? entry.phone || selectedSet.holderPhone : "",
    history: [entry, ...selectedSet.history],
  });
  logActivity(type === "out" ? "Sortie" : "Entrée", `${keyLabel(key)} - ${selectedSet.label}`, [entry.person, entry.phone, entry.note].filter(Boolean).join(" | "));

  movementPersonInput.value = "";
  movementCompanyInput.value = "";
  movementPhoneInput.value = "";
  movementNoteInput.value = "";
  contactSelect.value = "";
  clearSignature();
  if (selectedArchiveRecord) {
    renderCompromisesPanel();
  } else {
    selectedId = null;
    selectedArchiveRecord = null;
    selectedSetId = "main";
    render();
  }
}

async function reserveSelectedSet() {
  const key = getSelectedKey();
  const selectedSet = getSelectedSet(key);
  if (!key || !selectedSet || (key.archived && !selectedArchiveRecord)) return;
  clearTimeout(detailCloseTimer);

  if (selectedSet.status === "reserved") {
    const entry = {
      type: "cancel-reservation",
      person: selectedSet.holder || "R\u00e9servation annul\u00e9e",
      company: selectedSet.holderCompany || "",
      phone: selectedSet.holderPhone || "",
      note: "Annulation r\u00e9servation",
      signature: "",
      date: new Intl.DateTimeFormat("fr-FR", {
        dateStyle: "short",
        timeStyle: "short",
      }).format(new Date()),
    };

    updateSelectedSet({
      status: "available",
      holder: "",
      holderCompany: "",
      holderPhone: "",
      history: [entry, ...selectedSet.history],
    });
    logActivity("Annulation r\u00e9servation", `${keyLabel(key)} - ${selectedSet.label}`, entry.person);
    if (selectedArchiveRecord) renderCompromisesPanel();
    return;
  }

  const contact = contacts.find((savedContact) => savedContact.id === contactSelect.value);
  const person = contact ? getMovementContactName(contact) : movementPersonInput.value.trim();
  const company = contact?.type === "external" ? contact.companyName || "" : movementCompanyInput.value.trim();
  const phone = formatPhoneNumber(contact?.phone || movementPhoneInput.value);
  if (!person) {
    alert("Renseigne le nom de l'intervenant avant de r\u00e9server.");
    movementPersonInput.focus();
    return;
  }

  const reservationDateTime = await promptReservationDateTime();
  if (!reservationDateTime) return;
  clearTimeout(detailCloseTimer);

  const dateTimeFormatter = new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "short",
    timeStyle: "short",
  });
  const createdAt = dateTimeFormatter.format(new Date());
  const formattedDate = dateTimeFormatter.format(new Date(reservationDateTime));
  const entry = {
    type: "reserved",
    person,
    company,
    phone,
    note: movementNoteInput.value.trim(),
    signature: "",
    date: createdAt,
    createdAt,
    reservationDate: formattedDate,
  };

  updateSelectedSet({
    status: "reserved",
    holder: person,
    holderCompany: entry.company || "",
    holderPhone: entry.phone || "",
    history: [entry, ...selectedSet.history],
  });
  logActivity("R\u00e9serv\u00e9", `${keyLabel(key)} - ${selectedSet.label}`, [person, `Pour le ${formattedDate}`, entry.note].filter(Boolean).join(" | "));

  movementPersonInput.value = "";
  movementCompanyInput.value = "";
  movementPhoneInput.value = "";
  movementNoteInput.value = "";
  contactSelect.value = "";
  clearSignature();
  if (selectedArchiveRecord) renderCompromisesPanel();
}

function promptReservationDateTime() {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  const defaultValue = now.toISOString().slice(0, 16);
  const dialog = document.createElement("dialog");
  dialog.className = "date-dialog";
  dialog.innerHTML = `
    <form method="dialog">
      <h3>Date et heure de r\u00e9servation</h3>
      <input type="datetime-local" value="${defaultValue}" required />
      <div>
        <button value="cancel" type="submit">Annuler</button>
        <button value="confirm" type="submit">Valider</button>
      </div>
    </form>
  `;
  document.body.append(dialog);

  const input = dialog.querySelector("input");
  dialog.showModal();
  input.focus();

  return new Promise((resolve) => {
    dialog.addEventListener(
      "close",
      () => {
        const value = dialog.returnValue === "confirm" ? input.value : "";
        dialog.remove();
        resolve(value);
      },
      { once: true },
    );
  });
}

function promptCompromiseDate(defaultValue = new Date().toISOString().slice(0, 10), title = "Date de signature du compromis") {
  const dialog = document.createElement("dialog");
  dialog.className = "date-dialog";
  dialog.innerHTML = `
    <form method="dialog">
      <h3>${title}</h3>
      <input type="date" value="${defaultValue}" required />
      <div>
        <button value="cancel" type="submit">Annuler</button>
        <button value="confirm" type="submit">Valider</button>
      </div>
    </form>
  `;
  document.body.append(dialog);

  const input = dialog.querySelector("input");
  dialog.showModal();
  input.focus();

  return new Promise((resolve) => {
    dialog.addEventListener(
      "close",
      () => {
        const value = dialog.returnValue === "confirm" ? input.value : "";
        dialog.remove();
        resolve(value);
      },
      { once: true },
    );
  });
}

async function archiveSelectedKey(reason) {
  const key = getSelectedKey();
  if (!key || key.archived) return;

  const actionLabel = reason === "rented" ? getRegistryConfig().archiveActionLabel : "Retiré";
  let compromiseSignedAt = "";
  if (reason === "rented" && activeRegistry === "transaction") {
    compromiseSignedAt = await promptCompromiseDate();
    if (!compromiseSignedAt) return;
  }

  const confirmed = confirm(`${actionLabel} ${keyLabel(key)} et libérer la case ?`);
  if (!confirmed) return;
  rememberUndoStep();

  const archivedAt = new Date().toISOString();
  archives = [
    {
      id: `${key.id}-${archivedAt}`,
      reason,
      archivedAt,
      compromiseSignedAt,
      key: { ...key, archived: false },
    },
    ...archives,
  ];
  keys = keys.map((savedKey) => (savedKey.id === key.id ? makeEmptyKey(savedKey) : savedKey));
  selectedId = null;
  selectedArchiveRecord = null;
  selectedSetId = "main";
  logActivity(actionLabel, keyLabel(key), [key.owner, key.property, compromiseSignedAt ? `Signature : ${formatDateOnly(compromiseSignedAt)}` : ""].filter(Boolean).join(" - "));
  saveArchives();
  saveKeys();
  render();
}

function openContactsPanel() {
  clearTimeout(contactsCloseTimer);
  clearTimeout(archivesCloseTimer);
  compromisesPanel.hidden = true;
  archivesPanel.hidden = true;
  globalHistoryPanel.hidden = true;
  contactsPanel.hidden = false;
  renderContactsPanel();
}

function openCompromisesPanel() {
  clearTimeout(contactsCloseTimer);
  clearTimeout(archivesCloseTimer);
  contactsPanel.hidden = true;
  archivesPanel.hidden = true;
  globalHistoryPanel.hidden = true;
  compromisesPanel.hidden = false;
  renderCompromisesPanel();
}

function openArchivesPanel() {
  clearTimeout(contactsCloseTimer);
  clearTimeout(archivesCloseTimer);
  contactsPanel.hidden = true;
  compromisesPanel.hidden = true;
  globalHistoryPanel.hidden = true;
  archivesPanel.hidden = false;
  renderArchivesPanel();
}

function scheduleCloseContactsPanel() {
  clearTimeout(contactsCloseTimer);
  contactsCloseTimer = setTimeout(() => {
    contactsPanel.hidden = true;
  }, 1000);
}

function scheduleCloseArchivesPanel() {
  clearTimeout(archivesCloseTimer);
  archivesCloseTimer = setTimeout(() => {
    archivesPanel.hidden = true;
  }, 1000);
}

function debounce(callback, delay = 250) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args), delay);
  };
}

function getSignatureContext() {
  const context = signatureCanvas.getContext("2d");
  context.lineWidth = 2.4;
  context.lineCap = "round";
  context.lineJoin = "round";
  context.strokeStyle = "#1e2528";
  return context;
}

function getSignaturePoint(event) {
  const rect = signatureCanvas.getBoundingClientRect();
  const source = event.touches?.[0] || event;
  const clampedX = Math.min(Math.max(source.clientX, rect.left), rect.right);
  const clampedY = Math.min(Math.max(source.clientY, rect.top), rect.bottom);

  return {
    x: ((clampedX - rect.left) / rect.width) * signatureCanvas.width,
    y: ((clampedY - rect.top) / rect.height) * signatureCanvas.height,
  };
}

function startSignature(event) {
  event.preventDefault();
  isSigning = true;
  hasSignature = true;
  signatureCanvas.setPointerCapture?.(event.pointerId);
  const point = getSignaturePoint(event);
  const context = getSignatureContext();
  context.beginPath();
  context.moveTo(point.x, point.y);
}

function drawSignature(event) {
  if (!isSigning) return;
  event.preventDefault();
  const point = getSignaturePoint(event);
  const context = getSignatureContext();
  context.lineTo(point.x, point.y);
  context.stroke();
}

function stopSignature(event) {
  if (event?.pointerId !== undefined) signatureCanvas.releasePointerCapture?.(event.pointerId);
  isSigning = false;
}

function clearSignature() {
  const context = signatureCanvas.getContext("2d");
  context.clearRect(0, 0, signatureCanvas.width, signatureCanvas.height);
  hasSignature = false;
}

propertyInput.addEventListener("input", debounce(() => updateSelectedKey({ property: propertyInput.value })));
postalCodeInput.addEventListener("input", debounce(() => updateSelectedKey({ postalCode: postalCodeInput.value })));
cityInput.addEventListener("input", debounce(() => updateSelectedKey({ city: formatCity(cityInput.value) })));
cityInput.addEventListener("blur", () => {
  cityInput.value = formatCity(cityInput.value);
  updateSelectedKey({ city: cityInput.value });
});
ownerInput.addEventListener(
  "input",
  debounce(() => updateSelectedKey({ owner: formatOwner(ownerInput.value) })),
);
notesInput.addEventListener("input", debounce(() => updateSelectedKey({ notes: notesInput.value })));
keySetCountSelect.addEventListener("change", () => setKeySetCount(Number(keySetCountSelect.value)));
keySetSelect.addEventListener("change", () => {
  selectedSetId = keySetSelect.value;
  clearSignature();
  render();
});
checkoutBtn.addEventListener("click", () => addMovement("out"));
checkinBtn.addEventListener("click", () => addMovement("in"));
reservedBtn.addEventListener("click", reserveSelectedSet);
rentedBtn.addEventListener("click", () => archiveSelectedKey("rented"));
removedBtn.addEventListener("click", () => archiveSelectedKey("removed"));
clearSignatureBtn.addEventListener("click", clearSignature);
contactSelect.addEventListener("change", () => {
  const contact = contacts.find((savedContact) => savedContact.id === contactSelect.value);
  if (!contact) {
    movementCompanyInput.value = "";
    return;
  }

  movementPersonInput.value = getMovementContactName(contact);
  movementCompanyInput.value = contact.type === "external" ? contact.companyName || "" : "";
  movementPhoneInput.value = formatPhoneNumber(contact.phone);
});
movementPhoneInput.addEventListener("input", () => {
  movementPhoneInput.value = formatPhoneNumber(movementPhoneInput.value);
});
contactsTabBtn.addEventListener("click", openContactsPanel);
contactsPanel.addEventListener("mouseenter", () => clearTimeout(contactsCloseTimer));
closeContactsBtn.addEventListener("click", () => {
  contactsPanel.hidden = true;
});
contactPhoneInput.addEventListener("input", () => {
  contactPhoneInput.value = formatPhoneNumber(contactPhoneInput.value);
});
contactNameInput.addEventListener("input", () => {
  contactNameInput.value = formatLastName(contactNameInput.value);
});
contactsList.addEventListener("dragstart", (event) => {
  const item = event.target.closest("[data-contact-id]");
  if (!item) return;

  draggedContactId = item.dataset.contactId;
  item.classList.add("dragging");
  event.dataTransfer.effectAllowed = "move";
});
contactsList.addEventListener("dragend", () => {
  saveContactOrderFromList();
  draggedContactId = null;
  contactsList.querySelectorAll(".drag-over, .dragging").forEach((item) => {
    item.classList.remove("drag-over", "dragging");
  });
});
contactsList.addEventListener("dragover", (event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";

  const draggedItem = contactsList.querySelector(".dragging");
  const item = event.target.closest("[data-contact-id]");
  if (!draggedItem || !item || item === draggedItem) return;

  const rect = item.getBoundingClientRect();
  const placeAfter = event.clientY > rect.top + rect.height / 2;
  contactsList.insertBefore(draggedItem, placeAfter ? item.nextSibling : item);
});
contactsList.addEventListener("drop", (event) => {
  event.preventDefault();
  saveContactOrderFromList();
});
contactsList.addEventListener("pointerdown", (event) => {
  if (event.pointerType === "mouse") return;
  if (event.target.closest("button")) return;

  const item = event.target.closest("[data-contact-id]");
  if (!item) return;

  const timer = setTimeout(() => startTouchContactDrag(item, event.pointerId, event.clientY), 220);
  touchContactDrag = {
    item,
    pointerId: event.pointerId,
    timer,
    startX: event.clientX,
    startY: event.clientY,
  };
});
contactsList.addEventListener("pointermove", (event) => {
  if (!touchContactDrag || touchContactDrag.pointerId !== event.pointerId) return;

  if (touchContactDrag.timer) {
    const moved = Math.hypot(event.clientX - touchContactDrag.startX, event.clientY - touchContactDrag.startY);
    if (moved > 10) {
      clearTimeout(touchContactDrag.timer);
      touchContactDrag = null;
    }
    return;
  }

  event.preventDefault();
  moveDraggedContactToPoint(event.clientY);
});
contactsList.addEventListener("pointerup", (event) => {
  if (!touchContactDrag || touchContactDrag.pointerId !== event.pointerId) return;
  if (touchContactDrag.timer) {
    clearTimeout(touchContactDrag.timer);
    touchContactDrag = null;
    return;
  }
  stopTouchContactDrag();
});
contactsList.addEventListener("pointercancel", (event) => {
  if (!touchContactDrag || touchContactDrag.pointerId !== event.pointerId) return;
  if (touchContactDrag.timer) clearTimeout(touchContactDrag.timer);
  stopTouchContactDrag();
});
registryToggleBtn.addEventListener("click", switchRegistry);
compromisesTabBtn.addEventListener("click", openCompromisesPanel);
compromisesPanel.addEventListener("mouseenter", () => clearTimeout(archivesCloseTimer));
closeCompromisesBtn.addEventListener("click", () => {
  compromisesPanel.hidden = true;
});
archivesTabBtn.addEventListener("click", openArchivesPanel);
archivesPanel.addEventListener("mouseenter", () => clearTimeout(archivesCloseTimer));
archivesPanel.addEventListener("mouseleave", scheduleCloseArchivesPanel);
closeArchivesBtn.addEventListener("click", () => {
  archivesPanel.hidden = true;
});
contactTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    activeContactType = tab.dataset.contactType === "external" ? "external" : "internal";
    editingContactId = null;
    contactForm.reset();
    updateContactFormMode();
    renderContactsPanel();
  });
});
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = formatLastName(contactNameInput.value);
  const firstName = contactFirstNameInput.value.trim();
  const companyName = activeContactType === "external" ? contactCompanyInput.value.trim() : "";
  const phone = formatPhoneNumber(contactPhoneInput.value);
  if (!name && !companyName) return;

  rememberUndoStep();
  if (editingContactId) {
    const previousContact = contacts.find((contact) => contact.id === editingContactId);
    const nextContact = {
      ...(previousContact || {}),
      firstName,
      name,
      companyName,
      phone,
      type: activeContactType,
    };
    contacts = contacts.map((contact) =>
      contact.id === editingContactId
        ? nextContact
        : contact,
    );
    logActivity(
      "Modification intervenant",
      getContactDisplayName(nextContact),
      [contactTypeText(nextContact.type), phone].filter(Boolean).join(" | "),
    );
  } else {
    const newContact = {
      id: createContactId(),
      firstName,
      name,
      companyName,
      phone,
      type: activeContactType,
    };
    contacts = [
      ...contacts,
      newContact,
    ];
    logActivity(
      "Ajout intervenant",
      getContactDisplayName(newContact),
      [contactTypeText(newContact.type), phone].filter(Boolean).join(" | "),
    );
  }
  editingContactId = null;
  saveContacts();
  contactForm.reset();
  updateContactFormMode();
  renderContactSelect();
  renderContactsPanel();
});
signatureCanvas.addEventListener("pointerdown", startSignature);
signatureCanvas.addEventListener("pointermove", drawSignature);
signatureCanvas.addEventListener("pointerup", stopSignature);
signatureCanvas.addEventListener("pointercancel", stopSignature);
searchInput.addEventListener("input", render);
textViewBtn.addEventListener("click", () => setTileViewMode("text"));
photoViewBtn.addEventListener("click", () => setTileViewMode("photo"));
statusFilter?.addEventListener("change", render);
undoBtn.addEventListener("click", undoPreviousStep);
historyDataBtn.addEventListener("click", openGlobalHistoryPanel);
closeGlobalHistoryBtn.addEventListener("click", () => {
  globalHistoryPanel.hidden = true;
});
exportFilledDataBtn.addEventListener("click", exportFilledDataCsv);
backupDataBtn.addEventListener("click", exportAllDataBackup);
document.addEventListener("keydown", updateImportButtonAvailability);
document.addEventListener("keyup", updateImportButtonAvailability);
window.addEventListener("blur", () => updateImportButtonAvailability());
importDataBtn.addEventListener("click", (event) => {
  if (!event.ctrlKey || !event.shiftKey) {
    return;
  }

  backupFileInput.value = "";
  backupFileInput.click();
});
backupFileInput.addEventListener("change", () => {
  const file = backupFileInput.files?.[0];
  if (!file) return;

  importAllDataBackup(file);
  backupFileInput.value = "";
});
closePanelBtn.addEventListener("click", () => {
  clearTimeout(detailCloseTimer);
  syncCurrentRegistryToCloud();
  selectedId = null;
  selectedArchiveRecord = null;
  render();
});
document.addEventListener("pointerdown", (event) => {
  if (!selectedId) return;
  if (detailPanel.hidden) return;
  if (detailPanel.contains(event.target)) return;
  if (event.target.closest(".key-tile")) return;
  if (event.target.closest(".photo-viewer, .date-dialog")) return;

  clearTimeout(detailCloseTimer);
  selectedId = null;
  selectedArchiveRecord = null;
  clearSignature();
  render();
});
form.addEventListener("focusin", () => clearTimeout(detailCloseTimer));
form.addEventListener("focusout", scheduleDetailPanelClose);
detailPanel.addEventListener("mouseenter", () => {
  isDetailPanelHovered = true;
  clearTimeout(detailCloseTimer);
});
detailPanel.addEventListener("mouseleave", () => {
  isDetailPanelHovered = false;
  scheduleDetailPanelClose();
});
exportKeyCsvBtn.addEventListener("click", () => {
  const key = getSelectedKey();
  if (!key) return;
  exportKeyCsv(key, selectedArchiveRecord);
});
deleteSelectedKeyBtn.addEventListener("click", () => {
  const key = getSelectedKey();
  if (!key || key.archived) return;
  deleteKeyWithoutArchive(key.id);
});
keySetPhotoList.addEventListener("change", (event) => {
  const input = event.target;
  if (!(input instanceof HTMLInputElement) || input.type !== "file") return;

  const file = input.files?.[0];
  const setId = input.dataset.setId;
  if (!file) {
    finishPhotoImport();
    return;
  }

  compressPhotoFile(file)
    .then((photo) => {
      const key = getSelectedKey();
      if (!key) return;

      const sets = key.sets.map((set) => (set.id === setId ? { ...set, photo } : set));
      updateSelectedKey({ sets });
    })
    .catch(() => {
      alert("La photo n'a pas pu être importée.");
    })
    .finally(finishPhotoImport);
  input.value = "";
});

async function initializeApp() {
  migrateArchivedSlots();
  ensureDeviceName();
  await loadStorageFromCloud();
  updateRegistryHeader();
  updateTileViewToggle();
  updateUndoButton();
  render();
  setInterval(async () => {
    await loadStorageFromCloud();
  }, 7000);
}

initializeApp();
