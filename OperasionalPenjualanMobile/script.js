document.addEventListener('DOMContentLoaded', () => {
    // State Management: Store Status Toggle
    const mainStoreToggle = document.getElementById('main-store-toggle');
    const mainStatusBadge = document.getElementById('main-status-badge');
    const mainStatusText = document.getElementById('main-status-text');
    const mainStatusDot = document.getElementById('main-status-dot');
    const mainToggleLabel = document.getElementById('main-toggle-label');

    mainStoreToggle.addEventListener('change', (e) => {
        if (e.target.checked) {
            mainStatusBadge.textContent = 'Buka';
            mainStatusBadge.className = 'badge badge-green';
            mainStatusText.textContent = 'Sedang menerima pesanan online';
            mainStatusDot.style.backgroundColor = 'var(--primary)';
            mainToggleLabel.textContent = 'Buka';
            mainToggleLabel.style.color = 'var(--primary)';
        } else {
            mainStatusBadge.textContent = 'Tutup';
            mainStatusBadge.className = 'badge badge-red';
            mainStatusText.textContent = 'Toko tutup sementara';
            mainStatusDot.style.backgroundColor = '#dc3545';
            mainToggleLabel.textContent = 'Tutup';
            mainToggleLabel.style.color = '#dc3545';
        }
    });

    // Quick Close Buttons Toggle
    const timeButtons = document.querySelectorAll('.time-btn');
    timeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            timeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Menu Availability Toggles
    const menuToggles = document.querySelectorAll('.menu-toggle');
    menuToggles.forEach(toggle => {
        toggle.addEventListener('change', (e) => {
            const controlGroup = e.target.closest('.menu-controls');
            const statusBadge = controlGroup.querySelector('.status-badge');
            if (e.target.checked) {
                statusBadge.textContent = 'Tersedia';
                statusBadge.className = 'badge badge-green status-badge';
            } else {
                statusBadge.textContent = 'Habis';
                statusBadge.className = 'badge badge-gray status-badge';
            }
        });
    });
});