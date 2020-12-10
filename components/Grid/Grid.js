import cloneDeep from "lodash.clonedeep";
import merge from "lodash.merge";

import React, { useEffect, useState } from "react";

import styled from "styled-components";

import {
  swapTile,
  checkColumns,
  checkRows,
  isValidMove,
  updateColumns,
  updateRows,
} from "../utils";

import GridItem from "../GridItem/GridItem";

const StyledGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  width: 320px;
  padding: 8px;
`;

const Grid = ({ layout, columns, rows, updateLayout }) => {
  const [sourceHold, setSourceHold] = useState({});
  const [destinationHold, setDestinationHold] = useState({});

  const items = [];

  useEffect(() => {
    if (
      Object.keys(sourceHold).length !== 0 &&
      Object.keys(destinationHold).length !== 0
    ) {
      const source = { ...sourceHold };
      const destination = { ...destinationHold };
      const currentLayout = cloneDeep(layout);

      const swappedLayout = swapTile(currentLayout, source, destination);

      const columnMatches = checkColumns(swappedLayout, rows, columns);
      const rowMatches = checkRows(swappedLayout, rows, columns);

      const validMove = isValidMove(source, destination);

      if (validMove) {
        if (columnMatches.length === 0 && rowMatches.length === 0) {
          console.log("no match");
        } else {
          console.log("match");

          const updatedColumns = updateColumns(swappedLayout, columnMatches);
          const updatedRows = updateRows(swappedLayout, rowMatches);

          const updatedLayout = merge(updatedColumns, updatedRows);

          updateLayout(updatedLayout);
        }
      } else {
        console.log("invalid move");
      }

      setSourceHold({});
      setDestinationHold({});
    }
  }, [sourceHold, destinationHold]);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const GridHold = layout[i][j]["asset"];

      items.push(
        <GridItem
          key={`${i}-${j}`}
          onClick={() => {
            if (Object.keys(sourceHold).length === 0) {
              setSourceHold({ i, j });
            } else if (Object.keys(destinationHold).length === 0) {
              setDestinationHold({ i, j });
            }
          }}
        >
          <GridHold
            isActive={
              (sourceHold["i"] == i && sourceHold["j"] == j) ||
              (destinationHold["i"] == i && destinationHold["j"] == j)
            }
            fill={layout[i][j]["color"]}
          />
        </GridItem>
      );
    }
  }

  return <StyledGrid>{items}</StyledGrid>;
};

export default Grid;
