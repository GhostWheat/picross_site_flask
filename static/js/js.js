let numOfRows = 10;
let numOfCols = 10;

// var lastClicked;
var grid = clickableGrid(numOfRows, numOfCols, function (el, row, col, i) {
    console.log("You clicked on element:", el);
    console.log("You clicked on row:", row);
    console.log("You clicked on col:", col);
    console.log("You clicked on item #:", i);

    if (el.innerHTML == 1) {
        el.innerHTML = 0;
        el.className = 'off'
    } else {
        el.innerHTML = 1;
        el.className = 'on'
    }

});


function clickableGrid(rows, cols, callback) {
    var i = 0;
    var grid = document.createElement('table');
    grid.className = 'grid';
    for (var r = 0; r < rows; ++r) {
        var tr = grid.appendChild(document.createElement('tr'));
        for (var c = 0; c < cols; ++c) {
            var cell = tr.appendChild(document.createElement('td'));
            cell.className = 'off';
            cell.innerHTML = 0;
            cell.id = 'c' + c + 'r' + r;
            // cell.addEventListener('click', () => {    if (cell.innerHTML == 1) {
            //     cell.innerHTML = 0;
            //     cell.className ='off'
            // } else {
            //     cell.innerHTML = 1;
            //     cell.className ='on'
            // }})
            cell.addEventListener('click', (function (el, r, c, i) {
                return function () {
                    callback(el, r, c, i);
                }
            })(cell, r, c, i), false);

        }
    }

    return grid;
}

function createRowClues(rows) {
    var rowClues = document.createElement('table');
    rowClues.className = 'rowClues';
    for (let r = 0; r < rows; r++) {
        var rowClue = rowClues.appendChild(document.createElement('tr'));
        var cell = rowClue.appendChild(document.createElement('td'));
        cell.innerHTML = 'Hello'
        cell.id = 'rh' + r
    }
    return rowClues;
}

function createColClues(cols) {
    var colClues = document.createElement('table');
    colClues.className = 'colClues';
    var colClue = colClues.appendChild(document.createElement('tr'));
    for (let c = 0; c < cols; c++) {
        var cell = colClue.appendChild(document.createElement('td'));
        cell.innerHTML = '1 1 1 1 1'
        cell.id = 'ch' + c
    }
    return colClues;
}

document.getElementById('puzzle_box').appendChild(grid);
document.getElementById('puzzle_box').appendChild(createRowClues(numOfRows));
document.getElementById('puzzle_box').appendChild(createColClues(numOfCols));

function calcClues() {
    for (let r = 0; r < numOfRows; r++) {
        let rowString = hashRow(r);
        document.getElementById('rh' + r).innerHTML = rowString;
    }

    for (let c = 0; c < numOfRows; c++) {
        let colString = hashCol(c);
        document.getElementById('ch' + c).innerHTML = colString;
    }
}

function hashRow(row) {
    let ongoingString = '';
    let adder = 0;
    for (let i = 0; i < numOfCols; i++) {
        let thisCell = document.getElementById('c' + i + 'r' + row).innerHTML
        if (i < (numOfCols - 1)) {
            nextCell = document.getElementById('c' + (i + 1) + 'r' + row).innerHTML
        } else {
            nextCell = 0
        }

        // logic for checking contiguous blocks of ON cell
        switch (true) {

            case (thisCell == 0 && ongoingString == ''):
                break;

            case (thisCell == 0 && ongoingString != ''):
                ongoingString += ' '
                break;

            case (thisCell == 1 && nextCell == 1):
                adder += 1;
                break;

            case (thisCell == 1 && nextCell == 0):
                adder += 1;
                ongoingString += toString(adder);
                adder = 0;
                break;
        }
    }
    return ongoingString
}

function hashCol(col) {
    let ongoingString = '';
    let adder = 0;
    for (let i = 0; i < numOfRows; i++) {
        let thisCell = document.getElementById('c' + col + 'r' + i).innerHTML
        if (i < (numOfRows - 1)) {
            nextCell = document.getElementById('c' + col + 'r' + (i + 1)).innerHTML
        } else {
            nextCell = 0
        }

        // logic for checking contiguous blocks of ON cell
        switch (true) {

            case (thisCell == 0 && ongoingString == ''):
                break;

            case (thisCell == 0 && ongoingString != ''):
                ongoingString += '<br/>'
                break;

            case (thisCell == 1 && nextCell == 1):
                adder += 1;
                break;

            case (thisCell == 1 && nextCell == 0):
                adder += 1;
                ongoingString += toString(adder);
                adder = 0;
                break;
        }
    }
    return ongoingString
}