/* eslint-disable array-callback-return */
import React, { useState } from "react";

const styles = {
  root: { display: "flex", textAllign: "center" },
  cube: {
    border: "solid 1px",
    minHeight: 40,
    minWidth: 40,
    maxHeight: 40,
    maxWidth: 40,
  },
};

const rows = 12;
const cols = 25;
let interval = "";
const selectedIn = new Set();

const Game = () => {
  /* State************/
  const [gridState, setGridState] = useState(() => {
    const rowV = [];
    for (let i = 0; i < rows; i++) {
      const colV = [];
      for (let j = 0; j < cols; j++) {
        colV.push(0);
      }
      rowV.push(colV);
    }
    return rowV;
  });
  /* ****************/

  /* Actions*********/
  const createGrid = () => {
    let gridCol = [];
    for (let j = 0; j < cols; j++) {
      let gridRow = [];
      for (let i = 0; i < rows; i++) {
        gridRow.push(
          <div
            key={i + "," + j}
            style={{
              backgroundColor: gridState[i][j] ? "blue" : "white",
              ...styles.cube,
            }}
            onClick={() => {
              const curr = gridState[i][j];
              const currIn = i + "," + j;
              if (!curr) {
                selectedIn.add(currIn);
              } else {
                if (selectedIn.has(currIn)) {
                  selectedIn.delete(currIn);
                }
              }
              setGridState((prevState) => {
                prevState[i][j] = curr ? 0 : 1;
                return [...prevState];
              });
            }}
          >
            {i}
            {j}
          </div>
        );
      }
      gridCol.push(<div key={j}>{gridRow}</div>);
    }
    return gridCol;
  };

  const resetGrid = () => {
    clearInterval(interval);
    selectedIn.clear();
    setGridState(() => {
      const rowV = [];
      for (let i = 0; i < rows; i++) {
        const colV = [];
        for (let j = 0; j < cols; j++) {
          colV.push(0);
        }
        rowV.push(colV);
      }
      return rowV;
    });
  };

  // include the cell itself
  const incNeighbours = [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
    [0, -1],
    [-1, 0],
  ];

  // only neighours
  const neighbours = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
    [0, -1],
    [-1, 0],
  ];

  const startSimulation = () => {
    interval = setInterval(() => {
      const tempSelectedIn = new Set();
      const delSet = new Set();
      for (let selectedbox of selectedIn) {
        const selectedBoxIndex = selectedbox.split(",");
        const x = parseInt(selectedBoxIndex[0]);
        const y = parseInt(selectedBoxIndex[1]);

        incNeighbours.map((incNeighbour) => {
          const u = incNeighbour[0];
          const v = incNeighbour[1];

          const neighbourIndX = x + u;
          const neighbourIndY = y + v;

          let count = 0;

          neighbours.map((neighbours) => {
            const a = neighbours[0];
            const b = neighbours[1];

            const nbrNeighbourIndX = neighbourIndX + a;
            const nbrNeighbourIndY = neighbourIndY + b;
            if (selectedIn.has(nbrNeighbourIndX + "," + nbrNeighbourIndY)) {
              count++;
            }
          });

          if (count < 2) {
            if (selectedIn.has(neighbourIndX + "," + neighbourIndY)) {
              delSet.add(neighbourIndX + "," + neighbourIndY);
            }
          } else if (count > 3) {
            if (selectedIn.has(neighbourIndX + "," + neighbourIndY)) {
              delSet.add(neighbourIndX + "," + neighbourIndY);
            }
          } else if (count === 3) {
            tempSelectedIn.add(neighbourIndX + "," + neighbourIndY);
          }
        });
      }

      // delete unwanted
      for (const del of delSet) {
        const delInd = del.split(",");
        const i = delInd[0];
        const j = delInd[1];
        if (i >= 0 && j >= 0 && i < rows && j < cols) {
          selectedIn.delete(del);
          setGridState((prevState) => {
            prevState[i][j] = 0;
            return [...prevState];
          });
        }
      }

      // add required
      for (const ad of tempSelectedIn) {
        const addInd = ad.split(",");
        const i = addInd[0];
        const j = addInd[1];

        if (i >= 0 && j >= 0 && i < rows && j < cols) {
          selectedIn.add(ad);
          setGridState((prevState) => {
            prevState[i][j] = 1;
            return [...prevState];
          });
        }
      }
    }, 1000);
  };

  /* ****************/

  return (
    <>
      <button onClick={startSimulation}>Start</button>
      <button onClick={resetGrid}>Reset</button>
      <div style={styles.root}>{createGrid()}</div>
    </>
  );
};

export default Game;
