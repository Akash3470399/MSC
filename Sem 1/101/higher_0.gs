-- 1..
-- ((3,4),(5,3),(6,2),(100,2)] =>  [12,15,12,200]
tupleMul = map.(\(x, y) -> x*y) 


-- 2..


not_one_word.[] = False
not_one_word.(x :: xs) = if x == ' ' && length.xs /= 0 then True else not_one_word.xs

sec = ((filter.(\e -> not_one_word.e));map.(\e -> (toUpper.(head.e) :: tail.e , length.e)))

-- 3..
--  fun2. [[1,2,3,4,5],[5,3,4,2],[6,3,4],[7,8]] => [27, 7, 19, 72] : [Int]
fun2 = map.(\e -> (tail;head).e + (reverse;head).e ^ 2)

-- getSecond = (tail;head)
-- fun2 = map.(\e -> getSecond.e+ getSecond.(reverse.e)^2)

-- Write a function which takes a list of numbers and returns TRUE or FALSE if its sorted.

isInc.[x] = True
isInc.(x :: y :: xs) = if x <= y then isInc.(y::xs) else False


greatestElm = foldr.(\x y -> if x < y then y else x).1
-- greatestElm = foldr.(\x y -> if x < y then y else x).1


