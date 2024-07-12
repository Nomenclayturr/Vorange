const gameState = {
    board: [],
    balls: [],
    goals: [],
    obstacles: [],
    boardSize: 5,
    currentLevel: 1,
};

const levels = [
    {
        boardSize: 5,
        balls: [{ x: 0, y: 0 }],
        goals: [{ x: 4, y: 4 }],
        obstacles: [{ x: 2, y: 2 }]
    },
    {
        boardSize: 7,
        balls: [{ x: 0, y: 0 }],
        goals: [{ x: 6, y: 6 }],
        obstacles: [{ x: 3, y: 3 }, { x: 4, y: 4 }]
    },
    // Add more levels as needed
];

function loadLevel(levelNumber) {
    gameState.currentLevel = levelNumber;
    const level = levels[levelNumber - 1];
    gameState.boardSize = level.boardSize;
    gameState.balls = level.balls;
    gameState.goals = level.goals;
    gameState.obstacles = level.obstacles;
    createBoard();
    render();
}

function createBoard() {
    gameState.board = Array.from({ length: gameState.boardSize }, () =>
        Array.from({ length: gameState.boardSize }, () => 'empty')
    );

    gameState.balls.forEach(ball => {
        gameState.board[ball.y][ball.x] = 'ball';
    });

    gameState.goals.forEach(goal => {
        gameState.board[goal.y][goal.x] = 'goal';
    });

    gameState.obstacles.forEach(obstacle => {
        gameState.board[obstacle.y][obstacle.x] = 'obstacle';
    });
}

function render() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = '';
    gameContainer.style.gridTemplateColumns = `repeat(${gameState.boardSize}, 1fr)`;
    gameContainer.style.gridTemplateRows = `repeat(${gameState.boardSize}, 1fr)`;

    gameState.board.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const cellDiv = document.createElement('div');
            cellDiv.className = `grid-cell ${cell}`;
            gameContainer.appendChild(cellDiv);
        });
    });
}

function moveBall(ballIndex, direction) {
    const ball = gameState.balls[ballIndex];
    const newPosition = { x: ball.x, y: ball.y };

    switch (direction) {
        case 'up':
            newPosition.y = Math.max(0, ball.y - 1);
            break;
        case 'down':
            newPosition.y = Math.min(gameState.boardSize - 1, ball.y + 1);
            break;
        case 'left':
            newPosition.x = Math.max(0, ball.x - 1);
            break;
        case 'right':
            newPosition.x = Math.min(gameState.boardSize - 1, ball.x + 1);
            break;
    }

    if (isValidMove(newPosition)) {
        gameState.board[ball.y][ball.x] = 'empty';
        gameState.board[newPosition.y][newPosition.x] = 'ball';
        gameState.balls[ballIndex] = newPosition;
        render();
        checkWinCondition();
    }
}

function isValidMove(newPosition) {
    return gameState.board[newPosition.y][newPosition.x] === 'empty' ||
           gameState.board[newPosition.y][newPosition.x] === 'goal';
}

function checkWinCondition() {
    const allBallsInGoals = gameState.balls.every((ball, index) =>
        gameState.goals.some(goal => goal.x === ball.x && goal.y === ball.y)
    );

    if (allBallsInGoals) {
        alert('Congratulations! You won!');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadLevel(1);

    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'ArrowUp':
                moveBall(0, 'up');
                break;
            case 'ArrowDown':
                moveBall(0, 'down');
                break;
            case 'ArrowLeft':
                moveBall(0, 'left');
                break;
            case 'ArrowRight':
                moveBall(0, 'right');
                break;
            case 'w':
                moveBall(1, 'up');
                break;
            case 's':
                moveBall(1, 'down');
                break;
            case 'a':
                moveBall(1, 'left');
                break;
            case 'd':
                moveBall(1, 'right');
                break;
        }
    });
});