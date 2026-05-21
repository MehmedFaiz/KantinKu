document.addEventListener('DOMContentLoaded', () => {
    // 1. Logika Update Jam Otomatis
    const updateTime = () => {
        const timeElement = document.getElementById('lastUpdate');
        const now = new Date();
        
        // Format jam dan menit agar selalu 2 digit (contoh: 09:05)
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        
        timeElement.textContent = `Update terakhir: ${hours}:${minutes} WIB`;
    };

    // Jalankan update waktu pertama kali
    updateTime();
    
    // Perbarui waktu setiap 1 menit (60000 ms)
    setInterval(updateTime, 60000);

    // 2. Data Simulasi Pesanan (State Management Sederhana)
    const pesananData = {
        siap: ['A021', 'A022', 'A023', 'A024', 'A025'],
        proses: ['A026', 'A027', 'A028'],
        tunggu: ['A029', 'A030', 'A031']
    };

    // 3. Fungsi DOM Manipulation untuk Render Data ke HTML
    const renderPesanan = () => {
        const siapContainer = document.getElementById('siap-container');
        const prosesContainer = document.getElementById('proses-container');
        const tungguContainer = document.getElementById('tunggu-container');

        // Render Siap Diambil
        siapContainer.innerHTML = pesananData.siap.map(nomor => 
            `<div class="number-pill pill-siap">${nomor}</div>`
        ).join('');

        // Render Sedang Diproses
        prosesContainer.innerHTML = pesananData.proses.map(nomor => 
            `<div class="number-pill pill-proses">${nomor}</div>`
        ).join('');

        // Render Menunggu
        tungguContainer.innerHTML = pesananData.tunggu.map(nomor => 
            `<div class="number-pill pill-tunggu">${nomor}</div>`
        ).join('');
    };

    // Panggil fungsi render
    renderPesanan();
});