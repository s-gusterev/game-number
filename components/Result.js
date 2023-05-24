class Result {
  constructor(className, newLevel) {
    this.className = className;
    this.newLevel = newLevel;
    this.app = document.querySelector(className);
    this.temlate = `<div class="result">
          <p class="result__end">Игра закончена<p>
          <p class="result__text"><p>
            <button type="button" class="button">Начать снова</button>
          </div>
        </div>`;
  }
  render() {
    this.app.innerHTML = this.temlate;
    this.button = document.querySelector('.button');
    const result = document.querySelector('.result__text');
    result.textContent = `Ваш результат: ${window.localStorage.getItem(
      'result'
    )} из 10`;

    this._event();
  }
  _delete() {
    this.app.innerHTML = '';
    this.newLevel();
  }

  _event() {
    this.button.addEventListener('click', () => this._delete());
  }
}

export default Result;
