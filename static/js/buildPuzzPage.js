import { numOfRows, numOfCols } from './main.js';

export function createNiceGrid(rows, cols) {
    var puzzle = document.createElement('table');
    puzzle.className = rows + 'x' + cols;
    puzzle.id = 'puzzleGrid';
    for (var r = 0; r < rows; ++r) {
        var tr = puzzle.appendChild(document.createElement('tr'));
        tr.className = 'tr';
        for (var c = 0; c < cols; ++c) {
            var cell = tr.appendChild(document.createElement('td'));
            cell.className = 'off';
            cell.innerHTML = 0;
            cell.id = 'r' + r + 'c' + c;
            let permaID = ''
            permaID = cell.id
            // cell.addEventListener('click', cellToggle(cell))
            // cell.onclick = () => { cellToggle(permaID) }

        }
    }
    puzzle.addEventListener('click', (event) => {
        let h = event.target.innerHTML;
        let c = event.target.className;

        if (c == 'on' || c == 'off') {

            // event.target.innerHTML = 1 ? ((event.target.className = 'off'), event.target.className = 0)
            //     : (event.target.className = 'on', event.target.className = 1)

            if (event.target.innerHTML == 1) {
                event.target.innerHTML = 0;
                event.target.className = 'off'
            } else {
                event.target.innerHTML = 1;
                event.target.className = 'on'
            }

        }

    })



    return puzzle;
}

export function createRowHeadersTable(rows, rhWidth) {
    var rowHeadersTable = document.createElement('table');
    rowHeadersTable.id = 'rowHeaders';

    for (let r = 0; r < rows; r++) {
        var rowHeader = rowHeadersTable.appendChild(document.createElement('tr'));
        var cell = rowHeader.appendChild(document.createElement('td'));
        cell.innerHTML = '1&ensp;2&ensp;3&ensp;4&ensp;11&ensp;21&ensp;1'
        cell.id = 'rh' + r
    }
    //might need to comment the below line out sometimes
    rowHeadersTable.style.width = rhWidth;
    return rowHeadersTable;
}

export function createColHeadersTable(cols, chHeight) {
    let colHeadersTable = document.createElement('table');
    colHeadersTable.id = 'colHeaders';

    let colHeader = colHeadersTable.appendChild(document.createElement('tr'));
    for (let c = 0; c < cols; c++) {
        let cell = colHeader.appendChild(document.createElement('td'));
        cell.innerHTML = '1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>'
        cell.id = 'ch' + c
    }
    //might need to comment the below line out sometimes
    colHeadersTable.style.height = chHeight;
    return colHeadersTable;
}

export function createUpperLeftSpacer(width, height) {
    let spacerTable = document.createElement('table')
    spacerTable.id = 'spacerTable';
    let spacerRow = spacerTable.appendChild(document.createElement('tr'));
    spacerRow.id = 'spacerRow';
    let spacerCell = spacerRow.appendChild(document.createElement('td'));
    spacerCell.id = 'spacerCell';
    spacerCell.innerHTML = 'I AM THE SPACER'
    spacerCell.style.width = width;
    spacerCell.style.height = height;
    spacerCell.style.backgroundColor = 'white';
    return spacerTable;
}

export function applyButtonScript(btnID, funcName) {
    document.getElementById(btnID).addEventListener('click', funcName)
}

export function calcHeaders() {
    let rowString = ''
    let colString = ''
    for (let r = 0; r < numOfRows; r++) {
        // console.log('starting on row:', r)
        rowString = vectorToString(r, numOfRows, '&ensp;');
        document.getElementById('rh' + r).innerHTML = rowString;
    }

    for (let c = 0; c < numOfCols; c++) {
        console.log('starting on col:', c)
        colString = vectorToString(c, numOfCols, '<br/>');
        document.getElementById('ch' + c).innerHTML = colString;
    }
}

export function vectorToString(vec, vectorLength, breaker) {
    let ongoingString = '';
    let adder = 0;
    // console.log('initial vector length:' + vectorLength)
    // console.log(vec)
    for (let i = 0; i < vectorLength; i++) {
        let slice = [0, 0]; //index 0 is current cell contents, dex 1 is next cell contents
        let thisCoord = '';
        let nextCoord = '';

        switch (breaker) {
            case '&ensp;'://this means we're going across a row
                thisCoord = 'r' + vec.toString() + 'c' + i.toString();
                nextCoord = 'r' + vec.toString() + 'c' + (i + 1).toString();
                break;

            case '<br/>'://this means we're going down a column
                thisCoord = 'r' + i.toString() + 'c' + vec.toString();
                nextCoord = 'r' + (i + 1).toString() + 'c' + vec.toString();
                break;
        };

        slice[0] = document.getElementById(thisCoord).innerHTML;
        try {
            slice[1] = document.getElementById(nextCoord).innerHTML;
        } catch (error) {
            slice[1] = -1
        }

        let text = slice.toString();
        // console.log('this:', thisCoord, 'next:', nextCoord, ';', text)

        // logic for checking contiguous blocks of ON cell
        switch (text) {

            case '1,1':
                adder += 1;
                console.log('a:', adder, ', o.s:', ongoingString)
                break;

            case '1,0':
            case '1,-1':
                adder += 1;
                ongoingString += adder.toString() + breaker;
                console.log(adder)
                adder = 0;
                break;

            default:
                break
        }
    }
    // ongoingString = ' ' ? '0' : ' ';

    return ongoingString == '' ? ('0' + breaker) : ongoingString

}
