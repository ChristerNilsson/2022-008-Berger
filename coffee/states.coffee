import {globals} from './globals.js'
import {CRounded,CDead} from './controls.js'

ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' # spelare
# halvborden heter 1..20. Jämn är vit, udda är svart

grid = (xoff,dx,nx, yoff,dy,ny) ->
	line xoff,      yoff+dy*i, xoff+nx*dx, yoff+dy*i  for i in range ny+1
	line xoff+dx*i, yoff,      xoff+dx*i,  yoff+ny*dy for i in range nx+1

invert = (arr) ->
	res = []
	for i in range arr.length
		item = arr[i]
		res[item] = i
	res

markeraRond = (rond,xoff,dx,yoff,dy,N) ->
	push()
	fill 'lightgray'
	noStroke()
	rectMode CORNER
	rect dx-0.5+dx*rond,3,dx,N*dy
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

export setRond = (delta) ->
	globals.rond += delta
	common.R0.visible = globals.rond > 0
	common.R2.visible = globals.rond < globals.N-2
	common.R0.text = globals.rond-1
	common.R1.text = globals.rond
	common.R2.text = globals.rond+1

common = {}
common.A  = new CRounded 10, 96.5, 15, 6, 'Halvbord', => setState 'SA'
common.B  = new CRounded 25, 96.5, 15, 6, "Berger\nHalvbord", => setState 'SB'
common.C  = new CRounded 40, 96.5, 15, 6, 'Cirkel', => setState 'SC'
common.D  = new CRounded 55, 96.5, 15, 6, "Berger\nSpelare", => setState 'SD'

common.rond = new CDead  67, 96.5,'Rond:'
common.R0 = new CRounded 75, 96.5, 8, 6, 0, => setRond -1
common.R1 = new CRounded 85, 96.5, 8, 6, 1
common.R2 = new CRounded 95, 96.5, 8, 6, 2, => setRond +1
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

export class SA extends State

	constructor : (name) ->
		super name
		# bygg koordinatlistor
		@x = []
		@y = []
		N = globals.N
		for i in range N/2
			@x.push 5 + i * 10
			@y.push 41
		x1 = @x.slice()
		_.reverse(@x)
		@x = x1.concat @x
		for i in range N/2
			@y.push 49

	draw : ->
		super()
		players = globals.ronder[globals.rond]
		textSize 5

		N = globals.N
		for iPlace in range N 
			fill 'gray'
			rect @x[iPlace],@y[iPlace],8,8
			fill ['white','black'][iPlace%2] # then 'white' else 'black'
			text iPlace,@x[iPlace],@y[iPlace]+0.5

			dy = if iPlace >= N/2 then 8 else -7
			fill 'black'
			text ALPHABET[players[iPlace]],@x[iPlace],@y[iPlace] + dy


export class SB extends State

	draw : ->
		super()
		N = globals.N

		dx = 5
		dy = 4.5
		xoff = 4.5
		yoff = 6
		inverted = []

		textSize 3
		fill 'black'
		for i in range N
			text ALPHABET[i],2,yoff+dy*i-0.5
		for rond in range N-1
			players = invert globals.ronder[rond]
			fill 'black'
			text rond,7+dx*rond,2
			if rond == globals.rond then markeraRond rond,xoff,dx,yoff,dy,N
			for iPlace in range N
				iPlayer = players[iPlace]
				fill ['white','black'][iPlayer % 2]
				text iPlayer,7+dx*rond,yoff+dy*iPlace-0.5
		grid xoff,dx, N-1, yoff-3, dy, N


export class SC extends State

	constructor : (name) ->
		super name
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
			fill 'gray'
			circle x,y,6
			textSize 4
			if i == 0 then fill ['white','black'][i%2]
			else if i == @N-1 then fill ['white','black'][i%2]
			else fill ['white','black'][i%2]
			#text players[i],x,y
			text ALPHABET[players[i]],x,y+0.25


export class SD extends State

	draw : ->
		super()
		N = globals.N
		dx = 5
		dy = 4.5
		yoff = 5
		textSize 2
		for i in range N
			fill 'black'
			text i+1,1.5,yoff+dy*i
			text ALPHABET[i],3.5,yoff+dy*i

		for rond in range N-1
			players = globals.ronder[rond]

			fill 'black'
			text rond+1,7+dx*rond,yoff-3

			if rond == globals.rond then markeraRond rond,dx-0.5,dx,yoff,dy,N

			push()
			textSize 1.5
			for iPlace in range N
				fill ['white','black'][iPlace%2]
				iPlayer = players[iPlace]
				textAlign [RIGHT,LEFT][iPlace % 2]
				x = [9,5][iPlace % 2]
				y = yoff+dy*iPlayer-0.8
				text 1+players[N-iPlace-1], x+dx*rond, y
			pop()

		grid 4.5,dx, N-1, yoff-2, dy, N
