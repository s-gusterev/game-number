class Training {
  constructor(className, newLevel) {
    this.className = className;
    this.newLevel = newLevel;
    this.app = document.querySelector(className);
    this.temlate = `<div class="game">
          <div class="game__task">
            <p class="game__description">Найдите указанное число:</p>
            <p class="game__number">75</p>
          </div>
          <div class="game__cards">
            <div class="game__card" style="background-color: darkorange">
              75
            </div>
            <div
              class="game__card"
              style="background-color: palevioletred; opacity: 0.4"
            >
              1
            </div>
            <div
              class="game__card"
              style="background-color: darkviolet; opacity: 0.4"
            >
              35
            </div>
            <div
              class="game__card"
              style="background-color: green; opacity: 0.4"
            >
              10
            </div>
            <div
              class="game__card"
              style="background-color: green; opacity: 0.4"
            >
              885
            </div>
            <div class="game__card" style="opacity: 0.4">40</div>
          </div>
          <p class="game__notification">Нажмите на экран, чтобы продолжить</p>
          <div class="game__hand"></div>
          <div class="game__start"></div>
        </div>`;
  }
  render() {
    this.app.innerHTML = this.temlate;
    this._event();
  }
  _delete() {
    this.app.innerHTML = '';
    this.newLevel();
  }

  _event() {
    document
      .querySelector('.game__start')
      .addEventListener('click', () => this._delete());
  }
}

export default Training;
