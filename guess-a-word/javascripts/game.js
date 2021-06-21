


document.addEventListener('DOMContentLoaded', function(){
  let spaces = document.getElementById('spaces');
  let guesses = document.getElementById('guesses');
  let messageContainer = document.getElementById('message');
  let replay = document.getElementById('replay');
  let apples = document.getElementById('apples');



  let randomWord = function(){
    const words = ['apple', 'banana', 'orange', 'pear'];
  
    return function() {
      let randomIndex = Math.floor(Math.random() * words.length);
      let word = words[randomIndex];
      words.splice(randomIndex, 1);
      return word;
    }
  }();
  
  let gamePrototype = {
    createBlanks(word) {
      // create new spans(blank) for the new word
      let newSpans = new Array(word.length).fill('<span></span>').join("");
      // remove existing spans
      let exitingSpans = spaces.querySelectorAll('span');
      exitingSpans.forEach(span => {
        spaces.removeChild(span);
      });

      let exitingGuessSpans = guesses.querySelectorAll('span');
      exitingGuessSpans.forEach(span => {
        guesses.removeChild(span);
      });
      // insert the new spans 
      spaces.insertAdjacentHTML('beforeend', newSpans);
      // save nodelist of added spans to the game objct 
      this.spaces = document.querySelectorAll('#spaces span');
    },
  
    displayMessage(message) {
      messageContainer.textContent = message;
    },

    keyupHandler(e){
      let guess = e.key;
      if(this.isLetter(guess)) {
        if(this.isMatch(guess) && !this.alreadyGueesed(guess)) {
        let numberOfMatches = this.isMatch(guess);
        while(numberOfMatches > 0) {
          this.guessedLetters.push(guess);
          numberOfMatches--;
        }
          this.output(guess, true);

        } else {
          this.incrementGuessNumber();
          this.output(guess, false);
          let currentClass = apples.classList[0];
          if(currentClass) apples.classList.remove(currentClass);
          apples.classList.add(`guess_${this.numberOfGuesses}`);
        }
      }
      if(this.won()) {
        document.body.classList.add('win');
        this.unbind();
        this.finishGame('You won!');

      }else if(this.lose()) {
        document.body.classList.add('lose');
        this.unbind();
        this.finishGame('Game Over');
      }
    },
    
  
    bind() {
      document.addEventListener('keyup', this.keyupHandler.bind(this));
    },

    unbind() {
      document.removeEventListener('keyup', this.keyupHandler.bind(this));
    },
  
    finishGame(message) {
      this.displayMessage(message);
      replay.style.display = 'inline-block';
    },
  
    won(){
      return this.guessedLetters.slice().sort().join() === this.word.slice().sort().join();
    },
  
    lose() {
      return this.numberOfGuesses === this.allowedGuesses;
    },
  
    output(guess, match) {
      if(match) {
        this.word.forEach((letter, index) => {
          if(letter === guess.toLowerCase()) {
            this.spaces[index].textContent = letter;
            let span = document.createElement('span');
            span.textContent = letter;
            guesses.insertAdjacentElement('beforeend', span);
          }
        });
      }else {
        let span = document.createElement('span');
        span.textContent = guess;
        guesses.insertAdjacentElement('beforeend', span);
      }

    },
  
    isLetter(guess) {
      return /[a-z]/i.test(guess);
    },
  
    isMatch(guess) {
      return this.word.filter(letter => letter === guess).length;
    },
  
    alreadyGueesed(guess) {
      return this.guessedLetters.includes(guess);
    },
  
    incrementGuessNumber() {
      this.numberOfGuesses++;
    },
  
    init() {
      this.word = randomWord();
      if(!this.word) {
        this.displayMessage("Sorry, I've run out of words!");
        return this;
      }
      this.word = this.word.split('');
      this.numberOfGuesses = 0;
      this.guessedLetters = [];
      this.allowedGuesses = 6;
      this.createBlanks(this.word);
      document.body.classList.remove(...document.body.classList)
      return this;
    }
  }


  let newGame = Object.create(gamePrototype).init();
  newGame.bind();

  replay.addEventListener('click', e => {
    e.preventDefault();
    let newGame = Object.create(gamePrototype).init();
    newGame.bind();
  });
});



