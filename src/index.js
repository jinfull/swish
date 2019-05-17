import { data } from "../static/test_data";
import { dataTwo } from "../static/test_data_two";
import { processing } from "./processing";

// import { playerShotChart } from './test';
// import * as d3 from 'd3';


let showChart = (data) => {
  const container = d3.select(".chart-container");
  container.select('#chart').remove();
  container.append("div").attr("id", "chart")
    .append("svg")
    .chart("BasketballShotChart", {
      width: 700,
      title: "Nikola Jokić 2018-19",
      hexagonFillValue: function (d) {
        return d.z;
      },
      // reverse the heat range to map our z values to other colors
      heatScale: d3.scale
        .quantile()
        .domain([-2.5, 2.5])
        .range(["#5458A2", "#6689BB", "#FADC97", "#F08460", "#B02B48"]),
      hexagonBin: function (point, bin) {
        var currentZ = bin.z || 0;
        var totalAttempts = bin.attempts || 0;
        var totalZ = currentZ * totalAttempts;

        var attempts = point.attempts || 1;
        bin.attempts = totalAttempts + attempts;
        bin.z = (totalZ + point.z * attempts) / bin.attempts;
      },
      // update radius threshold to at least 4 shots to clean up the chart
      hexagonRadiusThreshold: 0
    })
    .draw(data);
};

document.addEventListener("DOMContentLoaded", () => {
  // d3.json("src/test_data.json")
  //   .then(data => {
  //     console.log(data);
  //   });
  showChart(data);


  const submitButton = document.getElementById('whatever');
  // debugger
  submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    showChart(dataTwo);
  });
});




// document.addEventListener("DOMContentLoaded", () => {
//   d3.select(document.getElementById("chart"))
//     .append("svg")
//     .chart("BasketballShotChart", {
//       width: 700,
//       title: "Nikola Jokić 2018-19",
//       hexagonFillValue: function (d) {
//         return d.z;
//       },
//       // reverse the heat range to map our z values to other colors
//       heatScale: d3.scale
//         .quantile()
//         .domain([-2.5, 2.5])
//         .range(["#5458A2", "#6689BB", "#FADC97", "#F08460", "#B02B48"]),
//       hexagonBin: function (point, bin) {
//         var currentZ = bin.z || 0;
//         var totalAttempts = bin.attempts || 0;
//         var totalZ = currentZ * totalAttempts;

//         var attempts = point.attempts || 1;
//         bin.attempts = totalAttempts + attempts;
//         bin.z = (totalZ + point.z * attempts) / bin.attempts;
//       },
//       // update radius threshold to at least 4 shots to clean up the chart
//       hexagonRadiusThreshold: 0
//     })
//     .draw(data);
// });