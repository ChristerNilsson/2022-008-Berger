// Generated by CoffeeScript 2.5.1
var Button, MenuButton, RectButton, calcr1r2;

export var dialogues = [];

export var showDialogue = function() {
  if (dialogues.length > 0) {
    return (_.last(dialogues)).show();
  }
};

calcr1r2 = function(n, w, h) {
  var r1, r2, s;
  s = Math.min(w, h);
  r2 = s / 7;
  r1 = s / 3;
  if (n > 6) {
    r2 *= 7 / n;
  }
  return [Math.round(r1), Math.round(r2)];
};

assert([200, 86], calcr1r2(4, 600, 800));

assert([200, 75], calcr1r2(8, 600, 800));

export var Dialogue = class Dialogue {
  constructor(x1 = width / 2, y1 = height / 2) {
    this.x = x1;
    this.y = y1;
    this.col = '#ff06';
    this.buttons = [];
    dialogues.push(this);
  }

  add(prompt, event) {
    return this.buttons.push(new Button(this, prompt, event));
  }

  clock(title = ' ', backPop = false, turn = 0) {
    var button, chars, i, j, len, n, r1, r2, ref, v;
    this.backPop = backPop;
    n = this.buttons.length;
    [r1, r2] = calcr1r2(n, width, height);
    ref = this.buttons;
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      button = ref[i];
      v = i * 360 / n + turn - 90;
      button.x = r1 * cos(v);
      button.y = r1 * sin(v);
      button.r = r2;
    }
    button = new Button(this, title, function() {
      if (this.dlg.backPop) {
        return dialogues.pop();
      } else {
        return dialogues.clear();
      }
    });
    button.x = 0;
    button.y = 0;
    button.r = r2;
    this.buttons.push(button);
    chars = _.max((function() {
      var k, len1, ref1, results;
      ref1 = this.buttons;
      results = [];
      for (k = 0, len1 = ref1.length; k < len1; k++) {
        button = ref1[k];
        results.push(button.title.length);
      }
      return results;
    }).call(this));
    this.textSize = chars === 1 ? 0.75 * r2 : 2.5 * r2 / chars;
    return console.log(this.buttons);
  }

  update(delta) { // -1 eller +1
    var i, j, len, ref, ref1, results;
    if ((0 <= (ref = this.pageStart + delta * this.pageSize) && ref < this.lst.length)) {
      this.pageStart += delta * this.pageSize;
      ref1 = range(this.pageSize);
      results = [];
      for (j = 0, len = ref1.length; j < len; j++) {
        i = ref1[j];
        if (this.pageStart + i < this.lst.length) {
          results.push(this.buttons[i].arr = this.lst[this.pageStart + i]);
        } else {
          results.push(this.buttons[i].arr = []);
        }
      }
      return results;
    }
  }

  list(lst, pageSize = 10, backPop = true, click = function(arr) {
      return print(arr[0]);
    }) {
    var h, i, item, j, len, n, ref, w, x, y;
    this.lst = lst;
    this.pageSize = pageSize;
    this.backPop = backPop;
    this.pageStart = 0;
    n = this.pageSize;
    x = 0;
    w = width;
    h = height / (this.pageSize + 1);
    this.buttons.clear();
    ref = range(this.pageStart, this.pageStart + n);
    for (j = 0, len = ref.length; j < len; j++) {
      i = ref[j];
      if (i < this.lst.length) {
        item = this.lst[i];
        y = i * h;
        ((item) => {
          return this.buttons.push(new RectButton(this, item, x, y, w, h, function() {
            return click(this.arr);
          }));
        })(item);
      }
    }
    this.buttons.push(new RectButton(this, ['Prev'], 0 * w / 3, h * n, w / 3, h, function() {
      return this.dlg.update(-1);
    }));
    this.buttons.push(new RectButton(this, ['Cancel'], 1 * w / 3, h * n, w / 3, h, function() {
      if (this.dlg.backPop) {
        return dialogues.pop();
      } else {
        return dialogues.clear();
      }
    }));
    return this.buttons.push(new RectButton(this, ['Next'], 2 * w / 3, h * n, w / 3, h, function() {
      return this.dlg.update(+1);
    }));
  }

  show() {
    var button, j, len, ref;
    push();
    translate(this.x, this.y);
    textSize(this.textSize);
    ref = this.buttons;
    for (j = 0, len = ref.length; j < len; j++) {
      button = ref[j];
      button.show(this);
    }
    return pop();
  }

  execute(mx, my) {
    var button, j, len, ref;
    ref = this.buttons;
    for (j = 0, len = ref.length; j < len; j++) {
      button = ref[j];
      if (button.inside(mx, my, this)) {
        button.execute();
        return true;
      }
    }
    return false;
  }

};

Button = class Button {
  constructor(dlg, title1, event1 = function() {
      return print(this.txt);
    }) {
    this.dlg = dlg;
    this.title = title1;
    this.event = event1;
    this.active = true;
  }

  info(title1, event1) {
    this.title = title1;
    this.event = event1;
    return this.active = true;
  }

  show() {
    var arr;
    //console.log 'show',@title,@x,@y
    if (this.active) {
      fill(this.dlg.col);
    } else {
      fill("#fff8");
    }
    stroke(0);
    ellipse(this.x, this.y, 2 * this.r, 2 * this.r);
    push();
    if (this.active) {
      fill(0);
    } else {
      fill("#888");
    }
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(this.dlg.textSize);
    arr = this.title.split(' ');
    if (arr.length === 1) {
      text(arr[0], this.x, this.y);
    } else {
      text(arr[0], this.x, this.y - 0.3 * this.r);
      text(arr[1], this.x, this.y + 0.3 * this.r);
    }
    return pop();
  }

  inside(mx, my) {
    return this.r > dist(mx, my, this.dlg.x + this.x, this.dlg.y + this.y);
  }

  execute() {
    
    //dump.store "Button #{@title} #{@active}"
    if (this.active) {
      return this.event();
    }
  }

};

RectButton = class RectButton {
  constructor(dlg, arr1, x1, y1, w1, h1, event1 = function() {
      return print(this.item);
    }) {
    this.dlg = dlg;
    this.arr = arr1;
    this.x = x1;
    this.y = y1;
    this.w = w1;
    this.h = h1;
    this.event = event1;
    this.active = true;
  }

  info(arr1, event1) {
    this.arr = arr1;
    this.event = event1;
    return this.active = true;
  }

  show() {
    var col;
    col = '#ff0';
    if (this.active) {
      fill(col);
    } else {
      fill("#fff8");
    }
    stroke(0);
    rect(this.x, this.y, this.w, this.h);
    push();
    if (this.active) {
      fill(0);
    } else {
      fill("#888");
    }
    noStroke();
    textSize(this.dlg.textSize);
    if (this.arr.length === 1) {
      textAlign(CENTER, CENTER);
      text(this.arr[0], this.x + this.w / 2, this.y + this.h / 2);
    }
    if (this.arr.length === 2) {
      textAlign(LEFT, CENTER);
      text(this.arr[0], this.x + 10, this.y + this.h / 2);
      textAlign(RIGHT, CENTER);
      text(this.arr[1], this.x + this.w - 10, this.y + this.h / 2);
    }
    if (this.arr.length === 3) {
      textAlign(LEFT, CENTER);
      text(this.arr[0], this.x + 10, this.y + this.h / 2);
      textAlign(CENTER, CENTER);
      text(this.arr[1], this.x + this.w / 2, this.y + this.h / 2);
      textAlign(RIGHT, CENTER);
      text(this.arr[2], this.x + this.w - 10, this.y + this.h / 2);
    } else {

    }
    return pop();
  }

  inside(mx, my) {
    return (this.x < mx && mx < this.x + this.w) && (this.y < my && my < this.y + this.h);
  }

  execute() {
    if (this.active) {
      return this.event();
    }
  }

};

