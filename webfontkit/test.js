const gameMatrix = [
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
    [0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
]

// function createTree(gameMatrix, index, rowNum) {
//     let trunkDraw = 2;
//     let leavesDraw = 3;
//     const newTable = [];
//     for(let i=gameMatrix.length-1; i>= 0; i--) {
//         let row = [...gameMatrix[i]]
//         if(i > rowNum || i < rowNum - 5) {
//             newTable.unshift(row);
//         } else {
//             if(trunkDraw) {
//                 row[index] = 4;
//                 trunkDraw--;
//             } else if(leavesDraw) {
//                 row[index] = 5;
//                 row[index+1] = 5;
//                 row[index-1] = 5;
//                 leavesDraw--;
//             }
//             newTable.unshift(row);
//         }
//     }
//     return newTable;
// }

// console.log(createTree(gameMatrix, 4, 11))

