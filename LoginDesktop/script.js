document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const togglePassBtn = document.getElementById('togglePass');
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');

    // 1. Toggle Tampilkan/Sembunyikan Password
    togglePassBtn.addEventListener('click', () => {
        const isPassword = passwordInput.getAttribute('type') === 'password';
        passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
        eyeIcon.className = isPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye';
    });

    // Fungsi Helper Validasi DOM
    const showError = (inputId, message) => {
        document.getElementById(inputId).classList.add('is-invalid');
        document.getElementById(`error-${inputId}`).textContent = message;
    };
    
    const clearErrors = () => {
        document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
        document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
    };

    // 2. State & Event Listener Form Submit
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        clearErrors();
        let isValid = true;

        // Ambil Nilai dari Input
        const email = document.getElementById('email').value.trim();
        const password = passwordInput.value;

        // Validasi Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            showError('email', 'Format email tidak valid');
            isValid = false;
        }

        // Validasi Password
        if (!password) {
            showError('password', 'Password wajib diisi');
            isValid = false;
        }

        // DOM Manipulation (Simulasi Loading State)
        if (isValid) {
            const btnLogin = document.getElementById('btnLogin');
            const originalText = btnLogin.textContent;
            
            btnLogin.textContent = 'Memverifikasi...';
            btnLogin.style.backgroundColor = '#9CA3AF'; // Warna loading abu-abu
            btnLogin.disabled = true;

            // Simulasi proses autentikasi server (1.5 detik)
            setTimeout(() => {
                alert(`Login berhasil untuk akun:\n${email}`);
                
                // Reset State
                btnLogin.textContent = originalText;
                btnLogin.style.backgroundColor = ''; // Kembali ke CSS asli
                btnLogin.disabled = false;
                
                // Biasanya di sini dilakukan redirect (window.location.href)
            }, 1500);
        }
    });
});