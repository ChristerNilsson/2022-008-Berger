export globals = {}

globals.states = {}
globals.currState = null
globals.TOGGLE = 0
globals.N = 20 # number of players. Even number!
globals.rond = 0 # nollbaserad
globals.ronder = [] # för varje rond, gå in med halvbord och få ut spelaren

N = globals.N
for rond in range N-1
	players = range N-1
	players = players.slice(N-1-rond).concat players.slice(0,N-1-rond)
	players.push N-1
	if rond%2==1 then [players[0],players[N-1]] = [players[N-1],players[0]]
	globals.ronder.push players
