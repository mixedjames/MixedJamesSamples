import * as mjg from './mjGraph/mjGraph.js';

class TestLayer extends mjg.PlotLayer {

  render(g, bounds) {
    const [x,y,w,h] = bounds;

    g.setTransform(x, y);
    g.beginFill(0);
    g.drawRect(10, 10, w - 20, h - 20);
    g.endFill();
  }

}

const p = new mjg.Plot({
  canvas: 'theCanvas',
  layers: [new TestLayer()]
});
