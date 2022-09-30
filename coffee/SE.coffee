import {globals,invert} from './globals.js'
import {ALPHABET, State, grid, markeraRond} from './states.js'

export class SE extends State # Berger Spelare

	setN : ->
		@N = globals.N
		@dx = 99/@N
		if @dx > 10 then @dx=10
		@dy = 92/(@N+1)
		if @dy > 10 then @dy=10
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
			text rond+1,@dx*1.5+@dx*rond,@yoff/2

			if rond == globals.rond then markeraRond rond,@xoff,@dx,@yoff,@dy,@N
			for iPlace in range @N
				iPlayer = players[iPlace]
				fill ['white','black'][iPlayer % 2]
				text iPlayer+1,@xoff+@dx/2+@dx*rond, @yoff+@dy/2+@dy*iPlace
		grid @xoff,@dx, @N-1, @yoff, @dy, @N
