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
    startBtn : document.querySelector(".btn-start"),
    homePage : document.querySelector(".home"),
    resetBtn : document.querySelector(".reset-btn"),
    pickaxe : document.querySelector(".pickaxe"),
    shovel : document.querySelector(".shovel"),
    axe : document.querySelector(".axe"),
    inventory: document.querySelector(".inventory"),
    isPickaxe: false,
    isShovel: false,
    isAxe: false,
    isInventory: false,
    inventoryType: "",
    isError: false
}

function createTable(game) {
    for(let i=0; i<game.gameMatrix.length; i++) {
        for(let j=0; j<game.gameMatrix[i].length; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell", elementIndex(game.gameMatrix[i][j]));
            game.gameBoard.appendChild(cell);
            cell.addEventListener("mousedown", cellEvent);
            cell.addEventListener("mouseup", cellMouseUpEvent);
        }   
    }
}

function cellMouseUpEvent(event) {
    if(game.isError) {
        if(game.isInventory) {
            game.inventory.classList.remove("error");
            game.isError = false;
        }
        if(game.isPickaxe) {
            game.pickaxe.classList.remove("error");
            game.isError = false;
        }
        if(game.isShovel) {
            game.shovel.classList.remove("error");
            game.isError = false;
        }
        if(game.isAxe) {
            game.axe.classList.remove("error");
            game.isError = false;
        }
    }
}

function cellEvent(event) {
    if(game.isInventory && game.inventoryType) {
        if(!(this.classList.contains("grass") || this.classList.contains("trunk") || this.classList.contains("leaves") || this.classList.contains("rock") || this.classList.contains("dirt"))) {
            this.classList.add(game.inventoryType);
            game.inventory.classList.remove(game.inventoryType);
            game.inventoryType = "";
        } else {
            game.isError = true;
            game.inventory.classList.add("error");
        }
    } else {
        if(game.isShovel) {
            if(this.classList.contains("dirt")) {
                this.classList.remove("dirt");
                if(game.inventoryType) game.inventory.classList.remove(game.inventoryType);
                game.inventoryType = "dirt";
                game.inventory.classList.add("dirt")
            } else {
                game.isError = true;
                game.shovel.classList.add("error");
            }
        }
        if(game.isPickaxe) {
            if(this.classList.contains("rock")) {
                this.classList.remove("rock");
                if(game.inventoryType) game.inventory.classList.remove(game.inventoryType);
                game.inventoryType = "rock";
                game.inventory.classList.add("rock") 
            } else {
                game.isError = true;
                game.pickaxe.classList.add("error");
            }
        }
        if(game.isAxe) {
            if(this.classList.contains("grass") || this.classList.contains("trunk") || this.classList.contains("leaves")) {
                if(this.classList.contains("grass")) {
                    this.classList.remove("grass");
                    if(game.inventoryType) game.inventory.classList.remove(game.inventoryType);
                    game.inventoryType = "grass";
                    game.inventory.classList.add("grass")
                }
                if(this.classList.contains("leaves")) {
                    this.classList.remove("leaves");
                    if(game.inventoryType) game.inventory.classList.remove(game.inventoryType);
                    game.inventoryType = "leaves";
                    game.inventory.classList.add("leaves")
                }
                if(this.classList.contains("trunk")) {
                    this.classList.remove("trunk");
                    if(game.inventoryType) game.inventory.classList.remove(game.inventoryType);
                    game.inventoryType = "trunk";
                    game.inventory.classList.add("trunk")
                }
            } else {
                game.isError = true;
                game.axe.classList.add("error");
            }
        }
    }
}

function elementIndex(num) {
    switch(num) {
        case 1:
            return "dirt";
        case 2:
            return "grass";
        case 3:
            return "rock";
        case 4:
            return "trunk";
        case 5:
            return "leaves";
        case 6:
            return "cloud";
    }
};

game.inventory.addEventListener("click", function(event) {
    if(game.inventoryType) {
        game.isAxe = false;
        game.isPickaxe = false;
        game.isShovel = false;
        game.shovel.style.borderColor = "";
        game.axe.style.borderColor = "";
        game.pickaxe.style.borderColor = "";
        this.style.borderColor = "blue";
        game.isInventory = true;
    }
})

game.startBtn.addEventListener("click", function(event) {
    game.homePage.style.display = "none";
})

game.pickaxe.addEventListener("click", function(event) {
    game.isAxe = false;
    game.isPickaxe = true;
    game.isShovel = false;
    game.isInventory = false;
    this.style.borderColor = "blue";
    game.shovel.style.borderColor = "";
    game.axe.style.borderColor = "";
    game.inventory.style.borderColor = "";
});

game.shovel.addEventListener("click", function(event) {
    game.isAxe = false;
    game.isPickaxe = false;
    game.isShovel = true;
    game.isInventory = false;
    this.style.borderColor = "blue";
    game.pickaxe.style.borderColor = "";
    game.axe.style.borderColor = "";
    game.inventory.style.borderColor = "";
});

game.axe.addEventListener("click", function(event) {
    game.isAxe = true;
    game.isPickaxe = false;
    game.isShovel = false;
    game.isInventory = false;
    this.style.borderColor = "blue";
    game.shovel.style.borderColor = "";
    game.pickaxe.style.borderColor = "";
    game.inventory.style.borderColor = "";
});

game.resetBtn.addEventListener("click", function(event) {
    deleteTable();
    createTable(game);
    if(game.inventoryType) {
        game.inventory.classList.remove(game.inventoryType);
        game.inventoryType = "";
        game.isInventory = false;
        game.inventory.style.borderColor = "";
    }
})

function deleteTable() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => cell.remove());
}

createTable(game);
