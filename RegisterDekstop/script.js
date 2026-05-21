document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm');

    // State penyimpan data input
    let formState = {
        nama: '', email: '', phone: '',
        password: '', confirmPassword: '', role: '', terms: false
    };

    // Fungsi helper memunculkan error pada DOM
    const showError = (inputId, message) => {
        const input = document.getElementById(inputId);
        const errorSpan = document.getElementById(`error-${inputId}`);
        input.classList.add('is-invalid');
        errorSpan.textContent = message;
    };

    // Fungsi helper membersihkan status error sebelumnya
    const clearErrors = () => {
        document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    };

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    // Interaksi Event Listener saat tombol Daftar ditekan
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Mencegah reload halaman standar
        clearErrors();
        let isValid = true;

        // Memperbarui State
        formState.nama = document.getElementById('nama').value.trim();
        formState.email = document.getElementById('email').value.trim();
        formState.phone = document.getElementById('phone').value.trim();
        formState.password = document.getElementById('password').value;
        formState.confirmPassword = document.getElementById('confirm-password').value;
        formState.role = document.getElementById('role').value;
        formState.terms = document.getElementById('terms').checked;

        // Pengecekan Validasi
        if (!formState.nama) { showError('nama', 'Nama lengkap wajib diisi'); isValid = false; }
        if (!validateEmail(formState.email)) { showError('email', 'Format email tidak valid'); isValid = false; }
        if (!formState.phone) { showError('phone', 'Nomor handphone wajib diisi'); isValid = false; }
        if (formState.password.length < 6) { showError('password', 'Password minimal 6 karakter'); isValid = false; }
        if (formState.password !== formState.confirmPassword) { showError('confirm-password', 'Konfirmasi password tidak cocok'); isValid = false; }
        if (!formState.role) { showError('role', 'Silakan pilih role'); isValid = false; }
        if (!formState.terms) { 
            document.getElementById('error-terms').textContent = 'Anda harus menyetujui syarat & ketentuan';
            isValid = false; 
        }

        // Jika semua valid, jalankan simulasi pengiriman data
        if (isValid) {
            const btn = document.getElementById('submitBtn');
            const originalText = btn.textContent;
            
            // Ubah Status Tombol (Loading DOM Manipulation)
            btn.textContent = 'Memproses...';
            btn.style.backgroundColor = '#9CA3AF'; // Warna abu-abu
            btn.style.cursor = 'not-allowed';
            btn.disabled = true;

            // Simulasi proses delay server
            setTimeout(() => {
                alert(`Pendaftaran Berhasil!\nSelamat datang, ${formState.nama} (${formState.role}).`);
                form.reset(); // Bersihkan formulir
                
                // Kembalikan status tombol seperti semula
                btn.textContent = originalText;
                btn.style.backgroundColor = ''; 
                btn.style.cursor = 'pointer';
                btn.disabled = false;
            }, 1500);
        }
    });
});