/**
 * This work is licensed under the Creative Commons
 * Attribution-NonCommercial-ShareAlike 4.0 International License. To view a
 * copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/
 * or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042,
 * USA.
 *
 * Copyright 2019 James Heggie
 */

import {PlotTitle} from './plot.title.js';
import {PlotAxis} from './plot.axis.js';
import {PlotGrid} from './plot.grid.js';
import {PlotLayer} from './plot.layer.js';

/**
 * Plots have:
 * - A plot area
 * - x2 axes - a horizontal one and a vertical one
 * - A title
 */
export class Plot {

  #pImpl;

  #title;
  #hAxis;
  #vAxis;
  #layers;

  constructor(settings) {

    const self = this;

    const pImpl = this.#pImpl = {
      self: this,
      pixi: new PIXI.Application({
        view: CanvasOrId(settings.canvas),
        backgroundColor: 0xFFFFFFFF,
        antialias: true,
        resolution: window.devicePixelRatio || 1,
        autoStart: true
      }),

    };

    this.#title = new PlotTitle(pImpl);
    this.#vAxis = new PlotAxis(pImpl, { dir: 'vertical' });
    this.#hAxis = new PlotAxis(pImpl, { dir: 'horizontal' });

    this.#layers = [];
    if (settings.layers) {
      Array.prototype.forEach.call(settings.layers, (l) => {
        this.addLayer(l);
      });
    }

    window.addEventListener('resize', (e) => { HandleResize(); });
    HandleResize();

    function HandleResize() {
      const w = pImpl.pixi.renderer.view.clientWidth;
      const h = pImpl.pixi.renderer.view.clientHeight;

      pImpl.pixi.renderer.resize(w,h);
      self.#title.setBounds(0, 0, w, -1);

      const titleBounds = self.#title.getBounds();
      self.#vAxis.setBounds(5, titleBounds[3]+5, 50, h - titleBounds[3] - 10 - 50);
      self.#hAxis.setBounds(55, h - 55, w - 60, 50);
      self.#layers.forEach((l) => l.setBounds(55, titleBounds[3]+5, w - 60, h - titleBounds[3] - 10 - 50));
    }

  }

  addLayer(layer) {
    const titleBounds = this.#title.getBounds();
    const w = this.#pImpl.pixi.renderer.view.clientWidth;
    const h = this.#pImpl.pixi.renderer.view.clientHeight;

    this.#layers.push(layer);
    layer.attachToPlot(this.#pImpl, 55, titleBounds[3]+5, w - 60, h - titleBounds[3] - 10 - 50);
  }

}

function IsString(x) {
  return Object.prototype.toString.call(x) === "[object String]"
}

function CanvasOrId(e) {
  if (e instanceof HTMLCanvasElement) {
    return e;
  }
  else if (typeof e !== 'undefined' && e !== null) {
    const canvasElement = document.getElementById(''+e);
    if (canvasElement instanceof HTMLCanvasElement) {
      return canvasElement;
    }
    else {
      throw new Error('ID did not specify a valid canvas element.');
    }
  }
  else {
    throw new Error('Argument was null or undefined.');
  }
}