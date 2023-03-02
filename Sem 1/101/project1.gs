-- Akash B. Bhagat


-- Check if char is a alphabate or not 
-- isAlpha.ch = if (ord.ch >=64 && ord.ch <= 90) || (ord.ch >= 97 && ord.ch <= 122) then True else False

-- shifts(circular) the char digit by u times aheade .g shiftDigit.'2'.5 -> '7' , shiftDigit.'8'.2 -> 0, shiftDigit.'9'.2 -> 11
shiftDigit: Char -> Int ->  Char
shiftDigit.ch.u =if (ord.ch + u) > 57 then 
                                chr.((ord.ch + u) - 10)
                            else
                                chr.(ord.ch + u)

-- shifts (circular) the char by u times  e.g. shiftChar.'a'.2 -> 'c' , shiftChar.'X'.4 -> 'B'
shiftChar : Char -> Int -> Char
shiftChar.ch.u =if ord.ch <= 90 then
                            if (ord.ch + u) > 90 then 
                                chr.((ord.ch + u) - 26)
                            else
                                chr.(ord.ch + u)
                        else
                            if (ord.ch + u) > 122 then
                                chr.((ord.ch + u) - 26)
                            else
                                chr.(ord.ch + u)

-- shifts (circular) symbols
shiftSym.sym.u = if ord.sym < 48 then 
                            if (ord.sym + u) > 47 then
                                chr.((ord.sym + u) - 16)
                            else
                                chr.(ord.sym + u)
                        else if ord.sym < 65 then  
                            if (ord.sym + u) > 64 then
                                chr.((ord.sym + u) - 7)
                            else 
                                chr.(ord.sym + u)
                        else if ord.sym < 97 then
                            if (ord.sym + u) > 96 then
                                chr.((ord.sym + u) - 6)
                            else chr.(ord.sym + u)
                        else
                            if (ord.sym + u) > 126 then
                                chr.((ord.sym + u) - 4)
                            else
                                chr.(ord.sym + u)

-- shifts back the symbols
shiftSymr.sym.u = if ord.sym < 48 then 
                            if (ord.sym - u) < 32 then
                                chr.(16 + (ord.sym - u))
                            else
                                chr.(ord.sym - u)
                        else if ord.sym < 65 then  
                            if (ord.sym - u) < 58 then
                                chr.(7 + (ord.sym - u))
                            else 
                                chr.(ord.sym - u)
                        else if ord.sym < 97 then
                            if (ord.sym - u) < 91 then
                                chr.((ord.sym - u) + 6)
                            else chr.(ord.sym - u)
                        else
                            if (ord.sym - u) > 122 then
                                chr.((ord.sym - u) + 4)
                            else
                                chr.(ord.sym - u)



-- shifts each char of string by n times  masterShift."Akash@123.".5 ->  "Fpfxm=678\""
masterShift: [Char] -> Int -> [Char]
masterShift.[].u = []
masterShift.(x :: xs).u = if isDigit.x then shiftDigit.x.u :: masterShift.xs.u
                                       else if isAlpha.x then shiftChar.x.u :: masterShift.xs.u
                                        else shiftSym.x.4 :: masterShift.xs.u

-- shifts back char of string by n times  masterShiftr."Fpfxm=678\"".5 -> "Akash@123."
masterShiftr: [Char] -> Int -> [Char]
masterShiftr.[].u = []
masterShiftr.(x :: xs).u = if isDigit.x then shiftDigit.x.(10 - u) :: masterShiftr.xs.u
                                       else if isAlpha.x then shiftChar.x.(26 - u) :: masterShiftr.xs.u
                                        else shiftSymr.x.4 :: masterShiftr.xs.u

-- gives single digit sum of digit of sum , digitSum.123 -> 6
digitSum: Int -> Int
digitSum.n = if n >= 10 then digitSum.(mod.n.10 + digitSum.(n/10)) else n

-- rotate the list n times rotate."abcd".2 -> cdab
rotate: [a] -> Int -> [a]
rotate.l.0 = l
rotate.(x :: xs).n = rotate.(xs ++ [x]).(n-1)

-- convert char digit to number charToInt.'4' -> 4
-- charToInt : Char -> Int
-- charToInt.ch = ord.ch - 48

-- encript the str using key
encrypt: [Char] -> [Char] -> [Char]
encrypt.str.[] = str
encrypt.str.(k :: ks) = if isDigit.k then  encrypt.(rotate.(masterShift.str.(charToInt.k)).(charToInt.k)).ks
                                                else encrypt.(rotate.(masterShift.str.(digitSum.(ord.k))).(digitSum.(ord.k))).ks

-- decrypt the string
decrypt: [Char] -> [Char] -> [Char]
decrypt.str.[] = str
decrypt.str.(k :: ks) = if isDigit.k then  decrypt.(rotate.(masterShiftr.str.(charToInt.k)).(length.str - charToInt.k)).ks
                                                else decrypt.(rotate.(masterShiftr.str.(digitSum.(ord.k))).(length.str - digitSum.(ord.k))).ks

-- ********************* EVALUATOR ******************


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


-- ------------- BODMAS EVALUATOR -----------------

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
