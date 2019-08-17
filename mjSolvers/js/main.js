import * as mjs from './mjSolvers/mjSolvers.js';
import LoadTextFile from './load-text-file.js';

LoadTextFile('data/linear-with-gaussian-noise.json').then(jsonText => {

  const data = JSON.parse(jsonText);

  {
    console.log('Closed-form linear regression solver:');
    const [b, m] = LinearRegressionClosedForm(data);
    console.log('b =', b.toFixed(4), 'm =', m.toFixed(4));
  }

  {
    console.log('Gradient descent linear regression solver:');
    const [b, m] = LinearRegressionGradientDescent(data);
    console.log('b =', b.toFixed(4), 'm =', m.toFixed(4));
  }

});

function LinearRegressionGradientDescent(data) {

  function Dm(b0, b1) {
    let sum = 0;

    data.forEach(d => {
      const yHat = b0 + d[0]*b1;
      sum += d[0]*(d[1] - yHat);
    });

    return -2 * sum / data.length;
  }

  function Dc(b0, b1) {
    let sum = 0;

    data.forEach(d => {
      const yHat = b0 + d[0]*b1;
      sum += (d[1] - yHat);
    });

    return -2 * sum / data.length;
  }

  let b0 = 0;
  let b1 = 0;

  const learningRate = 0.01;

  for (let i = 0; i < 2000; ++ i) {
    const new_b0 = b0 - learningRate * Dc(b0,b1);
    const new_b1 = b1 - learningRate * Dm(b0,b1);

    b0 = new_b0;
    b1 = new_b1;
  }

  return [b0, b1];
}

function LinearRegressionClosedForm(data) {
  let N = data.length;
  let sX = 0;
  let sY = 0;
  let sXY = 0;
  let sXX = 0;

  data.forEach(d => {

    sX += d[0];
    sY += d[1];
    sXY += d[0] * d[1];
    sXX += d[0] * d[0];

  });


  const m = (N*sXY - sX*sY) / (N*sXX - sX*sX);
  const b = (sY - m*sX) / N;

  return [b, m];
}