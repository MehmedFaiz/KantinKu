
'use strict';

/* ============================================================
   STATE — Kondisi aplikasi yang disimpan di satu tempat
   ============================================================ */
const state = {
  activeNav: 'akun',         // tab navigasi yang sedang aktif
  notifCount: 3,             // jumlah notifikasi belum dibaca
  notifPanelOpen: false,     // apakah panel notifikasi terbuka
  modalLogoutOpen: false,    // apakah modal logout terbuka
  toastTimer: null,          // handle setTimeout toast
  user: {
    name: 'Siti Aisyah',
    role: 'Kasir',
    shift: '07.00 - 15.00',
    kasir: 'Kasir 1',
    counter: 'Counter Utama',
  },
};

/* ============================================================
   DOM SELECTORS — query sekali, simpan referensi
   ============================================================ */
const DOM = {
  // Header
  btnNotif:     document.getElementById('btnNotif'),
  notifBadge:   document.getElementById('notifBadge'),
  // Main content
  toast:        document.getElementById('toast'),
  // Notification panel
  notifPanel:   document.getElementById('notifPanel'),
  btnCloseNotif:document.getElementById('btnCloseNotif'),
  btnClearNotif:document.getElementById('btnClearNotif'),
  notifList:    document.getElementById('notifList'),
  // Logout modal
  btnLogout:    document.getElementById('btnLogout'),
  modalLogout:  document.getElementById('modalLogout'),
  btnCancelLogout:  document.getElementById('btnCancelLogout'),
  btnConfirmLogout: document.getElementById('btnConfirmLogout'),
  // Info cards
  cardShift:    document.getElementById('cardShift'),
  cardKasir:    document.getElementById('cardKasir'),
  // Profile text
  userName:     document.getElementById('userName'),
  userRole:     document.getElementById('userRole'),
  shiftTime:    document.getElementById('shiftTime'),
  kasirName:    document.getElementById('kasirName'),
  kasirCounter: document.getElementById('kasirCounter'),
  // Bottom nav items
  navItems:     document.querySelectorAll('.bottom-nav__item'),
  // Menu buttons
  menuBtns:     document.querySelectorAll('.menu-list__btn[data-page]'),
};

/* ============================================================
   HELPER FUNCTIONS
   ============================================================ */

/**
 * Tampilkan toast notification singkat
 * @param {string} message  - teks yang ditampilkan
 * @param {'default'|'success'|'error'|'warning'} type
 * @param {number} duration - berapa ms toast tampil (default 2500)
 */
function showToast(message, type = 'default', duration = 2500) {
  const { toast } = DOM;

  // Hapus timer sebelumnya jika masih berjalan
  if (state.toastTimer) {
    clearTimeout(state.toastTimer);
    toast.classList.remove('is-visible', 'is-success', 'is-error', 'is-warning');
  }

  toast.textContent = message;
  toast.className = 'toast'; // reset classes
  if (type !== 'default') toast.classList.add(`is-${type}`);

  // Trigger reflow agar transisi berjalan walau class baru ditambah
  void toast.offsetWidth;
  toast.classList.add('is-visible');

  state.toastTimer = setTimeout(() => {
    toast.classList.remove('is-visible');
    state.toastTimer = null;
  }, duration);
}

/**
 * Update tampilan badge notifikasi sesuai state.notifCount
 */
function updateNotifBadge() {
  const { notifBadge } = DOM;
  if (state.notifCount <= 0) {
    notifBadge.classList.add('is-hidden');
    notifBadge.textContent = '0';
  } else {
    notifBadge.classList.remove('is-hidden');
    notifBadge.textContent = state.notifCount > 9 ? '9+' : String(state.notifCount);
  }
}

/**
 * Buka / tutup panel notifikasi
 */
function toggleNotifPanel(forceClose = false) {
  const { notifPanel } = DOM;

  if (forceClose || state.notifPanelOpen) {
    // Tutup panel
    notifPanel.setAttribute('hidden', '');
    state.notifPanelOpen = false;
  } else {
    // Tutup modal jika terbuka
    closeLogoutModal();
    // Buka panel
    notifPanel.removeAttribute('hidden');
    state.notifPanelOpen = true;
  }
}

/**
 * Tandai semua notifikasi sudah dibaca — manipulasi DOM
 */
function clearNotifications() {
  state.notifCount = 0;
  updateNotifBadge();

  // Hapus class unread dari semua item
  const unreadItems = DOM.notifList.querySelectorAll('.notif-item--unread');
  unreadItems.forEach(item => {
    item.classList.remove('notif-item--unread');
    const dot = item.querySelector('.notif-item__dot');
    if (dot) {
      dot.style.visibility = 'hidden';
    }
  });

  showToast('Semua notifikasi telah dibaca', 'success');

  // Tutup panel setelah delay singkat
  setTimeout(() => toggleNotifPanel(true), 800);
}

/**
 * Buka modal logout
 */
