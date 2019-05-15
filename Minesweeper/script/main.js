
// glbals
var plantedMines = [];
var board = [];
var count = 0;

window.addEventListener( "load", function(){
    buildBoard(3,3,1);
    printBoard( '.container' );
});


function _( selector )
{
    return document.querySelector( selector );
}


function buildBoard( rows, cols, mines )
{
    // exit on invalid mines count
    if( cols * rows < mines )
        return;
    
    //fill board with zero
    for( var i = 0; i < rows; i++ )
    {
        board[i] = [];
        for( var j = 0; j < cols; j++ )
        {
            board[i][j] = 0;
        }   
    }

    debugBoard( board );

    board = plantMines( board, mines );
    board = calculateNumbers( board );
    
    debugBoard( board );
}

//putting mines on board
function plantMines( board, count )
{
    for( var i = 0; i < count; i++ )
    {
        do
        {
            //random x/y for mines
            var rndRow = parseInt( Math.random() * board.length );
            var rndCol = parseInt( Math.random() * board[0].length );
            
        }
        while( plantedMines.indexOf( rndRow + ',' + rndCol) != -1 );
        //putting the mines location in to arrey
        plantedMines.push( rndRow + ',' + rndCol );
        board[rndRow][rndCol] = "*";
    }

    return board;
}

//add number when close to mine
function calculateNumbers( board )
{
    //add border around the original board
    board = addBorder ( board );

    //foreach mine location
    plantedMines.forEach( function( el )
    {
        el = el.split( "," );
        var row = parseInt(el[0]) + 1;
        var col = parseInt(el[1]) + 1;

        //adding 1 around mine location
        for (var i = row - 1 ; i <= row+1; i++) 
        {
            for (var j = col - 1 ; j <= col+1; j++) 
            {
                if( board[i][j] != '*' && board[i][j] != 'b' )
                {
                    board[i][j]++;
                }
            }    
        }
    });
    // board = removeBorder( board );
    return board;
}


function revealEmptySiblings( row, col )
{
    count++;
    if(count == 15)
    {
        throw new Error("stop");
    }
    reveal( row, col );
    console.log("position - " + row + " " + col);
    for (var i = row - 1 ; i <= row+1; i++) 
    {
        for (var j = col - 1 ; j <= col+1; j++) 
        {
            
            console.log("checking position - " + i + " " + j);
            if( !( i == row && j == col ) )
            {
                console.log("first if position - " + i + " " + j);
                if( board[i][j] == 0 )
                {
                    console.log("zero if position - " + i + " " + j);
                    reveal( i, j );
                    revealEmptySiblings( i, j );
                }

                if( board[i][j] > 0 )
                {
                    console.log("bigger if position - " + i + " " + j);
                    reveal( i, j );
                }
            }
        }    
    }
}


function reveal( row, col )
{
    _( '#cell-' + row + "-" + col ).classList.add( 'revealed' );

}


function printBoard( parent )
{
    parent = _( parent );

    var html = "<table class='minesweeper-board'>";

    for( var i = 1; i < board.length - 1; i++ )
    {
        html += "<tr>";

        for( var j = 1; j < board[0].length - 1; j++ )
        {
            var cssClass = "";
            switch( board[i][j] )
            {
                case '*':
                    cssClass = 'mine';
                    break;

                case 0:
                    cssClass = 'empty';
                    break;

                default:
                    cssClass = 'number color-' + board[i][j];
                    break;
            }

            html += "<td id='cell-" + i + "-" + j + "' class='" + cssClass + "'>" + board[i][j] + "</td>";
        }   

        html += "</tr>";
    }

    html += "</table>";

    parent.innerHTML = html;
}

//adding border to prevent exception
function addBorder( board )
{
    var newBoard = [];

    for( var i = 0; i < (board.length+2); i++ )
    {
        newBoard[i] = [];
        for( var j = 0; j < (board[0].length+2); j++ )
        {
            if(i == 0 || j == 0 || i == (board.length+1) || j == (board[0].length+1))
            {
                newBoard[i][j] = 'b';
            }
            else
            {
               newBoard[i][j] = board[i-1][j-1];   
            }
        }
    }

    return newBoard;
}

//removing border and returning to the original board
function removeBorder( board )
{
    var out = [];

    for( var i = 1; i < (board.length-1); i++ )
    {
        out[i-1] = [];

        for( var j = 1; j < (board[0].length-1); j++ )
        {
            out[i-1].push(board[i][j]);
        }
    }

    return out;
}

//debuging the board
function debugBoard( board )
{
    for( var i = 0; i < board.length; i++ )
    {
        var tmp = "";

        for( var j = 0; j < board[0].length; j++ )
        {
            tmp += board[i][j] + " | "
        }

        console.log( tmp );
    }

    console.log( "-------------------------------------" );
}