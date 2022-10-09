

console.log(`hi`)


//Selectors
let markButtons = document.querySelectorAll(`.markButton`)
let box = document.querySelectorAll(`.box`)
let prompter = document.querySelector(`#prompter`)
let resetButton = document.querySelector(`#reset`)

//Check Win Conditions Function
const checkWin = (claims) => {
    if (claims.includes(0) && claims.includes(1) && claims.includes(2)) {
        return true
    } else if (claims.includes(3) && claims.includes(4) && claims.includes(5)) {
        return true
    } else if (claims.includes(6) && claims.includes(7) && claims.includes(8)) {
        return true
    } else if (claims.includes(0) && claims.includes(3) && claims.includes(6)) {
        return true
    } else if (claims.includes(1) && claims.includes(4) && claims.includes(7)) {
        return true
    } else if (claims.includes(2) && claims.includes(5) && claims.includes(8)) {
        return true
    } else if (claims.includes(0) && claims.includes(4) && claims.includes(8)) {
        return true
    } else if (claims.includes(2) && claims.includes(4) && claims.includes(6)) {
        return true
    } else {
        return false
    }
}

//Play Game Function
const playGame = () => {
    let player = null;
    let pXClaims = [];
    let pOClaims = [];
    let boxesMarked = 0;
    let gameOver = false;
    const chooseFirstPlayer = () => {
        let rand = Math.floor(Math.random()*2)
        switch (rand) {
            case 0 :
                prompter.innerText = `New game: X goes first.`
                return player = `X`
            break;
            case 1 :
                prompter.innerText = `New game: O goes first.`
                return player = `O`
            break;
        }

    }
        for (let i = 0; i < markButtons.length; i++) {  
            markButtons[i].addEventListener(`mouseover`, () => {
                if (box[i].dataset.marked === `no`) {
                    switch (player) {
                        case `X` :
                            // console.log(`case x thinks player is ${player}`)
                            box[i].innerText = `X`
                        break;
                        case `O` :
                            // console.log(`case o thinks player is ${player}`)
                            box[i].innerText = `O`
                        break;
                }
                box[i].style.color = `lightgray`
                    // console.log(`mouse in`)
                }
            })
            markButtons[i].addEventListener(`mouseout`, () => {
                if (box[i].dataset.marked === `no`) {    
                    box[i].innerText = ``
                    box[i].style.color = `black`
                    // console.log(`mouseout`)
                }
            })
                                   
            markButtons[i].addEventListener(`click`, () => {
                if (box[i].dataset.marked === `no`) {
                    switch (player) {
                        case `X` :
                            box[i].innerText = `X`;
                            box[i].style.color = `black`
                            box[i].dataset.marked = `yes`;
                            boxesMarked++;
                            pXClaims.push(i);
                            console.log(`Player X has: ${pXClaims}`)
                            if (checkWin(pXClaims) === true) {
                                prompter.innerText = `Player ${player} wins!`
                                gameOver = true
                            } else {
                                player = `O`;
                                prompter.innerText = `O's turn.`
                            }
                            break;
                        case `O` :
                            box[i].innerText = `O`;
                            box[i].style.color = `black`
                            box[i].dataset.marked = `yes`;
                            boxesMarked++
                            pOClaims.push(i)
                            console.log(`Player O has: ${pOClaims}`)
                            checkWin(pOClaims);
                            if (checkWin(pOClaims) === true) {
                                prompter.innerText = `Player ${player} wins!`
                                gameOver = true
                            } else {
                            player = `X`;
                            prompter.innerText = `X's turn.`
                            }
                            break;
                    }
                }
                
                console.log(`Boxes marked ${boxesMarked}`)
                if (boxesMarked >= 9 && gameOver !== true) {
                    prompter.innerText = `It's a draw`
                    gameOver = true
                }

                if (gameOver === true) {
                    console.log(`game over`)
                    for (let i = 0; i < markButtons.length; i++) {
                        box[i].dataset.marked = `yes`
                    }
                    resetButton.style.backgroundColor = `#174904`
                    resetButton.innerText = `New Game`
                } else if (gameOver === false) {
                    console.log(`keep playing`)
                }
            })
        }

    //Reset Button
    resetButton.addEventListener('click', () => {
        // //boxesMarked
        boxesMarked = 0
        // //claims (X&O)
        console.log(`Xclaims: ${pXClaims} | Oclaims ${pOClaims}`)
        pXClaims.length = 0
        pOClaims.length = 0
        console.log(`Xclaims: ${pXClaims} | Oclaims ${pOClaims}`)
        // //boxesMarked
        for (let i = 0; i < markButtons.length; i++) {
            box[i].dataset.marked = `no`
        }
        // //prompter innerText
        prompter.innerText = `new game`
        // //game over false
        gameOver = false
        // //box innerText
        for (let i = 0; i < markButtons.length; i++) {
            box[i].innerText = ``
        }
        //randomize first player
        chooseFirstPlayer();
        //restyle New Game/Reset button
        resetButton.style.backgroundColor = `red`
        resetButton.innerText = `Reset`
    })
}

playGame()


