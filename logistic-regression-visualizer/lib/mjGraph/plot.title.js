/**
 * This work is licensed under the Creative Commons
 * Attribution-NonCommercial-ShareAlike 4.0 International License. To view a
 * copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/
 * or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042,
 * USA.
 *
 * Copyright 2019 James Heggie
 */

export class PlotTitle {

  #pImpl;

  #title;
  #subTitle;

  // top, right, bottom, left (a'la CSS)
  #padding = [5, 5, 5, 5];
  #pSpacing = 10;
  #bounds = [];

  constructor(pImpl, titleString, subTitleString) {
    this.#pImpl = pImpl;

    this.#title = new PIXI.Text(titleString,
      { fontFamily: 'sans-serif', fontSize: 24, align: 'center', fill: 0, wordWrap: true, wordWrapWidth: 500 });
    this.#subTitle = new PIXI.Text(subTitleString,
      { fontFamily: 'sans-serif', fontSize: 18, align: 'center', fill: 0, wordWrap: true, wordWrapWidth: 500 });

    const c = new PIXI.Container();
    pImpl.pixi.stage.addChild(c);

    this.#title.anchor.set(0.5, 0);
    this.#subTitle.anchor.set(0.5, 0);

    c.addChild(this.#title);
    c.addChild(this.#subTitle);

  }

  setBounds(x, y, w, h) {
    const pImpl = this.#pImpl;

    this.#title.position.set(x + w/2 + this.#padding[3], y + this.#padding[0]);
    this.#title.style.wordWrapWidth = w - this.#padding[1] - this.#padding[3];

    this.#subTitle.position.set(
      x + w/2+this.#padding[3],
      this.#title.height + this.#pSpacing
    );
    this.#subTitle.style.wordWrapWidth = this.#title.style.wordWrapWidth;

    this.#bounds = [
      x,y,w,
      this.#title.height + this.#subTitle.height
      + this.#padding[1] + this.#padding[3] + this.#pSpacing
    ];

  }

  getBounds() {
    return this.#bounds.slice();
  }
}