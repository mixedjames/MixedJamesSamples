/**
 * This work is licensed under the Creative Commons
 * Attribution-NonCommercial-ShareAlike 4.0 International License. To view a
 * copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/
 * or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042,
 * USA.
 *
 * Copyright 2019 James Heggie
 */

export class PlotLayer {

  #pImpl;
  #bounds = [0,0,0,0];
  #g;

  constructor() {
  }

  attachToPlot(pImpl, x, y, w, h) {
    this.#pImpl = pImpl;
    this.#g = new PIXI.Graphics();
    this.#bounds = [x, y, w, h];
    pImpl.pixi.stage.addChild(this.#g);
    this.repaint();
  }

  repaint() {
    this.#g.clear();
    this.render(this.#g, this.#bounds);
  }

  render(g, bounds) {
    const [x,y,w,h] = bounds;

/*
    g.beginFill(0x7F7F7F);
    g.drawRect(x,y,w,h);
    g.endFill();
*/
  }

  setBounds(x, y, w, h) {
    this.#bounds = [x,y,w,h];
    this.repaint();
  }

  getBounds() {
    return this.#bounds.slice();
  }
}