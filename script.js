let numOfRows = 16;
let colorPicker = 0;

document.getElementById("black").style.backgroundColor = "yellow"

function makeBoard() {
    for (x = 0; x < (parseInt(numOfRows) * parseInt(numOfRows)); x++) {
        const board = document.createElement('div');
        board.className = "color";
        board.setAttribute("id", "color")
        board.style.backgroundColor = "rgb(250, 250, 250)"
        board.style.opacity = "1.0";
        board.style.shade = "brightness(100%)"
        document.getElementById('board').appendChild(board);
        document.getElementById("board").style.gridTemplateColumns = `repeat(${parseInt(numOfRows)}, ${600 / numOfRows}px)`;
        document.getElementById("board").style.gridAutoRows = `${600 / parseInt(numOfRows)}px`;
    }
    const boxes = Array.from(document.querySelectorAll('.color'));

    boxes.forEach(box => box.addEventListener("mouseover", function () {
        if (colorPicker == 0) {
            box.style.backgroundColor = blackColor();
        } else if (colorPicker == 1) {
            box.style.backgroundColor = randomColor();
        } else if (colorPicker == 2) {
            box.style.backgroundColor = gradient(extractRgb(box.style.backgroundColor));
        }
    }));
};

function blackColor() {
    document.getElementById("black").style.backgroundColor = "yellow"
    document.getElementById("rainbow").style.backgroundColor = "Snow"
    document.getElementById("trans").style.backgroundColor = "Snow"
    board.style.removeProperty("animation");
    colorPicker = 0
    return "rgb(0,0,0)"
}

function randomColor() {
    document.getElementById("black").style.backgroundColor = "Snow"
    document.getElementById("rainbow").style.backgroundColor = "yellow"
    document.getElementById("trans").style.backgroundColor = "Snow"
    board.style.removeProperty("animation");
    colorPicker = 1
    const randomColor = '#' + Math.floor(Math.random() * 16777214).toString(16);
    return randomColor;
}

function gradient(rgbArray) {
    document.getElementById("black").style.backgroundColor = "Snow"
    document.getElementById("rainbow").style.backgroundColor = "Snow"
    document.getElementById("trans").style.backgroundColor = "yellow"
    board.style.removeProperty("animation");
    colorPicker = 2;
    return rgb(parseInt(rgbArray[0]) - 26, parseInt(rgbArray[1]) - 26, parseInt(rgbArray[2]) - 26);
}

function gridSize() {
    erase()
    numOfRows = prompt("How many rows? Max 100");
    let loop = true;
    while (loop) {
        if (!numOfRows) {
            numOfRows = 16;
        } else if (parseInt(numOfRows) > 100) {
            numOfRows = prompt("Max is 100");
        } else if (parseInt(numOfRows) < 1) {
            numOfRows = prompt("The number of Rows must be positive");
        } else if (isNaN(numOfRows)) {
            numOfRows = prompt("Please enter a number");
        } else {
            loop = false
        }
    }
    makeBoard();
}

function erase() {
    for (x = 0; x < (parseInt(numOfRows) * parseInt(numOfRows)); x++) {
        board.removeChild(board.lastElementChild);
    }

    board.style.animation = "shake 0.5s",
        board.style.animationIterationCount = "1"
}

function extractRgb(string) {
    return string.match(/[0-9.]+/gi)
}

function rgb(r, g, b) {
    if (r < 0) {
        r = 0;
    }
    if (g < 0) {
        g = 0;
    }
    if (b < 0) {
        b = 0;
    }
    return "rgb(" + r + "," + g + "," + b + ")";
}

makeBoard();
reset.addEventListener("click", function () { erase(), makeBoard() });
black.addEventListener("click", blackColor);
rainbow.addEventListener("click", randomColor);
changeSize.addEventListener("click", gridSize)
trans.addEventListener("click", gradient);