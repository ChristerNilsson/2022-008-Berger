import {globals,invert} from './globals.js'
import {CRounded,CDead} from './controls.js'

export ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' # spelare
# halvborden heter 1..52. Jämn är vit, udda är svart

export grid = (xoff,dx,nx, yoff,dy,ny) ->
	line xoff,      yoff+dy*i, xoff+nx*dx, yoff+dy*i  for i in range ny+1
	line xoff+dx*i, yoff,      xoff+dx*i,  yoff+ny*dy for i in range nx+1

export markeraRond = (rond,xoff,dx,yoff,dy,N) ->
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
	common.R1.text = globals.rond + 1

export setN = (delta) ->
	globals.N += delta
	globals.rond = 0
	setRond 0
	common.X0.visible = globals.N > 4
	common.X2.visible = globals.N < ALPHABET.length
	common.X1.text = globals.N

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
common.D  = new CRounded 46, 96.5, 12, 6, "Berger\nSpelare", => setState 'SD'
common.E  = new CRounded 59, 96.5, 12, 6, 'Berger\nHalvbord', => setState 'SE'

common.XSpelare = new CDead 74, 93.5,'Spelare:'
common.X0 = new CRounded  69, 97, 5, 5, '-2', => setN -2
common.X1 = new CRounded  74, 97, 5, 5, 4
common.X2 = new CRounded  79, 97, 5, 5, '+2', => setN +2
common.X1.disabled = true

common.XRond = new CDead  91, 93.5,'Rond:'
common.R0 = new CRounded 86, 97, 5, 5, '-1', => setRond -1
common.R1 = new CRounded 91, 97, 5, 5, 0
common.R2 = new CRounded 96, 97, 5, 5, '+1', => setRond +1
common.R1.disabled = true

export class State
	constructor : (@name) ->
		@controls = common
		@setN()

	draw : -> @controls[key].draw() for key of @controls

	mouseClicked : ->
		{x,y} = getLocalCoords()
		for key of @controls
			control = @controls[key]
			if control.visible and not control.disabled and control.inside x, y
				if control.click then control.click()
				break
