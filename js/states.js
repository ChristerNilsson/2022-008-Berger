// Generated by CoffeeScript 2.5.1
var bergerSVG, common, dx, getLocalCoords, saveData, svggrid, svgline, svgtext, w, x;

import {
  globals,
  invert
} from './globals.js';

import {
  CRounded,
  CDead
} from './controls.js';

// import saveAs from './file-saver.js'
export var ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'; // spelare

// halvborden heter 1..52. Jämn är vit, udda är svart
export var grid = function(xoff, dx, nx, yoff, dy, ny) {
  var i, k, l, len, len1, ref, ref1, results;
  ref = range(ny + 1);
  for (k = 0, len = ref.length; k < len; k++) {
    i = ref[k];
    line(xoff, yoff + dy * i, xoff + nx * dx, yoff + dy * i);
  }
  ref1 = range(nx + 1);
  results = [];
  for (l = 0, len1 = ref1.length; l < len1; l++) {
    i = ref1[l];
    results.push(line(xoff + dx * i, yoff, xoff + dx * i, yoff + ny * dy));
  }
  return results;
};

export var markeraRond = function(rond, xoff, dx, yoff, dy, N) {
  push();
  fill('lightgray');
  noStroke();
  rectMode(CORNER);
  rect(xoff + dx * rond, yoff, dx, N * dy);
  return pop();
};

saveData = function() {
  var a;
  a = document.createElement("a");
  //document.body.appendChild a # Skapar många downloads
  a.style = "display: none";
  return (data, fileName) => {
    var blob, url;
    blob = new Blob([data], {
      type: "octet/stream"
    });
    url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    return window.URL.revokeObjectURL(url);
  };
};

svgline = function(x1, y1, x2, y2) {
  return `<line x1=\"${x1}\" y1=\"${y1}\" x2=\"${x2}\" y2=\"${y2}\" stroke=\"black\"/>`;
};

svgtext = function(text, x, y, ta = 'middle', ts = 2) {
  return `<text font-size=\"${ts}em\" text-anchor=\"${ta}\" x=\"${x}\" y=\"${y}\">${text}</text>`;
};

svggrid = function(headers, ws, digits, n, dx, dy) {
  var anchor, big, digit, dist, i, j, k, l, len, len1, len2, len3, len4, len5, m, medium, o, q, r, ref, ref1, ref2, ref3, ref4, res, row, small, totalWidth, ts, w, x0, y, y0;
  totalWidth = 0;
  for (k = 0, len = ws.length; k < len; k++) {
    w = ws[k];
    totalWidth += w;
  }
  headers = headers.split(' ');
  res = [];
  x0 = 0;
  y = dy;
  big = dx / 30;
  medium = 0.75 * dx / 30;
  small = 0.50 * dx / 30;
  ref = range(headers.length);
  for (l = 0, len1 = ref.length; l < len1; l++) {
    i = ref[l];
    res.push(svgline(x0, y - dy, x0, y + dy * n));
    res.push(svgtext(headers[i], x0 + ws[i] / 2, 0.75 * dy, 'middle', big));
    x0 += ws[i];
  }
  res.push(svgline(x0, y - dy, x0, y + dy * n));
  ref1 = range(-1, n + 1);
  for (m = 0, len2 = ref1.length; m < len2; m++) {
    i = ref1[m];
    res.push(svgline(0, y + dy * i, x0, y + dy * i));
  }
  ref2 = range(n);
  for (o = 0, len3 = ref2.length; o < len3; o++) {
    i = ref2[o];
    res.push(svgtext(i + 1, 0.5 * dx, y + dy * i + dy * 0.7, 'middle', big));
  }
  ref3 = range(digits.length);
  for (q = 0, len4 = ref3.length; q < len4; q++) {
    i = ref3[q];
    row = digits[i];
    x0 = ws[0] + ws[1] + dx * i + 0.5 * dx;
    ref4 = range(row.length);
    for (r = 0, len5 = ref4.length; r < len5; r++) {
      j = ref4[r];
      y0 = y + dy * j + 0.28 * dy;
      digit = row[j];
      if (digit < 0) {
        anchor = 'start';
        digit = -digit;
        dist = -dx * 0.45;
      } else {
        anchor = 'end';
        dist = dx * 0.45;
      }
      res.push(svgtext(digit, x0 + dist, y0, anchor, ts = small));
    }
  }
  res.push(svgtext('Berger - Round Robin', 0, dy * (n + 1.4), 'start', small));
  res.push(svgtext('Observera att placeringarna utgörs av BORDSNUMMER', totalWidth / 2, dy * (n + 1.4), 'middle', small));
  res.push(svgtext('Courtesy of Wasa SK', totalWidth, dy * (n + 1.4), 'end', small));
  return res.join("\n");
};

