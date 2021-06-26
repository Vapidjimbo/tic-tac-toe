import { useEffect, useState } from "react";
import Square from "./Square";

//Board Component

//Types
type Board = {
  isMultiPlayerLocal: boolean;
  isSinglePlayerLocal: boolean;
};

//Component

export default function Board({
  isMultiPlayerLocal,
  isSinglePlayerLocal,
}: Board) {
  //state
  const [isXTurn, setIsXTurn] = useState<boolean>(true),
    [squareData, setSquareData] = useState<any>({}),
    [turnText, setTurnText] = useState<string>("X's Turn"),
    [gameOver, setGameOver] = useState<boolean>(false),
    [reset, setReset] = useState<boolean>(false),
    [disableClick, setDisableClick] = useState<string>(
      "auto"
    ),
    [winCombos] = useState<any>([
      [0, 1, 2],
      [0, 3, 6],
      [0, 4, 8],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
      [3, 4, 5],
      [6, 7, 8],
    ]);

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
    isXTurn && setDisableClick("auto");
  }, [isXTurn]);

  let botsTurn = () => {
    let prevIndex = 0;
    for (let i = 0; i < 9; i++) {
      let index = randNum(prevIndex);
      prevIndex = index;
      if (squareData[index] === undefined) {
        let square = document.getElementById(`${index}`);
        square!.click();
        break;
      }
    }
  };

  let randNum = (prevIndex: number): number => {
    let number = 0;
    let newIndex = false;
    while(newIndex === false) {
      number = Math.floor(Math.random() * 9);
      if(number !== prevIndex) {
        newIndex = true;
        break;
      }
    }
    return number;
  };

  useEffect(() => {
    if (isSinglePlayerLocal && isXTurn === false) {
      setDisableClick("none");
    }
  }, [isXTurn]);

  useEffect(() => {
    if (isSinglePlayerLocal && isXTurn === false) {
      setTimeout(botsTurn, 500);
    }
  }, [isXTurn]);

  useEffect(() => {
    Object.keys(squareData).length === 9 && setTurnText("Draw!");
  }, [squareData]);

  useEffect(() => {
    winCombos.forEach((combo: any) => {
      squareData[combo[0]] === "X" &&
        squareData[combo[1]] === "X" &&
        squareData[combo[2]] === "X" &&
        setTurnText("X Wins!");
      squareData[combo[0]] === "O" &&
        squareData[combo[1]] === "O" &&
        squareData[combo[2]] === "O" &&
        setTurnText("O Wins!");
    });
  }, [squareData, winCombos]);

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
            pointer-events: ${disableClick};
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
