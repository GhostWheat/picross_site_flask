window.compareCurrentToStoredPuzz = compareCurrentToStoredPuzz;
//this line is necessary w/multiple script files/modules, to "export" from
//a module into the main DOM window object (to work with
// a statically-created HTML onclick event)

import {
    createNiceGrid,
    createRowHeadersTable,
    createColHeadersTable,
    createUpperLeftSpacer,
    applyButtonScript,
    calcHeaders,
} from './buildPuzzPage.js';

import {
    gridToObj,
} from './storage.js';

export let numOfRows = 20;
export let numOfCols = 20;
export let rowHeadersWidth = (numOfCols * 8).toString() + 'px';
export let colHeadersHeight = (numOfRows * 8).toString() + 'px';


let spacer = createUpperLeftSpacer(rowHeadersWidth, colHeadersHeight)
let colClues = createColHeadersTable(numOfCols, colHeadersHeight);
let rowClues = createRowHeadersTable(numOfRows, rowHeadersWidth)
let grid = createNiceGrid(numOfRows, numOfCols)


document.getElementById('BSr0c1').appendChild(spacer)
document.getElementById('BSr0c1').appendChild(colClues);

document.getElementById('BSr1c1').appendChild(rowClues);
document.getElementById('BSr1c1').appendChild(grid);

applyButtonScript('btnPop', calcHeaders)
// applyButtonScript('bt')

applyButtonScript('btnComp', gridToObj)
// applyButtonScript('bt')

export function compareCurrentToStoredPuzz() {
    console.log('hello')
}