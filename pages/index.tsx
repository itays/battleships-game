import type { NextPage } from "next";
import Head from "next/head";
import Grid from "../components/Grid/Grid";
import { useEffect, useReducer } from "react";
import randomizeShips, {
  Grid as GridType,
} from "../components/Grid/randomizeShips";
/* 
state
whose turn: 'computer' or 'user'
isGameOver: false
userShips - a Map with the user ships locations
computerShips = a Map with the computer ships location.
userActions = a Map to list each user turn's action
computerActions = a Map to list each computer turn's action



// on init
randomize ships for both grids
clicking on new game will reset everything and generate boards with ships in random locations

// turn logic
on each turn user selects a cell in the oponent's board
if the clicked cell reveals a ship - its a hit if not, its a miss.
once a cell is clicked it's marked (if it was a hit yellow, if it was a miss - gray)
once a whole ship is destroyed, it cells will be colored red and a message should be shown in the game info section
a user needs to reach to a 17 hits score (carrier (5) battleship (4) cruiser (3) submarine (3) destroyer (2)) in order to win


*/
enum Player {
  USER = "USER",
  COMPUTER = "COMPUTER",
}
type GameState = {
  whoGoes: Player;
  isGameOver: boolean;
  userShips: GridType;
  userActions: GridType;
  computerShips: GridType;
  computerActions: GridType;
  userScore: number;
  computerScore: number;
  message: string;
  logs: string[];
};
enum GameActionType {
  TOGGLE_TURN = "TOGGLE_TURN",
  RESET = "RESET",
}
type ResetPayload = {
  userGrid: GridType;
  computerGrid: GridType;
};

type BaseGameAction = {
  type: GameActionType;
};

type ResetAction = BaseGameAction & { payload: ResetPayload };

type GameAction = ResetAction;

const initial: GameState = {
  whoGoes: Player.USER,
  isGameOver: false,
  message: "",
  userShips: new Map(),
  userActions: new Map(),
  computerShips: new Map(),
  computerActions: new Map(),
  userScore: 0,
  computerScore: 0,
  logs: [],
};

const Home: NextPage = () => {
  const [state, dispatch] = useReducer(reducer, initial);
  function startNewGame() {
    dispatch({
      type: GameActionType.RESET,
      payload: {
        userGrid: randomizeShips(),
        computerGrid: randomizeShips(),
      },
    });
  }
  useEffect(() => {
    startNewGame();
  }, []);
  return (
    <>
      <Head>
        <title>Battleships game</title>
      </Head>

      <main className="grid grid-cols-1 grid-rows-2">
        <div className="grid grid-cols-3 place-items-center">
          <Grid data-test="user_grid" type="user" />
          <div className="game_info">
            <button
              className={`text-base font-medium rounded-lg p-2 bg-sky-500 text-white m-1`}
              onClick={startNewGame}
            >
              Start new game
            </button>

            <h3 id="whose_turn">
              {state.whoGoes === Player.USER ? "Your turn" : "Computer's turn"}
            </h3>
            <h3 id="info"></h3>
          </div>
          <Grid data-test="comp_grid" type="computer" />
        </div>
        <GameLog logs={state.logs} />
      </main>
    </>
  );
};

function reducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case GameActionType.RESET:
      return {
        ...initial,
        userShips: action.payload?.userGrid,
        computerShips: action.payload.computerGrid,
        logs: ["staring a new game", "user turn"],
      };
    case GameActionType.TOGGLE_TURN:
      return {
        ...state,
        whoGoes: state.whoGoes === Player.USER ? Player.COMPUTER : Player.USER,
      };
    default:
      return state;
  }
}

const GameLog: React.FC<{ logs: string[] }> = ({ logs }) => {
  return (
    <div className="game_log mt-2 border-t-2">
      <h3>Game logs</h3>
      <div className="p-4 bg-slate-600 h-full">
        {logs.map((log, index) => (
          <div className="text-white text-sm" key={index}>
            {log}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
