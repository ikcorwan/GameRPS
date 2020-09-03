// *** fix display of units on mobile phone ***

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

// We listen to the resize event
window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

// *** Game ***
const gameSummary = {
    numbers: 0,
    wins: 0,
    losses: 0,
    draw: 0
};

const game = {
    playerHand: "",
    aiHand: "",
};

const hands = [...document.querySelectorAll(".game__select img")];
const playerChoice = document.querySelector('[data-summary="your-choice"]');
const computerChoice = document.querySelector('[data-summary="ai-choice"]');
const winner = document.querySelector('[data-summary="who-win"]');

function handSelection() {
    game.playerHand = this.dataset.option;
    hands.forEach(hand => hand.style.boxShadow = "");
    this.style.boxShadow = "0 0 1px 2px #333";
    playerChoice.textContent = ` ${game.playerHand}`;
    computerChoice.textContent = "";
    winner.textContent = "";



}

function aiChoice() {
    const aiHand = hands[Math.floor(Math.random() * 3)].dataset.option;
    return aiHand;
}

function checkResult(player, ai) {

    if (player === ai) {
        return 'draw';
    } else if ((player === "paper" && ai === "rock") || (player === "rock" && ai === "scissors") || (player === "scissors" && ai === "paper")) {
        return 'win';

    } else {
        return 'loss';
    }
}


function publishResult(player, ai, result) {
    playerChoice.textContent = ` ${player}`;
    computerChoice.textContent = ` ${ai}`;
    winner.textContent = result;

    gameSummary.numbers++;
    document.querySelector('.numbers span').textContent = gameSummary.numbers;

    if (result === "win") {
        gameSummary.wins++;
        document.querySelector('.wins span').textContent = gameSummary.wins;
        document.querySelector('[data-summary="who-win"]').textContent = "You win!";
        document.querySelector('[data-summary="who-win"]').style.color = "green";

    } else if (result === "loss") {
        gameSummary.losses++;
        document.querySelector('.losses span').textContent = gameSummary.losses;
        document.querySelector('[data-summary="who-win"]').textContent = "You loose!";
        document.querySelector('[data-summary="who-win"]').style.color = "#d82f36";


    } else {
        gameSummary.draw++;
        document.querySelector('.draws span').textContent = gameSummary.draw;
        document.querySelector('[data-summary="who-win"]').textContent = "Draw!";
        document.querySelector('[data-summary="who-win"]').style.color = "#333333";
    }
}

function endGame() {
    document.querySelector(`[data-option = "${game.playerHand}"]`).style.boxShadow = "";
    game.playerHand = "";
    game.aiHand = "";
}

function restartGame() {
    playerChoice.textContent = "";
    computerChoice.textContent = "";
    winner.textContent = "";
    gameSummary.numbers = 0;
    gameSummary.wins = 0;
    gameSummary.losses = 0;
    gameSummary.draw = 0;
    document.querySelector('.numbers span').textContent = "";
    document.querySelector('.wins span').textContent = "0";
    document.querySelector('.losses span').textContent = "0";
    document.querySelector('.draws span').textContent = "0";
}

//Funkcja sterująca

function startGame() {
    if (game.playerHand === "") {
        return alert("Choose a hand!");
    }
    game.aiHand = aiChoice();
    const gameResult = checkResult(game.playerHand, game.aiHand);
    publishResult(game.playerHand, game.aiHand, gameResult);
    endGame();

}

hands.forEach(hand => hand.addEventListener("click", handSelection));

document.querySelector(".button__start").addEventListener("click", startGame);
document.querySelector(".button__restart").addEventListener("click", restartGame);