let playerText = document.getElementById('playerText')
let restartBtn = document.getElementById('restartBtn')
let boxes = Array.from(document.getElementsByClassName('box'))

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

const O_TEXT = "O"
const X_TEXT = "X"
let currentPlayer = X_TEXT
let spaces = Array(9).fill(0)

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click',boxClicked))
}

function boxClicked(e){
    const id = e.target.id

    if(spaces[id] == 0){
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer

        if(playerHasWon() !== false){
            playerText.innerText = `${currentPlayer} has won!`
            let winning_blocks = playerHasWon()

            
            var [a,b,c] = winning_blocks
            boxes[a].style.color = '#48f050'
            boxes[a].style.borderColor = '#F2C14E'
            boxes[b].style.color = '#48f050'
            boxes[b].style.borderColor = '#F2C14E'
            boxes[c].style.color = '#48f050'
            boxes[c].style.borderColor = '#F2C14E'

            for(let i=0;i<9;i++){
                if(spaces[i]==0){
                    spaces[i] = 1
                }
            }

        }

        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT

    }
}


const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [0,4,8]

]

function playerHasWon(){
    for(const condition of winningCombos){
        let [a,b,c] = condition

        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a,b,c]
        }
    }
    return false
}


restartBtn.addEventListener('click',restart)

function restart(){
    spaces.fill(0)
    boxes.forEach(box => {
        box.innerText = ""
        box.style.backgroundColor = ""
        box.style.color = ""
    })
    currentPlayer = X_TEXT
    playerText.innerText = 'tic tac toe'
}

startGame()