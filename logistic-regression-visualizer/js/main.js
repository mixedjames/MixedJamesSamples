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

const r = new Renderer();

HandleSlider('coefficient0', 'coefficient0-display', (v) => { r.setCoefficient(0, v); });
HandleSlider('coefficient1', 'coefficient1-display', (v) => { r.setCoefficient(1, v); });
HandleSlider('coefficient2', 'coefficient2-display', (v) => { r.setCoefficient(2, v); });
HandleSlider('coefficient3', 'coefficient3-display', (v) => { r.setCoefficient(3, v); });

function HandleSlider(sliderId, displayId, OnValueChanged) {
  const slider = document.getElementById(sliderId);
  const display = document.getElementById(displayId);

  slider.addEventListener('input', (e) => {
    display.innerHTML = slider.valueAsNumber;
    OnValueChanged(slider.valueAsNumber);
  });
}