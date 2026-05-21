document.addEventListener('DOMContentLoaded', () => {

    // 1. Interaksi Tombol Transaksi Baru
    const btnTransaksi = document.getElementById('btn-transaksi');
    btnTransaksi.addEventListener('click', () => {
        alert("Menginisialisasi terminal kasir...");
    });

    // 2. State Data Pesanan
    const pesananData = [
        { id: "#A028", waktu: "11:28", menu: "Nasi Ayam Geprek, Es Teh", status: "Menunggu", classStyle: "row-yellow" },
        { id: "#A029", waktu: "11:26", menu: "Mie Goreng, Air Mineral", status: "Diproses", classStyle: "row-blue" },
        { id: "#A030", waktu: "11:20", menu: "Bubur Ayam", status: "Siap", classStyle: "row-green" },
        { id: "#A031", waktu: "11:15", menu: "Es Teh Manis", status: "Siap", classStyle: "row-green" }
    ];

    // 3. State Data Notifikasi
    const notifData = [
        { title: "Nasi Ayam Geprek hampir habis", sub: "Stok tersisa 10 porsi", type: "!", classStyle: "notif-red" },
        { title: "Es Teh Manis hampir habis", sub: "Stok tersisa 7 gelas", type: "!", classStyle: "notif-yellow" },
        { title: "Pesanan #A025 selesai", sub: "Siap diambil", type: "!", classStyle: "notif-green" }
    ];

    // 4. Render Pesanan (DOM Manipulation)
    const renderOrders = () => {
        const container = document.getElementById('orders-container');
        container.innerHTML = pesananData.map(order => `
            <div class="order-row ${order.classStyle}">
                <div class="order-id">${order.id}</div>
                <div class="order-time">${order.waktu}</div>
                <div class="order-menu">${order.menu}</div>
                <div class="order-status">${order.status}</div>
            </div>
        `).join('');
    };

    // 5. Render Notifikasi (DOM Manipulation)
    const renderNotifs = () => {
        const container = document.getElementById('notif-container');
        container.innerHTML = notifData.map(notif => `
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
    renderOrders();
    renderNotifs();
});