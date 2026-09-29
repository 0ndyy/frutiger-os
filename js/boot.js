// Run as soon as the document is parsed, don't wait for iframes!
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const bootScreen = document.getElementById('boot-screen');
        if (bootScreen) {
            bootScreen.style.opacity = '0';
            
            setTimeout(() => {
                bootScreen.style.display = 'none';
                const loginScreen = document.getElementById('login-screen');
                if (loginScreen) {
                    loginScreen.style.display = 'flex';
                    // Trigger reflow
                    void loginScreen.offsetWidth;
                    loginScreen.style.opacity = '1';
                }
            }, 1000);
        }
    }, 2500);
});

function handleLogin(e) {
    e.preventDefault();
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('login-welcome').style.display = 'block';
    
    setTimeout(() => {
        const seq = document.getElementById('boot-sequence');
        seq.style.opacity = '0';
        setTimeout(() => {
            seq.style.display = 'none';
        }, 1000);
    }, 1500);
}