function switchSettingsView(view) {
    document.querySelectorAll(".settingsView").forEach(view => {
        view.style.display = 'none';
    });
    document.querySelector(`#${view}`).style.display = 'block';

    if (view == 'settings-home') {
        document.querySelector("#settingsNavigation").innerText = "Home";
    } else if (view == 'settings-personalization') {
        document.querySelector("#settingsNavigation").innerText = "Home>Appearance & Personalization";
    } else if (view == 'settings-general') {
        document.querySelector("#settingsNavigation").innerText = "Home>General";
    }
}

function HideElementsToggle(checkbox, element) {
    if (checkbox.checked) {
        document.querySelector(element).style.display = "none";
    } else {
        document.querySelector(element).style.display = "";
    }
}   

function changeWallpaper(imagePath) {
    document.getElementsByTagName("body")[0].style.backgroundImage = `url('${imagePath}')`;
}