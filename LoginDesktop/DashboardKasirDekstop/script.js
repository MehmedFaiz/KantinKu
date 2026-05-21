document.addEventListener('DOMContentLoaded', () => {

    // 1. Interaksi Pencarian (Event Listener)
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            alert(`Sistem sedang mencari: "${searchInput.value}"`);
        }
    });

    // 2. Interaksi Tombol Transaksi Baru
    const btnTransaksi = document.getElementById('btn-transaksi');
    btnTransaksi.addEventListener('click', () => {
        alert("Membuka jendela Kasir/Point of Sales...");
    });

    // 3. State Data Pesanan Aktif
    const pesananData = [
        { id: "#A028", waktu: "11:28", menu: "Nasi Ayam Geprek, Es Teh", status: "Menunggu", classStyle: "row-yellow" },
        { id: "#A029", waktu: "11:26", menu: "Mie Goreng, Air Mineral", status: "Diproses", classStyle: "row-blue" },
        { id: "#A030", waktu: "11:20", menu: "Bubur Ayam, Teh Hangat", status: "Siap", classStyle: "row-green" }
    ];

    // 4. State Data Notifikasi
    const notifData = [
        { title: "Nasi Ayam Geprek hampir habis", sub: "Stok tersisa 10 porsi", type: "!", classStyle: "notif-red" },
        { title: "Es Teh Manis hampir habis", sub: "Stok tersisa 7 gelas", type: "!", classStyle: "notif-yellow" },
        { title: "Pesanan #A025 selesai", sub: "Siap diambil", type: "!", classStyle: "notif-green" }
    ];

    // 5. DOM Manipulation: Render Data ke HTML
    const renderData = () => {
        // Render Pesanan
        const ordersContainer = document.getElementById('orders-container');
        ordersContainer.innerHTML = pesananData.map(order => `
            <div class="order-row ${order.classStyle}">
                <div class="order-id">${order.id}</div>
                <div class="order-time">${order.waktu}</div>
                <div class="order-menu">${order.menu}</div>
                <div class="order-status">${order.status}</div>
            </div>
        `).join('');

        // Render Notifikasi
        const notifContainer = document.getElementById('notif-container');
        notifContainer.innerHTML = notifData.map(notif => `
            <div class="notif-row ${notif.classStyle}">
                <div class="notif-icon">${notif.type}</div>
                <div class="notif-text">
                    <h4>${notif.title}</h4>
                    <p>${notif.sub}</p>
                </div>
            </div>
        `).join('');
    };

    // Jalankan render awal
    renderData();
});