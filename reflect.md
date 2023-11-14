In a file called reflect.md, Reflect on the implementation process using point form. Focus on what you learned,
your challenges, how you managed the game's complexity, and how the final product compares to your initial
design. If you used an AI to help write code, reflect on this process and highlight key insights you learned. If you
chose not to use AI, explain why you did not need to or want to use it.

My implemention process was rather simple and fast except for the win-condition.
I implemented my chess game to be living in the DOM and not in a 2d-array in javascript.
Implementing the piece moves was simple as I had the squares identified with corrdinates.

Until this part the complexity was pretty fair. Coming to win conditions, calculating a check
was also implemented, although with difficulty since there was not real javascipts array,
everything was in the DOM.

For the win, I keep track of all the pieces killed, and when the first check happens. As soon as
that happens, the score based on piece type is calculated and a winner is decided.

I was not able to implement a check-escape, i.e listing all posible moves to get out of a check,
thus decided to reduce complexity.

I did not use AI for code, but to ask questions about what property add for a certain effect. For
example, asking what listeners to use and what css to use. I dont like AI code, it usually does not
follow along with my base code layout and takes more time to make it fit.
