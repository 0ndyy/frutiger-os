function updateClock() {
    document.querySelector("#timeElement").innerHTML = new Date().toLocaleString("en-US", {month: 'short', day: '2-digit', hour:"2-digit", minute:"2-digit", hourCycle:"h23"});
    const now = new Date();
    const msUntilNextMinute = 60000 - (now.getSeconds() * 1000 + now.getMilliseconds());
    setTimeout(updateClock, msUntilNextMinute);
}

updateClock();