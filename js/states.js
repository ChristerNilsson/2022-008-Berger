// Generated by CoffeeScript 2.5.1
var common, getLocalCoords;

import {
  globals,
  invert
} from './globals.js';

import {
  CRounded,
  CDead
} from './controls.js';

export var ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'; // spelare

// halvborden heter 1..52. Jämn är vit, udda är svart
export var grid = function(xoff, dx, nx, yoff, dy, ny) {
  var i, j, k, len, len1, ref, ref1, results;
  ref = range(ny + 1);
  for (j = 0, len = ref.length; j < len; j++) {
    i = ref[j];
    line(xoff, yoff + dy * i, xoff + nx * dx, yoff + dy * i);
  }
  ref1 = range(nx + 1);
  results = [];
  for (k = 0, len1 = ref1.length; k < len1; k++) {
    i = ref1[k];
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
  return common.E.disabled = key === 'SE';
};

export var setRond = function(delta) {
  globals.rond += delta;
  common.R0.visible = globals.rond > 0;
  common.R2.visible = globals.rond < globals.N - 2;
  return common.R1.text = `Rond:\n${globals.rond + 1}`;
};

export var setN = function(delta) {
  var N, j, key, len, players, ref, results, rond, state;
  globals.N += delta;
  globals.rond = 0;
  setRond(0);
  common.X0.visible = globals.N > 4;
  common.X2.visible = globals.N < ALPHABET.length;
  common.X1.text = `Spelare:\n${globals.N}`;
  N = globals.N;
  globals.ronder = [];
  ref = range(N - 1);
  for (j = 0, len = ref.length; j < len; j++) {
    rond = ref[j];
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

common.A = new CRounded(10, 3, 19, 5, 'Halvbord', () => {
  return setState('SA');
});

common.B = new CRounded(30, 3, 19, 5, "Cirkel", () => {
  return setState('SB');
});

common.C = new CRounded(50, 3, 19, 5, "Rotation", () => {
  return setState('SC');
});

common.D = new CRounded(70, 3, 19, 5, "Berger\nSpelare", () => {
  return setState('SD');
});

common.E = new CRounded(90, 3, 19, 5, 'Berger\nHalvbord', () => {
  return setState('SE');
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

  draw() {
    var key, results;
    results = [];
    for (key in this.controls) {
      results.push(this.controls[key].draw());
    }
    return results;
  }

  mouseClicked() {
    var control, key, results, x, y;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGVzLmpzIiwic291cmNlUm9vdCI6Ii4uIiwic291cmNlcyI6WyJjb2ZmZWVcXHN0YXRlcy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUEsTUFBQSxFQUFBOztBQUFBLE9BQUE7RUFBUSxPQUFSO0VBQWdCLE1BQWhCO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVEsUUFBUjtFQUFpQixLQUFqQjtDQUFBLE1BQUE7O0FBRUEsT0FBQSxJQUFPLFFBQUEsR0FBVyx1REFIbEI7OztBQU1BLE9BQUEsSUFBTyxJQUFBLEdBQU8sUUFBQSxDQUFDLElBQUQsRUFBTSxFQUFOLEVBQVMsRUFBVCxFQUFhLElBQWIsRUFBa0IsRUFBbEIsRUFBcUIsRUFBckIsQ0FBQTtBQUNkLE1BQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBLElBQUEsRUFBQSxHQUFBLEVBQUEsSUFBQSxFQUFBO0FBQUM7RUFBQSxLQUFBLHFDQUFBOztJQUFBLElBQUEsQ0FBSyxJQUFMLEVBQWdCLElBQUEsR0FBSyxFQUFBLEdBQUcsQ0FBeEIsRUFBMkIsSUFBQSxHQUFLLEVBQUEsR0FBRyxFQUFuQyxFQUF1QyxJQUFBLEdBQUssRUFBQSxHQUFHLENBQS9DO0VBQUE7QUFDQTtBQUFBO0VBQUEsS0FBQSx3Q0FBQTs7aUJBQUEsSUFBQSxDQUFLLElBQUEsR0FBSyxFQUFBLEdBQUcsQ0FBYixFQUFnQixJQUFoQixFQUEyQixJQUFBLEdBQUssRUFBQSxHQUFHLENBQW5DLEVBQXVDLElBQUEsR0FBSyxFQUFBLEdBQUcsRUFBL0M7RUFBQSxDQUFBOztBQUZhOztBQUlkLE9BQUEsSUFBTyxXQUFBLEdBQWMsUUFBQSxDQUFDLElBQUQsRUFBTSxJQUFOLEVBQVcsRUFBWCxFQUFjLElBQWQsRUFBbUIsRUFBbkIsRUFBc0IsQ0FBdEIsQ0FBQTtFQUNwQixJQUFBLENBQUE7RUFDQSxJQUFBLENBQUssV0FBTDtFQUNBLFFBQUEsQ0FBQTtFQUNBLFFBQUEsQ0FBUyxN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RUFBekIsRUFBNkIsQ0FBN0IsRUFBZ0MsSUFBaEMsRUFBc0MsQ0FBQSxDQUFBLEdBQUE7U0FBRyxPQUFBLENBQVEsQ0FBQyxDQUFUO0FBQUgsQ0FBdEM7O0FBQ1osTUFBTSxDQUFDLEVBQUUsQ0FBQyxRQUFWLEdBQXFCOztBQUVyQixPQUFBLElBQWEsUUFBTixNQUFBLE1BQUE7RUFDTixXQUFjLEtBQUEsQ0FBQTtJQUFDLElBQUMsQ0FBQTtJQUNmLElBQUMsQ0FBQSxRQUFELEdBQVk7SUFDWixJQUFDLENBQUEsSUFBRCxDQUFBO0VBRmE7O0VBSWQsSUFBTyxDQUFBLENBQUE7QUFBRSxRQUFBLEdBQUEsRUFBQTtBQUFDO0lBQUEsS0FBQSxvQkFBQTttQkFBQSxJQUFDLENBQUEsUUFBUSxDQUFDLEdBQUQsQ0FBSyxDQUFDLElBQWYsQ0FBQTtJQUFBLENBQUE7O0VBQUg7O0VBRVAsWUFBZSxDQUFBLENBQUE7QUFDaEIsUUFBQSxPQUFBLEVBQUEsR0FBQSxFQUFBLE9BQUEsRUFBQSxDQUFBLEVBQUE7SUFBRSxDQUFBLENBQUMsQ0FBRCxFQUFHLENBQUgsQ0FBQSxHQUFRLGNBQUEsQ0FBQSxDQUFSO0FBQ0E7SUFBQSxLQUFBLG9CQUFBO01BQ0MsT0FBQSxHQUFVLElBQUMsQ0FBQSxRQUFRLENBQUMsR0FBRDtNQUNuQixJQUFHLE9BQU8sQ0FBQyxPQUFSLElBQW9CLENBQUksT0FBTyxDQUFDLFFBQWhDLElBQTZDLE9BQU8sQ0FBQyxNQUFSLENBQWUsQ0FBZixFQUFrQixDQUFsQixDQUFoRDtRQUNDLElBQUcsT0FBTyxDQUFDLEtBQVg7VUFBc0IsT0FBTyxDQUFDLEtBQVIsQ0FBQSxFQUF0Qjs7QUFDQSxjQUZEO09BQUEsTUFBQTs2QkFBQTs7SUFGRCxDQUFBOztFQUZjOztBQVBUIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtnbG9iYWxzLGludmVydH0gZnJvbSAnLi9nbG9iYWxzLmpzJ1xyXG5pbXBvcnQge0NSb3VuZGVkLENEZWFkfSBmcm9tICcuL2NvbnRyb2xzLmpzJ1xyXG5cclxuZXhwb3J0IEFMUEhBQkVUID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXonICMgc3BlbGFyZVxyXG4jIGhhbHZib3JkZW4gaGV0ZXIgMS4uNTIuIErDpG1uIMOkciB2aXQsIHVkZGEgw6RyIHN2YXJ0XHJcblxyXG5leHBvcnQgZ3JpZCA9ICh4b2ZmLGR4LG54LCB5b2ZmLGR5LG55KSAtPlxyXG5cdGxpbmUgeG9mZiwgICAgICB5b2ZmK2R5KmksIHhvZmYrbngqZHgsIHlvZmYrZHkqaSAgZm9yIGkgaW4gcmFuZ2UgbnkrMVxyXG5cdGxpbmUgeG9mZitkeCppLCB5b2ZmLCAgICAgIHhvZmYrZHgqaSwgIHlvZmYrbnkqZHkgZm9yIGkgaW4gcmFuZ2UgbngrMVxyXG5cclxuZXhwb3J0IG1hcmtlcmFSb25kID0gKHJvbmQseG9mZixkeCx5b2ZmLGR5LE4pIC0+XHJcblx0cHVzaCgpXHJcblx0ZmlsbCAnbGlnaHRncmF5J1xyXG5cdG5vU3Ryb2tlKClcclxuXHRyZWN0TW9kZSBDT1JORVJcclxuXHRyZWN0IHhvZmYrZHgqcm9uZCx5b2ZmLGR4LE4qZHlcclxuXHRwb3AoKVxyXG5cclxuZ2V0TG9jYWxDb29yZHMgPSAtPlxyXG5cdG1hdHJpeCA9IGRyYXdpbmdDb250ZXh0LmdldFRyYW5zZm9ybSgpXHJcblx0cGQgPSBwaXhlbERlbnNpdHkoKVxyXG5cdG1hdHJpeC5pbnZlcnNlKCkudHJhbnNmb3JtUG9pbnQgbmV3IERPTVBvaW50IG1vdXNlWCAqIHBkLG1vdXNlWSAqIHBkXHJcblxyXG5leHBvcnQgc2V0U3RhdGUgPSAoa2V5KSAtPlxyXG5cdGdsb2JhbHMuY3VyclN0YXRlID0gZ2xvYmFscy5zdGF0ZXNba2V5XVxyXG5cdGNvbW1vbi5BLmRpc2FibGVkID0ga2V5ID09ICdTQSdcclxuXHRjb21tb24uQi5kaXNhYmxlZCA9IGtleSA9PSAnU0InXHJcblx0Y29tbW9uLkMuZGlzYWJsZWQgPSBrZXkgPT0gJ1NDJ1xyXG5cdGNvbW1vbi5ELmRpc2FibGVkID0ga2V5ID09ICdTRCdcclxuXHRjb21tb24uRS5kaXNhYmxlZCA9IGtleSA9PSAnU0UnXHJcblxyXG5leHBvcnQgc2V0Um9uZCA9IChkZWx0YSkgLT5cclxuXHRnbG9iYWxzLnJvbmQgKz0gZGVsdGFcclxuXHRjb21tb24uUjAudmlzaWJsZSA9IGdsb2JhbHMucm9uZCA+IDBcclxuXHRjb21tb24uUjIudmlzaWJsZSA9IGdsb2JhbHMucm9uZCA8IGdsb2JhbHMuTi0yXHJcblx0Y29tbW9uLlIxLnRleHQgPSBcIlJvbmQ6XFxuI3tnbG9iYWxzLnJvbmQgKyAxfVwiXHJcblxyXG5leHBvcnQgc2V0TiA9IChkZWx0YSkgLT5cclxuXHRnbG9iYWxzLk4gKz0gZGVsdGFcclxuXHRnbG9iYWxzLnJvbmQgPSAwXHJcblx0c2V0Um9uZCAwXHJcblx0Y29tbW9uLlgwLnZpc2libGUgPSBnbG9iYWxzLk4gPiA0XHJcblx0Y29tbW9uLlgyLnZpc2libGUgPSBnbG9iYWxzLk4gPCBBTFBIQUJFVC5sZW5ndGhcclxuXHRjb21tb24uWDEudGV4dCA9IFwiU3BlbGFyZTpcXG4je2dsb2JhbHMuTn1cIlxyXG5cclxuXHROID0gZ2xvYmFscy5OXHJcblx0Z2xvYmFscy5yb25kZXIgPSBbXVxyXG5cdGZvciByb25kIGluIHJhbmdlIE4tMVxyXG5cdFx0cGxheWVycyA9IHJhbmdlIE4tMVxyXG5cdFx0cGxheWVycyA9IHBsYXllcnMuc2xpY2UoTi0xLXJvbmQpLmNvbmNhdCBwbGF5ZXJzLnNsaWNlKDAsTi0xLXJvbmQpXHJcblx0XHRwbGF5ZXJzLnB1c2ggTi0xXHJcblx0XHRpZiByb25kJTI9PTEgdGhlbiBbcGxheWVyc1swXSxwbGF5ZXJzW04tMV1dID0gW3BsYXllcnNbTi0xXSxwbGF5ZXJzWzBdXVxyXG5cdFx0Z2xvYmFscy5yb25kZXIucHVzaCBwbGF5ZXJzXHJcblx0Zm9yIGtleSBvZiBnbG9iYWxzLnN0YXRlc1xyXG5cdFx0c3RhdGUgPSBnbG9iYWxzLnN0YXRlc1trZXldXHJcblx0XHRzdGF0ZS5zZXROKClcclxuXHJcbmNvbW1vbiA9IHt9XHJcbmNvbW1vbi5BICA9IG5ldyBDUm91bmRlZCAxMCwgMywgMTksIDUsICdIYWx2Ym9yZCcsID0+IHNldFN0YXRlICdTQSdcclxuY29tbW9uLkIgID0gbmV3IENSb3VuZGVkIDMwLCAzLCAxOSwgNSwgXCJDaXJrZWxcIiwgPT4gc2V0U3RhdGUgJ1NCJ1xyXG5jb21tb24uQyAgPSBuZXcgQ1JvdW5kZWQgNTAsIDMsIDE5LCA1LCBcIlJvdGF0aW9uXCIsID0+IHNldFN0YXRlICdTQydcclxuY29tbW9uLkQgID0gbmV3IENSb3VuZGVkIDcwLCAzLCAxOSwgNSwgXCJCZXJnZXJcXG5TcGVsYXJlXCIsID0+IHNldFN0YXRlICdTRCdcclxuY29tbW9uLkUgID0gbmV3IENSb3VuZGVkIDkwLCAzLCAxOSwgNSwgJ0JlcmdlclxcbkhhbHZib3JkJywgPT4gc2V0U3RhdGUgJ1NFJ1xyXG5cclxuI2NvbW1vbi5YU3BlbGFyZSA9IG5ldyBDRGVhZCAyNSwgOTMuNSwnU3BlbGFyZTonXHJcbmNvbW1vbi5YMCA9IG5ldyBDUm91bmRlZCAgOS0wLjUsIDk3LCAxNSwgNSwgJy0yJywgPT4gc2V0TiAtMlxyXG5jb21tb24uWDEgPSBuZXcgQ1JvdW5kZWQgMjUtMC41LCA5NywgMTUsIDUsIDRcclxuY29tbW9uLlgyID0gbmV3IENSb3VuZGVkIDQxLTAuNSwgOTcsIDE1LCA1LCAnKzInLCA9PiBzZXROICsyXHJcbmNvbW1vbi5YMS5kaXNhYmxlZCA9IHRydWVcclxuXHJcbiNjb21tb24uWFJvbmQgPSBuZXcgQ0RlYWQgNzUsIDkzLjUsJ1JvbmQ6J1xyXG5jb21tb24uUjAgPSBuZXcgQ1JvdW5kZWQgNTkrMC41LCA5NywgMTUsIDUsICctMScsID0+IHNldFJvbmQgLTFcclxuY29tbW9uLlIxID0gbmV3IENSb3VuZGVkIDc1KzAuNSwgOTcsIDE1LCA1LCAwXHJcbmNvbW1vbi5SMiA9IG5ldyBDUm91bmRlZCA5MSswLjUsIDk3LCAxNSwgNSwgJysxJywgPT4gc2V0Um9uZCArMVxyXG5jb21tb24uUjEuZGlzYWJsZWQgPSB0cnVlXHJcblxyXG5leHBvcnQgY2xhc3MgU3RhdGVcclxuXHRjb25zdHJ1Y3RvciA6IChAbmFtZSkgLT5cclxuXHRcdEBjb250cm9scyA9IGNvbW1vblxyXG5cdFx0QHNldE4oKVxyXG5cclxuXHRkcmF3IDogLT4gQGNvbnRyb2xzW2tleV0uZHJhdygpIGZvciBrZXkgb2YgQGNvbnRyb2xzXHJcblxyXG5cdG1vdXNlQ2xpY2tlZCA6IC0+XHJcblx0XHR7eCx5fSA9IGdldExvY2FsQ29vcmRzKClcclxuXHRcdGZvciBrZXkgb2YgQGNvbnRyb2xzXHJcblx0XHRcdGNvbnRyb2wgPSBAY29udHJvbHNba2V5XVxyXG5cdFx0XHRpZiBjb250cm9sLnZpc2libGUgYW5kIG5vdCBjb250cm9sLmRpc2FibGVkIGFuZCBjb250cm9sLmluc2lkZSB4LCB5XHJcblx0XHRcdFx0aWYgY29udHJvbC5jbGljayB0aGVuIGNvbnRyb2wuY2xpY2soKVxyXG5cdFx0XHRcdGJyZWFrXHJcbiJdfQ==
//# sourceURL=c:\github\2022-008-Berger\coffee\states.coffee