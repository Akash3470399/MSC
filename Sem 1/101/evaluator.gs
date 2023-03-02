

doc = foldr.(\e -> (e ++ "\n")).[
    "intToChar: Int -> Char",
    "charToInt : Char -> Int",
    "stoi: [Char] -> Int",
    "itos : Int -> [Char]",
    "getStrNum : [Char] -> Int",
    "getStrNumHelper: [Char] -> [Char]",
    "remStrNum: [Char] -> [Char] "
]

intToChar: Int -> Char
intToChar.n = chr.(n + 48)

charToInt : Char -> Int
charToInt.ch = ord.ch - 48

-- check if a char is number digit
-- isDigit : Char -> Bool
-- isDigit.num = if ord.num >= 48  && ord.num < 58 then True else False 



-- convert number string to integer stoi."102" -> 102
stoi: [Char] -> Int
stoi.[] = 0
stoi.(x :: xs ) = (charToInt.x) * (10 ^  length.xs) + stoi.xs 

-- convert int to string e.g. itos.102 -> "102"
itos : Int -> [Char]
itos.n = if n > 9 then itos.(n/10) ++ [intToChar.(mod.n.10)] else [intToChar.n]

-- get starting number from expression in reverse order     e.g. getNum"23+7/4" -> 23
getStrNum : [Char] -> Int
getStrNum.(x :: xs) = stoi.(reverse.(getStrNumHelper.(x :: xs)))

getStrNumHelper: [Char] -> [Char]
getStrNumHelper.[] = []
getStrNumHelper.(x :: xs) = if isDigit.x then x:: getStrNumHelper.xs  else []

-- remove srarting number from expression e.g. remStrNum."23+7/4" -> "+7/4"
remStrNum: [Char] -> [Char] 
remStrNum.[] = []
remStrNum.(x :: xs) = if isDigit.x then  remStrNum.xs else (x :: xs)


-- this is main function (this function also works fine with numbers > 10 too)
bodmaseval.l = eval.(reverse.l).0 

eval.[].n = n
eval.(x :: xs).n = if isDigit.x then
                        eval.(remStrNum.(x :: xs)).(getStrNum.(x :: xs))
                        else if x == '+' then eval.xs.0 + n
                        else if x == '-' then eval.xs.0 - n
                        else if x == '*' then
                            eval.(reverse.(itos.(getStrNum.xs * n)) ++ remStrNum.xs).0
                        else if x == '/' then
                            eval.(reverse.(itos.(getStrNum.xs / n)) ++ remStrNum.xs).0
                        else 0