MenuButton = class MenuButton {
  constructor() {
    this.d = (height + width) / 2 / 12 / 7;
    this.w = 7 * this.d;
    this.h = 7 * this.d;
    this.y = height - this.h - this.d;
    this.x = this.d;
  }

  draw() {
    fill("#fff8");
    sc(0);
    sw(1);
    rect(this.x, this.y, this.w, this.h);
    fill("#0008");
    rect(this.x + this.d, this.y + 1 * this.d, this.w - 2 * this.d, this.d);
    rect(this.x + this.d, this.y + 3 * this.d, this.w - 2 * this.d, this.d);
    return rect(this.x + this.d, this.y + 5 * this.d, this.w - 2 * this.d, this.d);
  }

  inside(mx, my) {
    return (this.x < mx && mx < this.x + this.w) && (this.y < my && my < this.y + this.h);
  }

  click() {
    if (dialogues.length === 0) {
      return menu1(); // else dialogues.clear()
    }
  }

};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9ndWUuanMiLCJzb3VyY2VSb290IjoiLi4iLCJzb3VyY2VzIjpbImNvZmZlZVxcZGlhbG9ndWUuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFBLE1BQUEsRUFBQSxVQUFBLEVBQUEsVUFBQSxFQUFBOztBQUFBLE9BQUEsSUFBTyxTQUFBLEdBQVk7O0FBRW5CLE9BQUEsSUFBTyxZQUFBLEdBQWUsUUFBQSxDQUFBLENBQUE7RUFDckIsSUFBRyxTQUFTLENBQUMsTUFBVixHQUFtQixDQUF0QjtXQUNDLENBQUMsQ0FBQyxDQUFDLElBQUYsQ0FBTyxTQUFQLENBQUQsQ0FBa0IsQ0FBQyxJQUFuQixDQUFBLEVBREQ7O0FBRHFCOztBQUl0QixRQUFBLEdBQVcsUUFBQSxDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxDQUFBO0FBQ1gsTUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBO0VBQUMsQ0FBQSxHQUFJLElBQUksQ0FBQyxHQUFMLENBQVMsQ0FBVCxFQUFXLENBQVg7RUFDSixFQUFBLEdBQUssQ0FBQSxHQUFFO0VBQ1AsRUFBQSxHQUFLLENBQUEsR0FBRTtFQUNQLElBQUcsQ0FBQSxHQUFJLENBQVA7SUFBYyxFQUFBLElBQU0sQ0FBQSxHQUFFLEVBQXRCOztTQUNBLENBQUMsSUFBSSxDQUFDLEtBQUwsQ0FBVyxFQUFYLENBQUQsRUFBZ0IsSUFBSSxDQUFDLEtBQUwsQ0FBVyxFQUFYLENBQWhCO0FBTFU7O0FBTVgsTUFBQSxDQUFPLENBQUMsR0FBRCxFQUFLLEVBQUwsQ0FBUCxFQUFpQixRQUFBLENBQVMsQ0FBVCxFQUFXLEdBQVgsRUFBZSxHQUFmLENBQWpCOztBQUNBLE1BQUEsQ0FBTyxDQUFDLEdBQUQsRUFBSyxFQUFMLENBQVAsRUFBaUIsUUFBQSxDQUFTLENBQVQsRUFBVyxHQUFYLEVBQWUsR0FBZixDQUFqQjs7QUFFQSxPQUFBLElBQWEsV0FBTixNQUFBLFNBQUE7RUFFTixXQUFjLE1BQU0sS0FBQSxHQUFNLENBQVosT0FBb0IsTUFBQSxHQUFPLENBQTNCLENBQUE7SUFBQyxJQUFDLENBQUE7SUFBYSxJQUFDLENBQUE7SUFDN0IsSUFBQyxDQUFBLEdBQUQsR0FBTztJQUNQLElBQUMsQ0FBQSxPQUFELEdBQVc7SUFDWCxTQUFTLENBQUMsSUFBVixDQUFlLElBQWY7RUFIYTs7RUFLZCxHQUFNLENBQUMsTUFBRCxFQUFRLEtBQVIsQ0FBQTtXQUFrQixJQUFDLENBQUEsT0FBTyxDQUFDLElBQVQsQ0FBYyxJQUFJLE1BQUosQ0FBVyxJQUFYLEVBQWEsTUFBYixFQUFvQixLQUFwQixDQUFkO0VBQWxCOztFQUVOLEtBQVEsQ0FBQyxRQUFPLEdBQVIsWUFBc0IsS0FBdEIsRUFBNkIsT0FBSyxDQUFsQyxDQUFBO0FBQ1QsUUFBQSxNQUFBLEVBQUEsS0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBLENBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEdBQUEsRUFBQTtJQURzQixJQUFDLENBQUE7SUFDckIsQ0FBQSxHQUFJLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFDYixDQUFDLEVBQUQsRUFBSSxFQUFKLENBQUEsR0FBVSxRQUFBLENBQVMsQ0FBVCxFQUFXLEtBQVgsRUFBaUIsTUFBakI7QUFDVjtJQUFBLEtBQUEsNkNBQUE7O01BQ0MsQ0FBQSxHQUFJLENBQUEsR0FBRSxHQUFGLEdBQU0sQ0FBTixHQUFVLElBQVYsR0FBaUI7TUFDckIsTUFBTSxDQUFDLENBQVAsR0FBVyxFQUFBLEdBQUcsR0FBQSxDQUFJLENBQUo7TUFDZCxNQUFNLENBQUMsQ0FBUCxHQUFXLEVBQUEsR0FBRyxHQUFBLENBQUksQ0FBSjtNQUNkLE1BQU0sQ0FBQyxDQUFQLEdBQVc7SUFKWjtJQUtBLE1BQUEsR0FBUyxJQUFJLE1BQUosQ0FBVyxJQUFYLEVBQWMsS0FBZCxFQUFxQixRQUFBLENBQUEsQ0FBQTtNQUM3QixJQUFHLElBQUMsQ0FBQSxHQUFHLENBQUMsT0FBUjtlQUFxQixTQUFTLENBQUMsR0FBVixDQUFBLEVBQXJCO09BQUEsTUFBQTtlQUEwQyxTQUFTLENBQUMsS0FBVixDQUFBLEVBQTFDOztJQUQ2QixDQUFyQjtJQUVULE1BQU0sQ0FBQyxDQUFQLEdBQVc7SUFDWCxNQUFNLENBQUMsQ0FBUCxHQUFXO0lBQ1gsTUFBTSxDQUFDLENBQVAsR0FBVztJQUNYLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxDQUFjLE1BQWQ7SUFDQSxLQUFBLEdBQVEsQ0FBQyxDQUFDLEdBQUY7O0FBQU87QUFBQTtNQUFBLEtBQUEsd0NBQUE7O3FCQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUM7TUFBYixDQUFBOztpQkFBUDtJQUNSLElBQUMsQ0FBQSxRQUFELEdBQWUsS0FBQSxLQUFTLENBQVosR0FBbUIsSUFBQSxHQUFLLEVBQXhCLEdBQWdDLEdBQUEsR0FBSSxFQUFKLEdBQU87V0FDbkQsT0FBTyxDQUFDLEdBQVIsQ0FBWSxJQUFDLENBQUEsT0FBYjtFQWhCTzs7RUFrQlIsTUFBUyxDQUFDLEtBQUQsQ0FBQSxFQUFBO0FBQ1YsUUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxHQUFBLEVBQUEsSUFBQSxFQUFBO0lBQUUsSUFBRyxDQUFBLENBQUEsV0FBSyxJQUFDLENBQUEsU0FBRCxHQUFhLEtBQUEsR0FBUSxJQUFDLENBQUEsU0FBM0IsT0FBQSxHQUFzQyxJQUFDLENBQUEsR0FBRyxDQUFDLE1BQTNDLENBQUg7TUFDQyxJQUFDLENBQUEsU0FBRCxJQUFjLEtBQUEsR0FBUSxJQUFDLENBQUE7QUFDdkI7QUFBQTtNQUFBLEtBQUEsc0NBQUE7O1FBQ0MsSUFBRyxJQUFDLENBQUEsU0FBRCxHQUFhLENBQWIsR0FBaUIsSUFBQyxDQUFBLEdBQUcsQ0FBQyxNQUF6Qjt1QkFDQyxJQUFDLENBQUEsT0FBTyxDQUFDLENBQUQsQ0FBRyxDQUFDLEdBQVosR0FBa0IsSUFBQyxDQUFBLEdBQUcsQ0FBQyxJQUFDLENBQUEsU0FBRCxHQUFhLENBQWQsR0FEdkI7U0FBQSxNQUFBO3VCQUdDLElBQUMsQ0FBQSxPQUFPLENBQUMsQ0FBRCxDQUFHLENBQUMsR0FBWixHQUFrQixJQUhuQjs7TUFERCxDQUFBO3FCQUZEOztFQURROztFQVNULElBQU8sSUFBQSxhQUFpQixFQUFqQixZQUE4QixJQUE5QixFQUFvQyxRQUFRLFFBQUEsQ0FBQyxHQUFELENBQUE7YUFBUyxLQUFBLENBQU0sR0FBRyxDQUFDLENBQUQsQ0FBVDtJQUFULENBQTVDLENBQUE7QUFDUixRQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsSUFBQSxFQUFBLENBQUEsRUFBQSxHQUFBLEVBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBO0lBRFMsSUFBQyxDQUFBO0lBQUssSUFBQyxDQUFBO0lBQWEsSUFBQyxDQUFBO0lBQzVCLElBQUMsQ0FBQSxTQUFELEdBQWE7SUFDYixDQUFBLEdBQUksSUFBQyxDQUFBO0lBQ0wsQ0FBQSxHQUFJO0lBQ0osQ0FBQSxHQUFJO0lBQ0osQ0FBQSxHQUFJLE1BQUEsR0FBTyxDQUFDLElBQUMsQ0FBQSxRQUFELEdBQVUsQ0FBWDtJQUNYLElBQUMsQ0FBQSxPQUFPLENBQUMsS0FBVCxDQUFBO0FBQ0E7SUFBQSxLQUFBLHFDQUFBOztNQUNDLElBQUcsQ0FBQSxHQUFJLElBQUMsQ0FBQSxHQUFHLENBQUMsTUFBWjtRQUNDLElBQUEsR0FBTyxJQUFDLENBQUEsR0FBRyxDQUFDLENBQUQ7UUFDWCxDQUFBLEdBQUksQ0FBQSxHQUFFO1FBQ0gsQ0FBQSxDQUFDLElBQUQsQ0FBQSxHQUFBO2lCQUFVLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxDQUFjLElBQUksVUFBSixDQUFlLElBQWYsRUFBa0IsSUFBbEIsRUFBd0IsQ0FBeEIsRUFBMEIsQ0FBMUIsRUFBNEIsQ0FBNUIsRUFBOEIsQ0FBOUIsRUFBaUMsUUFBQSxDQUFBLENBQUE7bUJBQUcsS0FBQSxDQUFNLElBQUMsQ0FBQSxHQUFQO1VBQUgsQ0FBakMsQ0FBZDtRQUFWLENBQUEsRUFBQyxNQUhMOztJQUREO0lBS0EsSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFULENBQWMsSUFBSSxVQUFKLENBQWUsSUFBZixFQUFrQixDQUFDLE1BQUQsQ0FBbEIsRUFBNEIsQ0FBQSxHQUFFLENBQUYsR0FBSSxDQUFoQyxFQUFrQyxDQUFBLEdBQUUsQ0FBcEMsRUFBdUMsQ0FBQSxHQUFFLENBQXpDLEVBQTJDLENBQTNDLEVBQThDLFFBQUEsQ0FBQSxDQUFBO2FBQUcsSUFBQyxDQUFBLEdBQUcsQ0FBQyxNQUFMLENBQVksQ0FBQyxDQUFiO0lBQUgsQ0FBOUMsQ0FBZDtJQUNBLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxDQUFjLElBQUksVUFBSixDQUFlLElBQWYsRUFBa0IsQ0FBQyxRQUFELENBQWxCLEVBQThCLENBQUEsR0FBRSxDQUFGLEdBQUksQ0FBbEMsRUFBb0MsQ0FBQSxHQUFFLENBQXRDLEVBQXlDLENBQUEsR0FBRSxDQUEzQyxFQUE2QyxDQUE3QyxFQUFnRCxRQUFBLENBQUEsQ0FBQTtNQUM3RCxJQUFHLElBQUMsQ0FBQSxHQUFHLENBQUMsT0FBUjtlQUFxQixTQUFTLENBQUMsR0FBVixDQUFBLEVBQXJCO09BQUEsTUFBQTtlQUEwQyxTQUFTLENBQUMsS0FBVixDQUFBLEVBQTFDOztJQUQ2RCxDQUFoRCxDQUFkO1dBRUEsSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFULENBQWMsSUFBSSxVQUFKLENBQWUsSUFBZixFQUFrQixDQUFDLE1BQUQsQ0FBbEIsRUFBNEIsQ0FBQSxHQUFFLENBQUYsR0FBSSxDQUFoQyxFQUFrQyxDQUFBLEdBQUUsQ0FBcEMsRUFBdUMsQ0FBQSxHQUFFLENBQXpDLEVBQTJDLENBQTNDLEVBQThDLFFBQUEsQ0FBQSxDQUFBO2FBQUcsSUFBQyxDQUFBLEdBQUcsQ0FBQyxNQUFMLENBQVksQ0FBQyxDQUFiO0lBQUgsQ0FBOUMsQ0FBZDtFQWZNOztFQWlCUCxJQUFPLENBQUEsQ0FBQTtBQUNSLFFBQUEsTUFBQSxFQUFBLENBQUEsRUFBQSxHQUFBLEVBQUE7SUFBRSxJQUFBLENBQUE7SUFDQSxTQUFBLENBQVUsSUFBQyxDQUFBLENBQVgsRUFBYSxJQUFDLENBQUEsQ0FBZDtJQUNBLFFBQUEsQ0FBUyxJQUFDLENBQUEsUUFBVjtBQUNBO0lBQUEsS0FBQSxxQ0FBQTs7TUFDQyxNQUFNLENBQUMsSUFBUCxDQUFZLElBQVo7SUFERDtXQUVBLEdBQUEsQ0FBQTtFQU5NOztFQVFQLE9BQVUsQ0FBQyxFQUFELEVBQUksRUFBSixDQUFBO0FBQ1gsUUFBQSxNQUFBLEVBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQTtBQUFFO0lBQUEsS0FBQSxxQ0FBQTs7TUFDQyxJQUFHLE1BQU0sQ0FBQyxNQUFQLENBQWMsRUFBZCxFQUFpQixFQUFqQixFQUFvQixJQUFwQixDQUFIO1FBQ0MsTUFBTSxDQUFDLE9BQVAsQ0FBQTtBQUNBLGVBQU8sS0FGUjs7SUFERDtXQUlBO0VBTFM7O0FBN0RKOztBQW9FRCxTQUFOLE1BQUEsT0FBQTtFQUNDLFdBQWMsSUFBQSxRQUFBLFdBQXdCLFFBQUEsQ0FBQSxDQUFBO2FBQUcsS0FBQSxDQUFNLElBQUMsQ0FBQSxHQUFQO0lBQUgsQ0FBeEIsQ0FBQTtJQUFDLElBQUMsQ0FBQTtJQUFLLElBQUMsQ0FBQTtJQUFPLElBQUMsQ0FBQTtJQUEwQixJQUFDLENBQUEsTUFBRCxHQUFVO0VBQXBEOztFQUNkLElBQU8sT0FBQSxRQUFBLENBQUE7SUFBQyxJQUFDLENBQUE7SUFBTSxJQUFDLENBQUE7V0FBVSxJQUFDLENBQUEsTUFBRCxHQUFVO0VBQTdCOztFQUNQLElBQU8sQ0FBQSxDQUFBO0FBQ1IsUUFBQSxHQUFBOztJQUNFLElBQUcsSUFBQyxDQUFBLE1BQUo7TUFBZ0IsSUFBQSxDQUFLLElBQUMsQ0FBQSxHQUFHLENBQUMsR0FBVixFQUFoQjtLQUFBLE1BQUE7TUFBbUMsSUFBQSxDQUFLLE9BQUwsRUFBbkM7O0lBQ0EsTUFBQSxDQUFPLENBQVA7SUFDQSxPQUFBLENBQVEsSUFBQyxDQUFBLENBQVQsRUFBVyxJQUFDLENBQUEsQ0FBWixFQUFjLENBQUEsR0FBRSxJQUFDLENBQUEsQ0FBakIsRUFBbUIsQ0FBQSxHQUFFLElBQUMsQ0FBQSxDQUF0QjtJQUNBLElBQUEsQ0FBQTtJQUNBLElBQUcsSUFBQyxDQUFBLE1BQUo7TUFBZ0IsSUFBQSxDQUFLLENBQUwsRUFBaEI7S0FBQSxNQUFBO01BQTRCLElBQUEsQ0FBSyxNQUFMLEVBQTVCOztJQUNBLFFBQUEsQ0FBQTtJQUNBLFNBQUEsQ0FBVSxNQUFWLEVBQWlCLE1BQWpCO0lBQ0EsUUFBQSxDQUFTLElBQUMsQ0FBQSxHQUFHLENBQUMsUUFBZDtJQUNBLEdBQUEsR0FBTSxJQUFDLENBQUEsS0FBSyxDQUFDLEtBQVAsQ0FBYSxHQUFiO0lBQ04sSUFBRyxHQUFHLENBQUMsTUFBSixLQUFjLENBQWpCO01BQ0MsSUFBQSxDQUFLLEdBQUcsQ0FBQyxDQUFELENBQVIsRUFBYSxJQUFDLENBQUEsQ0FBZCxFQUFnQixJQUFDLENBQUEsQ0FBakIsRUFERDtLQUFBLE1BQUE7TUFHQyxJQUFBLENBQUssR0FBRyxDQUFDLENBQUQsQ0FBUixFQUFhLElBQUMsQ0FBQSxDQUFkLEVBQWdCLElBQUMsQ0FBQSxDQUFELEdBQUcsR0FBQSxHQUFJLElBQUMsQ0FBQSxDQUF4QjtNQUNBLElBQUEsQ0FBSyxHQUFHLENBQUMsQ0FBRCxDQUFSLEVBQWEsSUFBQyxDQUFBLENBQWQsRUFBZ0IsSUFBQyxDQUFBLENBQUQsR0FBRyxHQUFBLEdBQUksSUFBQyxDQUFBLENBQXhCLEVBSkQ7O1dBS0EsR0FBQSxDQUFBO0VBaEJNOztFQWtCUCxNQUFTLENBQUMsRUFBRCxFQUFJLEVBQUosQ0FBQTtXQUFZLElBQUMsQ0FBQSxDQUFELEdBQUssSUFBQSxDQUFLLEVBQUwsRUFBUyxFQUFULEVBQWEsSUFBQyxDQUFBLEdBQUcsQ0FBQyxDQUFMLEdBQVMsSUFBQyxDQUFBLENBQXZCLEVBQTBCLElBQUMsQ0FBQSxHQUFHLENBQUMsQ0FBTCxHQUFTLElBQUMsQ0FBQSxDQUFwQztFQUFqQjs7RUFDVCxPQUFVLENBQUEsQ0FBQSxFQUFBOzs7SUFFVCxJQUFHLElBQUMsQ0FBQSxNQUFKO2FBQWdCLElBQUMsQ0FBQSxLQUFELENBQUEsRUFBaEI7O0VBRlM7O0FBdEJYOztBQTBCTSxhQUFOLE1BQUEsV0FBQTtFQUNDLFdBQWMsSUFBQSxNQUFBLElBQUEsSUFBQSxJQUFBLElBQUEsV0FBc0MsUUFBQSxDQUFBLENBQUE7YUFBRyxLQUFBLENBQU0sSUFBQyxDQUFBLElBQVA7SUFBSCxDQUF0QyxDQUFBO0lBQUMsSUFBQyxDQUFBO0lBQUssSUFBQyxDQUFBO0lBQUssSUFBQyxDQUFBO0lBQUcsSUFBQyxDQUFBO0lBQUcsSUFBQyxDQUFBO0lBQUcsSUFBQyxDQUFBO0lBQUcsSUFBQyxDQUFBO0lBQTJCLElBQUMsQ0FBQSxNQUFELEdBQVU7RUFBbkU7O0VBQ2QsSUFBTyxLQUFBLFFBQUEsQ0FBQTtJQUFDLElBQUMsQ0FBQTtJQUFJLElBQUMsQ0FBQTtXQUFVLElBQUMsQ0FBQSxNQUFELEdBQVU7RUFBM0I7O0VBQ1AsSUFBTyxDQUFBLENBQUE7QUFDUixRQUFBO0lBQUUsR0FBQSxHQUFNO0lBRU4sSUFBRyxJQUFDLENBQUEsTUFBSjtNQUFnQixJQUFBLENBQUssR0FBTCxFQUFoQjtLQUFBLE1BQUE7TUFBOEIsSUFBQSxDQUFLLE9BQUwsRUFBOUI7O0lBQ0EsTUFBQSxDQUFPLENBQVA7SUFDQSxJQUFBLENBQUssSUFBQyxDQUFBLENBQU4sRUFBUSxJQUFDLENBQUEsQ0FBVCxFQUFXLElBQUMsQ0FBQSxDQUFaLEVBQWMsSUFBQyxDQUFBLENBQWY7SUFDQSxJQUFBLENBQUE7SUFDQSxJQUFHLElBQUMsQ0FBQSxNQUFKO01BQWdCLElBQUEsQ0FBSyxDQUFMLEVBQWhCO0tBQUEsTUFBQTtNQUE0QixJQUFBLENBQUssTUFBTCxFQUE1Qjs7SUFDQSxRQUFBLENBQUE7SUFDQSxRQUFBLENBQVMsSUFBQyxDQUFBLEdBQUcsQ0FBQyxRQUFkO0lBQ0EsSUFBRyxJQUFDLENBQUEsR0FBRyxDQUFDLE1BQUwsS0FBZSxDQUFsQjtNQUNDLFNBQUEsQ0FBVSxNQUFWLEVBQWlCLE1BQWpCO01BQ0EsSUFBQSxDQUFLLElBQUMsQ0FBQSxHQUFHLENBQUMsQ0FBRCxDQUFULEVBQWMsSUFBQyxDQUFBLENBQUQsR0FBRyxJQUFDLENBQUEsQ0FBRCxHQUFHLENBQXBCLEVBQXNCLElBQUMsQ0FBQSxDQUFELEdBQUcsSUFBQyxDQUFBLENBQUQsR0FBRyxDQUE1QixFQUZEOztJQUdBLElBQUcsSUFBQyxDQUFBLEdBQUcsQ0FBQyxNQUFMLEtBQWUsQ0FBbEI7TUFDQyxTQUFBLENBQVUsSUFBVixFQUFlLE1BQWY7TUFDQSxJQUFBLENBQUssSUFBQyxDQUFBLEdBQUcsQ0FBQyxDQUFELENBQVQsRUFBYyxJQUFDLENBQUEsQ0FBRCxHQUFHLEVBQWpCLEVBQW9CLElBQUMsQ0FBQSxDQUFELEdBQUcsSUFBQyxDQUFBLENBQUQsR0FBRyxDQUExQjtNQUNBLFNBQUEsQ0FBVSxLQUFWLEVBQWdCLE1BQWhCO01BQ0EsSUFBQSxDQUFLLElBQUMsQ0FBQSxHQUFHLENBQUMsQ0FBRCxDQUFULEVBQWMsSUFBQyxDQUFBLENBQUQsR0FBRyxJQUFDLENBQUEsQ0FBSixHQUFNLEVBQXBCLEVBQXVCLElBQUMsQ0FBQSxDQUFELEdBQUcsSUFBQyxDQUFBLENBQUQsR0FBRyxDQUE3QixFQUpEOztJQUtBLElBQUcsSUFBQyxDQUFBLEdBQUcsQ0FBQyxNQUFMLEtBQWUsQ0FBbEI7TUFDQyxTQUFBLENBQVUsSUFBVixFQUFlLE1BQWY7TUFDQSxJQUFBLENBQUssSUFBQyxDQUFBLEdBQUcsQ0FBQyxDQUFELENBQVQsRUFBYyxJQUFDLENBQUEsQ0FBRCxHQUFHLEVBQWpCLEVBQW9CLElBQUMsQ0FBQSxDQUFELEdBQUcsSUFBQyxDQUFBLENBQUQsR0FBRyxDQUExQjtNQUNBLFNBQUEsQ0FBVSxNQUFWLEVBQWlCLE1BQWpCO01BQ0EsSUFBQSxDQUFLLElBQUMsQ0FBQSxHQUFHLENBQUMsQ0FBRCxDQUFULEVBQWMsSUFBQyxDQUFBLENBQUQsR0FBRyxJQUFDLENBQUEsQ0FBRCxHQUFHLENBQXBCLEVBQXNCLElBQUMsQ0FBQSxDQUFELEdBQUcsSUFBQyxDQUFBLENBQUQsR0FBRyxDQUE1QjtNQUNBLFNBQUEsQ0FBVSxLQUFWLEVBQWdCLE1BQWhCO01BQ0EsSUFBQSxDQUFLLElBQUMsQ0FBQSxHQUFHLENBQUMsQ0FBRCxDQUFULEVBQWMsSUFBQyxDQUFBLENBQUQsR0FBRyxJQUFDLENBQUEsQ0FBSixHQUFNLEVBQXBCLEVBQXVCLElBQUMsQ0FBQSxDQUFELEdBQUcsSUFBQyxDQUFBLENBQUQsR0FBRyxDQUE3QixFQU5EO0tBQUEsTUFBQTtBQUFBOztXQVFBLEdBQUEsQ0FBQTtFQTFCTTs7RUE0QlAsTUFBUyxDQUFDLEVBQUQsRUFBSSxFQUFKLENBQUE7V0FBWSxDQUFBLElBQUMsQ0FBQSxDQUFELEdBQUssRUFBTCxJQUFLLEVBQUwsR0FBVSxJQUFDLENBQUEsQ0FBRCxHQUFHLElBQUMsQ0FBQSxDQUFkLENBQUEsSUFBb0IsQ0FBQSxJQUFDLENBQUEsQ0FBRCxHQUFLLEVBQUwsSUFBSyxFQUFMLEdBQVUsSUFBQyxDQUFBLENBQUQsR0FBRyxJQUFDLENBQUEsQ0FBZDtFQUFoQzs7RUFDVCxPQUFVLENBQUEsQ0FBQTtJQUFHLElBQUcsSUFBQyxDQUFBLE1BQUo7YUFBZ0IsSUFBQyxDQUFBLEtBQUQsQ0FBQSxFQUFoQjs7RUFBSDs7QUFoQ1g7O0FBa0NNLGFBQU4sTUFBQSxXQUFBO0VBQ0MsV0FBYyxDQUFBLENBQUE7SUFDYixJQUFDLENBQUEsQ0FBRCxHQUFLLENBQUMsTUFBQSxHQUFPLEtBQVIsQ0FBQSxHQUFlLENBQWYsR0FBaUIsRUFBakIsR0FBb0I7SUFDekIsSUFBQyxDQUFBLENBQUQsR0FBSyxDQUFBLEdBQUUsSUFBQyxDQUFBO0lBQ1IsSUFBQyxDQUFBLENBQUQsR0FBSyxDQUFBLEdBQUUsSUFBQyxDQUFBO0lBQ1IsSUFBQyxDQUFBLENBQUQsR0FBSyxNQUFBLEdBQU8sSUFBQyxDQUFBLENBQVIsR0FBVSxJQUFDLENBQUE7SUFDaEIsSUFBQyxDQUFBLENBQUQsR0FBSyxJQUFDLENBQUE7RUFMTzs7RUFNZCxJQUFPLENBQUEsQ0FBQTtJQUNOLElBQUEsQ0FBSyxPQUFMO0lBQ0EsRUFBQSxDQUFHLENBQUg7SUFDQSxFQUFBLENBQUcsQ0FBSDtJQUNBLElBQUEsQ0FBSyxJQUFDLENBQUEsQ0FBTixFQUFRLElBQUMsQ0FBQSxDQUFULEVBQVcsSUFBQyxDQUFBLENBQVosRUFBYyxJQUFDLENBQUEsQ0FBZjtJQUNBLElBQUEsQ0FBSyxPQUFMO0lBQ0EsSUFBQSxDQUFLLElBQUMsQ0FBQSxDQUFELEdBQUcsSUFBQyxDQUFBLENBQVQsRUFBVyxJQUFDLENBQUEsQ0FBRCxHQUFHLENBQUEsR0FBRSxJQUFDLENBQUEsQ0FBakIsRUFBbUIsSUFBQyxDQUFBLENBQUQsR0FBRyxDQUFBLEdBQUUsSUFBQyxDQUFBLENBQXpCLEVBQTJCLElBQUMsQ0FBQSxDQUE1QjtJQUNBLElBQUEsQ0FBSyxJQUFDLENBQUEsQ0FBRCxHQUFHLElBQUMsQ0FBQSxDQUFULEVBQVcsSUFBQyxDQUFBLENBQUQsR0FBRyxDQUFBLEdBQUUsSUFBQyxDQUFBLENBQWpCLEVBQW1CLElBQUMsQ0FBQSxDQUFELEdBQUcsQ0FBQSxHQUFFLElBQUMsQ0FBQSxDQUF6QixFQUEyQixJQUFDLENBQUEsQ0FBNUI7V0FDQSxJQUFBLENBQUssSUFBQyxDQUFBLENBQUQsR0FBRyxJQUFDLENBQUEsQ0FBVCxFQUFXLElBQUMsQ0FBQSxDQUFELEdBQUcsQ0FBQSxHQUFFLElBQUMsQ0FBQSxDQUFqQixFQUFtQixJQUFDLENBQUEsQ0FBRCxHQUFHLENBQUEsR0FBRSxJQUFDLENBQUEsQ0FBekIsRUFBMkIsSUFBQyxDQUFBLENBQTVCO0VBUk07O0VBU1AsTUFBUyxDQUFDLEVBQUQsRUFBSSxFQUFKLENBQUE7V0FBVyxDQUFBLElBQUMsQ0FBQSxDQUFELEdBQUssRUFBTCxJQUFLLEVBQUwsR0FBVSxJQUFDLENBQUEsQ0FBRCxHQUFHLElBQUMsQ0FBQSxDQUFkLENBQUEsSUFBb0IsQ0FBQSxJQUFDLENBQUEsQ0FBRCxHQUFLLEVBQUwsSUFBSyxFQUFMLEdBQVUsSUFBQyxDQUFBLENBQUQsR0FBRyxJQUFDLENBQUEsQ0FBZDtFQUEvQjs7RUFDVCxLQUFRLENBQUEsQ0FBQTtJQUFHLElBQUcsU0FBUyxDQUFDLE1BQVYsS0FBb0IsQ0FBdkI7YUFBOEIsS0FBQSxDQUFBLEVBQTlCOztFQUFIOztBQWpCVCIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkaWFsb2d1ZXMgPSBbXVxyXG5cclxuZXhwb3J0IHNob3dEaWFsb2d1ZSA9IC0+IFxyXG5cdGlmIGRpYWxvZ3Vlcy5sZW5ndGggPiAwXHJcblx0XHQoXy5sYXN0IGRpYWxvZ3Vlcykuc2hvdygpXHJcblxyXG5jYWxjcjFyMiA9IChuLHcsaCkgLT5cclxuXHRzID0gTWF0aC5taW4gdyxoXHJcblx0cjIgPSBzLzdcclxuXHRyMSA9IHMvM1xyXG5cdGlmIG4gPiA2IHRoZW4gcjIgKj0gNy9uXHJcblx0W01hdGgucm91bmQocjEpLE1hdGgucm91bmQocjIpXVxyXG5hc3NlcnQgWzIwMCw4Nl0sIGNhbGNyMXIyIDQsNjAwLDgwMFxyXG5hc3NlcnQgWzIwMCw3NV0sIGNhbGNyMXIyIDgsNjAwLDgwMFxyXG5cclxuZXhwb3J0IGNsYXNzIERpYWxvZ3VlIFxyXG5cclxuXHRjb25zdHJ1Y3RvciA6IChAeCA9IHdpZHRoLzIsIEB5ID0gaGVpZ2h0LzIpIC0+IFxyXG5cdFx0QGNvbCA9ICcjZmYwNidcclxuXHRcdEBidXR0b25zID0gW11cclxuXHRcdGRpYWxvZ3Vlcy5wdXNoIEBcclxuXHJcblx0YWRkIDogKHByb21wdCxldmVudCkgLT4gQGJ1dHRvbnMucHVzaCBuZXcgQnV0dG9uIEAscHJvbXB0LGV2ZW50XHJcblxyXG5cdGNsb2NrIDogKHRpdGxlPSAnICcsIEBiYWNrUG9wPWZhbHNlLCB0dXJuPTApIC0+XHJcblx0XHRuID0gQGJ1dHRvbnMubGVuZ3RoXHJcblx0XHRbcjEscjJdID0gY2FsY3IxcjIgbix3aWR0aCxoZWlnaHRcclxuXHRcdGZvciBidXR0b24saSBpbiBAYnV0dG9uc1xyXG5cdFx0XHR2ID0gaSozNjAvbiArIHR1cm4gLSA5MFxyXG5cdFx0XHRidXR0b24ueCA9IHIxKmNvcyB2XHJcblx0XHRcdGJ1dHRvbi55ID0gcjEqc2luIHZcclxuXHRcdFx0YnV0dG9uLnIgPSByMlxyXG5cdFx0YnV0dG9uID0gbmV3IEJ1dHRvbiBALCB0aXRsZSwgLT4gXHJcblx0XHRcdGlmIEBkbGcuYmFja1BvcCB0aGVuIGRpYWxvZ3Vlcy5wb3AoKSBlbHNlIGRpYWxvZ3Vlcy5jbGVhcigpXHJcblx0XHRidXR0b24ueCA9IDBcclxuXHRcdGJ1dHRvbi55ID0gMFxyXG5cdFx0YnV0dG9uLnIgPSByMlxyXG5cdFx0QGJ1dHRvbnMucHVzaCBidXR0b25cclxuXHRcdGNoYXJzID0gXy5tYXggKGJ1dHRvbi50aXRsZS5sZW5ndGggZm9yIGJ1dHRvbiBpbiBAYnV0dG9ucylcclxuXHRcdEB0ZXh0U2l6ZSA9IGlmIGNoYXJzID09IDEgdGhlbiAwLjc1KnIyIGVsc2UgMi41KnIyL2NoYXJzXHJcblx0XHRjb25zb2xlLmxvZyBAYnV0dG9uc1xyXG5cclxuXHR1cGRhdGUgOiAoZGVsdGEpIC0+ICMgLTEgZWxsZXIgKzFcclxuXHRcdGlmIDAgPD0gQHBhZ2VTdGFydCArIGRlbHRhICogQHBhZ2VTaXplIDwgQGxzdC5sZW5ndGhcclxuXHRcdFx0QHBhZ2VTdGFydCArPSBkZWx0YSAqIEBwYWdlU2l6ZVxyXG5cdFx0XHRmb3IgaSBpbiByYW5nZSBAcGFnZVNpemVcclxuXHRcdFx0XHRpZiBAcGFnZVN0YXJ0ICsgaSA8IEBsc3QubGVuZ3RoXHJcblx0XHRcdFx0XHRAYnV0dG9uc1tpXS5hcnIgPSBAbHN0W0BwYWdlU3RhcnQgKyBpXSBcclxuXHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRAYnV0dG9uc1tpXS5hcnIgPSBbXVxyXG5cclxuXHRsaXN0IDogKEBsc3QsIEBwYWdlU2l6ZT0xMCwgQGJhY2tQb3A9dHJ1ZSwgY2xpY2sgPSAoYXJyKSAtPiBwcmludCBhcnJbMF0pIC0+XHJcblx0XHRAcGFnZVN0YXJ0ID0gMFxyXG5cdFx0biA9IEBwYWdlU2l6ZVxyXG5cdFx0eCA9IDBcclxuXHRcdHcgPSB3aWR0aFxyXG5cdFx0aCA9IGhlaWdodC8oQHBhZ2VTaXplKzEpXHJcblx0XHRAYnV0dG9ucy5jbGVhcigpXHJcblx0XHRmb3IgaSBpbiByYW5nZSBAcGFnZVN0YXJ0LEBwYWdlU3RhcnQgKyBuXHJcblx0XHRcdGlmIGkgPCBAbHN0Lmxlbmd0aFxyXG5cdFx0XHRcdGl0ZW0gPSBAbHN0W2ldXHJcblx0XHRcdFx0eSA9IGkqaFxyXG5cdFx0XHRcdGRvIChpdGVtKSA9PiBAYnV0dG9ucy5wdXNoIG5ldyBSZWN0QnV0dG9uIEAsIGl0ZW0sIHgseSx3LGgsIC0+IGNsaWNrIEBhcnJcclxuXHRcdEBidXR0b25zLnB1c2ggbmV3IFJlY3RCdXR0b24gQCwgWydQcmV2J10sIDAqdy8zLGgqbiwgdy8zLGgsIC0+IEBkbGcudXBkYXRlIC0xIFxyXG5cdFx0QGJ1dHRvbnMucHVzaCBuZXcgUmVjdEJ1dHRvbiBALCBbJ0NhbmNlbCddLCAxKncvMyxoKm4sIHcvMyxoLCAtPiBcclxuXHRcdFx0aWYgQGRsZy5iYWNrUG9wIHRoZW4gZGlhbG9ndWVzLnBvcCgpIGVsc2UgZGlhbG9ndWVzLmNsZWFyKClcclxuXHRcdEBidXR0b25zLnB1c2ggbmV3IFJlY3RCdXR0b24gQCwgWydOZXh0J10sIDIqdy8zLGgqbiwgdy8zLGgsIC0+IEBkbGcudXBkYXRlICsxIFxyXG5cclxuXHRzaG93IDogLT5cclxuXHRcdHB1c2goKVxyXG5cdFx0dHJhbnNsYXRlIEB4LEB5XHJcblx0XHR0ZXh0U2l6ZSBAdGV4dFNpemVcclxuXHRcdGZvciBidXR0b24gaW4gQGJ1dHRvbnNcclxuXHRcdFx0YnV0dG9uLnNob3cgQFxyXG5cdFx0cG9wKClcclxuXHJcblx0ZXhlY3V0ZSA6IChteCxteSkgLT5cclxuXHRcdGZvciBidXR0b24gaW4gQGJ1dHRvbnNcclxuXHRcdFx0aWYgYnV0dG9uLmluc2lkZSBteCxteSxAXHJcblx0XHRcdFx0YnV0dG9uLmV4ZWN1dGUoKVxyXG5cdFx0XHRcdHJldHVybiB0cnVlXHJcblx0XHRmYWxzZSBcclxuXHJcbmNsYXNzIEJ1dHRvbiBcclxuXHRjb25zdHJ1Y3RvciA6IChAZGxnLCBAdGl0bGUsIEBldmVudCA9IC0+IHByaW50IEB0eHQpIC0+IEBhY3RpdmUgPSB0cnVlIFxyXG5cdGluZm8gOiAoQHRpdGxlLEBldmVudCkgLT4gQGFjdGl2ZSA9IHRydWVcclxuXHRzaG93IDogLT5cclxuXHRcdCNjb25zb2xlLmxvZyAnc2hvdycsQHRpdGxlLEB4LEB5XHJcblx0XHRpZiBAYWN0aXZlIHRoZW4gZmlsbCBAZGxnLmNvbCBlbHNlIGZpbGwgXCIjZmZmOFwiXHJcblx0XHRzdHJva2UgMFxyXG5cdFx0ZWxsaXBzZSBAeCxAeSwyKkByLDIqQHJcclxuXHRcdHB1c2goKVxyXG5cdFx0aWYgQGFjdGl2ZSB0aGVuIGZpbGwgMCBlbHNlIGZpbGwgXCIjODg4XCJcclxuXHRcdG5vU3Ryb2tlKClcclxuXHRcdHRleHRBbGlnbiBDRU5URVIsQ0VOVEVSXHJcblx0XHR0ZXh0U2l6ZSBAZGxnLnRleHRTaXplXHJcblx0XHRhcnIgPSBAdGl0bGUuc3BsaXQgJyAnXHJcblx0XHRpZiBhcnIubGVuZ3RoID09IDEgXHJcblx0XHRcdHRleHQgYXJyWzBdLCBAeCxAeVxyXG5cdFx0ZWxzZSBcclxuXHRcdFx0dGV4dCBhcnJbMF0sIEB4LEB5LTAuMypAclxyXG5cdFx0XHR0ZXh0IGFyclsxXSwgQHgsQHkrMC4zKkByXHJcblx0XHRwb3AoKVxyXG5cclxuXHRpbnNpZGUgOiAobXgsbXkpIC0+ICBAciA+IGRpc3QgbXgsIG15LCBAZGxnLnggKyBAeCwgQGRsZy55ICsgQHkgXHJcblx0ZXhlY3V0ZSA6IC0+IFxyXG5cdFx0I2R1bXAuc3RvcmUgXCJCdXR0b24gI3tAdGl0bGV9ICN7QGFjdGl2ZX1cIlxyXG5cdFx0aWYgQGFjdGl2ZSB0aGVuIEBldmVudCgpXHJcblxyXG5jbGFzcyBSZWN0QnV0dG9uIFxyXG5cdGNvbnN0cnVjdG9yIDogKEBkbGcsIEBhcnIsIEB4LCBAeSwgQHcsIEBoLCBAZXZlbnQgPSAtPiBwcmludCBAaXRlbSkgLT4gQGFjdGl2ZSA9IHRydWUgXHJcblx0aW5mbyA6IChAYXJyLEBldmVudCkgLT4gQGFjdGl2ZSA9IHRydWVcclxuXHRzaG93IDogLT5cclxuXHRcdGNvbCA9ICcjZmYwJ1xyXG5cclxuXHRcdGlmIEBhY3RpdmUgdGhlbiBmaWxsIGNvbCBlbHNlIGZpbGwgXCIjZmZmOFwiXHJcblx0XHRzdHJva2UgMFxyXG5cdFx0cmVjdCBAeCxAeSxAdyxAaFxyXG5cdFx0cHVzaCgpXHJcblx0XHRpZiBAYWN0aXZlIHRoZW4gZmlsbCAwIGVsc2UgZmlsbCBcIiM4ODhcIlxyXG5cdFx0bm9TdHJva2UoKVxyXG5cdFx0dGV4dFNpemUgQGRsZy50ZXh0U2l6ZVxyXG5cdFx0aWYgQGFyci5sZW5ndGggPT0gMVxyXG5cdFx0XHR0ZXh0QWxpZ24gQ0VOVEVSLENFTlRFUlxyXG5cdFx0XHR0ZXh0IEBhcnJbMF0sIEB4K0B3LzIsQHkrQGgvMlx0XHRcdFxyXG5cdFx0aWYgQGFyci5sZW5ndGggPT0gMlxyXG5cdFx0XHR0ZXh0QWxpZ24gTEVGVCxDRU5URVJcclxuXHRcdFx0dGV4dCBAYXJyWzBdLCBAeCsxMCxAeStAaC8yXHJcblx0XHRcdHRleHRBbGlnbiBSSUdIVCxDRU5URVJcclxuXHRcdFx0dGV4dCBAYXJyWzFdLCBAeCtAdy0xMCxAeStAaC8yXHJcblx0XHRpZiBAYXJyLmxlbmd0aCA9PSAzXHJcblx0XHRcdHRleHRBbGlnbiBMRUZULENFTlRFUlxyXG5cdFx0XHR0ZXh0IEBhcnJbMF0sIEB4KzEwLEB5K0BoLzJcclxuXHRcdFx0dGV4dEFsaWduIENFTlRFUixDRU5URVJcclxuXHRcdFx0dGV4dCBAYXJyWzFdLCBAeCtAdy8yLEB5K0BoLzJcdFx0XHRcclxuXHRcdFx0dGV4dEFsaWduIFJJR0hULENFTlRFUlxyXG5cdFx0XHR0ZXh0IEBhcnJbMl0sIEB4K0B3LTEwLEB5K0BoLzJcclxuXHRcdGVsc2VcclxuXHRcdHBvcCgpXHJcblxyXG5cdGluc2lkZSA6IChteCxteSkgLT4gIEB4IDwgbXggPCBAeCtAdyBhbmQgQHkgPCBteSA8IEB5K0BoXHJcblx0ZXhlY3V0ZSA6IC0+IGlmIEBhY3RpdmUgdGhlbiBAZXZlbnQoKVxyXG5cclxuY2xhc3MgTWVudUJ1dHRvblxyXG5cdGNvbnN0cnVjdG9yIDogLT5cclxuXHRcdEBkID0gKGhlaWdodCt3aWR0aCkvMi8xMi83XHJcblx0XHRAdyA9IDcqQGRcclxuXHRcdEBoID0gNypAZFxyXG5cdFx0QHkgPSBoZWlnaHQtQGgtQGRcclxuXHRcdEB4ID0gQGRcclxuXHRkcmF3IDogLT5cclxuXHRcdGZpbGwgXCIjZmZmOFwiXHJcblx0XHRzYyAwXHJcblx0XHRzdyAxXHJcblx0XHRyZWN0IEB4LEB5LEB3LEBoXHJcblx0XHRmaWxsIFwiIzAwMDhcIlxyXG5cdFx0cmVjdCBAeCtAZCxAeSsxKkBkLEB3LTIqQGQsQGRcclxuXHRcdHJlY3QgQHgrQGQsQHkrMypAZCxAdy0yKkBkLEBkXHJcblx0XHRyZWN0IEB4K0BkLEB5KzUqQGQsQHctMipAZCxAZFxyXG5cdGluc2lkZSA6IChteCxteSkgLT4gQHggPCBteCA8IEB4K0B3IGFuZCBAeSA8IG15IDwgQHkrQGhcclxuXHRjbGljayA6IC0+IGlmIGRpYWxvZ3Vlcy5sZW5ndGggPT0gMCB0aGVuIG1lbnUxKCkgIyBlbHNlIGRpYWxvZ3Vlcy5jbGVhcigpXHJcbiJdfQ==
//# sourceURL=c:\github\2022-008-Berger\coffee\dialogue.coffee