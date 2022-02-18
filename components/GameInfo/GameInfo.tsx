import React from "react";

const GameInfo: React.FC = () => {
  return (
    <div>
      <button
        className={`text-base font-medium rounded-lg p-2 bg-sky-500 text-white m-1`}
      >
        Start Game
      </button>
      <button className="text-base font-medium rounded-lg p-2 bg-sky-500 text-white m-1">
        Rotate
      </button>
      <h3 id="whose_turn">Your go</h3>
      <h3 id="info"></h3>
    </div>
  );
};

export default GameInfo;
