import type { NextPage } from "next";
import Head from "next/head";
import Grid from "../components/Grid/Grid";
import { useCallback, useEffect, useReducer } from "react";
import randomizeShips from "../components/Grid/randomizeShips";
import {
  Player,
  GameState,
  GameActionType,
  GameAction,
  PlayMovePayload,
  ResetPayload,
} from "../components/types";
/* 
state
whose turn: 'computer' or 'user'
isGameOver: false
userShips - a Map with the user ships locations
computerShips = a Map with the computer ships location.
userActions = a Map to list each user turn's action
computerActions = a Map to list each computer turn's action


// turn logic
on each turn user selects a cell in the oponent's board
if the clicked cell reveals a ship - its a hit if not, its a miss.
once a cell is clicked it's marked (if it was a hit yellow, if it was a miss - gray)
once a whole ship is destroyed, it cells will be colored red and a message should be shown in the game info section
a user needs to reach to a 17 hits score (carrier (5) battleship (4) cruiser (3) submarine (3) destroyer (2)) in order to win


*/

const initial: GameState = {
  whoGoes: Player.USER,
  isGameOver: false,
  message: "",
  userShips: new Map(),
  userHits: new Map(),
  computerShips: new Map(),
  computerHits: new Map(),
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

  const handleCellClick = useCallback((point: string) => {
    dispatch({ type: GameActionType.PLAY_MOVE, payload: { point } });
  }, []);
  return (
    <>
      <Head>
        <title>Battleships game</title>
      </Head>

      <main className="grid grid-cols-1 grid-rows-2">
        <div className="grid grid-cols-3 place-items-center">
          <Grid
            type={Player.USER}
            hits={state.computerHits}
            onCellClick={handleCellClick}
            disabled={state.whoGoes === Player.USER}
          />
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
          <Grid
            type={Player.COMPUTER}
            hits={state.userHits}
            onCellClick={handleCellClick}
            disabled={state.whoGoes === Player.COMPUTER}
          />
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
        userShips: (action.payload as ResetPayload).userGrid,
        computerShips: (action.payload as ResetPayload).computerGrid,
        logs: ["started a new game", "user turn"],
      };
    case GameActionType.TOGGLE_TURN:
      return {
        ...state,
        whoGoes: state.whoGoes === Player.USER ? Player.COMPUTER : Player.USER,
      };
    case GameActionType.PLAY_MOVE: {
      const { point } = action.payload as PlayMovePayload;
      switch (state.whoGoes) {
        case Player.USER: {
          const hitOrMiss = state.computerShips.get(point) || "miss";
          const newHits = new Map(Array.from(state.userHits)).set(
            point,
            hitOrMiss
          );
          return {
            ...state,
            userHits: newHits,
            whoGoes: Player.COMPUTER,
            logs: [
              ...state.logs,
              `${state.whoGoes} fires on ${point}, it's a ${
                hitOrMiss === "miss" ? "miss!" : "hit!"
              }`,
            ],
            userScore:
              hitOrMiss !== "miss" ? state.userScore + 1 : state.userScore,
          };
        }
        case Player.COMPUTER: {
          const hitOrMiss = state.userShips.get(point) || "miss";
          const newHits = new Map(Array.from(state.computerHits)).set(
            point,
            hitOrMiss
          );
          return {
            ...state,
            computerHits: newHits,
            whoGoes: Player.USER,
            logs: [
              ...state.logs,
              `${state.whoGoes} fires on ${point}, it's a ${
                hitOrMiss === "miss" ? "miss!" : "hit!"
              }`,
            ],
            computerScore:
              hitOrMiss !== "miss"
                ? state.computerScore + 1
                : state.computerScore,
          };
        }
      }
    }
    default:
      return state;
  }
}

type GameLogProps = {
  logs: string[];
};

const GameLog: React.FC<GameLogProps> = ({ logs }) => {
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
