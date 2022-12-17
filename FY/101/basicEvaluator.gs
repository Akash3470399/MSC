
charToInt : Char -> Int
charToInt.ch = ord.ch - 48

eval: [Char] -> Int

basicEval.(x :: xs) = eval.(reverse.(x :: xs))

eval.[x] = charToInt.x
-- eval.[x, y] = if y == '-' then -1 * x else eval.[x, y] 
eval.(x :: y :: xs) = if y == '+' then 
                                eval.xs + charToInt.x
                            else if y == '-' then
                                eval.xs - charToInt.x
                            else if y == '*' then 
                                eval.xs * charToInt.x
                            else if  y == '/' then
                                eval.xs / charToInt.x
                            else 0