import {globals,rotera,invert} from './globals.js'
import {CRounded,CDead} from './controls.js'

ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄ' # spelare
# halvborden heter 1..28. Jämn är vit, udda är svart

grid = (xoff,dx,nx, yoff,dy,ny) ->
	line xoff,      yoff+dy*i, xoff+nx*dx, yoff+dy*i  for i in range ny+1
	line xoff+dx*i, yoff,      xoff+dx*i,  yoff+ny*dy for i in range nx+1

markeraRond = (rond,xoff,dx,yoff,dy,N) ->
	push()
	fill 'lightgray'
	noStroke()
	rectMode CORNER
	rect xoff+dx*rond,yoff,dx,N*dy
	pop()

getLocalCoords = ->
	matrix = drawingContext.getTransform()
	pd = pixelDensity()
	matrix.inverse().transformPoint new DOMPoint mouseX * pd,mouseY * pd

export setState = (key) ->
	globals.currState = globals.states[key]
	common.A.disabled = key == 'SA'
	common.B.disabled = key == 'SB'
	common.C.disabled = key == 'SC'
	common.D.disabled = key == 'SD'
	common.E.disabled = key == 'SE'

export setRond = (delta) ->
	globals.rond += delta
	common.R0.visible = globals.rond > 0
	common.R2.visible = globals.rond < globals.N-2
	common.R0.text = globals.rond-1
	common.R1.text = globals.rond
	common.R2.text = globals.rond+1

export setN = (delta) ->
	globals.N += delta
	globals.rond = 0
	setRond 0
	common.X0.visible = globals.N > 4
	common.X2.visible = globals.N < 28
	common.X0.text = globals.N - 2
	common.X1.text = globals.N
	common.X2.text = globals.N + 2

	N = globals.N
	globals.ronder = []
	for rond in range N-1
		players = range N-1
		players = players.slice(N-1-rond).concat players.slice(0,N-1-rond)
		players.push N-1
		if rond%2==1 then [players[0],players[N-1]] = [players[N-1],players[0]]
		globals.ronder.push players
	for key of globals.states
		state = globals.states[key]
		state.setN()

common = {}
common.A  = new CRounded  7, 96.5, 12, 6, 'Halvbord', => setState 'SA'
common.B  = new CRounded 20, 96.5, 12, 6, "Cirkel", => setState 'SB'
common.C  = new CRounded 33, 96.5, 12, 6, "Rotation", => setState 'SC'
common.D  = new CRounded 59, 96.5, 12, 6, "Berger\nSpelare", => setState 'SD'
common.E  = new CRounded 46, 96.5, 12, 6, 'Berger\nHalvbord', => setState 'SE'

common.XSpelare = new CDead 74, 93.5,'Spelare:'
common.X0 = new CRounded  69, 97, 5, 5, 0, => setN -2
common.X1 = new CRounded  74, 97, 5, 5, 1
common.X2 = new CRounded  79, 97, 5, 5, 2, => setN +2
common.X1.disabled = true

common.XRond = new CDead  91, 93.5,'Rond:'
common.R0 = new CRounded 86, 97, 5, 5, 0, => setRond -1
common.R1 = new CRounded 91, 97, 5, 5, 1
common.R2 = new CRounded 96, 97, 5, 5, 2, => setRond +1
common.R1.disabled = true

export class State
	constructor : (@name) -> @controls = common

	draw : -> @controls[key].draw() for key of @controls

	mouseClicked : ->
		{x,y} = getLocalCoords()
		for key of @controls
			control = @controls[key]
			if control.visible and not control.disabled and control.inside x, y
				if control.click then control.click()
				break

export class SA extends State # Halvbord

	constructor : (name) ->
		super name
		@setN()

	setN : ->

		# bygg koordinatlistor
		@N = globals.N
		@dx = 100/(@N+2)*2
		@dy = 0.9*@dx
		@x = []
		@y = []
		for i in range @N/2
			@x.push @dx + i * @dx
			@y.push 45-@dy/2
		x1 = @x.slice()
		_.reverse(@x)
		@x = x1.concat @x
		for i in range @N/2
			@y.push 45+@dy/2

	draw : ->
		super()
		players = globals.ronder[globals.rond]
		textSize @dx/2

		for iPlace in range @N 
			fill 'gray'
			rect @x[iPlace],@y[iPlace],@dx,@dx
			fill ['white','black'][iPlace%2]
			text iPlace,@x[iPlace],@y[iPlace]+0.5

			y = if iPlace >= @N/2 then 0.9*@dy else -0.75*@dy
			fill if players[iPlace] == 0 then 'red' else 'black'
			text ALPHABET[players[iPlace]],@x[iPlace],@y[iPlace] + y

