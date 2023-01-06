-- Q5
seq_is_part : [Char] -> [Char] -> Bool
seq_is_part.x.[] = False
seq_is_part.x.(y :: ys) = if length.x > length.(y::ys) then False
                                      else if x == take.(length.x).(y::ys) then True
                                      else seq_is_part.x.ys

-- Q9
sub : [Int] -> [Int] -> [Int]
sub.x.[] = x
sub.(x :: xs).(y :: ys) = (x - y) :: sub.xs.ys

multEach : Int -> [Int] -> [Int]
multEach.e.l = map.((*).e).l

div1 : [Int] -> [Int] -> [[Int]]

div1.a.b = if length.a >= length.b then
                ((head.a/head.b):: head.(div1.(tail.(sub.a.(multEach.( head.a / head.b).b))).b)) :: tail.(div1.(tail.(sub.a.(multEach.( head.a / head.b).b))).b)
            else [[], a]