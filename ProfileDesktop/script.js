'use strict';

const state = {
  activeNav: 'akun',
  notifCount: 3,
  modalLogoutOpen: false,
  toastTimer: null,
  user: {
    name: 'Siti Aisyah',
    role: 'Kasir',
    shift: '07.00 - 15.00',
    kasir: 'Kasir 1',
    counter: 'Counter Utama',
  },
};

const DOM = {
  btnNotif: document.getElementById('btnNotif'),
  notifBadge: document.getElementById('notifBadge'),
  toast: document.getElementById('toast'),
  btnLogout: document.getElementById('btnLogout'),
  modalLogout: document.getElementById('modalLogout'),
  btnCancelLogout: document.getElementById('btnCancelLogout'),
  btnConfirmLogout: document.getElementById('btnConfirmLogout'),
  cardShift: document.getElementById('cardShift'),
  cardKasir: document.getElementById('cardKasir'),
  userName: document.getElementById('userName'),
  userRole: document.getElementById('userRole'),
  shiftTime: document.getElementById('shiftTime'),
  kasirName: document.getElementById('kasirName'),
  kasirCounter: document.getElementById('kasirCounter'),
  navItems: document.querySelectorAll('.sidebar__item'),
  menuBtns: document.querySelectorAll('.menu-list__btn[data-page]'),
};

function showToast(message, type = 'default', duration = 2500) {
  const { toast } = DOM;
  if (state.toastTimer) {
    clearTimeout(state.toastTimer);
    toast.classList.remove('is-visible', 'is-success', 'is-error', 'is-warning');
  }
  toast.textContent = message;
  toast.className = 'toast';
  if (type !== 'default') toast.classList.add(`is-${type}`);
  
  // Trigger reflow
  void toast.offsetWidth; 
  toast.classList.add('is-visible');
  
  state.toastTimer = setTimeout(() => {
    toast.classList.remove('is-visible');
    state.toastTimer = null;
  }, duration);
}

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

function openLogoutModal() {
  DOM.modalLogout.removeAttribute('hidden');
  state.modalLogoutOpen = true;
}

function closeLogoutModal() {
  if (!state.modalLogoutOpen) return;
  DOM.modalLogout.setAttribute('hidden', '');
  state.modalLogoutOpen = false;
}

function setActiveNav(navKey) {
  state.activeNav = navKey;
  DOM.navItems.forEach(item => {
    const isActive = item.dataset.nav === navKey;
    item.classList.toggle('sidebar__item--active', isActive);
    item.setAttribute('aria-current', isActive ? 'page' : 'false');
  });
}

// Event Listeners
DOM.btnNotif.addEventListener('click', () => {
  showToast('Notifikasi Web di-klik!', 'default');
});

DOM.btnLogout.addEventListener('click', openLogoutModal);
DOM.btnCancelLogout.addEventListener('click', closeLogoutModal);
DOM.btnConfirmLogout.addEventListener('click', () => {
  closeLogoutModal();
  showToast('Keluar akun...', 'default');
});

DOM.modalLogout.addEventListener('click', (e) => {
  if (e.target === DOM.modalLogout) closeLogoutModal();
});

DOM.navItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const navKey = item.dataset.nav;
    if (!navKey) return;
    setActiveNav(navKey);
  });
});

DOM.menuBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    showToast(`Membuka halaman ${btn.dataset.page}...`, 'default');
  });
});

DOM.cardShift.addEventListener('click', () => showToast(`Shift aktif: ${state.user.shift}`, 'success'));
DOM.cardKasir.addEventListener('click', () => showToast(`${state.user.kasir} — ${state.user.counter}`, 'default'));

function init() {
  DOM.userName.textContent = state.user.name;
  DOM.userRole.textContent = state.user.role;
  DOM.shiftTime.textContent = state.user.shift;
  DOM.kasirName.textContent = state.user.kasir;
  DOM.kasirCounter.textContent = state.user.counter;
  
  updateNotifBadge();
  setActiveNav(state.activeNav);
}

document.addEventListener('DOMContentLoaded', init);