bergerSVG = function(w, h) {
  var antalRonder, antalSpelare, dx, dy, i, j, k, l, len, len1, len2, m, p, ref, ref1, ref2, res, spelare, tables, white, ws;
  tables = [];
  antalSpelare = globals.ronder[0].length; // antal spelare, alltid jämnt
  antalRonder = antalSpelare - 1;
  console.log(antalSpelare, antalRonder);
  ref = range(antalRonder);
  for (k = 0, len = ref.length; k < len; k++) {
    i = ref[k];
    spelare = invert(globals.ronder[i]);
    ref1 = range(antalSpelare);
    for (l = 0, len1 = ref1.length; l < len1; l++) {
      j = ref1[l];
      p = spelare[j];
      white = p % 2 === 0;
      if (p >= antalSpelare / 2) {
        p = antalRonder - p;
      }
      if (white) {
        p = p + 1;
      } else {
        p = -p - 1;
      }
      spelare[j] = p;
    }
    tables.push(spelare);
  }
  res = 'Nr Namn';
  dx = 1000 / globals.N;
  if (dx > 50) {
    dx = 50;
  }
  dy = 0.8 * dx; //800/globals.N
  ws = [dx, 200];
  ref2 = range(globals.N - 1);
  for (m = 0, len2 = ref2.length; m < len2; m++) {
    i = ref2[m];
    res += ` ${i + 1}`;
    ws.push(dx);
  }
  res += ' Poäng Plats';
  ws.push(dx + dx);
  ws.push(dx + dx);
  res = svggrid(res, ws, tables, globals.N, dx, dy);
  return `<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='${1600}' height='${1200}' >` + res + '</svg>';
};

getLocalCoords = function() {
  var matrix, pd;
  matrix = drawingContext.getTransform();
  pd = pixelDensity();
  return matrix.inverse().transformPoint(new DOMPoint(mouseX * pd, mouseY * pd));
};

export var setState = function(key) {
  globals.currState = globals.states[key];
  common.A.disabled = key === 'SA';
  common.B.disabled = key === 'SB';
  common.C.disabled = key === 'SC';
  common.D.disabled = key === 'SD';
  common.E.disabled = key === 'SE';
  common.F.disabled = key === 'SF';
  return common.G.disabled = key === 'SG';
};

//common.H.disabled = key == 'SH'
export var setRond = function(delta) {
  globals.rond += delta;
  common.R0.visible = globals.rond > 0;
  common.R2.visible = globals.rond < globals.N - 2;
  return common.R1.text = `Rond:\n${globals.rond + 1}`;
};

export var setN = function(delta) {
  var N, k, key, len, players, ref, results, rond, state;
  globals.N += delta;
  globals.rond = 0;
  setRond(0);
  common.X0.visible = globals.N > 4;
  common.X2.visible = globals.N < ALPHABET.length;
  common.X1.text = `Spelare:\n${globals.N}`;
  N = globals.N;
  globals.ronder = [];
  ref = range(N - 1);
  for (k = 0, len = ref.length; k < len; k++) {
    rond = ref[k];
    players = range(N - 1);
    players = players.slice(N - 1 - rond).concat(players.slice(0, N - 1 - rond));
    players.push(N - 1);
    if (rond % 2 === 1) {
      [players[0], players[N - 1]] = [players[N - 1], players[0]];
    }
    globals.ronder.push(players);
  }
  results = [];
  for (key in globals.states) {
    state = globals.states[key];
    results.push(state.setN());
  }
  return results;
};

common = {};

x = 6.25;

dx = 100 / 8;

w = 100 / 8.5;

common.A = new CRounded(x + 0 * dx, 3, w, 5, 'Halvbord', () => {
  return setState('SA');
});

common.B = new CRounded(x + 1 * dx, 3, w, 5, 'Bord', () => {
  return setState('SB');
});

common.C = new CRounded(x + 2 * dx, 3, w, 5, "Cirkel", () => {
  return setState('SC');
});

