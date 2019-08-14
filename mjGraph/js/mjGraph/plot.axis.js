/**
 * This work is licensed under the Creative Commons
 * Attribution-NonCommercial-ShareAlike 4.0 International License. To view a
 * copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/
 * or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042,
 * USA.
 *
 * Copyright 2019 James Heggie
 */

export class PlotAxis {

  #pImpl;
  #bounds = [];

  #g;

  #direction;

  constructor(pImpl, settings) {

    this.#pImpl = pImpl;
    this.#direction = settings.dir;

    this.#g = new PIXI.Graphics();
    pImpl.pixi.stage.addChild(this.#g);

  }

  setBounds(x, y, w, h) {
    const pImpl = this.#pImpl;
    this.#bounds = [x,y,w,h];
    this.render(this.#g, this.#bounds);
  }

  getBounds() {
    return this.#bounds.slice();
  }

  render(g, bounds) {
    const [x,y,w,h] = bounds;

    g.clear();

    if (this.#direction == 'vertical') {
      let p = new PIXI.Polygon(x+w-20,y, x+w,y, x+w,y+h, x+w-20,y+h);
      p.closeStroke = false;
      g.lineStyle(1);
      g.drawShape(p);
    }
    else if (this.#direction == 'horizontal') {
      let p = new PIXI.Polygon(x,y+20, x,y, x+w,y, x+w, y+20);
      p.closeStroke = false;
      g.lineStyle(1);
      g.drawShape(p);
    }
  }
}