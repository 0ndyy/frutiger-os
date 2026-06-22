// CLOCK
function updateClock() {
    document.querySelector("#timeElement").innerHTML = new Date().toLocaleString("en-US", {
        month: 'short', day: '2-digit', hour: "2-digit", minute: "2-digit", hourCycle: "h23"
    });
    const now = new Date();
    const msUntilNextMinute = 60000 - (now.getSeconds() * 1000 + now.getMilliseconds());
    setTimeout(updateClock, msUntilNextMinute);
}
updateClock();


// MULTI-WINDOW DRAGGING ENGINE
function initializeWindowDragging(windowElement) {
    let initialX = 0, initialY = 0;
    let currentX = 0, currentY = 0;

    // Look specifically INSIDE this single window for its drag handle
    const dragHandle = windowElement.querySelector(".dragable-holder");

    if (dragHandle) {
        dragHandle.onmousedown = startDragging;
    } else {
        windowElement.onmousedown = startDragging;
    }

    function startDragging(e) {
        e = e || window.event;
        e.preventDefault();
        
        // Track original mouse coordinates
        initialX = e.clientX;
        initialY = e.clientY;
        
        document.onmouseup = stopDragging;
        document.onmousemove = moveWindow; // Fixed: points to the unique moving function
    }

    function moveWindow(e) { // Renamed from dragElement to prevent shadowing bugs
        e = e || window.event;
        e.preventDefault();
        
        // Calculate movement deltas
        currentX = initialX - e.clientX;
        currentY = initialY - e.clientY;
        initialX = e.clientX;
        initialY = e.clientY;
        
        // Move the window relative to its current offset
        windowElement.style.top = (windowElement.offsetTop - currentY) + "px";
        windowElement.style.left = (windowElement.offsetLeft - currentX) + "px";
    }

    function stopDragging() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// Automatically scan the DOM and activate ALL windows at once
document.querySelectorAll(".window").forEach(initializeWindowDragging);