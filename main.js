const container = document.createElement("div");
container.id = "container";
container.className = "StyleContainer";
const gameBoard = document.createElement("div");
gameBoard.id = "gameBoard";
gameBoard.className = "StyleGameBoard";
const messageBox = document.createElement("div");
messageBox.id = "messageBox";
messageBox.className = "StyleMessageBox";
const PlayerSymbol = ["assets/circle.png", "assets/crois.png"];
let gamePlayer = 0; // Player 1 starts!!!
// let gameWinner = -1;
let endOfGame = false; //the game is over
let movements;
let playerNumberOfVictories = [0,0];

// **********************/
// Game board        ...*/
// **********************/

const gameBoardStatus = {

  "cell0": {
    content: "",
    row: ["cell1", "cell2"],
    col: ["cell3", "cell6"],
    diag: ["cell4", "cell8"]
  },

  "cell1": {
    content: "",
    row: ["cell0", "cell2"],
    col: ["cell4", "cell7"],
    diag: []
  },

  "cell2": {
    content: "",
    row: ["cell0", "cell1"],
    col: ["cell5", "cell8"],
    diag: ["cell4", "cell6"]
  },

  "cell3": {
    content: "",
    row: ["cell4", "cell5"],
    col: ["cell0", "cell6"],
    diag: []
  },

  "cell4": {
    content: "",
    row: ["cell3", "cell5"],
    col: ["cell1", "cell7"],
    diag: [["cell0", "cell8"],["cell2", "cell6"]]
  },

  "cell5": {
    content: "",
    row: ["cell3", "cell4"],
    col: ["cell2", "cell8"],
    diag: []
  },

  "cell6": {
    content: "",
    row: ["cell7", "cell8"],
    col: ["cell0", "cell3"],
    diag: ["cell2", "cell4"]
  },

  "cell7": {
    content: "",
    row: ["cell6", "cell8"],
    col: ["cell1", "cell4"],
    diag: []
  },  

  "cell8": {
    content: "",
    row: ["cell6", "cell7"],
    col: ["cell2", "cell5"],
    diag: ["cell0", "cell4"]
  }
}


//****************** */
// Functions         */
//****************** */

function FCreateGame() {


  console.log("Creando el juego...");

  //****************** */
  // gameBoard custom  */
  //****************** */

  for (let index = 0; index < 9; index++) {

    let tableCell = document.createElement("div");
    tableCell.className = "StyleCell";
    tableCell.id = `cell${index}`;

    gameBoard.appendChild(tableCell);
  }

  document.body.appendChild(container);
  container.appendChild(gameBoard);
  console.log("gameBoard creado" + gameBoard);

  let tableCell0 = document.getElementById("cell0");
  tableCell0.addEventListener("click", FGamePlay, false);

  let tableCell1 = null;
  tableCell1 = document.getElementById("cell1");
  tableCell1.addEventListener("click", FGamePlay, false);

  let tableCell2 = null;
  tableCell2 = document.getElementById("cell2");
  tableCell2.addEventListener("click", FGamePlay, false);

  let tableCell3 = null;
  tableCell3 = document.getElementById("cell3");
  tableCell3.addEventListener("click", FGamePlay, false);

  let tableCell4 = null;
  tableCell4 = document.getElementById("cell4");
  tableCell4.addEventListener("click", FGamePlay, false);

  let tableCell5 = null;
  tableCell5 = document.getElementById("cell5");
  tableCell5.addEventListener("click", FGamePlay, false);

  let tableCell6 = null;
  tableCell6 = document.getElementById("cell6");
  tableCell6.addEventListener("click", FGamePlay, false);

  let tableCell7 = null;
  tableCell7 = document.getElementById("cell7");
  tableCell7.addEventListener("click", FGamePlay, false);

  let tableCell8 = null;
  tableCell8 = document.getElementById("cell8");
  tableCell8.addEventListener("click", FGamePlay, false);

  container.appendChild(messageBox);
  FGameReset();
  FShowGameInfo();
}

