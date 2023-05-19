// window.compareCurrentToStoredPuzz = compareCurrentToStoredPuzz;
// this line^^ is necessary w/multiple script files/modules, to "export" from
// a module into the main DOM window object (to work with
// a statically-created HTML onclick event)

import {
    createNiceGrid,
    createRowHeadersTable,
    createColHeadersTable,
    createUpperLeftSpacer,
    calcHeaders,
    submitPuzz,
    clearGrid,
} from './buildPuzzPage.js';

import {
    allPuzzles,
    gridToObj,
    objToGrid,
} from './storage.js';

export let numOfRows = 20;
export let numOfCols = 20;
export let rowHeadersWidth = (numOfCols * 8).toString() + 'px';
export let colHeadersHeight = (numOfRows * 8).toString() + 'px';


let spacer = createUpperLeftSpacer(rowHeadersWidth, colHeadersHeight)
let colClues = createColHeadersTable(numOfCols, colHeadersHeight);
let rowClues = createRowHeadersTable(numOfRows, rowHeadersWidth)
let grid = createNiceGrid(numOfRows, numOfCols)


document.getElementById('BSr0c1').appendChild(spacer);
document.getElementById('BSr0c1').appendChild(colClues);

document.getElementById('BSr1c1').appendChild(rowClues);
document.getElementById('BSr1c1').appendChild(grid);


document.getElementById('btnClear').
    addEventListener('click', () => { clearGrid() });


document.getElementById('btnPop').
    addEventListener('click', () => { calcHeaders() });

document.getElementById('btnSubmit').
    addEventListener('click', () => { submitPuzz(gridToObj, allPuzzles, 'temp1') });

document.getElementById('btnSave').
    addEventListener('click', function () { gridToObj('temp1') });

document.getElementById('btnLoad').
    addEventListener('click', () => { objToGrid('temp1') });
