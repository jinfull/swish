import { data } from './data';

document.addEventListener('DOMContentLoaded', () => {
    d3.select(document.getElementById('chart'))
    .append("svg")
    .chart("BasketballShotChart", {
        width: 900,
        title: 'Lebron Jokic 2013-14',
        hexagonFillValue: function (d) { return d.z; },
        // reverse the heat range to map our z values to other colors
        heatScale: d3.scale.quantile()
            .domain([-2.5, 2.5])
            .range(['#5458A2', '#6689BB', '#FADC97', '#F08460', '#B02B48']),
        hexagonBin: function (point, bin) {
            var currentZ = bin.z || 0;
            var totalAttempts = bin.attempts || 0;
            var totalZ = currentZ * totalAttempts;

            var attempts = point.attempts || 1;
            bin.attempts = totalAttempts + attempts;
            bin.z = (totalZ + (point.z * attempts)) / bin.attempts;
        },
        // update radius threshold to at least 4 shots to clean up the chart
        hexagonRadiusThreshold: 2,
    })
    .draw(data);
});