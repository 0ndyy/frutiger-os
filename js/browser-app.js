let browserTabs = [
    { id: 1, url: "https://www.google.com/webhp?igu=1" }
];
let currentBrowserTabId = 1;
let tabIdCounter = 1;

function renderBrowserTabs() {
    const container = document.getElementById('browser-tabs-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    browserTabs.forEach((tab, index) => {
        const tabEl = document.createElement('div');
        tabEl.className = `browser-tab ${tab.id === currentBrowserTabId ? 'active' : ''}`;
        tabEl.onclick = (e) => {
            if (!e.target.classList.contains('browser-close-tab')) {
                switchBrowserTab(tab.id);
            }
        };
        
        const titleSpan = document.createElement('span');
        titleSpan.innerText = `Tab ${index + 1}`;
        tabEl.appendChild(titleSpan);
        
        if (browserTabs.length > 1) {
            const closeBtn = document.createElement('button');
            closeBtn.className = 'browser-close-tab';
            closeBtn.innerText = '×';
            closeBtn.onclick = () => removeBrowserTab(tab.id);
            tabEl.appendChild(closeBtn);
        }
        
        container.appendChild(tabEl);
    });
    
    if (browserTabs.length < 5) {
        const addBtn = document.createElement('button');
        addBtn.className = 'browser-add-tab';
        addBtn.innerText = '+';
        addBtn.onclick = addBrowserTab;
        container.appendChild(addBtn);
    }
}

function loadBrowserUrl(url) {
    document.getElementById('browser-frame').src = url;
    document.getElementById('browser-url').value = url;
    const tab = browserTabs.find(t => t.id === currentBrowserTabId);
    if (tab) tab.url = url;
}

function switchBrowserTab(id) {
    currentBrowserTabId = id;
    const tab = browserTabs.find(t => t.id === id);
    if (tab) {
        document.getElementById('browser-frame').src = tab.url;
        document.getElementById('browser-url').value = tab.url;
    }
    renderBrowserTabs();
}

function addBrowserTab() {
    if (browserTabs.length >= 5) return;
    tabIdCounter++;
    const newTab = { id: tabIdCounter, url: "https://www.google.com/webhp?igu=1" };
    browserTabs.push(newTab);
    switchBrowserTab(newTab.id);
}

function removeBrowserTab(id) {
    if (browserTabs.length <= 1) return;
    const index = browserTabs.findIndex(t => t.id === id);
    browserTabs = browserTabs.filter(t => t.id !== id);
    
    if (currentBrowserTabId === id) {
        const nextIndex = Math.min(index, browserTabs.length - 1);
        switchBrowserTab(browserTabs[nextIndex].id);
    } else {
        renderBrowserTabs();
    }
}

renderBrowserTabs();