export class SB extends State # Cirkel

	constructor : (name) ->
		super name
		@setN()

	setN : ->
		@points = []
		@N = globals.N
		angle = 360/(@N-1)
		for i in range @N-1
			x = 50+35*cos angle*i
			y = 50+35*sin angle*i
			@points.push [x,y]
		@points.push [50,50]

	makeLine : (i,j) ->
		[x0,y0] = @points[i]
		[x1,y1] = @points[j]
		line x0,y0,x1,y1

	draw : ->
		super()
		rond = globals.rond

		players = globals.ronder[rond]

		m = @N/2
		@makeLine m-i,m+i-1 for i in range m+1
			
		for i in range @N
			[x,y] = @points[i]
			fill if players[i] == 0 then 'red' else 'gray'
			circle x,y,6
			textSize 4
			if i == 0 then fill ['white','black'][i%2]
			else if i == @N-1 then fill ['white','black'][i%2]
			else fill ['white','black'][i%2]
			text ALPHABET[players[i]],x,y+0.25

export class SC extends State # Rotation

	constructor : (name) ->
		super name
		@setN()

	setN : ->
		@points = []
		@N = globals.N
		angle = 360/(@N-1)
		for i in range @N-1
			x = 50+35*cos angle*i
			y = 50+35*sin angle*i
			@points.push [x,y]
		@points.push [50,50]

	makeLine : (i,j) ->
		z = rotera range(@N),-globals.rond
		[x0,y0] = @points[z[i]]
		[x1,y1] = @points[z[j]]
		line x0,y0,x1,y1

	draw : ->
		super()
		rond = globals.rond

		players = invert globals.ronder[rond]

		m = @N/2
		@makeLine m-i,m+i-1 for i in range m+1
			
		for i in range @N
			[x,y] = @points[i]
			fill if i == 0 then 'red' else 'gray'

			circle x,y,6
			textSize 4
			fill ['white','black'][players[i] % 2]
			text ALPHABET[i],x,y+0.25

export class SD extends State # Berger Halvbord

	constructor : (name) ->
		super name
		@setN()

	setN : ->
		@N = globals.N
		@dx = 99/@N
		@dy = 92/(@N+1)
		@xoff = @dx
		@yoff = @dy

	draw : ->
		super()
		textSize 0.5*@dy
		for i in range @N
			fill 'black'
			text i,          0.25*@dx, @yoff+@dy/2+@dy*i
			fill if i==0 then 'red' else 'black'
			text ALPHABET[i],0.75*@dx, @yoff+@dy/2+@dy*i

		for rond in range @N-1
			players = globals.ronder[rond]

			if rond == globals.rond then markeraRond rond,@xoff,@dx,@yoff,@dy,@N
			fill 'black'
			text rond,@dx*1.5+@dx*@rond,@yoff/2

			push()
			textSize 0.5*@dy
			for iPlace in range @N
				fill ['white','black'][iPlace%2]
				iPlayer = players[iPlace]
				textAlign [RIGHT,LEFT][iPlace % 2]
				x = @xoff + @dx/2+@dx*rond + [0.45*@dx,-0.45*@dx][iPlace % 2]
				y = @yoff + 0.3*@dy+@dy*iPlayer
				text players[@N-iPlace-1],x,y

			pop()

		grid @xoff,@dx, @N-1, @yoff, @dy, @N

export class SE extends State # Berger Spelare

	constructor : (name) -> 
		super name
		@setN()

	setN : ->
		@N = globals.N
		@dx = 99/@N
		@dy = 92/(@N+1)
		@xoff = @dx
		@yoff = @dy

	draw: ->
		super()

		textSize @dy/2
		for i in range @N
			fill if i==0 then 'red' else 'black'
			text ALPHABET[i],@dx/2,@yoff+@dy/2+@dy*i
		for rond in range @N-1
			players = invert globals.ronder[rond]
			fill 'black'
			text rond,@dx*1.5+@dx*rond,@yoff/2
			if rond == globals.rond then markeraRond rond,@xoff,@dx,@yoff,@dy,@N
			for iPlace in range @N
				iPlayer = players[iPlace]
				fill ['white','black'][iPlayer % 2]
				text iPlayer,@xoff+@dx/2+@dx*rond, @yoff+@dy/2+@dy*iPlace
		grid @xoff,@dx, @N-1, @yoff, @dy, @N

