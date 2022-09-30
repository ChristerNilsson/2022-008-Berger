// Generated by CoffeeScript 2.5.1
import {
  globals,
  invert
} from './globals.js';

import {
  ALPHABET,
  State,
  grid,
  markeraRond
} from './states.js';

export var SE = class SE extends State { // Berger Spelare
  setN() {
    this.N = globals.N;
    this.dx = 99 / this.N;
    if (this.dx > 10) {
      this.dx = 10;
    }
    this.dy = (100 - 12) / (this.N + 1);
    if (this.dy > 10) {
      this.dy = 10;
    }
    this.xoff = this.dx;
    return this.yoff = 6 + this.dy;
  }

  draw() {
    var i, iPlace, iPlayer, j, k, l, len, len1, len2, players, ref, ref1, ref2, rond;
    super.draw();
    textSize(this.dy / 2);
    ref = range(this.N);
    for (j = 0, len = ref.length; j < len; j++) {
      i = ref[j];
      fill(i === 0 ? 'red' : 'black');
      text(ALPHABET[i], this.dx / 2, this.yoff + this.dy / 2 + this.dy * i);
    }
    ref1 = range(this.N - 1);
    for (k = 0, len1 = ref1.length; k < len1; k++) {
      rond = ref1[k];
      players = invert(globals.ronder[rond]);
      fill('black');
      text(rond + 1, this.dx * 1.5 + this.dx * rond, this.yoff * 0.85);
      if (rond === globals.rond) {
        markeraRond(rond, this.xoff, this.dx, this.yoff, this.dy, this.N);
      }
      ref2 = range(this.N);
      for (l = 0, len2 = ref2.length; l < len2; l++) {
        iPlace = ref2[l];
        iPlayer = players[iPlace];
        fill(['white', 'black'][iPlayer % 2]);
        text(iPlayer + 1, this.xoff + this.dx / 2 + this.dx * rond, this.yoff + this.dy / 2 + this.dy * iPlace);
      }
    }
    return grid(this.xoff, this.dx, this.N - 1, this.yoff, this.dy, this.N);
  }

};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0UuanMiLCJzb3VyY2VSb290IjoiLi4iLCJzb3VyY2VzIjpbImNvZmZlZVxcU0UuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFBO0VBQVEsT0FBUjtFQUFnQixNQUFoQjtDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFRLFFBQVI7RUFBa0IsS0FBbEI7RUFBeUIsSUFBekI7RUFBK0IsV0FBL0I7Q0FBQSxNQUFBOztBQUVBLE9BQUEsSUFBYSxLQUFOLE1BQUEsR0FBQSxRQUFpQixNQUFqQixDQUFBO0VBRU4sSUFBTyxDQUFBLENBQUE7SUFDTixJQUFDLENBQUEsQ0FBRCxHQUFLLE9BQU8sQ0FBQztJQUNiLElBQUMsQ0FBQSxFQUFELEdBQU0sRUFBQSxHQUFHLElBQUMsQ0FBQTtJQUNWLElBQUcsSUFBQyxDQUFBLEVBQUQsR0FBTSxFQUFUO01BQWlCLElBQUMsQ0FBQSxFQUFELEdBQUksR0FBckI7O0lBQ0EsSUFBQyxDQUFBLEVBQUQsR0FBTSxDQUFDLEdBQUEsR0FBSSxFQUFMLENBQUEsR0FBUyxDQUFDLElBQUMsQ0FBQSxDQUFELEdBQUcsQ0FBSjtJQUNmLElBQUcsSUFBQyxDQUFBLEVBQUQsR0FBTSxFQUFUO01BQWlCLElBQUMsQ0FBQSxFQUFELEdBQUksR0FBckI7O0lBQ0EsSUFBQyxDQUFBLElBQUQsR0FBUSxJQUFDLENBQUE7V0FDVCxJQUFDLENBQUEsSUFBRCxHQUFRLENBQUEsR0FBRSxJQUFDLENBQUE7RUFQTDs7RUFTUCxJQUFNLENBQUEsQ0FBQTtBQUNQLFFBQUEsQ0FBQSxFQUFBLE1BQUEsRUFBQSxPQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBLElBQUEsRUFBQSxJQUFBLEVBQUEsT0FBQSxFQUFBLEdBQUEsRUFBQSxJQUFBLEVBQUEsSUFBQSxFQUFBO1NBREMsQ0FBQSxJQUNDLENBQUE7SUFFQSxRQUFBLENBQVMsSUFBQyxDQUFBLEVBQUQsR0FBSSxDQUFiO0FBQ0E7SUFBQSxLQUFBLHFDQUFBOztNQUNDLElBQUEsQ0FBUSxDQUFBLEtBQUcsQ0FBTixHQUFhLEtBQWIsR0FBd0IsT0FBN0I7TUFDQSxJQUFBLENBQUssUUFBUSxDQUFDLENBQUQsQ0FBYixFQUFpQixJQUFDLENBQUEsRUFBRCxHQUFJLENBQXJCLEVBQXVCLElBQUMsQ0FBQSxJQUFELEdBQU0sSUFBQyxDQUFBLEVBQUQsR0FBSSxDQUFWLEdBQVksSUFBQyxDQUFBLEVBQUQsR0FBSSxDQUF2QztJQUZEO0FBR0E7SUFBQSxLQUFBLHdDQUFBOztNQUNDLE9BQUEsR0FBVSxNQUFBLENBQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFELENBQXJCO01BQ1YsSUFBQSxDQUFLLE9BQUw7TUFDQSxJQUFBLENBQUssSUFBQSxHQUFLLENBQVYsRUFBWSxJQUFDLENBQUEsRUFBRCxHQUFJLEdBQUosR0FBUSxJQUFDLENBQUEsRUFBRCxHQUFJLElBQXhCLEVBQTZCLElBQUMsQ0FBQSxJQUFELEdBQU0sSUFBbkM7TUFFQSxJQUFHLElBQUEsS0FBUSxPQUFPLENBQUMsSUFBbkI7UUFBNkIsV0FBQSxDQUFZLElBQVosRUFBaUIsSUFBQyxDQUFBLElBQWxCLEVBQXVCLElBQUMsQ0FBQSxFQUF4QixFQUEyQixJQUFDLENBQUEsSUFBNUIsRUFBaUMsSUFBQyxDQUFBLEVBQWxDLEVBQXFDLElBQUMsQ0FBQSxDQUF0QyxFQUE3Qjs7QUFDQTtNQUFBLEtBQUEsd0NBQUE7O1FBQ0MsT0FBQSxHQUFVLE9BQU8sQ0FBQyxNQUFEO1FBQ2pCLElBQUEsQ0FBSyxDQUFDLE9BQUQsRUFBUyxPQUFULENBQWlCLENBQUMsT0FBQSxHQUFVLENBQVgsQ0FBdEI7UUFDQSxJQUFBLENBQUssT0FBQSxHQUFRLENBQWIsRUFBZSxJQUFDLENBQUEsSUFBRCxHQUFNLElBQUMsQ0FBQSxFQUFELEdBQUksQ0FBVixHQUFZLElBQUMsQ0FBQSxFQUFELEdBQUksSUFBL0IsRUFBcUMsSUFBQyxDQUFBLElBQUQsR0FBTSxJQUFDLENBQUEsRUFBRCxHQUFJLENBQVYsR0FBWSxJQUFDLENBQUEsRUFBRCxHQUFJLE1BQXJEO01BSEQ7SUFORDtXQVVBLElBQUEsQ0FBSyxJQUFDLENBQUEsSUFBTixFQUFXLElBQUMsQ0FBQSxFQUFaLEVBQWdCLElBQUMsQ0FBQSxDQUFELEdBQUcsQ0FBbkIsRUFBc0IsSUFBQyxDQUFBLElBQXZCLEVBQTZCLElBQUMsQ0FBQSxFQUE5QixFQUFrQyxJQUFDLENBQUEsQ0FBbkM7RUFqQks7O0FBWEEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2dsb2JhbHMsaW52ZXJ0fSBmcm9tICcuL2dsb2JhbHMuanMnXHJcbmltcG9ydCB7QUxQSEFCRVQsIFN0YXRlLCBncmlkLCBtYXJrZXJhUm9uZH0gZnJvbSAnLi9zdGF0ZXMuanMnXHJcblxyXG5leHBvcnQgY2xhc3MgU0UgZXh0ZW5kcyBTdGF0ZSAjIEJlcmdlciBTcGVsYXJlXHJcblxyXG5cdHNldE4gOiAtPlxyXG5cdFx0QE4gPSBnbG9iYWxzLk5cclxuXHRcdEBkeCA9IDk5L0BOXHJcblx0XHRpZiBAZHggPiAxMCB0aGVuIEBkeD0xMFxyXG5cdFx0QGR5ID0gKDEwMC0xMikvKEBOKzEpXHJcblx0XHRpZiBAZHkgPiAxMCB0aGVuIEBkeT0xMFxyXG5cdFx0QHhvZmYgPSBAZHhcclxuXHRcdEB5b2ZmID0gNitAZHlcclxuXHJcblx0ZHJhdzogLT5cclxuXHRcdHN1cGVyKClcclxuXHJcblx0XHR0ZXh0U2l6ZSBAZHkvMlxyXG5cdFx0Zm9yIGkgaW4gcmFuZ2UgQE5cclxuXHRcdFx0ZmlsbCBpZiBpPT0wIHRoZW4gJ3JlZCcgZWxzZSAnYmxhY2snXHJcblx0XHRcdHRleHQgQUxQSEFCRVRbaV0sQGR4LzIsQHlvZmYrQGR5LzIrQGR5KmlcclxuXHRcdGZvciByb25kIGluIHJhbmdlIEBOLTFcclxuXHRcdFx0cGxheWVycyA9IGludmVydCBnbG9iYWxzLnJvbmRlcltyb25kXVxyXG5cdFx0XHRmaWxsICdibGFjaydcclxuXHRcdFx0dGV4dCByb25kKzEsQGR4KjEuNStAZHgqcm9uZCxAeW9mZiowLjg1XHJcblxyXG5cdFx0XHRpZiByb25kID09IGdsb2JhbHMucm9uZCB0aGVuIG1hcmtlcmFSb25kIHJvbmQsQHhvZmYsQGR4LEB5b2ZmLEBkeSxATlxyXG5cdFx0XHRmb3IgaVBsYWNlIGluIHJhbmdlIEBOXHJcblx0XHRcdFx0aVBsYXllciA9IHBsYXllcnNbaVBsYWNlXVxyXG5cdFx0XHRcdGZpbGwgWyd3aGl0ZScsJ2JsYWNrJ11baVBsYXllciAlIDJdXHJcblx0XHRcdFx0dGV4dCBpUGxheWVyKzEsQHhvZmYrQGR4LzIrQGR4KnJvbmQsIEB5b2ZmK0BkeS8yK0BkeSppUGxhY2VcclxuXHRcdGdyaWQgQHhvZmYsQGR4LCBATi0xLCBAeW9mZiwgQGR5LCBATlxyXG4iXX0=
//# sourceURL=c:\github\2022-008-Berger\coffee\SE.coffee