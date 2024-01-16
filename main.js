let bodyDiv = document.querySelector('.body')
let rpsBtn = document.querySelector('.rps')
let rpsBonusBtn = document.querySelector('.rps-bonus')
let container = document.querySelector('.container')
let rulesCloseBtn = document.querySelector('.rules-close-btn')
let rulesOpenBtn = document.querySelector('.rules-open-btn')
let backBtn = document.querySelector('.back-btn')
let playBtn = document.querySelector('.play-btn')
let stepOneItemMain = document.querySelectorAll('.step-one-item.main')
let stepOneItemBonus = document.querySelectorAll('.step-one-item.bonus')
let userChoice = document.querySelector('.choice.user .img')
let houseChoice = document.querySelector('.choice.computer .img')
let scoreValue = document.querySelector('.score-value')
let status = document.querySelector('.status')
let statusText = document.querySelector('.status-text')

let choiceList = ['paper', 'scissors', 'rock']
let choiceListBonus = ['scissors', 'spock', 'paper', 'lizard', 'rock']
let randomNum, time, count, userWon, draw, num, userIndex
let score = 0

rpsBtn.addEventListener('click', () => {
  bodyDiv.classList.add('main')
  if (!container.classList.contains('rules')) {
    container.classList.add('rules')
  }
})
rpsBonusBtn.addEventListener('click', () => {
  bodyDiv.classList.add('bonus')
  if (!container.classList.contains('rules')) {
    container.classList.add('rules')
  }
})

rulesCloseBtn.addEventListener('click', () => {
  container.classList.remove('rules')
})
rulesOpenBtn.addEventListener('click', () => {
  container.classList.add('rules')
})

stepOneItemBonus.forEach((stepOneItemBonus, i) => {
  stepOneItemBonus.addEventListener('click', () => {
    container.classList.remove(container.classList[1])
    container.classList.add('two')
    userChoice.innerHTML = `<div class="${choiceListBonus[i]}"></div>`
    getHouseChoiceBonus()
    userIndex = i
    return userIndex
  })
})
stepOneItemMain.forEach((stepOneItemMain, i) => {
  stepOneItemMain.addEventListener('click', () => {
    container.classList.remove(container.classList[1])
    container.classList.add('two')
    userChoice.innerHTML = `<div class="${choiceList[i]}"></div>`
    getHouseChoice()
    userIndex = i
    return userIndex
  })
})

function setStatus() {
  if (draw === true) {
    statusText.textContent = "It's a draw"
    score += 0.5
  } else if (userWon === true) {
    statusText.textContent = 'You Win'
    score++
  } else {
    statusText.textContent = 'You Lose'
    score--
  }
  if (score < 0) {score = 0}
  localStorage.setItem("score", JSON.stringify(score))
  scoreValue.textContent = score
  
  // setScore(scoreValue)
  return
}

function getHouseChoice() {
  num = 3
  count = 3
  houseChoice.innerHTML = `<div class="unknown"></div>`
  randomNum = Math.floor(Math.random() * num)
  time = setInterval(() => {
    count--
    if (count === 2) {
      houseChoice.innerHTML = `<div class="${choiceList[randomNum]}"></div>`
    }
    if (count === 0) {
      container.classList.add('four')
      getWinner(userIndex)
      setStatus()
    }
  }, 1000)
}
function getHouseChoiceBonus() {
  num = 5
  count = 3
  houseChoice.innerHTML = `<div class="unknown"></div>`
  randomNum = Math.floor(Math.random() * num)
  time = setInterval(() => {
    count--
    if (count === 2) {
      houseChoice.innerHTML = `<div class="${choiceListBonus[randomNum]}"></div>`
    }
    if (count === 0) {
      container.classList.add('four')
      getWinnerBonus(userIndex)
      setStatus()
    }
  }, 1000)
}

function getWinner(a) {
  if (a === randomNum) {
    draw = true
  } else if (a === 0 && randomNum === 2) {
    userWon = true
  } else if (a > randomNum && randomNum > 0) {
    userWon = true
  } else {
    userWon = false
  }
}
function getWinnerBonus(a) {
  if (a === randomNum) {
    draw = true
  } else if (a === 0) {
    if (randomNum === 2 || randomNum === 3) {
     userWon = true
    } else {
         userWon = false
        }
      } else if (a === 1) {
        if (randomNum === 0 || randomNum === 4) {
          userWon = true
    } else {
          userWon = false
        }
      } else if (a === 2) {
        if (randomNum === 4 || randomNum === 1) {
          userWon = true
    } else {
          userWon = false
        }
      } else if (a === 3) {
        if (randomNum === 1 || randomNum === 2) {
          userWon = true
    } else {
          userWon = false
        }
      } else if (a === 4) {
        if (randomNum === 3 || randomNum === 0) {
          userWon = true
    } else {
          userWon = false
    }
  }
}

playBtn.addEventListener('click', () => {
  container.classList.remove(container.classList[2])
  container.classList.remove(container.classList[1])
  container.classList.add('one')
  houseChoice.innerHTML = ''
  userChoice.innerHTML = ''
  draw = undefined
  userWon = undefined
})

backBtn.addEventListener ('click', () => {
  bodyDiv.classList.remove(bodyDiv.classList[1])
  container.classList.remove(container.classList[2])
  container.classList.remove(container.classList[1])
  container.classList.add('one')
})

window.onload = function() {
  if (Object.keys(localStorage).includes("score")) {
    score = parseFloat(localStorage.getItem("score"))
    scoreValue.textContent = score
  } else {
    localStorage.setItem("score", JSON.stringify(score))
  }
}


