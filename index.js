// Game state
var board = [
	['', '', ''],
	['', '', ''],
	['', '', '']
];

let array00 = document.getElementById('array00');
let array01 = document.getElementById('array01');
let array02 = document.getElementById('array02');
let array10 = document.getElementById('array10');
let array11 = document.getElementById('array11');
let array12 = document.getElementById('array12');
let array20 = document.getElementById('array20');
let array21 = document.getElementById('array21');
let array22 = document.getElementById('array22');
let selectMode = document.getElementById('selectMode');
let selectRound = document.getElementById('selectRound');
let inputName = document.getElementById('inputName');
let inputNameName = document.getElementById('inputNameName');
let inputNameName2 = document.getElementById('inputNameName2');
let inputNameName2div = document.getElementById('inputNameName2div');
let game = document.getElementById('game');
let turn = document.getElementById('turn');
let player1ScoreBoard = document.getElementById('player1ScoreBoard');
let player2ScoreBoard = document.getElementById('player2ScoreBoard');
let botScoreBoard = document.getElementById('botScoreBoard');
let scoreBoard = document.getElementById('scoreBoard');

let legend ='X';
let player1 = '';
let player2 = '';
let mode = '';
let round = 0;
let player1Score = 0;
let player2Score = 0;
let botScore = 0;
let roundmove = 0;
let whosturn = "";



let form = document.getElementById('form');

// Simple form
form.addEventListener('submit', (e)=>{
	e.preventDefault();

	if(mode == "pvb"){
		if(inputNameName.value != "" && inputNameName.value != undefined){
			player1 = inputNameName.value;
	
			inputName.classList.add('d-none');
			game.classList.remove('d-none');
	
			turn.innerHTML = "Turn: "+player1;
			whosturn = player1;

			scoreBoard.innerHTML=	`<div id="player1ScoreBoard" class="ms-4"></div>	
									<div id="botScoreBoard" class="me-4"></div>`;
			document.getElementById('player1ScoreBoard').innerHTML = player1+": "+player1Score;
			document.getElementById('botScoreBoard').innerHTML = "Bot: "+botScore;
	
		}else{
			Swal.fire({
				icon:'error',
				title: 'Ooops...',
				text: 'Please enter name.',
				showConfirmButton: false,
				footer: '<button onclick="resetGame()" class="btn btn-dark">Reset</button>',
				allowOutsideClick:false
			})
		}
	}
	else{
		if(inputNameName.value != "" && inputNameName.value != undefined && inputNameName2.value != "" && inputNameName2.value != undefined){
			player1 = inputNameName.value;
			player2 = inputNameName2.value;
			inputName.classList.add('d-none');
			game.classList.remove('d-none');
			turn.innerHTML = "Turn: "+player1;
			whosturn = player1;
			scoreBoard.innerHTML=	`<div id="player1ScoreBoard" class="ms-4"></div>	
									<div id="player2ScoreBoard" class="me-4"></div>`;
			document.getElementById('player1ScoreBoard').innerHTML = player1+": "+player1Score;
			document.getElementById('player2ScoreBoard').innerHTML = player2+": "+player2Score;
		}else{
			Swal.fire({
				icon:'error',
				title: 'Ooops...',
				text: 'Please enter name.',
				showConfirmButton: false,
				footer: '<button onclick="resetGame()" class="btn btn-dark">Reset</button>',
				allowOutsideClick:false
			})
		}
	}
})


function legendToggler(){
	if(legend == 'X'){
		legend = 'O';
	}else{
		legend = 'X';
	}
}


function gameAlgo(cbody,moveIndex1,moveIndex2){
	if(cbody.querySelector('img')!== null){Swal.fire('error','Already taken!')}
	else{
		board[moveIndex1][moveIndex2] = legend; 
		cbody.innerHTML = '<img src="tictactoe_'+legend+'.png" width="100%">';
		let moveCheck = checkWin(legend,whosturn);
		legendToggler();
		if(mode == 'pvb' && moveCheck == false){botMove();}
		else{
			if(whosturn == player1){
				whosturn = player2;
			}else{
				whosturn = player1;
			}
		}
		turn.innerHTML = "Turn: "+whosturn;
	}
}

//make a listener para sa lahat ng buttons
for(let i=0; i<3; i++){
	for(let j=0; j<3; j++){
		document.getElementById('array'+[i]+[j]).addEventListener('click', ()=>{
			let cbody = document.getElementById('array'+[i]+[j]).getElementsByTagName("div")[0];
			gameAlgo(cbody,i,j);
		})
	}
}