common.D = new CRounded(x + 3 * dx, 3, w, 5, "Rotation", () => {
  return setState('SD');
});

common.E = new CRounded(x + 4 * dx, 3, w, 5, "Berger\nSpelare", () => {
  return setState('SE');
});

common.F = new CRounded(x + 5 * dx, 3, w, 5, 'Berger\nHalvbord', () => {
  return setState('SF');
});

common.G = new CRounded(x + 6 * dx, 3, w, 5, 'Berger\nBord', () => {
  return setState('SG');
});

common.H = new CRounded(x + 7 * dx, 3, w, 5, 'Berger\nDownload', () => {
  var data, fileName;
  data = bergerSVG(width, height);
  fileName = `${globals.N}.svg`;
  return saveData()(data, fileName);
});

//common.XSpelare = new CDead 25, 93.5,'Spelare:'
common.X0 = new CRounded(9 - 0.5, 97, 15, 5, '-2', () => {
  return setN(-2);
});

common.X1 = new CRounded(25 - 0.5, 97, 15, 5, 4);

common.X2 = new CRounded(41 - 0.5, 97, 15, 5, '+2', () => {
  return setN(+2);
});

common.X1.disabled = true;

//common.XRond = new CDead 75, 93.5,'Rond:'
common.R0 = new CRounded(59 + 0.5, 97, 15, 5, '-1', () => {
  return setRond(-1);
});

common.R1 = new CRounded(75 + 0.5, 97, 15, 5, 0);

common.R2 = new CRounded(91 + 0.5, 97, 15, 5, '+1', () => {
  return setRond(+1);
});

common.R1.disabled = true;

