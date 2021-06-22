import PropTypes from "prop-types";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState, useReducer } from "react";
import styles from "../styles/Home.module.css";

//Square Child Component

//prop types - typescript
type SquareProps = {
  checkTurn: any;
  isXTurn: boolean;
  squareId: string;
  setSquareData: any;
  squareData: object;
  gameOver: boolean;
  reset: boolean;
  setReset: any;
};

//Component
export default function Square({
  checkTurn,
  isXTurn,
  squareId,
  setSquareData,
  squareData,
  gameOver,
  reset,
  setReset,
}: SquareProps) {
  const [content, setContent] = useState<string>(""),
    [played, setPlayed] = useState<boolean>(false);

  useEffect(() => {
    gameOver && setPlayed(true);
  }, [gameOver]);

  useEffect(() => {
    if (reset === true) {
      setContent("");
      setPlayed(false);
      setReset(false);
    }
  }, [reset]);

  let modifyContent = (event: any) => {
    let thisSquare = squareId;
    let squareClicked = event.target.id;

    if (squareClicked === thisSquare) {
      isXTurn ? setContent("X") : setContent("O");
      isXTurn
        ? setSquareData({ ...squareData, [squareId]: "X" })
        : setSquareData({ ...squareData, [squareId]: "O" });
      setPlayed(true);
    }
  };

  return (
    <div>
      <button
        id={squareId}
        disabled={played}
        onClick={(event: any) => {
          checkTurn();
          modifyContent(event);
        }}
      >
        {content}
      </button>
      <style jsx>{`
        div {
          border: 19px outset #50ecff;
          border-radius: 100px;
          padding: 0.1em;
          margin: 0.5em;
          height: 12vh;
          width: 12vh;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 10px -1px 74px 10px rgba(19, 232, 254, 0.21);
          -webkit-box-shadow: 10px -1px 74px 10px rgba(19, 232, 254, 0.21);
          -moz-box-shadow: 10px -1px 74px 10px rgba(19, 232, 254, 0.21);
        }
        button {
          font-size: x-large;
          border: none;
          background: white;
          border-radius: 100px;
          height: 100%;
          width: 100%;
          cursor: pointer;
          box-shadow: 18px 18px 27px -25px rgba(0, 0, 0, 0.65) inset;
          -webkit-box-shadow: 18px 18px 27px -25px rgba(0, 0, 0, 0.65) inset;
          -moz-box-shadow: 18px 18px 27px -25px rgba(0, 0, 0, 0.65) inset;
        }
        button:disabled {
          color: black;
          cursor: no-drop;
        }

        @media only screen and (max-width: 434px) {
          div {
            height: 11.5vh;
            width: 11.5vh;
          }
        }

        @media only screen and (max-width: 350px) {
          div {
            height: 10.5vh;
            width: 10.5vh;
          }
        }

        @media only screen and (max-width: 310px) {
          div {
            height: 9vh;
            width: 9vh;
          }
        }

        @media only screen and (max-width: 284px) {
          div {
            height: 8vh;
            width: 8vh;
          }
        }
      `}</style>
    </div>
  );
}

//PropTypes - React
Square.propTypes = {
  checkTurn: PropTypes.func.isRequired,
  gameOver: PropTypes.func,
  isXTurn: PropTypes.bool.isRequired,
  reset: PropTypes.bool,
  setReset: PropTypes.func,
  setSquareData: PropTypes.func,
  squareData: PropTypes.any,
  squareId: PropTypes.string.isRequired
}
