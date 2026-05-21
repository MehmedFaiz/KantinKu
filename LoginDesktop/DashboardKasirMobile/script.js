document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Event Listener untuk tombol utama
    const btnTransaksi = document.getElementById('btn-transaksi');
    btnTransaksi.addEventListener('click', () => {
        // Manipulasi DOM sederhana untuk simulasi interaksi
        const originalText = btnTransaksi.textContent;
        btnTransaksi.textContent = "Membuka Kasir...";
        btnTransaksi.style.opacity = "0.7";
        
        setTimeout(() => {
            alert("Sistem mengarahkan Anda ke halaman Input Transaksi POS.");
            btnTransaksi.textContent = originalText;
            btnTransaksi.style.opacity = "1";
        }, 800);
    });

    // 2. Data State untuk Pesanan Aktif (Sesuai Gambar)
    const pesananAktif = [
        { id: "#A028", waktu: "11:28", menu: "Nasi Ayam Geprek, Es Teh", status: "Menunggu", kelas: "status-menunggu" },
        { id: "#A029", waktu: "11:26", menu: "Mie Goreng, Air Mineral", status: "Diproses", kelas: "status-diproses" },
        { id: "#A030", waktu: "11:20", menu: "Bubur Ayam, Teh Hangat", status: "Siap", kelas: "status-siap" }
    ];

    // 3. Render Data ke dalam HTML (DOM Manipulation)
    const orderContainer = document.getElementById('order-container');
    
    const renderOrders = () => {
        orderContainer.innerHTML = ''; // Bersihkan container
        
        pesananAktif.forEach(pesanan => {
            // Pembuatan elemen untuk setiap item pesanan
            const orderDiv = document.createElement('div');
            orderDiv.className = 'order-item';
            
            orderDiv.innerHTML = `
                <div class="order-info">
                    <span class="order-id">${pesanan.id}</span>
                    <span class="order-time">${pesanan.waktu}</span>
                </div>
                <div class="order-menu">${pesanan.menu}</div>
                <div class="badge-status ${pesanan.kelas}">${pesanan.status}</div>
            `;
            
            orderContainer.appendChild(orderDiv);
        });
    };

    // Jalankan fungsi render
    renderOrders();
});