// Win checker
function checkWin(player,whosTurn) {

	roundmove++;
	// pa horizontal
	for (var i = 0; i < 3; i++) {
		if (board[i][0] === player && board[i][1] === player && board[i][2] === player) {

			document.getElementById('array'+[i]+[0]).classList.add('bg-success');
			document.getElementById('array'+[i]+[1]).classList.add('bg-success');
			document.getElementById('array'+[i]+[2]).classList.add('bg-success');
			var event = new CustomEvent('win', { detail: { winner: whosTurn } });
			document.dispatchEvent(event);
			roundmove = 0;
			return true;
		}
	}

	// pa vertical
	for (var j = 0; j < 3; j++) {
		if (board[0][j] === player && board[1][j] === player && board[2][j] === player) {

			document.getElementById('array'+[0]+[j]).classList.add('bg-success');
			document.getElementById('array'+[1]+[j]).classList.add('bg-success');
			document.getElementById('array'+[2]+[j]).classList.add('bg-success');
			var event = new CustomEvent('win', { detail: { winner: whosTurn } });
			document.dispatchEvent(event);
			roundmove = 0;
			return true;
		}
	}

	// pa diagonal
	if (board[0][0] === player && board[1][1] === player && board[2][2] === player) {

		document.getElementById('array'+[0]+[0]).classList.add('bg-success');
		document.getElementById('array'+[1]+[1]).classList.add('bg-success');
		document.getElementById('array'+[2]+[2]).classList.add('bg-success');
		var event = new CustomEvent('win', { detail: { winner: whosTurn } });
		document.dispatchEvent(event);
		roundmove = 0;
		return true;
	}

	if(board[0][2] === player && board[1][1] === player && board[2][0] === player){

		document.getElementById('array'+[0]+[2]).classList.add('bg-success');
		document.getElementById('array'+[1]+[1]).classList.add('bg-success');
		document.getElementById('array'+[2]+[0]).classList.add('bg-success');
		var event = new CustomEvent('win', { detail: { winner: whosTurn } });
		document.dispatchEvent(event);
		roundmove = 0;
		return true;
	}

	if(roundmove == 9){
		var event = new CustomEvent('draw', { detail: { winner: 'none' } });
		document.dispatchEvent(event);
		roundmove = 0;
		return true;
	}
	

	console.log(board);
	return false;
}


function botMove(){
	let botMovecheck = false;

	setTimeout(function() {
		while(!botMovecheck){
			let botIndex1 = Math.floor(Math.random() * 3);
			let botIndex2 = Math.floor(Math.random() * 3);
	
			if(board[botIndex1][botIndex2] == ''){
				whosturn = 'Bot';

				let cbody = document.getElementById('array'+botIndex1+botIndex2).getElementsByTagName("div")[0];
				board[botIndex1][botIndex2] = legend;
				cbody.innerHTML = '<img src="tictactoe_'+legend+'.png" width="100%">';
				checkWin(legend,whosturn);
				legendToggler();
				turn.innerHTML = "Turn: "+player1;
				whosturn = player1;
				botMovecheck = true;
			}
		}
	}, 1);
	
}




// Game mode
function gameMode(gameMode){
	if(gameMode == 'pvb'){
		inputNameName2div.classList.add('d-none');
	}else{
		inputNameName2div.classList.remove('d-none');
	}

	selectMode.classList.add('d-none');
	selectRound.classList.remove('d-none');
	mode = gameMode;
}

// Round limits
function roundLimits(Limit){
	selectRound.classList.add('d-none');
	inputName.classList.remove('d-none');
	round = Limit;
}



// Event para sa winner
document.addEventListener('win', function(event) {
	var winner = event.detail.winner;



	if(mode == 'pvp'){
		if(winner == player1){
			player1Score++;
			document.getElementById('player1ScoreBoard').innerHTML = player1+": "+player1Score;
		}
	
		if(winner == player2){
			player2Score++;
			document.getElementById('player2ScoreBoard').innerHTML = player2+": "+player2Score;
		}
	}
	else{
		if(winner == player1){
			player1Score++;
			document.getElementById('player1ScoreBoard').innerHTML = player1+": "+player1Score;
		}
		else{
			botScore++;
			document.getElementById('botScoreBoard').innerHTML = "Bot: "+botScore;
		}
	}



	if(round == player1Score || round == player2Score || round == botScore ){
		Swal.fire({
			title: 'We have a winner',
			text: 'Congratulation player '+winner+'. You have won '+round+' times!!',
			showConfirmButton: false,
			footer: '<button onclick="quitGame()" class="btn btn-dark">Quit</button>',
			allowOutsideClick:false
		})
	}
	else{


		Swal.fire({
			position: 'top-end',
			title: 'Round End',
			text: '+1 score to player '+winner,
			showConfirmButton: false,
			footer: '<button onclick="resetGame()" class="btn btn-dark">Reset</button>',
			allowOutsideClick:false
		})


	}


});

//pag draw
document.addEventListener('draw', function(event) {
	
	Swal.fire({
		title: 'Round Draw',
		text: 'Resume match!!',
		showConfirmButton: false,
		footer: '<button onclick="resetGame()" class="btn btn-dark">Reset</button>',
		allowOutsideClick:false
	})

});

function resetGame(){
	if(mode == 'pvb'){turn.innerHTML = "Turn: "+player1;}


	board = [
		['', '', ''],
		['', '', ''],
		['', '', '']
	];


	for(let i=0; i<3; i++){
		for(let j=0; j<3; j++){
			document.getElementById('array'+[i]+[j]).innerHTML = '<div class="card-body"></div>';
			document.getElementById('array'+[i]+[j]).classList.remove('bg-success');
		}
	}


	swal.close();
}


function quitGame(){
	board = [
		['', '', ''],
		['', '', ''],
		['', '', '']
	];


	player1 = '';
	player2 = '';
	mode = '';
	round = 0;
	player1Score = 0;
	player2Score = 0;
	botScore = 0;
	roundmove = 0;
	whosturn = "";

	game.classList.add('d-none');
	selectMode.classList.remove('d-none');

	swal.close();
}