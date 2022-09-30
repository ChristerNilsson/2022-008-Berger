// Generated by CoffeeScript 2.5.1
var createState;

import {
  globals
} from './globals.js';

import {
  setState,
  setN,
  setRond,
  SA,
  SB,
  SC,
  SD,
  SE
} from './states.js';

createState = function(key, klass) {
  return globals.states[key] = new klass(key);
};

window.windowResized = function() {
  return resizeCanvas(innerWidth, innerHeight);
};

window.setup = function() {
  var canvas;
  canvas = createCanvas(innerWidth, innerHeight);
  background('black');
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  angleMode(DEGREES);
  createState('SA', SA);
  createState('SB', SB);
  createState('SC', SC);
  createState('SD', SD);
  createState('SE', SE);
  setState('SD');
  setN(0);
  return setRond(0);
};

window.mousePressed = function() {
  return globals.currState.mouseClicked();
};

window.draw = function() {
  scale(width / 100, height / 100); // portrait
  strokeWeight(100 / height);
  background('gray');
  return globals.currState.draw();
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tldGNoLmpzIiwic291cmNlUm9vdCI6Ii4uIiwic291cmNlcyI6WyJjb2ZmZWVcXHNrZXRjaC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUE7O0FBQUEsT0FBQTtFQUFRLE9BQVI7Q0FBQSxNQUFBOztBQUNBLE9BQUE7RUFBUSxRQUFSO0VBQWtCLElBQWxCO0VBQXdCLE9BQXhCO0VBQWlDLEVBQWpDO0VBQW9DLEVBQXBDO0VBQXVDLEVBQXZDO0VBQTBDLEVBQTFDO0VBQTZDLEVBQTdDO0NBQUEsTUFBQTs7QUFFQSxXQUFBLEdBQWMsUUFBQSxDQUFDLEdBQUQsRUFBSyxLQUFMLENBQUE7U0FBZSxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUQsQ0FBZCxHQUFzQixJQUFJLEtBQUosQ0FBVSxHQUFWO0FBQXJDOztBQUVkLE1BQU0sQ0FBQyxhQUFQLEdBQXVCLFFBQUEsQ0FBQSxDQUFBO1NBQUcsWUFBQSxDQUFhLFVBQWIsRUFBeUIsV0FBekI7QUFBSDs7QUFFdkIsTUFBTSxDQUFDLEtBQVAsR0FBZSxRQUFBLENBQUEsQ0FBQTtBQUNmLE1BQUE7RUFBQyxNQUFBLEdBQVMsWUFBQSxDQUFhLFVBQWIsRUFBd0IsV0FBeEI7RUFFVCxVQUFBLENBQVcsT0FBWDtFQUNBLFNBQUEsQ0FBVSxNQUFWLEVBQWlCLE1BQWpCO0VBQ0EsUUFBQSxDQUFTLE1BQVQ7RUFDQSxTQUFBLENBQVUsT0FBVjtFQUVBLFdBQUEsQ0FBWSxJQUFaLEVBQWtCLEVBQWxCO0VBQ0EsV0FBQSxDQUFZLElBQVosRUFBa0IsRUFBbEI7RUFDQSxXQUFBLENBQVksSUFBWixFQUFrQixFQUFsQjtFQUNBLFdBQUEsQ0FBWSxJQUFaLEVBQWtCLEVBQWxCO0VBQ0EsV0FBQSxDQUFZLElBQVosRUFBa0IsRUFBbEI7RUFFQSxRQUFBLENBQVMsSUFBVDtFQUNBLElBQUEsQ0FBSyxDQUFMO1NBQ0EsT0FBQSxDQUFRLENBQVI7QUFoQmM7O0FBa0JmLE1BQU0sQ0FBQyxZQUFQLEdBQXNCLFFBQUEsQ0FBQSxDQUFBO1NBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxZQUFsQixDQUFBO0FBQUg7O0FBRXRCLE1BQU0sQ0FBQyxJQUFQLEdBQWMsUUFBQSxDQUFBLENBQUE7RUFDYixLQUFBLENBQU0sS0FBQSxHQUFNLEdBQVosRUFBZ0IsTUFBQSxHQUFPLEdBQXZCLEVBQUQ7RUFDQyxZQUFBLENBQWEsR0FBQSxHQUFJLE1BQWpCO0VBQ0EsVUFBQSxDQUFXLE1BQVg7U0FDQSxPQUFPLENBQUMsU0FBUyxDQUFDLElBQWxCLENBQUE7QUFKYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Z2xvYmFsc30gZnJvbSAnLi9nbG9iYWxzLmpzJ1xyXG5pbXBvcnQge3NldFN0YXRlLCBzZXROLCBzZXRSb25kLCBTQSxTQixTQyxTRCxTRX0gZnJvbSAnLi9zdGF0ZXMuanMnXHJcblxyXG5jcmVhdGVTdGF0ZSA9IChrZXksa2xhc3MpIC0+IGdsb2JhbHMuc3RhdGVzW2tleV0gPSBuZXcga2xhc3Mga2V5XHJcblxyXG53aW5kb3cud2luZG93UmVzaXplZCA9IC0+IHJlc2l6ZUNhbnZhcyBpbm5lcldpZHRoLCBpbm5lckhlaWdodFxyXG5cclxud2luZG93LnNldHVwID0gLT5cclxuXHRjYW52YXMgPSBjcmVhdGVDYW52YXMgaW5uZXJXaWR0aCxpbm5lckhlaWdodFxyXG5cclxuXHRiYWNrZ3JvdW5kICdibGFjaydcclxuXHR0ZXh0QWxpZ24gQ0VOVEVSLENFTlRFUlxyXG5cdHJlY3RNb2RlIENFTlRFUlxyXG5cdGFuZ2xlTW9kZSBERUdSRUVTXHJcblxyXG5cdGNyZWF0ZVN0YXRlICdTQScsIFNBXHJcblx0Y3JlYXRlU3RhdGUgJ1NCJywgU0JcclxuXHRjcmVhdGVTdGF0ZSAnU0MnLCBTQ1xyXG5cdGNyZWF0ZVN0YXRlICdTRCcsIFNEXHJcblx0Y3JlYXRlU3RhdGUgJ1NFJywgU0VcclxuXHJcblx0c2V0U3RhdGUgJ1NEJ1xyXG5cdHNldE4gMFxyXG5cdHNldFJvbmQgMFxyXG5cclxud2luZG93Lm1vdXNlUHJlc3NlZCA9IC0+IGdsb2JhbHMuY3VyclN0YXRlLm1vdXNlQ2xpY2tlZCgpXHJcblxyXG53aW5kb3cuZHJhdyA9IC0+XHJcblx0c2NhbGUgd2lkdGgvMTAwLGhlaWdodC8xMDAgIyBwb3J0cmFpdFxyXG5cdHN0cm9rZVdlaWdodCAxMDAvaGVpZ2h0XHJcblx0YmFja2dyb3VuZCAnZ3JheSdcclxuXHRnbG9iYWxzLmN1cnJTdGF0ZS5kcmF3KClcclxuIl19
//# sourceURL=c:\github\2022-008-Berger\coffee\sketch.coffee