
charToInt : Char -> Int
charToInt.ch = ord.ch - 48

isNum : [Char] -> Bool
isNum.(x ::xs) = isDigit.x


-- convert number string to integer stoi."102" -> 102
stoi: [Char] -> Int
stoi.[] = 0
stoi.(x :: xs ) = (charToInt.x) * (10 ^  length.xs) + stoi.xs 



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

-------------------------------------------------------------- MAIN CODE -----------------------------------------------------------

ctype Op where
	Plus, Minus, Mul, Div, Pwr , Mod, Er: Op 



ctype Exp where
	Num : Int -> Exp
	Expr : Exp -> Op -> Exp -> Exp
	Error : [Char] -> Exp


solve : [Char] -> Int
solve.e = eval.(parser.e)


-- function to evaluate the expression with Exp type
-- op1 : operand 1, op : operation to perform op2 : operand 2
eval : Exp -> Int
eval.(Num.n) = n
eval.(Expr.op1.op.op2) = if op == Plus then eval.op1 + eval.op2
                         else if op == Minus then eval.op1 - eval.op2
                         else if op == Mul then eval.op1 * eval.op2 
			 			else if op == Div then eval.op1 / eval.op2
						else if op == Pwr then eval.op1 ^ eval.op2
						else if op == Mod then mod.(eval.op1).(eval.op2)
						else 0/0

eg = Expr.(Num.2).(Minus).(Expr.(Num.3).Mul.(Expr.(Num.3).(Plus).(Num.2)))

-- function to create Exp type expression from a string exprission
parser.e = prsHlp.e.(Num.0)

prsHlp: [Char] -> Exp -> Exp
prsHlp.[].e = e
prsHlp.(x::xs).e = if isNum.(x::xs) then prsHlp.(rmNum.(x::xs)).(Num.(getNum.(x::xs))) 
	     else if x == '+' then Expr.(e).Plus.(prsHlp.xs.(Num.0))
	     else if x == '-' then Expr.(e).Minus.(prsHlp.xs.(Num.0)) 
	    --  else if x == '-' then prsHlp.(rmOpr2.xs.0).(Expr.e.Minus.(getOpr2.(xs)))
	     else if x == '*' then prsHlp.(rmOpr2.xs.0).(Expr.e.Mul.(getOpr2.(xs)))
	     else if x == '/' then prsHlp.(rmOpr2.xs.0).(Expr.e.Div.(getOpr2.(xs)))
		 else if x == '^' then prsHlp.(rmOpr2.xs.0).(Expr.e.Pwr.(getOpr2.(xs)))
		 else if x == '%' then prsHlp.(rmOpr2.xs.0).(Expr.e.Mod.(getOpr2.(xs)))
	     else if x == '(' then prsHlp.(rmOpr2.xs.1).(getOpr2.(x::xs))
	     else if x == ')' then e
		 else Expr.(Num.0).Er.(Num.0)
 
getOpr2 : [Char] -> Exp
getOpr2.(x :: xs) = if isDigit.x then Num.(getNum.(x::xs))
		      else  prsHlp.xs.(Num.0)

rmOpr2:[Char] -> Int -> [Char]
rmOpr2.[].n = []
rmOpr2.(x :: xs).n   = if isDigit.x && n == 0 then rmNum.(x::xs)
                   else if x == '(' then rmOpr2.xs.(n+1)
		   else if x == ')' then rmOpr2.xs.(n-1)
                   else if n == 0 then (x::xs) 
	           else rmOpr2.xs.n
