import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Square from "./Square";

//Board Component

//Types
type Board = {
  isMultiPlayerLocal: boolean;
  isSinglePlayerLocal: boolean;
}

//Component

export default function Board({isMultiPlayerLocal, isSinglePlayerLocal}: Board) {
  //state
  const [isXTurn, setIsXTurn] = useState<boolean>(true),
    [squareData, setSquareData] = useState<any>({}),
    [turnText, setTurnText] = useState<string>("X's Turn"),
    [gameOver, setGameOver] = useState<boolean>(false),
    [reset, setReset] = useState<boolean>(false);

  //methods
  const checkTurn = (): void => {
    isXTurn === false ? setIsXTurn(true) : setIsXTurn(false);
  };

  let gameReset = () => {
    setIsXTurn(true);
    setSquareData({});
    setTurnText("X's Turn");
    setGameOver(false);
    setReset(true);
  };

  useEffect(() => {
    isXTurn ? setTurnText("X's Turn") : setTurnText("O's Turn");
  }, [isXTurn]);

  useEffect(() => {
    console.log(squareData);
    //0,1,2; 0,3,6; 0,4,8
    //1,4,7;
    //2,5,8; 2,4,6
    //3,4,5; 6,7,8
    squareData[0] === "X" &&
      squareData[1] === "X" &&
      squareData[2] === "X" &&
      setTurnText("X Wins!");
    squareData[0] === "O" &&
      squareData[1] === "O" &&
      squareData[2] === "O" &&
      setTurnText("O Wins!");

    squareData[0] === "X" &&
      squareData[3] === "X" &&
      squareData[6] === "X" &&
      setTurnText("X Wins!");
    squareData[0] === "O" &&
      squareData[3] === "O" &&
      squareData[6] === "O" &&
      setTurnText("O Wins!");

    squareData[0] === "X" &&
      squareData[4] === "X" &&
      squareData[8] === "X" &&
      setTurnText("X Wins!");
    squareData[0] === "O" &&
      squareData[4] === "O" &&
      squareData[8] === "O" &&
      setTurnText("O Wins!");

    squareData[1] === "X" &&
      squareData[4] === "X" &&
      squareData[7] === "X" &&
      setTurnText("X Wins!");
    squareData[1] === "O" &&
      squareData[4] === "O" &&
      squareData[7] === "O" &&
      setTurnText("O Wins!");

    squareData[2] === "X" &&
      squareData[5] === "X" &&
      squareData[8] === "X" &&
      setTurnText("X Wins!");
    squareData[2] === "O" &&
      squareData[5] === "O" &&
      squareData[8] === "O" &&
      setTurnText("O Wins!");

    squareData[2] === "X" &&
      squareData[4] === "X" &&
      squareData[6] === "X" &&
      setTurnText("X Wins!");
    squareData[2] === "O" &&
      squareData[4] === "O" &&
      squareData[6] === "O" &&
      setTurnText("O Wins!");

    squareData[3] === "X" &&
      squareData[4] === "X" &&
      squareData[5] === "X" &&
      setTurnText("X Wins!");
    squareData[3] === "O" &&
      squareData[4] === "O" &&
      squareData[5] === "O" &&
      setTurnText("O Wins!");

    squareData[6] === "X" &&
      squareData[7] === "X" &&
      squareData[8] === "X" &&
      setTurnText("X Wins!");
    squareData[6] === "O" &&
      squareData[7] === "O" &&
      squareData[8] === "O" &&
      setTurnText("O Wins!");
  }, [squareData]);

  useEffect(() => {
    //objectLength = Object.keys(exampleObject).length
    console.log(Object.keys(squareData).length);
    if (Object.keys(squareData).length === 9) {
      setTurnText("Draw!");
    }
  }, [squareData]);

  useEffect(() => {
    turnText === "X Wins!" && setGameOver(true);
    turnText === "O Wins!" && setGameOver(true);
    turnText === "Draw!" && setGameOver(true);
  }, [turnText]);

  //jsx
  return (
    <>
      <p>
        {turnText}
        <style jsx>{`
          p {
            font-size: x-large;
            text-decoration: underline;
            font-weight: bold;
            color: #19dae6;
        `}</style>
      </p>

      <div>
        {[...Array(9)].map((value: undefined, index: number) => (
          <Square
            key={index}
            squareId={index.toString()}
            isXTurn={isXTurn}
            checkTurn={checkTurn}
            setSquareData={setSquareData}
            squareData={squareData}
            gameOver={gameOver}
            reset={reset}
            setReset={setReset}
          />
        ))}
        <style jsx>{`
          div {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            border-radius: 4px;
            max-width: 40%;
            max-height: auto;
            background: rgb(36, 36, 36);
          }

          @media only screen and (max-width: 880px) {
            div {
              min-width: 50%;
            }
          }

          @media only screen and (max-width: 688px) {
            div {
              min-width: 60%;
            }
          }

          @media only screen and (max-width: 576px) {
            div {
              min-width: 75%;
            }
          }

          @media only screen and (max-width: 460px) {
            div {
              min-width: 100%;
            }
          }
        `}</style>
      </div>

      <button onClick={gameReset}>
        Reset Game
        <style jsx>{`
          button {
            margin-top: 1em;
            background: rgb(36, 36, 36);
            color: #19dae6;
            border: 4px solid #19dae6;
            border-radius: 4px;
            font-size: large;
            font-weight: bold;
            cursor: pointer;
          }
          button:hover {
            color: black;
            background: #19dae6;
          }
        `}</style>
      </button>
    </>
  );
}
