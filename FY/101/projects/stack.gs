s = []

push:[a] -> a -> [a]
push.stack.elm = stack :: elm

pop:[a] -> [a]
pop.(x :: xs) = xs
