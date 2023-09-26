const { combineReducers, applyMiddleware, createStore } = Redux;
const sagaMiddleware = ReduxSaga.default; // :(
const { take, put, call, fork, cancel } = ReduxSaga;

const INITIAL_SPEED = 500;
const MAX_SPEED = 100;

const UP    = { x:  0, y: -1 };
const LEFT  = { x: -1, y:  0 };
const RIGHT = { x:  1, y:  0 };
const DOWN  = { x:  0, y:  1 };

const randomPosition = () => ({
  x: Math.floor(25 * Math.random()),
  y: Math.floor(25 * Math.random())
});

const wrap = x => (x < 0 ? x + 25 : x % 25);

const input = (() => {
  // It gotta be possible creating this more efficiently, without
  // adding and removing event listeners all the time...
  const createPromise = () => (new Promise(resolve => {
    const onInput = e => {
      e.preventDefault();
      
      // Oh wow... the uglyness makes me cry :(
      resolve(e.keyCode || 'MOUSE_CLICK');
      promise = createPromise();
      
      document.removeEventListener('click', onInput);
      document.removeEventListener('keydown', onInput);
    };
    document.addEventListener('click', onInput);
    document.addEventListener('keydown', onInput);
  }));
  
  let promise = createPromise();
  
  return () => promise;
})();

const delay = timeout => (new Promise(resolve => {
  setTimeout(resolve, timeout);
}));

