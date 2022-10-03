// Generated by CoffeeScript 2.5.1
var bergerSVG, common, crlf, dx, getLocalCoords, round3, saveData, svgdefs, svggrid, svgline, svgtext, svguse, w, x;

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

crlf = "\n";

round3 = function(x) {
  return Math.round(1000 * x) / 1000;
};

svgline = function(x1, y1, x2, y2) {
  return `<line x1=\"${x1}\" y1=\"${y1}\" x2=\"${x2}\" y2=\"${y2}\" stroke=\"black\"/>`;
};

svgtext = function(text, x, y, ta = 'middle', ts = 2) {
  return `<text font-size=\"${round3(ts)}em\" text-anchor=\"${ta}\" x=\"${x}\" y=\"${y}\">${text}</text>`;
};

svgdefs = function(id, body) {
  return crlf + "<defs>" + crlf + `<g id=\"${id}\" >` + crlf + body + "</g>" + crlf + "</defs>" + crlf;
};

svguse = function(x, y, skalax, skalay) {
  return `<use href=\"#berger\" x=\"${x}\" y=\"${y}\" transform=\"scale(${skalax} ${skalay})\" />` + crlf;
};

svggrid = function(headers, ws, digits, n, dx, dy, totalWidth) {
  var anchor, big, digit, dist, i, j, k, l, len, len1, len2, len3, len4, m, medium, o, q, ref, ref1, ref2, ref3, ref4, res, row, small, ts, x0, y, y0;
  headers = headers.split(' ');
  res = [];
  x0 = 0;
  y = dy;
  big = dx / 30;
  medium = 0.75 * dx / 30;
  small = 0.50 * dx / 30;
  ref = range(headers.length);
  for (k = 0, len = ref.length; k < len; k++) {
    i = ref[k];
    res.push(svgline(x0, y - dy, x0, y + dy * n));
    res.push(svgtext(headers[i], x0 + ws[i] / 2, 0.75 * dy, 'middle', big));
    x0 += ws[i];
  }
  res.push(svgline(x0, y - dy, x0, y + dy * n));
  ref1 = range(-1, n + 1);
  for (l = 0, len1 = ref1.length; l < len1; l++) {
    i = ref1[l];
    res.push(svgline(0, y + dy * i, x0, y + dy * i));
  }
  ref2 = range(n);
  for (m = 0, len2 = ref2.length; m < len2; m++) {
    i = ref2[m];
    res.push(svgtext(i + 1, 0.5 * dx, y + dy * i + dy * 0.7, 'middle', big));
  }
  ref3 = range(digits.length);
  for (o = 0, len3 = ref3.length; o < len3; o++) {
    i = ref3[o];
    row = digits[i];
    x0 = ws[0] + ws[1] + dx * i + 0.5 * dx;
    ref4 = range(row.length);
    for (q = 0, len4 = ref4.length; q < len4; q++) {
      j = ref4[q];
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
  return res.join(crlf);
};

bergerSVG = function(w, h) {
  var a, antalRonder, antalSpelare, b, c, dx, dy, i, j, k, l, len, len1, len2, len3, len4, len5, m, nx, ny, o, p, q, r, ref, ref1, ref2, ref3, ref4, res, skalax, skalay, spelare, tables, totalHeight, totalWidth, white, ws;
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
  dy = 0.75 * dx;
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
  totalWidth = 0;
  for (o = 0, len3 = ws.length; o < len3; o++) {
    w = ws[o];
    totalWidth += w;
  }
  totalHeight = dy * (globals.N + 2);
  a = svggrid(res, ws, tables, globals.N, dx, dy, totalWidth);
  b = svgdefs("berger", a);
  c = b;
  totalWidth *= 1.03;
  [nx, ny, skalax, skalay] = [1, 1, 1, 1.2];
  if (globals.N === 4) {
    [nx, ny, skalax, skalay] = [2, 4, 0.84, 0.84];
  }
  if (globals.N === 6) {
    [nx, ny, skalax, skalay] = [2, 3, 1.00, 1.10];
  }
  if (globals.N === 8) {
    [nx, ny, skalax, skalay] = [2, 3, 1.00, 1];
  }
  if (globals.N === 10) {
    [nx, ny, skalax, skalay] = [1, 2, 0.84, 0.84];
  }
  ref3 = range(nx);
  for (q = 0, len4 = ref3.length; q < len4; q++) {
    i = ref3[q];
    ref4 = range(ny);
    for (r = 0, len5 = ref4.length; r < len5; r++) {
      j = ref4[r];
      c += svguse(i * totalWidth, j * totalHeight, skalax, skalay);
    }
  }
  return `<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='${nx * totalWidth * skalax}' height='${ny * totalHeight * skalay}' >` + c + '</svg>';
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

common.H = new CRounded(x + 7 * dx, 3, w, 5, 'Download', () => {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGVzLmpzIiwic291cmNlUm9vdCI6Ii4uIiwic291cmNlcyI6WyJjb2ZmZWVcXHN0YXRlcy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUEsU0FBQSxFQUFBLE1BQUEsRUFBQSxJQUFBLEVBQUEsRUFBQSxFQUFBLGNBQUEsRUFBQSxNQUFBLEVBQUEsUUFBQSxFQUFBLE9BQUEsRUFBQSxPQUFBLEVBQUEsT0FBQSxFQUFBLE9BQUEsRUFBQSxNQUFBLEVBQUEsQ0FBQSxFQUFBOztBQUFBLE9BQUE7RUFBUSxPQUFSO0VBQWdCLE1BQWhCO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVEsUUFBUjtFQUFpQixLQUFqQjtDQUFBLE1BQUEsZ0JBREE7OztBQUlBLE9BQUEsSUFBTyxRQUFBLEdBQVcsdURBSmxCOzs7QUFPQSxPQUFBLElBQU8sSUFBQSxHQUFPLFFBQUEsQ0FBQyxJQUFELEVBQU0sRUFBTixFQUFTLEVBQVQsRUFBYSxJQUFiLEVBQWtCLEVBQWxCLEVBQXFCLEVBQXJCLENBQUE7QUFDZCxNQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxJQUFBLEVBQUEsR0FBQSxFQUFBLElBQUEsRUFBQTtBQUFDO0VBQUEsS0FBQSxxQ0FBQTs7SUFBQSxJQUFBLENBQUssSUFBTCxFQUFnQixJQUFBLEdBQUssRUFBQSxHQUFHLENBQXhCLEVBQTJCLElBQUEsR0FBSyxFQUFBLEdBQUcsRUFBbkMsRUFBdUMsSUFBQSxHQUFLLEVBQUEsR0FBRyxDQUEvQztFQUFBO0FBQ0E7QUFBQTtFQUFBLEtBQUEsd0NBQUE7O2lCQUFBLElBQUEsQ0FBSyxJQUFBLEdBQUssRUFBQSxHQUFHLENBQWIsRUFBZ0IsSUFBaEIsRUFBMkIsSUFBQSxHQUFLLEVBQUEsR0FBRyxDQUFuQyxFQUF1QyxJQUFBLEdBQUssRUFBQSxHQUFHLEVBQS9DO0VBQUEsQ0FBQTs7QUFGYTs7QUFJZCxPQUFBLElBQU8sV0FBQSxHQUFjLFFBQUEsQ0FBQyxJQUFE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bmltcG9ydCB7Q1JvdW5kZWQsQ0RlYWR9IGZyb20gJy4vY29udHJvbHMuanMnXHJcbiMgaW1wb3J0IHNhdmVBcyBmcm9tICcuL2ZpbGUtc2F2ZXIuanMnXHJcblxyXG5leHBvcnQgQUxQSEFCRVQgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5eicgIyBzcGVsYXJlXHJcbiMgaGFsdmJvcmRlbiBoZXRlciAxLi41Mi4gSsOkbW4gw6RyIHZpdCwgdWRkYSDDpHIgc3ZhcnRcclxuXHJcbmV4cG9ydCBncmlkID0gKHhvZmYsZHgsbngsIHlvZmYsZHksbnkpIC0+XHJcblx0bGluZSB4b2ZmLCAgICAgIHlvZmYrZHkqaSwgeG9mZitueCpkeCwgeW9mZitkeSppICBmb3IgaSBpbiByYW5nZSBueSsxXHJcblx0bGluZSB4b2ZmK2R4KmksIHlvZmYsICAgICAgeG9mZitkeCppLCAgeW9mZitueSpkeSBmb3IgaSBpbiByYW5nZSBueCsxXHJcblxyXG5leHBvcnQgbWFya2VyYVJvbmQgPSAocm9uZCx4b2ZmLGR4LHlvZmYsZHksTikgLT5cclxuXHRwdXNoKClcclxuXHRmaWxsICdsaWdodGdyYXknXHJcblx0bm9TdHJva2UoKVxyXG5cdHJlY3RNb2RlIENPUk5FUlxyXG5cdHJlY3QgeG9mZitkeCpyb25kLHlvZmYsZHgsTipkeVxyXG5cdHBvcCgpXHJcblxyXG5zYXZlRGF0YSA9IC0+XHJcblx0YSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgXCJhXCJcclxuXHQjZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCBhICMgU2thcGFyIG3DpW5nYSBkb3dubG9hZHNcclxuXHRhLnN0eWxlID0gXCJkaXNwbGF5OiBub25lXCJcclxuXHRyZXR1cm4gKGRhdGEsIGZpbGVOYW1lKSA9PlxyXG5cdFx0YmxvYiA9IG5ldyBCbG9iIFtkYXRhXSwge3R5cGU6IFwib2N0ZXQvc3RyZWFtXCJ9XHJcblx0XHR1cmwgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTCBibG9iXHJcblx0XHRhLmhyZWYgPSB1cmxcclxuXHRcdGEuZG93bmxvYWQgPSBmaWxlTmFtZVxyXG5cdFx0YS5jbGljaygpXHJcblx0XHR3aW5kb3cuVVJMLnJldm9rZU9iamVjdFVSTCB1cmxcclxuXHJcbmNybGYgPSBcIlxcblwiXHJcbnJvdW5kMyA9ICh4KSAtPiBNYXRoLnJvdW5kKDEwMDAqeCkvMTAwMFxyXG5cclxuc3ZnbGluZSA9ICh4MSx5MSx4Mix5MikgLT4gXCI8bGluZSB4MT1cXFwiI3t4MX1cXFwiIHkxPVxcXCIje3kxfVxcXCIgeDI9XFxcIiN7eDJ9XFxcIiB5Mj1cXFwiI3t5Mn1cXFwiIHN0cm9rZT1cXFwiYmxhY2tcXFwiLz5cIlxyXG5zdmd0ZXh0ID0gKHRleHQseCx5LHRhPSdtaWRkbGUnLHRzPTIpIC0+IFwiPHRleHQgZm9udC1zaXplPVxcXCIje3JvdW5kMyB0c31lbVxcXCIgdGV4dC1hbmNob3I9XFxcIiN7dGF9XFxcIiB4PVxcXCIje3h9XFxcIiB5PVxcXCIje3l9XFxcIj4je3RleHR9PC90ZXh0PlwiXHJcbnN2Z2RlZnMgPSAoaWQsYm9keSkgLT4gY3JsZiArIFwiPGRlZnM+XCIgKyBjcmxmICsgXCI8ZyBpZD1cXFwiI3tpZH1cXFwiID5cIiArIGNybGYgKyBib2R5ICsgXCI8L2c+XCIrIGNybGYgKyBcIjwvZGVmcz5cIiArIGNybGZcclxuc3ZndXNlICA9ICh4LHksc2thbGF4LHNrYWxheSkgLT4gXCI8dXNlIGhyZWY9XFxcIiNiZXJnZXJcXFwiIHg9XFxcIiN7eH1cXFwiIHk9XFxcIiN7eX1cXFwiIHRyYW5zZm9ybT1cXFwic2NhbGUoI3tza2FsYXh9ICN7c2thbGF5fSlcXFwiIC8+XCIgKyBjcmxmXHJcblxyXG5zdmdncmlkID0gKGhlYWRlcnMsd3MsZGlnaXRzLG4sZHgsZHksdG90YWxXaWR0aCkgLT5cclxuXHRoZWFkZXJzID0gaGVhZGVycy5zcGxpdCAnICdcclxuXHRyZXMgPSBbXVxyXG5cdHgwID0gMFxyXG5cdHkgPSBkeVxyXG5cdGJpZyAgID0gZHgvMzBcclxuXHRtZWRpdW0gPSAwLjc1KmR4LzMwXHJcblx0c21hbGwgPSAwLjUwKmR4LzMwXHJcblx0Zm9yIGkgaW4gcmFuZ2UgaGVhZGVycy5sZW5ndGhcclxuXHRcdHJlcy5wdXNoIHN2Z2xpbmUgeDAseS1keSx4MCx5K2R5Km5cclxuXHRcdHJlcy5wdXNoIHN2Z3RleHQgaGVhZGVyc1tpXSx4MCt3c1tpXS8yLDAuNzUqZHksJ21pZGRsZScsYmlnXHJcblx0XHR4MCArPSB3c1tpXVxyXG5cdHJlcy5wdXNoIHN2Z2xpbmUgeDAseS1keSx4MCx5K2R5Km5cclxuXHJcblx0Zm9yIGkgaW4gcmFuZ2UgLTEsbisxXHJcblx0XHRyZXMucHVzaCBzdmdsaW5lIDAseStkeSppLHgwLHkrZHkqaVxyXG5cdGZvciBpIGluIHJhbmdlIG5cclxuXHRcdHJlcy5wdXNoIHN2Z3RleHQgaSsxLDAuNSpkeCx5K2R5KmkrZHkqMC43LCdtaWRkbGUnLGJpZ1xyXG5cclxuXHRmb3IgaSBpbiByYW5nZSBkaWdpdHMubGVuZ3RoXHJcblx0XHRyb3cgPSBkaWdpdHNbaV1cclxuXHRcdHgwID0gd3NbMF0gKyB3c1sxXSArIGR4KmkgKyAwLjUqZHhcclxuXHRcdGZvciBqIGluIHJhbmdlIHJvdy5sZW5ndGhcclxuXHRcdFx0eTAgPSB5ICsgZHkqaiArIDAuMjgqZHlcclxuXHRcdFx0ZGlnaXQgPSByb3dbal1cclxuXHRcdFx0aWYgZGlnaXQgPCAwXHJcblx0XHRcdFx0YW5jaG9yID0gJ3N0YXJ0J1xyXG5cdFx0XHRcdGRpZ2l0ID0gLWRpZ2l0XHJcblx0XHRcdFx0ZGlzdCA9IC1keCowLjQ1XHJcblx0XHRcdGVsc2UgXHJcblx0XHRcdFx0YW5jaG9yID0gJ2VuZCdcclxuXHRcdFx0XHRkaXN0ID0gZHgqMC40NVxyXG5cdFx0XHRyZXMucHVzaCBzdmd0ZXh0IGRpZ2l0LHgwK2Rpc3QseTAsYW5jaG9yLHRzPXNtYWxsXHJcblx0cmVzLnB1c2ggc3ZndGV4dCAnQmVyZ2VyIC0gUm91bmQgUm9iaW4nLDAsZHkqKG4rMS40KSwnc3RhcnQnLHNtYWxsXHJcblx0cmVzLnB1c2ggc3ZndGV4dCAnT2JzZXJ2ZXJhIGF0dCBwbGFjZXJpbmdhcm5hIHV0Z8O2cnMgYXYgQk9SRFNOVU1NRVInLHRvdGFsV2lkdGgvMixkeSoobisxLjQpLCdtaWRkbGUnLHNtYWxsXHJcblx0cmVzLnB1c2ggc3ZndGV4dCAnQ291cnRlc3kgb2YgV2FzYSBTSycsdG90YWxXaWR0aCxkeSoobisxLjQpLCdlbmQnLHNtYWxsXHJcblx0cmVzLmpvaW4gY3JsZlxyXG5cclxuYmVyZ2VyU1ZHID0gKHcsaCkgLT5cclxuXHR0YWJsZXMgPSBbXVxyXG5cdGFudGFsU3BlbGFyZSA9IGdsb2JhbHMucm9uZGVyWzBdLmxlbmd0aCAjIGFudGFsIHNwZWxhcmUsIGFsbHRpZCBqw6RtbnRcclxuXHRhbnRhbFJvbmRlciA9IGFudGFsU3BlbGFyZSAtIDFcclxuXHRjb25zb2xlLmxvZyBhbnRhbFNwZWxhcmUsIGFudGFsUm9uZGVyXHJcblx0Zm9yIGkgaW4gcmFuZ2UgYW50YWxSb25kZXJcclxuXHRcdHNwZWxhcmUgPSBpbnZlcnQgZ2xvYmFscy5yb25kZXJbaV1cclxuXHRcdGZvciBqIGluIHJhbmdlIGFudGFsU3BlbGFyZVxyXG5cdFx0XHRwID0gc3BlbGFyZVtqXVxyXG5cdFx0XHR3aGl0ZSA9IHAgJSAyID09IDBcclxuXHRcdFx0aWYgcCA+PSBhbnRhbFNwZWxhcmUvMiB0aGVuIHAgPSBhbnRhbFJvbmRlci1wXHJcblx0XHRcdGlmIHdoaXRlIHRoZW4gcCA9IHArMSBlbHNlIHA9LXAtMVxyXG5cdFx0XHRzcGVsYXJlW2pdID0gcFxyXG5cdFx0dGFibGVzLnB1c2ggc3BlbGFyZVxyXG5cclxuXHRyZXMgPSAnTnIgTmFtbidcclxuXHRkeCA9IDEwMDAvZ2xvYmFscy5OXHJcblx0aWYgZHg+NTAgdGhlbiBkeD01MFxyXG5cdGR5ID0gMC43NSAqIGR4XHJcblx0d3MgPSBbZHgsMjAwXVxyXG5cdGZvciBpIGluIHJhbmdlIGdsb2JhbHMuTi0xXHJcblx0XHRyZXMgKz0gXCIgI3tpKzF9XCJcclxuXHRcdHdzLnB1c2ggZHhcclxuXHRyZXMgKz0gJyBQb8OkbmcgUGxhdHMnXHJcblx0d3MucHVzaCBkeCtkeFxyXG5cdHdzLnB1c2ggZHgrZHggXHJcblx0dG90YWxXaWR0aCA9IDBcclxuXHR0b3RhbFdpZHRoICs9IHcgZm9yIHcgaW4gd3NcclxuXHR0b3RhbEhlaWdodCA9IGR5ICogKGdsb2JhbHMuTiArIDIpXHJcblxyXG5cdGEgPSBzdmdncmlkIHJlcyx3cyx0YWJsZXMsZ2xvYmFscy5OLGR4LGR5LHRvdGFsV2lkdGhcclxuXHRiID0gc3ZnZGVmcyBcImJlcmdlclwiLCBhXHJcblx0YyA9IGJcclxuXHR0b3RhbFdpZHRoICo9IDEuMDNcclxuXHJcblx0W254LG55LHNrYWxheCxza2FsYXldID0gWzEsMSwxLDEuMl1cclxuXHRpZiBnbG9iYWxzLk4gPT0gIDQgdGhlbiBbbngsbnksc2thbGF4LHNrYWxheV0gPSBbMiw0LDAuODQsMC44NF0gXHJcblx0aWYgZ2xvYmFscy5OID09ICA2IHRoZW4gW254LG55LHNrYWxheCxza2FsYXldID0gWzIsMywxLjAwLDEuMTBdXHJcblx0aWYgZ2xvYmFscy5OID09ICA4IHRoZW4gW254LG55LHNrYWxheCxza2FsYXldID0gWzIsMywxLjAwLDFdXHJcblx0aWYgZ2xvYmFscy5OID09IDEwIHRoZW4gW254LG55LHNrYWxheCxza2FsYXldID0gWzEsMiwwLjg0LDAuODRdXHJcblx0Zm9yIGkgaW4gcmFuZ2UgbnhcclxuXHRcdGZvciBqIGluIHJhbmdlIG55XHJcblx0XHRcdGMgKz0gc3ZndXNlIGkqdG90YWxXaWR0aCwgaip0b3RhbEhlaWdodCwgc2thbGF4LCBza2FsYXlcclxuXHRcIjxzdmcgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyB3aWR0aD0nI3tueCp0b3RhbFdpZHRoKnNrYWxheH0nIGhlaWdodD0nI3tueSp0b3RhbEhlaWdodCpza2FsYXl9JyA+XCIgKyBjICsgJzwvc3ZnPidcclxuXHJcbmdldExvY2FsQ29vcmRzID0gLT5cclxuXHRtYXRyaXggPSBkcmF3aW5nQ29udGV4dC5nZXRUcmFuc2Zvcm0oKVxyXG5cdHBkID0gcGl4ZWxEZW5zaXR5KClcclxuXHRtYXRyaXguaW52ZXJzZSgpLnRyYW5zZm9ybVBvaW50IG5ldyBET01Qb2ludCBtb3VzZVggKiBwZCxtb3VzZVkgKiBwZFxyXG5cclxuZXhwb3J0IHNldFN0YXRlID0gKGtleSkgLT5cclxuXHRnbG9iYWxzLmN1cnJTdGF0ZSA9IGdsb2JhbHMuc3RhdGVzW2tleV1cclxuXHRjb21tb24uQS5kaXNhYmxlZCA9IGtleSA9PSAnU0EnXHJcblx0Y29tbW9uLkIuZGlzYWJsZWQgPSBrZXkgPT0gJ1NCJ1xyXG5cdGNvbW1vbi5DLmRpc2FibGVkID0ga2V5ID09ICdTQydcclxuXHRjb21tb24uRC5kaXNhYmxlZCA9IGtleSA9PSAnU0QnXHJcblx0Y29tbW9uLkUuZGlzYWJsZWQgPSBrZXkgPT0gJ1NFJ1xyXG5cdGNvbW1vbi5GLmRpc2FibGVkID0ga2V5ID09ICdTRidcclxuXHRjb21tb24uRy5kaXNhYmxlZCA9IGtleSA9PSAnU0cnXHJcblx0I2NvbW1vbi5ILmRpc2FibGVkID0ga2V5ID09ICdTSCdcclxuXHJcbmV4cG9ydCBzZXRSb25kID0gKGRlbHRhKSAtPlxyXG5cdGdsb2JhbHMucm9uZCArPSBkZWx0YVxyXG5cdGNvbW1vbi5SMC52aXNpYmxlID0gZ2xvYmFscy5yb25kID4gMFxyXG5cdGNvbW1vbi5SMi52aXNpYmxlID0gZ2xvYmFscy5yb25kIDwgZ2xvYmFscy5OLTJcclxuXHRjb21tb24uUjEudGV4dCA9IFwiUm9uZDpcXG4je2dsb2JhbHMucm9uZCArIDF9XCJcclxuXHJcbmV4cG9ydCBzZXROID0gKGRlbHRhKSAtPlxyXG5cdGdsb2JhbHMuTiArPSBkZWx0YVxyXG5cdGdsb2JhbHMucm9uZCA9IDBcclxuXHRzZXRSb25kIDBcclxuXHRjb21tb24uWDAudmlzaWJsZSA9IGdsb2JhbHMuTiA+IDRcclxuXHRjb21tb24uWDIudmlzaWJsZSA9IGdsb2JhbHMuTiA8IEFMUEhBQkVULmxlbmd0aFxyXG5cdGNvbW1vbi5YMS50ZXh0ID0gXCJTcGVsYXJlOlxcbiN7Z2xvYmFscy5OfVwiXHJcblxyXG5cdE4gPSBnbG9iYWxzLk5cclxuXHRnbG9iYWxzLnJvbmRlciA9IFtdXHJcblx0Zm9yIHJvbmQgaW4gcmFuZ2UgTi0xXHJcblx0XHRwbGF5ZXJzID0gcmFuZ2UgTi0xXHJcblx0XHRwbGF5ZXJzID0gcGxheWVycy5zbGljZShOLTEtcm9uZCkuY29uY2F0IHBsYXllcnMuc2xpY2UoMCxOLTEtcm9uZClcclxuXHRcdHBsYXllcnMucHVzaCBOLTFcclxuXHRcdGlmIHJvbmQlMj09MSB0aGVuIFtwbGF5ZXJzWzBdLHBsYXllcnNbTi0xXV0gPSBbcGxheWVyc1tOLTFdLHBsYXllcnNbMF1dXHJcblx0XHRnbG9iYWxzLnJvbmRlci5wdXNoIHBsYXllcnNcclxuXHRmb3Iga2V5IG9mIGdsb2JhbHMuc3RhdGVzXHJcblx0XHRzdGF0ZSA9IGdsb2JhbHMuc3RhdGVzW2tleV1cclxuXHRcdHN0YXRlLnNldE4oKVxyXG5cclxuY29tbW9uID0ge31cclxueCA9IDYuMjVcclxuZHggPSAxMDAvOFxyXG53ID0gMTAwLzguNVxyXG5jb21tb24uQSAgPSBuZXcgQ1JvdW5kZWQgeCswKmR4LCAzLCB3LCA1LCAnSGFsdmJvcmQnLCAgICAgICAgID0+IHNldFN0YXRlICdTQSdcclxuY29tbW9uLkIgID0gbmV3IENSb3VuZGVkIHgrMSpkeCwgMywgdywgNSwgJ0JvcmQnLCAgICAgICAgICAgICA9PiBzZXRTdGF0ZSAnU0InXHJcbmNvbW1vbi5DICA9IG5ldyBDUm91bmRlZCB4KzIqZHgsIDMsIHcsIDUsIFwiQ2lya2VsXCIsICAgICAgICAgICA9PiBzZXRTdGF0ZSAnU0MnXHJcbmNvbW1vbi5EICA9IG5ldyBDUm91bmRlZCB4KzMqZHgsIDMsIHcsIDUsIFwiUm90YXRpb25cIiwgICAgICAgICA9PiBzZXRTdGF0ZSAnU0QnXHJcbmNvbW1vbi5FICA9IG5ldyBDUm91bmRlZCB4KzQqZHgsIDMsIHcsIDUsIFwiQmVyZ2VyXFxuU3BlbGFyZVwiLCAgPT4gc2V0U3RhdGUgJ1NFJ1xyXG5jb21tb24uRiAgPSBuZXcgQ1JvdW5kZWQgeCs1KmR4LCAzLCB3LCA1LCAnQmVyZ2VyXFxuSGFsdmJvcmQnLCA9PiBzZXRTdGF0ZSAnU0YnXHJcbmNvbW1vbi5HICA9IG5ldyBDUm91bmRlZCB4KzYqZHgsIDMsIHcsIDUsICdCZXJnZXJcXG5Cb3JkJywgICAgID0+IHNldFN0YXRlICdTRydcclxuY29tbW9uLkggID0gbmV3IENSb3VuZGVkIHgrNypkeCwgMywgdywgNSwgJ0Rvd25sb2FkJywgPT5cclxuXHRkYXRhID0gYmVyZ2VyU1ZHIHdpZHRoLGhlaWdodFxyXG5cdGZpbGVOYW1lID0gXCIje2dsb2JhbHMuTn0uc3ZnXCJcclxuXHRzYXZlRGF0YSgpIGRhdGEsIGZpbGVOYW1lXHJcblxyXG4jY29tbW9uLlhTcGVsYXJlID0gbmV3IENEZWFkIDI1LCA5My41LCdTcGVsYXJlOidcclxuY29tbW9uLlgwID0gbmV3IENSb3VuZGVkICA5LTAuNSwgOTcsIDE1LCA1LCAnLTInLCA9PiBzZXROIC0yXHJcbmNvbW1vbi5YMSA9IG5ldyBDUm91bmRlZCAyNS0wLjUsIDk3LCAxNSwgNSwgNFxyXG5jb21tb24uWDIgPSBuZXcgQ1JvdW5kZWQgNDEtMC41LCA5NywgMTUsIDUsICcrMicsID0+IHNldE4gKzJcclxuY29tbW9uLlgxLmRpc2FibGVkID0gdHJ1ZVxyXG5cclxuI2NvbW1vbi5YUm9uZCA9IG5ldyBDRGVhZCA3NSwgOTMuNSwnUm9uZDonXHJcbmNvbW1vbi5SMCA9IG5ldyBDUm91bmRlZCA1OSswLjUsIDk3LCAxNSwgNSwgJy0xJywgPT4gc2V0Um9uZCAtMVxyXG5jb21tb24uUjEgPSBuZXcgQ1JvdW5kZWQgNzUrMC41LCA5NywgMTUsIDUsIDBcclxuY29tbW9uLlIyID0gbmV3IENSb3VuZGVkIDkxKzAuNSwgOTcsIDE1LCA1LCAnKzEnLCA9PiBzZXRSb25kICsxXHJcbmNvbW1vbi5SMS5kaXNhYmxlZCA9IHRydWVcclxuXHJcbmV4cG9ydCBjbGFzcyBTdGF0ZVxyXG5cdGNvbnN0cnVjdG9yIDogKEBuYW1lKSAtPlxyXG5cdFx0QGNvbnRyb2xzID0gY29tbW9uXHJcblx0XHRAc2V0TigpXHJcblxyXG5cdGRyYXdDb250cm9scyA6IC0+IEBjb250cm9sc1trZXldLmRyYXcoKSBmb3Iga2V5IG9mIEBjb250cm9sc1xyXG5cclxuXHRtb3VzZUNsaWNrZWQgOiAtPlxyXG5cdFx0e3gseX0gPSBnZXRMb2NhbENvb3JkcygpXHJcblx0XHRmb3Iga2V5IG9mIEBjb250cm9sc1xyXG5cdFx0XHRjb250cm9sID0gQGNvbnRyb2xzW2tleV1cclxuXHRcdFx0aWYgY29udHJvbC52aXNpYmxlIGFuZCBub3QgY29udHJvbC5kaXNhYmxlZCBhbmQgY29udHJvbC5pbnNpZGUgeCwgeVxyXG5cdFx0XHRcdGlmIGNvbnRyb2wuY2xpY2sgdGhlbiBjb250cm9sLmNsaWNrKClcclxuXHRcdFx0XHRicmVha1xyXG4iXX0=
//# sourceURL=c:\github\2022-008-Berger\coffee\states.coffee