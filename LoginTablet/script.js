document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const togglePassBtn = document.getElementById('togglePass');
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');

    // 1. Interaksi Toggle Mata Password
    togglePassBtn.addEventListener('click', () => {
        const isPassword = passwordInput.getAttribute('type') === 'password';
        passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
        
        // Manipulasi class FontAwesome
        eyeIcon.className = isPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye';
    });

    // Fungsi Pembantu Validasi DOM
    const showError = (inputId, message) => {
        const input = document.getElementById(inputId);
        const errorSpan = document.getElementById(`error-${inputId}`);
        input.classList.add('is-invalid');
        errorSpan.textContent = message;
    };
    
    const clearErrors = () => {
        document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
        document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
    };

    // 2. Interaksi Form Submit
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        clearErrors();
        let isValid = true;

        const email = document.getElementById('email').value.trim();
        const password = passwordInput.value;

        // Validasi Email Sederhana
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            showError('email', 'Format email tidak valid');
            isValid = false;
        }

        if (!password) {
            showError('password', 'Password wajib diisi');
            isValid = false;
        }

        // Jika Lolos Validasi
        if (isValid) {
            const btnLogin = document.getElementById('btnLogin');
            const originalText = btnLogin.textContent;
            
            // State: Memproses
            btnLogin.textContent = 'Memverifikasi...';
            btnLogin.style.backgroundColor = '#9CA3AF'; // Ubah warna ke abu-abu
            btnLogin.disabled = true;

            setTimeout(() => {
                alert(`Login berhasil!\nSelamat datang kembali, ${email}`);
                
                // Revert Status
                btnLogin.textContent = originalText;
                btnLogin.style.backgroundColor = ''; 
                btnLogin.disabled = false;
                
            }, 1200);
        }
    });
});