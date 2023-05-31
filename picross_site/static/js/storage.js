// import { calcHeaders } from './buildPuzzPage.js';

import { serverCalls } from './server.js';

async function errorHandler(promise) {
    try {
        let data = await promise();
        return [data, null];
    } catch (error) {
        return [null, error];
    }
};

function isEmpty (obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return true;
};


export let { allPuzzles, currPuzz } = {};


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


export async function DBToGrid(key) {
    let p1key = '02d0c7cc-79f1-4cc3-b1bd-7e1a14025acb'
    let p2key = `a0c31ac6-6994-4101-aaf4-3916b02f5562`
    // console.log('DBToObj:', p1key, 'key:', key);
    let retObj = await serverCalls.getOne(p1key);
    // console.log(`return object:`,retObj);
    objToGrid(key, retObj);
    // return retObj
};

export function objToGrid(key, savedObj={}) {
    // console.log('objToGrid',savedObj);
    let { rows, cols } = 0;
    let { author, title, summary } = '';
    
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
        let desc = savedObj[descriptor];
        try {
            author = desc[author];
            title = desc[title];
            summary = desc[summary];
        } catch {
            title = descriptor
        }
        
        let outers = [
            [`(`, `)`],
            [`({`, `})`],

        ]
        for (let o of outers) {
            try {
                savedObj = (eval(o[0] + savedObj['puzzle_data'] + o[1]));

            } catch (err) {
                console.log(`ran into error with:`, err)
                console.log('alt method worked!')
                // savedObj = (eval(`({`+savedObj['puzzle_data']+`})`));
                // } catch {
                //     alert('puzzle load error!')
            }
        }
        console.log(savedObj)
        // console.log(savedObj.json())
        try {
            rows = savedObj['rows'];
            cols = savedObj['columns'];
            console.log(rows,cols)
        } catch {
            console.log(`couldn't assign rows/columns from DB obj`)
            // console.log(savedObj)
        };
    };

    
    let grid = document.getElementById('puzzleGrid');


    grid.className = rows + 'x' + cols

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
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
