// import { calcHeaders } from './buildPuzzPage.js';

import { serverCalls } from './server.js';

function isEmpty (obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}


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
    //at this point, our storage object is directly analagous to our grid,
    //and we have directly edited it in storage.js
};

export function objToDB(key) {
    console.log('objToDB:', key);

};


export async function DBToObj(key) {
    let p1key = '02d0c7cc-79f1-4cc3-b1bd-7e1a14025acb'
    console.log('DBToObj:', p1key, 'key:', key);
    let retObj = await serverCalls.getOne(p1key);
    console.log(retObj);
    return retObj
};

export function objToGrid(key, savedObj = {}) {
    console.log('objToGrid',savedObj);
    let { rows, cols } = 0;
    let { author, title, description } = '';
    
    if (isEmpty(savedObj)) {
        try {
            savedObj = allPuzzles[key];
            rows = savedObj['rows'];
            cols = savedObj['columns'];
        }
        catch {
            return alert('No puzzle currently saved!')
        }
    } else {
        let obj = savedObj[puzzle_data]
        console.log(obj)
    };
    let grid = document.getElementById('puzzleGrid');


    grid.className = rows + 'x' + cols

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
