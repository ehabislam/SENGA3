In a file called, explanation.md, explain three complex parts of your code. If ChatGPT or CoPilot wrote these
sections, highlight these sections and provide an explanation demonstrating your understanding. The document
should be clear, concise, and technical so anyone reading it can understand its functionality and purpose.

Moves:
Pawns had simple forward, double forward for first and diagnal for kill moves, this took 3
if conditions and was implemented.
Rooks had to run in straight lines, this was looped by increasing coordinate in both
directions, and stopping the incremention if an occupied cell came up.
Similar to the rook, the bishop moves were increment in both directions to simulate diagonal
movement, and stopping the incremention if an occupied cell came up.
The Queens moves were simply the addup of rook's and bishop's moves.
The king moves in only one direction.

Highlighting squares as hints:
I used mouseover listers to manupulate the DOM to highlight the squares as hints for the users.
When the mouse is over a piece, the moves for that piece get calculated and then the squares
where it lands gets highlighed in green. If the piece can be killed that get highlighted in red.

Win check:
Each kill is recoe

Until this part the complexity was pretty fair. Coming to win conditions, calculating a check
was also implemented, although with difficulty since there was not real javascipts array,
everything was in the DOM.

For the win, I keep track of all the pieces killed, and when the first check happens. As soon as
that happens, the score based on piece type is calculated and a winner is decided.

I was not able to implement a check-escape, i.e listing all posible moves to get out of a check,
thus decided to reduce complexity.
