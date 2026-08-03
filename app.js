const categories = ["T1", "T2", "T3", "T4+", "Maison", "Autre"];
const slotsPerCategory = 20;
const supabaseUrl = "https://ivwvrtnbzvsxrsmqkrff.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2d3ZydG5ienZzeHJzbXFrcmZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMyMjM3MjUsImV4cCI6MjA5ODc5OTcyNX0.-vxDlYB1L6t-NZnjEdrJXbpbQn1n-s3XCA--CEqcK-w";
const supabaseClient = globalThis.supabase?.createClient(supabaseUrl, supabaseAnonKey);
const registryStorageKey = "cles-location-active-registry-v1";
const sharedContactsStorageKey = "cles-location-intervenants-v1";
const appActivityLogStorageKey = "cles-global-activity-v1";
const hiddenGlobalHistoryStorageKey = "cles-hidden-global-history-v1";
const deviceNameStorageKey = "cles-device-name-v1";
const tileViewStorageKey = "cles-tile-view-mode-v1";
const keyStatusFilterStorageKey = "cles-key-status-filter-v1";
const photoMaxSize = 560;
const photoJpegQuality = 0.36;
const photoMaxDataUrlLength = 260000;
const photoOptimizationStorageKey = "cles-photo-optimization-560-v2";
const cloudVersionsStorageKey = "cles-cloud-row-versions-v1";
const pendingCloudKeysStorageKey = "cles-pending-cloud-keys-v1";
const lastLocalEditStorageKey = "cles-last-local-edit-v1";
const automaticBackupKeyPrefix = "cles-auto-backup-";
const cloudPollIntervalMs = 60000;
const cloudWriteDebounceMs = 2000;
const registryConfig = {
  location: {
    title: "LOCATION",
    toggleLabel: "BASCULER VERS\nTABLEAU CL\u00c9S TRANSACTION",
    keysStorageKey: "cles-immobilieres-v1",
    archivesStorageKey: "cles-location-archives-v1",
    archiveActionLabel: "Loué",
    rentedArchiveTitle: "Biens loués",
    rentedArchiveEmpty: "Aucun bien loué.",
    rentedArchiveText: "Loué",
  },
  transaction: {
    title: "TRANSACTION",
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
const ownerFirstNameInput = document.querySelector("#ownerFirstNameInput");
const notesInput = document.querySelector("#notesInput");
const keySetPhotoList = document.querySelector("#keySetPhotoList");
const keySetSelect = document.querySelector("#keySetSelect");
const activeReservationPanel = document.querySelector("#activeReservationPanel");
const contactSelect = document.querySelector("#contactSelect");
const movementPersonInput = document.querySelector("#movementPersonInput");
const movementNameInput = document.querySelector("#movementNameInput");
const movementCompanyInput = document.querySelector("#movementCompanyInput");
const movementPhoneInput = document.querySelector("#movementPhoneInput");
const movementNoteInput = document.querySelector("#movementNoteInput");
const checkoutBtn = document.querySelector("#checkoutBtn");
const checkinBtn = document.querySelector("#checkinBtn");
const rentedBtn = document.querySelector("#rentedBtn");
const removedBtn = document.querySelector("#removedBtn");
const reservedBtn = document.querySelector("#reservedBtn");
const exportKeyCsvBtn = document.querySelector("#exportKeyCsvBtn");
const signatureCanvas = document.querySelector("#signatureCanvas");
const clearSignatureBtn = document.querySelector("#clearSignatureBtn");
const historyList = document.querySelector("#historyList");
const searchInput = document.querySelector("#searchInput");
const textViewBtn = document.querySelector("#textViewBtn");
const photoViewBtn = document.querySelector("#photoViewBtn");
const keyStatusFilterButtons = [...document.querySelectorAll(".key-status-filter-button")];
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
const registryHistoryDataBtn = document.querySelector("#registryHistoryDataBtn");
const registryHistoryDataLabel = document.querySelector("#registryHistoryDataLabel");
const globalHistoryPanel = document.querySelector("#globalHistoryPanel");
const globalHistoryEyebrow = document.querySelector("#globalHistoryEyebrow");
const globalHistoryTitle = document.querySelector("#globalHistoryTitle");
const closeGlobalHistoryBtn = document.querySelector("#closeGlobalHistoryBtn");
const globalHistoryList = document.querySelector("#globalHistoryList");
const exportFilledDataBtn = document.querySelector("#exportFilledDataBtn");
const backupDataBtn = document.querySelector("#backupDataBtn");
const savedBackupsBtn = document.querySelector("#savedBackupsBtn");
const savedBackupsPanel = document.querySelector("#savedBackupsPanel");
const closeSavedBackupsBtn = document.querySelector("#closeSavedBackupsBtn");
const savedBackupsList = document.querySelector("#savedBackupsList");
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
let isKeyInfoEditUnlocked = false;

const protectedKeyInfoInputs = [ownerInput, ownerFirstNameInput, propertyInput, postalCodeInput, cityInput, notesInput];
let tileViewMode = loadTileViewMode();
let keyStatusFilter = loadKeyStatusFilter();
let currentGlobalHistoryFilter = "";
let saleCelebrationTimer = null;
const celebrationAudioFiles = ["Ados.mp3", "Adultes.mp3", "Langue.mp3"];
let celebrationAudioPlayers = [];
let photoViewer = null;
let lastLocalEditAt = Number(localStorage.getItem(lastLocalEditStorageKey) || 0);
let isApplyingCloudState = false;
let pendingCloudSync = Promise.resolve();
let failedCloudSyncKeys = new Set();
let cloudSyncTimers = new Map();
let dirtyCloudKeys = loadPendingCloudKeys();
let cloudRowVersions = loadCloudRowVersions();
let hasLoadedCloudState = cloudRowVersions.size > 0;
let isCloudCheckRunning = false;

function markLocalEdit() {
  if (isApplyingCloudState) return;
  lastLocalEditAt = Date.now();
  localStorage.setItem(lastLocalEditStorageKey, String(lastLocalEditAt));
}

function loadTileViewMode() {
  return localStorage.getItem(tileViewStorageKey) === "photo" ? "photo" : "text";
}

function loadKeyStatusFilter() {
  const saved = localStorage.getItem(keyStatusFilterStorageKey);
  return ["all", "available", "reserved", "out"].includes(saved) ? saved : "all";
}

function setTileViewMode(mode) {
  tileViewMode = mode === "photo" ? "photo" : "text";
  localStorage.setItem(tileViewStorageKey, tileViewMode);
  updateTileViewToggle();
  renderGrid();
}

function setKeyStatusFilter(filter) {
  keyStatusFilter = ["all", "available", "reserved", "out"].includes(filter) ? filter : "all";
  localStorage.setItem(keyStatusFilterStorageKey, keyStatusFilter);
  renderGrid();
}

function updateTileViewToggle() {
  textViewBtn.classList.toggle("is-active", tileViewMode === "text");
  photoViewBtn.classList.toggle("is-active", tileViewMode === "photo");
  textViewBtn.setAttribute("aria-pressed", String(tileViewMode === "text"));
  photoViewBtn.setAttribute("aria-pressed", String(tileViewMode === "photo"));
  grid.dataset.viewMode = tileViewMode;
}

function updateKeyStatusFilterBar() {
  const counts = getKeyStatusCounts();
  keyStatusFilterButtons.forEach((button) => {
    const filter = button.dataset.keyStatusFilter || "all";
    const count = button.querySelector("[data-key-status-count]");
    button.classList.toggle("is-active", filter === keyStatusFilter);
    button.setAttribute("aria-pressed", String(filter === keyStatusFilter));
    if (count) count.textContent = String(counts[filter] || 0);
  });
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
  scheduleStorageKeySync(appActivityLogStorageKey);
}

function loadHiddenGlobalHistoryIds() {
  return new Set(parseStoredArray(hiddenGlobalHistoryStorageKey, []));
}

function saveHiddenGlobalHistoryIds(hiddenIds) {
  markLocalEdit();
  localStorage.setItem(hiddenGlobalHistoryStorageKey, JSON.stringify([...hiddenIds]));
  scheduleStorageKeySync(hiddenGlobalHistoryStorageKey);
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

function updateCreationActivityForKey(key) {
  if (!key || !isKeyFilled(key)) return;
  const keyTitle = keyLabel(key);
  const owner = key.owner ? formatOwner(key.owner) : "";
  const nextTitle = `${keyTitle}${owner ? ` - ${owner}` : ""}`;
  const nextDetails = [key.owner, key.property].filter(Boolean).join(" - ");
  const savedEntries = loadActivityLog();
  const latestCreationEntry = savedEntries
    .filter((entry) => {
      const action = String(entry.action || "").toLocaleLowerCase("fr-FR");
      return entry.registry === activeRegistry && action.includes("cr\u00e9ation fiche") && String(entry.title || "").startsWith(keyTitle);
    })
    .sort((first, second) => parseHistoryTimestamp(second.date) - parseHistoryTimestamp(first.date))[0];
  if (!latestCreationEntry) return;

  let changed = false;
  const entries = savedEntries.map((entry) => {
    if (entry.id !== latestCreationEntry.id) return entry;
    if (entry.title === nextTitle && entry.details === nextDetails) return entry;
    changed = true;
    return { ...entry, title: nextTitle, details: nextDetails };
  });
  if (changed) saveActivityLog(entries);
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
    holderReservationId: "",
    needsCheckIn: false,
    needsCheckInReason: "",
    status: "available",
    reservations: [],
    history: [],
  };
}

function getLatestMovementEntry(history = []) {
  return [...history]
    .filter((entry) => entry.type === "out" || entry.type === "in")
    .sort((first, second) => parseHistoryTimestamp(second.date) - parseHistoryTimestamp(first.date))[0];
}

function shouldKeepSetOut(set) {
  if (set.status !== "out") return false;
  const latestMovement = getLatestMovementEntry(set.history);
  if (!latestMovement || latestMovement.type !== "out") return false;
  if (set.holderReservationId) return latestMovement.reservationId === set.holderReservationId;
  return !latestMovement.reservationId;
}

function repairSetMovementState(set) {
  const reservations = Array.isArray(set.reservations) ? set.reservations.filter(isActiveReservation) : [];
  if (set.status === "out") {
    return { ...set, reservations, status: "out" };
  }

  return {
    ...set,
    holder: "",
    holderCompany: "",
    holderPhone: "",
    holderReservationId: "",
    reservations,
    status: "available",
  };
}

function createHistoryId() {
  return `history-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function loadActiveRegistry() {
  const saved = localStorage.getItem(registryStorageKey);
  return saved === "transaction" ? "transaction" : "location";
}

function saveActiveRegistry() {
  markLocalEdit();
  localStorage.setItem(registryStorageKey, activeRegistry);
  scheduleStorageKeySync(registryStorageKey);
}

function getBackupStorageKeys() {
  return [
    registryStorageKey,
    sharedContactsStorageKey,
    appActivityLogStorageKey,
    hiddenGlobalHistoryStorageKey,
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

function loadCloudRowVersions() {
  try {
    const saved = JSON.parse(localStorage.getItem(cloudVersionsStorageKey) || "{}");
    return new Map(Object.entries(saved && typeof saved === "object" ? saved : {}));
  } catch {
    return new Map();
  }
}

function saveCloudRowVersions() {
  localStorage.setItem(cloudVersionsStorageKey, JSON.stringify(Object.fromEntries(cloudRowVersions)));
}

function loadPendingCloudKeys() {
  try {
    const saved = JSON.parse(localStorage.getItem(pendingCloudKeysStorageKey) || "[]");
    return new Set(Array.isArray(saved) ? saved : []);
  } catch {
    return new Set();
  }
}

function savePendingCloudKeys() {
  localStorage.setItem(pendingCloudKeysStorageKey, JSON.stringify([...dirtyCloudKeys]));
}

function scheduleStorageKeySync(storageKey, delay = cloudWriteDebounceMs) {
  if (!supabaseClient) return;
  dirtyCloudKeys.add(storageKey);
  savePendingCloudKeys();
  clearTimeout(cloudSyncTimers.get(storageKey));
  cloudSyncTimers.set(
    storageKey,
    setTimeout(() => {
      cloudSyncTimers.delete(storageKey);
      syncStorageKeyToCloud(storageKey);
    }, delay),
  );
}

function syncStorageKeyToCloud(storageKey, options = {}) {
  if (!supabaseClient) return Promise.resolve();
  clearTimeout(cloudSyncTimers.get(storageKey));
  cloudSyncTimers.delete(storageKey);
  failedCloudSyncKeys.delete(storageKey);

  const force = Boolean(options.force);
  const value = localStorage.getItem(storageKey);
  const updatedAt = new Date().toISOString();
  const expectedUpdatedAt = cloudRowVersions.get(storageKey) || null;
  pendingCloudSync = pendingCloudSync
    .catch(() => {})
    .then(async () => {
      const { data: remoteRow, error: versionError } = await supabaseClient
        .from("app_state")
        .select("key,value,updated_at")
        .eq("key", storageKey)
        .maybeSingle();
      if (versionError) throw versionError;

      const remoteUpdatedAt = remoteRow?.updated_at || "";
      if (!force && remoteRow && remoteUpdatedAt !== (expectedUpdatedAt || "")) {
        if ((dirtyCloudKeys.has(storageKey) || isKeyPanelOpen() || isKeyFormBeingEdited() || Date.now() - lastLocalEditAt < 20000) && value !== null) {
          const { error: localSaveError } = await supabaseClient.from("app_state").upsert({
            key: storageKey,
            value: parseStorageValue(value),
            updated_at: updatedAt,
          });
          if (localSaveError) {
            dirtyCloudKeys.add(storageKey);
            failedCloudSyncKeys.add(storageKey);
            savePendingCloudKeys();
            console.warn("Supabase sync failed", storageKey, localSaveError.message);
            return;
          }

          failedCloudSyncKeys.delete(storageKey);
          dirtyCloudKeys.delete(storageKey);
          cloudRowVersions.set(storageKey, updatedAt);
          savePendingCloudKeys();
          saveCloudRowVersions();
          return;
        }

        isApplyingCloudState = true;
        saveStorageValue(remoteRow.key, stringifyCloudValue(remoteRow.value));
        isApplyingCloudState = false;
        cloudRowVersions.set(remoteRow.key, remoteUpdatedAt);
        dirtyCloudKeys.delete(storageKey);
        failedCloudSyncKeys.delete(storageKey);
        savePendingCloudKeys();
        saveCloudRowVersions();
        refreshDataFromStorage({ keepSelection: true });
        return;
      }

      const request =
        value === null
          ? supabaseClient.from("app_state").delete().eq("key", storageKey)
          : supabaseClient.from("app_state").upsert(
              force
                ? {
                    key: storageKey,
                    value: parseStorageValue(value),
                    updated_at: updatedAt,
                  }
                : {
                    key: storageKey,
                    value: parseStorageValue(value),
                    updated_at: updatedAt,
                    expected_updated_at: expectedUpdatedAt,
                  },
            );

      let { error } = await request;
      if (error && /expected_updated_at/i.test(error.message || "") && value !== null) {
        const fallbackRequest = supabaseClient.from("app_state").upsert({
          key: storageKey,
          value: parseStorageValue(value),
          updated_at: updatedAt,
        });
        const fallbackResult = await fallbackRequest;
        error = fallbackResult.error;
      }
      if (error) {
        dirtyCloudKeys.add(storageKey);
        failedCloudSyncKeys.add(storageKey);
        savePendingCloudKeys();
        console.warn("Supabase sync failed", storageKey, error.message);
        return;
      }
      failedCloudSyncKeys.delete(storageKey);
      dirtyCloudKeys.delete(storageKey);
      savePendingCloudKeys();
      if (value === null) cloudRowVersions.delete(storageKey);
      else cloudRowVersions.set(storageKey, updatedAt);
      saveCloudRowVersions();
    });

  return pendingCloudSync;
}

function retryFailedCloudSyncs() {
  if (!failedCloudSyncKeys.size) return Promise.resolve();
  const keys = [...failedCloudSyncKeys];
  failedCloudSyncKeys.clear();
  return Promise.all(keys.map(syncStorageKeyToCloud));
}

function syncAllStorageToCloud() {
  return Promise.all(getBackupStorageKeys().map(syncStorageKeyToCloud));
}

function syncCurrentRegistryToCloud() {
  return Promise.all([...dirtyCloudKeys].map(syncStorageKeyToCloud));
}

function closeKeyPanelAfterAction() {
  selectedId = null;
  selectedArchiveRecord = null;
  selectedSetId = "main";
  resetKeyInfoEditUnlock(null);
  render();
}

async function syncCloudAfterAction() {
  try {
    await syncCurrentRegistryToCloud();
  } catch (error) {
    console.warn("Supabase action sync failed", error.message);
  }
}

async function loadStorageFromCloud() {
  if (!supabaseClient) return;
  if (isPhotoImporting) return;
  if (isCloudCheckRunning) return;
  if (hasLoadedCloudState && document.visibilityState === "hidden") return;
  isCloudCheckRunning = true;
  await pendingCloudSync.catch(() => {});
  if (hasLoadedCloudState) {
    await retryFailedCloudSyncs();
    if (dirtyCloudKeys.size) {
      isCloudCheckRunning = false;
      return;
    }
  } else if (dirtyCloudKeys.size || failedCloudSyncKeys.size) {
    dirtyCloudKeys.clear();
    failedCloudSyncKeys.clear();
    savePendingCloudKeys();
  }
  try {
    if (!hasLoadedCloudState) {
      const { data, error } = await supabaseClient.from("app_state").select("key,value,updated_at");
      if (error) throw error;
      if (!Array.isArray(data) || !data.length) {
        localStorage.setItem(registryStorageKey, activeRegistry);
        localStorage.setItem(getRegistryConfig().keysStorageKey, JSON.stringify(keys));
        localStorage.setItem(getRegistryConfig().archivesStorageKey, JSON.stringify(archives));
        localStorage.setItem(sharedContactsStorageKey, JSON.stringify(contacts));
        await syncAllStorageToCloud();
        hasLoadedCloudState = true;
        return;
      }

      isApplyingCloudState = true;
      data.forEach((row) => {
        saveStorageValue(row.key, stringifyCloudValue(row.value));
        cloudRowVersions.set(row.key, row.updated_at || "");
      });
      isApplyingCloudState = false;
      hasLoadedCloudState = true;
      saveCloudRowVersions();
      refreshDataFromStorage({ keepSelection: true });
      return;
    }

    const { data: metadata, error: metadataError } = await supabaseClient
      .from("app_state")
      .select("key,updated_at");
    if (metadataError) throw metadataError;
    if (!Array.isArray(metadata)) return;

    const remoteVersions = new Map(metadata.map((row) => [row.key, row.updated_at || ""]));
    const changedKeys = metadata
      .filter((row) => cloudRowVersions.get(row.key) !== (row.updated_at || "") || localStorage.getItem(row.key) === null)
      .map((row) => row.key);
    const deletedKeys = [...cloudRowVersions.keys()].filter((key) => !remoteVersions.has(key));
    if (!changedKeys.length && !deletedKeys.length) return;
    if (isKeyPanelOpen() || isKeyFormBeingEdited() || Date.now() - lastLocalEditAt < 20000) return;

    let changedRows = [];
    if (changedKeys.length) {
      const { data, error } = await supabaseClient
        .from("app_state")
        .select("key,value,updated_at")
        .in("key", changedKeys);
      if (error) throw error;
      changedRows = Array.isArray(data) ? data : [];
    }

    isApplyingCloudState = true;
    changedRows.forEach((row) => saveStorageValue(row.key, stringifyCloudValue(row.value)));
    deletedKeys.forEach((key) => localStorage.removeItem(key));
    isApplyingCloudState = false;
    cloudRowVersions = remoteVersions;
    saveCloudRowVersions();
    refreshDataFromStorage({ keepSelection: true });
  } catch (error) {
    console.warn("Supabase load failed", error.message);
  } finally {
    isApplyingCloudState = false;
    isCloudCheckRunning = false;
  }
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
  const changedKeys = [];
  getBackupStorageKeys().forEach((key) => {
    const value = snapshot.storage[key];
    if (localStorage.getItem(key) === value) return;
    saveStorageValue(key, value);
    changedKeys.push(key);
  });
  changedKeys.forEach((key) => dirtyCloudKeys.add(key));
  savePendingCloudKeys();
  Promise.all(changedKeys.map(syncStorageKeyToCloud));
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
  if (registryHistoryDataLabel) {
    registryHistoryDataLabel.textContent = activeRegistry === "location" ? "Historique Location" : "Historique Transaction";
  }
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
  savedBackupsPanel.hidden = true;
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
      ownerFirstName: "",
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
    ownerFirstName: "",
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
  const status = set.status === "out" ? "out" : "available";
  const reservations = Array.isArray(set.reservations) ? set.reservations.filter(isActiveReservation) : [];
  const migratedReservationId = `reservation-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const migratedReservation =
    set.status === "reserved" && (set.holder || set.holderCompany || set.holderPhone)
      ? [
          {
            id: migratedReservationId,
            person: set.holder || "",
            company: set.holderCompany || "",
            phone: set.holderPhone || "",
            createdAt: "",
            reservationDate: "",
            note: "",
          },
        ]
      : [];

  return repairSetMovementState({
    id: option.id,
    label: option.label,
    photo: set.photo || "",
    holder: set.holder || "",
    holderCompany: set.holderCompany || "",
    holderPhone: set.holderPhone || "",
    holderReservationId: set.holderReservationId || "",
    needsCheckIn: Boolean(set.needsCheckIn),
    needsCheckInReason: set.needsCheckInReason || (set.needsCheckIn ? "added" : ""),
    status,
    reservations: reservations.length ? reservations : migratedReservation,
    history: Array.isArray(set.history)
      ? set.history.map((entry) => ({
          ...entry,
          id: entry.id || createHistoryId(),
          reservationId:
            migratedReservation.length && entry.type === "reserved" && !entry.reservationId
              ? migratedReservationId
              : entry.reservationId,
        }))
      : [],
  });
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
            status: key.status === "out" ? "out" : "available",
            reservations:
              key.status === "reserved" && key.holder
                ? [
                    {
                      id: `reservation-${Date.now()}-${Math.random().toString(16).slice(2)}`,
                      person: key.holder,
                      company: "",
                      phone: "",
                      createdAt: "",
                      reservationDate: "",
                      note: "",
                    },
                  ]
                : [],
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
    property: formatPropertyAddress(key.property || ""),
    postalCode: key.postalCode || "",
    city: key.city || "",
    owner: key.owner || "",
    ownerFirstName: formatFirstName(key.ownerFirstName || ""),
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
    scheduleStorageKeySync(getRegistryConfig().keysStorageKey);
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
  try {
    markLocalEdit();
    localStorage.setItem(getRegistryConfig().archivesStorageKey, JSON.stringify(archives));
    scheduleStorageKeySync(getRegistryConfig().archivesStorageKey);
  } catch (error) {
    alert("La sauvegarde a échoué. Une photo ou une signature est probablement trop lourde.");
    throw error;
  }
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
  const digits = String(value || "").replace(/\D/g, "").slice(0, 10);
  if (!digits) return "";
  return digits.match(/.{1,2}/g).join(" ");
}

function getPhoneDigitCount(value) {
  return String(value || "").replace(/\D/g, "").length;
}

function ensureCompletePhoneNumber(input, label = "num\u00e9ro de t\u00e9l\u00e9phone") {
  const digitCount = getPhoneDigitCount(input.value);
  if (!digitCount || digitCount === 10) return true;

  alert(`Le ${label} semble incomplet : il faut 10 chiffres.`);
  input.focus();
  return false;
}

function formatCity(value) {
  return String(value || "").replace(/(^|[\s-])(\p{L})/gu, (match, separator, letter) => {
    return `${separator}${letter.toLocaleUpperCase("fr-FR")}`;
  });
}

function formatPropertyAddress(value) {
  const roadTypes = [
    ["avenues?", "av."],
    ["boulevards?", "blv."],
    ["places?", "pl."],
    ["routes?", "rte"],
    ["allées?|allees?", "all."],
    ["chemins?", "ch."],
    ["impasses?", "imp."],
    ["passages?", "pas."],
    ["esplanades?", "esp."],
  ];
  let address = String(value || "").toLocaleLowerCase("fr-FR");
  roadTypes.forEach(([roadType, abbreviation]) => {
    address = address.replace(
      new RegExp(`(^|[^\\p{L}])(?:${roadType})(?=$|[^\\p{L}])`, "giu"),
      (match, prefix) => `${prefix}${abbreviation}`,
    );
  });
  return address.replace(/(^|[\s'\-’])(\p{L})/gu, (match, separator, letter) => {
    return `${separator}${letter.toLocaleUpperCase("fr-FR")}`;
  });
}

async function migrateStoredPropertyAddresses() {
  const changedStorageKeys = [];

  ["location", "transaction"].forEach((registry) => {
    const config = registryConfig[registry];
    const savedKeys = parseStoredArray(config.keysStorageKey, []);
    const formattedKeys = savedKeys.map((key) => ({
      ...key,
      property: formatPropertyAddress(key.property || ""),
    }));
    if (JSON.stringify(formattedKeys) !== JSON.stringify(savedKeys)) {
      localStorage.setItem(config.keysStorageKey, JSON.stringify(formattedKeys));
      changedStorageKeys.push(config.keysStorageKey);
    }

    const savedArchives = parseStoredArray(config.archivesStorageKey, []);
    const formattedArchives = savedArchives.map((record) => ({
      ...record,
      key: record.key
        ? { ...record.key, property: formatPropertyAddress(record.key.property || "") }
        : record.key,
    }));
    if (JSON.stringify(formattedArchives) !== JSON.stringify(savedArchives)) {
      localStorage.setItem(config.archivesStorageKey, JSON.stringify(formattedArchives));
      changedStorageKeys.push(config.archivesStorageKey);
    }
  });

  if (!changedStorageKeys.length) return;
  markLocalEdit();
  await Promise.all(changedStorageKeys.map(syncStorageKeyToCloud));
  keys = loadKeys();
  archives = loadArchives();
}

function formatFirstName(value) {
  return String(value || "")
    .toLocaleLowerCase("fr-FR")
    .replace(/(^|[\s-])(\p{L})/gu, (match, separator, letter) => `${separator}${letter.toLocaleUpperCase("fr-FR")}`);
}

function formatCompanyName(value) {
  return String(value || "").replace(/(^|[\s-])(\p{L})/gu, (match, separator, letter) => {
    return `${separator}${letter.toLocaleUpperCase("fr-FR")}`;
  });
}

function formatSentenceStart(value) {
  return String(value || "").replace(/^(\s*)(\p{L})/u, (match, spaces, letter) => {
    return `${spaces}${letter.toLocaleUpperCase("fr-FR")}`;
  });
}

function formatLastName(value) {
  return String(value || "").toLocaleUpperCase("fr-FR");
}

function getMovementPersonInputName() {
  return [formatFirstName(movementPersonInput.value).trim(), formatLastName(movementNameInput.value).trim()].filter(Boolean).join(" ");
}

function getTypedMovementActor() {
  return {
    person: getMovementPersonInputName(),
    company: formatCompanyName(movementCompanyInput.value).trim(),
    phone: formatPhoneNumber(movementPhoneInput.value),
  };
}

function ensureMovementActor(actionLabel, fallbackActor = {}) {
  const typedActor = getTypedMovementActor();
  const hasSelectedContact = Boolean(contactSelect.value);
  const hasActor =
    hasSelectedContact ||
    Boolean(typedActor.person || typedActor.company || fallbackActor.person || fallbackActor.company);

  if (hasActor) return true;

  alert(`Renseigne ou choisis un intervenant avant de cliquer sur ${actionLabel}.`);
  movementNameInput.focus();
  return false;
}

function getContactDisplayName(contact) {
  if (contact.type === "external") {
    return [contact.firstName, formatLastName(contact.name), contact.companyName].filter(Boolean).join(" ");
  }

  return [contact.firstName, formatLastName(contact.name)].filter(Boolean).join(" ");
}

function getContactHistoryName(contact) {
  if (contact.type === "external") {
    return [contact.companyName, contact.firstName || formatLastName(contact.name)].filter(Boolean).join(" - ") || "Intervenant externe";
  }

  return contact.firstName || formatLastName(contact.name) || "Intervenant interne";
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

function getDefaultInternalContactActor() {
  const contact = contacts.find((savedContact) => savedContact.type === "internal");
  if (!contact) return { person: "", phone: "" };

  return {
    person: getContactDisplayName(contact),
    phone: formatPhoneNumber(contact.phone),
  };
}

function getHistoryPersonName(entry) {
  let person = entry.person || entry.company || "Intervenant non pr\u00e9cis\u00e9";
  const company = String(entry.company || "").trim();
  if (company && person.startsWith(`${company} - `)) {
    person = person.slice(company.length + 3).trim();
  }

  return [person, entry.phone ? formatPhoneNumber(entry.phone) : ""].filter(Boolean).join(" - ");
}

function formatReservationHistoryDate(value) {
  const text = String(value || "").trim();
  const match = text.match(/^(\d{1,2}\/\d{1,2}\/\d{2,4})\s+(\d{1,2}:\d{2})$/);
  if (!match) return text;
  return `${match[1]} \u00e0 ${match[2]}`;
}

function isReturnMovement(entry, history = []) {
  if (entry?.type !== "in") return false;
  if (entry.returnReason === "returned") return true;
  if (entry.returnReason === "created") return false;
  if (/^Rentr\u00e9e?/.test(String(entry.reservationMovement || ""))) return true;

  const movements = [...history]
    .filter((item) => item.type === "out" || item.type === "in")
    .sort((first, second) => parseHistoryTimestamp(second.date) - parseHistoryTimestamp(first.date));
  const entryIndex = movements.findIndex((item) => item.id === entry.id);
  if (entryIndex < 0) return false;

  return movements.slice(entryIndex + 1).find((item) => item.type === "out" || item.type === "in")?.type === "out";
}

function getMovementActionLabel(entry, history = []) {
  if (entry?.type === "out") return "Sorti";
  if (entry?.type === "reserved") return "R\u00e9serv\u00e9";
  if (entry?.type === "cancel-reservation") return "Annulation";
  if (entry?.type === "removed") return "Archiv\u00e9";
  if (entry?.type === "rented") return entry.actionLabel || getRegistryConfig().archiveActionLabel;
  if (entry?.type === "in") return isReturnMovement(entry, history) ? "Rentr\u00e9" : "Entr\u00e9";
  return "Entr\u00e9";
}

function normalizeMovementWords(value) {
  return String(value || "")
    .replace(/\bRentr\u00e9e\b/g, "Rentr\u00e9")
    .replace(/\bEntr\u00e9e\b/g, "Entr\u00e9")
    .replace(/\bSortie\b/g, "Sorti");
}

function sortKeyHistoryEntries(first, second) {
  return parseHistoryTimestamp(second.date) - parseHistoryTimestamp(first.date);
}

function getReservationPersonName(reservation) {
  return [reservation.company, reservation.person].filter(Boolean).join(" - ") || "intervenant non renseign\u00e9";
}

function showCheckoutReservationWarning(set, ignoredReservationId = "") {
  const nextReservation = [...(set.reservations || [])]
    .filter(isActiveReservation)
    .filter((reservation) => reservation.id !== ignoredReservationId)
    .sort((first, second) => parseHistoryTimestamp(first.reservationDate || first.createdAt) - parseHistoryTimestamp(second.reservationDate || second.createdAt))[0];
  if (!nextReservation) return;

  alert(
    `ATTENTION ! Ce jeu de cl\u00e9s est r\u00e9serv\u00e9 par ${getReservationPersonName(nextReservation)} le ${formatReservationHistoryDate(nextReservation.reservationDate || nextReservation.createdAt)} ; pense bien \u00e0 le remettre sur le tableau avant !`,
  );
}

function normalizeContact(contact) {
  const type = contact.type === "external" ? "external" : "internal";

  return {
    id: contact.id || createContactId(),
    firstName: formatFirstName(contact.firstName).trim(),
    name: type === "external" && !contact.companyName ? "" : formatLastName(contact.name).trim(),
    companyName: type === "external" ? formatCompanyName(contact.companyName || contact.name).trim() : "",
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
  scheduleStorageKeySync(sharedContactsStorageKey);
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
  return (owner || "").toLocaleUpperCase("fr-FR");
}

function getStatus(key) {
  if (key.archived) return "archived";
  if (key.sets.some((set) => set.status === "out")) return "out";
  return key.sets.some(hasActiveReservations) ? "reserved" : "available";
}

function isKeyFilled(key) {
  return Boolean(
    key.property?.trim() ||
      key.postalCode?.trim() ||
      key.city?.trim() ||
      key.owner?.trim() ||
      key.ownerFirstName?.trim() ||
      key.notes?.trim() ||
      key.sets?.some((set) => set.photo || set.holder?.trim() || set.history?.length || hasActiveReservations(set)),
  );
}

function hasProtectedKeyInfo(key) {
  return Boolean(
    key?.owner?.trim() ||
      key?.ownerFirstName?.trim() ||
      key?.property?.trim() ||
      key?.postalCode?.trim() ||
      key?.city?.trim() ||
      key?.notes?.trim(),
  );
}

function resetKeyInfoEditUnlock(key) {
  isKeyInfoEditUnlocked = key ? !hasProtectedKeyInfo(key) : false;
}

function unlockKeyInfoEdit(event) {
  const key = getSelectedKey();
  const isArchiveView = Boolean(selectedArchiveRecord);
  if (!key || isArchiveView || isKeyInfoEditUnlocked || !hasProtectedKeyInfo(key)) return;

  const ownerName = key.owner ? formatOwner(key.owner) : "PROPRI\u00c9TAIRE NON RENSEIGN\u00c9";
  const confirmed = confirm(
    `Souhaitez-vous apporter des modifications sur la fiche de cl\u00e9 du bien de monsieur et/ou madame "${ownerName}" ?`,
  );
  if (!confirmed) return;

  isKeyInfoEditUnlocked = true;
  render();
  event?.currentTarget?.focus?.();
}

function hasActiveReservations(set) {
  return Array.isArray(set?.reservations) && set.reservations.some(isActiveReservation);
}

function isActiveReservation(reservation) {
  return Boolean(
    reservation &&
      (String(reservation.reservationDate || "").trim() ||
        String(reservation.createdAt || "").trim() ||
        String(reservation.note || "").trim()),
  );
}

function getSetDisplayStatus(set) {
  if (set.status === "out") return "out";
  return hasActiveReservations(set) ? "reserved" : "available";
}

function getTileStatus(key) {
  if (key.archived) return "archived";
  if (key.sets.some((set) => set.status === "out")) return "out";
  if (key.sets.some(hasActiveReservations)) return "reserved";
  return isKeyFilled(key) ? "available" : "empty";
}

function getCountableSets(key) {
  if (key.archived || !isKeyFilled(key)) return [];
  return key.sets || [];
}

function keyHasSetStatus(key, filter) {
  if (filter === "all") return true;
  return getCountableSets(key).some((set) => getSetDisplayStatus(set) === filter);
}

function getKeyStatusCounts() {
  return keys.reduce(
    (counts, key) => {
      getCountableSets(key).forEach((set) => {
        const status = getSetDisplayStatus(set);
        counts.all += 1;
        if (status === "available") counts.available += 1;
        if (status === "reserved") counts.reserved += 1;
        if (status === "out") counts.out += 1;
      });
      return counts;
    },
    { all: 0, available: 0, reserved: 0, out: 0 },
  );
}

function getCompromiseMovementStatus(record) {
  const sets = record?.key?.sets || [];
  if (sets.some((set) => set.status === "out")) return "out";
  if (sets.some(hasActiveReservations)) return "reserved";
  return "";
}

function statusText(key) {
  if (key.archived) return "Archivée";
  const outCount = key.sets.filter((set) => set.status === "out").length;
  const reservedCount = key.sets.filter(hasActiveReservations).length;
  if (outCount) return key.sets.length === 1 ? "Sorti" : `${outCount} jeu${outCount > 1 ? "x" : ""} sorti${outCount > 1 ? "s" : ""}`;
  if (reservedCount) return key.sets.length === 1 ? "Réservé" : `${reservedCount} jeu${reservedCount > 1 ? "x" : ""} réservé${reservedCount > 1 ? "s" : ""}`;
  return "Disponible";
}

function cloneKeyContent(key) {
  return {
    property: key.property || "",
    postalCode: key.postalCode || "",
    city: key.city || "",
    owner: key.owner || "",
    ownerFirstName: key.ownerFirstName || "",
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
    ownerFirstName: content.ownerFirstName || "",
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
  resetKeyInfoEditUnlock(keys.find((key) => key.id === targetId));
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
  logActivity("Suppression", `${keyLabel(key)}${key.owner ? ` - ${formatOwner(key.owner)}` : ""}`, [key.owner, key.property].filter(Boolean).join(" - "));
  saveKeys();
  render();
}

function render() {
  renderGrid();
  renderPanel();
  renderContactSelect();
  renderArchivesPanel();
  renderCompromisesPanel();
  requestAnimationFrame(syncSignatureHeightToActions);
}

function syncSignatureHeightToActions() {
  if (form.hidden) return;
  const movementActions = form.querySelector(".movement-actions");
  if (!movementActions || !rentedBtn) return;

  const movementRect = movementActions.getBoundingClientRect();
  const rentedRect = rentedBtn.getBoundingClientRect();
  const actionsHeight = Math.round(rentedRect.bottom - movementRect.top);
  if (actionsHeight > 0) form.style.setProperty("--signature-actions-height", `${actionsHeight}px`);
}

function isDetailPanelBusy() {
  return isPhotoImporting || Boolean(document.querySelector(".date-dialog[open]")) || form.contains(document.activeElement);
}

function isKeyPanelOpen() {
  return Boolean((selectedId || selectedArchiveRecord) && !detailPanel.hidden && !form.hidden);
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

function isProtectedKeyInfoInputActive() {
  return protectedKeyInfoInputs.includes(document.activeElement);
}

function getKeyInfoDraftChanges() {
  return {
    property: formatPropertyAddress(propertyInput.value),
    postalCode: postalCodeInput.value,
    city: formatCity(cityInput.value),
    owner: formatOwner(ownerInput.value),
    ownerFirstName: formatFirstName(ownerFirstNameInput.value),
    notes: notesInput.value,
  };
}

function updateSelectedKeyInfoFromDraft() {
  updateSelectedKey(getKeyInfoDraftChanges());
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
          getContactHistoryName(contact),
          contactTypeText(contact.type),
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
  contactNameLabel.firstChild.textContent = "Nom de l'intervenant\n            ";
  contactNameInput.placeholder = "Nom de l'intervenant";
  contactFirstNameLabel.hidden = false;
  contactFirstNameLabel.firstChild.textContent = "Pr\u00e9nom de l'intervenant\n            ";
  contactNameLabel.firstChild.textContent = "Nom de l'intervenant\n            ";
  contactFirstNameInput.placeholder = "Pr\u00e9nom de l'intervenant";
  contactNameInput.placeholder = "Nom de l'intervenant";
  addContactBtn.textContent = editingContactId ? "Enregistrer" : "Ajouter";
}

function updatePreviousContactFormMode() {
  const isExternal = activeContactType === "external";
  contactFirstNameLabel.hidden = false;
  contactFirstNameLabel.firstChild.textContent = "Prénom de l'intervenant\n            ";
  contactNameLabel.firstChild.textContent = "Nom de l'intervenant\n            ";
  contactFirstNameInput.placeholder = "Prénom de l'intervenant";
  contactNameInput.placeholder = "Nom de l'intervenant";
  addContactBtn.textContent = editingContactId ? "Enregistrer" : "Ajouter";
}

function updateContactFormMode() {
  const isExternal = activeContactType === "external";
  contactFirstNameLabel.hidden = false;
  contactFirstNameLabel.firstChild.textContent = "Pr\u00e9nom de l'intervenant\n            ";
  contactNameLabel.firstChild.textContent = "Nom de l'intervenant\n            ";
  contactCompanyLabel.hidden = !isExternal;
  contactFirstNameInput.placeholder = "Pr\u00e9nom de l'intervenant";
  contactNameInput.placeholder = "Nom de l'intervenant";
  contactCompanyInput.placeholder = "Nom de la soci\u00e9t\u00e9 de l'intervenant";
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
  if (reason === "removed") return "Archivé";
  if (reason === "authenticated") return "Acte authentique";
  return "";
}

function csvEscape(value) {
  const text = String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
}

function htmlEscape(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function utf8ToBase64(value) {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function keyToCsvRows(key, archive = null) {
  const rows = [];
  const base = {
    emplacement: keyLabel(key),
    adresse: key.property || "",
    codePostal: key.postalCode || "",
    ville: key.city || "",
    proprietaire: key.owner || "",
    prenomProprietaire: key.ownerFirstName || "",
    notes: key.notes || "",
    archive: archive ? archiveReasonText(archive.reason) : "",
    dateArchive: archive ? formatArchiveDate(archive.archivedAt) : "",
  };

  key.sets.forEach((set) => {
    if (!set.history.length) {
      rows.push({
        ...base,
        jeu: set.label,
        statutJeu: set.status === "out" ? "Sorti" : set.status === "reserved" ? "Réservé" : "Disponible",
        mouvement: "",
        intervenant: set.holder || "",
        telephone: "",
        commentaire: "",
        dateMouvement: "",
        signe: "Non",
        signatureManuscrite: "",
      });
      return;
    }

    set.history.forEach((entry) => {
      rows.push({
        ...base,
        jeu: set.label,
        statutJeu: set.status === "out" ? "Sorti" : set.status === "reserved" ? "Réservé" : "Disponible",
        mouvement: getMovementActionLabel(entry, set.history),
        intervenant: entry.person || "",
        telephone: entry.phone || "",
        commentaire: entry.note || "",
        dateMouvement: entry.date || "",
        signe: entry.signature ? "Oui" : "Non",
        signatureManuscrite: entry.signature || "",
      });
    });
  });

  return rows;
}

function exportKeyExcel(key, archive = null) {
  const headers = [
    "Emplacement",
    "Adresse",
    "Code postal",
    "Ville",
    "Nom du propriétaire / de la société",
    "Prénom du propriétaire",
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
    "Signé",
    "Signature manuscrite",
  ];
  const rows = keyToCsvRows(key, archive);
  const imageParts = [];
  const tableRows = rows.map((row, rowIndex) => {
    const values = [
    row.emplacement,
    row.adresse,
    row.codePostal,
    row.ville,
    row.proprietaire,
    row.prenomProprietaire,
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
    row.signe,
    ];
    let signatureCell = "";
    const signatureMatch = row.signatureManuscrite.match(/^data:(image\/[a-z0-9.+-]+);base64,(.+)$/i);
    if (signatureMatch) {
      const extension = signatureMatch[1].includes("jpeg") ? "jpg" : signatureMatch[1].split("/")[1].replace("+xml", "");
      const location = `signature-${rowIndex + 1}.${extension}`;
      signatureCell = `<img src="${location}" width="240" height="105" alt="Signature manuscrite">`;
      imageParts.push({ mime: signatureMatch[1], location, data: signatureMatch[2] });
    }
    return `<tr>${values.map((value) => `<td>${htmlEscape(value)}</td>`).join("")}<td>${signatureCell}</td></tr>`;
  });
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>table{border-collapse:collapse;font-family:Arial,sans-serif;font-size:11pt}th,td{border:1px solid #999;padding:5px;vertical-align:middle}th{background:#ddd;font-weight:bold}td:last-child{width:250px;height:115px}</style></head><body><table><thead><tr>${headers.map((header) => `<th>${htmlEscape(header)}</th>`).join("")}</tr></thead><tbody>${tableRows.join("")}</tbody></table></body></html>`;
  const boundary = `----cles-export-${Date.now()}`;
  const parts = [
    `MIME-Version: 1.0\r\nContent-Type: multipart/related; boundary="${boundary}"\r\n\r\n`,
    `--${boundary}\r\nContent-Type: text/html; charset="utf-8"\r\nContent-Transfer-Encoding: base64\r\nContent-Location: fiche.html\r\n\r\n${utf8ToBase64(html)}\r\n`,
    ...imageParts.map((image) => `--${boundary}\r\nContent-Type: ${image.mime}\r\nContent-Transfer-Encoding: base64\r\nContent-Location: ${image.location}\r\n\r\n${image.data}\r\n`),
    `--${boundary}--\r\n`,
  ];
  const blob = new Blob(parts, { type: "application/vnd.ms-excel" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const archiveSuffix = archive ? `-${archive.reason}` : "";
  link.href = url;
  link.download = `${key.id}${archiveSuffix}-export.xls`;
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
    "Nom du propriétaire / de la société",
    "Prénom du propriétaire",
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
      key.ownerFirstName || "",
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
  const tableRows = rows
    .map((row) => `<tr>${row.map((value) => `<td>${htmlEscape(value)}</td>`).join("")}</tr>`)
    .join("");
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>table{border-collapse:collapse;font-family:Arial,sans-serif;font-size:11pt}th,td{border:1px solid #999;padding:5px;vertical-align:top}th{background:#ddd;font-weight:bold}td{mso-number-format:"\\@";}</style></head><body><table><thead><tr>${headers.map((header) => `<th>${htmlEscape(header)}</th>`).join("")}</tr></thead><tbody>${tableRows}</tbody></table></body></html>`;
  const blob = new Blob([`\uFEFF${html}`], { type: "application/vnd.ms-excel;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const stamp = new Date().toISOString().slice(0, 10);
  link.href = url;
  link.download = `donnees-renseignees-${activeRegistry}-${stamp}.xls`;
  link.click();
  URL.revokeObjectURL(url);
}

function createDataBackupPayload() {
  const data = {};
  getBackupStorageKeys().forEach((key) => {
    data[key] = localStorage.getItem(key);
  });

  return {
    app: "century21-les-minimes-cles",
    version: 1,
    exportedAt: new Date().toISOString(),
    data,
  };
}

function downloadBackupPayload(payload, prefix = "sauvegarde-cles") {
  const stamp = new Date().toISOString().slice(0, 10);
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${prefix}-${stamp}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function exportAllDataBackup() {
  downloadBackupPayload(createDataBackupPayload());
}

function getLocalDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getAutomaticBackupKey(date = new Date()) {
  return `${automaticBackupKeyPrefix}${getLocalDateKey(date)}`;
}

function isAutomaticBackupRow(row) {
  return String(row?.key || "").startsWith(automaticBackupKeyPrefix);
}

async function loadSavedBackupRows(limit = 4) {
  if (!supabaseClient) return [];
  const { data, error } = await supabaseClient
    .from("app_state")
    .select("key,value,updated_at")
    .like("key", `${automaticBackupKeyPrefix}%`)
    .order("key", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return Array.isArray(data) ? data.filter(isAutomaticBackupRow) : [];
}

async function pruneOldAutomaticBackups() {
  if (!supabaseClient) return;
  const { data, error } = await supabaseClient
    .from("app_state")
    .select("key")
    .like("key", `${automaticBackupKeyPrefix}%`)
    .order("key", { ascending: false });
  if (error || !Array.isArray(data)) return;

  const oldKeys = data.filter(isAutomaticBackupRow).slice(4).map((row) => row.key);
  await Promise.all(oldKeys.map((key) => supabaseClient.from("app_state").delete().eq("key", key)));
}

async function createAutomaticBackup({ force = false } = {}) {
  if (!supabaseClient) return false;
  await pendingCloudSync.catch(() => {});
  await syncCurrentRegistryToCloud();

  const backupKey = getAutomaticBackupKey();
  if (!force) {
    const { data: existingBackup } = await supabaseClient
      .from("app_state")
      .select("key")
      .eq("key", backupKey)
      .maybeSingle();
    if (existingBackup) return false;
  }

  const payload = createDataBackupPayload();
  const updatedAt = new Date().toISOString();
  const { error } = await supabaseClient.from("app_state").upsert({
    key: backupKey,
    value: payload,
    updated_at: updatedAt,
  });
  if (error) throw error;
  await pruneOldAutomaticBackups();
  return true;
}

function getNextAutomaticBackupDelay() {
  const now = new Date();
  const target = new Date(now);
  target.setHours(23, 59, 0, 0);
  if (target <= now) target.setDate(target.getDate() + 1);
  return target.getTime() - now.getTime();
}

function scheduleAutomaticBackup() {
  window.setTimeout(async () => {
    try {
      await createAutomaticBackup();
      if (!savedBackupsPanel.hidden) renderSavedBackupsPanel();
    } catch (error) {
      console.warn("Automatic backup failed", error.message);
    } finally {
      scheduleAutomaticBackup();
    }
  }, getNextAutomaticBackupDelay());
}

async function ensureTodaysAutomaticBackupIfLate() {
  const now = new Date();
  if (now.getHours() < 23 || (now.getHours() === 23 && now.getMinutes() < 59)) return;
  try {
    await createAutomaticBackup();
  } catch (error) {
    console.warn("Automatic backup catch-up failed", error.message);
  }
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
    savedBackupsPanel.hidden = true;
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
        const isReservationMovement = movement.type === "reserved";
        const movementDetails = isReservationMovement
          ? [
              movement.person ? `Intervenant : ${movement.person}` : "",
              movement.phone ? `T\u00e9l\u00e9phone : ${movement.phone}` : "",
              movement.company ? `Soci\u00e9t\u00e9 : ${movement.company}` : "",
              movement.reservationDate ? `Pour le ${formatReservationHistoryDate(movement.reservationDate)}` : "",
              movement.note || "",
            ]
          : [movement.note || ""];
        entries.push({
          keyId: key.id,
          setId: set.id,
          timestamp: parseHistoryTimestamp(movement.date),
          date: movement.date || "Date non renseignée",
          title: `${keyLabel(key)} - ${registryLabel}${key.owner ? ` - ${formatOwner(key.owner)}` : ""} - ${set.label}`,
          action: getMovementActionLabel(movement, set.history),
          actor: movement.person || "Intervenant non renseigné",
          actorPhone: movement.phone || "",
          details: movementDetails.filter(Boolean).join(" | "),
          device: "",
          registry,
        });
      });
    });
  });

  registryArchives.forEach((record) => {
    const key = record.key;
    const archiveSet = key.sets?.find((set) => set.history?.some((entry) => entry.type === "rented")) || key.sets?.[0] || {};
    const archiveMovement = [...(archiveSet.history || [])].find((entry) => entry.type === "rented");
    const latestMovement = archiveMovement || getLatestMovementEntry(archiveSet.history || []);
    const usesMovementActor = record.reason === "rented" || record.reason === "authenticated";
    const defaultInternalActor = usesMovementActor ? getDefaultInternalContactActor() : { person: "", phone: "" };
    const archiveActor = latestMovement?.person || defaultInternalActor.person;
    const archiveActorPhone = latestMovement?.phone || defaultInternalActor.phone;
    const action =
      record.reason === "authenticated"
        ? "Acte authentique"
        : record.reason === "removed"
          ? "Archivé"
          : registry === "transaction"
            ? "Compromis"
            : "Loué";
    entries.push({
      keyId: key.id,
      setId: key.sets?.[0]?.id || "main",
      archiveId: record.id,
      timestamp: parseHistoryTimestamp(record.archivedAt),
      date: formatArchiveDate(record.archivedAt),
      title: `${keyLabel(key)} - ${registryLabel}${key.owner ? ` - ${formatOwner(key.owner)}` : ""}`,
      action,
      actor: usesMovementActor && archiveActor ? archiveActor : key.owner ? formatOwner(key.owner) : "Fiche clé",
      actorPhone: usesMovementActor ? archiveActorPhone || "" : "",
      details: usesMovementActor ? "" : [key.property || "", [key.postalCode, key.city].filter(Boolean).join(" ")].filter(Boolean).join(" - "),
      device: "",
      registry,
    });
  });

  return entries;
}

function getActionClass(action) {
  const readableAction = String(action || "")
    .toLocaleLowerCase("fr-FR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  if (readableAction.includes("entr") || readableAction.includes("rentr") || readableAction.includes("creation") || readableAction.includes("restauration")) return "in";
  if (readableAction.includes("sorti") || readableAction.includes("sortie")) return "out";
  if (readableAction.includes("reserv")) return "reserved";
  if (readableAction.includes("compromis") || readableAction.includes("loue") || readableAction.includes("acte authentique")) return "signed";
  if (readableAction.includes("retir") || readableAction.includes("archiv") || readableAction.includes("suppression")) return "removed";
  if (/\b(?:entr\u00e9e?|rentr\u00e9e?)\b/i.test(String(action || ""))) return "in";
  if (/\b(?:sortie|sorti)\b/i.test(String(action || ""))) return "out";
  if (/r\u00e9serv/i.test(String(action || ""))) return "reserved";
  const normalized = String(action || "").toLowerCase();
  if (normalized.includes("entrée") || normalized.includes("création") || normalized.includes("restauration")) return "in";
  if (normalized.includes("sortie")) return "out";
  if (normalized.includes("rÃ©serv") || normalized.includes("réserv")) return "reserved";
  if (normalized.includes("compromis") || normalized.includes("loué") || normalized.includes("acte authentique")) return "signed";
  if (normalized.includes("retiré") || normalized.includes("archiv") || normalized.includes("suppression")) return "removed";
  return "neutral";
}

function getGlobalHistoryEntryId(entry) {
  const activityId = entry.activityId || (entry.source === "activity" ? entry.id : "");
  if (activityId) return `activity:${activityId}`;

  return `registry:${JSON.stringify([
    entry.registry || "",
    entry.action || "",
    entry.title || "",
    entry.date || "",
    entry.actor || "",
    entry.details || "",
  ])}`;
}

function getKeyIdFromHistoryTitle(title) {
  const match = String(title || "").match(/^(T[1-3]|T4\+|Maison|Autre)\s+#(\d+)/);
  if (!match) return "";
  return `${match[1]}-${Number(match[2])}`;
}

function activateRegistry(registry) {
  if (!registryConfig[registry]) return;
  if (activeRegistry === registry) return;
  activeRegistry = registry;
  saveActiveRegistry();
  keys = loadKeys();
  archives = loadArchives();
  contacts = loadContacts();
  updateRegistryHeader();
}

function openHistoryKey(entryData) {
  const registry = entryData.registry || activeRegistry;
  const keyId = entryData.keyId || "";
  const setId = entryData.setId || "main";
  if (!keyId) {
    alert("Impossible de retrouver la fiche correspondant \u00e0 cette ligne d'historique.");
    return;
  }

  activateRegistry(registry);
  globalHistoryPanel.hidden = true;
  contactsPanel.hidden = true;
  archivesPanel.hidden = true;
  compromisesPanel.hidden = true;
  savedBackupsPanel.hidden = true;
  clearTimeout(detailCloseTimer);
  clearTimeout(contactsCloseTimer);
  clearTimeout(archivesCloseTimer);

  if (entryData.archiveId) {
    const archiveRecord = archives.find((record) => record.id === entryData.archiveId);
    if (archiveRecord) {
      openArchivedKeyRecord(archiveRecord);
      selectedSetId = setId;
      render();
      return;
    }
  }

  const key = keys.find((savedKey) => savedKey.id === keyId);
  if (!key || !isKeyFilled(key)) {
    alert("Cette fiche n'est plus disponible sur le tableau. Elle a peut-\u00eatre \u00e9t\u00e9 supprim\u00e9e ou remplac\u00e9e.");
    return;
  }

  selectedArchiveRecord = null;
  selectedId = key.id;
  selectedSetId = key.sets.some((set) => set.id === setId) ? setId : key.sets[0]?.id || "main";
  resetKeyInfoEditUnlock(key);
  render();
}

function deleteGlobalHistoryEntry(historyId) {
  if (!historyId) return;
  if (!confirm("Supprimer cette ligne de l'historique ?")) return;

  const hiddenIds = loadHiddenGlobalHistoryIds();
  hiddenIds.add(historyId);
  saveHiddenGlobalHistoryIds(hiddenIds);

  if (historyId.startsWith("activity:")) {
    const activityId = historyId.slice("activity:".length);
    saveActivityLog(loadActivityLog().filter((entry) => entry.id !== activityId));
  }

  renderGlobalHistoryPanel(currentGlobalHistoryFilter);
}

function renderGlobalHistoryItems(targetList = globalHistoryList, registryFilter = "") {
  const activeKeyMaps = Object.fromEntries(
    ["location", "transaction"].map((registry) => {
      const config = registryConfig[registry];
      const registryKeys = parseStoredArray(config.keysStorageKey, makeInitialKeys()).map(normalizeKey);
      return [
        registry,
        new Map(registryKeys.map((key) => [keyLabel(key), key])),
      ];
    }),
  );
  const ownerMaps = Object.fromEntries(
    ["location", "transaction"].map((registry) => {
      const config = registryConfig[registry];
      const registryKeys = parseStoredArray(config.keysStorageKey, makeInitialKeys()).map(normalizeKey);
      const archivedKeys = parseStoredArray(config.archivesStorageKey, []).map(normalizeArchive).map((record) => record.key);
      return [
        registry,
        new Map(
          [...archivedKeys, ...registryKeys]
            .filter((key) => key.owner)
            .map((key) => [keyLabel(key), formatOwner(key.owner)]),
        ),
      ];
    }),
  );
  const isActiveSlotFilled = (entry, keyLabelEntry) => {
    const key = (activeKeyMaps[entry.registry] || new Map()).get(keyLabelEntry);
    return Boolean(key && isKeyFilled(key));
  };
  const getActivitySetLabel = (entry) => {
    const action = String(entry.action || "").toLocaleLowerCase("fr-FR");
    if (!action.includes("ajout jeu") && !action.includes("cr\u00e9ation jeu")) return "";

    const match = String(entry.details || "").match(/(\d+)\s+jeux?\s+au total/i);
    return match ? `Jeu ${match[1]}` : "";
  };
  const isSetCountDetail = (value) => /^\d+\s+jeux?\s+au total$/i.test(String(value || "").trim());
  const getActivityRegistryLabel = (entry) => (entry.registry === "transaction" ? "Transaction" : "Location");
  const getTitleKeyLabel = (title) => String(title || "").match(/^(T[1-3]|T4\+|Maison|Autre)\s+#\d+/)?.[0] || "";
  const titleHasOwner = (title) => {
    const parts = String(title || "").split(" - ").map((part) => part.trim()).filter(Boolean);
    return Boolean(getTitleKeyLabel(parts[0]) && parts[2] && !/^jeu\s+\d+$/i.test(parts[2]));
  };
  const getHistoryTitleOwner = (title) => {
    const parts = String(title || "").split(" - ").map((part) => part.trim()).filter(Boolean);
    return titleHasOwner(title) ? parts[2] || "" : "";
  };
  const getHistoryPhone = (value) => String(value || "").match(/\b\d{2}(?:\s\d{2}){4}\b/)?.[0] || "";
  const getActivityOwnerFromDetails = (entry) => {
    const owner = String(entry.details || "").split(" - ")[0]?.trim();
    return owner && !isSetCountDetail(owner) ? formatOwner(owner) : "";
  };
  const getHistorySubjectOwner = (entry) => {
    const parts = String(entry.title || "").split(" - ").map((part) => part.trim()).filter(Boolean);
    if (getTitleKeyLabel(parts[0]) && parts[2] && !/^jeu\s+\d+$/i.test(parts[2])) return parts[2];
    if ((parts[0] === "Location" || parts[0] === "Transaction") && parts[1]) return parts[1];

    const ownerMatch = String(entry.details || "").match(/Propriétaire\s*:\s*([^|]+)/i);
    return ownerMatch?.[1]?.trim() || "";
  };
  const buildActivityTitle = (entry, keyLabelEntry = "", owner = "", extraTitle = "") => {
    const setLabel = getActivitySetLabel(entry);
    return [keyLabelEntry, getActivityRegistryLabel(entry), extraTitle || owner, setLabel].filter(Boolean).join(" - ");
  };
  const replaceKeyLabelWithOwner = (entry) => {
    const ownerMap = ownerMaps[entry.registry] || new Map();
    const rawTitle = String(entry.title || "").trim();
    const keyLabelEntry = [...ownerMap.keys()].find(
      (label) => rawTitle === label || rawTitle.startsWith(`${label} - `),
    );
    if (keyLabelEntry) {
      const owner = getActivityOwnerFromDetails(entry) || ownerMap.get(keyLabelEntry);
      const extraTitle = rawTitle.slice(keyLabelEntry.length).replace(/^\s+-\s+/, "");
      return buildActivityTitle(entry, keyLabelEntry, owner, extraTitle || owner);
    }

    const ownerMatch = [...ownerMap.entries()].find(
      ([, owner]) => rawTitle === owner || rawTitle.startsWith(`${owner} - `),
    );
    if (ownerMatch) {
      const [matchedKeyLabel, owner] = ownerMatch;
      const extraTitle = rawTitle.slice(owner.length).replace(/^\s+-\s+/, "");
      return buildActivityTitle(entry, matchedKeyLabel, owner, extraTitle || owner);
    }

    const ownerFromDetails = getActivityOwnerFromDetails(entry);
    return buildActivityTitle(entry, "", "", ownerFromDetails || (isSetCountDetail(rawTitle) ? "" : rawTitle));
  };
  const getActivityTitle = (entry) => {
    if (String(entry.action || "").toLocaleLowerCase("fr-FR").includes("cr\u00e9ation fiche")) {
      const ownerFromDetails = String(entry.details || "").split(" - ")[0]?.trim();
      if (ownerFromDetails) {
        const formattedOwner = formatOwner(ownerFromDetails);
        const ownerMap = ownerMaps[entry.registry] || new Map();
        const keyLabelEntry = [...ownerMap.entries()].find(([, owner]) => owner === formattedOwner)?.[0];
        return buildActivityTitle(entry, keyLabelEntry || "", formattedOwner, formattedOwner);
      }
    }

    return replaceKeyLabelWithOwner(entry);
  };
  const isContactActivity = (entry) => /intervenant/i.test(String(entry.action || ""));
  const cleanContactHistoryName = (entry) => {
    const candidates = [entry.title, entry.details]
      .flatMap((value) => String(value || "").split("|"))
      .map((value) => value.trim())
      .filter(Boolean)
      .filter((value) => !/\d/.test(value))
      .filter((value) => !/^intervenant\s+(interne|externe)$/i.test(value));
    return candidates[0] || String(entry.title || "").replace(/\|.*$/, "").trim() || "Intervenant";
  };
  const cleanContactHistoryDetails = (entry) => {
    return "";
  };
  const shouldKeepStoredActivityEntry = (entry) => {
    const action = String(entry.action || "").toLocaleLowerCase("fr-FR");
    const isCreationAction =
      action.includes("cr\u00e9ation fiche") ||
      action.includes("ajout jeu") ||
      action.includes("cr\u00e9ation jeu");
    if (!isCreationAction) return true;

    const keyLabelEntry = getTitleKeyLabel(entry.title);
    if (!keyLabelEntry) return true;
    if (!isActiveSlotFilled(entry, keyLabelEntry)) return false;

    const currentOwner = (ownerMaps[entry.registry] || new Map()).get(keyLabelEntry) || "";
    if (!currentOwner) return true;

    const titleParts = String(entry.title || "").split(" - ").map((part) => part.trim()).filter(Boolean);
    const titleOwner = titleParts
      .filter((part) => part !== keyLabelEntry)
      .filter((part) => part !== "Location" && part !== "Transaction")
      .filter((part) => !/^jeu\s+\d+$/i.test(part))
      .find((part) => part.toLocaleLowerCase("fr-FR") !== currentOwner.toLocaleLowerCase("fr-FR"));
    const detailsOwner = getActivityOwnerFromDetails(entry);
    const storedOwner = titleOwner || detailsOwner;
    if (!storedOwner) return true;

    return currentOwner.toLocaleLowerCase("fr-FR") === formatOwner(storedOwner).toLocaleLowerCase("fr-FR");
  };
  const storedActivityLog = loadActivityLog();
  const cleanedActivityLog = storedActivityLog.filter(shouldKeepStoredActivityEntry);
  if (cleanedActivityLog.length !== storedActivityLog.length) saveActivityLog(cleanedActivityLog);

  let activityEntries = cleanedActivityLog.map((entry) => ({
    id: entry.id || "",
    timestamp: parseHistoryTimestamp(entry.date),
    date: formatArchiveDate(entry.date),
    title: isContactActivity(entry) ? cleanContactHistoryName(entry) : getActivityTitle(entry),
    action: entry.action,
    actor: "Action enregistrée",
    details: isContactActivity(entry) ? cleanContactHistoryDetails(entry) : entry.details || "",
    device: entry.device || "Appareil non renseigné",
    registry: entry.registry || "location",
    source: "activity",
  }));
  const latestCreationByKey = new Map();
  activityEntries.forEach((entry) => {
    const action = String(entry.action || "").toLocaleLowerCase("fr-FR");
    const keyLabelEntry = getTitleKeyLabel(entry.title);
    if (!action.includes("cr\u00e9ation fiche") || !keyLabelEntry) return;

    const mapKey = `${entry.registry || ""}|${keyLabelEntry}`.toLocaleLowerCase("fr-FR");
    const savedEntry = latestCreationByKey.get(mapKey);
    if (!savedEntry || entry.timestamp > savedEntry.timestamp) latestCreationByKey.set(mapKey, entry);
  });
  activityEntries = activityEntries.filter((entry) => {
    const action = String(entry.action || "").toLocaleLowerCase("fr-FR");
    const isCreationSheet = action.includes("cr\u00e9ation fiche");
    if (!isCreationSheet && !action.includes("ajout jeu") && !action.includes("cr\u00e9ation jeu")) return true;

    const keyLabelEntry = getTitleKeyLabel(entry.title);
    if (!keyLabelEntry) return true;

    const currentOwner = (ownerMaps[entry.registry] || new Map()).get(keyLabelEntry) || "";
    const entryOwner = getHistoryTitleOwner(entry.title) || getActivityOwnerFromDetails(entry);
    if (
      currentOwner &&
      entryOwner &&
      currentOwner.toLocaleLowerCase("fr-FR") !== entryOwner.toLocaleLowerCase("fr-FR")
    ) {
      return false;
    }

    const mapKey = `${entry.registry || ""}|${keyLabelEntry}`.toLocaleLowerCase("fr-FR");
    const latestCreation = latestCreationByKey.get(mapKey);
    if (isCreationSheet) return !latestCreation || latestCreation.id === entry.id;

    return !latestCreation || latestCreation.timestamp <= entry.timestamp;
  });
  const registryEntries = ["location", "transaction"].flatMap(getRegistryHistoryEntries).map((entry) => ({
    ...entry,
    source: "registry",
  }));
  const completeActivityTitleFromRegistry = (activityEntry) => {
    const activityMinute = Math.floor(activityEntry.timestamp / 60000);
    const activityActionClass = getActionClass(activityEntry.action);
    const activitySearch = `${activityEntry.title} ${activityEntry.details} ${activityEntry.actor}`.toLocaleLowerCase("fr-FR");
    const activityKeyLabel = getTitleKeyLabel(activityEntry.title);
    const matchingRegistryEntry = registryEntries.find((registryEntry) => {
      if (registryEntry.registry !== activityEntry.registry) return false;
      if (getActionClass(registryEntry.action) !== activityActionClass) return false;
      if (Math.abs(Math.floor(registryEntry.timestamp / 60000) - activityMinute) > 1) return false;
      if (activityKeyLabel && getTitleKeyLabel(registryEntry.title) !== activityKeyLabel) return false;

      const owner = getHistoryTitleOwner(registryEntry.title).toLocaleLowerCase("fr-FR");
      const phone = getHistoryPhone(registryEntry.details);
      const actor = String(registryEntry.actor || "").toLocaleLowerCase("fr-FR");
      return Boolean(
        (activityKeyLabel && !titleHasOwner(activityEntry.title) && owner) ||
        (owner && activitySearch.includes(owner)) ||
          (phone && activitySearch.includes(phone)) ||
          (actor && activitySearch.includes(actor)),
      );
    });

    return matchingRegistryEntry ? { ...activityEntry, title: matchingRegistryEntry.title, action: matchingRegistryEntry.action } : activityEntry;
  };
  activityEntries.forEach((entry, index) => {
    activityEntries[index] = completeActivityTitleFromRegistry(entry);
  });
  const getDeduplicationKey = (entry) => {
    const actionClass = getActionClass(entry.action);
    const normalizedAction = actionClass === "in" && /(?:rentr|entr)/i.test(entry.action)
      ? "entry"
      : String(entry.action || "").trim().toLocaleLowerCase("fr-FR");
    const keyLabelEntry = getTitleKeyLabel(entry.title);
    const normalizedTitle = String(entry.title || "").trim().replace(/\s+/g, " ").toLocaleLowerCase("fr-FR");
    const minute = Math.floor(entry.timestamp / 60000);
    return `${normalizedAction}|${keyLabelEntry ? keyLabelEntry.toLocaleLowerCase("fr-FR") : normalizedTitle}|${minute}`;
  };
  const activityEntriesByKey = new Map();
  activityEntries.forEach((entry) => {
    const key = getDeduplicationKey(entry);
    const matchingEntries = activityEntriesByKey.get(key) || [];
    matchingEntries.push(entry);
    activityEntriesByKey.set(key, matchingEntries);
  });
  const deduplicatedEntries = registryEntries.map((registryEntry) => {
    const key = getDeduplicationKey(registryEntry);
    const matchingActivities = activityEntriesByKey.get(key) || [];
    const activityEntry = matchingActivities.shift();
    if (!matchingActivities.length) activityEntriesByKey.delete(key);
    if (!activityEntry) return registryEntry;
    return {
      ...registryEntry,
      timestamp: activityEntry.timestamp || registryEntry.timestamp,
      date: activityEntry.date || registryEntry.date,
      action: registryEntry.action || activityEntry.action,
      device: activityEntry.device || registryEntry.device,
      activityId: activityEntry.id || "",
    };
  });
  activityEntriesByKey.forEach((remainingEntries) => deduplicatedEntries.push(...remainingEntries));
  const getGlobalHistoryPriority = (entry) => {
    const action = String(entry.action || "").toLocaleLowerCase("fr-FR");
    if (action.includes("cr\u00e9ation fiche")) return 0;
    if (/\b(?:entr\u00e9e?|rentr\u00e9e?)\b/.test(action)) return 1;
    if (/\b(?:sortie|sorti)\b/.test(action)) return 2;
    return 3;
  };
  const normalizeMovementWord = (value) =>
    normalizeMovementWords(value);
  const getGlobalHistoryActionLabel = (action) =>
    String(action || "").toLocaleLowerCase("fr-FR").includes("cr\u00e9ation jeu") ? "Ajout jeu" : normalizeMovementWord(action);
  const addMissingOwnerToHistoryRest = (entry, keyLabelEntry, rest) => {
    const owner = (ownerMaps[entry.registry] || new Map()).get(keyLabelEntry) || "";
    if (!owner || titleHasOwner(entry.title)) return rest;

    const parts = String(rest || "").split(" - ").map((part) => part.trim()).filter(Boolean);
    if (!parts.length) return owner;
    if (parts.some((part) => part.toLocaleLowerCase("fr-FR") === owner.toLocaleLowerCase("fr-FR"))) return rest;

    const registryIndex = parts.findIndex((part) => part === "Location" || part === "Transaction");
    if (registryIndex >= 0) {
      parts.splice(registryIndex + 1, 0, owner);
      return parts.join(" - ");
    }

    return [owner, ...parts].join(" - ");
  };
  const getGlobalHistoryTitleText = (entry) => {
    const actionLabel = getGlobalHistoryActionLabel(entry.action);
    const keyLabelEntry = getTitleKeyLabel(entry.title);
    if (!keyLabelEntry) return normalizeMovementWord(`${actionLabel} - ${entry.title}`);

    const rest = addMissingOwnerToHistoryRest(
      entry,
      keyLabelEntry,
      String(entry.title || "").slice(keyLabelEntry.length).replace(/^\s+-\s+/, ""),
    );
    return normalizeMovementWord(`${keyLabelEntry} - ${actionLabel}${rest ? ` - ${rest}` : ""}`);
  };
  const getGlobalHistorySubject = (entry) => {
    const owner = getHistorySubjectOwner(entry);
    if (owner) return `${entry.registry || ""}|${owner}`.replace(/\s+/g, " ").toLocaleLowerCase("fr-FR");

    const keyLabelEntry = getTitleKeyLabel(entry.title);
    if (keyLabelEntry) return `${entry.registry || ""}|${keyLabelEntry}`.toLocaleLowerCase("fr-FR");

    return String(entry.title || "")
      .trim()
      .replace(/\s+-\s+jeu\s+\d+\s*$/i, "")
      .replace(/\s+/g, " ")
      .toLocaleLowerCase("fr-FR");
  };
  const filteredEntries = registryFilter
    ? deduplicatedEntries.filter((entry) => entry.registry === registryFilter)
    : deduplicatedEntries;
  const hiddenGlobalHistoryIds = loadHiddenGlobalHistoryIds();
  const creationEntryMinutesBySubject = new Set(
    filteredEntries
      .filter((entry) => String(entry.action || "").toLocaleLowerCase("fr-FR").includes("cr\u00e9ation fiche"))
      .map((entry) => `${getGlobalHistorySubject(entry)}|${Math.floor(entry.timestamp / 60000)}`),
  );
  const sortedEntries = filteredEntries
    .map((entry, index) => ({ ...entry, orderIndex: index }))
    .filter((entry) => !hiddenGlobalHistoryIds.has(getGlobalHistoryEntryId(entry)))
    .filter((entry) => {
      const action = String(entry.action || "").toLocaleLowerCase("fr-FR");
      if (!/\bentr\u00e9e?\b/.test(action)) return true;
      return !creationEntryMinutesBySubject.has(`${getGlobalHistorySubject(entry)}|${Math.floor(entry.timestamp / 60000)}`);
    })
    .sort((first, second) => {
      const firstMinute = Math.floor(first.timestamp / 60000);
      const secondMinute = Math.floor(second.timestamp / 60000);
      const isSameSubject = getGlobalHistorySubject(first) === getGlobalHistorySubject(second);
      return (
        secondMinute - firstMinute ||
        second.timestamp - first.timestamp ||
        (isSameSubject ? getGlobalHistoryPriority(first) - getGlobalHistoryPriority(second) : 0) ||
        first.orderIndex - second.orderIndex
      );
    });
  const hasMovementForSetCountEntry = (entry) => {
    const action = String(entry.action || "").toLocaleLowerCase("fr-FR");
    if (!action.includes("ajout jeu") && !action.includes("cr\u00e9ation jeu")) return false;

    const keyLabelEntry = getTitleKeyLabel(entry.title);
    if (!keyLabelEntry) return false;

    const setLabel = String(entry.title || "").match(/\bJeu\s+\d+\b/i)?.[0] || getActivitySetLabel(entry);
    const minute = Math.floor(entry.timestamp / 60000);
    return sortedEntries.some((otherEntry) => {
      if (otherEntry === entry) return false;
      if (otherEntry.registry !== entry.registry) return false;
      if (!["in", "out", "reserved"].includes(getActionClass(otherEntry.action))) return false;
      if (getTitleKeyLabel(otherEntry.title) !== keyLabelEntry) return false;

      const otherSetLabel = String(otherEntry.title || "").match(/\bJeu\s+\d+\b/i)?.[0] || otherEntry.setId || "";
      if (setLabel && otherSetLabel && setLabel.toLocaleLowerCase("fr-FR") !== otherSetLabel.toLocaleLowerCase("fr-FR")) {
        return false;
      }

      return Math.floor(otherEntry.timestamp / 60000) === minute;
    });
  };
  const seenMovementEntries = new Set();
  const entries = sortedEntries.filter((entry) => {
    if (hasMovementForSetCountEntry(entry)) return false;

    const actionClass = getActionClass(entry.action);
    if (!["in", "out", "reserved"].includes(actionClass)) return true;

    const keyLabelEntry = getTitleKeyLabel(entry.title);
    if (!keyLabelEntry) return true;

    const setLabel = String(entry.title || "").match(/\bJeu\s+\d+\b/i)?.[0] || entry.setId || "";
    const minute = Math.floor(entry.timestamp / 60000);
    const movementKey = [entry.registry || "", keyLabelEntry, setLabel, actionClass, minute].join("|").toLocaleLowerCase("fr-FR");
    if (seenMovementEntries.has(movementKey)) return false;

    seenMovementEntries.add(movementKey);
    return true;
  });

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
    const reservationDateLine = document.createElement("strong");
    const meta = document.createElement("small");
    const details = document.createElement("span");
    const deviceButton = document.createElement("button");
    const device = document.createElement("em");
    const historyKeyId = entry.keyId || getKeyIdFromHistoryTitle(entry.title);
    item.dataset.globalHistoryId = getGlobalHistoryEntryId(entry);
    item.dataset.historyRegistry = entry.registry || "";
    item.dataset.historyKeyId = historyKeyId;
    item.dataset.historySetId = entry.setId || "";
    item.dataset.historyArchiveId = entry.archiveId || "";
    item.dataset.historyAction = getActionClass(entry.action);
    item.title = historyKeyId
      ? "Cliquer pour ouvrir la fiche. Ctrl + clic pour supprimer cette ligne d'historique"
      : "Ctrl + clic pour supprimer cette ligne d'historique";
    const detailParts = String(entry.details || "").split("|").map((part) => part.trim()).filter(Boolean);
    const reservationDateDetail =
      getActionClass(entry.action) === "reserved"
        ? detailParts.find((part) => /^Pour le\s+/i.test(part))
        : "";
    const reservationPersonDetail =
      getActionClass(entry.action) === "reserved"
        ? detailParts.find((part) => /^Intervenant\s*:/i.test(part))
        : "";
    const reservationPhoneDetail =
      getActionClass(entry.action) === "reserved"
        ? detailParts.find((part) => /^T\u00e9l\u00e9phone\s*:/i.test(part))
        : "";
    const reservationPerson = reservationPersonDetail?.replace(/^Intervenant\s*:\s*/i, "").trim() || entry.actor || "";
    const reservationPhone = reservationPhoneDetail?.replace(/^T\u00e9l\u00e9phone\s*:\s*/i, "").trim() || "";
    let visibleDetails = reservationDateDetail
      ? detailParts
          .filter((part) => part !== reservationDateDetail)
          .filter((part) => part !== reservationPersonDetail)
          .filter((part) => part !== reservationPhoneDetail)
          .join(" | ")
      : entry.details;
    const actionClass = getActionClass(entry.action);
    const isRegisteredAction = String(entry.actor || "").toLocaleLowerCase("fr-FR") === "action enregistr\u00e9e";
    const fallbackActorParts =
      isRegisteredAction && ["in", "out", "signed", "removed"].includes(actionClass)
        ? detailParts.filter((part) => !/^propri\u00e9taire\s*:/i.test(part) && !/^t\u00e9l\u00e9phone\s*:/i.test(part))
        : [];
    const fallbackActorPhone = fallbackActorParts.find((part) => getHistoryPhone(part)) || "";
    const fallbackActorName = fallbackActorParts
      .find((part) => part !== fallbackActorPhone && !/\d{2}(?:\s\d{2}){3,4}/.test(part))
      ?.replace(/\s*-\s*$/, "")
      .trim() || "";
    const movementActor = isRegisteredAction && fallbackActorName ? fallbackActorName : entry.actor;
    const movementPhone = entry.actorPhone || getHistoryPhone(fallbackActorPhone);
    if (["in", "out", "signed", "removed"].includes(actionClass)) visibleDetails = "";
    title.textContent = getGlobalHistoryTitleText(entry);
    reservationDateLine.className = "reservation-date-line";
    reservationDateLine.textContent = reservationDateDetail || "";
    const actorText =
      actionClass === "reserved"
        ? [reservationPerson, reservationPhone].filter(Boolean).join(" - ")
        : [movementActor === "Action enregistr\u00e9e" ? "" : movementActor, movementPhone].filter(Boolean).join(" - ");
    meta.textContent = `${entry.date}${actorText ? ` - ${actorText}` : ""}`;
    details.textContent = visibleDetails;
    deviceButton.className = "history-device-button";
    deviceButton.type = "button";
    deviceButton.textContent = "...";
    device.hidden = true;
    device.textContent = entry.device || "Ancienne action sans appareil enregistré";
    deviceButton.addEventListener("click", () => {
      device.hidden = !device.hidden;
    });
    item.append(title);
    if (reservationDateDetail) item.append(reservationDateLine);
    if (getActionClass(entry.action) === "reserved" && visibleDetails) item.append(details);
    item.append(meta, deviceButton);
    if (getActionClass(entry.action) !== "reserved" && visibleDetails) item.append(details);
    item.append(device);
    targetList.append(item);
  });
}

function renderGlobalHistoryPanel(registryFilter = "") {
  currentGlobalHistoryFilter = registryFilter;
  const isRegistryHistory = Boolean(registryFilter);
  const registryLabel = registryFilter === "location" ? "Location" : "Transaction";
  globalHistoryEyebrow.textContent = isRegistryHistory ? `Tableau ${registryLabel.toLowerCase()}` : "Tableaux location et transaction";
  globalHistoryTitle.textContent = isRegistryHistory ? `Historique ${registryLabel}` : "Historique Global";
  globalHistoryPanel.setAttribute("aria-label", globalHistoryTitle.textContent);
  renderGlobalHistoryItems(globalHistoryList, registryFilter);
}

function openGlobalHistoryPanel(registryFilter = "") {
  clearTimeout(contactsCloseTimer);
  clearTimeout(archivesCloseTimer);
  contactsPanel.hidden = true;
  archivesPanel.hidden = true;
  compromisesPanel.hidden = true;
  savedBackupsPanel.hidden = true;
  globalHistoryPanel.hidden = false;
  renderGlobalHistoryPanel(registryFilter);
}

function formatSavedBackupDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date non renseignée";
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(date);
}

function applyBackupPayload(payload, sourceLabel = "cette sauvegarde") {
  if (payload?.app !== "century21-les-minimes-cles" || !payload.data || typeof payload.data !== "object") {
    alert("Cette sauvegarde n'est pas lisible.");
    return;
  }

  const confirmed = confirm(`Appliquer ${sourceLabel} remplacera les données actuelles du tableau. Continuer ?`);
  if (!confirmed) return;

  rememberUndoStep();
  const changedKeys = [];
  getBackupStorageKeys().forEach((key) => {
    const value = payload.data[key];
    if (localStorage.getItem(key) === value) return;
    saveStorageValue(key, value);
    changedKeys.push(key);
  });
  changedKeys.forEach((key) => dirtyCloudKeys.add(key));
  savePendingCloudKeys();
  Promise.all(changedKeys.map((key) => syncStorageKeyToCloud(key, { force: true })));
  logActivity("Application sauvegarde", "Liste des sauvegardes", sourceLabel);
  refreshDataFromStorage();
  alert("Sauvegarde appliquée.");
}

async function renderSavedBackupsPanel() {
  savedBackupsList.innerHTML = "";
  const loading = document.createElement("li");
  loading.textContent = "Chargement des sauvegardes...";
  savedBackupsList.append(loading);

  try {
    const rows = await loadSavedBackupRows(4);
    savedBackupsList.innerHTML = "";
    if (!rows.length) {
      const empty = document.createElement("li");
      empty.textContent = "Aucune sauvegarde automatique disponible.";
      savedBackupsList.append(empty);
      return;
    }

    rows.forEach((row, index) => {
      const payload = row.value || {};
      const item = document.createElement("li");
      const title = document.createElement("strong");
      const meta = document.createElement("small");
      const actions = document.createElement("div");
      const applyButton = document.createElement("button");
      const downloadButton = document.createElement("button");
      const createdAt = payload.exportedAt || row.updated_at;

      title.textContent = `Sauvegarde ${index + 1}`;
      meta.textContent = formatSavedBackupDate(createdAt);
      actions.className = "saved-backup-actions";
      applyButton.type = "button";
      applyButton.textContent = "Appliquer";
      downloadButton.type = "button";
      downloadButton.textContent = "Télécharger";

      applyButton.addEventListener("click", () => applyBackupPayload(payload, `la sauvegarde du ${formatSavedBackupDate(createdAt)}`));
      downloadButton.addEventListener("click", () => downloadBackupPayload(payload, "sauvegarde-auto-cles"));

      actions.append(applyButton, downloadButton);
      item.append(title, meta, actions);
      savedBackupsList.append(item);
    });
  } catch (error) {
    savedBackupsList.innerHTML = "";
    const item = document.createElement("li");
    item.textContent = "Impossible de charger les sauvegardes automatiques.";
    savedBackupsList.append(item);
    console.warn("Saved backups load failed", error.message);
  }
}

function openSavedBackupsPanel() {
  clearTimeout(contactsCloseTimer);
  clearTimeout(archivesCloseTimer);
  contactsPanel.hidden = true;
  archivesPanel.hidden = true;
  compromisesPanel.hidden = true;
  globalHistoryPanel.hidden = true;
  savedBackupsPanel.hidden = false;
  renderSavedBackupsPanel();
}

function updateImportButtonAvailability(event = {}) {
  const isUnlocked = Boolean(event.ctrlKey && event.shiftKey);
  importDataBtn.classList.toggle("is-unlocked", isUnlocked);
  importDataBtn.setAttribute("aria-disabled", String(!isUnlocked));

  const isSavedBackupsUnlocked = Boolean(event.ctrlKey && event.shiftKey);
  savedBackupsBtn.classList.toggle("is-unlocked", isSavedBackupsUnlocked);
  savedBackupsBtn.setAttribute("aria-disabled", String(!isSavedBackupsUnlocked));
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

    applyBackupPayload(parsed, file.name || "ce fichier JSON");
    return;
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
  const authenticatedSet =
    record.key.sets?.find((set) => set.history?.some((entry) => entry.type === "rented")) || record.key.sets?.[0] || {};
  const authenticatedMovement =
    [...(authenticatedSet.history || [])].find((entry) => entry.type === "rented") ||
    getLatestMovementEntry(authenticatedSet.history || []);
  const defaultInternalActor = getDefaultInternalContactActor();
  logActivity(
    "Acte authentique",
    keyLabel(record.key),
    [
      authenticatedMovement?.person || defaultInternalActor.person,
      authenticatedMovement?.phone || defaultInternalActor.phone,
    ].filter(Boolean).join(" | "),
  );
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
  resetKeyInfoEditUnlock(record.key);
  clearTimeout(detailCloseTimer);
  clearTimeout(archivesCloseTimer);
  archivesPanel.hidden = true;
  compromisesPanel.hidden = true;
  savedBackupsPanel.hidden = true;
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
        ? "Archivé"
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
    exportButton.title = "Exporter cette archive avec les signatures";
    exportButton.addEventListener("click", (event) => {
      event.stopPropagation();
      exportKeyExcel(key, record);
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
    item.classList.add("is-clickable");
    if (options.showCompromiseDetails) {
      item.dataset.quickTip = "Appuyer sur Ctrl + clic pour modifier la date du compromis";
    } else {
      item.title = "Cliquer pour consulter la fiche et son historique";
    }
    item.addEventListener("click", (event) => {
      event.preventDefault();
      if (event.ctrlKey && event.altKey) {
        const confirmed = confirm(`Supprimer d\u00e9finitivement l'archive ${keyLabel(key)} ?`);
        if (!confirmed) return;

        archives = archives.filter((archive) => archive.id !== record.id);
        if (selectedArchiveRecord?.id === record.id) {
          selectedArchiveRecord = null;
          selectedId = null;
          selectedSetId = "main";
        }
        saveArchives();
        renderArchivesPanel();
        renderCompromisesPanel();
        render();
        return;
      }
      if (options.showCompromiseDetails && event.ctrlKey) {
        editCompromiseDate(record.id);
        return;
      }
      openArchivedKeyRecord(record);
    });

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
  renderArchiveList(removedList, "removed", "Aucun bien archivé.");
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
  resetKeyInfoEditUnlock(restoredKey);
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

  return statusMatches && keyHasSetStatus(key, keyStatusFilter) && (!query || haystack.includes(query));
}

function renderGrid() {
  grid.innerHTML = "";
  updateKeyStatusFilterBar();

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
            const displayStatus = getSetDisplayStatus(set);
            segment.className = `key-set-segment ${displayStatus}`;
            segment.title = `${set.label} - ${displayStatus === "out" ? "Sorti" : displayStatus === "reserved" ? "R\u00e9serv\u00e9" : "Disponible"}`;
            strip.append(segment);
          });
          button.append(strip);
        }

        button.addEventListener("click", () => {
          selectedArchiveRecord = null;
          selectedId = key.id;
          selectedSetId = key.sets[0]?.id || "main";
          resetKeyInfoEditUnlock(key);
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
            if (!event.ctrlKey) return;
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
        const photo = compressLoadedImage(image);
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

function compressLoadedImage(image) {
  const variants = [
    [photoMaxSize, photoJpegQuality],
    [500, 0.32],
    [440, 0.28],
    [380, 0.24],
  ];
  let fallbackPhoto = "";

  for (const [maxSize, quality] of variants) {
    const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
    const width = Math.max(1, Math.round(image.width * scale));
    const height = Math.max(1, Math.round(image.height * scale));
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, height);
    context.drawImage(image, 0, 0, width, height);
    const photo = canvas.toDataURL("image/jpeg", quality);
    fallbackPhoto = photo;
    if (photo.startsWith("data:image/") && photo.length <= photoMaxDataUrlLength) return photo;
  }

  return fallbackPhoto;
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
      const nextPhoto = compressLoadedImage(image);
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

function isSelectedCompromiseEditable() {
  return activeRegistry === "transaction" && selectedArchiveRecord?.reason === "rented";
}

function renderKeySetPhotos(key) {
  keySetPhotoList.innerHTML = "";
  const isArchiveView = Boolean(selectedArchiveRecord);
  const canEditPhotos = !isArchiveView || isSelectedCompromiseEditable();

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
    if (set.photo) {
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
    cameraButton.style.display = canEditPhotos ? "" : "none";
    cameraInput.addEventListener("click", beginPhotoImport);
    cameraInput.addEventListener("cancel", finishPhotoImport);

    importButton.className = "photo-button photo-import-button";
    importButtonText.textContent = "Importer une photo";
    importInput.type = "file";
    importInput.accept = "image/*";
    importInput.dataset.setId = set.id;
    importButton.style.display = canEditPhotos ? "" : "none";
    importInput.addEventListener("click", beginPhotoImport);
    importInput.addEventListener("cancel", finishPhotoImport);
    importButton.append(importButtonText, importInput);

    cameraButton.append(cameraButtonText, cameraInput);
    actions.append(cameraButton, importButton);

    if (set.photo && canEditPhotos) {
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
        updateSelectedKeySets(sets);
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
  const isCompromiseView = isSelectedCompromiseEditable();
  const isReadOnlyArchive = isArchiveView && !isSelectedCompromiseEditable();
  selectedSetId = selectedSet.id;
  detailPanel.hidden = false;
  form.hidden = false;
  form.classList.toggle("is-archive-view", isArchiveView);
  form.classList.toggle("is-compromise-view", isCompromiseView);
  form.classList.toggle("can-edit-archive-photos", isCompromiseView && !isReadOnlyArchive);
  selectedTitle.textContent = keyLabel(key);
  statusPill.className = "status-pill status-summary";
  statusPill.innerHTML = "";
  key.sets.forEach((set, index) => {
    const item = document.createElement("span");
    const displayStatus = getSetDisplayStatus(set);
    item.className = `set-status ${displayStatus}`;
    item.textContent = `${index + 1} : ${displayStatus === "out" ? "indisponible" : displayStatus === "reserved" ? "r\u00e9serv\u00e9" : "disponible"}`;
    statusPill.append(item);
  });
  keySetCountSelect.value = String(key.sets.length);
  renderKeySetSelect(key);
  renderKeySetPhotos(key);
  if (!isProtectedKeyInfoInputActive()) {
    propertyInput.value = key.property;
    postalCodeInput.value = key.postalCode || "";
    cityInput.value = key.city || "";
    ownerInput.value = formatOwner(key.owner);
    ownerFirstNameInput.value = formatFirstName(key.ownerFirstName);
    notesInput.value = key.notes;
  }
  const isKeyInfoLocked = !isArchiveView && hasProtectedKeyInfo(key) && !isKeyInfoEditUnlocked;
  form.classList.toggle("is-key-info-locked", isKeyInfoLocked);
  protectedKeyInfoInputs.forEach((input) => {
    input.readOnly = isKeyInfoLocked;
    input.classList.toggle("key-info-lockable", isKeyInfoLocked);
    input.title = isKeyInfoLocked ? "Double-cliquez pour modifier" : "";
    input.setAttribute("aria-readonly", String(isKeyInfoLocked));
  });
  const canMoveSelectedKey = !isArchiveView || isSelectedCompromiseEditable();
  const isSelectedSetOut = selectedSet.status === "out";
  const isSelectedSetOutForReservation = isSelectedSetOut && Boolean(selectedSet.holderReservationId);
  const needsSelectedSetCheckIn = Boolean(selectedSet.needsCheckIn);
  const needsSelectedSetCheckInReason = selectedSet.needsCheckInReason || "";
  const isMainMovementLocked = isReadOnlyArchive || isSelectedSetOutForReservation;
  const canCheckInSelectedKey = canMoveSelectedKey && (isSelectedSetOut || needsSelectedSetCheckIn) && !isSelectedSetOutForReservation;
  checkinBtn.textContent = selectedSet.status === "out" ? "Rentr\u00e9" : "Entr\u00e9";
  reservedBtn.textContent = "R\u00e9serv\u00e9";
  checkoutBtn.textContent = "Sorti";
  checkoutBtn.disabled = !canMoveSelectedKey || isSelectedSetOut || needsSelectedSetCheckIn;
  checkinBtn.disabled = !canCheckInSelectedKey;
  reservedBtn.disabled = !canMoveSelectedKey;
  rentedBtn.disabled = isArchiveView || key.archived || isSelectedSetOut;
  removedBtn.disabled = isArchiveView || key.archived || isSelectedSetOut;
  keySetCountSelect.disabled = isReadOnlyArchive;
  propertyInput.disabled = isArchiveView;
  postalCodeInput.disabled = isArchiveView;
  cityInput.disabled = isArchiveView;
  ownerInput.disabled = isArchiveView;
  ownerFirstNameInput.disabled = isArchiveView;
  notesInput.disabled = isArchiveView;
  contactSelect.disabled = isReadOnlyArchive;
  movementPersonInput.disabled = isReadOnlyArchive;
  movementNameInput.disabled = isReadOnlyArchive;
  movementCompanyInput.disabled = isReadOnlyArchive;
  movementPhoneInput.disabled = isReadOnlyArchive;
  movementNoteInput.disabled = isReadOnlyArchive;
  clearSignatureBtn.disabled = isMainMovementLocked;
  signatureCanvas.classList.toggle("is-readonly", isMainMovementLocked);

  historyList.innerHTML = "";
  activeReservationPanel.innerHTML = "";
  activeReservationPanel.hidden = true;
  const displayedHistory = [...selectedSet.history];
  const latestMovementEntry = getLatestMovementEntry(displayedHistory) || {};
  if (selectedArchiveRecord?.reason === "removed" && !displayedHistory.some((entry) => entry.type === "removed")) {
    displayedHistory.unshift({
      id: `${selectedArchiveRecord.id}-removed`,
      type: "removed",
      person: "",
      company: "",
      phone: "",
      note: "",
      signature: "",
      date: formatArchiveDate(selectedArchiveRecord.archivedAt),
    });
  }
  if (selectedArchiveRecord?.reason === "rented" && !displayedHistory.some((entry) => entry.type === "rented")) {
    displayedHistory.unshift({
      id: `${selectedArchiveRecord.id}-rented`,
      type: "rented",
      actionLabel: getRegistryConfig().archiveActionLabel,
      person: latestMovementEntry.person || "",
      company: latestMovementEntry.company || "",
      phone: latestMovementEntry.phone || "",
      note: "",
      signature: "",
      date: formatArchiveDate(selectedArchiveRecord.archivedAt),
    });
  }
  if (!displayedHistory.length) {
    const item = document.createElement("li");
    item.textContent = "Aucun mouvement enregistré pour ce jeu.";
    historyList.append(item);
    return;
  }

  const activeReservationItems = [];

  displayedHistory
    .sort(sortKeyHistoryEntries)
    .forEach((entry) => {
    const item = document.createElement("li");
    const title = document.createElement("strong");
    const date = document.createElement("small");
    item.dataset.historyId = entry.id;
    item.title = "Ctrl + clic pour supprimer cette ligne d'historique";
    item.dataset.historyAction =
      entry.type === "out"
        ? "out"
        : entry.type === "removed"
          ? "removed"
          : entry.type === "rented"
            ? "signed"
            : entry.type === "reserved" || entry.type === "cancel-reservation"
              ? "reserved"
              : "in";
    const actionTitle = getMovementActionLabel(entry, displayedHistory);
    const historyPersonName = getHistoryPersonName(entry);
    const hasHistoryPerson =
      Boolean(String(entry.person || "").trim() || String(entry.company || "").trim() || String(entry.phone || "").trim());
    title.textContent = hasHistoryPerson ? `${actionTitle} : ${historyPersonName}` : actionTitle;
    date.textContent =
      entry.type === "reserved"
        ? `R\u00e9serv\u00e9 le ${entry.createdAt || entry.date}`
        : entry.type === "cancel-reservation" && entry.note
          ? `${entry.date} - ${entry.note}`
        : entry.date;
    item.append(title);
    if (entry.type === "reserved") {
      const reservationDate = document.createElement("strong");
      reservationDate.textContent = `Pour le ${formatReservationHistoryDate(entry.reservationDate || entry.date)}`;
      item.append(reservationDate);
    }
    if (entry.company) {
      const company = document.createElement("p");
      company.textContent = `Soci\u00e9t\u00e9 : ${entry.company}`;
      item.append(company);
    }
    const legacyReservationNoteParts =
      !entry.reservationMovement && entry.note?.includes(" | ") ? entry.note.split(" | ") : [];
    const reservationMovementText = entry.reservationMovement || legacyReservationNoteParts[0] || "";
    const commentText =
      entry.note && legacyReservationNoteParts.length > 1
        ? `Commentaire : ${legacyReservationNoteParts.slice(1).join(" | ")}`
        : entry.note || "";
    if (reservationMovementText) {
      const reservationMovement = document.createElement("p");
      reservationMovement.textContent = normalizeMovementWords(reservationMovementText);
      item.append(reservationMovement);
    }
    if (commentText && entry.type !== "cancel-reservation") {
      const note = document.createElement("p");
      const normalizedComment = commentText.replace(/^Commentaire\s*:\s*/i, "");
      note.textContent = `Commentaire : ${formatSentenceStart(normalizedComment)}`;
      item.append(note);
    }
    if (entry.signature) {
      const signature = document.createElement("img");
      signature.className = "history-signature";
      signature.src = entry.signature;
      signature.alt = `Signature ${entry.type === "out" ? "Sorti" : "Entr\u00e9"}`;
      item.append(signature);
    }
    const activeReservation =
      entry.type === "reserved"
        ? (selectedSet.reservations || []).find((reservation) => reservation.id === entry.reservationId && isActiveReservation(reservation))
        : null;
    let historySummary = null;
    if (activeReservation) {
      historySummary = item.cloneNode(true);
      const reservationCommentField = document.createElement("label");
      const reservationCommentLabel = document.createElement("span");
      const reservationComment = document.createElement("textarea");
      const actions = document.createElement("div");
      const movementButton = document.createElement("button");
      const removeButton = document.createElement("button");
      const cancelButton = document.createElement("button");
      const isReservationOut = selectedSet.status === "out" && selectedSet.holderReservationId === entry.reservationId;
      const isOutForAnotherReason = selectedSet.status === "out" && selectedSet.holderReservationId !== entry.reservationId;

      reservationCommentField.className = "reservation-comment-field";
      reservationCommentLabel.textContent = "Commentaire";
      reservationComment.className = "reservation-comment-input";
      reservationComment.rows = 2;
      reservationComment.placeholder = "Motif, rendez-vous, r\u00e9f\u00e9rence...";
      reservationComment.dataset.reservationId = entry.reservationId;
      reservationComment.disabled = isReadOnlyArchive;
      reservationCommentField.append(reservationCommentLabel, reservationComment);
      item.append(reservationCommentField);

      actions.className = "reservation-history-actions";
      movementButton.type = "button";
      movementButton.className = `reservation-history-button ${isReservationOut ? "in" : "out"}`;
      movementButton.textContent = isReservationOut ? "Rentr\u00e9" : "Sorti";
      movementButton.disabled = isReadOnlyArchive || isOutForAnotherReason;
      movementButton.addEventListener("click", () => toggleReservationMovement(entry.reservationId));

      removeButton.type = "button";
      removeButton.className = "reservation-history-button removed";
      removeButton.textContent = "Archivé";
      removeButton.disabled = isReadOnlyArchive || selectedSet.status === "out";
      removeButton.addEventListener("click", () => archiveReservationKey(entry.reservationId));

      cancelButton.type = "button";
      cancelButton.className = "reservation-history-button cancel";
      cancelButton.textContent = "Annulation";
      cancelButton.disabled = isReadOnlyArchive || isReservationOut;
      cancelButton.addEventListener("click", () => cancelReservation(entry.reservationId));

      const signatureField = document.createElement("div");
      const signatureLabel = document.createElement("div");
      const signatureCanvas = document.createElement("canvas");
      const clearReservationSignatureBtn = document.createElement("button");

      signatureField.className = "reservation-signature-field";
      signatureLabel.className = "reservation-signature-label";
      signatureLabel.innerHTML = "<span>Signature</span>";
      clearReservationSignatureBtn.type = "button";
      clearReservationSignatureBtn.textContent = "Effacer";
      clearReservationSignatureBtn.disabled = isReadOnlyArchive;
      signatureCanvas.className = "reservation-signature-canvas";
      signatureCanvas.width = 320;
      signatureCanvas.height = 212;
      signatureCanvas.dataset.reservationId = entry.reservationId;
      signatureCanvas.classList.toggle("is-readonly", isReadOnlyArchive);
      signatureCanvas.setAttribute("aria-label", "Zone de signature de la réservation");
      clearReservationSignatureBtn.addEventListener("click", () => clearInlineSignature(signatureCanvas));
      signatureLabel.append(clearReservationSignatureBtn);
      signatureField.append(signatureLabel, signatureCanvas);
      item.append(signatureField);
      if (!isReadOnlyArchive) setupInlineSignatureCanvas(signatureCanvas);

      actions.append(movementButton, removeButton, cancelButton);
      item.append(actions);
    }
    item.append(date);
    if (historySummary) {
      historySummary.append(date.cloneNode(true));
      activeReservationItems.push({
        item,
        timestamp: parseHistoryTimestamp(activeReservation.reservationDate || activeReservation.createdAt || entry.reservationDate || entry.date),
      });
      historyList.append(historySummary);
    } else {
      historyList.append(item);
    }
  });
  activeReservationItems
    .sort((first, second) => first.timestamp - second.timestamp)
    .forEach(({ item }) => activeReservationPanel.append(item));
  activeReservationPanel.hidden = !activeReservationItems.length;
}

function deleteHistoryEntry(historyId) {
  const key = getSelectedKey();
  const selectedSet = getSelectedSet(key);
  if (!key || !selectedSet || !historyId) return;

  const entry = selectedSet.history.find((item) => item.id === historyId);
  if (!entry) return;
  if (entry.type === "reserved" && selectedSet.status === "out" && selectedSet.holderReservationId === entry.reservationId) {
    alert("Cette r\u00e9servation est sortie : fais d'abord Rentr\u00e9 avant de supprimer cette ligne.");
    return;
  }

  const confirmed = confirm("Supprimer cette ligne d'historique ?");
  if (!confirmed) return;

  const nextHistory = selectedSet.history.filter((item) => item.id !== historyId);
  const nextReservations =
    entry.type === "reserved" && entry.reservationId
      ? (selectedSet.reservations || []).filter((reservation) => reservation.id !== entry.reservationId)
      : selectedSet.reservations || [];
  const repairedSet = repairSetMovementState({
    ...selectedSet,
    reservations: nextReservations,
    history: nextHistory,
  });

  updateSelectedSet({
    status: repairedSet.status,
    holder: repairedSet.holder,
    holderCompany: repairedSet.holderCompany,
    holderPhone: repairedSet.holderPhone,
    holderReservationId: repairedSet.holderReservationId,
    reservations: repairedSet.reservations,
    history: repairedSet.history,
  });
}

function updateSelectedKey(changes) {
  if (selectedArchiveRecord) return;
  const previousKey = getSelectedKey();
  const wasFilled = previousKey ? isKeyFilled(previousKey) : false;
  rememberUndoStep();
  keys = keys.map((key) => (key.id === selectedId ? { ...key, ...changes } : key));
  let nextKey = getSelectedKey();
  if (nextKey && !wasFilled && isKeyFilled(nextKey)) {
    keys = keys.map((key) =>
      key.id === selectedId
        ? {
            ...key,
            sets: key.sets.map((set, index) =>
              set.id === selectedSetId || (!selectedSetId && index === 0)
                ? { ...set, needsCheckIn: true, needsCheckInReason: "created" }
                : set,
            ),
          }
        : key,
    );
    nextKey = getSelectedKey();
    logActivity(
      "Création fiche",
      `${keyLabel(nextKey)}${nextKey.owner ? ` - ${formatOwner(nextKey.owner)}` : ""}`,
      [nextKey.owner, nextKey.property].filter(Boolean).join(" - "),
    );
  } else if (nextKey && wasFilled && isKeyFilled(nextKey)) {
    updateCreationActivityForKey(nextKey);
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

function updateSelectedKeySets(sets) {
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
    renderCompromisesPanel();
    render();
    return;
  }
  updateSelectedKey({ sets });
}

function setKeySetCount(count) {
  if (selectedArchiveRecord && !isSelectedCompromiseEditable()) return;
  const key = getSelectedKey();
  if (!key) return;

  const nextCount = Math.max(1, Math.min(4, count));
  const previousCount = key.sets.length;
  if (nextCount === previousCount) return;

  const ownerName = key.owner ? formatOwner(key.owner) : "PROPRI\u00c9TAIRE NON RENSEIGN\u00c9";
  const keyCountWord = nextCount > 1 ? "jeux" : "jeu";
  const confirmedCount = confirm(
    `Confirmez-vous la pr\u00e9sence de ${nextCount} ${keyCountWord} de cl\u00e9 pour le bien de monsieur et/ou madame "${ownerName}" ?`
  );
  if (!confirmedCount) {
    keySetCountSelect.value = String(previousCount);
    return;
  }

  const nextIds = keySetOptions.slice(0, nextCount).map((option) => option.id);
  const removedSets = key.sets.filter((set) => !nextIds.includes(set.id));
  const removedHasData = removedSets.some((set) => set.status === "out" || set.holder || set.history.length || hasActiveReservations(set));

  if (removedHasData) {
    const confirmed = confirm("Réduire le nombre de jeux supprimera l'historique des jeux retirés. Continuer ?");
    if (!confirmed) {
      keySetCountSelect.value = String(key.sets.length);
      return;
    }
  }

  const nextSets = nextIds.map((id, index) => {
    const savedSet = key.sets.find((set) => set.id === id);
    return savedSet || { ...makeKeySet(id), needsCheckIn: index >= previousCount, needsCheckInReason: "added" };
  });
  selectedSetId = nextSets.some((set) => set.id === selectedSetId) ? selectedSetId : nextSets[0].id;
  if (nextCount > previousCount) {
    selectedSetId = nextSets[nextCount - 1]?.id || selectedSetId;
    logActivity("Ajout jeu", `${keyLabel(key)}${key.owner ? ` - ${formatOwner(key.owner)}` : ""}`, [key.owner, `${nextCount} jeux au total`].filter(Boolean).join(" - "));
  } else if (nextCount < previousCount) {
    logActivity("Suppression jeu", keyLabel(key), `${removedSets.map((set) => set.label).join(", ")} supprimé(s)`);
  }
  if (selectedArchiveRecord) {
    const nextArchiveRecord = {
      ...selectedArchiveRecord,
      key: {
        ...selectedArchiveRecord.key,
        sets: nextSets,
      },
    };
    selectedArchiveRecord = nextArchiveRecord;
    archives = archives.map((archive) => (archive.id === nextArchiveRecord.id ? nextArchiveRecord : archive));
    saveArchives();
    renderCompromisesPanel();
    render();
    return;
  }
  updateSelectedKey({ sets: nextSets });
}

async function addMovement(type) {
  if (selectedArchiveRecord && !isSelectedCompromiseEditable()) return;
  const key = getSelectedKey();
  const selectedSet = getSelectedSet(key);
  if (!key || !selectedSet || (key.archived && !selectedArchiveRecord)) return;
  if (selectedSet.status === "out" && selectedSet.holderReservationId) {
    alert("Cette sortie vient d'une r\u00e9servation : utilise la case orange de r\u00e9servation au-dessus.");
    return;
  }
  if (!ensureCompletePhoneNumber(movementPhoneInput, "num\u00e9ro de t\u00e9l\u00e9phone de l'intervenant")) return;
  const forcedPerson = type === "in" && selectedSet.status === "out" ? selectedSet.holder : "";
  const forcedPhone = type === "in" && selectedSet.status === "out" ? selectedSet.holderPhone : "";
  const forcedCompany = type === "in" && selectedSet.status === "out" ? selectedSet.holderCompany : "";
  const isReturningAfterCheckout = type === "in" && selectedSet.status === "out";
  if (!ensureMovementActor(type === "out" ? "Sorti" : "Entr\u00e9", { person: forcedPerson, company: forcedCompany })) return;
  if (type === "out") showCheckoutReservationWarning(selectedSet);

  const entry = {
    id: createHistoryId(),
    type,
    person: forcedPerson || getMovementPersonInputName(),
    company: forcedCompany || formatCompanyName(movementCompanyInput.value).trim(),
    phone: formatPhoneNumber(forcedPhone || movementPhoneInput.value),
    note: formatSentenceStart(movementNoteInput.value).trim(),
    signature: getMainSignatureDataUrl(),
    returnReason: type === "in" && isReturningAfterCheckout ? "returned" : "created",
    date: new Intl.DateTimeFormat("fr-FR", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date()),
  };

  updateSelectedSet({
    status: type === "out" ? "out" : "available",
    needsCheckIn: false,
    needsCheckInReason: "",
    holder: type === "out" ? entry.person || selectedSet.holder : "",
    holderCompany: type === "out" ? entry.company || selectedSet.holderCompany : "",
    holderPhone: type === "out" ? entry.phone || selectedSet.holderPhone : "",
    holderReservationId: "",
    reservations:
      type === "in" && selectedSet.holderReservationId
        ? (selectedSet.reservations || []).filter((reservation) => reservation.id !== selectedSet.holderReservationId)
        : selectedSet.reservations || [],
    history: [entry, ...selectedSet.history],
  });
  logActivity(getMovementActionLabel(entry), `${key.owner ? formatOwner(key.owner) : keyLabel(key)} - ${selectedSet.label}`, [entry.person, entry.phone, entry.note].filter(Boolean).join(" | "));

  movementPersonInput.value = "";
  movementNameInput.value = "";
  movementCompanyInput.value = "";
  movementPhoneInput.value = "";
  movementNoteInput.value = "";
  contactSelect.value = "";
  clearSignature();
  if (selectedArchiveRecord) renderCompromisesPanel();
  closeKeyPanelAfterAction();
  await syncCloudAfterAction();
}

function getMovementDateText() {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date());
}

function getInlineReservationSignature(reservationId) {
  const canvas = activeReservationPanel.querySelector(`.reservation-signature-canvas[data-reservation-id="${reservationId}"]`);
  return canvas?.dataset.signed === "true" ? canvas.toDataURL("image/png") : "";
}

function getInlineReservationComment(reservationId) {
  const input = activeReservationPanel.querySelector(`.reservation-comment-input[data-reservation-id="${reservationId}"]`);
  return input?.value.trim() || "";
}

function clearInlineSignature(canvas) {
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
  canvas.dataset.signed = "false";
}

function setupInlineSignatureCanvas(canvas) {
  let isDrawing = false;
  const context = canvas.getContext("2d");
  context.lineWidth = 2.4;
  context.lineCap = "round";
  context.lineJoin = "round";
  context.strokeStyle = "#1e2528";

  const getPoint = (event) => {
    const rect = canvas.getBoundingClientRect();
    const clampedX = Math.min(Math.max(event.clientX, rect.left), rect.right);
    const clampedY = Math.min(Math.max(event.clientY, rect.top), rect.bottom);
    return {
      x: ((clampedX - rect.left) / rect.width) * canvas.width,
      y: ((clampedY - rect.top) / rect.height) * canvas.height,
    };
  };

  canvas.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    isDrawing = true;
    canvas.dataset.signed = "true";
    canvas.setPointerCapture?.(event.pointerId);
    const point = getPoint(event);
    context.beginPath();
    context.moveTo(point.x, point.y);
  });
  canvas.addEventListener("pointermove", (event) => {
    if (!isDrawing) return;
    event.preventDefault();
    const point = getPoint(event);
    context.lineTo(point.x, point.y);
    context.stroke();
  });
  const stopDrawing = (event) => {
    if (event?.pointerId !== undefined) canvas.releasePointerCapture?.(event.pointerId);
    isDrawing = false;
  };
  canvas.addEventListener("pointerup", stopDrawing);
  canvas.addEventListener("pointercancel", stopDrawing);
}

function toggleReservationMovement(reservationId) {
  if (selectedArchiveRecord && !isSelectedCompromiseEditable()) return;
  const key = getSelectedKey();
  const selectedSet = getSelectedSet(key);
  if (!key || !selectedSet || (key.archived && !selectedArchiveRecord)) return;

  const reservation = (selectedSet.reservations || []).find((item) => item.id === reservationId);
  if (!reservation) return;

  const isReservationOut = selectedSet.status === "out" && selectedSet.holderReservationId === reservationId;
  if (!isReservationOut) showCheckoutReservationWarning(selectedSet, reservationId);
  const inlineComment = formatSentenceStart(getInlineReservationComment(reservationId)).trim();
  const reservationMovement = isReservationOut
    ? `Rentr\u00e9 r\u00e9servation du ${reservation.reservationDate || ""}`.trim()
    : `Sorti r\u00e9servation du ${reservation.reservationDate || ""}`.trim();
  const entry = {
    id: createHistoryId(),
    type: isReservationOut ? "in" : "out",
    person: reservation.person || "",
    company: reservation.company || "",
    phone: formatPhoneNumber(reservation.phone || ""),
    reservationMovement,
    note: inlineComment ? `Commentaire : ${inlineComment}` : "",
    signature: getInlineReservationSignature(reservationId),
    returnReason: isReservationOut ? "returned" : "",
    date: getMovementDateText(),
    reservationId,
  };

  updateSelectedSet({
    status: isReservationOut ? "available" : "out",
    holder: isReservationOut ? "" : entry.person,
    holderCompany: isReservationOut ? "" : entry.company,
    holderPhone: isReservationOut ? "" : entry.phone,
    holderReservationId: isReservationOut ? "" : reservationId,
    reservations: isReservationOut
      ? (selectedSet.reservations || []).filter((item) => item.id !== reservationId)
      : selectedSet.reservations || [],
    history: [entry, ...selectedSet.history],
  });
  logActivity(
    getMovementActionLabel(entry),
    `${key.owner ? formatOwner(key.owner) : keyLabel(key)} - ${selectedSet.label}`,
    [entry.person, entry.phone, entry.note].filter(Boolean).join(" | "),
  );
  if (selectedArchiveRecord) renderCompromisesPanel();
}

function cancelReservation(reservationId) {
  if (selectedArchiveRecord && !isSelectedCompromiseEditable()) return;
  const key = getSelectedKey();
  const selectedSet = getSelectedSet(key);
  if (!key || !selectedSet || (key.archived && !selectedArchiveRecord)) return;

  const reservation = (selectedSet.reservations || []).find((item) => item.id === reservationId);
  if (!reservation) return;
  if (selectedSet.status === "out" && selectedSet.holderReservationId === reservationId) {
    alert("Cette r\u00e9servation est sortie : fais d'abord Rentr\u00e9.");
    return;
  }

  const entry = {
    id: createHistoryId(),
    type: "cancel-reservation",
    person: reservation.person || "R\u00e9servation annul\u00e9e",
    company: reservation.company || "",
    phone: formatPhoneNumber(reservation.phone || ""),
    note: `Annulation r\u00e9servation du ${reservation.reservationDate || ""}`.trim(),
    signature: "",
    date: getMovementDateText(),
    reservationId,
  };

  updateSelectedSet({
    reservations: (selectedSet.reservations || []).filter((item) => item.id !== reservationId),
    history: [entry, ...selectedSet.history],
  });
  logActivity("Annulation r\u00e9servation", `${key.owner ? formatOwner(key.owner) : keyLabel(key)} - ${selectedSet.label}`, entry.person);
  if (selectedArchiveRecord) renderCompromisesPanel();
}

async function archiveReservationKey(reservationId) {
  if (selectedArchiveRecord) return;
  const key = getSelectedKey();
  const selectedSet = getSelectedSet(key);
  if (!key || !selectedSet || key.archived) return;

  const reservation = (selectedSet.reservations || []).find((item) => item.id === reservationId);
  if (!reservation) return;
  if (selectedSet.status === "out") {
    alert("Ce jeu est sorti : fais d'abord Rentr\u00e9 avant de l'archiver.");
    return;
  }

  const confirmed = confirm(`Archiver ${keyLabel(key)} et lib\u00e9rer la case ?`);
  if (!confirmed) return;
  rememberUndoStep();

  const archivedAt = new Date().toISOString();
  const actionLabel = "Archiv\u00e9";
  const entry = {
    id: createHistoryId(),
    type: "removed",
    actionLabel,
    person: reservation.person || "",
    company: reservation.company || "",
    phone: formatPhoneNumber(reservation.phone || ""),
    note: formatSentenceStart(getInlineReservationComment(reservationId)).trim(),
    signature: getInlineReservationSignature(reservationId),
    date: getMovementDateText(),
    reservationId,
  };
  const archivedKey = {
    ...key,
    sets: key.sets.map((set) =>
      set.id === selectedSet.id
        ? {
            ...set,
            status: "available",
            holder: "",
            holderCompany: "",
            holderPhone: "",
            holderReservationId: "",
            reservations: (set.reservations || []).filter((item) => item.id !== reservationId),
            history: [entry, ...set.history],
          }
        : set,
    ),
  };

  archives = [
    {
      id: `${key.id}-${archivedAt}`,
      reason: "removed",
      archivedAt,
      compromiseSignedAt: "",
      key: { ...archivedKey, archived: false },
    },
    ...archives,
  ];
  keys = keys.map((savedKey) => (savedKey.id === key.id ? makeEmptyKey(savedKey) : savedKey));
  selectedId = null;
  selectedArchiveRecord = null;
  selectedSetId = "main";
  logActivity(actionLabel, keyLabel(key), [key.owner, key.property, entry.person || entry.company, entry.phone].filter(Boolean).join(" - "));
  saveArchives();
  saveKeys();
  closeKeyPanelAfterAction();
  await syncCloudAfterAction();
}

async function reserveSelectedSet() {
  if (selectedArchiveRecord && !isSelectedCompromiseEditable()) return;
  const key = getSelectedKey();
  const selectedSet = getSelectedSet(key);
  if (!key || !selectedSet || (key.archived && !selectedArchiveRecord)) return;
  clearTimeout(detailCloseTimer);

  const contact = contacts.find((savedContact) => savedContact.id === contactSelect.value);
  const person = getMovementPersonInputName();
  const company = contact?.type === "external" ? formatCompanyName(contact.companyName || "").trim() : formatCompanyName(movementCompanyInput.value).trim();
  const phone = formatPhoneNumber(contact?.phone || movementPhoneInput.value);
  if (!ensureMovementActor("R\u00e9serv\u00e9")) return;
  if (!contact && !ensureCompletePhoneNumber(movementPhoneInput, "num\u00e9ro de t\u00e9l\u00e9phone de l'intervenant")) return;

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
    id: createHistoryId(),
    type: "reserved",
    reservationId: `reservation-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    person,
    company,
    phone,
    note: formatSentenceStart(movementNoteInput.value).trim(),
    signature: "",
    date: createdAt,
    createdAt,
    reservationDate: formattedDate,
  };

  updateSelectedSet({
    reservations: [
      {
        id: entry.reservationId,
        person,
        company: entry.company || "",
        phone: entry.phone || "",
        note: entry.note || "",
        createdAt,
        reservationDate: formattedDate,
      },
      ...(selectedSet.reservations || []),
    ],
    history: [entry, ...selectedSet.history],
  });
  logActivity(
    "R\u00e9serv\u00e9",
    `${key.owner ? formatOwner(key.owner) : keyLabel(key)} - ${selectedSet.label}`,
    [person ? `Intervenant : ${person}` : "", phone ? `T\u00e9l\u00e9phone : ${phone}` : "", company ? `Soci\u00e9t\u00e9 : ${company}` : "", `Pour le ${formattedDate}`, entry.note].filter(Boolean).join(" | "),
  );

  movementPersonInput.value = "";
  movementNameInput.value = "";
  movementCompanyInput.value = "";
  movementPhoneInput.value = "";
  movementNoteInput.value = "";
  contactSelect.value = "";
  clearSignature();
  if (selectedArchiveRecord) renderCompromisesPanel();
  closeKeyPanelAfterAction();
  await syncCloudAfterAction();
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

  const actionLabel = reason === "rented" ? getRegistryConfig().archiveActionLabel : "Archivé";
  if (!ensureMovementActor(actionLabel)) return;
  if (!ensureCompletePhoneNumber(movementPhoneInput, "num\u00e9ro de t\u00e9l\u00e9phone de l'intervenant")) return;
  let compromiseSignedAt = "";
  if (reason === "rented" && activeRegistry === "transaction") {
    compromiseSignedAt = await promptCompromiseDate();
    if (!compromiseSignedAt) return;
  }

  const confirmed = confirm(`${actionLabel} ${keyLabel(key)} et libérer la case ?`);
  if (!confirmed) return;
  rememberUndoStep();

  const archivedAt = new Date().toISOString();
  const selectedSet = getSelectedSet(key);
  const archiveEntry =
    selectedSet
      ? {
          id: createHistoryId(),
          type: reason === "removed" ? "removed" : "rented",
          actionLabel,
          person: getMovementPersonInputName(),
          company: formatCompanyName(movementCompanyInput.value).trim(),
          phone: formatPhoneNumber(movementPhoneInput.value),
          note: formatSentenceStart(movementNoteInput.value).trim(),
          signature: getMainSignatureDataUrl(),
          date: new Intl.DateTimeFormat("fr-FR", {
            dateStyle: "short",
            timeStyle: "short",
          }).format(new Date()),
        }
      : null;
  const archivedKey = archiveEntry
    ? {
        ...key,
        sets: key.sets.map((set) =>
          set.id === selectedSet.id
            ? {
                ...set,
                history: [archiveEntry, ...set.history],
              }
            : set,
        ),
      }
    : key;
  archives = [
    {
      id: `${key.id}-${archivedAt}`,
      reason,
      archivedAt,
      compromiseSignedAt,
      key: { ...archivedKey, archived: false },
    },
    ...archives,
  ];
  keys = keys.map((savedKey) => (savedKey.id === key.id ? makeEmptyKey(savedKey) : savedKey));
  selectedId = null;
  selectedArchiveRecord = null;
  selectedSetId = "main";
  const movementActor = getTypedMovementActor();
  logActivity(actionLabel, keyLabel(key), [key.owner, key.property, movementActor.person || movementActor.company, compromiseSignedAt ? `Signature : ${formatDateOnly(compromiseSignedAt)}` : ""].filter(Boolean).join(" - "));
  saveArchives();
  saveKeys();
  closeKeyPanelAfterAction();
  await syncCloudAfterAction();
}

function openContactsPanel() {
  clearTimeout(contactsCloseTimer);
  clearTimeout(archivesCloseTimer);
  compromisesPanel.hidden = true;
  archivesPanel.hidden = true;
  globalHistoryPanel.hidden = true;
  savedBackupsPanel.hidden = true;
  contactsPanel.hidden = false;
  renderContactsPanel();
}

function openCompromisesPanel() {
  clearTimeout(contactsCloseTimer);
  clearTimeout(archivesCloseTimer);
  contactsPanel.hidden = true;
  archivesPanel.hidden = true;
  globalHistoryPanel.hidden = true;
  savedBackupsPanel.hidden = true;
  compromisesPanel.hidden = false;
  renderCompromisesPanel();
}

function openArchivesPanel() {
  clearTimeout(contactsCloseTimer);
  clearTimeout(archivesCloseTimer);
  contactsPanel.hidden = true;
  compromisesPanel.hidden = true;
  globalHistoryPanel.hidden = true;
  savedBackupsPanel.hidden = true;
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

function signatureCanvasHasInk() {
  const context = signatureCanvas.getContext("2d");
  const { data } = context.getImageData(0, 0, signatureCanvas.width, signatureCanvas.height);
  for (let index = 3; index < data.length; index += 4) {
    if (data[index] > 0) return true;
  }
  return false;
}

function getMainSignatureDataUrl() {
  return hasSignature || signatureCanvasHasInk() ? signatureCanvas.toDataURL("image/png") : "";
}

function clearSignature() {
  const context = signatureCanvas.getContext("2d");
  context.clearRect(0, 0, signatureCanvas.width, signatureCanvas.height);
  hasSignature = false;
}

propertyInput.addEventListener(
  "input",
  debounce(updateSelectedKeyInfoFromDraft),
);
propertyInput.addEventListener("blur", () => {
  propertyInput.value = formatPropertyAddress(propertyInput.value);
  updateSelectedKeyInfoFromDraft();
});
postalCodeInput.addEventListener("input", debounce(updateSelectedKeyInfoFromDraft));
cityInput.addEventListener("input", debounce(updateSelectedKeyInfoFromDraft));
cityInput.addEventListener("blur", () => {
  cityInput.value = formatCity(cityInput.value);
  updateSelectedKeyInfoFromDraft();
});
ownerInput.addEventListener(
  "input",
  debounce(updateSelectedKeyInfoFromDraft),
);
ownerInput.addEventListener("blur", () => {
  ownerInput.value = formatOwner(ownerInput.value).trim();
  updateSelectedKeyInfoFromDraft();
});
ownerFirstNameInput.addEventListener(
  "input",
  debounce(updateSelectedKeyInfoFromDraft),
);
ownerFirstNameInput.addEventListener("blur", () => {
  ownerFirstNameInput.value = formatFirstName(ownerFirstNameInput.value);
  updateSelectedKeyInfoFromDraft();
});
notesInput.addEventListener("input", debounce(updateSelectedKeyInfoFromDraft));
protectedKeyInfoInputs.forEach((input) => {
  input.addEventListener("dblclick", unlockKeyInfoEdit);
});
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
historyList.addEventListener("click", (event) => {
  if (!event.ctrlKey) return;
  if (event.target.closest("button")) return;

  const item = event.target.closest("[data-history-id]");
  if (!item) return;
  event.preventDefault();
  deleteHistoryEntry(item.dataset.historyId);
});
globalHistoryList.addEventListener("click", (event) => {
  if (event.target.closest("button")) return;

  const item = event.target.closest("[data-global-history-id]");
  if (!item) return;
  event.preventDefault();
  if (event.ctrlKey) {
    deleteGlobalHistoryEntry(item.dataset.globalHistoryId);
    return;
  }

  openHistoryKey({
    registry: item.dataset.historyRegistry,
    keyId: item.dataset.historyKeyId,
    setId: item.dataset.historySetId,
    archiveId: item.dataset.historyArchiveId,
  });
});
contactSelect.addEventListener("change", () => {
  const contact = contacts.find((savedContact) => savedContact.id === contactSelect.value);
  if (!contact) {
    movementNameInput.value = "";
    movementCompanyInput.value = "";
    return;
  }

  movementPersonInput.value = formatFirstName(contact.firstName || "");
  movementNameInput.value = formatLastName(contact.name || "");
  movementCompanyInput.value = contact.type === "external" ? formatCompanyName(contact.companyName || "") : "";
  movementPhoneInput.value = formatPhoneNumber(contact.phone);
});
movementPersonInput.addEventListener("input", () => {
  movementPersonInput.value = formatFirstName(movementPersonInput.value);
});
movementNameInput.addEventListener("input", () => {
  movementNameInput.value = formatLastName(movementNameInput.value);
});
movementNameInput.addEventListener("blur", () => {
  movementNameInput.value = formatLastName(movementNameInput.value).trim();
});
movementCompanyInput.addEventListener("input", () => {
  movementCompanyInput.value = formatCompanyName(movementCompanyInput.value);
});
movementCompanyInput.addEventListener("blur", () => {
  movementCompanyInput.value = formatCompanyName(movementCompanyInput.value).trim();
});
movementPhoneInput.addEventListener("input", () => {
  movementPhoneInput.value = formatPhoneNumber(movementPhoneInput.value);
});
movementNoteInput.addEventListener("input", () => {
  movementNoteInput.value = formatSentenceStart(movementNoteInput.value);
});
contactsTabBtn.addEventListener("click", openContactsPanel);
contactsPanel.addEventListener("mouseenter", () => clearTimeout(contactsCloseTimer));
closeContactsBtn.addEventListener("click", () => {
  contactsPanel.hidden = true;
});
contactPhoneInput.addEventListener("input", () => {
  contactPhoneInput.value = formatPhoneNumber(contactPhoneInput.value);
});
contactFirstNameInput.addEventListener("input", () => {
  contactFirstNameInput.value = formatFirstName(contactFirstNameInput.value);
});
contactNameInput.addEventListener("input", () => {
  contactNameInput.value = formatLastName(contactNameInput.value);
});
contactNameInput.addEventListener("blur", () => {
  contactNameInput.value = formatLastName(contactNameInput.value).trim();
});
contactCompanyInput.addEventListener("input", () => {
  contactCompanyInput.value = formatCompanyName(contactCompanyInput.value);
});
contactCompanyInput.addEventListener("blur", () => {
  contactCompanyInput.value = formatCompanyName(contactCompanyInput.value).trim();
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
  if (!ensureCompletePhoneNumber(contactPhoneInput, "num\u00e9ro de t\u00e9l\u00e9phone de l'intervenant")) return;

  const name = formatLastName(contactNameInput.value).trim();
  const firstName = formatFirstName(contactFirstNameInput.value).trim();
  const companyName = activeContactType === "external" ? formatCompanyName(contactCompanyInput.value).trim() : "";
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
      getContactHistoryName(nextContact),
      contactTypeText(nextContact.type),
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
      getContactHistoryName(newContact),
      contactTypeText(newContact.type),
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
keyStatusFilterButtons.forEach((button) => {
  button.addEventListener("click", () => setKeyStatusFilter(button.dataset.keyStatusFilter));
});
statusFilter?.addEventListener("change", render);
undoBtn.addEventListener("click", undoPreviousStep);
historyDataBtn.addEventListener("click", () => openGlobalHistoryPanel());
registryHistoryDataBtn.addEventListener("click", () => openGlobalHistoryPanel(activeRegistry));
closeGlobalHistoryBtn.addEventListener("click", () => {
  globalHistoryPanel.hidden = true;
});
exportFilledDataBtn.addEventListener("click", exportFilledDataCsv);
backupDataBtn.addEventListener("click", exportAllDataBackup);
savedBackupsBtn.addEventListener("click", (event) => {
  if (!event.ctrlKey || !event.shiftKey) {
    return;
  }

  openSavedBackupsPanel();
});
closeSavedBackupsBtn.addEventListener("click", () => {
  savedBackupsPanel.hidden = true;
});
function updateCtrlMode(event = {}) {
  document.body.classList.toggle("is-ctrl-pressed", Boolean(event.ctrlKey));
}

document.addEventListener("keydown", (event) => {
  updateImportButtonAvailability(event);
  updateCtrlMode(event);
});
document.addEventListener("keyup", (event) => {
  updateImportButtonAvailability(event);
  updateCtrlMode(event);
});
window.addEventListener("blur", () => {
  updateImportButtonAvailability();
  updateCtrlMode();
});
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
  resetKeyInfoEditUnlock(null);
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
  resetKeyInfoEditUnlock(null);
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
  exportKeyExcel(key, selectedArchiveRecord);
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
      updateSelectedKeySets(sets);
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
  await migrateStoredPropertyAddresses();
  await optimizeStoredPhotos();
  await ensureTodaysAutomaticBackupIfLate();
  scheduleAutomaticBackup();
  updateRegistryHeader();
  updateTileViewToggle();
  updateUndoButton();
  render();
  setInterval(loadStorageFromCloud, cloudPollIntervalMs);
  setInterval(retryFailedCloudSyncs, 30000);
}

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    savePendingCloudKeys();
    syncCurrentRegistryToCloud();
  }
  else loadStorageFromCloud();
});
window.addEventListener("pagehide", () => {
  savePendingCloudKeys();
  syncCurrentRegistryToCloud();
});
window.addEventListener("online", () => {
  retryFailedCloudSyncs();
  loadStorageFromCloud();
});
window.addEventListener("resize", () => requestAnimationFrame(syncSignatureHeightToActions));

initializeApp();
