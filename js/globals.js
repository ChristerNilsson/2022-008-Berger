// Generated by CoffeeScript 2.5.1
export var globals = {};

export var invert = function(arr) {
  var i, item, j, len, ref, res;
  res = [];
  ref = range(arr.length);
  for (j = 0, len = ref.length; j < len; j++) {
    i = ref[j];
    item = arr[i];
    res[item] = i;
  }
  return res;
};

// rotera allt utom sista elementet
export var rotera = function(arr, step) {
  var last;
  last = arr.pop();
  arr = arr.slice(step).concat(arr.slice(0, step));
  arr.push(last);
  return arr;
};

assert([6, 0, 1, 2, 3, 4, 5, 7], rotera([0, 1, 2, 3, 4, 5, 6, 7], -1));

assert([0, 1, 2, 3, 4, 5, 6, 7], rotera([0, 1, 2, 3, 4, 5, 6, 7], 0));

assert([1, 2, 3, 4, 5, 6, 0, 7], rotera([0, 1, 2, 3, 4, 5, 6, 7], 1));

assert([2, 3, 4, 5, 6, 0, 1, 7], rotera([0, 1, 2, 3, 4, 5, 6, 7], 2));

globals.states = {};

globals.currState = null;

globals.TOGGLE = 0;

globals.N = 10; // 4..28 number of players. Even number!

globals.rond = 0; // nollbaserad

globals.ronder = []; // för varje rond, gå in med halvbord och få ut spelaren

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFscy5qcyIsInNvdXJjZVJvb3QiOiIuLiIsInNvdXJjZXMiOlsiY29mZmVlXFxnbG9iYWxzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBQSxJQUFPLE9BQUEsR0FBVSxDQUFBOztBQUVqQixPQUFBLElBQU8sTUFBQSxHQUFTLFFBQUEsQ0FBQyxHQUFELENBQUE7QUFDaEIsTUFBQSxDQUFBLEVBQUEsSUFBQSxFQUFBLENBQUEsRUFBQSxHQUFBLEVBQUEsR0FBQSxFQUFBO0VBQUMsR0FBQSxHQUFNO0FBQ047RUFBQSxLQUFBLHFDQUFBOztJQUNDLElBQUEsR0FBTyxHQUFHLENBQUMsQ0FBRDtJQUNWLEdBQUcsQ0FBQyxJQUFELENBQUgsR0FBWTtFQUZiO1NBR0E7QUFMZSxFQUZoQjs7O0FBVUEsT0FBQSxJQUFPLE1BQUEsR0FBUyxRQUFBLENBQUMsR0FBRCxFQUFLLElBQUwsQ0FBQTtBQUNoQixNQUFBO0VBQUMsSUFBQSxHQUFPLEdBQUcsQ0FBQyxHQUFKLENBQUE7RUFDUCxHQUFBLEdBQU0sR0FBRyxDQUFDLEtBQUosQ0FBVSxJQUFWLENBQWUsQ0FBQyxNQUFoQixDQUF1QixHQUFHLENBQUMsS0FBSixDQUFVLENBQVYsRUFBWSxJQUFaLENBQXZCO0VBQ04sR0FBRyxDQUFDLElBQUosQ0FBUyxJQUFUO1NBQ0E7QUFKZTs7QUFLaEIsTUFBQSxDQUFPLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsQ0FBUCxFQUEwQixNQUFBLENBQU8sQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixDQUFQLEVBQXlCLENBQUMsQ0FBMUIsQ0FBMUI7O0FBQ0EsTUFBQSxDQUFPLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsQ0FBUCxFQUEwQixNQUFBLENBQU8sQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixDQUFQLEVBQXlCLENBQXpCLENBQTFCOztBQUNBLE1BQUEsQ0FBTyxDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLENBQVAsRUFBMEIsTUFBQSxDQUFPLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsQ0FBUCxFQUF5QixDQUF6QixDQUExQjs7QUFDQSxNQUFBLENBQU8sQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixDQUFQLEVBQTBCLE1BQUEsQ0FBTyxDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLENBQVAsRUFBeUIsQ0FBekIsQ0FBMUI7O0FBRUEsT0FBTyxDQUFDLE1BQVIsR0FBaUIsQ0FBQTs7QUFDakIsT0FBTyxDQUFDLFNBQVIsR0FBb0I7O0FBQ3BCLE9BQU8sQ0FBQyxNQUFSLEdBQWlCOztBQUNqQixPQUFPLENBQUMsQ0FBUixHQUFZLEdBdkJaOztBQXdCQSxPQUFPLENBQUMsSUFBUixHQUFlLEVBeEJmOztBQXlCQSxPQUFPLENBQUMsTUFBUixHQUFpQixHQXpCakIiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZ2xvYmFscyA9IHt9XHJcblxyXG5leHBvcnQgaW52ZXJ0ID0gKGFycikgLT5cclxuXHRyZXMgPSBbXVxyXG5cdGZvciBpIGluIHJhbmdlIGFyci5sZW5ndGhcclxuXHRcdGl0ZW0gPSBhcnJbaV1cclxuXHRcdHJlc1tpdGVtXSA9IGlcclxuXHRyZXNcclxuXHJcbiMgcm90ZXJhIGFsbHQgdXRvbSBzaXN0YSBlbGVtZW50ZXRcclxuZXhwb3J0IHJvdGVyYSA9IChhcnIsc3RlcCkgLT5cclxuXHRsYXN0ID0gYXJyLnBvcCgpXHJcblx0YXJyID0gYXJyLnNsaWNlKHN0ZXApLmNvbmNhdCBhcnIuc2xpY2UoMCxzdGVwKVxyXG5cdGFyci5wdXNoIGxhc3RcclxuXHRhcnJcclxuYXNzZXJ0IFs2LDAsMSwyLDMsNCw1LDddLCByb3RlcmEgWzAsMSwyLDMsNCw1LDYsN10sLTFcclxuYXNzZXJ0IFswLDEsMiwzLDQsNSw2LDddLCByb3RlcmEgWzAsMSwyLDMsNCw1LDYsN10sMFxyXG5hc3NlcnQgWzEsMiwzLDQsNSw2LDAsN10sIHJvdGVyYSBbMCwxLDIsMyw0LDUsNiw3XSwxXHJcbmFzc2VydCBbMiwzLDQsNSw2LDAsMSw3XSwgcm90ZXJhIFswLDEsMiwzLDQsNSw2LDddLDJcclxuXHJcbmdsb2JhbHMuc3RhdGVzID0ge31cclxuZ2xvYmFscy5jdXJyU3RhdGUgPSBudWxsXHJcbmdsb2JhbHMuVE9HR0xFID0gMFxyXG5nbG9iYWxzLk4gPSAxMCAjIDQuLjI4IG51bWJlciBvZiBwbGF5ZXJzLiBFdmVuIG51bWJlciFcclxuZ2xvYmFscy5yb25kID0gMCAjIG5vbGxiYXNlcmFkXHJcbmdsb2JhbHMucm9uZGVyID0gW10gIyBmw7ZyIHZhcmplIHJvbmQsIGfDpSBpbiBtZWQgaGFsdmJvcmQgb2NoIGbDpSB1dCBzcGVsYXJlblxyXG4iXX0=
//# sourceURL=c:\github\2022-008-Berger\coffee\globals.coffee