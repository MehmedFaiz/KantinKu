document.addEventListener('DOMContentLoaded', () => {
    
    const activitiesState = [
        {
            id: 1,
            type: 'order',
            colorClass: 'green',
            icon: 'shopping_cart',
            title: 'Pesanan baru #A027 diterima',
            description: 'Meja A02 • Rp45.000',
            time: '09:42'
        },
        {
            id: 2,
            type: 'approval',
            colorClass: 'orange',
            icon: 'description',
            title: 'Menu "Korean Beef" menunggu persetujuan',
            description: 'Ditambahkan oleh Chef Budi',
            time: '09:15'
        },
        {
            id: 3,
            type: 'transaction',
            colorClass: 'green',
            icon: 'payments',
            title: 'Transaksi berhasil',
            description: 'Pembayaran via QRIS • Rp120.000', 
            time: '08:30'
        },
        {
            id: 4,
            type: 'order',
            colorClass: 'green',
            icon: 'shopping_cart',
            title: 'Pesanan baru #A026 selesai',
            description: 'Takeaway • Rp85.000',
            time: '08:15'
        }
    ];

    const activityListEl = document.getElementById('activityList');
    
    function renderActivities(data) {
        activityListEl.innerHTML = ''; 
        
        data.forEach(item => {
            const li = document.createElement('li');
            li.className = 'activity-item';
            
            li.innerHTML = `
                <div class="act-icon ${item.colorClass}">
                    <span class="material-symbols-rounded">${item.icon}</span>
                </div>
                <div class="act-details">
                    <h4 class="act-title">${item.title}</h4>
                    <p class="act-desc">${item.description}</p>
                </div>
                <div class="act-time">${item.time}</div>
            `;
            
            activityListEl.appendChild(li);
        });
    }

    renderActivities(activitiesState);

    // Navigasi Samping (Sidebar)
    const navItems = document.querySelectorAll('.side-nav .nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navItems.forEach(nav => nav.classList.remove('active'));
            e.currentTarget.classList.add('active');
        });
    });

    // Interaksi Tombol
    document.getElementById('dateFilterBtn').addEventListener('click', () => {
        alert('Kalender pemilih tanggal akan terbuka.');
    });
});