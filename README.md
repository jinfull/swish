# Swish

[Live Demo](https://jinfull.github.io/swish/)

Swish is a tool for tracking NBA player shot charts and how their shot selection evolves over time. 

Swish is a completely front-end based project relying on JavaScript and D3.js with Python as the scripting language to generate the project's "seed" data.

## Features
* Dynamic updating of rookie and final seasons of selected players
* Automatic transitions highlighting year-to-year changes in player's shot chart (with onClick listener to remove transitions)
* Uses Python to read from official NBA Stats API and output files in desired format
* Uses D3.js library to select, append, and chart elements from coerced data
* Custom-built Google Search API to search and auto-populate image of selected player

#### Creating Season-to-Season Transitions

![](./assets/readme/swish-gif.gif)

As an added feature, a series of setIntervals were used to transition the slider automatically across the length of a player's career. On page load, a random player will be generated and the slider will move across to that player's final year. Any new selected player will also have this transition. 

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

