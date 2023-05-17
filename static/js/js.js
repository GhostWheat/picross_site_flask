let rowNum = 10;
let colNum = 10;

// var lastClicked;
var grid = clickableGrid(rowNum, colNum, function (el, row, col, i) {
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
            cell.id ='c'+c+'r'+r;
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
        cell.id = 'rh'+r
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
        cell.id = 'ch'+c
    }
    return colClues;
}



document.getElementById('puzzle_box').appendChild(grid);
document.getElementById('puzzle_box').appendChild(createRowClues(rowNum));
document.getElementById('puzzle_box').appendChild(createColClues(colNum));


// function hashRow(row) {

// }

// let 
// for (rowClues in )


// function calcClues() {
//     let r = 0
//     while (r < rows) {
//         let rowString = hashRow(r);
//         rowText = document.getElementByClassName('rowClues')


//     }
    

//     let c = 0
//     hashCol(c);
// }
    

// function hashRow() {

// }

// function hashCol() {
    
// }