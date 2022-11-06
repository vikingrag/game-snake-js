// Создаема функцию в котороы прописываем "canvas" и формат игры 
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Создаем функцию в котороый прописываем картинки, котороые используенм в игре и загружаем их
const ground = new Image();
ground.src = "img/game_screen.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

// Создаем переменную "box" в котороый прописываем значение одного "бокса" на игровом поле в размере 32 px в который будем помещать еду для змейки и голову змейки 
let box = 32;

// Создаем переменную в которой прописываем ее значение ровно "0"
let score = 0;

// Создаем переменную "food" (еда) и задаем ее параметры по координатам х, у на игровом поле, задаем, что каждый раз она будет появляться в новом месте  
let food = {
	x: Math.floor((Math.random() * 17 + 1)) * box,
	y: Math.floor((Math.random() * 15 + 3)) * box,
};

// Создаем говолу змейки в игровом поле по координатам х, у, каждый раз начинаем игру, голова будет появляться в центре игрового поля 
let snake = []
snake[0] = {
	x: 9 * box,
	y: 10 * box
};

// Задаем клавиши для управления змейкой, так же создаем запрет движения змейки вправо, если она движиться влево, так же запрет для движения вверх, если двигается вниз и наоботрот 
document.addEventListener("keydown", direction);

let dir;
function direction(event) {
	if (event.keyCode == 37 && dir != "right")
		dir = "left";
	else if (event.keyCode == 38 && dir != "down")
		dir = "up";
	else if (event.keyCode == 39 && dir != "left")
		dir = "right";
	else if (event.keyCode == 40 && dir != "up")
		dir = "down";
}

// Создаем функцию в которой прописываем, что если змейка есть сама себя, игра заканчивается и начинаем заново
function eatTrail(head, arr) {
	for (let i = 0; i < arr.length; i++) {
		if (head.x == arr[i].x && head.y == arr[i].y)
			clearInterval(game);
	}
}

// Создаем функцию в которой прописываем, что каждый раз, когда змейка ест еду, будет расти, создаем цвет головы и хвоста змейки 
function drawGame() {
	ctx.drawImage(ground, 0, 0);
	ctx.drawImage(foodImg, food.x, food.y);

	for (let i = 0; i < snake.length; i++) {
		ctx.fillStyle = i == 0 ? "blue" : "gold";
		ctx.fillRect(snake[i].x, snake[i].y, box, box);
	}

	// Создаем переменную которая задает размеры шрифта счета в игре и каждый раз, когда змейка сьедает еду, будет прибавляться одно очко 
	ctx.fillStyle = "white";
	ctx.font = "50px Arial";
	ctx.fillText(score, box * 2.5, box * 1.7);

	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	if (snakeX == food.x && snakeY == food.y) {
		score++;

		food = {
			x: Math.floor((Math.random() * 17 + 1)) * box,
			y: Math.floor((Math.random() * 15 + 3)) * box,
		};
	}
	else {

		//Удаляем голову змейки
		snake.pop();
	}
	//Создаем функцию в которой задаем границы нашего игрового поля, в случае, если змейка попадает на границу, игра заканчивается и начинаем заново
	if (snakeX < box || snakeX > box * 17 || snakeY < 3 * box || snakeY > box * 17) {
		clearInterval(game);
	}

	if (dir == "left") snakeX -= box;
	if (dir == "right") snakeX += box;
	if (dir == "up") snakeY -= box;
	if (dir == "down") snakeY += box;

	// Создаем новую голову змейки
	let newHead = {
		x: snakeX,
		y: snakeY
	};

	eatTrail(newHead, snake);

	// Создаем функцию новой головы змейки
	snake.unshift(newHead);
}

// Создаем функцию интервал игры
let game = setInterval(drawGame, 60);
