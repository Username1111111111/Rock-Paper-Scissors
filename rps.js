const { chooseWinner } = require("./chooseWinner.js");
const { generateTable } = require("./generateTable.js");
const { generateKey } = require("./generateKey.js");
const { generateHMAC } = require("./generateHMAC.js");
const readline = require("readline");
const crypto = require("crypto");

// Write a script that implements a generalized rock-paper-scissors game (with the supports of arbitrary odd number of arbitrary combinations)

// 1 When launched with command line parameters
let cmdParameters = process.argv.slice(2);
cmdParameters.forEach((elem) => elem + ""); // convert to strings

// 2 If the arguments are incorrect you must display a neat error message
if (cmdParameters.length < 1) {
    console.log("No parameters provided");
} else if (cmdParameters && cmdParameters.length < 3) {
    // 3 What exactly is wrong and an example of how to do it right
    console.log("Less than 3 parameters provided");
}

// 4 It accepts >=3 parameters
if (cmdParameters && cmdParameters.length >= 3) {
    // 5 An odd number of parameters
    if (cmdParameters.length % 2 == 0) {
        console.log("Even number of parameters provided");
    } else {
        // 6 Of non-repeating strings
        for (let i = 0; i < cmdParameters.length - 1; i++) {
            if (
                cmdParameters.some(
                    (param, index) => index != i && cmdParameters[i] === param
                )
            ) {
                const repeated = [];
                const indexesOfRepeated = new Map();

                cmdParameters.some((item, index) => {
                    if (indexesOfRepeated.has(item)) {
                        repeated.push(item);
                        indexesOfRepeated.get(item).push(index);
                        return true;
                    }
                    indexesOfRepeated.set(item, [index]);
                    return false;
                });
                indexesOfRepeated.forEach((value, key) => {
                    if (value.length < 2) {
                        indexesOfRepeated.delete(key);
                    }
                });
                // console.log(cmdParameters);
                console.log(`Some of parameters have been repeated.`);
                console.log(`Repeated value: ${repeated[0]}`);
                break;
            }
        }
    }
}

// 7 These passed strings are moves, for example:
let testStrings = [
    ["Rock", "Paper", "Scissors"], // Rock Paper Scissors
    ["Rock", "Paper", "Scissors", "Lizard", "Spock"], // Rock Paper Scissors Lizard Spock
    [1, 2, 3, 4, 5, 6, 7, 8, 9], // 1 2 3 4 5 6 7 8 9
    [1, 2, 2, 4, 5, 6, 7, 8, 9], // Repeated parameter 1 2 2 4 5 6 7 8 9
    [1, 2, 2, 4, 5, 6, 7, 8, 9], // Repeated parameter in other place 1 2 4 2 5 6 7 8 9
    [1, " ", 3, 4, 5], // A move may contain a space, but it shouldn't matter to your code. 1, " ", 3, 4, 5
];

// 8 The script generates a cryptographically strong random key.
const key = generateKey();

// 9 Makes own (computer's) move (with securerandom)
const randomIndex = crypto.randomInt(0, cmdParameters.length);
const message = cmdParameters[randomIndex];

// 10 calculates HMAC (based on SHA3 from №8) from the own move as a message with the generated key
let hmac = generateHMAC(key, message);

// 11 Displays the HMAC to the user.
console.log(`HMAC: ${hmac}`);

// 12  After that the user gets menu
function generateMenu() {
    console.log("Available moves:");
    for (const [index, element] of cmdParameters.entries()) {
        console.log(`${index + 1} - ${element}`);
    }
    console.log("0 - exit\n? - help");
    return;
}

// https://www.npmjs.com/package/readline
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const regex = /(\d+|\?)/g;

// 13 The user makes his choice
function question(string) {
    return new Promise((resolve, reject) => {
        generateMenu();
        rl.question(string, (move) => {
            // 14 In case of incorrect input, the "menu" is displayed again.
            if (!move || !move.match(regex)) {
                reject();
            // 15 When you select the "help" option in the terminal, you need to display a table (ASCII-graphic) that determines which move wins
            } else if (move == "?") {
                generateTable(cmdParameters);
                reject();
            } else if (move == 0) {
                resolve(move);
                rl.close();
            } else if (+move > cmdParameters.length) {
                generateTable(cmdParameters);
                console.log(
                    ` --- Choose option 1-${cmdParameters.length}  --- `
                );
                reject();
            } else if (move.length > 1) {
                generateTable(cmdParameters);
                console.log(" --- Enter number!!! --- ");
                reject();
            } else {
                console.log(`Your move: "${cmdParameters[move - 1]}"`);
                // 16 The script shows who won, the move of the computer and the original key.
                console.log(`Computer move: "${message}"`);
                let result = chooseWinner(randomIndex+1, move, cmdParameters.length);

                console.log(`You ${result}!`);
                console.log(`HMAC key: ${key}`);

                resolve(move);
                rl.close();
            }
        });
    })
    .catch(() => {
        question(string);
    })
}

question("Enter your move: ");

// >node rps.js rock Spock paper lizard scissors
// HMAC: 9ED68097B2D5D9A968E85BD7094C75D00F96680DC43CDD6918168A8F50DE8507
// Available moves:
// 1 - rock
// 2 - Spock
// 3 - paper
// 4 - lizard
// 5 - scissors
// 0 - exit
// ? - help
// Enter your move: 3
// Your move: paper
// Computer move: rock
// You win!
// HMAC key: BD9BE48334BB9C5EC263953DA54727F707E95544739FCE7359C267E734E380A2