const createGame = canvas => {
  // STATE
  const store = (() => {
    // CONSTANTS
    const PLAY = 'PLAY';
    const RESET = 'RESET';
    const TICK = 'TICK';
    const GAME_OVER = 'GAME_OVER';
    const MOVE = 'MOVE';
    const CHANGE_DIRECTION = 'CHANGE_DIRECTION';
    const SPAWN_APPLE = 'SPAWN_APPLE';
    const EAT_APPLE = 'EAT_APPLE';
    // ACTIONS
    const play = () => ({
      type: PLAY
    });
    const reset = () => ({
      type: RESET
    });
    const tick = () => ({
      type: TICK
    });
    const gameOver = () => ({
      type: GAME_OVER
    });
    const move = direction => ({
      type: MOVE,
      direction
    });
    const changeDirection = direction => ({
      type: CHANGE_DIRECTION,
      direction
    });
    const spawnApple = (x, y) => ({
      type: SPAWN_APPLE,
      x,
      y
    });
    const eatApple = (x, y) => ({
      type: EAT_APPLE,
      x,
      y
    });
    // REDUCERS
    // reducer for game state
    const state = (state = 'MENU', action) => {
      switch (action.type) {
        case PLAY:
          return 'PLAYING';
        case GAME_OVER:
          return 'GAME_OVER';
        default:
          return state;
      }
    };
    // reducer for tick speed (ms per tick)
    const speed = (state = INITIAL_SPEED, action) => {
      switch (action.type) {
        case EAT_APPLE:
          return Math.max(Math.floor(0.9 * state), MAX_SPEED);
        case RESET:
          return INITIAL_SPEED;
        default:
          return state;
      }
    };
    // reducer for game score
    const score = (state = 0, action) => {
      switch (action.type) {
        case EAT_APPLE:
          return state + 10;
        case RESET:
          return 0;
        default:
          return state;
      }
    };
    // combined reducer for overall game state
    const game = combineReducers({
      state,
      speed,
      score
    });
    // reducer for snake direction
    const direction = (state = RIGHT, action) => {
      switch (action.type) {
        case CHANGE_DIRECTION:
          return action.direction;
        case RESET:
          return RIGHT;
        default:
          return state;
      }
    };
    // reducer for snake parts
    const parts = (state = [{ x: 1, y: 1 }], action) => {
      switch (action.type) {
        case MOVE:
          const { direction } = action;
          const head = {
            x: wrap(state[0].x + direction.x),
            y: wrap(state[0].y + direction.y)
          };
          state = state.slice(0, -1);
          state.unshift(head);
          return state;
        case EAT_APPLE:
          return [
            ...state,
            state[state.length - 1]
          ];
        case RESET:
          return [{ x: 1, y: 1 }];
        default:
          return state;
      }
    };
    // combined reducer for the snake
    const snake = combineReducers({
      direction,
      parts
    });
    // reducer for the apples
    const apples = (state = [], action) => {
      switch (action.type) {
        case SPAWN_APPLE:
          return [
            ...state,
            {
              x: action.x,
              y: action.y
            }
          ];
        case EAT_APPLE:
          return state.filter(({ x, y }) => (x !== action.x || y !== action.y));
        case RESET:
          return [];
        default:
          return state;
      }
    };
    // root reducer
    const reducer = combineReducers({
      game,
      snake,
      apples
    });
    // SAGAS
    function* inputSaga() {
      while (true) {
        const type = yield input();
        switch (type) {
          case 'MOUSE_CLICK':
            yield put(play());
            break;
          case 37:
            yield put(changeDirection(LEFT));
            break;
          case 38:
            yield put(changeDirection(UP));
            break;
          case 39:
            yield put(changeDirection(RIGHT));
            break;
          case 40:
            yield put(changeDirection(DOWN));
            break;
        }
      }
    }
    function* gameLoop(getState) {
      try {
        while (true) {
          const {
            game: {
              speed
            }
          } = getState();
          yield call(delay, speed);
          yield put(tick());
        }
      } catch (e) {/* gameLoop cancelled */}
    }
    function* gameSaga(getState) {
      while (true) {
        yield take(PLAY);
        yield put(reset());
        const running = yield fork(gameLoop, getState);
        yield take(GAME_OVER);
        yield cancel(running);
      }
    }
    function* snakeSaga(getState) {
      while (true) {
        yield take(TICK);
        const {
          snake: {
            direction
          }
        } = getState();
        yield put(move(direction));
        const {
          snake: {
            parts: [ head, ...tail ]
          },
          apples
        } = getState();
        // collision with tail
        for (let i = 0; i < tail.length; i++) {
          const { x, y } = tail[i];
          if (x === head.x && y === head.y) {
            yield put(gameOver());
          }
        }
        // collision with apples
        for (let i = 0; i < apples.length; i++) {
          const { x, y } = apples[i];
          if (x === head.x && y === head.y) {
            yield put(eatApple(x, y));
          }
        }
      }
    }
    function* applesSaga() {
      while (true) {
        yield take([PLAY, EAT_APPLE]);
        const { x, y } = randomPosition();
        yield put(spawnApple(x, y));
      }
    }
    
    return applyMiddleware(sagaMiddleware(
      inputSaga,
      gameSaga,
      snakeSaga,
      applesSaga
    ))(createStore)(reducer);
  })();
  
  // RENDERING
  const context = canvas.getContext('2d');
  const renderCircle = (x, y, color, stroke) => {
    x = 16 * x + 8;
    y = 16 * y + 8;
    context.beginPath();
    context.arc(x, y, 7, 0, 2 * Math.PI, false);
    context.fillStyle = color;
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = stroke;
    context.stroke();
  };
  const renderText = text => {
    context.font = '14px sans-serif';
    context.textAlign = 'center';
    context.fillStyle = '#fff';
    context.fillText(text, 200, 14);
  };
  const renderScore = score => {
    context.font = '14px sans-serif';
    context.textAlign = 'left';
    context.fillStyle = '#fff';
    context.fillText(`score: ${score}`, 2, 398);
  };
  let lastState;
  const render = () => {
    requestAnimationFrame(render);
    if (lastState === store.getState()) {
      return;
    }
    lastState = store.getState();
    
    const {
      game: {
        state,
        speed,
        score
      },
      snake: {
        parts: [ head, ...tail ]
      },
      apples
    } = store.getState();
    
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    apples.forEach(({ x, y }) => renderCircle(x, y, '#f00', '#fff'));
    tail.forEach(({ x, y }) => renderCircle(x, y, '#060', '#fff'));
    renderCircle(head.x, head.y, '#0f0', '#fff');
    
    switch (state) {
      case 'MENU':
        renderText('Click anywhere to play, move with arrow keys');
        break;
      case 'PLAYING':
        renderScore(score);
        break;
      case 'GAME_OVER':
        renderScore(score);
        renderText('Game over! Click anywhere to play again');
        break;
    }
  };
  
  render();
};

createGame(document.getElementById('canvas'));