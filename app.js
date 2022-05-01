const game = {
    gameMatrix : [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,6,6,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,6,6,6,6,6,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
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
    // inventoryType: "",
    inventoryLength: 0,
    inventoryTypes: [],
    inventoryNums: document.getElementById("list"),
    isError: false
}

function isSky(row) {
    
}

function drawDirt(gameMatrix) {
    const newTable = [];
    let random = Math.floor(Math.random() * 3 +1);
    for(let i=gameMatrix.length-1; i>= 0; i--) {
        let row = [...gameMatrix[i]]
        if(row[0] !== 1 && random > 0) {
            row.forEach((e, i, arr) => arr[i] = 1);
            newTable.unshift(row);
            random--;
        } else {
            newTable.unshift(row);
        }
    }
    return newTable;
}

function drawTree(gameMatrix, index, rowNum) {
    let random = Math.floor(Math.random() * 4);
    let random2 = Math.floor(Math.random() * 3);
    let trunkDraw = 1 + random;
    let leavesDraw = 3 + random2;
    const newTable = [];
    for(let i=gameMatrix.length-1; i>= 0; i--) {
        let row = [...gameMatrix[i]]
        if(i > rowNum ) {
            newTable.unshift(row);
        } else {
            if(trunkDraw) {
                row[index] = 4;
                trunkDraw--;
            } else if(leavesDraw) {
                row[index] = 5;
                row[index+1] = 5;
                row[index-1] = 5;
                leavesDraw--;
            }
            newTable.unshift(row);
        }
    }
    return newTable;
}

function createTree(gameMatrix) {
    const newTable = [];
    let flag = false;
    let random;
    let rowStartDraw;
    for(let i=gameMatrix.length-1; i>=0; i--) {
        let row = [...gameMatrix[i]];
        if(gameMatrix[i][0] !== 1 && flag === false) {
            flag = true;
            do {
                random = Math.floor(Math.random() * row.length);
            } while( (!(isEmpty(row ,random)) || random === 0 || random === row.length-1) || row[random+1] === 4 || row[random+2] === 4 || row[random-1] === 4 || row[random-2]);
            row[random] = 4;
            rowStartDraw = i-1;
            newTable.unshift(row);
        } else {
            newTable.unshift(row);
        }
    }
    return drawTree(newTable, random, rowStartDraw);
}

function createGrass(gameMatrix) {
    const newTable = [];
    let flag = 2;
    let random;
    for(let i=gameMatrix.length-1; i>=0; i--) {
        let row = [...gameMatrix[i]];
        if(gameMatrix[i][0] !== 1 && flag === 2) {
            do {
                random = Math.floor(Math.random() * row.length);
            } while( !(isEmpty(row ,random)) || !(isEmpty(row ,random+1)) || !(isEmpty(row ,random-1)));
            row[random] = 2;
            row[random+1] = 2;
            row[random-1] = 2;
            newTable.unshift(row);
            flag--;
        } else if(flag === 1) {
            row[random] = 2;
            newTable.unshift(row);
            flag--;
        } else {
            newTable.unshift(row);
        }
    }
    return newTable;
}

function createRock(gameMatrix, num, size) {
    const newTable = [];
    let flag = false;
    for(let i=gameMatrix.length-1; i>=0; i--) {
        if(gameMatrix[i][0] !== 1 && !flag) {
            let row = [...gameMatrix[i]];
            while(num > 0) {
                num--;
                let random;
                if(size) {
                    do {
                        random = Math.floor(Math.random() * row.length);
                    } while(!(isEmpty(row ,random)) || (!(isEmpty(row ,random+1)) && !(isEmpty(row ,random-1))));
                    row[random] = 3;
                    if(isEmpty(row ,random+1)) {
                        row[random+1] = 3;
                    } else if(isEmpty(row ,random-1)) {
                        row[random-1] = 3;
                    }
                    size = false;
                } else {
                    do {
                        random = Math.floor(Math.random() * row.length);
                    } while(!(isEmpty(row ,random)));
                    row[random] = 3;
                }
            }
            newTable.unshift(row);
            flag = true;
        } else {
            newTable.unshift(gameMatrix[i]);
        }
    }
    return newTable;
}

function isEmpty(row, num) {
    return row[num] === 0;
}

function randomizeNumOfTrees(gameMatrix, numOfTrees) {
    let newTable = gameMatrix;
    let num = Math.floor(Math.random() * numOfTrees +1);
    while (num > 0) {
        const tableWithTree = createTree(newTable);
        newTable = tableWithTree
        num--;
    }
    return newTable;
}

function createTable(game) {
    let randomTimes = Math.floor(Math.random() * 5 + 2);
    const tableWithDirt = drawDirt(game.gameMatrix)
    const tableWithTree = randomizeNumOfTrees(tableWithDirt, 4);
    const tableWithGrass = createGrass(tableWithTree);
    const newTable = createRock(tableWithGrass, randomTimes, 2);
    for(let i=0; i<newTable.length; i++) {
        for(let j=0; j<newTable[i].length; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell", elementIndex(newTable[i][j]));
            game.gameBoard.appendChild(cell);
            cell.addEventListener("mousedown", cellEvent);
            // cell.addEventListener("pointerup", cellEvent);
            cell.addEventListener("touchstart", cellEvent);
            cell.addEventListener("mouseup", cellMouseUpEvent);
            cell.addEventListener("touchend", cellMouseUpEvent);
            // cell.addEventListener("pointerdown", cellMouseUpEvent);
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
    if(game.isInventory && game.inventoryLength > 0) { 
        if(!(this.classList.contains("grass") || this.classList.contains("trunk") || this.classList.contains("leaves") || this.classList.contains("rock") || this.classList.contains("dirt"))) {
            this.classList.add(game.inventoryTypes[0]);
            game.inventory.classList.remove(game.inventoryTypes[0]);
            game.inventoryTypes.shift();
            game.inventoryLength -= 1;
            game.inventoryNums.innerText = game.inventoryLength;
            if(game.inventoryTypes[0]) game.inventory.classList.add(game.inventoryTypes[0]);
        } else {
            game.isError = true;
            game.inventory.classList.add("error");
        }
    } else {
        if(game.isShovel) {
            if(this.classList.contains("dirt")) {
                this.classList.remove("dirt");
                if(game.inventoryTypes[0]) game.inventory.classList.remove(game.inventoryTypes[0]);
                game.inventoryTypes.unshift("dirt");
                game.inventoryLength += 1;
                game.inventoryNums.innerText = game.inventoryLength;
                game.inventory.classList.add("dirt");
            } else {
                game.isError = true;
                game.shovel.classList.add("error");
            }
        }
        if(game.isPickaxe) {
            if(this.classList.contains("rock")) {
                this.classList.remove("rock");
                if(game.inventoryTypes[0]) game.inventory.classList.remove(game.inventoryTypes[0]);
                game.inventoryTypes.unshift("rock");
                game.inventoryLength += 1;
                game.inventoryNums.innerText = game.inventoryLength;
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
                    if(game.inventoryTypes[0]) game.inventory.classList.remove(game.inventoryTypes[0]);
                    game.inventoryTypes.unshift("grass");
                    game.inventoryLength += 1;
                    game.inventoryNums.innerText = game.inventoryLength;
                    game.inventory.classList.add("grass");
                }
                if(this.classList.contains("leaves")) {
                    this.classList.remove("leaves");
                    if(game.inventoryTypes[0]) game.inventory.classList.remove(game.inventoryTypes[0]);
                    game.inventoryTypes.unshift("leaves");
                    game.inventoryLength += 1;
                    game.inventoryNums.innerText = game.inventoryLength;
                    game.inventory.classList.add("leaves");
                }
                if(this.classList.contains("trunk")) {
                    this.classList.remove("trunk");
                    if(game.inventoryTypes[0]) game.inventory.classList.remove(game.inventoryTypes[0]);
                    game.inventoryTypes.unshift("trunk");
                    game.inventoryLength += 1;
                    game.inventoryNums.innerText = game.inventoryLength;
                    game.inventory.classList.add("trunk");
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
    if(game.inventoryTypes[0]) {
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
    if(game.inventoryTypes[0]) {
        game.inventory.classList.remove(game.inventoryTypes[0]);
        game.inventoryTypes = [];
        game.inventoryLength = 0;
        game.inventoryNums.innerText = game.inventoryLength;
        game.isInventory = false;
        game.inventory.style.borderColor = "";
    }
})

function deleteTable() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => cell.remove());
}

createTable(game);

