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