
charToInt : Char -> Int
charToInt.ch = ord.ch - 48


simpleeval: [Char] -> Int
simpleeval.(x :: xs) = evalb.(reverse.(x :: xs))

evalb: [Char] -> Int
evalb.[x] = charToInt.x
-- evalb.[x, y] = if y == '-' then -1 * x else evalb.[x, y] 
evalb.(x :: y :: xs) = if y == '+' then 
                                evalb.xs + charToInt.x
                            else if y == '-' then
                                evalb.xs - charToInt.x
                            else if y == '*' then 
                                evalb.xs * charToInt.x
                            else if  y == '/' then
                                evalb.xs / charToInt.x
                            else 0