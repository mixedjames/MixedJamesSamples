/**
 * This work is licensed under the Creative Commons
 * Attribution-NonCommercial-ShareAlike 4.0 International License. To view a
 * copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/
 * or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042,
 * USA.
 *
 * Copyright 2019 James Heggie
 */

/**
 * Format of line is:
 *   [A, B, C, D]
 *   A + Bx + Cy + Dz = 0 (note: constant term is at start)
 */
export function ClipLineToSquare(line, xMin, yMin, xMax, yMax) {
    // x = (-by - cz - d) / a
    // y = (-ax - cz - d) / b

    // We rearrange the ordering to fit the geometric tradition
    // rather than the logistic regression one
    const a = line[1];
    const b = line[2];
    const c = line[3];
    const d = line[0];

    const z = 0;

    let x0, x1, y0, y1;

    if (Math.abs(a) < Math.abs(b)) {
      // Shallow line - clip against x limits first
      x0 = xMin;
      y0 = (-a*x0 - c*z - d) / b;
      x1 = xMax;
      y1 = (-a*x1 - c*z - d) / b;

      if (y0 < yMin) {
        y0 = yMin;
        x0 = (-b*y0 - c*z - d) / a;
      }
      else if (y0 > yMax) {
        y0 = yMax;
        x0 = (-b*y0 - c*z - d) / a;
      }

      if (y1 < yMin) {
        y1 = yMin;
        x1 = (-b*y1 - c*z - d) / a;
      }
      else if (y1 > yMax) {
        y1 = yMax;
        x1 = (-b*y1 - c*z - d) / a;
      }

    }
    else {
      // Steep line - clip against y limits first

      y0 = yMin;
      x0 = (-b*y0 - c*z - d) / a;
      y1 = yMax;
      x1 = (-b*y1 - c*z - d) / a;

      if (x0 < xMin) {
        x0 = xMin;
        y0 = (-a*x0 - c*z - d) / b;
      }
      else if (x0 > xMax) {
        x0 = xMax;
        y0 = (-a*x0 - c*z - d) / b;
      }

      if (x1 < xMin) {
        x1 = xMin;
        y1 = (-a*x1 - c*z - d) / b;
      }
      else if (x1 > xMax) {
        x1 = xMax;
        y1 = (-a*x1 - c*z - d) / b;
      }

    }

  return [x0,y0,x1,y1];
}

export function ClipLineToUnitSquare(line) {
    // x = (-by - cz - d) / a
    // y = (-ax - cz - d) / b

    // We rearrange the ordering to fit the geometric tradition
    // rather than the logistic regression one
    const a = line[1];
    const b = line[2];
    const c = line[3];
    const d = line[0];

    const z = 0;

    let x0, x1, y0, y1;

    if (Math.abs(a) < Math.abs(b)) {
      // Shallow line - clip against x limits first

      x0 = 0;
      y0 = (-c*z - d) / b;
      x1 = 1;
      y1 = (-a*x1 - c*z - d) / b;

      if (y0 < 0) {
        y0 = 0;
        x0 = (-b*y0 - c*z - d) / a;
      }
      else if (y0 > 1) {
        y0 = 1;
        x0 = (-b*y0 - c*z - d) / a;
      }

      if (y1 < 0) {
        x1 = (-c*z - d) / a;
        y1 = 0;
      }
      else if (y1 > 1) {
        y1 = 1;
        x1 = (-b*y1 - c*z - d) / a;
      }

    }
    else {
      // Steep line - clip against y limits first

      y0 = 0;
      x0 = (-c*z - d) / a;
      y1 = 1;
      x1 = (-b*y1 - c*z - d) / a;

      if (x0 < 0) {
        x0 = 0;
        y0 = (-a*x0 - c*z - d) / b;
      }
      else if (x0 > 1) {
        x0 = 1;
        y0 = (-a*x0 - c*z - d) / b;
      }

      if (x1 < 0) {
        x1 = 0;
        y1 = (-a*x1 - c*z - d) / b;
      }
      else if (x1 > 1) {
        x1 = 1;
        y1 = (-a*x1 - c*z - d) / b;
      }

    }

  return [x0,y0,x1,y1];
}

export function NextPowerOf2(n) {
  n --;
  n |= n >> 1;
  n |= n >> 2;
  n |= n >> 4;
  n |= n >> 8;
  n |= n >> 16;
  n ++;
  return n;
}
