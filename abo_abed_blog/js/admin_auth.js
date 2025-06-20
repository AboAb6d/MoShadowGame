document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form'); // Assuming the form has class 'login-form'
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const secretPhraseInput = document.getElementById('secret_phrase');
    const loginStatusDiv = document.getElementById('login-status'); // Ensure this div exists in admin_login.html

    // --- Credentials ---
    const correctEmail = "mas239700@gmail.com";
    const correctPassword = "mas__1592010";
    const correctSecretKey = "MasAbed-AdminCodeLock#X59";

    if (loginForm && emailInput && passwordInput && secretPhraseInput && loginStatusDiv) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const enteredEmail = emailInput.value.trim();
            const enteredPassword = passwordInput.value.trim();
            const enteredSecretPhrase = secretPhraseInput.value.trim();

            if (enteredEmail === correctEmail && enteredPassword === correctPassword && enteredSecretPhrase === correctSecretKey) {
                loginStatusDiv.textContent = "تم تسجيل الدخول بنجاح! جاري توجيهك...";
                loginStatusDiv.className = 'login-status-message success'; // Add class for styling

                // Store login state (basic example)
                sessionStorage.setItem('isAdminLoggedIn', 'true');

                // Redirect to dashboard (placeholder for now)
                // In a real scenario, this would be the React admin panel entry point.
                // For now, let's assume a placeholder dashboard.html or redirect back to index.
                setTimeout(() => {
                    // Replace with actual dashboard URL when available
                    // For example: window.location.href = '../admin/dashboard.html';
                    // or the root of the React app if it handles admin routing.
                    // alert("سيتم الآن توجيهك إلى لوحة التحكم."); // Alert can be removed or kept for debugging
                    // The path should be relative to the current page (pages/admin_login.html)
                    // to the project root where admin_dashboard.html is located.
                    window.location.href = '../admin_dashboard.html';
                }, 1500); // Reduced timeout

            } else {
                loginStatusDiv.textContent = "بيانات الاعتماد أو العبارة السرية غير صحيحة.";
                loginStatusDiv.className = 'login-status-message error'; // Add class for styling
                sessionStorage.removeItem('isAdminLoggedIn');
            }
        });
    } else {
        console.error("Login form elements not found. Ensure IDs are correct and the script is loaded after the DOM.");
        if (!loginForm) console.error("Login form (.login-form) not found.");
        if (!emailInput) console.error("Email input (#email) not found.");
        if (!passwordInput) console.error("Password input (#password) not found.");
        if (!secretPhraseInput) console.error("Secret phrase input (#secret_phrase) not found.");
        if (!loginStatusDiv) console.error("Login status div (#login-status) not found.");
    }
});
