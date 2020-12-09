export const isValidMove = (source, destination) => {
  const distanceX = Math.abs(source["i"] - destination["i"]);
  const distanceY = Math.abs(source["j"] - destination["j"]);

  if (distanceX > 1) {
    return false;
  }

  if (distanceY > 1) {
    return false;
  }

  if (distanceX + distanceY > 1) {
    return false;
  }

  return true;
};

export const swapTile = (layout, source, destination) => {
  const updatedLayout = [...layout];

  const tile1 = { ...updatedLayout[source["i"]][source["j"]] };
  const tile2 = { ...updatedLayout[destination["i"]][destination["j"]] };

  updatedLayout[source["i"]][source["j"]] = tile2;
  updatedLayout[destination["i"]][destination["j"]] = tile1;

  return updatedLayout;
};

export const insertNew = (layout, assets, colors, i, j) => {
  const updatedLayout = [...layout];

  updatedLayout[i][j] = {
    asset: assets[Math.floor(Math.random() * assets.length)],
    color: colors[Math.floor(Math.random() * colors.length)],
  };

  return updatedLayout;
};

export const dropDown = (layout, rows, columns) => {
  const updatedLayout = [...layout];

  for (var i = -1; i < rows - 1; i++) {
    for (var j = 0; j < columns; j++) {
      if (updatedLayout[i + 1][j].color == "#2f3640") {
        if (i == -1) {
          // insert new row
        } else {
          updatedLayout[i + 1][j] = { ...updatedLayout[i][j] };
          updatedLayout[i][j].color = "#2f3640";
        }
      }
    }
  }

  return updatedLayout;
};

export const checkRows = (layout, rows, columns) => {
  const matches = [];

  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns - 2; j++) {
      const rowOfThree = [layout[i][j], layout[i][j + 1], layout[i][j + 2]];
      if (
        rowOfThree.every(
          (item) => item.color !== "#2f3640" && item.color == layout[i][j].color
        )
      ) {
        matches.push({ i, j });
      }
    }
  }

  return matches;
};

export const updateRows = (layout, matches) => {
  const updatedLayout = layout;

  for (var i = 0; i < matches.length; i++) {
    updatedLayout[matches[i]["i"]][matches[i]["j"]].color = "#2f3640";
    updatedLayout[matches[i]["i"]][matches[i]["j"] + 1].color = "#2f3640";
    updatedLayout[matches[i]["i"]][matches[i]["j"] + 2].color = "#2f3640";
  }

  return updatedLayout;
};

export const checkColumns = (layout, rows, columns) => {
  const matches = [];

  for (var i = 0; i < rows - 2; i++) {
    for (var j = 0; j < columns; j++) {
      const rowOfThree = [layout[i][j], layout[i + 1][j], layout[i + 2][j]];
      if (
        rowOfThree.every(
          (item) => item.color !== "#2f3640" && item.color == layout[i][j].color
        )
      ) {
        matches.push({ i, j });
      }
    }
  }

  return matches;
};

export const updateColumns = (layout, matches) => {
  const updatedLayout = layout;

  for (var i = 0; i < matches.length; i++) {
    updatedLayout[matches[i]["i"]][matches[i]["j"]].color = "#2f3640";
    updatedLayout[matches[i]["i"] + 1][matches[i]["j"]].color = "#2f3640";
    updatedLayout[matches[i]["i"] + 2][matches[i]["j"]].color = "#2f3640";
  }

  return updatedLayout;
};
