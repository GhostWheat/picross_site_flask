var lastClicked;
var grid = clickableGrid(10,10,function(el,row,col,i){
    console.log("You clicked on element:",el);
    console.log("You clicked on row:",row);
    console.log("You clicked on col:",col);
    console.log("You clicked on item #:",i);

    if (el.innerHTML == 1) {
        el.innerHTML = 0;
        el.className ='off'
    } else {
        el.innerHTML = 1;
        el.className ='on'
    }

    // el.className='on';
    // if (lastClicked) lastClicked.className = '' ;
    // lastClicked = el;
});

// document.body.appendChild(grid);
document.body.appendChild(grid);     

function clickableGrid( rows, cols, callback ){
    var i=0;
    var grid = document.createElement('table');
    grid.className = 'grid';
    for (var r=0;r<rows;++r){
        var tr = grid.appendChild(document.createElement('tr'));
        for (var c=0;c<cols;++c){
            var cell = tr.appendChild(document.createElement('td'));
            cell.className = 'off';
            cell.innerHTML = ++i;
            // cell.addEventListener('click', () => {    if (cell.innerHTML == 1) {
            //     cell.innerHTML = 0;
            //     cell.className ='off'
            // } else {
            //     cell.innerHTML = 1;
            //     cell.className ='on'
            // }})
            cell.addEventListener('click',(function(el,r,c,i){
                return function(){
                    callback(el,r,c,i);
                }
            })(cell, r, c, i), false);
           
        }
    }
    return grid;
}