export var State = class State {
  constructor(name) {
    this.name = name;
    this.controls = common;
    this.setN();
  }

  drawControls() {
    var key, results;
    results = [];
    for (key in this.controls) {
      results.push(this.controls[key].draw());
    }
    return results;
  }

  mouseClicked() {
    var control, key, results, y;
    ({x, y} = getLocalCoords());
    results = [];
    for (key in this.controls) {
      control = this.controls[key];
      if (control.visible && !control.disabled && control.inside(x, y)) {
        if (control.click) {
          control.click();
        }
        break;
      } else {
        results.push(void 0);
      }
    }
    return results;
  }

};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGVzLmpzIiwic291cmNlUm9vdCI6Ii4uIiwic291cmNlcyI6WyJjb2ZmZWVcXHN0YXRlcy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUEsU0FBQSxFQUFBLE1BQUEsRUFBQSxFQUFBLEVBQUEsY0FBQSxFQUFBLFFBQUEsRUFBQSxPQUFBLEVBQUEsT0FBQSxFQUFBLE9BQUEsRUFBQSxDQUFBLEVBQUE7O0FBQUEsT0FBQTtFQUFRLE9BQVI7RUFBZ0IsTUFBaEI7Q0FBQSxNQUFBOztBQUNBLE9BQUE7RUFBUSxRQUFSO0VBQWlCLEtBQWpCO0NBQUEsTUFBQSxnQkFEQTs7O0FBSUEsT0FBQSxJQUFPLFFBQUEsR0FBVyx1REFKbEI7OztBQU9BLE9BQUEsSUFBTyxJQUFBLEdBQU8sUUFBQSxDQUFDLElBQUQsRUFBTSxFQUFOLEVBQVMsRUFBVCxFQUFhLElBQWIsRUFBa0IsRUFBbEIsRUFBcUIsRUFBckIsQ0FBQTtBQUNkLE1BQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBLElBQUEsRUFBQSxHQUFBLEVBQUEsSUFBQSxFQUFBO0FBQUM7RUFBQSxLQUFBLHFDQUFBOztJQUFBLElBQUEsQ0FBSyxJQUFMLEVBQWdCLElBQUEsR0FBSyxFQUFBLEdBQUcsQ0FBeEIsRUFBMkIsSUFBQSxHQUFLLEVBQUEsR0FBRyxFQUFuQyxFQUF1QyxJQUFBLEdBQUssRUFBQSxHQUFHLENBQS9DO0VBQUE7QUFDQTtBQUFBO0VBQUEsS0FBQSx3Q0FBQTs7aUJBQUEsSUFBQSxDQUFLLElBQUEsR0FBSyxFQUFBLEdBQUcsQ0FBYixFQUFnQixJQUFoQixFQUEyQixJQUFBLEdBQUssRUFBQSxHQUFHLENBQW5DLEVBQXVDLElBQUEsR0FBSyxFQUFBLEdBQUcsRUFBL0M7RUFBQSxDQUFBOztBQUZhOztBQUlkLE9BQUEsSUFBTyxXQUFBLEdBQWMsUUFBQSxDQUFDLElBQUQsRUFBTSxJQUFOLEVBQVcsRUFBWCxFQUFjLElBQWQsRUFBbUIsRUFB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LEVBQXRCOztBQUNBLGNBRkQ7T0FBQSxNQUFBOzZCQUFBOztJQUZELENBQUE7O0VBRmM7O0FBUFQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2dsb2JhbHMsaW52ZXJ0fSBmcm9tICcuL2dsb2JhbHMuanMnXHJcbmltcG9ydCB7Q1JvdW5kZWQsQ0RlYWR9IGZyb20gJy4vY29udHJvbHMuanMnXHJcbiMgaW1wb3J0IHNhdmVBcyBmcm9tICcuL2ZpbGUtc2F2ZXIuanMnXHJcblxyXG5leHBvcnQgQUxQSEFCRVQgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5eicgIyBzcGVsYXJlXHJcbiMgaGFsdmJvcmRlbiBoZXRlciAxLi41Mi4gSsOkbW4gw6RyIHZpdCwgdWRkYSDDpHIgc3ZhcnRcclxuXHJcbmV4cG9ydCBncmlkID0gKHhvZmYsZHgsbngsIHlvZmYsZHksbnkpIC0+XHJcblx0bGluZSB4b2ZmLCAgICAgIHlvZmYrZHkqaSwgeG9mZitueCpkeCwgeW9mZitkeSppICBmb3IgaSBpbiByYW5nZSBueSsxXHJcblx0bGluZSB4b2ZmK2R4KmksIHlvZmYsICAgICAgeG9mZitkeCppLCAgeW9mZitueSpkeSBmb3IgaSBpbiByYW5nZSBueCsxXHJcblxyXG5leHBvcnQgbWFya2VyYVJvbmQgPSAocm9uZCx4b2ZmLGR4LHlvZmYsZHksTikgLT5cclxuXHRwdXNoKClcclxuXHRmaWxsICdsaWdodGdyYXknXHJcblx0bm9TdHJva2UoKVxyXG5cdHJlY3RNb2RlIENPUk5FUlxyXG5cdHJlY3QgeG9mZitkeCpyb25kLHlvZmYsZHgsTipkeVxyXG5cdHBvcCgpXHJcblxyXG5zYXZlRGF0YSA9IC0+XHJcblx0YSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgXCJhXCJcclxuXHQjZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCBhICMgU2thcGFyIG3DpW5nYSBkb3dubG9hZHNcclxuXHRhLnN0eWxlID0gXCJkaXNwbGF5OiBub25lXCJcclxuXHRyZXR1cm4gKGRhdGEsIGZpbGVOYW1lKSA9PlxyXG5cdFx0YmxvYiA9IG5ldyBCbG9iIFtkYXRhXSwge3R5cGU6IFwib2N0ZXQvc3RyZWFtXCJ9XHJcblx0XHR1cmwgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTCBibG9iXHJcblx0XHRhLmhyZWYgPSB1cmxcclxuXHRcdGEuZG93bmxvYWQgPSBmaWxlTmFtZVxyXG5cdFx0YS5jbGljaygpXHJcblx0XHR3aW5kb3cuVVJMLnJldm9rZU9iamVjdFVSTCB1cmxcclxuXHJcbnN2Z2xpbmUgPSAoeDEseTEseDIseTIpIC0+IFwiPGxpbmUgeDE9XFxcIiN7eDF9XFxcIiB5MT1cXFwiI3t5MX1cXFwiIHgyPVxcXCIje3gyfVxcXCIgeTI9XFxcIiN7eTJ9XFxcIiBzdHJva2U9XFxcImJsYWNrXFxcIi8+XCJcclxuc3ZndGV4dCA9ICh0ZXh0LHgseSx0YT0nbWlkZGxlJyx0cz0yKSAtPiBcIjx0ZXh0IGZvbnQtc2l6ZT1cXFwiI3t0c31lbVxcXCIgdGV4dC1hbmNob3I9XFxcIiN7dGF9XFxcIiB4PVxcXCIje3h9XFxcIiB5PVxcXCIje3l9XFxcIj4je3RleHR9PC90ZXh0PlwiXHJcbnN2Z2dyaWQgPSAoaGVhZGVycyx3cyxkaWdpdHMsbixkeCxkeSkgLT5cclxuXHR0b3RhbFdpZHRoID0gMFxyXG5cdHRvdGFsV2lkdGggKz0gdyBmb3IgdyBpbiB3c1xyXG5cdGhlYWRlcnMgPSBoZWFkZXJzLnNwbGl0ICcgJ1xyXG5cdHJlcyA9IFtdXHJcblx0eDAgPSAwXHJcblx0eSA9IGR5XHJcblx0YmlnICAgPSBkeC8zMFxyXG5cdG1lZGl1bSA9IDAuNzUqZHgvMzBcclxuXHRzbWFsbCA9IDAuNTAqZHgvMzBcclxuXHRmb3IgaSBpbiByYW5nZSBoZWFkZXJzLmxlbmd0aFxyXG5cdFx0cmVzLnB1c2ggc3ZnbGluZSB4MCx5LWR5LHgwLHkrZHkqblxyXG5cdFx0cmVzLnB1c2ggc3ZndGV4dCBoZWFkZXJzW2ldLHgwK3dzW2ldLzIsMC43NSpkeSwnbWlkZGxlJyxiaWdcclxuXHRcdHgwICs9IHdzW2ldXHJcblx0cmVzLnB1c2ggc3ZnbGluZSB4MCx5LWR5LHgwLHkrZHkqblxyXG5cclxuXHRmb3IgaSBpbiByYW5nZSAtMSxuKzFcclxuXHRcdHJlcy5wdXNoIHN2Z2xpbmUgMCx5K2R5KmkseDAseStkeSppXHJcblx0Zm9yIGkgaW4gcmFuZ2UgblxyXG5cdFx0cmVzLnB1c2ggc3ZndGV4dCBpKzEsMC41KmR4LHkrZHkqaStkeSowLjcsJ21pZGRsZScsYmlnXHJcblxyXG5cdGZvciBpIGluIHJhbmdlIGRpZ2l0cy5sZW5ndGhcclxuXHRcdHJvdyA9IGRpZ2l0c1tpXVxyXG5cdFx0eDAgPSB3c1swXSArIHdzWzFdICsgZHgqaSArIDAuNSpkeFxyXG5cdFx0Zm9yIGogaW4gcmFuZ2Ugcm93Lmxlbmd0aFxyXG5cdFx0XHR5MCA9IHkgKyBkeSpqICsgMC4yOCpkeVxyXG5cdFx0XHRkaWdpdCA9IHJvd1tqXVxyXG5cdFx0XHRpZiBkaWdpdCA8IDBcclxuXHRcdFx0XHRhbmNob3IgPSAnc3RhcnQnXHJcblx0XHRcdFx0ZGlnaXQgPSAtZGlnaXRcclxuXHRcdFx0XHRkaXN0ID0gLWR4KjAuNDVcclxuXHRcdFx0ZWxzZSBcclxuXHRcdFx0XHRhbmNob3IgPSAnZW5kJ1xyXG5cdFx0XHRcdGRpc3QgPSBkeCowLjQ1XHJcblx0XHRcdHJlcy5wdXNoIHN2Z3RleHQgZGlnaXQseDArZGlzdCx5MCxhbmNob3IsdHM9c21hbGxcclxuXHRyZXMucHVzaCBzdmd0ZXh0ICdCZXJnZXIgLSBSb3VuZCBSb2JpbicsMCxkeSoobisxLjQpLCdzdGFydCcsc21hbGxcclxuXHRyZXMucHVzaCBzdmd0ZXh0ICdPYnNlcnZlcmEgYXR0IHBsYWNlcmluZ2FybmEgdXRnw7ZycyBhdiBCT1JEU05VTU1FUicsdG90YWxXaWR0aC8yLGR5KihuKzEuNCksJ21pZGRsZScsc21hbGxcclxuXHRyZXMucHVzaCBzdmd0ZXh0ICdDb3VydGVzeSBvZiBXYXNhIFNLJyx0b3RhbFdpZHRoLGR5KihuKzEuNCksJ2VuZCcsc21hbGxcclxuXHRyZXMuam9pbiBcIlxcblwiXHJcblxyXG5iZXJnZXJTVkcgPSAodyxoKSAtPlxyXG5cdHRhYmxlcyA9IFtdXHJcblx0YW50YWxTcGVsYXJlID0gZ2xvYmFscy5yb25kZXJbMF0ubGVuZ3RoICMgYW50YWwgc3BlbGFyZSwgYWxsdGlkIGrDpG1udFxyXG5cdGFudGFsUm9uZGVyID0gYW50YWxTcGVsYXJlIC0gMVxyXG5cdGNvbnNvbGUubG9nIGFudGFsU3BlbGFyZSwgYW50YWxSb25kZXJcclxuXHRmb3IgaSBpbiByYW5nZSBhbnRhbFJvbmRlclxyXG5cdFx0c3BlbGFyZSA9IGludmVydCBnbG9iYWxzLnJvbmRlcltpXVxyXG5cdFx0Zm9yIGogaW4gcmFuZ2UgYW50YWxTcGVsYXJlXHJcblx0XHRcdHAgPSBzcGVsYXJlW2pdXHJcblx0XHRcdHdoaXRlID0gcCAlIDIgPT0gMFxyXG5cdFx0XHRpZiBwID49IGFudGFsU3BlbGFyZS8yIHRoZW4gcCA9IGFudGFsUm9uZGVyLXBcclxuXHRcdFx0aWYgd2hpdGUgdGhlbiBwID0gcCsxIGVsc2UgcD0tcC0xXHJcblx0XHRcdHNwZWxhcmVbal0gPSBwXHJcblx0XHR0YWJsZXMucHVzaCBzcGVsYXJlXHJcblxyXG5cdHJlcyA9ICdOciBOYW1uJ1xyXG5cdGR4ID0gMTAwMC9nbG9iYWxzLk5cclxuXHRpZiBkeD41MCB0aGVuIGR4PTUwXHJcblx0ZHkgPSAwLjggKiBkeCAjODAwL2dsb2JhbHMuTlxyXG5cdHdzID0gW2R4LDIwMF1cclxuXHRmb3IgaSBpbiByYW5nZSBnbG9iYWxzLk4tMVxyXG5cdFx0cmVzICs9IFwiICN7aSsxfVwiXHJcblx0XHR3cy5wdXNoIGR4XHJcblx0cmVzICs9ICcgUG/DpG5nIFBsYXRzJ1xyXG5cdHdzLnB1c2ggZHgrZHhcclxuXHR3cy5wdXNoIGR4K2R4XHJcblx0cmVzID0gc3ZnZ3JpZCByZXMsd3MsdGFibGVzLGdsb2JhbHMuTixkeCxkeVxyXG5cdFwiPHN2ZyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnIHdpZHRoPScjezE2MDB9JyBoZWlnaHQ9JyN7MTIwMH0nID5cIiArIHJlcyArICc8L3N2Zz4nXHJcblxyXG5nZXRMb2NhbENvb3JkcyA9IC0+XHJcblx0bWF0cml4ID0gZHJhd2luZ0NvbnRleHQuZ2V0VHJhbnNmb3JtKClcclxuXHRwZCA9IHBpeGVsRGVuc2l0eSgpXHJcblx0bWF0cml4LmludmVyc2UoKS50cmFuc2Zvcm1Qb2ludCBuZXcgRE9NUG9pbnQgbW91c2VYICogcGQsbW91c2VZICogcGRcclxuXHJcbmV4cG9ydCBzZXRTdGF0ZSA9IChrZXkpIC0+XHJcblx0Z2xvYmFscy5jdXJyU3RhdGUgPSBnbG9iYWxzLnN0YXRlc1trZXldXHJcblx0Y29tbW9uLkEuZGlzYWJsZWQgPSBrZXkgPT0gJ1NBJ1xyXG5cdGNvbW1vbi5CLmRpc2FibGVkID0ga2V5ID09ICdTQidcclxuXHRjb21tb24uQy5kaXNhYmxlZCA9IGtleSA9PSAnU0MnXHJcblx0Y29tbW9uLkQuZGlzYWJsZWQgPSBrZXkgPT0gJ1NEJ1xyXG5cdGNvbW1vbi5FLmRpc2FibGVkID0ga2V5ID09ICdTRSdcclxuXHRjb21tb24uRi5kaXNhYmxlZCA9IGtleSA9PSAnU0YnXHJcblx0Y29tbW9uLkcuZGlzYWJsZWQgPSBrZXkgPT0gJ1NHJ1xyXG5cdCNjb21tb24uSC5kaXNhYmxlZCA9IGtleSA9PSAnU0gnXHJcblxyXG5leHBvcnQgc2V0Um9uZCA9IChkZWx0YSkgLT5cclxuXHRnbG9iYWxzLnJvbmQgKz0gZGVsdGFcclxuXHRjb21tb24uUjAudmlzaWJsZSA9IGdsb2JhbHMucm9uZCA+IDBcclxuXHRjb21tb24uUjIudmlzaWJsZSA9IGdsb2JhbHMucm9uZCA8IGdsb2JhbHMuTi0yXHJcblx0Y29tbW9uLlIxLnRleHQgPSBcIlJvbmQ6XFxuI3tnbG9iYWxzLnJvbmQgKyAxfVwiXHJcblxyXG5leHBvcnQgc2V0TiA9IChkZWx0YSkgLT5cclxuXHRnbG9iYWxzLk4gKz0gZGVsdGFcclxuXHRnbG9iYWxzLnJvbmQgPSAwXHJcblx0c2V0Um9uZCAwXHJcblx0Y29tbW9uLlgwLnZpc2libGUgPSBnbG9iYWxzLk4gPiA0XHJcblx0Y29tbW9uLlgyLnZpc2libGUgPSBnbG9iYWxzLk4gPCBBTFBIQUJFVC5sZW5ndGhcclxuXHRjb21tb24uWDEudGV4dCA9IFwiU3BlbGFyZTpcXG4je2dsb2JhbHMuTn1cIlxyXG5cclxuXHROID0gZ2xvYmFscy5OXHJcblx0Z2xvYmFscy5yb25kZXIgPSBbXVxyXG5cdGZvciByb25kIGluIHJhbmdlIE4tMVxyXG5cdFx0cGxheWVycyA9IHJhbmdlIE4tMVxyXG5cdFx0cGxheWVycyA9IHBsYXllcnMuc2xpY2UoTi0xLXJvbmQpLmNvbmNhdCBwbGF5ZXJzLnNsaWNlKDAsTi0xLXJvbmQpXHJcblx0XHRwbGF5ZXJzLnB1c2ggTi0xXHJcblx0XHRpZiByb25kJTI9PTEgdGhlbiBbcGxheWVyc1swXSxwbGF5ZXJzW04tMV1dID0gW3BsYXllcnNbTi0xXSxwbGF5ZXJzWzBdXVxyXG5cdFx0Z2xvYmFscy5yb25kZXIucHVzaCBwbGF5ZXJzXHJcblx0Zm9yIGtleSBvZiBnbG9iYWxzLnN0YXRlc1xyXG5cdFx0c3RhdGUgPSBnbG9iYWxzLnN0YXRlc1trZXldXHJcblx0XHRzdGF0ZS5zZXROKClcclxuXHJcbmNvbW1vbiA9IHt9XHJcbnggPSA2LjI1XHJcbmR4ID0gMTAwLzhcclxudyA9IDEwMC84LjVcclxuY29tbW9uLkEgID0gbmV3IENSb3VuZGVkIHgrMCpkeCwgMywgdywgNSwgJ0hhbHZib3JkJywgICAgICAgICA9PiBzZXRTdGF0ZSAnU0EnXHJcbmNvbW1vbi5CICA9IG5ldyBDUm91bmRlZCB4KzEqZHgsIDMsIHcsIDUsICdCb3JkJywgICAgICAgICAgICAgPT4gc2V0U3RhdGUgJ1NCJ1xyXG5jb21tb24uQyAgPSBuZXcgQ1JvdW5kZWQgeCsyKmR4LCAzLCB3LCA1LCBcIkNpcmtlbFwiLCAgICAgICAgICAgPT4gc2V0U3RhdGUgJ1NDJ1xyXG5jb21tb24uRCAgPSBuZXcgQ1JvdW5kZWQgeCszKmR4LCAzLCB3LCA1LCBcIlJvdGF0aW9uXCIsICAgICAgICAgPT4gc2V0U3RhdGUgJ1NEJ1xyXG5jb21tb24uRSAgPSBuZXcgQ1JvdW5kZWQgeCs0KmR4LCAzLCB3LCA1LCBcIkJlcmdlclxcblNwZWxhcmVcIiwgID0+IHNldFN0YXRlICdTRSdcclxuY29tbW9uLkYgID0gbmV3IENSb3VuZGVkIHgrNSpkeCwgMywgdywgNSwgJ0JlcmdlclxcbkhhbHZib3JkJywgPT4gc2V0U3RhdGUgJ1NGJ1xyXG5jb21tb24uRyAgPSBuZXcgQ1JvdW5kZWQgeCs2KmR4LCAzLCB3LCA1LCAnQmVyZ2VyXFxuQm9yZCcsICAgICA9PiBzZXRTdGF0ZSAnU0cnXHJcbmNvbW1vbi5IICA9IG5ldyBDUm91bmRlZCB4KzcqZHgsIDMsIHcsIDUsICdCZXJnZXJcXG5Eb3dubG9hZCcsID0+XHJcblx0ZGF0YSA9IGJlcmdlclNWRyB3aWR0aCxoZWlnaHRcclxuXHRmaWxlTmFtZSA9IFwiI3tnbG9iYWxzLk59LnN2Z1wiXHJcblx0c2F2ZURhdGEoKSBkYXRhLCBmaWxlTmFtZVxyXG5cclxuI2NvbW1vbi5YU3BlbGFyZSA9IG5ldyBDRGVhZCAyNSwgOTMuNSwnU3BlbGFyZTonXHJcbmNvbW1vbi5YMCA9IG5ldyBDUm91bmRlZCAgOS0wLjUsIDk3LCAxNSwgNSwgJy0yJywgPT4gc2V0TiAtMlxyXG5jb21tb24uWDEgPSBuZXcgQ1JvdW5kZWQgMjUtMC41LCA5NywgMTUsIDUsIDRcclxuY29tbW9uLlgyID0gbmV3IENSb3VuZGVkIDQxLTAuNSwgOTcsIDE1LCA1LCAnKzInLCA9PiBzZXROICsyXHJcbmNvbW1vbi5YMS5kaXNhYmxlZCA9IHRydWVcclxuXHJcbiNjb21tb24uWFJvbmQgPSBuZXcgQ0RlYWQgNzUsIDkzLjUsJ1JvbmQ6J1xyXG5jb21tb24uUjAgPSBuZXcgQ1JvdW5kZWQgNTkrMC41LCA5NywgMTUsIDUsICctMScsID0+IHNldFJvbmQgLTFcclxuY29tbW9uLlIxID0gbmV3IENSb3VuZGVkIDc1KzAuNSwgOTcsIDE1LCA1LCAwXHJcbmNvbW1vbi5SMiA9IG5ldyBDUm91bmRlZCA5MSswLjUsIDk3LCAxNSwgNSwgJysxJywgPT4gc2V0Um9uZCArMVxyXG5jb21tb24uUjEuZGlzYWJsZWQgPSB0cnVlXHJcblxyXG5leHBvcnQgY2xhc3MgU3RhdGVcclxuXHRjb25zdHJ1Y3RvciA6IChAbmFtZSkgLT5cclxuXHRcdEBjb250cm9scyA9IGNvbW1vblxyXG5cdFx0QHNldE4oKVxyXG5cclxuXHRkcmF3Q29udHJvbHMgOiAtPiBAY29udHJvbHNba2V5XS5kcmF3KCkgZm9yIGtleSBvZiBAY29udHJvbHNcclxuXHJcblx0bW91c2VDbGlja2VkIDogLT5cclxuXHRcdHt4LHl9ID0gZ2V0TG9jYWxDb29yZHMoKVxyXG5cdFx0Zm9yIGtleSBvZiBAY29udHJvbHNcclxuXHRcdFx0Y29udHJvbCA9IEBjb250cm9sc1trZXldXHJcblx0XHRcdGlmIGNvbnRyb2wudmlzaWJsZSBhbmQgbm90IGNvbnRyb2wuZGlzYWJsZWQgYW5kIGNvbnRyb2wuaW5zaWRlIHgsIHlcclxuXHRcdFx0XHRpZiBjb250cm9sLmNsaWNrIHRoZW4gY29udHJvbC5jbGljaygpXHJcblx0XHRcdFx0YnJlYWtcclxuIl19
//# sourceURL=c:\github\2022-008-Berger\coffee\states.coffee