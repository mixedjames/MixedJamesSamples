/**
 * This work is licensed under the Creative Commons
 * Attribution-NonCommercial-ShareAlike 4.0 International License. To view a
 * copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/
 * or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042,
 * USA.
 *
 * Copyright 2019 James Heggie
 */

import * as mjg from '../lib/mjGraph/mjGraph.js';

export class ScatterPlotLayer extends mjg.PlotLayer {

  #series;

  constructor(settings) {
    super();

    this.#series = settings.series.map(series => ({ name: series.name, x: series.x, y: series.y }));
  }

  render(g, bounds) {
    const [x,y,w,h] = bounds;

    g.lineStyle(1, 0xFFFFFF);

    let j = 0;
    this.#series.forEach(s => {

      for (let i = 0, l = s.x.length; i < l; ++ i) {

        if (j % 2) {
          g.drawCircle(x + s.x[i]*w, y + (1-s.y[i])*h, 3);
        }
        else {
          g.drawRect(x + s.x[i]*w, y + (1-s.y[i])*h, 4, 4);
        }

      }

      ++ j;
    });
    g.endFill();

  }

}