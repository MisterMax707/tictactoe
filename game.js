
const canvas = document.getElementById("canvas");
const CanvasContext = canvas.getContext("2d");
const cross_img = document.getElementById("cross_img");
const circle_img = document.getElementById("circle_img");
const btn_again = document.getElementById("btnAgain");
const messagePanel = document.getElementById('messagePanel');
const messageWinner = document.getElementById('messageWinner');
const inputFirstName = document.getElementById('firstPlayerName');
const inputSecondName = document.getElementById('secondPlayerName');
const btn_start = document.getElementById('btnStart');
const btn_continue = document.getElementById('btnContinue');
const startpopup = document.getElementById('popup');
const winnerpopup = document.getElementById('popupWinner');
const firstplayerscore = document.getElementById('firstPlayerWins');
const secondplayerscore = document.getElementById('secondPlayerWins');
const widthofwall = 10, heigthofwall = 100;
const colorofwalls = "#000000";
const fps = 30;
let buttonslist = [];
let firstPlayerName = 'firstPlayer', secondPlayerName = 'secondPlayer';
let movecounter = {

    i: 0,
    plus() {
        this.i++;
    },
    minus() {
        this.i--;
    },
    zero() {
        this.i = 0;
    }

}
let scorecounter = {

    firstPlayerScore: 0,
    secondPlayerScore: 0,
    firstPlayerWin() {
        this.firstPlayerScore++;
        firstplayerscore.innerHTML = this.firstPlayerScore;
    },
    secondPlayerWin() {
        this.secondPlayerScore++;
        secondplayerscore.innerHTML = this.secondPlayerScore;
    },
    scorezero() {
        this.firstPlayerScore = 0;
        this.secondPlayerScore = 0;
        firstplayerscore.innerHTML = '0';
        secondplayerscore.innerHTML = '0';
    }
}


let CreateButtons = () => {
    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++) {
            buttonslist.push(new button(widthofwall + i * (widthofwall + heigthofwall), widthofwall + (widthofwall + heigthofwall) * j))
        }
}
CreateButtons();
let openStartPopup = () => {
    startpopup.style.visibility = 'visible';
    startpopup.style.opacity = 1
}
let closeStartPopup = () => {
    startpopup.style.visibility = 'hidden';
    startpopup.style.opacity = 0;
}
let openWinnerPopup = (title) => {
    winnerpopup.style.visibility = 'visible';
    winnerpopup.style.opacity = 1;
    messageWinner.innerHTML = title;

}
let closeWinnerPopup = () => {
    winnerpopup.style.visibility = 'hidden';
    winnerpopup.style.opacity = 0;
}
let again = (event) => {
    buttonslist.forEach((btn) => {
        btn.btnclear();
        btn.enable = true;
    })
    movecounter.zero();
    scorecounter.scorezero();
    closeWinnerPopup();
    gameLoop();

}

let btncontinue = (event) => {
    buttonslist.forEach((btn) => {
        btn.btnclear();
        btn.enable = true;
    })
    movecounter.zero();
    closeWinnerPopup();
    gameLoop();
}

let start = (event) => {

    EnterFirstPlayerName();
    EnterSecondPlayerName();
    closeStartPopup();
    gameLoop();
}
btn_again.addEventListener("click", again);
btn_start.addEventListener("click", start);
btn_continue.addEventListener('click', btncontinue)
let enterFirstPlayerName = (event) => {
    if (event.key == "Enter" && inputFirstName.value != null && firstPlayerName != inputFirstName.value) {

        firstPlayerName = inputFirstName.value;
        inputFirstName.blur();
    }
}
function EnterFirstPlayerName() {
    if (inputFirstName.value != "" && firstPlayerName != inputFirstName.value) {

        firstPlayerName = inputFirstName.value;

    }
}
function EnterSecondPlayerName() {
    if (inputSecondName.value != "" && secondPlayerName != inputSecondName.value) {

        secondPlayerName = inputSecondName.value;

    }
}


let enterSecondPlayerName = (event) => {
    if (event.key == "Enter" && inputSecondName.value != null && secondPlayerName != inputSecondName.value) {

        secondPlayerName = inputSecondName.value;
        inputSecondName.blur();
    }
}
inputSecondName.addEventListener("keydown", enterSecondPlayerName);
inputFirstName.addEventListener("keydown", enterFirstPlayerName);


canvas.addEventListener("click", function (event) {
    for (let i = 0; i < 9; i++) {
        if (checkCollision(event.offsetX, event.offsetY, buttonslist[i]) && movecounter.i % 2 == 0 && buttonslist[i].enable) {
            movecounter.plus();
            buttonslist[i].attachCross(new cross(buttonslist[i].x, buttonslist[i].y));
            buttonslist[i].cross.draw();
            buttonslist[i].enable = false;

            break;

        }
        else if (checkCollision(event.offsetX, event.offsetY, buttonslist[i]) && movecounter.i % 2 == 1 && buttonslist[i].enable) {
            movecounter.plus();
            buttonslist[i].attachCircle(new circle(buttonslist[i].x, buttonslist[i].y))
            buttonslist[i].circle.draw();
            buttonslist[i].enable = false;
            break;
        }

    }
    writeMessage();
    if (movecounter.i > 4)
        checkWinner();



}, { once: false })
let CreateRect = (x, y, width, height, color) => {
    CanvasContext.fillStyle = color;
    CanvasContext.fillRect(x, y, width, height)

}

