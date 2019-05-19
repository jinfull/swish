import { data } from "../static/test_data";
import { dataTwo } from "../static/test_data_two";
import { ericFormat } from '../static/eric';

// import { playerShotChart } from './test';

let showChart = (datum) => {
  const container = d3.select(".chart-container");
  // container.select('#chart').remove();
  container.append("div").attr("id", "chart")
    .append("svg")
    .chart("BasketballShotChart", {
      width: 700,
      title: (d) => {
        return '';
      },
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
      hexagonRadiusThreshold: 1
    })
    .draw(datum);
  // container.append("div").attr('class', 'yolo').text(data[0].x);
};

document.addEventListener("DOMContentLoaded", () => {
  // d3.json("/src/test_data.json")
  //   .then(data => {
  //     console.log(data);
  //   });
  // console.log(data);

  console.log(ericFormat[0]["LeBron James"]["2003"]);
  showChart(ericFormat[0]["LeBron James"]["2003"]);





  // let slider = d3.select('#year');
  // slider.on('change', function () {
  //   showChart(this.value);
  // });

  // const yearSlider = document.getElementById('year');
  // yearSlider.addEventListener("change", (e) => {
  //   console.log(e);

  //   e.preventDefault();

  //   showChart(dataTwo);
  // });
});
