document.addEventListener('DOMContentLoaded', () => {
    // 1. Fungsi Update Waktu Dinamis
    const updateTime = () => {
        const timeLocationElement = document.getElementById('time-location');
        const now = new Date();
        
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        
        timeLocationElement.textContent = `Update terakhir: ${hours}:${minutes} WIB • Lokasi: Counter Utama`;
    };

    updateTime();
    setInterval(updateTime, 60000); // Update setiap 1 menit

    // 2. State Data Pesanan Sesuai Gambar
    const pesananState = {
        siap: ['A021', 'A022', 'A023', 'A024', 'A025'],
        proses: ['A026', 'A027', 'A028'],
        tunggu: ['A029', 'A030', 'A031']
    };

    // 3. Fungsi Render DOM
    const renderPapanStatus = () => {
        // --- A. Render Angka Summary Row ---
        document.getElementById('count-siap').textContent = pesananState.siap.length;
        document.getElementById('count-proses').textContent = pesananState.proses.length;
        document.getElementById('count-tunggu').textContent = pesananState.tunggu.length;

        // --- B. Render Grid Nomor Antrean ---
        const gridSiap = document.getElementById('grid-siap');
        const gridProses = document.getElementById('grid-proses');
        const gridTunggu = document.getElementById('grid-tunggu');

        // Map data array menjadi elemen HTML
        gridSiap.innerHTML = pesananState.siap.map(nomor => 
            `<div class="number-pill pill-siap">${nomor}</div>`
        ).join('');

        gridProses.innerHTML = pesananState.proses.map(nomor => 
            `<div class="number-pill pill-proses">${nomor}</div>`
        ).join('');

        gridTunggu.innerHTML = pesananState.tunggu.map(nomor => 
            `<div class="number-pill pill-tunggu">${nomor}</div>`
        ).join('');
    };

    // Jalankan render awal
    renderPapanStatus();

    // Opsional: Simulasi perubahan status (Hapus komentar jika ingin dicoba)
    /*
    setTimeout(() => {
        // Pindahkan A026 dari proses ke siap
        const pesananSelesai = pesananState.proses.shift();
        pesananState.siap.push(pesananSelesai);
        
        // Pindahkan A029 dari tunggu ke proses
        const pesananDiproses = pesananState.tunggu.shift();
        pesananState.proses.push(pesananDiproses);
        
        // Update DOM
        renderPapanStatus();
    }, 5000);
    */
});