function switchSettingsSection(sectionId) {
    document.querySelectorAll('.settings-section').forEach(section => {
        section.style.display = 'none';
    });
    
    document.querySelectorAll('.settings-nav-item').forEach(item => {
        item.classList.remove('active');
    });

    document.getElementById(`settings-${sectionId}`).style.display = 'block';
    
    const eventTarget = event.currentTarget;
    if (eventTarget) {
        eventTarget.classList.add('active');
    }
}

const originalUpdateTaskbar = updateTaskbar;
updateTaskbar = function() {
    originalUpdateTaskbar();
    
    document.querySelectorAll(".window").forEach(win => {
        if (win.classList.contains("settings")) {
            const container = document.querySelector("#taskbar-items-container");
            const btn = Array.from(container.querySelectorAll(".taskbar-item")).find(b => b.innerHTML.includes("Control Panel"));
            if (btn) {
                btn.querySelector("img").src = "./res/icons/app/personalization.ico";
            }
        }
    });
};