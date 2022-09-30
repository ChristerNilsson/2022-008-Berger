import {globals} from './globals.js'
import {ALPHABET, setN, State} from './states.js'

export class SB extends State # Cirkel

	setN : ->
		R = 40
		@points = []
		@N = globals.N
		angle = 360/(@N-1)
		for i in range @N-1
			x = 50+R*cos angle*i
			y = 47.5+R*sin angle*i
			@points.push [x,y]
		@points.push [50,47.5]

	makeLine : (i,j) ->
		[x0,y0] = @points[i]
		[x1,y1] = @points[j]
		line x0,y0,x1,y1

	draw : ->
		super()
		r = 2*100/@N
		if r>12 then r=12
		textSize 0.75*r
		rond = globals.rond

		players = globals.ronder[rond]

		m = @N/2
		@makeLine m-i,m+i-1 for i in range m+1
			
		for i in range @N
			[x,y] = @points[i]
			fill if players[i] == 0 then 'red' else 'gray'
			circle x,y,r
			if i == 0 then fill ['white','black'][i%2]
			else if i == @N-1 then fill ['white','black'][i%2]
			else fill ['white','black'][i%2]
			text ALPHABET[players[i]],x,y+0.25
