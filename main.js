import Start from './components/Start.js';
import Training from './components/Training.js';
import Timer from './components/Timer.js';
import Game from './components/Game.js';
import Result from './components/Result.js';

const start = new Start('.app__container', () => training.render());
const training = new Training('.app__container', () => timer.render());
const timer = new Timer('.app__container', () => game.render());
const game = new Game('.app__container', () => result.render());
const result = new Result('.app__container', () => game.render());

start.render();
