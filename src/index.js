import { myData } from '../static/data';
import { apiKey, cx } from '../config/keys';

const allPlayers = Object.keys(myData[0]).sort();

let showChart = (data) => {
  const container = d3.select(".chart-container");

  // remove previous chart
  container.select('#chart').remove();
  // draw the new chart
  container.append("div").attr("id", "chart")
    .append("svg")
    .chart("BasketballShotChart", {
      width: 800,
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
      hexagonRadiusThreshold: 2
    })
    .draw(data);    


    // Hexagon transitions fade-in and fade-out
    var currHexagons = d3.selectAll(".shot-chart-hexagon");

    currHexagons.style("opacity", "0");
    currHexagons
      .data(data)
      .transition().duration(1000)
      .style("opacity", "1")
      .style("fill", function (d) {
        return (d.z); 
      })
      .transition().duration(500)
      .style("opacity", "0.1")
      .transition().duration(0)
      .style("opacity", "1");

    var nextHexagons = d3.selectAll(".shot-chart-hexagon");
};

document.addEventListener("DOMContentLoaded", () => {
  function updateChart() {
      const currPlayer = playerDropdown.property('value');
      showChart(myData[0][currPlayer][rangeSlider.value]);
  }

  function updateSlider() {
    rangeSlider.value++;
    rangeBullet.innerHTML = rangeSlider.value;
    showSliderValue();
  }
  
  var id = setInterval(() => {
    if (rangeSlider.value < rangeSlider.max) {
      updateChart();
      updateSlider();
    }
  }, 1500);

  let currHexagons = d3.selectAll(".shot-chart-hexagon");
  // console.log(currHexagons);


  var rangeSlider = document.getElementById("rs-range-line");
  var rangeBullet = document.getElementById("rs-bullet");

  rangeSlider.addEventListener("input", showSliderValue, false);

  const randPlayer = 'LeBron James';
  console.log(randPlayer);

  // select dropdown and populate with list of allPlayers
  const select = document.getElementById("dropdown");
  for (var i = 0; i < allPlayers.length; i++) {
    var opt = allPlayers[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select.appendChild(el);
  }

  // SAMPLE DATA
  // console.log(myData[0]["LeBron James"]["2003"]);
  // showChart(myData[0]["LeBron James"]["2003"]);

  const playerDropdown = d3.select("#dropdown").data(myData);
  const slider = d3.select("#rs-range-line").data(myData);

  const spanMin = document.getElementById("span-min");
  const spanMax = document.getElementById("span-max");

  var minYear = Object.keys(myData[0][randPlayer])[0];
  var maxYear = Object.keys(myData[0][randPlayer]).reverse()[0];


  // playerDropdown change seleced player triggers redraws
  playerDropdown.on('change', function (d) {
    clearInterval(id);
    let newPlayer = d3.select(this).property('value');
    

    search(newPlayer);
    minYear = Object.keys(d[newPlayer])[0];
    maxYear = Object.keys(d[newPlayer]).reverse()[0];
    
    showChart(d[newPlayer][minYear]);

    slider.property('min', minYear)
    .property('max', maxYear)
    .property('value', minYear);
    
    spanMin.innerHTML = minYear;
    spanMax.innerHTML = maxYear;
    
    rangeBullet.innerHTML = minYear;

    rangeBullet.style.left = "0px";

    id = setInterval(() => {
      if (rangeSlider.value < rangeSlider.max) {
        updateChart();
        updateSlider();
      }
    }, 1500);
  });

  playerDropdown.property('value', randPlayer);
  rangeBullet.innerHTML = minYear;

  showChart(myData[0][randPlayer][minYear]);

  slider.attr('min', minYear)
    .attr('max', maxYear)
    .attr('value', minYear);

  spanMin.innerHTML = minYear;
  spanMax.innerHTML = maxYear;

  rangeBullet.innerHTML = minYear;

  // update rangeSlider value and moves along the slider Value
  function showSliderValue() {
    rangeBullet.innerHTML = rangeSlider.value;    
    const range = maxYear - minYear;
    var bulletPosition = (rangeSlider.value - minYear) / range;
    rangeBullet.style.left = (bulletPosition * 578) + "px";
  }

  // prevent automatic sliding when manually clicking on slider
  slider.on('change', function (d) {
    const currPlayer = playerDropdown.property('value');
    showChart(d[currPlayer][this.value]);
    clearInterval(id);
  });

  // pull up player image
  search(randPlayer);
});



function search(playerName) {
  /* select the input element */
  let playerImgDiv = d3.select('#playerImg');

  // /* fetch the following URL that includes apikey, cx and the value of input */
  fetch(`https://www.googleapis.com/customsearch/v1/siterestrict?key=${apiKey}&cx=${cx}&q=${playerName}`).then(response => response.text()).then(text => {
    let result = JSON.parse(text);

    if (!result.items) {
      fetch(`https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${playerName}`).then(response => response.text()).then(text => {
        result = JSON.parse(text);
      });
    }

    if (!result.items) {
      playerImgDiv.attr("src", "assets/stern.jpg");
      return;
    }

    let myImageSrc = result.items[0].pagemap.cse_image[0].src;

    playerImgDiv.attr("src", myImageSrc);
  });
};

