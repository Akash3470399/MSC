ctype Nat where
	Zero : Nat
	Succ : Nat -> Nat
	Prec : Nat -> Nat
	Infinity : Nat

natPlus: Nat -> Nat -> Nat

-- function to add natural num
natPlus.Zero.Zero = Zero
natPlus.Zero.x = x
natPlus.x.Zero = x
natPlus.(Succ.x).(Prec.y) = natPlus.x.y
natPlus.(Prec.x).(Succ.y) = natPlus.x.y
natPlus.(Succ.x).(Succ.y) = Succ.(Succ.(natPlus.x.y))
natPlus.(Prec.x).(Prec.y) = Prec.(Prec.(natPlus.x.y))	



-- function to substract natural numbers
natSub.Zero.Zero = Zero
natSub.Zero.(Prec.x) = Succ.(natSub.Zero.x)
natSub.Zero.(Succ.x) = Prec.(natSub.Zero.x)
natSub.(Succ.x).Zero = Succ.x
natSub.(Prec.x).Zero = Prec.x
natSub.(Succ.x).(Succ.y) = natSub.x.y
natSub.(Prec.x).(Prec.y) = natSub.x.y
natSub.(Succ.x).(Prec.y) = natSub.(Succ.(Succ.x)).y
natSub.(Prec.x).(Succ.y) = natSub.(Prec.(Prec.x)).y


-- function to divide
natDiv: Nat -> Nat -> Nat
natDiv.x.Zero = Infinity
natDiv.Zero.x = Zero
natDiv.x.(Prec.y) = Zero
-- natDiv.(Succ.x).(Succ.x) = Succ.Zero
natDiv.(Succ.x).(Succ.y) = Succ.(natDiv.(natSub.(Succ.x).(Succ.y)).(Succ.y))
