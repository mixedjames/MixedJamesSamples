/**
 * This work is licensed under the Creative Commons
 * Attribution-NonCommercial-ShareAlike 4.0 International License. To view a
 * copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/
 * or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042,
 * USA.
 *
 * Copyright 2019 James Heggie
 */

export function BuildModel(originalData, meta) {
  const data = {
    x: ReformData(originalData, meta),
    y: originalData[meta.classification].map((b) => +b)
  };

  let beta = meta.features.map(() => 1);
  beta.push(1);

  const rate = 100;
  let c = 0;
  let dc = 0;

  for (let i = 0; i < 10000; ++ i) {

    c = Cost(data, beta);
    dc = CostDerivatives(data, beta);

    beta = beta.map((b, i) => {
      return b - rate*dc[i];
    });

  }

  return beta;
}

function ReformData(originalData, meta) {
  const result = [];

  const l = originalData[meta.classification].length;
  for (let i = 0; i < l; ++ i) {
    const row = [1];

    for (let j = 0; j < meta.features.length; ++ j) {
      row.push(originalData[meta.features[j]][i]);
    }

    result.push(row);
  }

  return result;
}

function Cost(data, beta) {

  let cost = 0;

  for (let i = 0; i < data.x.length; ++ i) {
    const p = Logistic(data.x[i], beta);
    cost +=
      data.y[i] * Math.log(p)
      + (1 - data.y[i]) * Math.log(1 - p);
  }

  cost /= -data.x.length;
  return cost;
}

function CostDerivatives(data, beta) {

  const result = [];

  for (let f = 0; f < beta.length; ++ f) {

    let dBeta = 0;

    for (let i = 0; i < data.x.length; ++ i) {
      dBeta += (Logistic(data.x[i], beta) - data.y[i]) * data.x[i][f];
    }

    dBeta /= data.x.length;
    //dBeta /= beta.length;
    result.push(dBeta);
  }

  return result;
}

function Logistic(x, beta) {

  let t = 0;

  for (let i = 0; i < x.length; ++i) {
    t += x[i] * beta[i];
  }

  return 1 / (1 + Math.exp(-t));
}