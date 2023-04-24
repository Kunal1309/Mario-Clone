window.onload = function () {
    const $mario = document.querySelector("#mario");
    const $mario2 = document.querySelector("#mario2");
    const $pipe = document.getElementById('obstacleFour');
    const $currentScore = document.getElementById('currentScore');
    const $startButton = document.getElementById('startButton');
    const $startGame = document.getElementById('startGame');
    const $mainGame = document.getElementById('mainGame');
    const $endGame = document.getElementById('endGame');
    const $endGameButton = document.getElementById('endGameButton');
    const $displayEndScore = document.getElementById('displayEndScore');
    const brickBlock = document.getElementsByClassName("BricksBlockBarrier");
    const noRunRoute = document.getElementsByClassName("longBricksWall");
    const jumpBlock = document.getElementsByClassName("jumpBlock");

    const $villainOne = document.getElementById('villainHeadOne');
    const $villainTwo = document.getElementById('villainHeadTwo');
    const $villainThree = document.getElementById('villainHeadThree');
    const $villainFour = document.getElementById('villainHeadFour');
    const $villainFive = document.getElementById('villainHeadFive');
    const $villainSix = document.getElementById('villainHeadSix');
    const villain = document.getElementsByClassName("villain");

    const $turtleOne = document.getElementById('turtlesOne_left');
    const $turtleTwo = document.getElementById('turtlesTwo_left');
    const $turtleThree = document.getElementById('turtlesThree_left');
    const $turtleFour = document.getElementById('turtlesFour_left');
    const $turtleFive = document.getElementById('turtlesFive_left');
    const $turtleSix = document.getElementById('turtlesSix_left');


    const $startSound = document.getElementById('marioAudioStart');
    const $mainSound = document.getElementById('marioAudioMain');
    const $jumpSound = document.getElementById('marioAudioJump');
    const $coinSound = document.getElementById('marioAudioCoin');
    const $overSound = document.getElementById('marioAudioGameOver');
    const $winSound = document.getElementById('marioAudioWin');


    let isJumping = false;
    let upTime;
    let downTime;

    let counter = 0;
    let jumper = 0;
    var runMario, runMario2, scoreInterval;
    let counting = Number($mario.style.bottom.slice(0, -2));


    // ========================= Function for Score ==============================
    $startSound.autoplay = true;
    $startSound.muted = true;
    $startSound.play();
    document.body.addEventListener("mousemove", function () {
        $startSound.play();
    })

    score = 0
    $currentScore.innerText = score;


    function scoring() {
        score++;
        $currentScore.innerText = score;
    }

    function stopScore() {
        clearInterval(scoreInterval);
    }

    // ===========================================================================================================

    // ============================== Function to Game over when Fall into Gap between Run Route =========================================

    function checkRunPath() {
        if (((Number($mario.style.left.slice(0, -2)) > 3230 && Number($mario.style.left.slice(0, -2)) + 70 < 3400 && Number($mario.style.bottom.slice(0, -2) <= 130)) || (Number($mario.style.left.slice(0, -2)) > 4010 && Number($mario.style.left.slice(0, -2)) + 70 < 4180 && Number($mario.style.bottom.slice(0, -2) <= 130)) || (Number($mario.style.left.slice(0, -2)) > 7390 && Number($mario.style.left.slice(0, -2)) + 70 < 7500 && Number($mario.style.bottom.slice(0, -2) <= 130))) ||
            ((Number($mario2.style.left.slice(0, -2)) > 3230 && Number($mario2.style.left.slice(0, -2)) + 70 < 3400 && Number($mario2.style.bottom.slice(0, -2) <= 130)) || (Number($mario2.style.left.slice(0, -2)) > 4010 && Number($mario2.style.left.slice(0, -2)) + 70 < 4180 && Number($mario2.style.bottom.slice(0, -2) <= 130)) || (Number($mario2.style.left.slice(0, -2)) > 7390 && Number($mario2.style.left.slice(0, -2)) + 70 < 7500 && Number($mario2.style.bottom.slice(0, -2) <= 130)))) {

            $mario.style.bottom = "-10px";
            $mario2.style.bottom = "-10px";
            $mainSound.pause();
            $overSound.play();

            setTimeout(() => {
                $endGame.style.display = 'flex';
                $mainGame.style.display = 'none';
                $displayEndScore.innerText = score;
                counter = 0;
                stopScore();
            }, 500);
        }
    }

    // function gravity() {
    //     let k = 0;
    //     while (counting > 129) {
    //         for (var u = 0; u < brickBlock.length; u++) {
    //             if ((($mario.getBoundingClientRect().right >= brickBlock[u].getBoundingClientRect().left && $mario.getBoundingClientRect().left <= brickBlock[u].getBoundingClientRect().right) && ($mario.getBoundingClientRect().bottom == brickBlock[u].getBoundingClientRect().bottom)) || (($mario2.getBoundingClientRect().right >= brickBlock[u].getBoundingClientRect().left && $mario2.getBoundingClientRect().left <= brickBlock[u].getBoundingClientRect().right) && ($mario2.getBoundingClientRect().bottom == brickBlock[u].getBoundingClientRect().bottom))) {
    //                 return;
    //             }
    //         }
    //         counting--;
    //         $mario.style.bottom = (jumper + counting) + "px";
    //         $mario2.style.bottom = (jumper + counting) + "px"
    //         k++;
    //     }
    // }

    // const isOnTop = ($mario) => {
    //     let element = document.querySelector($mario),
    //         divs = document.querySelectorAll('section div');
      
    //     return [...jumpBlock].some(jumpBlock =>
    //         jumpBlock.getBoundingClientRect().bottom > element.getBoundingClientRect().bottom
    //     );
    //   }

    //   isOnTop();

    // ===========================================================================================================

    // ============================== Function to Move Forward after Clicking Right Arrow Button =========================================

    function moveForward() {

        if (counter == 10810 || counter + 40 >= 10810) {
            $winSound.play();
            $mainSound.pause();
            setTimeout(() => {
                $winSound.pause();
                $overSound.play();
                $endGame.style.display = 'flex';
                $mainGame.style.display = 'none';
                $displayEndScore.innerText = score;
                counter = 0;
                stopScore();
                return;
            }, 2000)
            return;
        }

        else {
            for (var i = 0; i <= 40; i++) {
                counter += 1;
                for (var j = 0; j < brickBlock.length; j++) {
                    if ((($mario.getBoundingClientRect().right == brickBlock[j].getBoundingClientRect().left) || ($mario2.getBoundingClientRect().right == brickBlock[j].getBoundingClientRect().left)) && (((brickBlock[j].getBoundingClientRect().bottom > $mario.getBoundingClientRect().top && brickBlock[j].getBoundingClientRect().bottom < $mario.getBoundingClientRect().bottom) || (brickBlock[j].getBoundingClientRect().bottom > $mario2.getBoundingClientRect().top && brickBlock[j].getBoundingClientRect().bottom < $mario2.getBoundingClientRect().bottom)) || (($mario.getBoundingClientRect().bottom > brickBlock[j].getBoundingClientRect().top && $mario.getBoundingClientRect().bottom < brickBlock[j].getBoundingClientRect().bottom) || ($mario2.getBoundingClientRect().bottom > brickBlock[j].getBoundingClientRect().top && $mario2.getBoundingClientRect().bottom < brickBlock[j].getBoundingClientRect().bottom)))) {
                        return;
                    }
                }
                $mario.style.left = counter + "px";
                $mario2.style.left = counter + "px";
            }

        }
    }


    //=========================================================================================================================

    // ============================== Function to Move Backword after Clicking Left Arrow Button =========================================

    function moveBackward() {
        if (counter == 0 || counter - 40 <= 0) {
            return;
        }
        else {
            for (let i = 0; i <= 40; i++) {
                for (var j = 0; j < brickBlock.length; j++) {
                    if ((($mario.getBoundingClientRect().left == brickBlock[j].getBoundingClientRect().right) || ($mario2.getBoundingClientRect().left == brickBlock[j].getBoundingClientRect().right)) && (((brickBlock[j].getBoundingClientRect().bottom > $mario.getBoundingClientRect().top && brickBlock[j].getBoundingClientRect().bottom < $mario.getBoundingClientRect().bottom) || (brickBlock[j].getBoundingClientRect().bottom > $mario2.getBoundingClientRect().top && brickBlock[j].getBoundingClientRect().bottom < $mario2.getBoundingClientRect().bottom)) || (($mario.getBoundingClientRect().bottom > brickBlock[j].getBoundingClientRect().top && $mario.getBoundingClientRect().bottom < brickBlock[j].getBoundingClientRect().bottom) || ($mario2.getBoundingClientRect().bottom > brickBlock[j].getBoundingClientRect().top && $mario2.getBoundingClientRect().bottom < brickBlock[j].getBoundingClientRect().bottom)))) {
                        return;
                    }
                }
                counter--;
                $mario.style.left = counter + "px";
                $mario2.style.left = counter + "px";
            }
        }
    }

    // ================================================================================================================================

    // ============================== Function to Jump (Move Upside) after Clicking Up Arrow Button =========================================

    function Jump(event) {
        clearInterval(runMario);
        $jumpSound.play();

        if (counter == 10400) {
            $mario.style.bottom = (jumper + 460) + "px";
            $mario.style.left = counter + (10400 - counter) + "px";
            $mario2.style.bottom = (jumper + 460) + "px";
            $mario2.style.left = counter + (10400 - counter) + "px";
            $winSound.play();
            $mainSound.pause();
            setTimeout(() => {
                $winSound.pause();
                $overSound.play();
                $endGame.style.display = 'flex';
                $mainGame.style.display = 'none';
                $displayEndScore.innerText = score;
                counter = 0;
                stopScore();
                return;
            }, 2000)
            return;
        }

        // else if((Number($mario.style.bottom.slice(0, -2)) <= 130) && ((Number($mario.style.left.slice(0, -2)) > 600 && Number($mario.style.left.slice(0, -2)) < 670)) || (Number($mario.style.left.slice(0, -2)) > 800 && Number($mario.style.left.slice(0, -2)) < 1240) || (Number($mario.style.left.slice(0, -2)) > 3500 && Number($mario.style.left.slice(0, -2)) < 3730) || (Number($mario.style.left.slice(0, -2)) > 4480 && Number($mario.style.left.slice(0, -2)) < 4550) || (Number($mario.style.left.slice(0, -2)) > 4800 && Number($mario.style.left.slice(0, -2)) < 4960) || (Number($mario.style.left.slice(0, -2)) > 5300 && Number($mario.style.left.slice(0, -2)) < 5370) || (Number($mario.style.left.slice(0, -2)) > 5500 && Number($mario.style.left.slice(0, -2)) < 5620) || (Number($mario.style.left.slice(0, -2)) > 5700 && Number($mario.style.left.slice(0, -2)) < 5770) || (Number($mario.style.left.slice(0, -2)) > 6000 && Number($mario.style.left.slice(0, -2)) < 6070) || (Number($mario.style.left.slice(0, -2)) > 6580 && Number($mario.style.left.slice(0, -2)) < 6740) || (Number($mario.style.left.slice(0, -2)) > 9150 && Number($mario.style.left.slice(0, -2)) < 9450)){
        //     for(var k=0; k<100; k++){
        //         $mario.style.bottom = (jumper + counting) + "px";
        //         $mario2.style.bottom = (jumper + counting) + "px";
        //     }
        // }

        else {
            for (let i = 0; i <= 280; i++) {
                counting += 1;
                for (var j = 0; j < jumpBlock.length; j++) {
                    if ((($mario.getBoundingClientRect().right >= jumpBlock[j].getBoundingClientRect().left && $mario.getBoundingClientRect().left <= jumpBlock[j].getBoundingClientRect().right) || ($mario2.getBoundingClientRect().right >= jumpBlock[j].getBoundingClientRect().left && $mario2.getBoundingClientRect().left <= jumpBlock[j].getBoundingClientRect().right)) && (((jumpBlock[j].getBoundingClientRect().bottom >= $mario.getBoundingClientRect().top)))) {
                        console.log(jumpBlock[j])
                        jumpBlock[j].style.top = (Number(jumpBlock[j].style.bottom.slice(0, -2)) + 15) + "px"
                        console.log(jumpBlock[j])
                        setTimeout(() => {
                            jumpBlock[j].style.bottom = (Number(jumpBlock[j].style.bottom.slice(0, -2)) - 15) + "px"
                        }, 1000)
                        setTimeout(JumpFault, 1000);
                        return;
                    }
                }
                $mario.style.bottom = (jumper + counting) + "px";
                $mario2.style.bottom = (jumper + counting) + "px";
            }

        }

        setTimeout(JumpFault, 10);
    }

    function longJump() {
        // $mario.style.bottom = (jumper + 360) + "px";
        // $mario.style.left = counter + 100 + "px";
        // $mario2.style.bottom = (jumper + 360) + "px";
        // $mario2.style.left = counter + 100 + "px";
        if (isJumping) return;
        upTime = setInterval(() => {
            $marioBottom = parseInt($marioBottom) + 10;
            $mario2Bottom = parseInt($mario2Bottom) + 10;
            $mario.style.bottom = $marioBottom + 'px';
            $mario2.style.bottom = $mario2Bottom + 'px';
        }, 20)
    }

    function longJumpFault() {
        clearInterval(runMario);
        for (let i = 0; i <= villain.length; i++) {
            if (counter == 10400) {
                $mario.style.bottom = "130px";
                $mario.style.left = counter + (10400 - counter) + "px";
                return;
            }
            else {
                //================ For Villain Over when Mario Touches Villain by Top-Side of Villain =============================================================
                if (($mario.getBoundingClientRect().right >= villain[i].getBoundingClientRect().left && $mario.getBoundingClientRect().left <= villain[i].getBoundingClientRect().right) || ($mario2.getBoundingClientRect().right >= villain[i].getBoundingClientRect().left && $mario2.getBoundingClientRect().left <= villain[i].getBoundingClientRect().right)) {
                    console.log($mario.getBoundingClientRect());
                    $mario.style.bottom = "200px";
                    $mario2.style.bottom = "200px";
                    villain[i].style.bottom = "0px";
                    villain[i].style.display = "none";
                    $mario.style.bottom = "130px";
                    $mario.style.left = (counter + 200) + "px";
                    $mario2.style.bottom = "130px";
                    $mario2.style.left = (counter + 200) + "px"
                }
                $mario.style.bottom = 130 + "px";
                $mario.style.left = (counter + 200) + "px";
                $mario2.style.bottom = 130 + "px";
                $mario2.style.left = (counter + 200) + "px";
            }
        }
    }

    //=========================================================================================================================================

    // ============== Function to Come Back on Ground from Jump (Move Downside) after Leave Up Arrow Button =========================================

    function JumpFault() {


        if (counter == 10400) {
            $mario.style.bottom = "130px";
            $mario.style.left = counter + (10400 - counter) + "px";
            $winSound.play();
            $mainSound.pause();
            return;
        }
        else {
            for (let i = 0; i <= 330; i++) {

                for (let i = 0; i < villain.length; i++) {
                    //================ For Villain Over when Mario Touches Villain by Top-Side of Villain =============================================================
                    if ((($mario.getBoundingClientRect().right >= villain[i].getBoundingClientRect().left && $mario.getBoundingClientRect().left <= villain[i].getBoundingClientRect().right) || ($mario2.getBoundingClientRect().right >= villain[i].getBoundingClientRect().left && $mario2.getBoundingClientRect().left <= villain[i].getBoundingClientRect().right)) && (($mario.getBoundingClientRect().bottom == villain[i].getBoundingClientRect().top) || ($mario2.getBoundingClientRect().bottom == villain[i].getBoundingClientRect().top))) {
                        let counting = 461;
                        villain[i].style.bottom = "0px";
                        villain[i].style.display = "none";
                    }
                }

                for (var j = 0; j < brickBlock.length; j++) {
                    if ((($mario.getBoundingClientRect().right >= brickBlock[j].getBoundingClientRect().left && $mario.getBoundingClientRect().left <= brickBlock[j].getBoundingClientRect().right) || ($mario2.getBoundingClientRect().right >= brickBlock[j].getBoundingClientRect().left && $mario2.getBoundingClientRect().left <= brickBlock[j].getBoundingClientRect().right)) && ((brickBlock[j].getBoundingClientRect().top == $mario.getBoundingClientRect().bottom) || (brickBlock[j].getBoundingClientRect().top == $mario2.getBoundingClientRect().bottom))) {
                        return;
                    }
                }

                if (counting >= 130) {
                    counting -= 1;
                    $mario.style.bottom = (jumper + counting) + "px";
                    $mario2.style.bottom = (jumper + counting) + "px";
                }
            }
        }

    }
    //==================================================================================================================================================================

    //================ Functions for Arrow Key's when it will Press/Click =============================================================

    document.onkeydown = function (event) {
        $mario2.style.display = "none";
        $mario.style.display = "block";
        switch (event.keyCode) {
            case 39:
                moveForward();
                break;
            case 38:
                Jump(event);
                break;
            case 37:
                moveBackward();
                break;
            case 40:
                $mario.style.height = "50px";
                break;
            case 16:
                longJump();
                break;
        }
    };

    //==================================================================================================================================================================

    //================ Functions for Arrow Key's when it will Leave =============================================================

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
            case 16:
                longJumpFault();
                break;
        }
    };

    //==================================================================================================================================================================

    //================ Functions for Game Over when Mario Touches Villain by Right or Left Side of villain =============================================================

    function marioDead() {

        for (let i = 0; i < villain.length; i++) {
            if (($mario.getBoundingClientRect().right >= villain[i].getBoundingClientRect().left && $mario.getBoundingClientRect().bottom === villain[i].getBoundingClientRect().bottom && $mario.getBoundingClientRect().left <= villain[i].getBoundingClientRect().right) || ($mario2.getBoundingClientRect().right > villain[i].getBoundingClientRect().left && $mario2.getBoundingClientRect().bottom === villain[i].getBoundingClientRect().bottom && $mario2.getBoundingClientRect().left < villain[i].getBoundingClientRect().right)) {
                $mainSound.pause();
                $overSound.play();
                $endGame.style.display = 'flex';
                $mainGame.style.display = 'none';
                $displayEndScore.innerText = score;
                counter = 0;
                stopScore();
                return;
            }
        }

    }

    //==================================================================================================================================================================

    //================ Functions for Start Game when Click over Start button on First Webpage =============================================================

    function startGame() {
        $startSound.pause();
        $mainSound.play();

        // setInterval(() => {
        //     $mainSound.play();
        // }, 2000)

        $startGame.style.display = 'none';
        $endGame.style.display = 'none';
        $mainGame.style.display = 'block';

        scoreInterval = setInterval(scoring, 100);

        runMario = setInterval(
            function () {
                marioDead();
            }, 1);

        setInterval(checkRunPath, 1);
    }

    //==================================================================================================================================================================

    //================ Functions for Re-Start Game when Click over Play-Again button on Game Over Webpage =============================================================

    function endGame() {
        $overSound.pause();
        $startSound.play();
        location.href = "index.html";
        $startGame.style.display = 'block';
        $endGame.style.display = 'none';
        $mainGame.style.display = 'none';
    }

    //==================================================================================================================================================================

    //================ Event-Listener for Start Button & Play-Again button =============================================================

    $startButton.addEventListener('click', startGame);
    $endGameButton.addEventListener('click', endGame);

    //==============================================================================================================================================================
    //===================================={ THANKS FOR VISIT }==================================================================================================================
    //======================================{ KUNAL TITARE }=============================================================================================================
    //==================================================================================================================================================================
}
