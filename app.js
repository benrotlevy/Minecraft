const game = {
    gameMatrix : [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,6,6,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,6,6,6,6,6,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5,5,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5,5,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5,5,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0],
        [0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0],
        [0,0,2,2,2,0,0,0,0,0,0,0,3,3,0,4,0,0,0,3],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ],

    gameBoard : document.querySelector(".game-board"),
    pickaxe : document.querySelector(".pickaxe"),
    shovel : document.querySelector(".shovel"),
    axe : document.querySelector(".axe"),
    isPickaxe: false,
    isShovel: false,
    isAxe: false,
}

function createTable(game) {
    for(let i=0; i<game.gameMatrix.length; i++) {
        for(let j=0; j<game.gameMatrix[i].length; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            game.gameBoard.appendChild(cell);
            drawElement(cell, game.gameMatrix[i][j]);
        }   
    }
}

function drawElement(cell, num) {
    switch(num) {
        case 1:
            cell.classList.add("dirt");
            break;
        case 2:
            cell.classList.add("grass");
            break;
        case 3:
            cell.classList.add("rock");
            break;
        case 4:
            cell.classList.add("trunk");
            break;
        case 5:
            cell.classList.add("leaves");
            break;
        case 6:
            cell.classList.add("cloud");
            break;
    }
};

game.pickaxe.addEventListener("click", function(event) {
    game.isAxe = false;
    game.isPickaxe = true;
    game.isShovel = false;
    this.style.borderColor = "blue";
    game.shovel.style.borderColor = "";
    game.axe.style.borderColor = "";
});
game.shovel.addEventListener("click", function(event) {
    game.isAxe = false;
    game.isPickaxe = false;
    game.isShovel = true;
    this.style.borderColor = "blue";
    game.pickaxe.style.borderColor = "";
    game.axe.style.borderColor = "";
});
game.axe.addEventListener("click", function(event) {
    game.isAxe = true;
    game.isPickaxe = false;
    game.isShovel = false;
    this.style.borderColor = "blue";
    game.shovel.style.borderColor = "";
    game.pickaxe.style.borderColor = "";
});
createTable(game);
