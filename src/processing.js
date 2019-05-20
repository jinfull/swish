// import { test } from "../static/player_data/2018-19";

// const myData = [];

const myCoords = (x, y) => {
  return [Math.floor(-(x / 10) + 25), Math.floor(y / 10 + 5)];
};

// export const processing = () => {
//   const rawData = test.resultSets[0].rowSet;

//   rawData.forEach(shotAttempt => {
//     let convertedCoords = myCoords(shotAttempt[17], shotAttempt[18]);
//     let x = convertedCoords[0];
//     let y = convertedCoords[1];
//     let made = 0;
//     if (shotAttempt[10] === "Made Shot") {
//       made = 1;
//     }

//     myData.push({
//       x: convertedCoords[0],
//       y: convertedCoords[1],
//       made: made,
//       attempts: 1
//     });
//   });

//   console.log(myData);
// };
