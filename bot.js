//bot idea for fun
function botTurn([y1,x1]){
function _nextMove(){
    let [lose, lMove] = checkForCloseWin('p1');
    let [win, wMove] =checkForCloseWin('p2');
    let [enemy2, moveEnemy]=checkForTwo('p1');
    let [team2, moveTeam]=checkForTwo('p2');
    let ground;

    if(turn===1){
        ground = x1===3 ? true:false;
        return x1<=2 ? [y1,x1+1]:x1===3 ? [y1-1, x1]:[y1,x1-1];

    }
    if(turn>1 && turn<5 && ground ){
        return  [y1-1,x1];

    }
    if(win){
        console.log('about to win');
        return [findSpotForCol(wMove),wMove];
    
    }
    if(lose){
        console.log('about to lose:',[findSpotForCol(lMove[0]), lMove[0]]);
        return [findSpotForCol(lMove[0]), lMove[0]];
    
    }
    if(team2 && enemy2){
    
        console.log('team enemy 2')
        let potential = moveTeam.filter((pos)=>moveEnemy.includes(pos));
        console.log(potential);
    if(potential.length==0){
        let x=moveTeam[Math.floor(Math.random()*(moveTeam.length+1))]
        return [findSpotForCol(x),x];     
    }
    else{
        let x=potential[Math.floor(Math.random()*(potential.length+1))]
        return [findSpotForCol(x),x];
    }

    }
    if(team2){
        console.log('team 2')
        let x=moveTeam[Math.floor(Math.random()*(moveTeam.length))];
        return [findSpotForCol(x),x]
    }
    if(enemy2){
        console.log('enemy 2')
        let x = moveEnemy[Math.floor(Math.random()*(moveEnemy.length))];
        return [findSpotForCol(x),x]
    
    }
    else{
        console.log('last resort')
        let top = [y1-1, x1];
        let rand = Math.floor(Math.random()*8);
        let random = [findSpotForCol(rand), rand]
        if(Math.random()>.3){
            return random;
        }
        else{
            return top;
        }
        
    }

}
    placeInTable(..._nextMove());
    if (checkForWin()) {
        return endGame(`Player ${currPlayer} won!`);
    }
[currPlayer, inactivePlayer]=[inactivePlayer,currPlayer];
}

function checkForCloseWin(player) {
    //repurposed the check for win function
    const closeWin=(cells, player)=> {

    return cells.every(
    ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === Number(player[1])
    );
}

const [avSpots, enemy]=gameData(player);

// loop through all enemy pieces to check if they will win
let possibleMoves=[];

enemy.forEach(([y,x])=>{
        let horiz = [[y, x], [y, x + 1], [y, x + 2]];
        let vert = [[y, x], [y + 1, x], [y + 2, x]];
        let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2]];
        let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2]];

    
        if(closeWin(horiz, player)){
        if(avSpots.some(([y,x])=>x ===horiz[0][1]-1 && y ===horiz[0][0])){
            possibleMoves.push(horiz[0][1]-1);
            
        }
        if(avSpots.some(([y,x])=>x===horiz[2][1]+1 && y ===horiz[2][0])){
            possibleMoves.push(horiz[2][1]+1);
            
        }
        }
        else if(closeWin(vert, player)){
        if(avSpots.some(([y,x])=>y ===vert[0][0]-1 && x ===vert[0][1])){
            possibleMoves.push(vert[0][1])
        }
        }
        else if(closeWin(diagDR, player)){
        if(avSpots.some(([y,x])=>y ===diagDR[0][0]-1 && x ===diagDR[0][1]-1)){
            possibleMoves.push(diagDR[0][1]-1)
        }
        if(avSpots.some(([y,x])=>y ===diagDR[2][0]+1 && x ===diagDR[2][1]+1)){
            possibleMoves.push(diagDR[2][1]+1)
        }
        }
        else if(closeWin(diagDL, player)) {
        if(avSpots.some(([y,x])=>y ===diagDL[0][0]-1 && x ===diagDL[0][1]+1)){
            possibleMoves.push(diagDL[0][1]+1)
        }
        if(avSpots.some(([y,x])=>y ===diagDL[1][0]+1 && x ===diagDL[2][1]-1)){
            possibleMoves.push(diagDL[2][1]-1)
        }
        }
    })
    return[possibleMoves.length!==0, possibleMoves]
}
function checkForTwo(player) {
const closeWin=(cells, player)=> {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer
    
    return cells.every(
    ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === Number(player[1])
    );
}

const [avSpots, enemy]=gameData(player);


// loop through all enemy pieces to check if they have two in a row
let possibleMoves=[];

enemy.forEach(([y,x])=>{
    let horiz = [[y, x], [y, x + 1]];
    let vert = [[y, x], [y + 1, x]];
    let diagDR = [[y, x], [y + 1, x + 1]];
    let diagDL = [[y, x], [y + 1, x - 1]];


    if(closeWin(horiz, player)){
        if(avSpots.some(([y,x])=>x ===horiz[0][1]-1 && y ===horiz[0][0])){
            possibleMoves.push(horiz[0][1]-1);
            
        }
        if(avSpots.some(([y,x])=>x===horiz[1][1]+1 && y ===horiz[1][0])){
            possibleMoves.push(horiz[1][1]+1);
            
        }
        }
    else if(closeWin(vert, player)){
        if(avSpots.some(([y,x])=>y ===vert[0][0]-1 && x ===vert[0][1])){
            possibleMoves.push(vert[0][1])
        }
        if(avSpots.some(([y,x])=>y ===vert[1][0]+1 && x ===vert[1][1])){
            possibleMoves.push(vert[1][1]+1)
        }

    }
    else if(closeWin(diagDR, player)){
        if(avSpots.some(([y,x])=>y ===diagDR[0][0]-1 && x ===diagDR[0][1]-1)){
            possibleMoves.push(diagDR[0][1]-1)
        }
        if(avSpots.some(([y,x])=>y ===diagDR[1][0]+1 && x ===diagDR[1][1]+1)){
            possibleMoves.push(diagDR[1][1]+1)
        }
    }
    else if(closeWin(diagDL, player)) {
        if(avSpots.some(([y,x])=>y ===diagDL[0][0]-1 && x ===diagDL[0][1]+1)){
            possibleMoves.push(diagDL[0][1]+1)
        }
        if(avSpots.some(([y,x])=>y ===diagDL[1][0]+1 && x ===diagDL[1][1]-1)){
            possibleMoves.push(diagDL[1][1]-1)
        }
    }
})
    return[possibleMoves.length!==0, possibleMoves]
    }
function gameData(player){
let avSpots= [];
for(let i=0;i<7;i++){
    avSpots.push([findSpotForCol(i),i]);
}

const pieces=document.querySelectorAll(`.${player}`);
const enemy= [...pieces].map((piece)=>{
    let id = piece.parentElement.id;
    return[Number(id[0]),Number(id[2])];
});
return [avSpots, enemy]

}