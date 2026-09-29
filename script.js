//------------------CLOCK------------------
function updateClock() {
    document.querySelector("#timeElement").innerHTML = new Date().toLocaleString("en-US", {
        month: 'short', day: '2-digit', hour: "2-digit", minute: "2-digit", hourCycle: "h23"
    });
    const now = new Date();
    const msUntilNextMinute = 60000 - (now.getSeconds() * 1000 + now.getMilliseconds());
    setTimeout(updateClock, msUntilNextMinute);
}
updateClock();


//------------------WINDOW LOGIC------------------
function initializeWindowDragging(windowElement) {
    let initialX = 0, initialY = 0;
    let currentX = 0, currentY = 0;

    const dragHandle = windowElement.querySelector(".dragable-holder");

    if (dragHandle) {
        dragHandle.onmousedown = startDragging;
    } else {
        windowElement.onmousedown = startDragging;
    }

    function startDragging(e) {
        e = e || window.event;
        e.preventDefault();
        
        initialX = e.clientX;
        initialY = e.clientY;
        
        document.onmouseup = stopDragging;
        document.onmousemove = moveWindow; 
    }

    function moveWindow(e) {
        e = e || window.event;
        e.preventDefault();
        
        currentX = initialX - e.clientX;
        currentY = initialY - e.clientY;
        initialX = e.clientX;
        initialY = e.clientY;
        
        windowElement.style.top = (windowElement.offsetTop - currentY) + "px";
        windowElement.style.left = (windowElement.offsetLeft - currentX) + "px";
    }

    function stopDragging() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
document.querySelectorAll(".window").forEach(initializeWindowDragging);

var biggestIndex = 1;

function addWindowTapHandling(element) {
  element.addEventListener("mousedown", () =>
    handleWindowTap(element)
  )
}
document.querySelectorAll(".window").forEach(addWindowTapHandling);

function initializeWindowButtons(windowElement){
    const btnMin = windowElement.querySelector(".min");
    const btnMax = windowElement.querySelector(".max");
    const btnClose = windowElement.querySelector(".close");

    btnMin.addEventListener("click", function() {
        minWindow(windowElement);
    });
    btnMax.addEventListener("click", function() {
        maxWindow(windowElement);
    });
    btnClose.addEventListener("click", function() {
        closeWindow(windowElement);
    });
}
document.querySelectorAll(".window").forEach(initializeWindowButtons);

function handleWindow(queryClass, action) {
    const queriedElement = document.querySelector(queryClass);
    
    if (!queriedElement) return; 

    if(action == "open"){
        openWindow(queriedElement);
    }
    else if(action == "close"){
        closeWindow(queriedElement);
    }
    else if(action == "min"){
        minWindow(queriedElement);
    }
    else if(action == "max"){
        maxWindow(queriedElement);
    }
}


//------------------TASKBAR ENGINE------------------
function updateTaskbar() {
    const container = document.querySelector("#taskbar-items-container");
    if (!container) return;
    container.innerHTML = "";

    document.querySelectorAll(".window").forEach(win => {
        if (win.style.display === "none" && win.dataset.closed === "true") {
            return;
        }
        
        if (win.style.display === "none" && !win.dataset.state) {
            return;
        }

        const title = win.querySelector(".aero-title")?.innerText || "Window";
        const isMinimized = win.style.display === "none";
        const isFocused = !isMinimized && parseInt(win.style.zIndex || 0) === biggestIndex;
        
        let iconSrc = "./res/icons/app/welcome.png";
        if (win.classList.contains("notepad")) iconSrc = "./res/icons/app/notepad.webp";
        if (win.classList.contains("settings")) iconSrc = "./res/icons/app/computer.ico";
        if (win.classList.contains("paint")) iconSrc = "./res/icons/app/paint.png";
        if (win.classList.contains("music")) iconSrc = "./res/icons/app/mediaplayer.webp";
        if (win.classList.contains("games")) iconSrc = "./res/icons/app/ybox.png";
        if (win.classList.contains("browser")) iconSrc = "/res/icons/app/internet.ico";

        const btn = document.createElement("button");
        btn.className = "taskbar-item";
        
        if (isFocused) {
            btn.classList.add("active");
        }

        if (!isMinimized) {
            btn.classList.add("expanded");
            btn.innerHTML = `<img src="${iconSrc}"><span>${title}</span>`;
        } else {
            btn.innerHTML = `<img src="${iconSrc}">`;
        }
        
        btn.onclick = () => {
            if (isMinimized) {
                openWindow(win);
            } else if (isFocused) {
                minWindow(win);
            } else {
                handleWindowTap(win);
                updateTaskbar();
            }
        };

        container.appendChild(btn);
    });
}

function handleWindowTap(element) {
    biggestIndex++;
    element.style.zIndex = biggestIndex;
    updateTaskbar();
}

function closeWindow(element) {
    element.style.display = "none";
    element.dataset.closed = "true"; 
    element.style.top = "50%";
    element.style.left = "50%";
    element.style.transform = "translate(-50%, -50%)";
    element.style.width = "";
    element.style.height = "";
    updateTaskbar();
}

function minWindow(element) {
    element.style.display = "none";
    updateTaskbar();
}

function maxWindow(element) {
    element.style.top = "50%";
    element.style.left = "50%";
    element.style.transform = "translate(-50%, -50%)";
    if (element.style.width === "100%") {
        element.style.width = "";
        element.style.height = "";
    } else {
        element.style.width = "100%";
        element.style.height = "100%";
    }
}

function openWindow(element) {
    element.style.display = "flex";
    element.dataset.closed = "false";
    element.dataset.state = "active";
    biggestIndex++; 
    element.style.zIndex = biggestIndex;
    updateTaskbar();
}

updateTaskbar();



document.addEventListener('DOMContentLoaded', () => {
    const apps = document.querySelectorAll('.desktopApp');
    const positions = [];
    
    apps.forEach(app => {
        const rect = app.getBoundingClientRect();
        positions.push({ left: rect.left, top: rect.top });
    });
    
    apps.forEach((app, index) => {
        app.style.left = positions[index].left + 'px';
        app.style.top = positions[index].top + 'px';
        app.classList.add('absolute');
        
        const originalOnClick = app.getAttribute('onclick');
        if (originalOnClick) {
            app.removeAttribute('onclick');
            app.addEventListener('click', (e) => {
                if (hasDraggedIcon) {
                    e.preventDefault();
                    e.stopPropagation();
                } else {
                    new Function(originalOnClick).call(app);
                }
            });
        }
    });
});

let selectionBox = document.getElementById('selection-box');
if (!selectionBox) {
    selectionBox = document.createElement('div');
    selectionBox.id = 'selection-box';
    document.body.appendChild(selectionBox);
}

let isSelecting = false;
let isDraggingIcon = false;
let activeIcon = null;
let startX, startY;
let iconStartX, iconStartY;
let hasDraggedIcon = false;

document.addEventListener('mousedown', (e) => {
    const clickedIcon = e.target.closest('.desktopApp');
    if (clickedIcon) {
        isDraggingIcon = true;
        activeIcon = clickedIcon;
        startX = e.clientX;
        startY = e.clientY;
        iconStartX = parseInt(clickedIcon.style.left || 0, 10);
        iconStartY = parseInt(clickedIcon.style.top || 0, 10);
        hasDraggedIcon = false;
        
        if (!clickedIcon.classList.contains('selected')) {
            document.querySelectorAll('.desktopApp').forEach(a => a.classList.remove('selected'));
        }
        clickedIcon.classList.add('selected');
        return;
    }
    
    if (!e.target.closest('.window') && !e.target.closest('.taskbar') && !e.target.closest('.menu-bar')) {
        isSelecting = true;
        startX = e.clientX;
        startY = e.clientY;
        
        selectionBox.style.display = 'block';
        selectionBox.style.left = startX + 'px';
        selectionBox.style.top = startY + 'px';
        selectionBox.style.width = '0px';
        selectionBox.style.height = '0px';
        
        document.querySelectorAll('.desktopApp').forEach(app => app.classList.remove('selected'));
    }
});

document.addEventListener('mousemove', (e) => {
    if (isSelecting) {
        const currentX = e.clientX;
        const currentY = e.clientY;
        
        const left = Math.min(startX, currentX);
        const top = Math.min(startY, currentY);
        const width = Math.abs(currentX - startX);
        const height = Math.abs(currentY - startY);
        
        selectionBox.style.left = left + 'px';
        selectionBox.style.top = top + 'px';
        selectionBox.style.width = width + 'px';
        selectionBox.style.height = height + 'px';
        
        document.querySelectorAll('.desktopApp').forEach(app => {
            const rect = app.getBoundingClientRect();
            const isIntersecting = !(
                rect.right < left ||
                rect.left > left + width ||
                rect.bottom < top ||
                rect.top > top + height
            );
            
            if (isIntersecting) {
                app.classList.add('selected');
            } else {
                app.classList.remove('selected');
            }
        });
    }
    
    if (isDraggingIcon && activeIcon) {
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
            hasDraggedIcon = true;
        }
        
        if (hasDraggedIcon) {
            activeIcon.style.left = (iconStartX + dx) + 'px';
            activeIcon.style.top = (iconStartY + dy) + 'px';
        }
    }
});

