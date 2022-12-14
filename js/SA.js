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
    //@drawControls()
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0EuanMiLCJzb3VyY2VSb290IjoiLi4iLCJzb3VyY2VzIjpbImNvZmZlZVxcU0EuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFBO0VBQVEsT0FBUjtDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFRLFFBQVI7RUFBa0IsSUFBbEI7RUFBd0IsS0FBeEI7Q0FBQSxNQUFBOztBQUVBLE9BQUEsSUFBYSxLQUFOLE1BQUEsR0FBQSxRQUFpQixNQUFqQixDQUFBO0VBRU4sSUFBTyxDQUFBLENBQUE7QUFFUixRQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxJQUFBLEVBQUEsR0FBQSxFQUFBLElBQUEsRUFBQSxPQUFBLEVBQUEsRUFBQTs7SUFDRSxJQUFDLENBQUEsQ0FBRCxHQUFLLE9BQU8sQ0FBQztJQUNiLElBQUMsQ0FBQSxFQUFELEdBQU0sR0FBQSxHQUFJLENBQUMsSUFBQyxDQUFBLENBQUQsR0FBRyxDQUFKLENBQUosR0FBVztJQUNqQixJQUFHLElBQUMsQ0FBQSxFQUFELEdBQU0sRUFBVDtNQUFpQixJQUFDLENBQUEsRUFBRCxHQUFJLEdBQXJCOztJQUNBLElBQUMsQ0FBQSxFQUFELEdBQU0sR0FBQSxHQUFJLElBQUMsQ0FBQTtJQUNYLElBQUMsQ0FBQSxDQUFELEdBQUs7SUFDTCxJQUFDLENBQUEsQ0FBRCxHQUFLO0FBQ0w7SUFBQSxLQUFBLHFDQUFBOztNQUNDLElBQUMsQ0FBQSxDQUFDLENBQUMsSUFBSCxDQUFRLElBQUMsQ0FBQSxFQUFELEdBQU0sQ0FBQSxHQUFJLElBQUMsQ0FBQSxFQUFuQjtNQUNBLElBQUMsQ0FBQSxDQUFDLENBQUMsSUFBSCxDQUFRLEVBQUEsR0FBRyxJQUFDLENBQUEsRUFBRCxHQUFJLENBQWY7SUFGRDtJQUdBLEVBQUEsR0FBSyxJQUFDLENBQUEsQ0FBQyxDQUFDLEtBQUgsQ0FBQTtJQUNMLENBQUMsQ0FBQyxPQUFGLENBQVUsSUFBQyxDQUFBLENBQVg7SUFDQSxJQUFDLENBQUEsQ0FBRCxHQUFLLEVBQUUsQ0FBQyxNQUFILENBQVUsSUFBQyxDQUFBLENBQVg7QUFDTDtBQUFBO0lBQUEsS0FBQSx3Q0FBQTs7bUJBQ0MsSUFBQyxDQUFBLENBQUMsQ0FBQyxJQUFILENBQVEsRUFBQSxHQUFHLElBQUMsQ0FBQSxFQUFELEdBQUksQ0FBZjtJQURELENBQUE7O0VBZk07O0VBa0JQLElBQU8sQ0FBQSxDQUFBO0FBQ1IsUUFBQSxNQUFBLEVBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxPQUFBLEVBQUEsR0FBQSxFQUFBLE9BQUEsRUFBQSxDQUFBOztJQUNFLE9BQUEsR0FBVSxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFUO0lBQ3hCLFFBQUEsQ0FBUyxHQUFBLEdBQUksSUFBQyxDQUFBLEVBQWQ7QUFFQTtBQUFBO0lBQUEsS0FBQSxxQ0FBQTs7TUFDQyxJQUFBLENBQUssTUFBTDtNQUNBLElBQUEsQ0FBSyxJQUFDLENBQUEsQ0FBQyxDQUFDLE1BQUQsQ0FBUCxFQUFnQixJQUFDLENBQUEsQ0FBQyxDQUFDLE1BQUQsQ0FBbEIsRUFBMkIsSUFBQyxDQUFBLEVBQTVCLEVBQStCLElBQUMsQ0FBQSxFQUFoQztNQUNBLElBQUEsQ0FBSyxDQUFDLE9BQUQsRUFBUyxPQUFULENBQWlCLENBQUMsTUFBQSxHQUFPLENBQVIsQ0FBdEI7TUFDQSxJQUFBLENBQUssQ0FBQSxHQUFFLE1BQVAsRUFBYyxJQUFDLENBQUEsQ0FBQyxDQUFDLE1BQUQsQ0FBaEIsRUFBeUIsSUFBQyxDQUFBLENBQUMsQ0FBQyxNQUFELENBQTNCO01BRUEsQ0FBQSxHQUFPLE1BQUEsSUFBVSxJQUFDLENBQUEsQ0FBRCxHQUFHLENBQWhCLEdBQXVCLElBQUMsQ0FBQSxFQUF4QixHQUFnQyxDQUFDLElBQUMsQ0FBQTtNQUN0QyxJQUFBLENBQVEsT0FBTyxDQUFDLE1BQUQsQ0FBUCxLQUFtQixDQUF0QixHQUE2QixLQUE3QixHQUF3QyxPQUE3QzttQkFDQSxJQUFBLENBQUssUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFELENBQVIsQ0FBYixFQUErQixJQUFDLENBQUEsQ0FBQyxDQUFDLE1BQUQsQ0FBakMsRUFBMEMsSUFBQyxDQUFBLENBQUMsQ0FBQyxNQUFELENBQUYsR0FBYSxDQUF2RDtJQVJELENBQUE7O0VBTE07O0FBcEJEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtnbG9iYWxzfSBmcm9tICcuL2dsb2JhbHMuanMnXHJcbmltcG9ydCB7QUxQSEFCRVQsIHNldE4sIFN0YXRlfSBmcm9tICcuL3N0YXRlcy5qcydcclxuXHJcbmV4cG9ydCBjbGFzcyBTQSBleHRlbmRzIFN0YXRlICMgSGFsdmJvcmRcclxuXHJcblx0c2V0TiA6IC0+XHJcblxyXG5cdFx0IyBieWdnIGtvb3JkaW5hdGxpc3RvclxyXG5cdFx0QE4gPSBnbG9iYWxzLk5cclxuXHRcdEBkeCA9IDEwMC8oQE4rMikqMlxyXG5cdFx0aWYgQGR4ID4gMTAgdGhlbiBAZHg9MTBcclxuXHRcdEBkeSA9IDAuOSpAZHhcclxuXHRcdEB4ID0gW11cclxuXHRcdEB5ID0gW11cclxuXHRcdGZvciBpIGluIHJhbmdlIEBOLzJcclxuXHRcdFx0QHgucHVzaCBAZHggKyBpICogQGR4XHJcblx0XHRcdEB5LnB1c2ggNDUtQGR5LzJcclxuXHRcdHgxID0gQHguc2xpY2UoKVxyXG5cdFx0Xy5yZXZlcnNlKEB4KVxyXG5cdFx0QHggPSB4MS5jb25jYXQgQHhcclxuXHRcdGZvciBpIGluIHJhbmdlIEBOLzJcclxuXHRcdFx0QHkucHVzaCA0NStAZHkvMlxyXG5cclxuXHRkcmF3IDogLT5cclxuXHRcdCNAZHJhd0NvbnRyb2xzKClcclxuXHRcdHBsYXllcnMgPSBnbG9iYWxzLnJvbmRlcltnbG9iYWxzLnJvbmRdXHJcblx0XHR0ZXh0U2l6ZSAwLjcqQGR5XHJcblxyXG5cdFx0Zm9yIGlQbGFjZSBpbiByYW5nZSBATiBcclxuXHRcdFx0ZmlsbCAnZ3JheSdcclxuXHRcdFx0cmVjdCBAeFtpUGxhY2VdLEB5W2lQbGFjZV0sQGR4LEBkeFxyXG5cdFx0XHRmaWxsIFsnd2hpdGUnLCdibGFjayddW2lQbGFjZSUyXVxyXG5cdFx0XHR0ZXh0IDEraVBsYWNlLEB4W2lQbGFjZV0sQHlbaVBsYWNlXVxyXG5cclxuXHRcdFx0eSA9IGlmIGlQbGFjZSA+PSBATi8yIHRoZW4gQGR5IGVsc2UgLUBkeVxyXG5cdFx0XHRmaWxsIGlmIHBsYXllcnNbaVBsYWNlXSA9PSAwIHRoZW4gJ3JlZCcgZWxzZSAnYmxhY2snXHJcblx0XHRcdHRleHQgQUxQSEFCRVRbcGxheWVyc1tpUGxhY2VdXSxAeFtpUGxhY2VdLEB5W2lQbGFjZV0gKyB5XHJcbiJdfQ==
//# sourceURL=c:\github\2022-008-Berger\coffee\SA.coffee