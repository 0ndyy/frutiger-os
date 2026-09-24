const games = [
    { preview:"source adress", title: "sample", description:"sample description", size:"500mb" ,screenshot:"source adress"}
]

function populateGames(){
    const container = document.querySelector("#games-grid");
    container.innerHTML = "";

    games.forEach{
        const item = document.createElement("div");
        item.className = "games-grid-item"

        games.innerHTML = `
            <img src="${games.}" alt="Game Title">
            <div class="games-grid-item-gloss"></div>
        `;


    }
}