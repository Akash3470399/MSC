
ctype Op where
	Plus, Minus, Mul, Div : Op 



ctype Exp where
	Num : Int -> Exp
	Expr : Exp -> Op -> Exp -> Exp

-- function to evaluate the expression with Exp type
-- op1 : operand 1, op : operation to perform op2 : operand 2
eval : Exp -> Int
eval.(Num.n) = n
eval.(Expr.op1.op.op2) = if op == Plus then eval.op1 + eval.op2
                         else if op == Minus then eval.op1 - eval.op2
                         else if op == Mul then eval.op1 * eval.op2 
			 else eval.op1 / eval.op2


eg = Expr.(Num.2).(Minus).(Expr.(Num.3).Mul.(Expr.(Num.3).(Plus).(Num.2)))

-- function to create Exp type expression from a string exprission
parser.e = prsHlp.e.(Num.0)

prsHlp: [Char] -> Exp -> Exp
prsHlp.[].e = e
prsHlp.(x::xs).e = if isNum.(x::xs) then prsHlp.(rmNum.(x::xs)).(Num.(getNum.(x::xs))) 
	     else if x == '+' then Expr.(e).Plus.(prsHlp.xs.(Num.0))
	     else if x == '-' then prsHlp.(rmNum.xs).(Num.(-1 * getNum.xs)) 
	     else if x == '*' then prsHlp.(rmOpr2.xs.0).(Expr.e.Mul.(getOpr2.(x::xs)))
	     else if x == '/' then prsHlp.(rmNum.xs).(Expr.e.Div.(Num.(getNum.xs)))
	     else if x == '(' then prsHlp.(rmOpr2.xs.1).(getOpr2.(x::xs))
	     else e
 
getOpr2 : [Char] -> Exp
getOpr2.(x :: xs) = if isDigit.x then Num.(getNum.(x::xs))
		      else  prsHlp.xs.(Num.0)

rmOpr2:[Char] -> Int --> [Char]

rmOpr2.(x :: xs).n = if isDigit.x && n == 0 then rmNum.(x::xs)
                   else if x == '(' then rmOpr2.xs.(n+1)
		   else if x == ')' then rmOpr2.xs.(n-1)
                   else if n == 0 then xs
	           else rmOpr2.xs.n
