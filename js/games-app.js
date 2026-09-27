let currentIndex = 0;
const games = [
    { preview:"source adress", title: "sample", description:"sample description", size:"500mb" ,screenshot:"source adress"}
]

document.addEventListener('DOMContentLoaded', () => {
  populateGames();
  selectGame(currentIndex);
});

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

}

function startGame(){

}