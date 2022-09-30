// Generated by CoffeeScript 2.5.1
import {
  globals
} from './globals.js';

import {
  ALPHABET,
  setN,
  State
} from './states.js';

export var SA = class SA extends State { // Halvbord
  setN() {
    var i, j, k, len, len1, ref, ref1, results, x1;
    // bygg koordinatlistor
    this.N = globals.N;
    this.dx = 100 / (this.N + 2) * 2;
    if (this.dx > 10) {
      this.dx = 10;
    }
    this.dy = 0.9 * this.dx;
    this.x = [];
    this.y = [];
    ref = range(this.N / 2);
    for (j = 0, len = ref.length; j < len; j++) {
      i = ref[j];
      this.x.push(this.dx + i * this.dx);
      this.y.push(45 - this.dy / 2);
    }
    x1 = this.x.slice();
    _.reverse(this.x);
    this.x = x1.concat(this.x);
    ref1 = range(this.N / 2);
    results = [];
    for (k = 0, len1 = ref1.length; k < len1; k++) {
      i = ref1[k];
      results.push(this.y.push(45 + this.dy / 2));
    }
    return results;
  }

  draw() {
    var iPlace, j, len, players, ref, results, y;
    super.draw();
    players = globals.ronder[globals.rond];
    textSize(0.7 * this.dy);
    ref = range(this.N);
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      iPlace = ref[j];
      fill('gray');
      rect(this.x[iPlace], this.y[iPlace], this.dx, this.dx);
      fill(['white', 'black'][iPlace % 2]);
      text(1 + iPlace, this.x[iPlace], this.y[iPlace]);
      y = iPlace >= this.N / 2 ? this.dy : -this.dy;
      fill(players[iPlace] === 0 ? 'red' : 'black');
      results.push(text(ALPHABET[players[iPlace]], this.x[iPlace], this.y[iPlace] + y));
    }
    return results;
  }

};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0EuanMiLCJzb3VyY2VSb290IjoiLi4iLCJzb3VyY2VzIjpbImNvZmZlZVxcU0EuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFBO0VBQVEsT0FBUjtDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFRLFFBQVI7RUFBa0IsSUFBbEI7RUFBd0IsS0FBeEI7Q0FBQSxNQUFBOztBQUVBLE9BQUEsSUFBYSxLQUFOLE1BQUEsR0FBQSxRQUFpQixNQUFqQixDQUFBO0VBRU4sSUFBTyxDQUFBLENBQUE7QUFFUixRQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxJQUFBLEVBQUEsR0FBQSxFQUFBLElBQUEsRUFBQSxPQUFBLEVBQUEsRUFBQTs7SUFDRSxJQUFDLENBQUEsQ0FBRCxHQUFLLE9BQU8sQ0FBQztJQUNiLElBQUMsQ0FBQSxFQUFELEdBQU0sR0FBQSxHQUFJLENBQUMsSUFBQyxDQUFBLENBQUQsR0FBRyxDQUFKLENBQUosR0FBVztJQUNqQixJQUFHLElBQUMsQ0FBQSxFQUFELEdBQU0sRUFBVDtNQUFpQixJQUFDLENBQUEsRUFBRCxHQUFJLEdBQXJCOztJQUNBLElBQUMsQ0FBQSxFQUFELEdBQU0sR0FBQSxHQUFJLElBQUMsQ0FBQTtJQUNYLElBQUMsQ0FBQSxDQUFELEdBQUs7SUFDTCxJQUFDLENBQUEsQ0FBRCxHQUFLO0FBQ0w7SUFBQSxLQUFBLHFDQUFBOztNQUNDLElBQUMsQ0FBQSxDQUFDLENBQUMsSUFBSCxDQUFRLElBQUMsQ0FBQSxFQUFELEdBQU0sQ0FBQSxHQUFJLElBQUMsQ0FBQSxFQUFuQjtNQUNBLElBQUMsQ0FBQSxDQUFDLENBQUMsSUFBSCxDQUFRLEVBQUEsR0FBRyxJQUFDLENBQUEsRUFBRCxHQUFJLENBQWY7SUFGRDtJQUdBLEVBQUEsR0FBSyxJQUFDLENBQUEsQ0FBQyxDQUFDLEtBQUgsQ0FBQTtJQUNMLENBQUMsQ0FBQyxPQUFGLENBQVUsSUFBQyxDQUFBLENBQVg7SUFDQSxJQUFDLENBQUEsQ0FBRCxHQUFLLEVBQUUsQ0FBQyxNQUFILENBQVUsSUFBQyxDQUFBLENBQVg7QUFDTDtBQUFBO0lBQUEsS0FBQSx3Q0FBQTs7bUJBQ0MsSUFBQyxDQUFBLENBQUMsQ0FBQyxJQUFILENBQVEsRUFBQSxHQUFHLElBQUMsQ0FBQSxFQUFELEdBQUksQ0FBZjtJQURELENBQUE7O0VBZk07O0VBa0JQLElBQU8sQ0FBQSxDQUFBO0FBQ1IsUUFBQSxNQUFBLEVBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxPQUFBLEVBQUEsR0FBQSxFQUFBLE9BQUEsRUFBQTtTQURDLENBQUEsSUFDQyxDQUFBO0lBQ0EsT0FBQSxHQUFVLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQVQ7SUFDeEIsUUFBQSxDQUFTLEdBQUEsR0FBSSxJQUFDLENBQUEsRUFBZDtBQUVBO0FBQUE7SUFBQSxLQUFBLHFDQUFBOztNQUNDLElBQUEsQ0FBSyxNQUFMO01BQ0EsSUFBQSxDQUFLLElBQUMsQ0FBQSxDQUFDLENBQUMsTUFBRCxDQUFQLEVBQWdCLElBQUMsQ0FBQSxDQUFDLENBQUMsTUFBRCxDQUFsQixFQUEyQixJQUFDLENBQUEsRUFBNUIsRUFBK0IsSUFBQyxDQUFBLEVBQWhDO01BQ0EsSUFBQSxDQUFLLENBQUMsT0FBRCxFQUFTLE9BQVQsQ0FBaUIsQ0FBQyxNQUFBLEdBQU8sQ0FBUixDQUF0QjtNQUNBLElBQUEsQ0FBSyxDQUFBLEdBQUUsTUFBUCxFQUFjLElBQUMsQ0FBQSxDQUFDLENBQUMsTUFBRCxDQUFoQixFQUF5QixJQUFDLENBQUEsQ0FBQyxDQUFDLE1BQUQsQ0FBM0I7TUFFQSxDQUFBLEdBQU8sTUFBQSxJQUFVLElBQUMsQ0FBQSxDQUFELEdBQUcsQ0FBaEIsR0FBdUIsSUFBQyxDQUFBLEVBQXhCLEdBQWdDLENBQUMsSUFBQyxDQUFBO01BQ3RDLElBQUEsQ0FBUSxPQUFPLENBQUMsTUFBRCxDQUFQLEtBQW1CLENBQXRCLEdBQTZCLEtBQTdCLEdBQXdDLE9BQTdDO21CQUNBLElBQUEsQ0FBSyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQUQsQ0FBUixDQUFiLEVBQStCLElBQUMsQ0FBQSxDQUFDLENBQUMsTUFBRCxDQUFqQyxFQUEwQyxJQUFDLENBQUEsQ0FBQyxDQUFDLE1BQUQsQ0FBRixHQUFhLENBQXZEO0lBUkQsQ0FBQTs7RUFMTTs7QUFwQkQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2dsb2JhbHN9IGZyb20gJy4vZ2xvYmFscy5qcydcclxuaW1wb3J0IHtBTFBIQUJFVCwgc2V0TiwgU3RhdGV9IGZyb20gJy4vc3RhdGVzLmpzJ1xyXG5cclxuZXhwb3J0IGNsYXNzIFNBIGV4dGVuZHMgU3RhdGUgIyBIYWx2Ym9yZFxyXG5cclxuXHRzZXROIDogLT5cclxuXHJcblx0XHQjIGJ5Z2cga29vcmRpbmF0bGlzdG9yXHJcblx0XHRATiA9IGdsb2JhbHMuTlxyXG5cdFx0QGR4ID0gMTAwLyhATisyKSoyXHJcblx0XHRpZiBAZHggPiAxMCB0aGVuIEBkeD0xMFxyXG5cdFx0QGR5ID0gMC45KkBkeFxyXG5cdFx0QHggPSBbXVxyXG5cdFx0QHkgPSBbXVxyXG5cdFx0Zm9yIGkgaW4gcmFuZ2UgQE4vMlxyXG5cdFx0XHRAeC5wdXNoIEBkeCArIGkgKiBAZHhcclxuXHRcdFx0QHkucHVzaCA0NS1AZHkvMlxyXG5cdFx0eDEgPSBAeC5zbGljZSgpXHJcblx0XHRfLnJldmVyc2UoQHgpXHJcblx0XHRAeCA9IHgxLmNvbmNhdCBAeFxyXG5cdFx0Zm9yIGkgaW4gcmFuZ2UgQE4vMlxyXG5cdFx0XHRAeS5wdXNoIDQ1K0BkeS8yXHJcblxyXG5cdGRyYXcgOiAtPlxyXG5cdFx0c3VwZXIoKVxyXG5cdFx0cGxheWVycyA9IGdsb2JhbHMucm9uZGVyW2dsb2JhbHMucm9uZF1cclxuXHRcdHRleHRTaXplIDAuNypAZHlcclxuXHJcblx0XHRmb3IgaVBsYWNlIGluIHJhbmdlIEBOIFxyXG5cdFx0XHRmaWxsICdncmF5J1xyXG5cdFx0XHRyZWN0IEB4W2lQbGFjZV0sQHlbaVBsYWNlXSxAZHgsQGR4XHJcblx0XHRcdGZpbGwgWyd3aGl0ZScsJ2JsYWNrJ11baVBsYWNlJTJdXHJcblx0XHRcdHRleHQgMStpUGxhY2UsQHhbaVBsYWNlXSxAeVtpUGxhY2VdXHJcblxyXG5cdFx0XHR5ID0gaWYgaVBsYWNlID49IEBOLzIgdGhlbiBAZHkgZWxzZSAtQGR5XHJcblx0XHRcdGZpbGwgaWYgcGxheWVyc1tpUGxhY2VdID09IDAgdGhlbiAncmVkJyBlbHNlICdibGFjaydcclxuXHRcdFx0dGV4dCBBTFBIQUJFVFtwbGF5ZXJzW2lQbGFjZV1dLEB4W2lQbGFjZV0sQHlbaVBsYWNlXSArIHlcclxuIl19
//# sourceURL=c:\github\2022-008-Berger\coffee\SA.coffee