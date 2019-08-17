/**
 * This work is licensed under the Creative Commons
 * Attribution-NonCommercial-ShareAlike 4.0 International License. To view a
 * copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/
 * or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042,
 * USA.
 *
 * Copyright 2019 James Heggie
 */

import {PlotLayer} from './plot.layer.js';

export class ScatterPlotLayer extends PlotLayer {

  #pImpl;
  #series;

  constructor(settings) {
    super();

    this.#series = settings.series.map(series => ({ name: series.name, x: series.x, y: series.y }));
  }

  attachToPlot(pImpl, x, y, w, h) {
    this.#pImpl = pImpl;
    super.attachToPlot(pImpl, x, y, w, h);
  }

  render(g, bounds) {
    const [x,y,w,h] = bounds;
    const {xMax, xMin, yMax, yMin} = this.#pImpl;
    const dx = xMax - xMin;
    const dy = yMax - yMin;

    g.lineStyle(1, 0xFFFFFF);

    let j = 0;
    this.#series.forEach(s => {

      for (let i = 0, l = s.x.length; i < l; ++ i) {

        const px = x + (s.x[i] - xMin) * w/dx;
        const py = y + (dy - s.y[i] + yMin) * h/dy;

        if (j % 2) {
          g.drawCircle(px, py, 3);
        }
        else {
          g.drawRect(px, py, 4, 4);
        }

      }

      ++ j;
    });
    g.endFill();

  }

}