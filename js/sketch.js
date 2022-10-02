// Generated by CoffeeScript 2.5.1
var createState;

import {
  globals
} from './globals.js';

import {
  setState,
  setN,
  setRond
} from './states.js';

import {
  SA
} from './SA.js';

import {
  SB
} from './SB.js';

import {
  SC
} from './SC.js';

import {
  SD
} from './SD.js';

import {
  SE
} from './SE.js';

import {
  SF
} from './SF.js';

import {
  SG
} from './SG.js';

import {
  SH
} from './SH.js';

createState = function(key, klass) {
  return globals.states[key] = new klass(key);
};

window.windowResized = function() {
  return resizeCanvas(innerWidth, innerHeight);
};

window.setup = function() {
  var canvas;
  canvas = createCanvas(innerWidth, innerHeight); //,SVG
  background('black');
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  angleMode(DEGREES);
  createState('SA', SA);
  createState('SB', SB);
  createState('SC', SC);
  createState('SD', SD);
  createState('SE', SE);
  createState('SF', SF);
  createState('SG', SG);
  createState('SH', SH);
  setState('SG');
  setN(0);
  return setRond(0);
};

window.mouseClicked = function() {
  return globals.currState.mouseClicked();
};

window.draw = function() {
  scale(width / 100, height / 100); // portrait
  strokeWeight(100 / height);
  background('gray');
  globals.currState.drawControls();
  return globals.currState.draw();
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tldGNoLmpzIiwic291cmNlUm9vdCI6Ii4uIiwic291cmNlcyI6WyJjb2ZmZWVcXHNrZXRjaC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUE7O0FBQUEsT0FBQTtFQUFRLE9BQVI7Q0FBQSxNQUFBOztBQUNBLE9BQUE7RUFBUSxRQUFSO0VBQWtCLElBQWxCO0VBQXdCLE9BQXhCO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVEsRUFBUjtDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFRLEVBQVI7Q0FBQSxNQUFBOztBQUNBLE9BQUE7RUFBUSxFQUFSO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVEsRUFBUjtDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFRLEVBQVI7Q0FBQSxNQUFBOztBQUNBLE9BQUE7RUFBUSxFQUFSO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVEsRUFBUjtDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFRLEVBQVI7Q0FBQSxNQUFBOztBQUVBLFdBQUEsR0FBYyxRQUFBLENBQUMsR0FBRCxFQUFLLEtBQUwsQ0FBQTtTQUFlLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRCxDQUFkLEdBQXNCLElBQUksS0FBSixDQUFVLEdBQVY7QUFBckM7O0FBRWQsTUFBTSxDQUFDLGFBQVAsR0FBdUIsUUFBQSxDQUFBLENBQUE7U0FBRyxZQUFBLENBQWEsVUFBYixFQUF5QixXQUF6QjtBQUFIOztBQUV2QixNQUFNLENBQUMsS0FBUCxHQUFlLFFBQUEsQ0FBQSxDQUFBO0FBQ2YsTUFBQTtFQUFDLE1BQUEsR0FBUyxZQUFBLENBQWEsVUFBYixFQUF3QixXQUF4QixFQUFWO0VBRUMsVUFBQSxDQUFXLE9BQVg7RUFDQSxTQUFBLENBQVUsTUFBVixFQUFpQixNQUFqQjtFQUNBLFFBQUEsQ0FBUyxNQUFUO0VBQ0EsU0FBQSxDQUFVLE9BQVY7RUFFQSxXQUFBLENBQVksSUFBWixFQUFrQixFQUFsQjtFQUNBLFdBQUEsQ0FBWSxJQUFaLEVBQWtCLEVBQWxCO0VBQ0EsV0FBQSxDQUFZLElBQVosRUFBa0IsRUFBbEI7RUFDQSxXQUFBLENBQVksSUFBWixFQUFrQixFQUFsQjtFQUNBLFdBQUEsQ0FBWSxJQUFaLEVBQWtCLEVBQWxCO0VBQ0EsV0FBQSxDQUFZLElBQVosRUFBa0IsRUFBbEI7RUFDQSxXQUFBLENBQVksSUFBWixFQUFrQixFQUFsQjtFQUNBLFdBQUEsQ0FBWSxJQUFaLEVBQWtCLEVBQWxCO0VBRUEsUUFBQSxDQUFTLElBQVQ7RUFDQSxJQUFBLENBQUssQ0FBTDtTQUNBLE9BQUEsQ0FBUSxDQUFSO0FBbkJjOztBQXFCZixNQUFNLENBQUMsWUFBUCxHQUFzQixRQUFBLENBQUEsQ0FBQTtTQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsWUFBbEIsQ0FBQTtBQUFIOztBQUV0QixNQUFNLENBQUMsSUFBUCxHQUFjLFFBQUEsQ0FBQSxDQUFBO0VBQ2IsS0FBQSxDQUFNLEtBQUEsR0FBTSxHQUFaLEVBQWdCLE1BQUEsR0FBTyxHQUF2QixFQUFEO0VBQ0MsWUFBQSxDQUFhLEdBQUEsR0FBSSxNQUFqQjtFQUNBLFVBQUEsQ0FBVyxNQUFYO0VBQ0EsT0FBTyxDQUFDLFNBQVMsQ0FBQyxZQUFsQixDQUFBO1NBQ0EsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFsQixDQUFBO0FBTGEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2dsb2JhbHN9IGZyb20gJy4vZ2xvYmFscy5qcydcclxuaW1wb3J0IHtzZXRTdGF0ZSwgc2V0Tiwgc2V0Um9uZH0gZnJvbSAnLi9zdGF0ZXMuanMnXHJcbmltcG9ydCB7U0F9IGZyb20gJy4vU0EuanMnXHJcbmltcG9ydCB7U0J9IGZyb20gJy4vU0IuanMnXHJcbmltcG9ydCB7U0N9IGZyb20gJy4vU0MuanMnXHJcbmltcG9ydCB7U0R9IGZyb20gJy4vU0QuanMnXHJcbmltcG9ydCB7U0V9IGZyb20gJy4vU0UuanMnXHJcbmltcG9ydCB7U0Z9IGZyb20gJy4vU0YuanMnXHJcbmltcG9ydCB7U0d9IGZyb20gJy4vU0cuanMnXHJcbmltcG9ydCB7U0h9IGZyb20gJy4vU0guanMnXHJcblxyXG5jcmVhdGVTdGF0ZSA9IChrZXksa2xhc3MpIC0+IGdsb2JhbHMuc3RhdGVzW2tleV0gPSBuZXcga2xhc3Mga2V5XHJcblxyXG53aW5kb3cud2luZG93UmVzaXplZCA9IC0+IHJlc2l6ZUNhbnZhcyBpbm5lcldpZHRoLCBpbm5lckhlaWdodFxyXG5cclxud2luZG93LnNldHVwID0gLT5cclxuXHRjYW52YXMgPSBjcmVhdGVDYW52YXMgaW5uZXJXaWR0aCxpbm5lckhlaWdodCAjLFNWR1xyXG5cclxuXHRiYWNrZ3JvdW5kICdibGFjaydcclxuXHR0ZXh0QWxpZ24gQ0VOVEVSLENFTlRFUlxyXG5cdHJlY3RNb2RlIENFTlRFUlxyXG5cdGFuZ2xlTW9kZSBERUdSRUVTXHJcblx0XHJcblx0Y3JlYXRlU3RhdGUgJ1NBJywgU0FcclxuXHRjcmVhdGVTdGF0ZSAnU0InLCBTQlxyXG5cdGNyZWF0ZVN0YXRlICdTQycsIFNDXHJcblx0Y3JlYXRlU3RhdGUgJ1NEJywgU0RcclxuXHRjcmVhdGVTdGF0ZSAnU0UnLCBTRVxyXG5cdGNyZWF0ZVN0YXRlICdTRicsIFNGXHJcblx0Y3JlYXRlU3RhdGUgJ1NHJywgU0dcclxuXHRjcmVhdGVTdGF0ZSAnU0gnLCBTSFxyXG5cclxuXHRzZXRTdGF0ZSAnU0cnXHJcblx0c2V0TiAwXHJcblx0c2V0Um9uZCAwXHJcblxyXG53aW5kb3cubW91c2VDbGlja2VkID0gLT4gZ2xvYmFscy5jdXJyU3RhdGUubW91c2VDbGlja2VkKClcclxuXHJcbndpbmRvdy5kcmF3ID0gLT5cclxuXHRzY2FsZSB3aWR0aC8xMDAsaGVpZ2h0LzEwMCAjIHBvcnRyYWl0XHJcblx0c3Ryb2tlV2VpZ2h0IDEwMC9oZWlnaHRcclxuXHRiYWNrZ3JvdW5kICdncmF5J1xyXG5cdGdsb2JhbHMuY3VyclN0YXRlLmRyYXdDb250cm9scygpXHJcblx0Z2xvYmFscy5jdXJyU3RhdGUuZHJhdygpXHJcbiJdfQ==
//# sourceURL=c:\github\2022-008-Berger\coffee\sketch.coffee