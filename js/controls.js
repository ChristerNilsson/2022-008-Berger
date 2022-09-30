// Generated by CoffeeScript 2.5.1
var boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

import {
  globals
} from './globals.js';

export var Control = class Control {
  constructor(x1, y1, w1, h1, text1 = '', bg = 'black', fg1 = 'white') {
    this.x = x1;
    this.y = y1;
    this.w = w1;
    this.h = h1;
    this.text = text1;
    this.bg = bg;
    this.fg = fg1;
    this.visible = true;
    this.disabled = false;
    this.textSize = 2;
  }

  draw() {
    return console.log('Control.draw must be overriden!');
  }

  inside(x, y) {
    var ref, ref1, w;
    w = this.w * [height / width, width / height][1 - globals.TOGGLE];
    return (-w / 2 <= (ref = x - this.x) && ref <= w / 2) && (-this.h / 2 <= (ref1 = y - this.y) && ref1 <= this.h / 2);
  }

};

export var CDead = class CDead extends Control {
  constructor(x, y, text, fg = 'white') {
    super(x, y, 0, 0, text, 'black', fg);
  }

  draw() {
    push();
    textSize(2);
    fill('black');
    text(this.text, this.x, this.y);
    return pop();
  }

};

export var CRounded = class CRounded extends Control {
  constructor(x, y, w, h, text = '', clicker = null) {
    super(x, y, w, h, text, 'black', 'white');
    this.click = this.click.bind(this);
    this.clicker = clicker;
  }

  draw() {
    if (this.visible) {
      push();
      fill(this.disabled ? "gray" : 'black');
      rect(this.x, this.y, this.w, this.h, this.h / 2);
      textSize(this.textSize);
      fill(this.disabled ? "black" : 'white');
      text(this.text, this.x, this.y);
      return pop();
    }
  }

  click() {
    boundMethodCheck(this, CRounded);
    if (this.clicker) {
      return this.clicker();
    }
  }

};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbHMuanMiLCJzb3VyY2VSb290IjoiLi4iLCJzb3VyY2VzIjpbImNvZmZlZVxcY29udHJvbHMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFBOztBQUFBLE9BQUE7RUFBUSxPQUFSO0NBQUEsTUFBQTs7QUFFQSxPQUFBLElBQWEsVUFBTixNQUFBLFFBQUE7RUFDTixXQUFjLEdBQUEsSUFBQSxJQUFBLElBQUEsVUFBbUIsRUFBbkIsT0FBMEIsT0FBMUIsUUFBc0MsT0FBdEMsQ0FBQTtJQUFDLElBQUMsQ0FBQTtJQUFFLElBQUMsQ0FBQTtJQUFFLElBQUMsQ0FBQTtJQUFFLElBQUMsQ0FBQTtJQUFFLElBQUMsQ0FBQTtJQUFRLElBQUMsQ0FBQTtJQUFXLElBQUMsQ0FBQTtJQUNoRCxJQUFDLENBQUEsT0FBRCxHQUFXO0lBQ1gsSUFBQyxDQUFBLFFBQUQsR0FBWTtJQUNaLElBQUMsQ0FBQSxRQUFELEdBQVk7RUFIQzs7RUFJZCxJQUFPLENBQUEsQ0FBQTtXQUFHLE9BQU8sQ0FBQyxHQUFSLENBQVksaUNBQVo7RUFBSDs7RUFDUCxNQUFTLENBQUMsQ0FBRCxFQUFHLENBQUgsQ0FBQTtBQUNWLFFBQUEsR0FBQSxFQUFBLElBQUEsRUFBQTtJQUFFLENBQUEsR0FBSSxJQUFDLENBQUEsQ0FBRCxHQUFLLENBQUMsTUFBQSxHQUFPLEtBQVIsRUFBYyxLQUFBLEdBQU0sTUFBcEIsQ0FBMkIsQ0FBQyxDQUFBLEdBQUUsT0FBTyxDQUFDLE1BQVg7V0FDcEMsQ0FBQSxDQUFDLENBQUQsR0FBRyxDQUFILFdBQVEsQ0FBQSxHQUFFLElBQUMsQ0FBQSxFQUFYLE9BQUEsSUFBZ0IsQ0FBQSxHQUFFLENBQWxCLENBQUEsSUFBd0IsQ0FBQSxDQUFDLElBQUMsQ0FBQSxDQUFGLEdBQUksQ0FBSixZQUFTLENBQUEsR0FBRSxJQUFDLENBQUEsRUFBWixRQUFBLElBQWlCLElBQUMsQ0FBQSxDQUFELEdBQUcsQ0FBcEI7RUFGaEI7O0FBTkg7O0FBVVAsT0FBQSxJQUFhLFFBQU4sTUFBQSxNQUFBLFFBQW9CLFFBQXBCO0VBQ04sV0FBYyxDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssSUFBTCxFQUFVLEtBQUcsT0FBYixDQUFBO1NBQ2IsQ0FBTSxDQUFOLEVBQVEsQ0FBUixFQUFVLENBQVYsRUFBWSxDQUFaLEVBQWMsSUFBZCxFQUFtQixPQUFuQixFQUEyQixFQUEzQjtFQURhOztFQUVkLElBQU8sQ0FBQSxDQUFBO0lBQ04sSUFBQSxDQUFBO0lBQ0EsUUFBQSxDQUFTLENBQVQ7SUFDQSxJQUFBLENBQUssT0FBTDtJQUNBLElBQUEsQ0FBSyxJQUFDLENBQUEsSUFBTixFQUFXLElBQUMsQ0FBQSxDQUFaLEVBQWMsSUFBQyxDQUFBLENBQWY7V0FDQSxHQUFBLENBQUE7RUFMTTs7QUFIRDs7QUFVUCxPQUFBLElBQWEsV0FBTixNQUFBLFNBQUEsUUFBdUIsUUFBdkI7RUFDTixXQUFjLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLE9BQUssRUFBZCxZQUEyQixJQUEzQixDQUFBOztRQVdkLENBQUEsWUFBQSxDQUFBO0lBWGdDLElBQUMsQ0FBQTtFQUFuQjs7RUFFZCxJQUFPLENBQUEsQ0FBQTtJQUNOLElBQUcsSUFBQyxDQUFBLE9BQUo7TUFDQyxJQUFBLENBQUE7TUFDQSxJQUFBLENBQVEsSUFBQyxDQUFBLFFBQUosR0FBa0IsTUFBbEIsR0FBOEIsT0FBbkM7TUFDQSxJQUFBLENBQUssSUFBQyxDQUFBLENBQU4sRUFBUSxJQUFDLENBQUEsQ0FBVCxFQUFXLElBQUMsQ0FBQSxDQUFaLEVBQWMsSUFBQyxDQUFBLENBQWYsRUFBaUIsSUFBQyxDQUFBLENBQUQsR0FBRyxDQUFwQjtNQUNBLFFBQUEsQ0FBUyxJQUFDLENBQUEsUUFBVjtNQUNBLElBQUEsQ0FBUSxJQUFDLENBQUEsUUFBSixHQUFrQixPQUFsQixHQUErQixPQUFwQztNQUNBLElBQUEsQ0FBSyxJQUFDLENBQUEsSUFBTixFQUFXLElBQUMsQ0FBQSxDQUFaLEVBQWMsSUFBQyxDQUFBLENBQWY7YUFDQSxHQUFBLENBQUEsRUFQRDs7RUFETTs7RUFTUCxLQUFRLENBQUEsQ0FBQTsyQkFaSTtJQVlELElBQUcsSUFBQyxDQUFBLE9BQUo7YUFBaUIsSUFBQyxDQUFBLE9BQUQsQ0FBQSxFQUFqQjs7RUFBSDs7QUFaRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Z2xvYmFsc30gZnJvbSAnLi9nbG9iYWxzLmpzJ1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbnRyb2xcclxuXHRjb25zdHJ1Y3RvciA6IChAeCxAeSxAdyxAaCxAdGV4dD0nJyxAYmc9J2JsYWNrJyxAZmc9J3doaXRlJykgLT5cclxuXHRcdEB2aXNpYmxlID0gdHJ1ZVxyXG5cdFx0QGRpc2FibGVkID0gZmFsc2VcclxuXHRcdEB0ZXh0U2l6ZSA9IDJcclxuXHRkcmF3IDogLT4gY29uc29sZS5sb2cgJ0NvbnRyb2wuZHJhdyBtdXN0IGJlIG92ZXJyaWRlbiEnXHJcblx0aW5zaWRlIDogKHgseSkgLT5cclxuXHRcdHcgPSBAdyAqIFtoZWlnaHQvd2lkdGgsd2lkdGgvaGVpZ2h0XVsxLWdsb2JhbHMuVE9HR0xFXVxyXG5cdFx0LXcvMiA8PSB4LUB4IDw9IHcvMiBhbmQgLUBoLzIgPD0geS1AeSA8PSBAaC8yXHJcblxyXG5leHBvcnQgY2xhc3MgQ0RlYWQgZXh0ZW5kcyBDb250cm9sXHJcblx0Y29uc3RydWN0b3IgOiAoeCx5LHRleHQsZmc9J3doaXRlJykgLT5cclxuXHRcdHN1cGVyIHgseSwwLDAsdGV4dCwnYmxhY2snLGZnXHJcblx0ZHJhdyA6IC0+XHJcblx0XHRwdXNoKClcclxuXHRcdHRleHRTaXplIDJcclxuXHRcdGZpbGwgJ2JsYWNrJ1xyXG5cdFx0dGV4dCBAdGV4dCxAeCxAeVxyXG5cdFx0cG9wKClcclxuXHJcbmV4cG9ydCBjbGFzcyBDUm91bmRlZCBleHRlbmRzIENvbnRyb2xcclxuXHRjb25zdHJ1Y3RvciA6ICh4LHksdyxoLHRleHQ9JycsIEBjbGlja2VyPW51bGwpIC0+XHJcblx0XHRzdXBlciB4LHksdyxoLHRleHQsJ2JsYWNrJywnd2hpdGUnXHJcblx0ZHJhdyA6IC0+XHJcblx0XHRpZiBAdmlzaWJsZVxyXG5cdFx0XHRwdXNoKClcclxuXHRcdFx0ZmlsbCBpZiBAZGlzYWJsZWQgdGhlbiBcImdyYXlcIiBlbHNlICdibGFjaydcclxuXHRcdFx0cmVjdCBAeCxAeSxAdyxAaCxAaC8yXHJcblx0XHRcdHRleHRTaXplIEB0ZXh0U2l6ZVxyXG5cdFx0XHRmaWxsIGlmIEBkaXNhYmxlZCB0aGVuIFwiYmxhY2tcIiBlbHNlICd3aGl0ZSdcclxuXHRcdFx0dGV4dCBAdGV4dCxAeCxAeVxyXG5cdFx0XHRwb3AoKVxyXG5cdGNsaWNrIDogPT4gaWYgQGNsaWNrZXIgdGhlbiBAY2xpY2tlcigpXHJcbiJdfQ==
//# sourceURL=c:\github\2022-008-Berger\coffee\controls.coffee