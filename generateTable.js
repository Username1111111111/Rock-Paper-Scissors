const asciitable = require("ascii-table");
const { chooseWinner } = require("./chooseWinner.js");
// https://www.npmjs.com/package/ascii-table


module.exports.generateTable = function (cmdParameters) {
    
    let table = new asciitable("Winner table");
    
    table.setHeading(" v PC\\User >",...cmdParameters);

    let whoWins = [];

    // row - user move
    // column - pc move

    for (row in cmdParameters) {
        for (column in cmdParameters) {
            whoWins.push(chooseWinner(row, column, cmdParameters.length));
        }
        console.log(whoWins);
        table.addRow(cmdParameters[row], ...whoWins);
        whoWins = [];
    }

    console.log(table.toString());

    return table.toString();
};

// 0 -1 -1 -1  1  1  1 
// 1  0 -1 -1 -1  1  1 
// 1  1  0 -1 -1 -1  1 
// 1  1  1  0 -1 -1 -1 
// -1  1  1  1  0 -1 -1 
// -1 -1  1  1  1  0 -1 
// -1 -1 -1  1  1  1  0