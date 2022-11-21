export enum Player {
  USER = "USER",
  COMPUTER = "COMPUTER",
}

export type Ship = {
  size: number;
  name: string;
};

export enum Ships {
  DESTROYER = "DESTROYER",
  SUBMARINE = "SUBMARINE",
  CRUISER = "CRUISER",
  BATTLESHIP = "BATTLESHIP",
  CARRIER = "CARRIER",
}

export type Score = Record<Ships, number> & { totalScore: number };

export type Grid = Map<string, string>;

export type GameState = {
  whoGoes: Player;
  isGameOver: boolean;
  userShips: Grid;
  userHits: Grid;
  computerShips: Grid;
  computerHits: Grid;
  userScore: Score;
  computerScore: Score;
  message: string;
  logs: string[];
};

export enum GameActionType {
  TOGGLE_TURN = "TOGGLE_TURN",
  RESET = "RESET",
  PLAY_MOVE = "PLAY_MOVE",
}
export type ResetPayload = {
  userGrid: Grid;
  computerGrid: Grid;
};

export type PlayMovePayload = {
  point: string;
};

export type BaseGameAction = {
  type: GameActionType;
};

export type ResetAction = BaseGameAction & { payload: ResetPayload };
export type PlayMoveAction = BaseGameAction & { payload: PlayMovePayload };

export type GameAction = ResetAction | PlayMoveAction;
