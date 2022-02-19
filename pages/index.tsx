import type { NextPage } from "next";
import Head from "next/head";
import GameInfo from "../components/GameInfo/GameInfo";
import Grid from "../components/Grid/Grid";
import { ShipProps, Ship } from "../components/Ship";

const Home: NextPage = () => {
  function renderShips() {
    const ships: ShipProps[] = [
      { shipName: "destroyer_container", size: 2, bg: "bg-orange-500" },
      { shipName: "submarine_container", size: 3, bg: "bg-pink-500" },
      { shipName: "cruiser_container", size: 3, bg: "bg-purple-500" },
      { shipName: "battleship_container", size: 4, bg: "bg-teal-500" },
      { shipName: "carrier_container", size: 5, bg: "bg-green-500" },
    ];
    return ships.map((props, index) => <Ship key={index} {...props} />);
  }
  return (
    <>
      <Head>
        <title>Battleships game</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="flex ">
          <Grid data-test="user_grid" type="user" />
          <Grid data-test="comp_grid" type="comp" />
        </div>
        <GameInfo />
      </main>
      <div className="m-5 bg-yellow-500 w-[400px] h-[400px]">
        {renderShips()}
      </div>
    </>
  );
};

export default Home;
