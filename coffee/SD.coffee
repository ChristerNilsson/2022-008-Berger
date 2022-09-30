import {globals} from './globals.js'
import {ALPHABET, State, grid, markeraRond} from './states.js'

export class SD extends State # Berger Halvbord

	setN : ->
		@N = globals.N
		@dx = 99/@N
		if @dx > 10 then @dx=10
		@dy = 92/(@N+1)
		if @dy > 10 then @dy=10
		@xoff = @dx
		@yoff = @dy

	draw : ->
		super()
		textSize 0.5*@dy
		for i in range @N
			fill 'black'
			text i+1,          0.25*@dx, @yoff+@dy/2+@dy*i
			fill if i==0 then 'red' else 'black'
			text ALPHABET[i],0.75*@dx, @yoff+@dy/2+@dy*i

		for rond in range @N-1
			players = globals.ronder[rond]

			if rond == globals.rond then markeraRond rond,@xoff,@dx,@yoff,@dy,@N
			fill 'black'
			text rond+1,@dx*1.5+@dx*rond,@yoff/2

			push()
			textSize 0.5*@dy
			for iPlace in range @N
				fill ['white','black'][iPlace%2]
				iPlayer = players[iPlace]
				textAlign [RIGHT,LEFT][iPlace % 2]
				x = @xoff + @dx/2+@dx*rond + [0.45*@dx,-0.45*@dx][iPlace % 2]
				y = @yoff + 0.3*@dy+@dy*iPlayer
				text 1+players[@N-iPlace-1],x,y

			pop()

		grid @xoff,@dx, @N-1, @yoff, @dy, @N