document.addEventListener('mouseup', () => {
    if (isSelecting) {
        isSelecting = false;
        selectionBox.style.display = 'none';
    }
    if (isDraggingIcon) {
        isDraggingIcon = false;
        activeIcon = null;
        setTimeout(() => { 
            hasDraggedIcon = false; 
        }, 100);
    }
});



// BOOT
const bootSound = new Audio('./res/audio/boot.mp3');
const logonSound = new Audio('./res/audio/logon.mp3');

setTimeout(() => {
    const bootScreen = document.getElementById('boot-screen');
    if (bootScreen) {
        bootScreen.style.opacity = '0';
        
        setTimeout(() => {
            bootScreen.style.display = 'none';
            const loginScreen = document.getElementById('login-screen');
            if (loginScreen) {
                loginScreen.style.display = 'flex';
                void loginScreen.offsetWidth;
                loginScreen.style.opacity = '1';
            }
        }, 1000);
        logonSound.play();
    }
}, 4000); 

function handleLogin(e) {
    e.preventDefault();
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('login-welcome').style.display = 'block';
    
    setTimeout(() => {
        const seq = document.getElementById('boot-sequence');
        seq.style.opacity = '0';
        setTimeout(() => {
            seq.style.display = 'none';
            bootSound.play();
        }, 1000);
    }, 3000);
    
}