document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const togglePassBtn = document.getElementById('togglePass');
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');

    // 1. Interaksi State: Toggle Visibilitas Password
    togglePassBtn.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Ubah icon mata
        if(type === 'text') {
            eyeIcon.classList.remove('fa-eye');
            eyeIcon.classList.add('fa-eye-slash');
        } else {
            eyeIcon.classList.remove('fa-eye-slash');
            eyeIcon.classList.add('fa-eye');
        }
    });

    // Helper Validasi
    const showError = (id, message) => {
        document.getElementById(id).classList.add('is-invalid');
        document.getElementById(`error-${id}`).textContent = message;
    };
    
    const clearErrors = () => {
        document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
        document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
    };

    // 2. Event Listener Form Submit & DOM Manipulation
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        clearErrors();
        let isValid = true;

        // Ambil State Value
        const email = document.getElementById('email').value.trim();
        const password = passwordInput.value;
        const role = document.getElementById('role').value;

        // Validasi Sederhana
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showError('email', 'Format email tidak valid');
            isValid = false;
        }
        if (!password) {
            showError('password', 'Password tidak boleh kosong');
            isValid = false;
        }
        if (!role) {
            showError('role', 'Silakan pilih peran Anda');
            isValid = false;
        }

        // Simulasi Login Sukses
        if (isValid) {
            const btn = document.getElementById('btnLogin');
            const originalText = btn.textContent;
            
            btn.textContent = 'Memverifikasi...';
            btn.style.opacity = '0.7';
            btn.disabled = true;

            setTimeout(() => {
                alert(`Login berhasil!\nSelamat datang, ${email}.\nAkses: ${role.toUpperCase()}`);
                // Reset form dan tombol
                btn.textContent = originalText;
                btn.style.opacity = '1';
                btn.disabled = false;
            }, 1200);
        }
    });
});