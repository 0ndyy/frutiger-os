let currentIndex = 0;
const games = [
    { 
        preview: "https://placehold.co/150x150", 
        title: "Sample Game 1", 
        description: "This is a detailed description of the first sample game. It is full of action and adventure.", 
        screenshot: "https://placehold.co/400x250", 
        gameSrc: "https://example.com",
        releaseDate: "October 12, 2023",
        controls: "WASD to move, Space to Jump, Left Click to shoot"
    },
    { 
        preview: "https://placehold.co/150x150", 
        title: "Sample Game 2", 
        description: "A relaxing puzzle game to test your brain.", 
        screenshot: "https://placehold.co/400x250", 
        gameSrc: "https://example.com",
        releaseDate: "January 5, 2024",
        controls: "Mouse only"
    },
    { 
        preview: "https://placehold.co/150x150", 
        title: "Sample Game 3", 
        description: "Fast-paced racing simulator.", 
        screenshot: "https://placehold.co/400x250",
        gameSrc: "https://example.com",
        releaseDate: "August 20, 2024",
        controls: "Arrow keys to steer, Shift for nitro"
    }
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
    document.querySelector("#active-game-iframe").src = game.gameSrc;
    document.querySelector("#active-game-desc").innerText = game.description;
    document.querySelector("#active-game-date").innerText = game.releaseDate;
    document.querySelector("#active-game-controls").innerText = game.controls;
}

function backToMain(){
    sectionMain.style.display = "flex";
    sectionGame.style.display = "none";
    document.querySelector("#active-game-iframe").src = ""; 
    selectGame(currentIndex);
}