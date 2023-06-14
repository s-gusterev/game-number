class Timer {
  constructor(className, newLevel) {
    this.className = className;
    this.newLevel = newLevel;
    this.app = document.querySelector(className);
    this.temlate = `<div class="timer">
          <div class="timer__container"><p class="timer__number"></p></div></div> 
      </div>`;
  }

  _downloadTimer() {
    let count = 4;
    const timer = setInterval(() => {
      count--;
      document.querySelector('.timer__number').textContent = count;
      document.querySelector('.timer__number').style =
        'animation: timer 700ms  ease  infinite ';
      if (count <= 0) {
        this._delete();
        clearInterval(timer);
      }
    }, 700);
  }

  render() {
    this.app.innerHTML = this.temlate;
    this._downloadTimer();
  }
  _delete() {
    this.app.innerHTML = '';
    this.newLevel();
  }
}
export default Timer;
