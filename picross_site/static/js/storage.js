// import { calcHeaders } from './buildPuzzPage.js';

export let allPuzzles = {};

export function gridToObj(key) {
    let grid = document.getElementById('puzzleGrid');
    let retObj = {}
    // retObj['username'] = 'currentUserIGuess';
    // retObj['puzzleName'] = 'puzzleNameIGuess';
    // retObj['description'] = 'shortDescription';
    // retObj['timeStamp'] = 'TIMESTAMP NEEDED'
    retObj['rows'] = grid.className.split('x')[0];
    retObj['columns'] = grid.className.split('x')[1];
    retObj['descriptor']
    let list = [];

    for (let r = 0; r < retObj['rows']; r++) {
        for (let c = 0; c < retObj['columns']; c++) {
            //we go across a row
            let thisCoord = 'r' + r.toString() + 'c' + c.toString();
            //add direct cell info into our array
            // console.log(thisCoord)
            list[c] = document.getElementById(thisCoord).innerHTML;
        }
        // at end of row, we push string into our storage object using key of current row
        retObj[r] = list;
        list = [];
    }
    // console.log(retObj);
    if (key == 'compare') {
        return retObj;
    } else {
        allPuzzles[key] = retObj;
    }
    //at this point, our storage object is directly analagous to our grid
};

export function objToGrid(key) {
    let savedObj = allPuzzles[key];
    let rows = savedObj['rows'];
    let columns = savedObj['columns'];
    let grid = document.getElementById('puzzleGrid');


    grid.className = rows + 'x' + columns

    for (let r = 0; r < savedObj['rows']; r++) {
        for (let c = 0; c < savedObj['columns']; c++) {
            //we go across a row
            let thisCoord = 'r' + r.toString() + 'c' + c.toString();
            //put value directly from array into cell
            let cell = document.getElementById(thisCoord);
            // console.log(cell, thisCoord)
            // console.log(savedObj)
            cell.innerHTML = savedObj[r][c];
            savedObj[r][c] == 0 ? cell.className = 'off'
                : cell.className = 'on';

        }
    }

};
