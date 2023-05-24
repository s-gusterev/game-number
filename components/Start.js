class Start {
  constructor(className, newLevel) {
    this.className = className;
    this.newLevel = newLevel;
    this.app = document.querySelector(className);
    this.temlate = `<div class="start">
          <div class="start__header">
            <h1 class="start__title">Найди число</h1>
            <p class="start__subtitle">Тренажер на внимание</p>
          </div>
          <div class="start__main">
            <h2 class="start__title-secondary">Тренирует:</h2>
            <ul class="start__list">
              <li class="start__item">
                <span class="start__item-title">Произвольное внимание</span
                ><span class="start__item-description"
                  >Научитесь концентрировать внимание только на важном</span
                >
              </li>
              <li class="start__item">
                <span class="start__item-title"
                  >Концентрацию и переключение внимания</span
                ><span class="start__item-description"
                  >Позволит не упускать из виду важные детали</span
                >
              </li>
              <li class="start__item">
                <span class="start__item-title">Зрительное восприятие</span
                ><span class="start__item-description"
                  >Сможете быстро находить основные мысли в текстах</span
                >
              </li>
            </ul>
            <button type="button" class="button">Далее</button>
          </div>
        </div>`;
  }
  render() {
    this.app.innerHTML = this.temlate;
    this.button = document.querySelector('.button');
    this._event();
    window.localStorage.setItem('result', 0);
  }
  _delete() {
    this.app.innerHTML = '';
    this.newLevel();
    // const openStart = new Training('.app__container');
    // openStart.render();
  }

  _event() {
    this.button.addEventListener('click', () => this._delete());
  }
}

export default Start;
