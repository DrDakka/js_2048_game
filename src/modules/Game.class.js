'use strict';

const gameStatus = {
  IDLE: 'idle',
  PLAYING: 'playing',
  WIN: 'win',
  LOSE: 'lose',
};

const defIniState = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

/**
 * This class represents the game.
 * Now it has a basic structure, that is needed for testing.
 * Feel free to add more props and methods if needed.
 */
class Game {
  /**
   * Creates a new game instance.
   *
   * @param {number[][]} initialState
   * The initial state of the board.
   * @default
   * [[0, 0, 0, 0],
   *  [0, 0, 0, 0],
   *  [0, 0, 0, 0],
   *  [0, 0, 0, 0]]
   *
   * If passed, the board will be initialized with the provided
   * initial state.
   */
  constructor(initialState) {
    this.state = null;
    this.score = 0;
    this.status = gameStatus.IDLE;
    this.initialState = initialState || defIniState;
    // eslint-disable-next-line no-console
    console.log(initialState);
  }

  selectRandomField() {
    const emptyCells = [];

    for (let x = 0; x < 4; x++) {
      for (let y = 0; y < 4; y++) {
        if (this.state[x][y] === 0) {
          emptyCells.push({ x, y });
        }
      }
    }

    if (emptyCells.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * emptyCells.length);

    return emptyCells[randomIndex];
  }

  addRandom() {
    const cell = this.selectRandomField();

    if (cell === null) {
      return;
    }

    const val = Math.random() < 0.1 ? 4 : 2;

    this.state[cell.x][cell.y] = val;
  }

  moveLeft() {
    for (let line = 0; line < 4; line++) {
      for (let col = 3; col > 0; col--) {
        const digit = this.state[line][col];
        const digitShift = this.state[line][col - 1];

        if (digit === 0) {
          continue;
        }

        if (digitShift === 0) {
          this.state[line][col - 1] = digit;
          this.state[line][col] = 0;
          continue;
        }

        if (digitShift !== digit) {
          continue;
        } else {
          this.state[line][col - 1] = digit * 2;
          this.state[line][col] = 0;
          continue;
        }
      }
    }
  }

  moveRight() {
    for (let line = 0; line < 4; line++) {
      for (let col = 0; col < 3; col++) {
        const digit = this.state[line][col];
        const digitShift = this.state[line][col + 1];

        if (digit === 0) {
          continue;
        }

        if (digitShift === 0) {
          this.state[line][col + 1] = digit;
          this.state[line][col] = 0;
          continue;
        }

        if (digitShift !== digit) {
          continue;
        } else {
          this.state[line][col + 1] = digit * 2;
          this.state[line][col] = 0;
          continue;
        }
      }
    }
  }

  moveUp() {
    for (let line = 3; line > 0; line--) {
      for (let col = 0; col < 4; col++) {
        const digit = this.state[line][col];
        const digitShift = this.state[line - 1][col];

        if (digit === 0) {
          continue;
        }

        if (digitShift === 0) {
          this.state[line - 1][col] = digit;
          this.state[line][col] = 0;
          continue;
        }

        if (digitShift !== digit) {
          continue;
        } else {
          this.state[line - 1][col] = digit * 2;
          this.state[line][col] = 0;
          continue;
        }
      }
    }
  }

  moveDown() {
    for (let line = 0; line < 3; line++) {
      for (let col = 0; col < 4; col++) {
        const digit = this.state[line][col];
        const digitShift = this.state[line + 1][col];

        if (digit === 0) {
          continue;
        }

        if (digitShift === 0) {
          this.state[line + 1][col] = digit;
          this.state[line][col] = 0;
          continue;
        }

        if (digitShift !== digit) {
          continue;
        } else {
          this.state[line + 1][col] = digit * 2;
          this.state[line][col] = 0;
          continue;
        }
      }
    }
  }

  /**
   * @returns {number}
   */
  getScore() {
    return this.score;
  }

  /**
   * @returns {number[][]}
   */
  getState() {
    return this.state;
  }

  /**
   * Returns the current game status.
   *
   * @returns {string} One of: 'idle', 'playing', 'win', 'lose'
   *
   * `idle` - the game has not started yet (the initial state);
   * `playing` - the game is in progress;
   * `win` - the game is won;
   * `lose` - the game is lost
   */
  getStatus() {
    return this.status;
  }

  /**
   * Starts the game.
   */

  restart() {
    this.state = this.initialState.map((row) => [...row]);
    this.score = 0;
    this.status = gameStatus.IDLE;
  }

  start() {
    this.state = this.initialState.map((row) => [...row]);
    this.status = gameStatus.PLAYING;
    this.addRandom();
    this.addRandom();
  }

  /**
   * Resets the game.
   */
}

export default Game;
