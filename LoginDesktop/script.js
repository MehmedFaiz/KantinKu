document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const togglePassBtn = document.getElementById('togglePass');
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');

    togglePassBtn.addEventListener('click', () => {
        const isPassword = passwordInput.getAttribute('type') === 'password';
        passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
        eyeIcon.className = isPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye';
    });

    const showError = (inputId, message) => {
        document.getElementById(inputId).classList.add('is-invalid');
        document.getElementById(`error-${inputId}`).textContent = message;
    };
    
    const clearErrors = () => {
        document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
        document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
    };

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        clearErrors();

        let isValid = true;

        const email = document.getElementById('email').value.trim();
        const password = passwordInput.value;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !emailRegex.test(email)) {
            showError('email', 'Format email tidak valid');
            isValid = false;
        }

        if (!password) {
            showError('password', 'Password wajib diisi');
            isValid = false;
        }

        if (isValid) {
            const btnLogin = document.getElementById('btnLogin');

            btnLogin.textContent = 'Memverifikasi...';
            btnLogin.style.backgroundColor = '#9CA3AF';
            btnLogin.disabled = true;

            setTimeout(() => {
                window.location.href = "../DashboardAdminDesktop/";
            }, 1500);
        }
    });
});
