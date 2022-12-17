intToChar: Int -> Char
intToChar.n = chr.(n + 48)

charToInt : Char -> Int
charToInt.ch = ord.ch - 48

-- check if a char is number char
isNum : Char -> Bool
isNum.num = if ord.num >= 48  && ord.num < 58 then True else False 

-- convert number string to integer
stoi: [Char] -> Int
stoi.[] = 0
stoi.(x :: xs ) = (charToInt.x) * (10 ^  length.xs) + stoi.xs 

-- convert int to string
itos : Int -> [Char]

itos.n = if n > 9 then itos.(n/10) ++ [intToChar.(mod.n.10)] else [intToChar.n]

-- get starting number from expression      e.g. getNum"23+7/4" -> 23
getStrNum : [Char] -> Int
getStrNum.(x :: xs) = stoi.(getStrNumHelper.(x :: xs))

getStrNumHelper: [Char] -> [Char]
getStrNumHelper.[] = []
getStrNumHelper.(x :: xs) = if isNum.x then x:: getStrNumHelper.xs  else []

-- remove srarting number from expression e.g. remStrNum."23+7/4" -> "+ 7/4"
remStrNum: [Char] -> [Char] 
remStrNum.[] = []
remStrNum.(x :: xs) = if isNum.x then  remStrNum.xs else (x :: xs)

evaluator.l = eval.(l).0 

eval.[].n = n
eval.(x :: xs).n = if isNum.x then
                        eval.(remStrNum.(x :: xs)).(getStrNum.(x :: xs))
                        else if x == '+' then eval.xs.0 + n
                        else if x == '-' then eval.xs.0 - n
                        else if x == '*' then
                            eval.(remStrNum.(xs)).(getStrNum.xs * n)
                        else if x == '/' then
                            eval.(remStrNum.xs).(getStrNum.xs / n)
                        else 0