doc = ["intToChar: Int -> Char","charToInt : Char -> Int","stoi: [Char] -> Int","itos : Int -> [Char]","getNum : [Char] -> Int","getNumHelper: [Char] -> [Char]","rmNum: [Char] -> [Char]"]

intToChar: Int -> Char
intToChar.n = chr.(n + 48)

charToInt : Char -> Int
charToInt.ch = ord.ch - 48


-- check if a char is number digit
--isDigit : Char -> Bool -- commented as this is pre-definded function
--isDigit.num = if ord.num >= 48  && ord.num < 58 then True else False 

isNum : [Char] -> Bool
isNum.(x ::xs) = isDigit.x


-- convert number string to integer stoi."102" -> 102
stoi: [Char] -> Int
stoi.[] = 0
stoi.(x :: xs ) = (charToInt.x) * (10 ^  length.xs) + stoi.xs 

-- convert int to string e.g. itos.102 -> "102"
itos : Int -> [Char]
itos.n = if n > 9 then itos.(n/10) ++ [intToChar.(mod.n.10)] else [intToChar.n]

-- get starting number from expression     e.g. getNum"23+7/4" -> 23
getNum : [Char] -> Int
getNum.(x :: xs) = stoi.((getNumHelper.(x :: xs)))

getNumHelper: [Char] -> [Char]
getNumHelper.[] = []
getNumHelper.(x :: xs) = if isDigit.x then x:: getNumHelper.xs  else []

-- remove srarting number from expression e.g. rmNum."23+7/4" -> "+7/4"
rmNum: [Char] -> [Char] 
rmNum.[] = []
rmNum.(x :: xs) = if isDigit.x then  rmNum.xs else (x :: xs)
