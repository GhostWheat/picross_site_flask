export function createNiceGrid(rows, cols) {
    let drawType = ''
    var puzzle = document.createElement('table');
    puzzle.draggable = 'false';
    puzzle.className = rows + 'x' + cols;
    puzzle.id = 'puzzleGrid';
    for (var r = 0; r < rows; ++r) {
        var tr = puzzle.appendChild(document.createElement('tr'));
        tr.draggable = 'false';
        tr.className = 'tr';
        for (var c = 0; c < cols; ++c) {
            var cell = tr.appendChild(document.createElement('td'));
            cell.draggable = 'false';
            cell.className = 'off';
            cell.innerHTML = 0;
            cell.id = 'r' + r + 'c' + c;
            // let permaID = cell.id
            // cell.addEventListener('click', cellToggle(cell))
            // cell.onclick = () => { cellToggle(permaID) }

        }
    }
    // puzzle.addEventListener('click', (event) => {
    //     let h = event.target.innerHTML;
    //     let c = event.target.className;

    //     if (c == 'on' || c == 'off') {

    //         // event.target.innerHTML = 1 ? ((event.target.className = 'off'), event.target.className = 0)
    //         //     : (event.target.className = 'on', event.target.className = 1)

    //         if (h == 1) {
    //             event.target.innerHTML = 0;
    //             event.target.className = 'off'
    //         } else {
    //             event.target.innerHTML = 1;
    //             event.target.className = 'on'
    //         }
    //     }
    // })
    // puzzle.addEventListener('click', (event) => {
    //     // if (puzzle.contains(event.target)) {
    //         console.log(event.target)
    //     let h = event.target.innerHTML;
    //     let c = event.target.className;
    //         if (c == 'on' || c == 'off') {

    //             // event.target.innerHTML = 1 ? ((event.target.className = 'off'), event.target.className = 0)
    //             //     : (event.target.className = 'on', event.target.className = 1)
    //             if (h == 1) {
    //                 event.target.innerHTML = 0;
    //                 event.target.className = 'off'
    //             } else {
    //                 event.target.innerHTML = 1;
    //                 event.target.className = 'on'
    //             }
    //         }
    //     // } else {
    //     //     console.log(event.target)
    //     // }
    // })
    puzzle.addEventListener('mousedown', event => { boxToggle(event), drawType })
    addClickDragSelect(puzzle)

    return puzzle;
};

// drawTypes:
// -1 is default, "i didn't pass in a drawtype" - fallback
// 0 is we are drawing basic/default empty cells
// 1 is we are drawing filled cells
// 2 is we are marking a cell which is DEFINITELY NOT filled-in, aka 'blocked'
function boxToggle(event, drawType = -1) {
    let h = event.target.innerHTML;
    let c = event.target.classList;

    window.oncontextmenu = function () {
        // console.log('rightclick detected')
        // event.target.className = 'blocked'
        return false;
    }

    if ('on' in c || 'off' in c || 'blocked' in c) {
        
        //first IF will trigger when right-clicking on cells
        if (event.buttons == 2) { //note this MUST be event.buttonS plural, not button - i'm not positive why as of 6/02/2023

            // console.log(event.button, 's:', event.buttons)
            event.target.innerHTML = 0;
            event.target.classList.remove('on');
            event.target.classList.remove('off');
            event.target.classList.add('blocked');

        } else if (drawType == 1) {
            // console.log(event.button)
            event.target.innerHTML = 1;
            event.target.classList.remove('off');
            event.target.classList.remove('blocked');
            event.target.classList.add('on');

        } else if (drawType == 0) {
            // console.log(event.button)
            event.target.innerHTML = 0
            event.target.classList.remove('on');
            event.target.classList.remove('blocked');
            event.target.classList.add('off');
            
        } else if (drawType == -1) {
            if ('off' in c) {
                event.target.innerHTML = 1;
                event.target.classList.remove('off');
                event.target.classList.remove('blocked');
                event.target.classList.add('on');
                // console.log(event.button)
            } else if ('on' in c) {
                event.target.innerHTML = 0;
                event.target.classList.remove('on');
                event.target.classList.remove('blocked');
                event.target.classList.add('off');
                // console.log(event.button)
            } else if ('blocked' in c) {
                event.target.innerHTML = 0;
                event.target.classList.remove('on');
                event.target.classList.remove('blocked');
                event.target.classList.add('off');
                // console.log(event.button) 
            }
            
        };
    }
};

