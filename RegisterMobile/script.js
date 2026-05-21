document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm');
    const menuBtn = document.getElementById('menuBtn');

    // State untuk form
    let formState = {
        nama: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        role: ''
    };

    // Event listener untuk tombol menu (Interaksi sederhana)
    menuBtn.addEventListener('click', () => {
        alert('Menu navigasi diklik!');
    });

    // Helper function untuk validasi
    const showError = (inputId, message) => {
        const input = document.getElementById(inputId);
        const errorSpan = document.getElementById(`error-${inputId}`);
        input.classList.add('is-invalid');
        errorSpan.textContent = message;
    };

    const clearErrors = () => {
        document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    };

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    // Event listener saat form di-submit
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Mencegah reload halaman
        clearErrors();

        let isValid = true;

        // Update state
        formState.nama = document.getElementById('nama').value.trim();
        formState.email = document.getElementById('email').value.trim();
        formState.phone = document.getElementById('phone').value.trim();
        formState.password = document.getElementById('password').value;
        formState.confirmPassword = document.getElementById('confirm-password').value;
        formState.role = document.getElementById('role').value;

        // DOM Manipulation & Validation Logic
        if (!formState.nama) {
            showError('nama', 'Nama lengkap wajib diisi');
            isValid = false;
        }

        if (!validateEmail(formState.email)) {
            showError('email', 'Format email tidak valid');
            isValid = false;
        }

        if (!formState.phone) {
            showError('phone', 'Nomor handphone wajib diisi');
            isValid = false;
        }

        if (formState.password.length < 6) {
            showError('password', 'Password minimal 6 karakter');
            isValid = false;
        }

        if (formState.password !== formState.confirmPassword) {
            showError('confirm-password', 'Konfirmasi password tidak cocok');
            isValid = false;
        }

        if (!formState.role) {
            showError('role', 'Silakan pilih role Anda');
            isValid = false;
        }

        // Status mapping and visual feedback
        if (isValid) {
            const btn = document.getElementById('submitBtn');
            const originalText = btn.textContent;
            
            btn.textContent = 'Memproses...';
            btn.style.opacity = '0.7';
            btn.disabled = true;

            // Simulasi API Call
            setTimeout(() => {
                alert(`Pendaftaran berhasil untuk: ${formState.nama} sebagai ${formState.role}`);
                form.reset();
                btn.textContent = originalText;
                btn.style.opacity = '1';
                btn.disabled = false;
            }, 1500);
        }
    });
});