class Game {
  constructor(className, newLevel) {
    this.className = className;
    this.newLevel = newLevel;
    this.app = document.querySelector(className);
    this.stylesBackgroundColor = [
      'background-color: darkorange',
      'background-color: palevioletred',
      'background-color: darkviolet',
      'background-color: green',
      'background-color: transparent',
    ];

    this.stylesAnimationText = ['rotate 600ms linear infinite', 'none'];

    this.stylesAnimationCard = ['blink', 'zoom'];

    this.temlate = `<div class="game">
          <div class='game__info'>
          <div class='game__time'>Время: <span></span></div>
           <div class='game__level'>Уровень: <span></span></div>
          </div>
          <div class="game__task">
            <p class="game__description">Найдите указанное число:</p>
            <p class="game__number"></p>
          </div>
          <div class="game__cards"></div>
          <div class="game__wrong"></div>
          <div class="game__right"></div>
          </div>`;
    this.result = 0;
    this.time = 60;
  }

  setResult() {
    ++this.result;
    window.localStorage.setItem('result', this.result);
  }

  generateNumbers(size, maxNumber) {
    let set = new Set();
    while (set.size < size) {
      set.add((Math.random() * maxNumber) | 0);
    }
    let randomArray = [...set];
    return randomArray;
  }

  addStyles(styles) {
    const randomClass = Math.floor(Math.random() * styles.length);
    return styles[randomClass];
  }

  renderCards(size, maxNumber) {
    const cards = document.querySelector('.game__cards');
    if (size === 8) {
      cards.style =
        'grid-template-columns: repeat(auto-fill, minmax(105px, 1fr)); gap: 19px;';
    }
    this.generateNumbers(size, maxNumber).forEach((number) => {
      const div = document.createElement('div');
      const textNumber = document.createElement('div');
      div.className = 'game__card';
      textNumber.className = 'game__card-number';
      textNumber.textContent = number;

      if (size === 8) {
        textNumber.classList.add('game__card-number_font_medium');
      }

      if (size === 12 || size === 20) {
        textNumber.classList.add('game__card-number_font_small');
      }

      if (size === 20) {
        textNumber.classList.add('game__card-number_font_small-2');
        cards.style =
          'grid-template-columns: repeat(auto-fill, minmax(70px, 1fr)); gap: 19px;';
      }

      if (size === 28) {
        textNumber.classList.add('game__card-number_font_small-3');
        cards.style =
          'grid-template-columns: repeat(auto-fill, minmax(50px, 1fr)); gap: 15px;';
      }

      if (maxNumber >= 1000) {
        textNumber.style = `animation:${this.addStyles(
          this.stylesAnimationText
        )}`;
        div.style = `${this.addStyles(
          this.stylesBackgroundColor
        )}; animation:  ${this.addStyles(
          this.stylesAnimationCard
        )} 400ms ease-in infinite alternate, visibleCards 1000ms ease ;`;
      } else {
        div.style = `${this.addStyles(
          this.stylesBackgroundColor
        )}; animation: visibleCards 1000ms ease;`;
      }
      if (cards) {
        cards.prepend(div);
        div.prepend(textNumber);
      }
    });
  }

  startTimer() {
    const start = setInterval(() => {
      document.querySelector('.game__time span').textContent = this.time;
      this.time--;
      if (this.time <= 0 || this.result === 10) {
        this.time = 60;
        this._delete();
        clearInterval(start);
      }
    }, 1000);
  }

  renderCurrentNumber(newLevel, currentLevel, levelText) {
    const currentNumber = document.querySelector('.game__number');
    const cards = [...document.querySelectorAll('.game__card')];
    const randomCurrentNumber = Math.floor(Math.random() * cards.length);
    currentNumber.textContent = cards[randomCurrentNumber].textContent;
    const iconResultRight = document.querySelector('.game__right');
    const iconResultWrong = document.querySelector('.game__wrong');
    const level = document.querySelector('.game__level span');
    level.textContent = levelText;
    const removeCards = (cards) => {
      cards.forEach((card) => card.remove());
    };
    cards.forEach((card) => {
      card.addEventListener('click', () => {
        if (card.textContent === currentNumber.textContent) {
          this.setResult();
          iconResultRight.classList.add('game__right_visible');
          setTimeout(() => {
            iconResultRight.classList.remove('game__right_visible');
            return newLevel();
          }, 1000);
          removeCards(cards);
        } else {
          iconResultWrong.classList.add('game__wrong_visible');
          setTimeout(() => {
            iconResultWrong.classList.remove('game__wrong_visible');

            return currentLevel();
          }, 1000);
          removeCards(cards);
        }
      });
    });
  }

  level1() {
    this.renderCards(6, 10);
    this.renderCurrentNumber(
      () => this.level2(),
      () => this.level1(),
      1
    );
  }

  level2() {
    this.renderCards(6, 100);
    this.renderCurrentNumber(
      () => this.level3(),
      () => this.level2(),
      2
    );
  }

  level3() {
    this.renderCards(6, 1000);
    this.renderCurrentNumber(
      () => this.level4(),
      () => this.level3(),
      3
    );
  }

  level4() {
    this.renderCards(8, 1000);
    this.renderCurrentNumber(
      () => this.level5(),
      () => this.level4(),
      4
    );
  }

  level5() {
    this.renderCards(8, 9999);
    this.renderCurrentNumber(
      () => this.level6(),
      () => this.level5(),
      5
    );
  }

  level6() {
    this.renderCards(12, 9999);
    this.renderCurrentNumber(
      () => this.level7(),
      () => this.level6(),
      6
    );
  }
  level7() {
    this.renderCards(12, 9999);
    this.renderCurrentNumber(
      () => this.level8(),
      () => this.level7(),
      7
    );
  }
  level8() {
    this.renderCards(20, 9999);
    this.renderCurrentNumber(
      () => this.level9(),
      () => this.level8(),
      8
    );
  }

  level9() {
    this.renderCards(20, 9999);
    this.renderCurrentNumber(
      () => this.level10(),
      () => this.level9(),
      9
    );
  }

  level10() {
    this.renderCards(28, 9999);
    this.renderCurrentNumber(
      () => this._delete(),
      () => this.level10(),
      10
    );
  }

  render() {
    this.app.innerHTML = this.temlate;
    this.level1();
    this.startTimer();
    this.result = 0;
    window.localStorage.setItem('result', this.result);
  }
  _delete() {
    this.app.innerHTML = '';
    this.newLevel();
  }
}
export default Game;
