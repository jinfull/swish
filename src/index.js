import { myData } from '../static/data';
import { emptyDataSet } from '../static/empty';




// import { playerShotChart } from './test';

const allPlayers = Object.keys(myData[0]).sort();

let showChart = (data) => {
  const container = d3.select(".chart-container");
  container.select('#chart').remove();
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
    .draw(data);
  // container.append("div").attr('class', 'yolo').text(data[0].x);
};

document.addEventListener("DOMContentLoaded", () => {

  var id = setInterval(() => {
    // console.log(rangeSlider);
    if (rangeSlider.value < rangeSlider.max) {
      rangeSlider.value++;
      // console.log(rangeSlider.value);
      const currPlayer = playerDropdown.property('value');
      showChart(myData[0][currPlayer][rangeSlider.value]);
      rangeBullet.innerHTML = rangeSlider.value;
      showSliderValue();
    }
  }, 1500);


  var rangeSlider = document.getElementById("rs-range-line");
  var rangeBullet = document.getElementById("rs-bullet");

  rangeSlider.addEventListener("input", showSliderValue, false);

  const randPlayer = allPlayers[Math.floor(Math.random() * allPlayers.length)];

  // let options = d3.select("#dropdown")
  //   .selectAll("option")
  //   .data(ericFormat)
  //   .enter()
  //   .append("option");

  // allPlayers.forEach(player => {
  //   console.log(player);
  //   options.append("option")
  //     .text(player)
  //     .attr('value', player);
  // });


  // for (let i = 0; i < allPlayers.length; i++) {
  //   options.text(function (d) {
  //     return Object.keys(d)[i];
  //   }).attr('value', function (d) {
  //     return allPlayers[i];
  //   });
  // }

  // const container = d3.select('.chart-container');



  const select = document.getElementById("dropdown");

  for (var i = 0; i < allPlayers.length; i++) {
    var opt = allPlayers[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    // if (i === 0) { el.selected = 'selected'; }
    select.appendChild(el);
  }

  // always initialize page with empty data (null set)
  showChart(emptyDataSet);


  // sample charting of data
  // console.log(ericFormat[0]["LeBron James"]["2003"]);
  // showChart(ericFormat[0]["LeBron James"]["2003"]);

  const playerDropdown = d3.select("#dropdown").data(myData);
  const slider = d3.select("#rs-range-line").data(myData);
  // const minMax = d3.select(".box-minmax").data(myData);

  // const min = minMax.selectAll('span')[0];
  // const max = minMax.selectAll('span')[1];

  const spanMin = document.getElementById("span-min");
  const spanMax = document.getElementById("span-max");

  // console.log(randPlayer);
  // console.log(Object.keys(myData[0][randPlayer])[0]);

  // console.log(Object.keys(myData[0][randPlayer]).reverse()[0])
  var minYear = Object.keys(myData[0][randPlayer])[0];
  var maxYear = Object.keys(myData[0][randPlayer]).reverse()[0];


  playerDropdown.on('change', function (d) {

    
    let newPlayer = d3.select(this).property('value');
    minYear = Object.keys(d[newPlayer])[0];
    maxYear = Object.keys(d[newPlayer]).reverse()[0];
    
    showChart(d[newPlayer][minYear]);
    
    slider.attr('min', minYear)
    .attr('max', maxYear)
    .attr('value', minYear);
    
    // console.log(slider);
    
    spanMin.innerHTML = minYear;
    spanMax.innerHTML = maxYear;
    
    rangeBullet.innerHTML = minYear;

    // rangeBullet.style.left = "0px";

    id = setInterval(() => {
      if (rangeSlider.value < rangeSlider.max) {
        rangeSlider.value++;
        const currPlayer = playerDropdown.property('value');
        showChart(myData[0][currPlayer][rangeSlider.value]);
        rangeBullet.innerHTML = rangeSlider.value;
        showSliderValue();
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

  
  function showSliderValue() {
    rangeBullet.innerHTML = rangeSlider.value;    

    const range = maxYear - minYear;

    var bulletPosition = (rangeSlider.value - minYear) / range;
    // console.log(bulletPosition);

    rangeBullet.style.left = (bulletPosition * 578) + "px";
  }


  // if (playerDropdown.property('value') === 'Select Player:') { slider.attr('disabled', 'true'); return; }
  // slider.attr('disabled', 'false');

  slider.on('change', function (d) {
    clearInterval(id);
    const currPlayer = playerDropdown.property('value');
    showChart(d[currPlayer][this.value]);
  });





  // console.log(myData);
  const blahBlah = () => {

  }



  // const yearSlider = document.getElementById('year');
  // yearSlider.addEventListener("change", (e) => {
  //   console.log(e);

  //   e.preventDefault();

  //   showChart(dataTwo);
  // });



});
