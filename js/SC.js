// Generated by CoffeeScript 2.5.1
import {
  globals,
  rotera,
  invert
} from './globals.js';

import {
  ALPHABET,
  setN,
  State
} from './states.js';

export var SC = class SC extends State { // Rotation
  setN() {
    var R, angle, i, k, len, ref, x, y;
    R = 40;
    this.points = [];
    this.N = globals.N;
    angle = 360 / (this.N - 1);
    ref = range(this.N - 1);
    for (k = 0, len = ref.length; k < len; k++) {
      i = ref[k];
      x = 50 + R * cos(angle * i);
      y = 47.5 + R * sin(angle * i);
      this.points.push([x, y]);
    }
    return this.points.push([50, 47.5]);
  }

  makeLine(i, j) {
    var x0, x1, y0, y1, z;
    z = rotera(range(this.N), -globals.rond);
    [x0, y0] = this.points[z[i]];
    [x1, y1] = this.points[z[j]];
    return line(x0, y0, x1, y1);
  }

  draw() {
    var i, k, l, len, len1, m, players, r, ref, ref1, results, rond, x, y;
    super.draw();
    r = 2 * 100 / this.N;
    if (r > 12) {
      r = 12;
    }
    textSize(0.75 * r);
    rond = globals.rond;
    players = invert(globals.ronder[rond]);
    m = this.N / 2;
    ref = range(m + 1);
    for (k = 0, len = ref.length; k < len; k++) {
      i = ref[k];
      this.makeLine(m - i, m + i - 1);
    }
    ref1 = range(this.N);
    results = [];
    for (l = 0, len1 = ref1.length; l < len1; l++) {
      i = ref1[l];
      [x, y] = this.points[i];
      fill(i === 0 ? 'red' : 'gray');
      circle(x, y, r);
      fill(['white', 'black'][players[i] % 2]);
      results.push(text(ALPHABET[i], x, y + 0.25));
    }
    return results;
  }

};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0MuanMiLCJzb3VyY2VSb290IjoiLi4iLCJzb3VyY2VzIjpbImNvZmZlZVxcU0MuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFBO0VBQVEsT0FBUjtFQUFnQixNQUFoQjtFQUF1QixNQUF2QjtDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFRLFFBQVI7RUFBa0IsSUFBbEI7RUFBd0IsS0FBeEI7Q0FBQSxNQUFBOztBQUVBLE9BQUEsSUFBYSxLQUFOLE1BQUEsR0FBQSxRQUFpQixNQUFqQixDQUFBO0VBRU4sSUFBTyxDQUFBLENBQUE7QUFDUixRQUFBLENBQUEsRUFBQSxLQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxHQUFBLEVBQUEsR0FBQSxFQUFBLENBQUEsRUFBQTtJQUFFLENBQUEsR0FBSTtJQUNKLElBQUMsQ0FBQSxNQUFELEdBQVU7SUFDVixJQUFDLENBQUEsQ0FBRCxHQUFLLE9BQU8sQ0FBQztJQUNiLEtBQUEsR0FBUSxHQUFBLEdBQUksQ0FBQyxJQUFDLENBQUEsQ0FBRCxHQUFHLENBQUo7QUFDWjtJQUFBLEtBQUEscUNBQUE7O01BQ0MsQ0FBQSxHQUFJLEVBQUEsR0FBRyxDQUFBLEdBQUUsR0FBQSxDQUFJLEtBQUEsR0FBTSxDQUFWO01BQ1QsQ0FBQSxHQUFJLElBQUEsR0FBSyxDQUFBLEdBQUUsR0FBQSxDQUFJLEtBQUEsR0FBTSxDQUFWO01BQ1gsSUFBQyxDQUFBLE1BQU0sQ0FBQyxJQUFSLENBQWEsQ0FBQyxDQUFELEVBQUcsQ0FBSCxDQUFiO0lBSEQ7V0FJQSxJQUFDLENBQUEsTUFBTSxDQUFDLElBQVIsQ0FBYSxDQUFDLEVBQUQsRUFBSSxJQUFKLENBQWI7RUFUTTs7RUFXUCxRQUFXLENBQUMsQ0FBRCxFQUFHLENBQUgsQ0FBQTtBQUNaLFFBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBO0lBQUUsQ0FBQSxHQUFJLE1BQUEsQ0FBTyxLQUFBLENBQU0sSUFBQyxDQUFBLENBQVAsQ0FBUCxFQUFpQixDQUFDLE9BQU8sQ0FBQyxJQUExQjtJQUNKLENBQUMsRUFBRCxFQUFJLEVBQUosQ0FBQSxHQUFVLElBQUMsQ0FBQSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUQsQ0FBRjtJQUNqQixDQUFDLEVBQUQsRUFBSSxFQUFKLENBQUEsR0FBVSxJQUFDLENBQUEsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFELENBQUY7V0FDakIsSUFBQSxDQUFLLEVBQUwsRUFBUSxFQUFSLEVBQVcsRUFBWCxFQUFjLEVBQWQ7RUFKVTs7RUFNWCxJQUFPLENBQUEsQ0FBQTtBQUNSLFFBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBLElBQUEsRUFBQSxDQUFBLEVBQUEsT0FBQSxFQUFBLENBQUEsRUFBQSxHQUFBLEVBQUEsSUFBQSxFQUFBLE9BQUEsRUFBQSxJQUFBLEVBQUEsQ0FBQSxFQUFBO1NBREMsQ0FBQSxJQUNDLENBQUE7SUFDQSxDQUFBLEdBQUksQ0FBQSxHQUFFLEdBQUYsR0FBTSxJQUFDLENBQUE7SUFDWCxJQUFHLENBQUEsR0FBRSxFQUFMO01BQWEsQ0FBQSxHQUFFLEdBQWY7O0lBQ0EsUUFBQSxDQUFTLElBQUEsR0FBSyxDQUFkO0lBQ0EsSUFBQSxHQUFPLE9BQU8sQ0FBQztJQUVmLE9BQUEsR0FBVSxNQUFBLENBQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFELENBQXJCO0lBRVYsQ0FBQSxHQUFJLElBQUMsQ0FBQSxDQUFELEdBQUc7QUFDUDtJQUFBLEtBQUEscUNBQUE7O01BQUEsSUFBQyxDQUFBLFFBQUQsQ0FBVSxDQUFBLEdBQUUsQ0FBWixFQUFjLENBQUEsR0FBRSxDQUFGLEdBQUksQ0FBbEI7SUFBQTtBQUVBO0FBQUE7SUFBQSxLQUFBLHdDQUFBOztNQUNDLENBQUMsQ0FBRCxFQUFHLENBQUgsQ0FBQSxHQUFRLElBQUMsQ0FBQSxNQUFNLENBQUMsQ0FBRDtNQUNmLElBQUEsQ0FBUSxDQUFBLEtBQUssQ0FBUixHQUFlLEtBQWYsR0FBMEIsTUFBL0I7TUFFQSxNQUFBLENBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYO01BQ0EsSUFBQSxDQUFLLENBQUMsT0FBRCxFQUFTLE9BQVQsQ0FBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBRCxDQUFQLEdBQWEsQ0FBZCxDQUF0QjttQkFDQSxJQUFBLENBQUssUUFBUSxDQUFDLENBQUQsQ0FBYixFQUFpQixDQUFqQixFQUFtQixDQUFBLEdBQUUsSUFBckI7SUFORCxDQUFBOztFQVpNOztBQW5CRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Z2xvYmFscyxyb3RlcmEsaW52ZXJ0fSBmcm9tICcuL2dsb2JhbHMuanMnXHJcbmltcG9ydCB7QUxQSEFCRVQsIHNldE4sIFN0YXRlfSBmcm9tICcuL3N0YXRlcy5qcydcclxuXHJcbmV4cG9ydCBjbGFzcyBTQyBleHRlbmRzIFN0YXRlICMgUm90YXRpb25cclxuXHRcclxuXHRzZXROIDogLT5cclxuXHRcdFIgPSA0MFxyXG5cdFx0QHBvaW50cyA9IFtdXHJcblx0XHRATiA9IGdsb2JhbHMuTlxyXG5cdFx0YW5nbGUgPSAzNjAvKEBOLTEpXHJcblx0XHRmb3IgaSBpbiByYW5nZSBATi0xXHJcblx0XHRcdHggPSA1MCtSKmNvcyBhbmdsZSppXHJcblx0XHRcdHkgPSA0Ny41K1Iqc2luIGFuZ2xlKmlcclxuXHRcdFx0QHBvaW50cy5wdXNoIFt4LHldXHJcblx0XHRAcG9pbnRzLnB1c2ggWzUwLDQ3LjVdXHJcblxyXG5cdG1ha2VMaW5lIDogKGksaikgLT5cclxuXHRcdHogPSByb3RlcmEgcmFuZ2UoQE4pLC1nbG9iYWxzLnJvbmRcclxuXHRcdFt4MCx5MF0gPSBAcG9pbnRzW3pbaV1dXHJcblx0XHRbeDEseTFdID0gQHBvaW50c1t6W2pdXVxyXG5cdFx0bGluZSB4MCx5MCx4MSx5MVxyXG5cclxuXHRkcmF3IDogLT5cclxuXHRcdHN1cGVyKClcclxuXHRcdHIgPSAyKjEwMC9ATlxyXG5cdFx0aWYgcj4xMiB0aGVuIHI9MTJcclxuXHRcdHRleHRTaXplIDAuNzUqclxyXG5cdFx0cm9uZCA9IGdsb2JhbHMucm9uZFxyXG5cclxuXHRcdHBsYXllcnMgPSBpbnZlcnQgZ2xvYmFscy5yb25kZXJbcm9uZF1cclxuXHJcblx0XHRtID0gQE4vMlxyXG5cdFx0QG1ha2VMaW5lIG0taSxtK2ktMSBmb3IgaSBpbiByYW5nZSBtKzFcclxuXHRcdFx0XHJcblx0XHRmb3IgaSBpbiByYW5nZSBATlxyXG5cdFx0XHRbeCx5XSA9IEBwb2ludHNbaV1cclxuXHRcdFx0ZmlsbCBpZiBpID09IDAgdGhlbiAncmVkJyBlbHNlICdncmF5J1xyXG5cclxuXHRcdFx0Y2lyY2xlIHgseSxyXHJcblx0XHRcdGZpbGwgWyd3aGl0ZScsJ2JsYWNrJ11bcGxheWVyc1tpXSAlIDJdXHJcblx0XHRcdHRleHQgQUxQSEFCRVRbaV0seCx5KzAuMjVcclxuIl19
//# sourceURL=c:\github\2022-008-Berger\coffee\SC.coffee