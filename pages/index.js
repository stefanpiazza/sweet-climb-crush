import React from "react";

import { useState } from "react";
import styles from "../styles/Home.module.scss";

import Hold1 from "../components/Icon/Hold1";
import Hold2 from "../components/Icon/Hold2";
import Hold3 from "../components/Icon/Hold3";
import Hold4 from "../components/Icon/Hold4";
import Hold5 from "../components/Icon/Hold5";
import Hold6 from "../components/Icon/Hold6";
import Hold7 from "../components/Icon/Hold7";
import Hold8 from "../components/Icon/Hold8";
import Hold9 from "../components/Icon/Hold9";
import Hold10 from "../components/Icon/Hold10";
import Hold11 from "../components/Icon/Hold11";
import Hold12 from "../components/Icon/Hold12";

import Grid from "../components/Grid/Grid";

import { checkColumns, checkRows } from "../components/utils";

const assets = [
  Hold1,
  Hold2,
  Hold3,
  Hold4,
  // Hold5,
  Hold6,
  Hold7,
  Hold8,
  Hold9,
  Hold10,
  Hold11,
  Hold12,
];

const Game = ({ layout, colors, columns, rows }) => {
  const [gridLayout, setGridLayout] = useState(layout);

  const updateLayout = (layout) => {
    setGridLayout(layout);
  };

  return (
    <div className={styles["wrapper"]}>
      <Grid
        layout={gridLayout}
        colors={colors}
        columns={columns}
        rows={rows}
        updateLayout={updateLayout}
      />
    </div>
  );
};

const Home = ({ data }) => {
  const { rows, columns, colors } = data;

  const layout = [];

  let hasMatches = true;

  while (hasMatches) {
    for (var i = 0; i < rows; i++) {
      layout[i] = [];

      for (var j = 0; j < columns; j++) {
        const randomColor = Math.floor(Math.random() * colors.length);
        const randomAsset = Math.floor(Math.random() * assets.length);

        layout[i][j] = {
          asset: assets[randomAsset],
          color: colors[randomColor],
        };
      }
    }

    const columnMatches = checkColumns(layout, rows, columns);
    const rowMatches = checkRows(layout, rows, columns);

    if (columnMatches.length === 0 && rowMatches.length === 0) {
      hasMatches = false;
    }
  }

  return <Game layout={layout} colors={colors} columns={columns} rows={rows} />;
};

export async function getServerSideProps() {
  return {
    props: {
      data: {
        rows: 9,
        columns: 6,
        colors: ["#0097e6", "#8c7ae6", "#e1b12c", "#44bd32", "#c23616"],
      },
    },
  };
}

export default Home;
