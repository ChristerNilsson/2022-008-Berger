export globals = {}

export invert = (arr) ->
	res = []
	for i in range arr.length
		item = arr[i]
		res[item] = i
	res

# rotera allt utom sista elementet
export rotera = (arr,step) ->
	last = arr.pop()
	arr = arr.slice(step).concat arr.slice(0,step)
	arr.push last
	arr
assert [6,0,1,2,3,4,5,7], rotera [0,1,2,3,4,5,6,7],-1
assert [0,1,2,3,4,5,6,7], rotera [0,1,2,3,4,5,6,7],0
assert [1,2,3,4,5,6,0,7], rotera [0,1,2,3,4,5,6,7],1
assert [2,3,4,5,6,0,1,7], rotera [0,1,2,3,4,5,6,7],2

globals.states = {}
globals.currState = null
globals.TOGGLE = 0
globals.N = 10 # 4..52 number of players. Even number!
#globals.rond = 0 # nollbaserad
globals.ronder = [] # för varje rond, gå in med halvbord och få ut spelaren
