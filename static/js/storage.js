import { } from './main.js';

export let testPuzzle = {};

export function gridToObj() {
    let grid = document.getElementById('puzzleGrid');
    let retObj = {}
    // retObj['username'] = 'currentUserIGuess';
    // retObj['puzzleName'] = 'puzzleNameIGuess';
    // retObj['description'] = 'shortDescription';
    // retObj['timeStamp'] = 'TIMESTAMP NEEDED'
    retObj['rows'] = grid.className.split('x')[0];
    retObj['columns'] = grid.className.split('x')[1];

    let list = [];

    for (let r = 0; r < retObj['rows']; r++) {
        for (let c = 0; c < retObj['columns']; c++) {
            //we go across a row
            let thisCoord = 'r' + r.toString() + 'c' + c.toString();
            //add direct cell info into our string
            console.log(thisCoord)
            list[c] = document.getElementById(thisCoord).innerHTML;
        }
        // at end of row, we push string into our storage object using key of current row
        retObj[r] = list;
        list = [];
    }
    console.log(retObj);
    return retObj;
    //at this point, our storage object is directly analagous to our grid
};

export function objToGrid(savedObj) {
    let rows = savedObj['rows']
    let columns = savedObj['columns']
    let grid = document.getElementById('puzzleGrid');

    // retObj['username'] = 'currentUserIGuess';
    // retObj['puzzleName'] = 'puzzleNameIGuess';
    // retObj['description'] = 'shortDescription';
    // retObj['timeStamp'] = 'TIMESTAMP NEEDED'

    // retObj['rows'] = grid.className.split('x')[0];
    // retObj['columns'] = grid.className.split('x')[1];
    grid.className = rows + 'x' + columns

    for (let r = 0; r < savedObj['rows']; r++) {
        for (let c = 0; c < savedObj['columns']; c++) {
            //we go across a row
            let thisCoord = 'r' + r.toString() + 'c' + c.toString();
            //add direct cell info into our string
            let cell = document.getElementById(thisCoord);
            cell.innerHTML = savedObj[r].savedObj[c];
        }
    }
};


