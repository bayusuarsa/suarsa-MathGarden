const BACKGROUND_COLOR = '#000000';
const LINE_COLOR = '#FFFFFF';
const LINE_WIDTH = 15;

var currentX = 0;
var currentY = 0;
var previousX = 0;
var previousY = 0;

var canvas;
var contex;

function prepareCanvas() {
    // console.log('Prepearing Canvas');
    canvas = document.getElementById('my-canvas');
    contex = canvas.getContext('2d');

    contex.fillStyle = BACKGROUND_COLOR;
    contex.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    contex.strokeStyle = LINE_COLOR;
    contex.lineWidth = LINE_WIDTH;
    contex.lineJoin = 'round';

    var isPainting = false;


    document.addEventListener('mousedown', function (event) {
        //    console.log('X coordinate : ', + event.clientX);
        //    console.log('Y coordinate : ', + event.clientY); 
        // console.log('Mouse Pressed !')
        isPainting = true;
        currentX = event.clientX - canvas.offsetLeft;
        currentY = event.clientY - canvas.offsetTop;
    });

    document.addEventListener('mousemove', function (event) {
        if (isPainting) {
            previousX = currentX;
            currentX = event.clientX - canvas.offsetLeft;

            previousY = currentY;
            currentY = event.clientY - canvas.offsetTop;

            draw();
        }

    });

    document.addEventListener('mouseup', function (event) {
        // console.log('Mouse Released!');
        isPainting = false;
    });

    canvas.addEventListener('mouseleave', function (event) {
        isPainting = false;
    });

    //  Touch Event

    canvas.addEventListener('touchstart', function (event) {
        console.log('Touchdown !')
        isPainting = true;
        currentX = event.touches[0].clientX - canvas.offsetLeft;
        currentY = event.touches[0].clientY - canvas.offsetTop;
    })

    canvas.addEventListener('touchend', function (event) {
        isPainting = false;
    });

    canvas.addEventListener('touchcancel', function (event) {
        isPainting = false;
    });

    canvas.addEventListener('touchmove', function (event) {
        if (isPainting) {
            previousX = currentX;
            currentX = event.touches[0].clientX - canvas.offsetLeft;

            previousY = currentY;
            currentY = event.touches[0].clientY - canvas.offsetTop;

            draw();
        }

    });
}


function draw() {
    contex.beginPath();
    contex.moveTo(previousX, previousY);
    contex.lineTo(currentX, currentY);
    contex.closePath();
    contex.stroke();
}

function clearCanvas() {
    currentX = 0;
    currentY = 0;
    previousX = 0;
    previousY = 0;

    contex.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);


}