btod : [Char] -> Int
btod.[] = 0
btod.(b :: bs) = if b == '1' then 2^(length.bs) + btod.(bs)
                 else btod.bs 
