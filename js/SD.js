// Generated by CoffeeScript 2.5.1
import {
  globals
} from './globals.js';

import {
  ALPHABET,
  State,
  grid,
  markeraRond
} from './states.js';

export var SD = class SD extends State { // Berger Halvbord
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
    var i, iPlace, iPlayer, j, k, l, len, len1, len2, players, ref, ref1, ref2, rond, x, y;
    super.draw();
    textSize(0.5 * this.dy);
    ref = range(this.N);
    for (j = 0, len = ref.length; j < len; j++) {
      i = ref[j];
      fill('black');
      text(i + 1, 0.25 * this.dx, this.yoff + this.dy / 2 + this.dy * i);
      fill(i === 0 ? 'red' : 'black');
      text(ALPHABET[i], 0.75 * this.dx, this.yoff + this.dy / 2 + this.dy * i);
    }
    ref1 = range(this.N - 1);
    for (k = 0, len1 = ref1.length; k < len1; k++) {
      rond = ref1[k];
      players = globals.ronder[rond];
      if (rond === globals.rond) {
        markeraRond(rond, this.xoff, this.dx, this.yoff, this.dy, this.N);
      }
      fill('black');
      text(rond + 1, this.dx * 1.5 + this.dx * rond, this.yoff * 0.85);
      push();
      textSize(0.5 * this.dy);
      ref2 = range(this.N);
      for (l = 0, len2 = ref2.length; l < len2; l++) {
        iPlace = ref2[l];
        fill(['white', 'black'][iPlace % 2]);
        iPlayer = players[iPlace];
        textAlign([RIGHT, LEFT][iPlace % 2]);
        x = this.xoff + this.dx / 2 + this.dx * rond + [0.45 * this.dx, -0.45 * this.dx][iPlace % 2];
        y = this.yoff + 0.3 * this.dy + this.dy * iPlayer;
        text(1 + players[this.N - iPlace - 1], x, y);
      }
      pop();
    }
    return grid(this.xoff, this.dx, this.N - 1, this.yoff, this.dy, this.N);
  }

};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0QuanMiLCJzb3VyY2VSb290IjoiLi4iLCJzb3VyY2VzIjpbImNvZmZlZVxcU0QuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFBO0VBQVEsT0FBUjtDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFRLFFBQVI7RUFBa0IsS0FBbEI7RUFBeUIsSUFBekI7RUFBK0IsV0FBL0I7Q0FBQSxNQUFBOztBQUVBLE9BQUEsSUFBYSxLQUFOLE1BQUEsR0FBQSxRQUFpQixNQUFqQixDQUFBO0VBRU4sSUFBTyxDQUFBLENBQUE7SUFDTixJQUFDLENBQUEsQ0FBRCxHQUFLLE9BQU8sQ0FBQztJQUNiLElBQUMsQ0FBQSxFQUFELEdBQU0sRUFBQSxHQUFHLElBQUMsQ0FBQTtJQUNWLElBQUcsSUFBQyxDQUFBLEVBQUQsR0FBTSxFQUFUO01BQWlCLElBQUMsQ0FBQSxFQUFELEdBQUksR0FBckI7O0lBQ0EsSUFBQyxDQUFBLEVBQUQsR0FBTSxDQUFDLEdBQUEsR0FBSSxFQUFMLENBQUEsR0FBUyxDQUFDLElBQUMsQ0FBQSxDQUFELEdBQUcsQ0FBSjtJQUNmLElBQUcsSUFBQyxDQUFBLEVBQUQsR0FBTSxFQUFUO01BQWlCLElBQUMsQ0FBQSxFQUFELEdBQUksR0FBckI7O0lBQ0EsSUFBQyxDQUFBLElBQUQsR0FBUSxJQUFDLENBQUE7V0FDVCxJQUFDLENBQUEsSUFBRCxHQUFRLENBQUEsR0FBRSxJQUFDLENBQUE7RUFQTDs7RUFTUCxJQUFPLENBQUEsQ0FBQTtBQUNSLFFBQUEsQ0FBQSxFQUFBLE1BQUEsRUFBQSxPQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBLElBQUEsRUFBQSxJQUFBLEVBQUEsT0FBQSxFQUFBLEdBQUEsRUFBQSxJQUFBLEVBQUEsSUFBQSxFQUFBLElBQUEsRUFBQSxDQUFBLEVBQUE7U0FEQyxDQUFBLElBQ0MsQ0FBQTtJQUNBLFFBQUEsQ0FBUyxHQUFBLEdBQUksSUFBQyxDQUFBLEVBQWQ7QUFDQTtJQUFBLEtBQUEscUNBQUE7O01BQ0MsSUFBQSxDQUFLLE9BQUw7TUFDQSxJQUFBLENBQUssQ0FBQSxHQUFFLENBQVAsRUFBbUIsSUFBQSxHQUFLLElBQUMsQ0FBQSxFQUF6QixFQUE2QixJQUFDLENBQUEsSUFBRCxHQUFNLElBQUMsQ0FBQSxFQUFELEdBQUksQ0FBVixHQUFZLElBQUMsQ0FBQSxFQUFELEdBQUksQ0FBN0M7TUFDQSxJQUFBLENBQVEsQ0FBQSxLQUFHLENBQU4sR0FBYSxLQUFiLEdBQXdCLE9BQTdCO01BQ0EsSUFBQSxDQUFLLFFBQVEsQ0FBQyxDQUFELENBQWIsRUFBaUIsSUFBQSxHQUFLLElBQUMsQ0FBQSxFQUF2QixFQUEyQixJQUFDLENBQUEsSUFBRCxHQUFNLElBQUMsQ0FBQSxFQUFELEdBQUksQ0FBVixHQUFZLElBQUMsQ0FBQSxFQUFELEdBQUksQ0FBM0M7SUFKRDtBQU1BO0lBQUEsS0FBQSx3Q0FBQTs7TUFDQyxPQUFBLEdBQVUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFEO01BRXhCLElBQUcsSUFBQSxLQUFRLE9BQU8sQ0FBQyxJQUFuQjtRQUE2QixXQUFBLENBQVksSUFBWixFQUFpQixJQUFDLENBQUEsSUFBbEIsRUFBdUIsSUFBQyxDQUFBLEVBQXhCLEVBQTJCLElBQUMsQ0FBQSxJQUE1QixFQUFpQyxJQUFDLENBQUEsRUFBbEMsRUFBcUMsSUFBQyxDQUFBLENBQXRDLEVBQTdCOztNQUNBLElBQUEsQ0FBSyxPQUFMO01BQ0EsSUFBQSxDQUFLLElBQUEsR0FBSyxDQUFWLEVBQVksSUFBQyxDQUFBLEVBQUQsR0FBSSxHQUFKLEdBQVEsSUFBQyxDQUFBLEVBQUQsR0FBSSxJQUF4QixFQUE2QixJQUFDLENBQUEsSUFBRCxHQUFNLElBQW5DO01BRUEsSUFBQSxDQUFBO01BQ0EsUUFBQSxDQUFTLEdBQUEsR0FBSSxJQUFDLENBQUEsRUFBZDtBQUNBO01BQUEsS0FBQSx3Q0FBQTs7UUFDQyxJQUFBLENBQUssQ0FBQyxPQUFELEVBQVMsT0FBVCxDQUFpQixDQUFDLE1BQUEsR0FBTyxDQUFSLENBQXRCO1FBQ0EsT0FBQSxHQUFVLE9BQU8sQ0FBQyxNQUFEO1FBQ2pCLFNBQUEsQ0FBVSxDQUFDLEtBQUQsRUFBTyxJQUFQLENBQVksQ0FBQyxNQUFBLEdBQVMsQ0FBVixDQUF0QjtRQUNBLENBQUEsR0FBSSxJQUFDLENBQUEsSUFBRCxHQUFRLElBQUMsQ0FBQSxFQUFELEdBQUksQ0FBWixHQUFjLElBQUMsQ0FBQSxFQUFELEdBQUksSUFBbEIsR0FBeUIsQ0FBQyxJQUFBLEdBQUssSUFBQyxDQUFBLEVBQVAsRUFBVSxDQUFDLElBQUQsR0FBTSxJQUFDLENBQUEsRUFBakIsQ0FBb0IsQ0FBQyxNQUFBLEdBQVMsQ0FBVjtRQUNqRCxDQUFBLEdBQUksSUFBQyxDQUFBLElBQUQsR0FBUSxHQUFBLEdBQUksSUFBQyxDQUFBLEVBQWIsR0FBZ0IsSUFBQyxDQUFBLEVBQUQsR0FBSTtRQUN4QixJQUFBLENBQUssQ0FBQSxHQUFFLE9BQU8sQ0FBQyxJQUFDLENBQUEsQ0FBRCxHQUFHLE1BQUgsR0FBVSxDQUFYLENBQWQsRUFBNEIsQ0FBNUIsRUFBOEIsQ0FBOUI7TUFORDtNQVFBLEdBQUEsQ0FBQTtJQWpCRDtXQW1CQSxJQUFBLENBQUssSUFBQyxDQUFBLElBQU4sRUFBVyxJQUFDLENBQUEsRUFBWixFQUFnQixJQUFDLENBQUEsQ0FBRCxHQUFHLENBQW5CLEVBQXNCLElBQUMsQ0FBQSxJQUF2QixFQUE2QixJQUFDLENBQUEsRUFBOUIsRUFBa0MsSUFBQyxDQUFBLENBQW5DO0VBNUJNOztBQVhEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtnbG9iYWxzfSBmcm9tICcuL2dsb2JhbHMuanMnXHJcbmltcG9ydCB7QUxQSEFCRVQsIFN0YXRlLCBncmlkLCBtYXJrZXJhUm9uZH0gZnJvbSAnLi9zdGF0ZXMuanMnXHJcblxyXG5leHBvcnQgY2xhc3MgU0QgZXh0ZW5kcyBTdGF0ZSAjIEJlcmdlciBIYWx2Ym9yZFxyXG5cclxuXHRzZXROIDogLT5cclxuXHRcdEBOID0gZ2xvYmFscy5OXHJcblx0XHRAZHggPSA5OS9ATlxyXG5cdFx0aWYgQGR4ID4gMTAgdGhlbiBAZHg9MTBcclxuXHRcdEBkeSA9ICgxMDAtMTIpLyhATisxKVxyXG5cdFx0aWYgQGR5ID4gMTAgdGhlbiBAZHk9MTBcclxuXHRcdEB4b2ZmID0gQGR4XHJcblx0XHRAeW9mZiA9IDYrQGR5XHJcblxyXG5cdGRyYXcgOiAtPlxyXG5cdFx0c3VwZXIoKVxyXG5cdFx0dGV4dFNpemUgMC41KkBkeVxyXG5cdFx0Zm9yIGkgaW4gcmFuZ2UgQE5cclxuXHRcdFx0ZmlsbCAnYmxhY2snXHJcblx0XHRcdHRleHQgaSsxLCAgICAgICAgICAwLjI1KkBkeCwgQHlvZmYrQGR5LzIrQGR5KmlcclxuXHRcdFx0ZmlsbCBpZiBpPT0wIHRoZW4gJ3JlZCcgZWxzZSAnYmxhY2snXHJcblx0XHRcdHRleHQgQUxQSEFCRVRbaV0sMC43NSpAZHgsIEB5b2ZmK0BkeS8yK0BkeSppXHJcblxyXG5cdFx0Zm9yIHJvbmQgaW4gcmFuZ2UgQE4tMVxyXG5cdFx0XHRwbGF5ZXJzID0gZ2xvYmFscy5yb25kZXJbcm9uZF1cclxuXHJcblx0XHRcdGlmIHJvbmQgPT0gZ2xvYmFscy5yb25kIHRoZW4gbWFya2VyYVJvbmQgcm9uZCxAeG9mZixAZHgsQHlvZmYsQGR5LEBOXHJcblx0XHRcdGZpbGwgJ2JsYWNrJ1xyXG5cdFx0XHR0ZXh0IHJvbmQrMSxAZHgqMS41K0BkeCpyb25kLEB5b2ZmKjAuODVcclxuXHJcblx0XHRcdHB1c2goKVxyXG5cdFx0XHR0ZXh0U2l6ZSAwLjUqQGR5XHJcblx0XHRcdGZvciBpUGxhY2UgaW4gcmFuZ2UgQE5cclxuXHRcdFx0XHRmaWxsIFsnd2hpdGUnLCdibGFjayddW2lQbGFjZSUyXVxyXG5cdFx0XHRcdGlQbGF5ZXIgPSBwbGF5ZXJzW2lQbGFjZV1cclxuXHRcdFx0XHR0ZXh0QWxpZ24gW1JJR0hULExFRlRdW2lQbGFjZSAlIDJdXHJcblx0XHRcdFx0eCA9IEB4b2ZmICsgQGR4LzIrQGR4KnJvbmQgKyBbMC40NSpAZHgsLTAuNDUqQGR4XVtpUGxhY2UgJSAyXVxyXG5cdFx0XHRcdHkgPSBAeW9mZiArIDAuMypAZHkrQGR5KmlQbGF5ZXJcclxuXHRcdFx0XHR0ZXh0IDErcGxheWVyc1tATi1pUGxhY2UtMV0seCx5XHJcblxyXG5cdFx0XHRwb3AoKVxyXG5cclxuXHRcdGdyaWQgQHhvZmYsQGR4LCBATi0xLCBAeW9mZiwgQGR5LCBATlxyXG4iXX0=
//# sourceURL=c:\github\2022-008-Berger\coffee\SD.coffee