function openLogoutModal() {
  // Tutup panel notifikasi jika masih terbuka
  toggleNotifPanel(true);

  DOM.modalLogout.removeAttribute('hidden');
  state.modalLogoutOpen = true;

  // Fokus ke tombol batal untuk aksesibilitas
  setTimeout(() => DOM.btnCancelLogout.focus(), 50);
}

/**
 * Tutup modal logout
 */
function closeLogoutModal() {
  if (!state.modalLogoutOpen) return;
  DOM.modalLogout.setAttribute('hidden', '');
  state.modalLogoutOpen = false;
}

/**
 * Proses konfirmasi logout
 */
function confirmLogout() {
  closeLogoutModal();
  showToast('Mengeluarkan akun...', 'default', 1800);

  // Simulasi proses logout + redirect
  setTimeout(() => {
    showToast('Berhasil keluar. Sampai jumpa!', 'success', 2000);
    // Pada implementasi nyata: window.location.href = '/login';
  }, 1800);
}

/**
 * Ganti tab navigasi aktif — manipulasi DOM & state update
 * @param {string} navKey - nilai data-nav
 */
function setActiveNav(navKey) {
  state.activeNav = navKey;

  DOM.navItems.forEach(item => {
    const isActive = item.dataset.nav === navKey;
    item.classList.toggle('bottom-nav__item--active', isActive);
    item.setAttribute('aria-current', isActive ? 'page' : 'false');
  });
}

/**
 * Handle klik pada item menu (Profil Saya, Shift, dll.)
 * @param {string} page
 */
function handleMenuClick(page) {
  const labels = {
    profil:  'Profil Saya',
    shift:   'Shift Hari Ini',
    printer: 'Printer & Perangkat',
    bantuan: 'Bantuan',
  };
  const label = labels[page] || page;
  showToast(`Membuka ${label}…`, 'default', 1500);
  // Pada implementasi multi-halaman: navigasi ke halaman terkait
}

/**
 * Handle klik pada info card
 * @param {string} card - 'shift' | 'kasir'
 */
function handleCardClick(card) {
  if (card === 'shift') {
    showToast(`Shift aktif: ${state.user.shift}`, 'success');
  } else if (card === 'kasir') {
    showToast(`${state.user.kasir} — ${state.user.counter}`, 'default');
  }
}

/* ============================================================
   EVENT LISTENERS — semua interaksi terdaftar di sini
   ============================================================ */

/** Tombol notifikasi di header */
DOM.btnNotif.addEventListener('click', () => {
  toggleNotifPanel();
});

/** Tombol tutup panel notifikasi */
DOM.btnCloseNotif.addEventListener('click', () => {
  toggleNotifPanel(true);
});

/** Tombol "Tandai semua telah dibaca" */
DOM.btnClearNotif.addEventListener('click', clearNotifications);

/** Tombol Logout di menu */
DOM.btnLogout.addEventListener('click', openLogoutModal);

/** Tombol Batal di modal logout */
DOM.btnCancelLogout.addEventListener('click', closeLogoutModal);

/** Tombol Konfirmasi logout */
DOM.btnConfirmLogout.addEventListener('click', confirmLogout);

/** Klik di luar modal menutup modal */
DOM.modalLogout.addEventListener('click', (e) => {
  if (e.target === DOM.modalLogout) {
    closeLogoutModal();
  }
});

/** Bottom navigation — ganti tab aktif */
DOM.navItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const navKey = item.dataset.nav;
    if (!navKey) return;
    setActiveNav(navKey);

    if (navKey !== 'akun') {
      showToast(`Membuka ${item.querySelector('.bottom-nav__label').textContent}…`, 'default', 1200);
    }
  });
});

/** Menu list items */
DOM.menuBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const page = btn.dataset.page;
    handleMenuClick(page);
  });
});

/** Info card — Shift */
DOM.cardShift.addEventListener('click', () => handleCardClick('shift'));

/** Info card — Kasir */
DOM.cardKasir.addEventListener('click', () => handleCardClick('kasir'));

/** Keyboard: Escape menutup modal dan panel */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLogoutModal();
    toggleNotifPanel(true);
  }
});

/** Klik di luar panel notif menutupnya (kecuali tombol bell itu sendiri) */
document.addEventListener('click', (e) => {
  if (
    state.notifPanelOpen &&
    !DOM.notifPanel.contains(e.target) &&
    !DOM.btnNotif.contains(e.target)
  ) {
    toggleNotifPanel(true);
  }
});

/* ============================================================
   INIT — inisialisasi tampilan berdasarkan state awal
   ============================================================ */

function init() {
  // Render data user ke DOM
  DOM.userName.textContent     = state.user.name;
  DOM.userRole.textContent     = state.user.role;
  DOM.shiftTime.textContent    = state.user.shift;
  DOM.kasirName.textContent    = state.user.kasir;
  DOM.kasirCounter.textContent = state.user.counter;

  // Set badge notifikasi
  updateNotifBadge();

  // Set tab navigasi aktif
  setActiveNav(state.activeNav);

  console.log('[ProfileMobile] App initialized. State:', state);
}

// Jalankan init setelah DOM sepenuhnya siap
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}