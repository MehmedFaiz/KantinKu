document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm');

    // State object
    let formState = {
        nama: '', email: '', phone: '',
        password: '', confirmPassword: '', role: '', terms: false
    };

    // Helper: Tampilkan Error
    const showError = (inputId, message) => {
        const input = document.getElementById(inputId);
        const errorSpan = document.getElementById(`error-${inputId}`);
        input.classList.add('is-invalid');
        errorSpan.textContent = message;
    };

    // Helper: Bersihkan Error
    const clearErrors = () => {
        document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    };

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    // Event Listener untuk Submit (Manipulasi DOM & Validasi)
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        clearErrors();
        let isValid = true;

        // Update State dari DOM
        formState.nama = document.getElementById('nama').value.trim();
        formState.email = document.getElementById('email').value.trim();
        formState.phone = document.getElementById('phone').value.trim();
        formState.password = document.getElementById('password').value;
        formState.confirmPassword = document.getElementById('confirm-password').value;
        formState.role = document.getElementById('role').value;
        formState.terms = document.getElementById('terms').checked;

        // Validasi
        if (!formState.nama) { showError('nama', 'Nama lengkap wajib diisi'); isValid = false; }
        if (!validateEmail(formState.email)) { showError('email', 'Format email tidak valid'); isValid = false; }
        if (!formState.phone) { showError('phone', 'Nomor handphone wajib diisi'); isValid = false; }
        if (formState.password.length < 6) { showError('password', 'Password minimal 6 karakter'); isValid = false; }
        if (formState.password !== formState.confirmPassword) { showError('confirm-password', 'Password tidak cocok'); isValid = false; }
        if (!formState.role) { showError('role', 'Silakan pilih role'); isValid = false; }
        if (!formState.terms) { 
            document.getElementById('error-terms').textContent = 'Anda harus menyetujui syarat & ketentuan';
            isValid = false; 
        }

        // Status Mapping (Sukses)
        if (isValid) {
            const btn = document.getElementById('submitBtn');
            const originalText = btn.textContent;
            
            // UI State Change: Loading
            btn.textContent = 'Memproses...';
            btn.style.backgroundColor = '#6B7280'; // Grayed out
            btn.disabled = true;

            // Simulasi proses asinkron
            setTimeout(() => {
                alert(`Registrasi Berhasil!\nNama: ${formState.nama}\nRole: ${formState.role}`);
                form.reset();
                btn.textContent = originalText;
                btn.style.backgroundColor = ''; // Revert to CSS
                btn.disabled = false;
            }, 1200);
        }
    });
});