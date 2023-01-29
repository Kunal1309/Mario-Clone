const $mario = document.querySelector("#mario");
const $mario2 = document.querySelector("#mario2");
const $pipe = document.getElementById('obstacleFour');
const $currentScore = document.getElementById('currentScore');
let counter = 0;
let jumper = 0;

window.onload = function(){
    let score = 20000
    $currentScore.innerText = score;

    if(score == 0){
        clearInterval(scoreInterval);
    }
    setInterval(
       function scoreInterval(){
        score--;
        $currentScore.innerText = score;
       }, 200)
}

function moveForward() {
    if (counter == 10810 || counter + 40 >= 10810) {
        return;
    }
    else {
        counter += 40;
        $mario.style.left = counter + "px";
        $mario2.style.left = counter + "px";
    }
}

function moveBackward() {
    if (counter == 0 || counter - 40 <= 0) {
        return;
    }
    else {
        counter -= 40;
        $mario.style.left = counter + "px";
        $mario2.style.left = counter + "px";
    }
}

function Jump() {
    if (counter == 10400) {
        $mario.style.bottom = (jumper + 460) + "px";
        $mario.style.left = counter + (10400-counter) + "px";
        $mario2.style.bottom = (jumper + 460) + "px";
        $mario2.style.left = counter + (10400-counter) + "px";
        return;
    }
    else {
        $mario.style.bottom = (jumper + 460) + "px";
        $mario.style.left = counter + "px";
        $mario2.style.bottom = "130px";
        $mario2.style.left = counter + "px";
        counter++;
    }
}

function JumpFault() {
    if (counter == 10400) {
        $mario.style.bottom = "130px";
        $mario.style.left = counter + (10400-counter) + "px";
        return;
    }
    else {
    $mario.style.bottom = "130px";
    $mario.style.left = counter + "px";
    $mario2.style.bottom = "130px";
    $mario2.style.left = counter + "px";
    counter++;
    }
}

document.onkeydown = function (event) {
    $mario2.style.display = "none";
    $mario.style.display = "block";
    switch (event.keyCode) {
        case 39:
            moveForward();
            break;
        case 38:
            Jump();
            break;
        case 37:
            moveBackward();
            break;
        case 40:
            $mario.style.height = "50px";
            break;
    }
};

document.onkeyup = function (event) {
    $mario2.style.display = "block";
    $mario.style.display = "none";
    switch (event.keyCode) {
        case 39:
            moveForward();
            break;
        case 38:
            JumpFault();
            break;
        case 37:
            moveBackward();
            break;
        case 40:
            $mario.style.height = "130px";
            break;
    }
};

