import { myData } from '../static/data';
import { apiKey, cx } from '../config/keys';

const allPlayers = Object.keys(myData[0]).sort();

let showChart = (data) => {
  const container = d3.select(".chart-container");
  container.select('#chart').remove();
  container.append("div").attr("id", "chart")
    .append("svg")
    .chart("BasketballShotChart", {
      width: 800,
      // title: (d) => {
      //   return '';
      // },
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

    var currHexagons = d3.selectAll(".shot-chart-hexagon");
    // var nextHexagons;

    // var myHexagons = d3.selectAll(".shot-chart-hexagon")
    //   .data(data)
    //   .transition().duration(1000)
    //     .style("fill", function (d) { 
    //     // console.log(d)
    //     return (d.z); 
    //   });

    currHexagons.style("opacity", "0");


    currHexagons
      .data(data)
      .transition().duration(1000)
      .style("opacity", "1")
      .style("fill", function (d) {
        return (d.z); 
      })
      .transition().duration(300)
      .style("opacity", ".75");


    // nextHexagons
    //   .data(data2)
    //   .transition().duration(1000)
    //   .style("opacity", "0")
    //   .style("fill", function (d) {
    //     return (d.z);
    //   });
    
};



document.addEventListener("DOMContentLoaded", () => {
  var id = setInterval(() => {
    if (rangeSlider.value < rangeSlider.max) {
      rangeSlider.value++;
      const currPlayer = playerDropdown.property('value');
      showChart(myData[0][currPlayer][rangeSlider.value]);
      rangeBullet.innerHTML = rangeSlider.value;
      showSliderValue();
    }
  }, 1500);

  let currHexagons = d3.selectAll(".shot-chart-hexagon");
  // console.log(currHexagons);


  var rangeSlider = document.getElementById("rs-range-line");
  var rangeBullet = document.getElementById("rs-bullet");

  rangeSlider.addEventListener("input", showSliderValue, false);

  const randPlayer = allPlayers[Math.floor(Math.random() * allPlayers.length)];



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

    rangeBullet.style.left = (bulletPosition * 578) + "px";
  }

  slider.on('change', function (d) {
    const currPlayer = playerDropdown.property('value');
    showChart(d[currPlayer][this.value]);
    clearInterval(id);
  });


  function search(playerName) {
    // /* select the input element */
    // let playerImgDiv = d3.select('#playerImg');

    // // /* fetch the following URL that includes apikey, cx and the value of input */
    //   fetch(`https://www.googleapis.com/customsearch/v1/siterestrict?key=${apiKey}&cx=${cx}&q=${playerName}`).then(response => response.text()).then(text => {
    //   let result = JSON.parse(text);

    //   if (!result.items) {
    //     fetch(`https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${playerName}`).then(response => response.text()).then(text => {
    //       result = JSON.parse(text);
    //     });
    //   }

    //   if (!result.items) {
    //     playerImgDiv.attr("src", "assets/stern.jpg");
    //     return;
    //   }

    //   const myRand = Math.floor(Math.random() * 10);

    //   let myImageSrc = result.items[0].pagemap.cse_image[0].src;

    //   playerImgDiv.attr("src", myImageSrc);
    // });
  }

  search(randPlayer);

});
