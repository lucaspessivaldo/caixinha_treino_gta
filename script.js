const allInputKeys = [
  { input: document.querySelector('.input1') },
  { input: document.querySelector('.input2') },
  { input: document.querySelector('.input3') },
  { input: document.querySelector('.input4') },
  { input: document.querySelector('.input5') },
  { input: document.querySelector('.input6') },
  { input: document.querySelector('.input7') },
  { input: document.querySelector('.input8') },
]
const buttonStart = document.querySelector('button')
const badResult = document.querySelector('.bad_result')
const good_result = document.querySelector('.good_result')
const containerChallenge = document.querySelector('.container_challenge')
const progBar = document.querySelector('.current_bar')

const wrongMoveSound = new Audio('./sound/sound_wrong_move_sound.mp3');
wrongMoveSound.volume = 0.70

window.addEventListener('keydown', handleEventKey)
buttonStart.addEventListener('click', startStopGame)

const TIME_CHALLENGE = 6 //seconds
const QUANTITY_TIMES = 3 //times
const LETTERS = ['A', 'S', 'D', 'Q', 'W', 'E']
const currentSequence = []
const userInput = []
let isStart = false;
let currentPositionTyping = 0;
let currentTimer = 0;
let currentProgBar = 100
let timerId = null;

function timerBar() {
  timerId = setInterval(() => {
    if (currentProgBar < 0) {
      clearInterval(timerId)
      badResult.style.display = 'flex';
      containerChallenge.style.display = 'none';
      isStart = false
      buttonStart.classList = 'button-start';
      buttonStart.textContent = 'Start'

      currentSequence.length = 0 //empty array
      userInput.length = 0 //empty array
      resetChallenge()
      allInputKeys.forEach(key => key.input.classList.remove('key-input-right'))

      //Empty the key display
      allInputKeys.forEach((key, index) => {
        key.input.textContent = ''
      })
    }
    if (currentProgBar > 30 && currentProgBar < 60) {
      progBar.style.backgroundColor = '#F58002'
    }
    if (currentProgBar <= 30) {
      progBar.style.backgroundColor = '#FF3E24'
    }

    currentProgBar = currentProgBar - 1;
    progBar.style.width = `${currentProgBar}%`
  }, 53)
}

function getRandomLetter(arr) {
  const min = 0
  const max = arr.length - 1;
  const randomNumber = Math.floor(Math.random() * (max - min + 1) + min)

  return arr[randomNumber]
}

function startStopGame() {
  isStart = !isStart
  buttonStart.classList = (isStart) ? 'button-stop' : 'button-start';
  buttonStart.textContent = (isStart) ? 'Stop' : 'Start'

  if (isStart) {
    badResult.style.display = 'none'
    good_result.style.display = 'none'
    containerChallenge.style.display = 'grid'
    currentSequence.push(...getCodeSequence())
    resetChallenge()
    timerBar()

    //Fill the key display
    allInputKeys.forEach((key, index) => {
      key.input.textContent = currentSequence[index]
    })
  }

  else {
    currentSequence.length = 0 //empty array
    userInput.length = 0 //empty array
    resetChallenge()
    allInputKeys.forEach(key => key.input.classList.remove('key-input-right'))

    //Empty the key display
    allInputKeys.forEach((key, index) => {
      key.input.textContent = ''
    })
  }

}

function getCodeSequence() {
  return codeSequenceArray = new Array(8).fill().map(() => getRandomLetter(LETTERS))
}

function resetChallenge() {
  progBar.style.backgroundColor = '#a3ef52'
  currentProgBar = 100
  progBar.style.width = '100%'
  currentPositionTyping = 0
  clearInterval(timerId)
}

function handleEventKey(event) {
  const letterInput = event.key.toUpperCase()

  if (isStart && LETTERS.includes(letterInput) && userInput.length < 8) {
    userInput.push(letterInput)

    if (userInput.every((e, i) => e === currentSequence[i])) {
      allInputKeys[currentPositionTyping].input.classList.add('key-input-right')
      currentPositionTyping++
      if (userInput.length === 8) {
        clearInterval(timerId)
        good_result.style.display = 'flex'
        containerChallenge.style.display = 'none';
        isStart = false
        buttonStart.classList = 'button-start';
        buttonStart.textContent = 'Start'

        currentSequence.length = 0 //empty array
        userInput.length = 0 //empty array
        resetChallenge()
        allInputKeys.forEach(key => key.input.classList.remove('key-input-right'))

        //Empty the key display
        allInputKeys.forEach((key, index) => {
          key.input.textContent = ''
        })
      }
    }
    else {
      wrongMoveSound.play()
      currentPositionTyping = 0
      allInputKeys.forEach(key => key.input.classList.remove('key-input-right'))
      userInput.length = 0
      currentSequence.length = 0;

      currentSequence.push(...getCodeSequence()) //get a new sequence
      allInputKeys.forEach((key, index) => {
        key.input.textContent = currentSequence[index]
      })
    }
  }

  else {
    if (isStart) {
      wrongMoveSound.play()
      currentPositionTyping = 0
      allInputKeys.forEach(key => key.input.classList.remove('key-input-right'))
      userInput.length = 0
      currentSequence.length = 0;

      currentSequence.push(...getCodeSequence()) //get a new sequence
      allInputKeys.forEach((key, index) => {
        key.input.textContent = currentSequence[index]
      })
    }
  }

}
