let numOfRows = 10;
let numOfCols = 10;

let rowHeadersWidth = (numOfCols * 7).toString() + 'px';
let colHeadersHeight = (numOfrows * 7).toString() + 'px';



function createNiceGrid(rows, cols) {
    var grid = document.createElement('table');
    grid.className = 'grid';
    for (var r = 0; r < rows; ++r) {
        var tr = grid.appendChild(document.createElement('tr'));
        tr.className = 'tr';
        for (var c = 0; c < cols; ++c) {
            var cell = tr.appendChild(document.createElement('td'));
            cell.className = 'off';
            cell.innerHTML = 0;
            cell.id = 'c' + c + 'r' + r;
            let permaID = ''
            permaID = cell.id
            // cell.addEventListener('click', cellToggle(cell))
            // cell.onclick = () => { cellToggle(permaID) }

        }
    }
    grid.addEventListener('click', (event) => {
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



    return grid;
}


function createRowHeadersTable(rows) {
    var rowHeadersTable = document.createElement('table');
    rowHeadersTable.id = 'rowHeaders';

    for (let r = 0; r < rows; r++) {
        var rowHeader = rowHeadersTable.appendChild(document.createElement('tr'));
        var cell = rowHeader.appendChild(document.createElement('td'));
        cell.innerHTML = '1&ensp;2&ensp;3&ensp;4&ensp;11&ensp;21&ensp;1'
        cell.id = 'rh' + r
    }
    return rowHeadersTable;
}

function createColHeadersTable(cols) {
    var colHeadersTable = document.createElement('table');
    colHeadersTable.id = 'colHeaders';

    var colHeader = colHeadersTable.appendChild(document.createElement('tr'));
    for (let c = 0; c < cols; c++) {
        var cell = colHeader.appendChild(document.createElement('td'));
        cell.innerHTML = '1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>'
        cell.id = 'ch' + c
    }
    return colHeadersTable;
}

function createUpperLeftSpacer()

grid = createNiceGrid(numOfRows, numOfCols)
rowClues = createRowHeadersTable(numOfRows)
colClues = createColHeadersTable(numOfCols);

document.getElementById('puzzle_box').appendChild(grid);
document.getElementById('puzzle_box').appendChild(rowClues);
document.getElementById('puzzle_box').appendChild(colClues);

function calcHeaders() {
    let rowString = ''
    let colString = ''
    for (let r = 0; r < numOfRows; r++) {
        // console.log('starting on row:', r)
        rowString = hashVector(r, numOfRows, '&ensp;');
        document.getElementById('rh' + r).innerHTML = rowString;
    }

    for (let c = 0; c < numOfCols; c++) {
        console.log('starting on col:', c)
        colString = hashVector(c, numOfCols, '<br/>');
        document.getElementById('ch' + c).innerHTML = colString;
    }
}


function hashVector(vec, vectorLength, breaker) {
    let ongoingString = '';
    let adder = 0;
    // console.log('initial vector length:' + vectorLength)
    // console.log(vec)
    for (let i = 0; i < vectorLength; i++) {
        let slice = [0, 0]; //index 0 is current cell contents, //dex 1 is next cell contents
        let thisCoord = '';
        let nextCoord = '';

        switch (breaker) {
            case '&ensp;'://this means we're going across a row
                thisCoord = 'c' + i.toString() + 'r' + vec.toString();
                nextCoord = 'c' + (i + 1).toString() + 'r' + vec.toString();
                break;

            case '<br/>'://this means we're going down a column
                thisCoord = 'c' + vec.toString() + 'r' + i.toString();
                nextCoord = 'c' + vec.toString() + 'r' + (i + 1).toString();
                break;
        };


        slice[0] = document.getElementById(thisCoord).innerHTML;
        try {
            slice[1] = document.getElementById(nextCoord).innerHTML;
        } catch (error) {
            slice[1] = -1
        }

        text = slice.toString();
        // logic for checking contiguous blocks of ON cell

        console.log('this:', thisCoord, 'next:', nextCoord, ';', text)

        switch (text) {

            case '0,0':
            case '0,1':
            case '0,-1':
                break;

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


        }
    }
    return ongoingString
}