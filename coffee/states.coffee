import {globals,invert} from './globals.js'
import {CRounded,CDead} from './controls.js'
# import saveAs from './file-saver.js'

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

saveData = ->
	a = document.createElement "a"
	#document.body.appendChild a # Skapar många downloads
	a.style = "display: none"
	return (data, fileName) =>
		blob = new Blob [data], {type: "octet/stream"}
		url = window.URL.createObjectURL blob
		a.href = url
		a.download = fileName
		a.click()
		window.URL.revokeObjectURL url

crlf = "\n"
round3 = (x) -> Math.round(1000*x)/1000

svgline = (x1,y1,x2,y2) -> "<line x1=\"#{x1}\" y1=\"#{y1}\" x2=\"#{x2}\" y2=\"#{y2}\" stroke=\"black\"/>"
svgrect = (x,y,width,height) -> "<rect x=\"#{x}\" y=\"#{y}\" width=\"#{width}\" height=\"#{height}\" stroke=\"black\" fill-opacity=\"0.1\" />"
svgtext = (text,x,y,ta='middle',ts=2) -> "<text font-size=\"#{round3 ts}em\" text-anchor=\"#{ta}\" x=\"#{x}\" y=\"#{y}\">#{text}</text>"
svgdefs = (id,body) -> crlf + "<defs>" + crlf + "<g id=\"#{id}\" >" + crlf + body + "</g>"+ crlf + "</defs>" + crlf
svguse  = (id,x,y,skalax,skalay) -> "<use href=\"##{id}\" x=\"#{x}\" y=\"#{y}\" transform=\"scale(#{skalax} #{skalay})\" />" + crlf

svggrid = (headers,ws,digits,n,dx,dy,totalWidth) ->
	headers = headers.split ' '
	res = []
	x0 = 0
	y = dy
	big   = dx/30
	medium = 0.75*dx/30
	small = 0.50*dx/30
	for i in range headers.length
		res.push svgline x0,y-dy,x0,y+dy*n
		res.push svgtext headers[i],x0+ws[i]/2,0.75*dy,'middle',big
		x0 += ws[i]
	res.push svgline x0,y-dy,x0,y+dy*n

	for i in range -1,n+1
		res.push svgline 0,y+dy*i,x0,y+dy*i
	for i in range n
		res.push svgtext i+1,0.5*dx,y+dy*i+dy*0.7,'middle',big

	for i in range digits.length
		row = digits[i]
		x0 = ws[0] + ws[1] + dx*i + 0.5*dx
		for j in range row.length
			y0 = y + dy*j + 0.28*dy
			digit = row[j]
			if digit < 0
				anchor = 'start'
				digit = -digit
				dist = -dx*0.45
			else 
				anchor = 'end'
				dist = dx*0.45
			res.push svgtext digit,x0+dist,y0,anchor,ts=small
	res.push svgtext 'Berger - Round Robin',0,dy*(n+1.4),'start',small
	res.push svgtext 'Observera att placeringarna utgörs av BORDSNUMMER',totalWidth/2,dy*(n+1.4),'middle',small
	res.push svgtext 'Courtesy of Wasa SK',totalWidth,dy*(n+1.4),'end',small
	res.join crlf

bergerSVG = (w,h) ->
	tables = []
	antalSpelare = globals.ronder[0].length # antal spelare, alltid jämnt
	antalRonder = antalSpelare - 1
	for i in range antalRonder
		spelare = invert globals.ronder[i]
		for j in range antalSpelare
			p = spelare[j]
			white = p % 2 == 0
			if p >= antalSpelare/2 then p = antalRonder-p
			if white then p = p+1 else p=-p-1
			spelare[j] = p
		tables.push spelare

	res = 'Nr Namn'
	dx = 1000/globals.N
	if dx>50 then dx=50
	dy = 0.75 * dx
	ws = [dx,200]
	for i in range globals.N-1
		res += " #{i+1}"
		ws.push dx
	res += ' Poäng Plats'
	ws.push dx+dx
	ws.push dx+dx 
	totalWidth = 0
	totalWidth += w for w in ws
	totalHeight = dy * (globals.N + 2)

	a = svggrid res,ws,tables,globals.N,dx,dy,totalWidth
	b = svgdefs "berger", a
	c = b

	totalWidth += dx

	[nx,ny] = [1,1]
	if globals.N ==  4 then [nx,ny] = [2,4]
	if globals.N ==  6 then [nx,ny] = [2,3]
	if globals.N ==  8 then [nx,ny] = [2,3]
	if globals.N == 10 then [nx,ny] = [2,2]
	if globals.N == 12 then [nx,ny] = [2,2]

	#c += svgrect 0,0,1625,1140

	skalax = 1625/nx / totalWidth
	skalay = 1140/ny / totalHeight

	for i in range nx
		for j in range ny
			c += svguse "berger", i*totalWidth, j*totalHeight, skalax, skalay
	"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='#{1630}' height='#{1140}' >" + c + '</svg>'

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
	common.F.disabled = key == 'SF'
	common.G.disabled = key == 'SG'
	#common.H.disabled = key == 'SH'

export setRond = (delta) ->
	globals.rond += delta
	common.R0.visible = globals.rond > 0
	common.R2.visible = globals.rond < globals.N-2
	common.R1.text = "Rond:\n#{globals.rond + 1}"

export setN = (delta) ->
	globals.N += delta
	globals.rond = 0
	setRond 0
	common.X0.visible = globals.N > 4
	common.X2.visible = globals.N < ALPHABET.length
	common.X1.text = "Spelare:\n#{globals.N}"

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
x = 6.25
dx = 100/8
w = 100/8.5
common.A  = new CRounded x+0*dx, 3, w, 5, 'Halvbord',         => setState 'SA'
common.B  = new CRounded x+1*dx, 3, w, 5, 'Bord',             => setState 'SB'
common.C  = new CRounded x+2*dx, 3, w, 5, "Cirkel",           => setState 'SC'
common.D  = new CRounded x+3*dx, 3, w, 5, "Rotation",         => setState 'SD'
common.E  = new CRounded x+4*dx, 3, w, 5, "Berger\nSpelare",  => setState 'SE'
common.F  = new CRounded x+5*dx, 3, w, 5, 'Berger\nHalvbord', => setState 'SF'
common.G  = new CRounded x+6*dx, 3, w, 5, 'Berger\nBord',     => setState 'SG'
common.H  = new CRounded x+7*dx, 3, w, 5, 'Download', =>
	data = bergerSVG width,height
	fileName = "#{globals.N}.svg"
	saveData() data, fileName

#common.XSpelare = new CDead 25, 93.5,'Spelare:'
common.X0 = new CRounded  9-0.5, 97, 15, 5, '-2', => setN -2
common.X1 = new CRounded 25-0.5, 97, 15, 5, 4
common.X2 = new CRounded 41-0.5, 97, 15, 5, '+2', => setN +2
common.X1.disabled = true

#common.XRond = new CDead 75, 93.5,'Rond:'
common.R0 = new CRounded 59+0.5, 97, 15, 5, '-1', => setRond -1
common.R1 = new CRounded 75+0.5, 97, 15, 5, 0
common.R2 = new CRounded 91+0.5, 97, 15, 5, '+1', => setRond +1
common.R1.disabled = true

export class State
	constructor : (@name) ->
		@controls = common
		@setN()

	drawControls : -> @controls[key].draw() for key of @controls

	mouseClicked : ->
		{x,y} = getLocalCoords()
		for key of @controls
			control = @controls[key]
			if control.visible and not control.disabled and control.inside x, y
				if control.click then control.click()
				break