function FGameBoardStatusReset(){

    for(let key in gameBoardStatus){
      gameBoardStatus[key].content = "";
    }

    for(let i=0; i<9; i++){
      let boardCell = document.getElementById(`cell${i}`);

      if(boardCell.children.length>0){
        boardCell.removeChild(boardCell.firstChild); //Player images remove...
      }
      boardCell.className = "StyleCell";   
    }

}

function FGameReset(){

  movements = 0;
  playerNumberOfVictories = [0,0];
  gamePlayer = 0;
  endOfGame = false;

}


function FNextTour() {

  gamePlayer = ++gamePlayer % 2;
  return gamePlayer;

}

function FGamePlay(){

  if (!endOfGame){

    movements++;

    let playedCell = event.target;

    if(gameBoardStatus[playedCell.id].content == ""){

      let img = document.createElement("img");

      img.src = PlayerSymbol[gamePlayer];
      img.className = "StyleImage";
      playedCell.appendChild(img);  
      gameBoardStatus[playedCell.id].content = gamePlayer;

      console.log("preguntando sobre el estado del tablero...");
      console.log("movimiento: " + movements);

      if (FRow(playedCell.id) || FColumn(playedCell.id) || FDiagonal(playedCell.id)){

        console.log("fila / columna / diagonal");

        gameWinner = gamePlayer;
        FPrintWinner(gameWinner);
        FShowGameInfo();
        endOfGame = true;
      }else if (movements == 9){

        console.log("empate");

        FPrintWinner(2); //Deuce!
        FShowGameInfo();       
        endOfGame = true;
      }
      FNextTour();
    } 
  }
}

function FRow(elem){
  const cellRow = gameBoardStatus[elem].row;
  const cellPlayer = gameBoardStatus[elem].content;
  const neighbour1 = gameBoardStatus[cellRow[0]].content;
  const neighbour2 = gameBoardStatus[cellRow[1]].content;

  let isRow = ((neighbour1 === cellPlayer) && (neighbour2 === cellPlayer));

  if (isRow){
    document.getElementById(elem).className = "StyleWinnerCell";
    document.getElementById(cellRow[0]).className = "StyleWinnerCell";
    document.getElementById(cellRow[1]).className = "StyleWinnerCell";
  }

  return (isRow);
}

function FColumn(elem){
  const cellColumn = gameBoardStatus[elem].col;
  const cellPlayer = gameBoardStatus[elem].content;
  const neighbour1 = gameBoardStatus[cellColumn[0]].content;
  const neighbour2 = gameBoardStatus[cellColumn[1]].content;

  let isColumn = ((neighbour1 === cellPlayer) && (neighbour2 === cellPlayer));

  if (isColumn){
    document.getElementById(elem).className = "StyleWinnerCell";
    document.getElementById(cellColumn[0]).className = "StyleWinnerCell";
    document.getElementById(cellColumn[1]).className = "StyleWinnerCell";
  }

  return (isColumn);
}

function FDiagonal(elem){

  return false;
}

function FPrintWinner(w){

  const audio = document.createElement("audio");
  const resultText = document.getElementById("resultText");
  const resultImage = document.getElementById("resultImage");

  switch(w){
    case 0:      
      resultText.innerText = "Player 1 wins!";
      resultImage.src = "assets/cup.png";
      audio.src = "assets/audio.mp3";
      audio.play();
      playerNumberOfVictories[w]++;
      FShowGameInfo();
      break;
    case 1:
      resultText.innerText = "Player 2 wins!";
      resultImage.src = "assets/cup.png";
      audio.src = "assets/audio.mp3";
      audio.play();
      playerNumberOfVictories[w]++;
      FShowGameInfo();
      break; 
    case 2:
      resultText.innerText = "There is no winner at all!";
      resultImage.src = "assets/flash.png";
      audio.src = "assets/deuce.wav";
      audio.play();
      FShowGameInfo();
      break;
    default:
      break;
  }
}

