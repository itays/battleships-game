import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import GameInfo from "../components/GameInfo/GameInfo";
import Grid from "../components/Grid/Grid";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Battleships game</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.container}>
          <Grid data-test="user_grid" type="user" />
          <Grid data-test="comp_grid" type="comp" />
        </div>
        <GameInfo />
      </main>
      <div className={styles.grid_display}>
        <div
          data-test="destroyer_container"
          className={[styles.ship, styles.destroyer_container].join(" ")}
          draggable
        >
          <div id="destroyer_0" className={styles.ship_cell}></div>
          <div id="destroyer_1" className={styles.ship_cell}></div>
        </div>

        <div
          data-test="submarine_container"
          className={[styles.ship, styles.submarine_container].join(" ")}
          draggable
        >
          <div id="submarine_0" className={styles.ship_cell}></div>
          <div id="submarine_1" className={styles.ship_cell}></div>
          <div id="submarine_2" className={styles.ship_cell}></div>
        </div>

        <div
          data-test="cruiser_container"
          className={[styles.ship, styles.cruiser_container].join(" ")}
          draggable
        >
          <div id="cruiser_0" className={styles.ship_cell}></div>
          <div id="cruiser_1" className={styles.ship_cell}></div>
          <div id="cruiser_2" className={styles.ship_cell}></div>
        </div>

        <div
          data-test="battleship_container"
          className={[styles.ship, styles.battleship_container].join(" ")}
          draggable
        >
          <div id="battleship_0" className={styles.ship_cell}></div>
          <div id="battleship_1" className={styles.ship_cell}></div>
          <div id="battleship_2" className={styles.ship_cell}></div>
          <div id="battleship_3" className={styles.ship_cell}></div>
        </div>

        <div
          data-test="carrier_container"
          className={[styles.ship, styles.carrier_container].join(" ")}
          draggable
        >
          <div id="carrier_0" className={styles.ship_cell}></div>
          <div id="carrier_1" className={styles.ship_cell}></div>
          <div id="carrier_2" className={styles.ship_cell}></div>
          <div id="carrier_3" className={styles.ship_cell}></div>
          <div id="carrier_4" className={styles.ship_cell}></div>
        </div>
      </div>
    </>
  );
};

export default Home;
