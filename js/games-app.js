let currentIndex = 0;
let rufflePlayerInstance = null;

const games = [
    { 
        preview: "res/games/hwpreview.png", 
        title: "Happy Wheels", 
        description: "Happy Wheels is a side-scrolling ragdoll physics-based platform game by Fancy Force.", 
        screenshot: "res/games/hwscreenshot.webp",
        gameSrc: "swf/happy_wheels.swf", 
        releaseDate: "2010",
        controls: "Arrow Keys, Spacebar, Shift, Control, Z, C"
    },
    { 
        preview: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStim1r5vhPJtOzSLPQG_XyQNczOatZTd6i4xNOiVnSTs10QDmKq9205CDG&s=10", 
        title: "Age of War", 
        description: "Take control of 16 different units and 15 different turrets to defend your base and destroy your enemy.", 
        screenshot: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPr9FCJ1GrcmPmd1fcJSYQGxN_30fBoS-pZCbbxrLQ7w&s=10", 
        gameSrc: "swf/age_of_war.swf",
        releaseDate: "2007",
        controls: "Point and Click"
    },
    { 
        preview: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMVklmIUlKETZX5-r8qgpGUIYPLPjfGQRkyWXP6_f_ag&s=10", 
        title: "Castle Clout", 
        description: "Launch your trebuchets' ammunition to cause maximum damage to the opposing castle!", 
        screenshot: "https://archive.org/download/castle-clout-flash-game-series/castleclout1-gameplay10.png",
        gameSrc: "swf/castle_clout.swf",
        releaseDate: "2011",
        controls: "Left & Right Keys, Space"
    },
    { 
        preview: "res/games/bgpreview.png", 
        title: "Battle Gear", 
        description: "The player’s main objective is to win the battle by either destroying the enemy base or killing all enemy units on the battlefield.", 
        screenshot: "https://bubblebox.com/revive/img/battle-gear-800.jpg",
        gameSrc: "swf/battle_gear.swf",
        releaseDate: "2008",
        controls: "Press [Left/Right arrows] or [A]/[D] to scroll the field. Press [Z] or [C] keys to fast scroll to the left or right edge of battlefield. Press [Up/Down arrows] or [W]/[S] to control the arrow sign. Press [P] to pause the game. Click units to train or use [1..9] hotkeys."
    },
        { 
        preview: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGUpsr5KrQtAgFtOq7tL6YUvDG1kdzOmk-t4D5q6FEGQ&s=10", 
        title: "Windows Doors", 
        description: "Windows Doors is a parody of Windows Vista, which was developed by Archawn.", 
        screenshot: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-c4qhcPOwh5LHWgq5Pg16VxbSgMu5O5sG4xHilISiHg&s=10",
        gameSrc: "swf/windows_doors.swf",
        releaseDate: "2009",
        controls: "Point and Click"
    },
        { 
        preview: "https://imgs.crazygames.com/auto-covers/bloons-tower-defense_1x1.jpg", 
        title: "Bloons TD", 
        description: "In the game, players attempt to prevent Bloons from reaching the end of a set course by placing towers or road items along it that can pop the bloons.", 
        screenshot: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkOmpHnpJzz9KHnZ1V_qigXgm_N1C6QAds-okQ0LBPJQ&s=10",
        gameSrc: "swf/bloons_td.swf",
        releaseDate: "2007",
        controls: "Point and Click"
    },
]

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGames);
} else {
    initGames();
}

function initGames(){
    populateGames();
    selectGame(currentIndex);
}

function populateGames(){
    const container = document.querySelector("#games-grid");
    container.innerHTML = "";

    games.forEach((game, index) =>{
        const item = document.createElement("div");
        item.className = "games-grid-item"

        item.innerHTML = `
            <img src="${game.preview}" alt="Game Title">
            <div class="games-grid-item-gloss"></div>
        `;

        item.onclick = () => {
            currentIndex = index;
            selectGame(currentIndex);
        }

        container.appendChild(item);
    });
}

function selectGame(index){
    const title = document.querySelector("#games-title");
    const description = document.querySelector("#games-description");
    const screenshot = document.querySelector("#games-screenshot");

    title.innerHTML = games[index].title;
    description.innerHTML = games[index].description;
    screenshot.src = games[index].screenshot;
}

const sectionMain = document.querySelector("#games-section-main");
const sectionGame = document.querySelector("#games-section-game");

function startGame(){
    sectionMain.style.display = "none";
    sectionGame.style.display = "flex";
    const game = games[currentIndex];

    document.querySelector("#active-game-title").innerText = game.title;
    document.querySelector("#active-game-desc").innerText = game.description;
    document.querySelector("#active-game-date").innerText = game.releaseDate;
    document.querySelector("#active-game-controls").innerText = game.controls;

    const iframe = document.querySelector("#active-game-iframe");
    const ruffleContainer = document.querySelector("#ruffle-container");

    // Check if the source is a SWF file
    if (game.gameSrc.toLowerCase().endsWith('.swf')) {
        iframe.style.display = "none";
        ruffleContainer.style.display = "block";
        
        if (!rufflePlayerInstance) {
            window.RufflePlayer = window.RufflePlayer || {};
            const ruffle = window.RufflePlayer.newest();
            rufflePlayerInstance = ruffle.createPlayer();
            rufflePlayerInstance.style.width = "100%";
            rufflePlayerInstance.style.height = "100%";
            ruffleContainer.appendChild(rufflePlayerInstance);
        }
        
        rufflePlayerInstance.load({
            url: game.gameSrc,
            allowScriptAccess: false
        });
    } else {
        // Standard HTML5 iframe fallback
        ruffleContainer.style.display = "none";
        if (rufflePlayerInstance) {
            ruffleContainer.innerHTML = ""; // clear to stop audio
            rufflePlayerInstance = null;
        }
        iframe.style.display = "block";
        iframe.src = game.gameSrc;
    }
}

function backToMain(){
    sectionMain.style.display = "flex";
    sectionGame.style.display = "none";
    stopGame();
    selectGame(currentIndex);
}

function stopGame() {
    const iframe = document.querySelector("#active-game-iframe");
    if (iframe) {
        iframe.src = "";
    }
    
    const ruffleContainer = document.querySelector("#ruffle-container");
    if (rufflePlayerInstance) {
        ruffleContainer.innerHTML = "";
        rufflePlayerInstance = null;
    }
}