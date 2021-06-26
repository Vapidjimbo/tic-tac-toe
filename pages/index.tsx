import styles from "../styles/Home.module.css";
import Board from "./Components/Board";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Tic-Tac-Toe</h1>
        <Board isMultiPlayerLocal={false} isSinglePlayerLocal={true} />
      </main>
      <style jsx>{`
        h1 {
          color: #19dae6;
          margin: 0.5em;
        }
        body {
          background: white;
          color: black;
        }
        @media only screen and (max-width: 300px) {
          h1 {
            font-size: 1.5em;
          }
        }
      `}</style>
    </div>
  );
}
