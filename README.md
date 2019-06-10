# Swish

[Live Demo](https://jinfull.github.io/swish/)

Swish is a tool for tracking NBA player shot charts and how their shot selection evolves over time. 

Swish is a completely front-end based project relying on JavaScript and D3.js with Python as the scripting language to generate the project's seed data.

![](./assets/readme/swish-gif.gif)

## Features
* Dynamic updating of rookie and final seasons of selected players
* Automatic transitions highlighting year-to-year changes in player's shot chart
* Uses Python to read from official NBA Stats API and output files in desired format
* Uses D3.js library to select, append, and chart elements from coerced data
* Custom-built Google Search API to search and auto-populate image of selected player

#### Creating Season-to-Season Transitions

A series of setIntervals were used to transition the slider automatically across the length of a player's career. On page load, a random player will be generated and the slider will move across to that player's final year. Any new selected player will also have this transition. 

An onChange listener is placed on the season slider to clear any current setIntervals if the user wishes to manually view season-to-season changes.

```
  // slider transitions will be triggered on initial site load or new player selected
  var id = setInterval(() => {
    if (rangeSlider.value < rangeSlider.max) {
      rangeSlider.value++;
      const currPlayer = playerDropdown.property('value');
      showChart(myData[0][currPlayer][rangeSlider.value]);
      rangeBullet.innerHTML = rangeSlider.value;
      showSliderValue();
    }
  }, 1500);
```
```
  // remove setInterval transition when user manually clicks on season slider bar
  slider.on('change', function (d) {
    const currPlayer = playerDropdown.property('value');
    showChart(d[currPlayer][this.value]);
    clearInterval(id);
  });
```

#### Creating a custom Google Search API

As a bonus MVP, I created and implemented a custom Google Search Engine to query for player images. Player images are displayed beneath the player selection dropdown and dynamically search Google and returns the top (first) image result.

This was initially implemented to pull a random image from the first ten results, but it was found after some experimentation that the first result from Google querying ESPN.com would return a headshot photo of that specified player. 

```
    fetch(`https://www.googleapis.com/customsearch/v1/siterestrict?key=${apiKey}&cx=${cx}&q=${playerName}`).then(response => response.text()).then(text => {
      let result = JSON.parse(text);

      let myImageSrc = result.items[0].pagemap.cse_image[0].src;

      playerImgDiv.attr("src", myImageSrc);
    });
  }
```