import {globals,rotera,invert} from './globals.js'
import {ALPHABET, setN, State} from './states.js'

export class SC extends State # Rotation
	
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
		z = rotera range(@N),-globals.rond
		[x0,y0] = @points[z[i]]
		[x1,y1] = @points[z[j]]
		line x0,y0,x1,y1

	draw : ->
		super()
		r = 2*100/@N
		if r>12 then r=12
		textSize 0.75*r
		rond = globals.rond

		players = invert globals.ronder[rond]

		m = @N/2
		@makeLine m-i,m+i-1 for i in range m+1
			
		for i in range @N
			[x,y] = @points[i]
			fill if i == 0 then 'red' else 'gray'

			circle x,y,r
			fill ['white','black'][players[i] % 2]
			text ALPHABET[i],x,y+0.25
