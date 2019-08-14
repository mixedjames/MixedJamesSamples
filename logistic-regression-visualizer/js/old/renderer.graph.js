/**
 * This work is licensed under the Creative Commons
 * Attribution-NonCommercial-ShareAlike 4.0 International License. To view a
 * copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/
 * or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042,
 * USA.
 *
 * Copyright 2019 James Heggie
 */

export default class GraphRenderer {

  #parent;
  #pixi;
  #g = new PIXI.Graphics();

  #xLabel = new PIXI.Text(
    'Fish and spam',
    { fontFamily: 'Open Sans', fontSize: '12pt', fill: 'black', align: 'center' }
  );

  constructor(parent, pixi) {

    this.#parent = parent;
    this.#pixi = pixi;

    pixi.stage.addChild(this.#g);
    this.#render();

  }

  #render = function() {
    const g = this.#g;

    this.#xLabel.x ++;

    // Overlay features:
    // (a) Line of equation given by LR coefficients
    // (b) Axes

    g.clear();

    // (a) The line...

    // (b) The axes...
    this.#renderVAxis();
    this.#renderHAxis();
  }

  #renderVAxis = function() {
    const g = this.#g;

    const canvasRect = this.#pixi.screen;
    const mapRect = this.#parent.getPlotBounds();

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
    const g = this.#g;

    const canvasRect = this.#pixi.screen;
    const mapRect = this.#parent.getPlotBounds();

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