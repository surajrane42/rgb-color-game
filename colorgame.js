var numSquares = 6;
var colors;
var pickedColor;

var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var heading = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init(){
	//add event listener to mode buttons
	setUpModeButtons();
	//add click listener to all squares
	setUpSquares();
	reset();
}

function setUpModeButtons(){
	for (var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click",function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.toggle("selected");
			if(this.textContent === "Easy"){
				numSquares = 3;
			}
			else {
				numSquares = 6;
			}
			reset();
		})
	}
}

function setUpSquares(){
	for(var i=0;i< squares.length;i++){
	// add click listeners to squares
		squares[i].addEventListener("click",function(){
			//grab color of clicked square
			var clickedColor=this.style.backgroundColor;
			if(clickedColor===pickedColor){
				messageDisplay.textContent = "Correct!";
				resetButton.textContent="Play Again?";
				changeColors(clickedColor);
				heading.style.backgroundColor = clickedColor;
			}else{
				//fade out the squares
				 this.style.backgroundColor = "#232323"
				 messageDisplay.textContent = "Try Again";
			}
		})
	}
}

function changeColors(color){
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor=color;
	}
}

function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num) {
	var arr=[];
	for (var i = 0; i < num; i++) {
		arr.push(randomColor());
	}
	return arr;
}

function randomColor(){
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}

resetButton.addEventListener("click",function(){
	reset();
})



function reset(){
		//generate all new colors
	colors = generateRandomColors(numSquares);
	//pick a new random color
	pickedColor = pickColor();
	//changes colorDisplay to new picked color and message display to none
	colorDisplay.textContent = pickedColor;
	messageDisplay.textContent = "";
	resetButton.textContent="New Colors"
	//change color of squares
	for(var i=0;i< squares.length;i++){
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		}
		else {
			squares[i].style.display = "none";
		}
	}
	heading.style.backgroundColor = "steelblue";
}