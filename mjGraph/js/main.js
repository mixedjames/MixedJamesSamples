import * as mjg from './mjGraph/mjGraph.js';

class TestLayer extends mjg.PlotLayer {

  render(g, bounds) {
    const [x,y,w,h] = bounds;

    g.setTransform(x, y);
    g.beginFill(0xAAAAFF);
    g.drawRect(0, 0, w, h);
    g.endFill();
  }

}

const p = new mjg.Plot({
  canvas: 'theCanvas',
  layers: [new TestLayer(), new mjg.LineSegmentLayer([0, -1, 1])],
  title: 'A test title',
  subtitle: 'A test subtitle which is a\nbit longer than the title.',
  xMin: 0, xMax: 0.5,
  yMin: 0, yMax: 0.5
});

LoadDataFile('data/random-data-1.csv').then((result) => {
  console.log(result);
  p.addLayer(new mjg.ScatterPlotLayer({
    series: [{ name: "Test", x: result.x, y: result.y }]
  }));
});

function LoadDataFile(name) {
  return new Promise((resolve, reject) => {
    $.get(name).then((csvText) => {
      const csvArrays = $.csv.toArrays(csvText);
      const result = {};

      for (let col = 0, nCols = csvArrays[0].length; col < nCols; ++ col) {
        result[csvArrays[0][col]] = [];
      }

      for (let row = 1, nRows = csvArrays.length; row < nRows; ++ row) {
        for (let col = 0, nCols = csvArrays[row].length; col < nCols; ++ col) {
          result[csvArrays[0][col]].push(+csvArrays[row][col]);
        }
      }

      resolve(result);
    });
  });
}