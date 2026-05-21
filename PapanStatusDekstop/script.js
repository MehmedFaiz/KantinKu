document.addEventListener('DOMContentLoaded', () => {
    // 1. Fungsi Waktu Real-time
    const updateTime = () => {
        const timeLocationElement = document.getElementById('time-location');
        const now = new Date();
        
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        
        timeLocationElement.textContent = `Update terakhir: ${hours}:${minutes} WIB • Counter Utama • Layar Publik Pembeli`;
    };

    updateTime();
    setInterval(updateTime, 60000); // Perbarui jam setiap menit

    // 2. Data State Sesuai Mockup Gambar Terakhir
    const pesananState = {
        siap: ['A021', 'A022', 'A023', 'A024', 'A025', 'A032', 'A033', 'A034'],
        proses: ['A026', 'A027', 'A037', 'A028', 'A035', 'A038'],
        tunggu: ['A029', 'A030', 'A032', 'A031', 'A036', 'A033']
    };

    // 3. Fungsi Render DOM Manipulator
    const renderPapanStatus = () => {
        // Render Angka Total secara dinamis ke Summary Box
        document.getElementById('count-siap').textContent = pesananState.siap.length;
        document.getElementById('count-proses').textContent = pesananState.proses.length;
        document.getElementById('count-tunggu').textContent = pesananState.tunggu.length;

        // Ambil elemen Container Grid
        const gridSiap = document.getElementById('grid-siap');
        const gridProses = document.getElementById('grid-proses');
        const gridTunggu = document.getElementById('grid-tunggu');

        // Loop array dan hasilkan tag HTML
        gridSiap.innerHTML = pesananState.siap.map(nomor => 
            `<div class="number-pill bg-siap text-siap">${nomor}</div>`
        ).join('');

        gridProses.innerHTML = pesananState.proses.map(nomor => 
            `<div class="number-pill bg-proses text-proses">${nomor}</div>`
        ).join('');

        gridTunggu.innerHTML = pesananState.tunggu.map(nomor => 
            `<div class="number-pill bg-tunggu text-tunggu">${nomor}</div>`
        ).join('');
    };

    // Jalankan render saat halaman pertama kali dimuat
    renderPapanStatus();
});