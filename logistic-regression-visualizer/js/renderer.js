/**
 * This work is licensed under the Creative Commons
 * Attribution-NonCommercial-ShareAlike 4.0 International License. To view a
 * copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/
 * or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042,
 * USA.
 *
 * Copyright 2019 James Heggie
 */

import LoadTextFile from './load-text-file.js';
import { ClipLineToUnitSquare, NextPowerOf2 } from './geom-utils.js'

export default class Renderer {

  #pixi = null;
  #filter = null;

  #gBase = null;
  #gProbabilityMap = null;
  #gOverlay = null;

  #probabilityMapBounds = [50, 10, 440, 440];

  constructor() {

    this.#pixi = new PIXI.Application({
      width: 500, height: 500,
      backgroundColor: 0xFFFFFFFF,
      antialias: true,
      resolution: window.devicePixelRatio || 1
    });

    document.getElementById('theContainer').appendChild(this.#pixi.view);

    this.#gBase = new PIXI.Graphics();
    this.#gProbabilityMap = new PIXI.Graphics();
    this.#gOverlay = new PIXI.Graphics();

    this.#pixi.stage.addChild(this.#gBase);
    this.#pixi.stage.addChild(this.#gProbabilityMap);
    this.#pixi.stage.addChild(this.#gOverlay);

    LoadTextFile('shaders/logistic-regression-map.txt')
    .then((txt) => {
      this.#filter = new PIXI.Filter('', txt, {
        coefficients: [0,0,0,0], adjust: [1,1]
      });
      this.#gProbabilityMap.filters = [this.#filter];

      this.#render(this);

    })
    .catch((e) => {
      console.error(e);
    });
  }

  setCoefficient(index, value) {
    this.#filter.uniforms.coefficients[index] = +value;
    requestAnimationFrame(() => { this.#render(); });
  }

  #render = function() {
    this.#renderBase();
    this.#renderProbabilityMap();
    this.#renderOverlay();
  }

  #renderBase = function() {
    const g = this.#gBase;
  }

  #renderProbabilityMap = function() {
    const g = this.#gProbabilityMap;

    this.#filter.uniforms.adjust[0] =
      NextPowerOf2(this.#probabilityMapBounds[2]) / this.#probabilityMapBounds[2];
    this.#filter.uniforms.adjust[1] =
      NextPowerOf2(this.#probabilityMapBounds[3]) / this.#probabilityMapBounds[3];

    g.beginFill(0);
    g.drawRect(
      this.#probabilityMapBounds[0], this.#probabilityMapBounds[1],
      this.#probabilityMapBounds[2], this.#probabilityMapBounds[3]
    );
    g.endFill();
  }

  #renderOverlay = function() {
    const g = this.#gOverlay;

    // Overlay features:
    // (a) Line of equation given by LR coefficients
    // (b) Axes

    g.clear();

    // (a) The line...
    const line = ClipLineToUnitSquare(this.#filter.uniforms.coefficients);

    g.lineStyle(3);
    g.beginFill(0);
    g.drawPolygon([
      this.#probabilityMapBounds[0] + line[0]*this.#probabilityMapBounds[2],
      this.#probabilityMapBounds[1] + (1-line[1])*this.#probabilityMapBounds[3],
      this.#probabilityMapBounds[0] + line[2]*this.#probabilityMapBounds[2],
      this.#probabilityMapBounds[1] + (1-line[3])*this.#probabilityMapBounds[3]
    ]);
    g.endFill();

    // (b) The axes...
    this.#renderVAxis();
    this.#renderHAxis();
  }

  #renderVAxis = function() {
    const g = this.#gOverlay;

    const canvasRect = this.#pixi.screen;
    const mapRect = this.#probabilityMapBounds;

    const x = Math.floor(0.2 * mapRect[0]);
    const y = mapRect[1];
    const w = Math.floor(0.8 * mapRect[0]) - x;
    const h = mapRect[3];

    let p = new PIXI.Polygon(x,y, x+w,y, x+w,y+h, x,y+h);
    p.closeStroke = false;

    g.lineStyle(1);
    g.drawShape(p);
  }

  #renderHAxis = function() {
    const g = this.#gOverlay;

    const canvasRect = this.#pixi.screen;
    const mapRect = this.#probabilityMapBounds;

    const x = mapRect[0];
    const y = mapRect[1]+mapRect[3] + 0.2 * (canvasRect.height - mapRect[1] - mapRect[3]);
    const w = mapRect[2];
    const h = 0.6 * (canvasRect.height - mapRect[1] - mapRect[3]);

    let p = new PIXI.Polygon(x,y+h, x,y, x+w,y, x+w, y+h);
    p.closeStroke = false;

    g.lineStyle(1);
    g.drawShape(p);
  }
}
