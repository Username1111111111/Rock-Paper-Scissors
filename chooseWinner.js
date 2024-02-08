// The victory is defined as follows - half of the next moves in the circle wins, half of the previous moves in the circle lose:

//    2  3
// 1        4
// 7        5
//      6

// p = Math.floor( n / 2);
// Math.sign((a - b + p + n) % n - p);

// Where:
// a - pc move 
// b — user move
// n — moves number
// p — half of moves.

module.exports.chooseWinner = function (a, b, n) {
    
    let p = Math.floor( n / 2);
    let winner = Math.sign((a - b + p + n) % n - p);

    if (winner == 1) {
        return 'win';
    } else if (winner == 0) {
        return 'draw';
    } else if (winner == -1) {
        return 'lose';
    }
};

// 0 -1 -1 -1  1  1  1 
// 1  0 -1 -1 -1  1  1 
// 1  1  0 -1 -1 -1  1 
// 1  1  1  0 -1 -1 -1 
// -1  1  1  1  0 -1 -1 
// -1 -1  1  1  1  0 -1 
// -1 -1 -1  1  1  1  0

