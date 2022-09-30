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
  var N, last;
  last = arr.pop();
  N = arr.length;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFscy5qcyIsInNvdXJjZVJvb3QiOiIuLiIsInNvdXJjZXMiOlsiY29mZmVlXFxnbG9iYWxzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBQSxJQUFPLE9BQUEsR0FBVSxDQUFBOztBQUVqQixPQUFBLElBQU8sTUFBQSxHQUFTLFFBQUEsQ0FBQyxHQUFELENBQUE7QUFDaEIsTUFBQSxDQUFBLEVBQUEsSUFBQSxFQUFBLENBQUEsRUFBQSxHQUFBLEVBQUEsR0FBQSxFQUFBO0VBQUMsR0FBQSxHQUFNO0FBQ047RUFBQSxLQUFBLHFDQUFBOztJQUNDLElBQUEsR0FBTyxHQUFHLENBQUMsQ0FBRDtJQUNWLEdBQUcsQ0FBQyxJQUFELENBQUgsR0FBWTtFQUZiO1NBR0E7QUFMZSxFQUZoQjs7O0FBVUEsT0FBQSxJQUFPLE1BQUEsR0FBUyxRQUFBLENBQUMsR0FBRCxFQUFLLElBQUwsQ0FBQTtBQUNoQixNQUFBLENBQUEsRUFBQTtFQUFDLElBQUEsR0FBTyxHQUFHLENBQUMsR0FBSixDQUFBO0VBQ1AsQ0FBQSxHQUFJLEdBQUcsQ0FBQztFQUNSLEdBQUEsR0FBTSxHQUFHLENBQUMsS0FBSixDQUFVLElBQVYsQ0FBZSxDQUFDLE1BQWhCLENBQXVCLEdBQUcsQ0FBQyxLQUFKLENBQVUsQ0FBVixFQUFZLElBQVosQ0FBdkI7RUFDTixHQUFHLENBQUMsSUFBSixDQUFTLElBQVQ7U0FDQTtBQUxlOztBQU1oQixNQUFBLENBQU8sQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixDQUFQLEVBQTBCLE1BQUEsQ0FBTyxDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLENBQVAsRUFBeUIsQ0FBQyxDQUExQixDQUExQjs7QUFDQSxNQUFBLENBQU8sQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixDQUFQLEVBQTBCLE1BQUEsQ0FBTyxDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLENBQVAsRUFBeUIsQ0FBekIsQ0FBMUI7O0FBQ0EsTUFBQSxDQUFPLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsQ0FBUCxFQUEwQixNQUFBLENBQU8sQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixDQUFQLEVBQXlCLENBQXpCLENBQTFCOztBQUNBLE1BQUEsQ0FBTyxDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLENBQVAsRUFBMEIsTUFBQSxDQUFPLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsQ0FBUCxFQUF5QixDQUF6QixDQUExQjs7QUFFQSxPQUFPLENBQUMsTUFBUixHQUFpQixDQUFBOztBQUNqQixPQUFPLENBQUMsU0FBUixHQUFvQjs7QUFDcEIsT0FBTyxDQUFDLE1BQVIsR0FBaUI7O0FBQ2pCLE9BQU8sQ0FBQyxDQUFSLEdBQVksR0F4Qlo7O0FBeUJBLE9BQU8sQ0FBQyxJQUFSLEdBQWUsRUF6QmY7O0FBMEJBLE9BQU8sQ0FBQyxNQUFSLEdBQWlCLEdBMUJqQiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBnbG9iYWxzID0ge31cclxuXHJcbmV4cG9ydCBpbnZlcnQgPSAoYXJyKSAtPlxyXG5cdHJlcyA9IFtdXHJcblx0Zm9yIGkgaW4gcmFuZ2UgYXJyLmxlbmd0aFxyXG5cdFx0aXRlbSA9IGFycltpXVxyXG5cdFx0cmVzW2l0ZW1dID0gaVxyXG5cdHJlc1xyXG5cclxuIyByb3RlcmEgYWxsdCB1dG9tIHNpc3RhIGVsZW1lbnRldFxyXG5leHBvcnQgcm90ZXJhID0gKGFycixzdGVwKSAtPlxyXG5cdGxhc3QgPSBhcnIucG9wKClcclxuXHROID0gYXJyLmxlbmd0aFxyXG5cdGFyciA9IGFyci5zbGljZShzdGVwKS5jb25jYXQgYXJyLnNsaWNlKDAsc3RlcClcclxuXHRhcnIucHVzaCBsYXN0XHJcblx0YXJyXHJcbmFzc2VydCBbNiwwLDEsMiwzLDQsNSw3XSwgcm90ZXJhIFswLDEsMiwzLDQsNSw2LDddLC0xXHJcbmFzc2VydCBbMCwxLDIsMyw0LDUsNiw3XSwgcm90ZXJhIFswLDEsMiwzLDQsNSw2LDddLDBcclxuYXNzZXJ0IFsxLDIsMyw0LDUsNiwwLDddLCByb3RlcmEgWzAsMSwyLDMsNCw1LDYsN10sMVxyXG5hc3NlcnQgWzIsMyw0LDUsNiwwLDEsN10sIHJvdGVyYSBbMCwxLDIsMyw0LDUsNiw3XSwyXHJcblxyXG5nbG9iYWxzLnN0YXRlcyA9IHt9XHJcbmdsb2JhbHMuY3VyclN0YXRlID0gbnVsbFxyXG5nbG9iYWxzLlRPR0dMRSA9IDBcclxuZ2xvYmFscy5OID0gMTAgIyA0Li4yOCBudW1iZXIgb2YgcGxheWVycy4gRXZlbiBudW1iZXIhXHJcbmdsb2JhbHMucm9uZCA9IDAgIyBub2xsYmFzZXJhZFxyXG5nbG9iYWxzLnJvbmRlciA9IFtdICMgZsO2ciB2YXJqZSByb25kLCBnw6UgaW4gbWVkIGhhbHZib3JkIG9jaCBmw6UgdXQgc3BlbGFyZW5cclxuXHJcbiJdfQ==
//# sourceURL=c:\github\2022-008-Berger\coffee\globals.coffee