// The below function adds click-drag cell-toggling function
export function addClickDragSelect(el) {
    // const delta = 6;
    // let startX;
    // let startY;
    
    let isMouseDown = false;
    let drawType = 0;
    // let puzzleGrid = document.getElementById('puzzleGrid')
    el.addEventListener('mousedown', function (event) {
        // document.body.style.cursor = "url('../images/icons8-x-box-white.cur'), pointer"; 

        // startX = event.pageX;
        // startY = event.pageY;
        isMouseDown = true;
        // document.body.style.cursor = "pointer;";
        // document.body.style.cursor = "url('../images/eraser.png'),\;";
        // void 0;

        if (event.target.className == 'off') {
            drawType = 0;
            // rowClasses = 'erasing';
            document.getElementById('puzzleGrid').style.cursor = "url(../images/icons8-x-box-white.cur), pointer";

        } else if (event.target.className == 'on') {
            drawType = 1;
            // rowClasses = 'filling';
            // console.log(document.getElementsByTagName('html').className)

        } else if (event.target.className == 'blocked') {
            drawType = 2; //this would be if user mousedowns on a cell that already contains a "blocked a filled cell here" mark
            // console.log(document.main.classList)
            // rowClasses  = 'blocking';
            // document.getElementsByTagName('html').style.className == 'blocking';
            console.log(window.document.className)
            
        }

    });

    el.addEventListener('mouseover', function (event) {
        if (isMouseDown) {
            boxToggle(event, drawType)
        }
   
    });

    el.addEventListener('mouseup', function (event) {
        isMouseDown = false;
        // const diffX = Math.abs(event.pageX - startX);
        // const diffY = Math.abs(event.pageY - startY);

        // if (diffX > delta && diffY > delta) {
        //     console.log(startX,startY)
        //     console.log(diffX, diffY)
        //     for (let x = startX;x < diffX; x++) {
        //         for (let y = startY; y < diffY; y++){
        //             console.log(x,y)
        //             document.elementFromPoint(x,y).click()
        //         }
        //     }
        // event.target.innerHTML = 1;
        // event.target.innerHTML = 'on';
        // boxToggle(event)
    });
    
    // these two events remove the default drag/drop behaviour
    el.addEventListener('dragstart', (e) => {
        e.preventDefault()
    });
    el.addEventListener('drop', (e) => {
        e.preventDefault()
       
    });
}

export function createRowHeadersTable(rows, rhWidth) {
    var rowHeadersTable = document.createElement('table');
    rowHeadersTable.id = 'rowHeaders';

    for (let r = 0; r < rows; r++) {
        var rowHeader = rowHeadersTable.appendChild(document.createElement('tr'));
        var cell = rowHeader.appendChild(document.createElement('td'));
        // cell.innerHTML = '1&ensp;2&ensp;3&ensp;4&ensp;11&ensp;21&ensp;1'
        cell.innerHTML = '0&ensp;'
        cell.id = 'rh' + r
    }
    //might need to comment the below line out sometimes
    rowHeadersTable.style.width = rhWidth;
    return rowHeadersTable;
};

export function createColHeadersTable(cols, chHeight) {
    let colHeadersTable = document.createElement('table');
    colHeadersTable.id = 'colHeaders';

    let colHeader = colHeadersTable.appendChild(document.createElement('tr'));
    for (let c = 0; c < cols; c++) {
        let cell = colHeader.appendChild(document.createElement('td'));
        // cell.innerHTML = '1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>'
        cell.innerHTML = '0'
        cell.id = 'ch' + c
    }
    //might need to comment the below line out sometimes
    colHeadersTable.style.height = chHeight;
    return colHeadersTable;
};

export function createUpperLeftSpacer(width, height) {
    let spacerTable = document.createElement('table')
    spacerTable.id = 'spacerTable';
    let spacerRow = spacerTable.appendChild(document.createElement('tr'));
    spacerRow.id = 'spacerRow';
    let spacerCell = spacerRow.appendChild(document.createElement('td'));
    spacerCell.id = 'spacerCell';
    spacerCell.className = 'text-center'
    spacerCell.innerHTML = "~PICROSS~<br/>It's puzzling!"
    spacerCell.style.width = width;
    spacerCell.style.height = height;
    spacerCell.style.backgroundColor = 'white';
    return spacerTable;
};

export function clearGrid() {
    let gridSize = document.getElementById('puzzleGrid').className;
    let numOfRows = gridSize.split('x')[0];
    let numOfCols = gridSize.split('x')[1];
    for (let r = 0; r < numOfRows; ++r) {
        for (var c = 0; c < numOfCols; ++c) {
            document.getElementById('r' + r + 'c' + c).innerHTML = 0;
            document.getElementById('r' + r + 'c' + c).className = 'off';
        }
    }
};

export function calcHeaders() {
    let rowString = '';
    let colString = '';
    let gridSize = document.getElementById('puzzleGrid').className;
    let numOfRows = gridSize.split('x')[0]
    let numOfCols = gridSize.split('x')[1]

    // console.log('hello')

    for (let r = 0; r < numOfRows; r++) {
        rowString = vectorToString(r, numOfRows, '&ensp;');
        document.getElementById('rh' + r).innerHTML = rowString;
    }
    for (let c = 0; c < numOfCols; c++) {
        colString = vectorToString(c, numOfCols, '<br/>');
        document.getElementById('ch' + c).innerHTML = colString;
    }
};

export function submitPuzz(gridToObj, allPuzzles, key) {
    let currentGrid = gridToObj('compare');
    let savedObj = {};
    let rows = 0;
    let cols = 0;
    try {
        savedObj = allPuzzles[key];
        rows = savedObj['rows'];
        cols = savedObj['columns'];
    }
    catch {
        return alert('No puzzle currently loaded!')
    }
    // console.log(savedObj)
    if (currentGrid['rows'] != rows) { return alert('Incorrect!') }
    if (currentGrid['columns'] != cols) { return alert('Incorrect!') }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (currentGrid[r][c] != savedObj[r][c]) {
                return alert('Incorrect!')
            }
        }
    }
    return alert('Congratulations!')

};

export function vectorToString(vec, vectorLength, breaker) {
    let ongoingString = '';
    let adder = 0;
    // console.log(vec, vectorLength, breaker)
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
                // console.log('a:', adder, ', o.s:', ongoingString)
                break;

            case '1,0':
            case '1,-1':
                adder += 1;
                ongoingString += adder.toString() + breaker;
                // console.log(adder)
                adder = 0;
                break;

            default:
                break
        }
    }
    // ongoingString = ' ' ? '0' : ' ';
    // console.log(ongoingString)
    return ongoingString == '' ? ('0' + breaker) : ongoingString

};


