/**
 * This work is licensed under the Creative Commons
 * Attribution-NonCommercial-ShareAlike 4.0 International License. To view a
 * copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/
 * or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042,
 * USA.
 *
 * Copyright 2019 James Heggie
 */

import GraphRenderer from './renderer.graph.js';
import ProbabilityMapRenderer from './renderer.probability-map.js';
import ScatterPlotRenderer from './renderer.scatter-plot.js';

export default class Renderer {

  #pImpl;

  #graphRenderer;
  #pMapRenderer;
  #scatterPlotRenderer;

  constructor(settings) {

    const pImpl = this.#pImpl = {
      parent: this,
      plotBounds: [50, 10, 440, 440],
      coefficients: [0, 0, 0, 0],
      pixi: new PIXI.Application({
        width: +settings.width, height: +settings.height,
        backgroundColor: 0xFFFFFFFF,
        antialias: true,
        resolution: window.devicePixelRatio || 1,
        autoStart: true
      }),
    };

    this.#graphRenderer = new GraphRenderer(pImpl);
    this.#pMapRenderer = new ProbabilityMapRenderer(pImpl, settings);
    this.#scatterPlotRenderer = new ScatterPlotRenderer(pImpl, settings);

    document.getElementById(''+settings.containerId)
      .appendChild(pImpl.pixi.view);

    pImpl.ticker.update(Date.now());
  }

  setCoefficient(index, value) {
    const pImpl = this.#pImpl;
    pImpl.coefficients[index] = value;
    pImpl.pixi.ticker.update(Date.now());
  }

  getPlotBounds() {
    return [...this.#pImpl.plotBounds];
  }

  #render = function() {
    this.#pImpl.pixi.render();
  }

}