function FShowGameInfo(){

  const infoBox = document.getElementById("messageBox");

  if(infoBox.children.length == 0){ //at game start! all must be created

    const gameTitle = document.createElement("p");
    gameTitle.id = "gameTitle";
    gameTitle.className = "StyleMessage";
    gameTitle.innerText = "Jeu de morpion";

    const resultCard = document.createElement("div");
    resultCard.className = "StyleCard";
    resultCard.id = "resultCard";

    const resultText = document.createElement("p");
    resultText.className = "StyleMessage";
    resultText.id = "resultText";
    const image = document.createElement("img");
    image.className = "StyleImage";
    image.id = "resultImage";

    resultCard.appendChild(image);
    resultCard.appendChild(resultText);

    const victoriesBox = document.createElement("div");
    victoriesBox.className = "StyleVictoryCard";
    victoriesBox.id = "victoryBox";
 
    const victoriesPlayer1 = document.createElement("div");
    victoriesPlayer1.className = "StyleVictoryBox";
    const victoriesPlayer2 = document.createElement("div");
    victoriesPlayer2.className = "StyleVictoryBox";

    victoriesPlayer1.innerText = "Player1 ";
    victoriesPlayer1.appendChild(document.createElement("img"));
    victoriesPlayer1.children[0].src = "assets/cup.png";
    victoriesPlayer1.children[0].className = "StyleIcon";

    const player1Score = document.createElement("p");
    player1Score.id = "player1Score";
    player1Score.innerText = `  ${playerNumberOfVictories[0]}`;
    victoriesPlayer1.appendChild(player1Score);

    victoriesPlayer2.innerText = "Player2 ";
    victoriesPlayer2.appendChild(document.createElement("img"));
    victoriesPlayer2.children[0].src = "assets/cup.png";
    victoriesPlayer2.children[0].className = "StyleIcon";

    const player2Score = document.createElement("p");
    player2Score.id = "player2Score";
    player2Score.innerText = `  ${playerNumberOfVictories[1]}`;
    victoriesPlayer2.appendChild(player2Score);
  
    victoriesBox.appendChild(victoriesPlayer1);
    victoriesBox.appendChild(victoriesPlayer2);

    const btnMenu = document.createElement("div");
    btnMenu.className = "StyleBtnMenu";
  
    const btnExit = document.createElement("button");
    btnExit.className = "StyleButton";
    btnExit.innerText = "Exit";
    btnExit.addEventListener("click", ()=>{
      window.close();
    });
  
    const btnReset = document.createElement("button");
    btnReset.className = "StyleButton";
    btnReset.innerText = "Reset";
    btnReset.addEventListener("click", ()=>{
      FGameBoardStatusReset();
      FGameReset();
      FWinnerClean();
      FShowGameInfo();
      endOfGame = false;
    });
  
    const btnAgain = document.createElement("button");
    btnAgain.className = "StyleButton";
    btnAgain.innerText = "Try again";
    btnAgain.addEventListener("click", ()=>{
      FGameBoardStatusReset();
      FWinnerClean();
      FShowGameInfo();
      movements = 0;
      gamePlayer = 0;
      endOfGame = false;
    });
  
    btnMenu.appendChild(btnExit);
    btnMenu.appendChild(btnReset);
    btnMenu.appendChild(btnAgain);
  
    const endBox = document.createElement("div");
    endBox.className = "StyleEndBox";
    endBox.id = "gameVictoryCard";

    endBox.appendChild(victoriesBox);
    endBox.appendChild(btnMenu);
  
    infoBox.appendChild(gameTitle);
    infoBox.appendChild(resultCard);
    infoBox.appendChild(endBox);

  }else{
    const p1Score = document.getElementById("player1Score");
    const p2Score = document.getElementById("player2Score");

    p1Score.innerText = `  ${playerNumberOfVictories[0]}`;
    p2Score.innerText = `  ${playerNumberOfVictories[1]}`;
  }

}

function FWinnerClean(){
  const winnerCard = document.getElementById("resultCard");

  winnerCard.firstChild.src = "";
  winnerCard.lastChild.innerText = "";
}


//************** */
// Game Main     */
//************** */
FCreateGame();
//************** */