let playingfield = [
    [0, 2, 0, 2, 0, 2, 0],
    [1, 3, 1, 3, 1, 3, 1],
    [0, 2, 0, 2, 0, 2, 0],
    [1, 3, 1, 3, 1, 3, 1],
    [0, 2, 0, 2, 0, 2, 0],
    [1, 3, 1, 3, 1, 3, 1],
    [0, 2, 0, 2, 0, 2, 0]




];


let gameLoop = () => {
    draw()
    writeMessage();

    //  update()
}

let update = () => {//удалить 
    //something
}


let draw = () => {

    Drawfield();

}

//let gameInterval = setInterval(gameLoop,1000/fps)


let Drawfield = () => {
    for (let i = 0; i < playingfield.length; i++)
        for (let j = 0; j < playingfield[0].length; j++) {
            if (playingfield[i][j] == 0) {

                CreateRect(j / 2 * (heigthofwall + widthofwall), i / 2 * (heigthofwall + widthofwall), widthofwall, widthofwall, colorofwalls)
            }
            if (playingfield[i][j] == 2) {
                CreateRect(widthofwall + (j - 1) / 2 * (heigthofwall + widthofwall), i / 2 * (heigthofwall + widthofwall), heigthofwall, widthofwall, colorofwalls)
            }
            if (playingfield[i][j] == 1) {
                CreateRect(j / 2 * (heigthofwall + widthofwall), widthofwall + (i - 1) / 2 * (heigthofwall + widthofwall), widthofwall, heigthofwall, colorofwalls)
            }
        }

}
let checkWinner = () => {
    let counter = 0;//проверить каждую строку, каждый столбец и по диагоналям что у кнопок одинаковые элементы
    if
        (
        (buttonslist[0].cross != null && buttonslist[1].cross != null && buttonslist[2].cross != null) ||
        (buttonslist[3].cross != null && buttonslist[4].cross != null && buttonslist[5].cross != null) ||
        (buttonslist[6].cross != null && buttonslist[7].cross != null && buttonslist[8].cross != null) ||
        (buttonslist[0].cross != null && buttonslist[3].cross != null && buttonslist[6].cross != null) ||
        (buttonslist[1].cross != null && buttonslist[4].cross != null && buttonslist[7].cross != null) ||
        (buttonslist[2].cross != null && buttonslist[5].cross != null && buttonslist[8].cross != null) ||
        (buttonslist[0].cross != null && buttonslist[4].cross != null && buttonslist[8].cross != null) ||
        (buttonslist[2].cross != null && buttonslist[4].cross != null && buttonslist[6].cross != null)
    ) {

        buttonslist.forEach((button) => {
            button.enable = false;

        })
        scorecounter.firstPlayerWin();
        openWinnerPopup(`Победил ${firstPlayerName}!!!`);

        messagePanel.innerHTML = "";
    }
    else if
        (
        (buttonslist[0].circle != null && buttonslist[1].circle != null && buttonslist[2].circle != null) ||
        (buttonslist[3].circle != null && buttonslist[4].circle != null && buttonslist[5].circle != null) ||
        (buttonslist[6].circle != null && buttonslist[7].circle != null && buttonslist[8].circle != null) ||
        (buttonslist[0].circle != null && buttonslist[3].circle != null && buttonslist[6].circle != null) ||
        (buttonslist[1].circle != null && buttonslist[4].circle != null && buttonslist[7].circle != null) ||
        (buttonslist[2].circle != null && buttonslist[5].circle != null && buttonslist[8].circle != null) ||
        (buttonslist[0].circle != null && buttonslist[4].circle != null && buttonslist[8].circle != null) ||
        (buttonslist[2].circle != null && buttonslist[4].circle != null && buttonslist[6].circle != null)
    ) {
        buttonslist.forEach((button) => {
            button.enable = false;

        })
        scorecounter.secondPlayerWin();
        openWinnerPopup(`Победил ${secondPlayerName}!!!`);

        messagePanel.innerHTML = "";
    }
    else if (movecounter.i == 9) {
        openWinnerPopup('Ничья');
        messagePanel.innerHTML = "";
    }

}
let writeMessage = () => {

    if (movecounter.i % 2 == 0)
        messagePanel.innerHTML = `Ход игрока ${firstPlayerName}`;
    else
        messagePanel.innerHTML = `Ход игрока ${secondPlayerName}`;
}
let checkCollision = (x, y, obj) => {
    return x >= obj.x && x <= obj.x + obj.width && y >= obj.y && y <= obj.y + obj.height
}

openStartPopup();