/**
 * This work is licensed under the Creative Commons
 * Attribution-NonCommercial-ShareAlike 4.0 International License. To view a
 * copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/
 * or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042,
 * USA.
 *
 * Copyright 2019 James Heggie
 */

import Renderer from './renderer.js';
import LoadTextFile from './load-text-file.js';
import * as LogisticRegression from './logistic-regression.js';

LoadTextFile('sample-data/sample-data.txt')
//LoadTextFile('sample-data/sample-data-2.txt')
.then((txt) => {

  const r = new Renderer({
    width: 500, height: 500,
    containerId: 'theContainer',
    xLabel: 'The X Axis',
    yLabel: 'The Y Axis',
    points: JSON.parse(txt),
    xMax: 1, yMax: 1
  });

  let beta = LogisticRegression.BuildModel(
    JSON.parse(txt),
    { features: ['a', 'b'], classification: 'result' }
  );

  if (true) {
    r.setCoefficient(0, 784.6);
    r.setCoefficient(1, -396.1);
    r.setCoefficient(2, -594.0);
  }
  else {
    beta.forEach((b, i) => {
      r.setCoefficient(i, b);
    });
  }

  HandleSlider('coefficient0', 'coefficient0-display', (v) => { r.setCoefficient(0, v); });
  HandleSlider('coefficient1', 'coefficient1-display', (v) => { r.setCoefficient(1, v); });
  HandleSlider('coefficient2', 'coefficient2-display', (v) => { r.setCoefficient(2, v); });
});


function HandleSlider(sliderId, displayId, OnValueChanged) {
  const slider = document.getElementById(sliderId);
  const display = document.getElementById(displayId);

  slider.addEventListener('input', (e) => {
    display.innerHTML = slider.valueAsNumber;
    OnValueChanged(slider.valueAsNumber);
  });
}