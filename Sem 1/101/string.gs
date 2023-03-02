
isNum: Char -> Bool
isNum.ch = if ord.ch >= 48 && ord.ch < 58 then True else False

charToInt : Char -> Int
charToInt.ch = ord.ch - 48


stoi.[] = 0
stoi.(x :: xs ) = if isNum.x then charToInt.x * (10 ^  length.xs) + stoi.xs else stoi.[]

