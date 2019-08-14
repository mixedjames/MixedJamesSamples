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
import {LRFieldLayer} from './lr-field-layer.js';
import {LineSegmentLayer} from './line-segment-layer.js';
import {ScatterPlotLayer} from './scatter-plot-layer.js';
import * as LogisticRegression from './logistic-regression.js';
import LoadTextFile from './utils/load-text-file.js';

const lrField = new LRFieldLayer();
const line = new LineSegmentLayer();

const plot = new mjg.Plot({
  canvas: 'theCanvas',
  layers: [lrField, line]
});

HandleSlider('coefficient0', 'coefficient0-display', (v) => { setCoefficient(0, v); });
HandleSlider('coefficient1', 'coefficient1-display', (v) => { setCoefficient(1, v); });
HandleSlider('coefficient2', 'coefficient2-display', (v) => { setCoefficient(2, v); });

LoadTextFile('sample-data/sample-data.txt').then((jsonText) => {

  const data = JSON.parse(jsonText);

  const survivors = { x: [], y: [] };
  const nonSurvivors = { x: [], y: [] };

  for (let i = 0, l = data.result.length; i < l; ++ i) {
    if (data.result[i] === true) {
      survivors.x.push(data.a[i]);
      survivors.y.push(data.b[i]);
    }
    else {
      nonSurvivors.x.push(data.a[i]);
      nonSurvivors.y.push(data.b[i]);
    }
  }

  const lrModel = LogisticRegression.BuildModel(
    data,
    { features: ['a', 'b'], classification: 'result' }
  );

  lrModel.forEach((c,i) => { setCoefficient(i, c); });

  plot.addLayer(new ScatterPlotLayer({
    series: [
      { name: 'Survivors', x: survivors.x, y: survivors.y },
      { name: 'Non-survivors', x: nonSurvivors.x, y: nonSurvivors.y }
    ]
  }));

});

function setCoefficient(index, value) {
  lrField.setCoefficient(index, value);
  line.setCoefficient(index, value);
}

function HandleSlider(sliderId, displayId, OnValueChanged) {
  const slider = document.getElementById(sliderId);
  const display = document.getElementById(displayId);

  slider.addEventListener('input', (e) => {
    display.innerHTML = slider.valueAsNumber;
    OnValueChanged(slider.valueAsNumber);
  });
}