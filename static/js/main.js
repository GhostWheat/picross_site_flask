let numOfRows = 10;
let numOfCols = 10;

// var lastClicked;
// var grid = clickableGrid(numOfRows, numOfCols, function (el, row, col, i) {
    // console.log("You clicked on element:",el);
    // console.log("You clicked on row:",row);
    // console.log("You clicked on col:",col);
    // console.log("You clicked on item #:",i);


// });

// class niceGrid {
//     constructor(rows, cols) {
//         this.rows = rows;
//         this.cols = cols;
//     }
 
//     var grid = document.createElement('table');
//     grid.className = 'grid';
//     for (var r = 0; r < rows; ++r) {
//         var tr = grid.appendChild(document.createElement('tr'));
//         for (var c = 0; c < cols; ++c) {
//             var cell = tr.appendChild(document.createElement('td'));
//             cell.className = 'off';
//             cell.innerHTML = 0;
//             cell.id = 'c' + c + 'r' + r;

//             cell.addEventListener('click', clickACell(cell))




// }

// function clickableGrid(rows, cols, callback) {

function createNiceGrid(rows, cols) {
    var grid = document.createElement('table');
    grid.className = 'grid';
    for (var r = 0; r < rows; ++r) {
        var tr = grid.appendChild(document.createElement('tr'));
        for (var c = 0; c < cols; ++c) {
            var cell = tr.appendChild(document.createElement('td'));
            cell.className = 'off';
            // cell.innerHTML = 0;
            cell.id = 'c' + c + 'r' + r;

            // cell.onclick = cellToggle(cell);

            // cell.addEventListener('click', (function (el, r, c, i) {
            //     return function () {
            //         callback(el, r, c, i);
            //     }
            // })(cell, r, c, i), false);

        }
    }
    grid.addEventListener('click', (event) => {
       event.target.className = 'off' ? 'on' : 'off';
    })
    
    // if (event.target.innerHTML == 1) {
    //     event.target.innerHTML = 0;
    //     event.target.className = 'off'
    // } else {
    //     event.target.innerHTML = 1;
    //     event.target.className = 'on'
    // }
    // return)
    return grid;
}

// function cellToggle(event) {
//     // console.log(cel.innerHTML)
//     if (event.target.innerHTML == 1) {
//         event.target.innerHTML = 0;
//         event.target.className = 'off'
//     } else {
//         event.target.innerHTML = 1;
//         event.target.className = 'on'
//     }
//     return
// }

function createRowHeaders(rows) {
    var rowHeadersTable = document.createElement('table');
    rowHeadersTable.className = 'rowHeaders';

    for (let r = 0; r < rows; r++) {
        var rowHeader = rowHeadersTable.appendChild(document.createElement('tr'));
        var cell = rowHeader.appendChild(document.createElement('td'));
        cell.innerHTML = 'Hi'
        cell.id = 'rh' + r
    }
    return rowHeadersTable;
}

function createColHeaders(cols) {
    var colHeadersTable = document.createElement('table');
    colHeadersTable.className = 'colHeaders';

    var colHeader = colHeadersTable.appendChild(document.createElement('tr'));
    for (let c = 0; c < cols; c++) {
        var cell = colHeader.appendChild(document.createElement('td'));
        cell.innerHTML = 'Hi'
        cell.id = 'ch' + c
    }
    return colHeadersTable;
}

grid = createNiceGrid(numOfRows, numOfCols)
rowClues = createRowHeaders(numOfRows)
colClues = createColHeaders(numOfCols);

document.getElementById('puzzle_box').appendChild(grid);
document.getElementById('puzzle_box').appendChild(rowClues);
document.getElementById('puzzle_box').appendChild(colClues);

    function calcHeaders() {
    let rowString = ''
    let colString = ''
    for (let r = 0; r < numOfRows; r++) {
        console.log('starting on row:', r)
        rowString = hashVector(r, numOfRows, '  ');
        document.getElementById('rh' + r).innerHTML = rowString;
    }

    for (let c = 0; c < numOfCols; c++) {
        console.log('starting on col:', c)
        colString = hashVector(c, numOfCols, '<br/>');
        document.getElementById('ch' + c).innerHTML = colString;
    }
}

// function hashRow(row) {
//     let ongoingString = '';
//     let adder = 0;
//     for (let i = 0; i < numOfCols; i++) {
//         let slice = [0,0,0]
//         let text = ''
//         if (i > 0) {
//             slice[0] = document.getElementById('c' + (i - 1) + 'r' + row).innerHTML
//         }

//         slice[1] = document.getElementById('c' + i + 'r' + row).innerHTML

//         if (i < (numOfRows - 1)) {
//             slice[2] = document.getElementById('c' + (i + 1) + 'r' + row).innerHTML
//         } else {
//             slice[2] = -1
//         };

//         text = slice.toString();
//         console.log(text)
//         // logic for checking contiguous blocks of ON cell
//         switch (text) {

//             case ('0,1,1'):
//                 adder += 1;
//                 break;

//             case ('1,1,0' || '0,1,0'):
//                 adder += 1;
//                 ongoingString += adder.toString() + ' ';
//                 adder = 0;
//                 break;

//             case ('1,1,-1' || '0,1,-1'):
//                 adder += 1;
//                 ongoingString += adder.toString();
//                 adder = 0;
//                 break;

//             // default:
//                 // console.log(adder)
//                 // console.log(ongoingString)
//                 // break;

//         }
//     }
//     return ongoingString
// }

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
            case '  '://this means we're going across a row
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